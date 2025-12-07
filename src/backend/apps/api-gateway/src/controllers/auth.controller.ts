import { Controller, Post, Body, HttpCode, HttpStatus, Headers, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { lastValueFrom } from "rxjs";
import {
  RegisterRequestDto,
  LoginRequestDto,
  LoginResponseDto,
} from "@horizon/contracts";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authClient: ClientProxy
  ) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["email", "password", "firstName", "lastName"],
      properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 8 },
        firstName: { type: "string" },
        lastName: { type: "string" },
        phone: { type: "string" },
      },
    },
  })
  async register(@Body() dto: RegisterRequestDto): Promise<LoginResponseDto> {
    return lastValueFrom(
      this.authClient.send<LoginResponseDto>({ cmd: "register" }, dto)
    );
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login with email and password" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["email"],
      properties: {
        email: { type: "string", format: "email" },
        password: { type: "string" },
        isBiometric: { type: "boolean" },
      },
    },
  })
  async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return lastValueFrom(
      this.authClient.send<LoginResponseDto>({ cmd: "login" }, dto)
    );
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refresh access token" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["refreshToken"],
      properties: {
        refreshToken: { type: "string" },
      },
    },
  })
  async refresh(
    @Body() body: { refreshToken: string }
  ): Promise<LoginResponseDto> {
    return lastValueFrom(
      this.authClient.send<LoginResponseDto>({ cmd: "refresh" }, body)
    );
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Logout and invalidate refresh token" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["refreshToken"],
      properties: {
        refreshToken: { type: "string" },
      },
    },
  })
  async logout(@Body() body: { refreshToken: string }): Promise<{ success: boolean }> {
    return lastValueFrom(
      this.authClient.send<{ success: boolean }>({ cmd: "logout" }, body)
    );
  }

  @Post("logout-all")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Logout from all devices" })
  async logoutAll(
    @Headers("authorization") authHeader: string
  ): Promise<{ success: boolean }> {
    const token = this.extractToken(authHeader);
    const payload = await lastValueFrom(
      this.authClient.send<{ valid: boolean; payload?: any }>(
        { cmd: "verify_token" },
        { token }
      )
    );

    if (!payload.valid) {
      throw new UnauthorizedException("Invalid token");
    }

    return lastValueFrom(
      this.authClient.send<{ success: boolean }>(
        { cmd: "logout_all" },
        { userId: payload.payload.sub }
      )
    );
  }

  @Post("forgot-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Request password reset email" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["email"],
      properties: {
        email: { type: "string", format: "email" },
      },
    },
  })
  async forgotPassword(@Body() body: { email: string }): Promise<{ success: boolean }> {
    return lastValueFrom(
      this.authClient.send<{ success: boolean }>({ cmd: "forgot_password" }, body)
    );
  }

  @Post("change-password")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Change password (requires current password)" })
  @ApiBody({
    schema: {
      type: "object",
      required: ["currentPassword", "newPassword"],
      properties: {
        currentPassword: { type: "string" },
        newPassword: { type: "string", minLength: 8 },
      },
    },
  })
  async changePassword(
    @Headers("authorization") authHeader: string,
    @Body() body: { currentPassword: string; newPassword: string }
  ): Promise<{ success: boolean }> {
    const token = this.extractToken(authHeader);
    const payload = await lastValueFrom(
      this.authClient.send<{ valid: boolean; payload?: any }>(
        { cmd: "verify_token" },
        { token }
      )
    );

    if (!payload.valid) {
      throw new UnauthorizedException("Invalid token");
    }

    return lastValueFrom(
      this.authClient.send<{ success: boolean }>(
        { cmd: "change_password" },
        {
          userId: payload.payload.sub,
          currentPassword: body.currentPassword,
          newPassword: body.newPassword,
        }
      )
    );
  }

  private extractToken(authHeader: string): string {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or invalid authorization header");
    }
    return authHeader.substring(7);
  }
}
