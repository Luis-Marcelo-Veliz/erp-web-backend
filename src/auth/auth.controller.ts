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
  // Devolvemos siempre 200 si las credenciales son correctas,
  // o 401 si no lo son.
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: { username: string; password: string },
  ): Promise<{ accessToken: string }> {
    // Si lanza UnauthorizedException, Nest devolverá 401 con { message }
    return this.authService.login(dto.username, dto.password);
  }
}
