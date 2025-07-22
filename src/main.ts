import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS de forma abierta para desarrollo
  app.enableCors({
    origin: true,           // Permite cualquier origen
    credentials: true,      // Permite enviar cookies/autorización
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
  });
  await app.listen(3000);
  console.log('🚀 Backend corriendo en http://localhost:3000');
}
bootstrap();
