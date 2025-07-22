import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

   async login(username: string, password: string) {
    console.log('AuthService.login recibidos:', { username, password });
    if (username !== 'admin' || password !== '1234') {
      console.log('Credenciales inválidas');
      throw new UnauthorizedException();
    }
    const payload = { username, sub: 1, role: 'admin' };
    const token = this.jwtService.sign(payload);
    console.log('Emitiendo token:', token);
    return { accessToken: token };
  }
}