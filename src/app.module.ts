import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// importa otros controladores según necesites

@Module({
  imports: [AuthModule],
  controllers: [], // agrega aquí ProtectedController cuando lo crees
  providers: [],
})
export class AppModule {}
