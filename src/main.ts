// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1) CORS: reflejar cualquier Origin y permitir credentials
  app.use(
    cors({
      origin: true,                // refleja el Origin de la petición
      credentials: true,           // permite cookies/Authorization
      methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
      ],
      optionsSuccessStatus: 200,
      preflightContinue: false,
      maxAge: 600,
    }),
  );

  const port = parseInt(process.env.PORT || '3000', 10);

  // 2) Escuchar en todas las interfaces, no solo en localhost
  console.log('⚙  Configuración de red:', { port, host: '0.0.0.0' });
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Backend corriendo en http://0.0.0.0:${port}  [NODE_ENV=${process.env.NODE_ENV}]`);
}

bootstrap();
