import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessKeyService } from './service/access.key.service';
import { AccessKeyController } from './controller/access.key.controller';
import { AccessKey } from './entity/access-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessKey])],
  providers: [AccessKeyService],
  controllers: [AccessKeyController],
})
export class AccessKeyModule {}
