// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dto: { username: string; password: string }
  ): Promise<{ accessToken: string }> {
    try {
      return await this.authService.login(dto.username, dto.password);
    } catch (err) {
      // Si fue credenciales inválidas, devolvemos 401
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      // Para cualquier otro error, lo logueamos y devolvemos 500
      console.error('🔥 Error inesperado en AuthController.login:', err.stack || err);
      throw new HttpException(
        { message: 'Error interno en login' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
