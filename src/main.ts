// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS con el método nativo de Nest, que añade soporte OPTIONS
  app.enableCors({
    origin: true,  // refleja cualquier Origin
    credentials: true,
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept','Origin'],
    optionsSuccessStatus: 200,
    maxAge: 600,
  });

  const port = parseInt(process.env.PORT || '3000', 10);
  console.log('⚙ Configuración de red:', { port, host: '0.0.0.0' });
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Backend corriendo en http://0.0.0.0:${port}`);
}
bootstrap();
