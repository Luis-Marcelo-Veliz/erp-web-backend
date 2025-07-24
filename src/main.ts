// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ORIGEN DINÁMICO: reflejamos siempre el origin que venga en la petición
  app.enableCors({
    origin: true,         // <–– esto autoriza TODOS los orígenes automáticamente
    credentials: true,    // <–– si usas cookies o Authorization
  });

  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
}
bootstrap();
