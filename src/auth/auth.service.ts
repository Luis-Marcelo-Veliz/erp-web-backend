// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    try {
      console.log('AuthService.login recibidos:', { username, password });

      // Aquí tu lógica real; de momento, sigue siendo el admin hardcodeado:
      if (username !== 'admin' || password !== '1234') {
        console.log('Credenciales inválidas');
        // Lanzamos con mensaje para que el front lo reciba en body.message
        throw new UnauthorizedException('Credenciales inválidas');
      }

      const payload = { username, sub: 1, role: 'admin' };
      const token = this.jwtService.sign(payload);
      console.log('Emitiendo token:', token);
      return { accessToken: token };
    } catch (err) {
      // Mostramos el error completo en consola para no quedarnos en la oscuridad
      console.error('🔥 Error en AuthService.login:', err);
      // Si es UnauthorizedException, lo relanzamos para que NestJS devuelva 401.
      // Si es cualquier otra cosa, lo dejamos caer (500), pero ya con stack.
      throw err;
    }
  }
}
