import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "@horizon/database";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

export interface TokenPayload {
  sub: string;
  email: string;
  type: "access" | "refresh";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginDto {
  email: string;
  password?: string;
  isBiometric?: boolean;
}

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;
  private readonly accessTokenExpiry: string;
  private readonly refreshTokenExpiry: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {
    this.jwtSecret = this.config.get<string>("JWT_SECRET") || "horizon-secret-key-change-in-production";
    this.accessTokenExpiry = this.config.get<string>("ACCESS_TOKEN_EXPIRY") || "15m";
    this.refreshTokenExpiry = this.config.get<string>("REFRESH_TOKEN_EXPIRY") || "7d";
  }

  async register(dto: RegisterDto): Promise<AuthTokens> {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 12);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
      },
    });

    // Create customer profile
    await this.prisma.customer.create({
      data: {
        userId: user.id,
      },
    });

    // Generate tokens
    return this.generateTokens(user.id, user.email);
  }

  async login(dto: LoginDto): Promise<AuthTokens> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (user.status !== "ACTIVE") {
      throw new UnauthorizedException("Account is not active");
    }

    // For biometric login, we trust the device verification
    if (!dto.isBiometric) {
      if (!dto.password || !user.passwordHash) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const isValid = await bcrypt.compare(dto.password, user.passwordHash);
      if (!isValid) {
        throw new UnauthorizedException("Invalid credentials");
      }
    }

    return this.generateTokens(user.id, user.email);
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      // Verify the refresh token
      const payload = jwt.verify(refreshToken, this.jwtSecret) as TokenPayload;
      
      if (payload.type !== "refresh") {
        throw new UnauthorizedException("Invalid token type");
      }

      // Check if refresh token exists and is not revoked
      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });

      if (!storedToken || storedToken.revokedAt) {
        throw new UnauthorizedException("Token has been revoked");
      }

      if (storedToken.expiresAt < new Date()) {
        throw new UnauthorizedException("Token has expired");
      }

      // Revoke old refresh token
      await this.prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: { revokedAt: new Date() },
      });

      // Get user
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || user.status !== "ACTIVE") {
        throw new UnauthorizedException("User not found or inactive");
      }

      // Generate new tokens
      return this.generateTokens(user.id, user.email);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException("Invalid token");
      }
      throw error;
    }
  }

  async logout(refreshToken: string): Promise<void> {
    // Revoke the refresh token
    await this.prisma.refreshToken.updateMany({
      where: { token: refreshToken },
      data: { revokedAt: new Date() },
    });
  }

  async logoutAll(userId: string): Promise<void> {
    // Revoke all refresh tokens for user
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    // Delete all sessions
    await this.prisma.session.deleteMany({
      where: { userId },
    });
  }

  async verifyAccessToken(token: string): Promise<TokenPayload> {
    try {
      const payload = jwt.verify(token, this.jwtSecret) as TokenPayload;
      
      if (payload.type !== "access") {
        throw new UnauthorizedException("Invalid token type");
      }

      return payload;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Don't reveal if user exists
      return;
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString("hex");
    const resetExpiry = new Date(Date.now() + 3600000); // 1 hour

    // In a real app, store the token and send email
    // For now, just log it
    console.log(`Password reset token for ${email}: ${resetToken}`);
    
    // TODO: Send email with reset link
    // await this.emailService.sendPasswordReset(user.email, resetToken);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // In a real app, verify the token from database
    // For now, this is a placeholder
    throw new BadRequestException("Password reset not fully implemented yet");
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException("User not found");
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException("Current password is incorrect");
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    });

    // Revoke all refresh tokens to force re-login
    await this.logoutAll(userId);
  }

  private async generateTokens(userId: string, email: string): Promise<AuthTokens> {
    const accessPayload: TokenPayload = {
      sub: userId,
      email,
      type: "access",
    };

    const refreshPayload: TokenPayload = {
      sub: userId,
      email,
      type: "refresh",
    };

    const accessToken = jwt.sign(accessPayload, this.jwtSecret, {
      expiresIn: this.accessTokenExpiry,
    });

    const refreshToken = jwt.sign(refreshPayload, this.jwtSecret, {
      expiresIn: this.refreshTokenExpiry,
    });

    // Calculate expiry
    const decoded = jwt.decode(accessToken) as { exp: number };
    const expiresAt = decoded.exp * 1000;

    // Store refresh token
    const refreshExpiry = new Date();
    refreshExpiry.setDate(refreshExpiry.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        token: refreshToken,
        expiresAt: refreshExpiry,
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresAt,
    };
  }
}

