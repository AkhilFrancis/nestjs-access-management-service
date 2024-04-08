import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessKeyModule } from './access-key/access.key.module';
import typeorm from './config/typeorm';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
      validationSchema: Joi.object({
        PGHOST: Joi.string().required(),
        PGDATABASE: Joi.string().required(),
        PGUSER: Joi.string().required(),
        PGPORT: Joi.number().required(),
        PGPASSWORD: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AccessKeyModule,
  ],
})
export class AppModule {}
