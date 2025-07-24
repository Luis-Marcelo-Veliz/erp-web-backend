// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // Sin origin (curl) o prod, permitimos prod
      if (!origin || origin === process.env.FRONTEND_URL) {
        return callback(null, true);
      }
      // En dev, permitimos todo
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      callback(new Error('CORS not allowed'), false);
    },
    credentials: true,
  });

  const port = parseInt(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
}
bootstrap();
