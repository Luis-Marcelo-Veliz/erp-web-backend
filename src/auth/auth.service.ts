// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string): Promise<{ accessToken: string }> {
    try {
      console.log('AuthService.login recibidos:', { username, password });

      // Lógica de validación (puedes sustituir por la tuya real)
      if (username !== 'admin' || password !== '1234') {
        console.log('Credenciales inválidas');
        // Este mensaje llega al front como body.message
        throw new UnauthorizedException('Credenciales inválidas');
      }

      // Si pasó la validación, generamos el token
      const payload = { username, sub: 1, role: 'admin' };
      const token = this.jwtService.sign(payload);
      console.log('Emitiendo token:', token);

      // Devolvemos exactamente lo que el front espera
      return { accessToken: token };
    } catch (err) {
      // Log completo para ver si hay otros errores internos
      console.error('🔥 Error en AuthService.login:', err);
      throw err;
    }
  }
}
