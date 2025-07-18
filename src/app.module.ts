import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProtectedController } from './protected/protected.controller';
// importa otros controladores según necesites

@Module({
  imports: [AuthModule],
  controllers: [ProtectedController], 
  providers: [],
})
export class AppModule {}
