import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Permite cualquier origen en desarrollo; en producción, solo el FRONTEND_URL
  app.enableCors({
    origin: (origin, callback) => {
      // 1) Si no hay origin (curl, Postman...), lo permitimos siempre
      if (!origin) {
        return callback(null, true);
      }
      // 2) En desarrollo, habilitamos todos los orígenes
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      // 3) En producción, solo permitimos el dominio que definas:
      if (origin === process.env.FRONTEND_URL) {
        return callback(null, true);
      }
      // 4) En cualquier otro caso, denegamos:
      callback(new Error('CORS not allowed'), false);
    },
    // Le decimos al navegador que acepte y envíe cookies si las usas
    credentials: true,
  });

  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}  [NODE_ENV=${process.env.NODE_ENV}]`);
}
bootstrap();
