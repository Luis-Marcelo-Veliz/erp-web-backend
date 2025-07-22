import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // Habilita CORS para tu frontend (o '*' en dev)
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  await app.listen(3000);
  console.log('🚀 Application is running on: http://localhost:3000');
}
bootstrap();
