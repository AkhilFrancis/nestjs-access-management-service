import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { AccessKeyService } from '../service/access.key.service';
import { AccessKey } from '../entity/access-key.entity';
import { CreateAccessKeyDto } from '../dto/create.access.key.dto';
import { UpdateAccessKeyDto } from '../dto/update.access.key.dto';

@Controller('access-keys')
export class AccessKeyController {
  constructor(private readonly accessKeyService: AccessKeyService) {}

  @Post()
  create(
    @Body()
    body: CreateAccessKeyDto,
  ): Promise<AccessKey> {
    return this.accessKeyService.createAccessKey(
      body.rateLimit,
      body.rateLimitPeriod,
      new Date(body.expiresAt),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.accessKeyService.deleteAccessKey(id);
  }

  @Get()
  list(): Promise<AccessKey[]> {
    return this.accessKeyService.listAccessKeys();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateAccessKeyDto,
  ): Promise<AccessKey> {
    return this.accessKeyService.updateAccessKey(
      id,
      body.rateLimit,
      new Date(body.expiresAt),
    );
  }

  @Get(':id')
  details(@Param('id') id: string): Promise<AccessKey> {
    return this.accessKeyService.getAccessKeyDetails(id);
  }
}
