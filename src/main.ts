// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // En desarrollo, permitimos cualquier origen (Codespaces, Previews, localhost…)
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      // En producción, solo permitimos el dominio fijo
      const allowed = process.env.FRONTEND_URL;
      if (origin && origin === allowed) {
        return callback(null, true);
      }
      callback(new Error('CORS not allowed'), false);
    },
    credentials: true,
  });

  const port = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
}
bootstrap();
