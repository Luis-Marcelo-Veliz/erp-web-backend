// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // 1) Si no hay origin (curl, Postman...), lo permitimos
      if (!origin) return callback(null, true);

      // 2) En desarrollo, cualquier preview de GitHub Codespaces
      if (origin.endsWith('.app.github.dev')) {
        return callback(null, true);
      }

      // 3) En producción, permitir solo tu dominio real
      if (process.env.NODE_ENV === 'production') {
        const allowed = process.env.FRONTEND_URL; 
        if (origin === allowed) {
          return callback(null, true);
        }
      }

      // 4) En cualquier otro caso, denegar
      callback(new Error('CORS not allowed'), false);
    },
    credentials: true,
  });

  const port = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
}
bootstrap();
