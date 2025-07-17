import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    // Aquí validas con base de datos o lista fija:
    if (username !== 'admin' || password !== '1234')
      throw new UnauthorizedException('Credenciales inválidas');
    const payload = { username, sub: 1, role: 'admin' };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
