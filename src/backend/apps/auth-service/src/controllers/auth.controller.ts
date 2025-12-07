import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService, RegisterDto, LoginDto, AuthTokens } from "../services/auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: "register" })
  async register(@Payload() dto: RegisterDto): Promise<AuthTokens> {
    return this.authService.register(dto);
  }

  @MessagePattern({ cmd: "login" })
  async login(@Payload() dto: LoginDto): Promise<AuthTokens> {
    return this.authService.login(dto);
  }

  @MessagePattern({ cmd: "refresh" })
  async refresh(@Payload() data: { refreshToken: string }): Promise<AuthTokens> {
    return this.authService.refreshTokens(data.refreshToken);
  }

  @MessagePattern({ cmd: "logout" })
  async logout(@Payload() data: { refreshToken: string }): Promise<{ success: boolean }> {
    await this.authService.logout(data.refreshToken);
    return { success: true };
  }

  @MessagePattern({ cmd: "logout_all" })
  async logoutAll(@Payload() data: { userId: string }): Promise<{ success: boolean }> {
    await this.authService.logoutAll(data.userId);
    return { success: true };
  }

  @MessagePattern({ cmd: "verify_token" })
  async verifyToken(@Payload() data: { token: string }): Promise<{ valid: boolean; payload?: any }> {
    try {
      const payload = await this.authService.verifyAccessToken(data.token);
      return { valid: true, payload };
    } catch {
      return { valid: false };
    }
  }

  @MessagePattern({ cmd: "forgot_password" })
  async forgotPassword(@Payload() data: { email: string }): Promise<{ success: boolean }> {
    await this.authService.forgotPassword(data.email);
    return { success: true };
  }

  @MessagePattern({ cmd: "change_password" })
  async changePassword(
    @Payload() data: { userId: string; currentPassword: string; newPassword: string }
  ): Promise<{ success: boolean }> {
    await this.authService.changePassword(data.userId, data.currentPassword, data.newPassword);
    return { success: true };
  }
}
