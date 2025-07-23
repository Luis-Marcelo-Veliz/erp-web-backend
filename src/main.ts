// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS definitivo en producción (ajusta orígenes según tu dominio)
  app.enableCors({
    origin: ['https://erp-web-frontend.vercel.app'],
    credentials: true,
  });

  // Usar el puerto de Render o 3000 por defecto
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
}
bootstrap();
