// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // En desarrollo, permitimos cualquier origen (Codespaces, localhost, etc.)
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      // En producción, solo permitimos el dominio fijo que quieras:
      const allowed = process.env.FRONTEND_URL; // e.g. https://mi-erp.vercel.app
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
