import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('protected')
export class ProtectedController {
  @Get()
  getData() {
    return { message: 'Acceso autorizado' };
  }
}
