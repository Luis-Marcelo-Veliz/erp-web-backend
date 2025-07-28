// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dto: { username: string; password: string }
  ): Promise<{ accessToken: string }> {
    try {
      // Llamamos al servicio
      return await this.authService.login(dto.username, dto.password);
    } catch (err) {
      // Log del stack completo para diagnóstico
      console.error('🔥 Error en AuthController.login:', err.stack || err);
      // Respondemos un 500 al cliente sin filtrar información sensible
      throw new HttpException(
        { message: 'Error interno en login' },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
