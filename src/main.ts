// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1) Usamos directamente el paquete 'cors' de Express
  app.use(
    cors({
      origin: true, // refleja automáticamente el Origin de la petición :contentReference[oaicite:0]{index=0}
      credentials: true,
      methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],  // preflight seguro :contentReference[oaicite:1]{index=1}
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
      ],
      optionsSuccessStatus: 200,      // IE11 preflight fix :contentReference[oaicite:2]{index=2}
      preflightContinue: false,
      maxAge: 600,
    }),
  );

  // 2) (Opcional) Si prefieres la forma nativa de NestFactory:
  // const app = await NestFactory.create(AppModule, {
  //   cors: {
  //     origin: true,
  //     credentials: true,
  //     methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
  //     allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept','Origin'],
  //     optionsSuccessStatus: 200,
  //     preflightContinue: false,
  //     maxAge: 600,
  //   },
  // });

  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
}
bootstrap();
