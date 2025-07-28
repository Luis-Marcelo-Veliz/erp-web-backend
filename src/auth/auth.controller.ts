import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: { username: string; password: string }) {
    try {
      return await this.authService.login(dto.username, dto.password);
    } catch (err) {
      console.error('🔥 Error en AuthController.login:', err.stack || err);
      // Devuelve un mensaje genérico sin exponer stack al cliente
      throw new HttpException(
        { message: 'Error interno en login' },
        HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
