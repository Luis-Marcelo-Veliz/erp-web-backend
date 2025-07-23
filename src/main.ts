// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PROD_ORIGIN = 'https://erp-web-frontend.vercel.app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // Si no hay origin (tools como curl) o coincide con prod, lo permitimos
      if (!origin || origin === PROD_ORIGIN) {
        return callback(null, true);
      }
      // En dev (Codespaces) permitimos todo
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      // En producción bloqueamos otros orígenes
      callback(new Error('CORS not allowed'), false);
    },
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
}
bootstrap();
