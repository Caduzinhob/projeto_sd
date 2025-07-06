import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AgentsModule } from './agents/agents.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1695',
    database: process.env.DB_NAME || 'banco_dados',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), UserModule, AuthModule, AgentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
