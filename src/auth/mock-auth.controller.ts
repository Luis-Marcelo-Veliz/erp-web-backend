import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class MockAuthController {
  @Post('login')
  login(@Body() payload) {
    if (payload.username === 'admin' && payload.password === '1234')
      return { accessToken: 'token-de-prueba' };
    return { status: 401, message: 'Credenciales inválidas' };
  }
}
