import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';

@Module({
imports: \[
ConfigModule.forRoot({ isGlobal: true }),
AuthModule,
TypeOrmModule.forRoot({
type: 'sqlite',
database: 'db.sqlite',
entities: \[\_\_dirname + '/\*\*/\*.entity{.ts,.js}'],
synchronize: true,
}),
ProductsModule,
],
controllers: \[AppController],
providers: \[],
})
export class AppModule {}
