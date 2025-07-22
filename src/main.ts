import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- Parche de urgencia: middleware global para CORS ---
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Permite cualquier origen que venga en la petición (útil en dev)
    res.header('Access-Control-Allow-Origin', req.header('Origin') || '*');
    // Permite enviar credenciales (headers Authorization, cookies, etc.)
    res.header('Access-Control-Allow-Credentials', 'true');
    // Métodos permitidos
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    // Cabeceras permitidas
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Si es preflight, devuelve 204 sin contenido
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  await app.listen(3000);
  console.log('🚀 Backend corriendo en http://localhost:3000');
}

bootstrap();
