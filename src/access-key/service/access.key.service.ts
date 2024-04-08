import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessKey } from '../entity/access-key.entity';

@Injectable()
export class AccessKeyService {
  constructor(
    @InjectRepository(AccessKey)
    private accessKeyRepository: Repository<AccessKey>,
  ) {}

  async createAccessKey(
    rateLimit: number,
    rateLimitPeriod: number,
    expiresAt: Date,
  ): Promise<AccessKey> {
    const accessKey = this.accessKeyRepository.create({
      rateLimit,
      rateLimitPeriod,
      expiresAt,
    });
    await this.accessKeyRepository.save(accessKey);
    return accessKey;
  }

  async deleteAccessKey(id: string): Promise<void> {
    await this.accessKeyRepository.delete(id);
  }

  async listAccessKeys(): Promise<AccessKey[]> {
    return this.accessKeyRepository.find();
  }

  async updateAccessKey(
    id: string,
    rateLimit: number,
    expiresAt: Date,
  ): Promise<AccessKey> {
    const accessKey = await this.accessKeyRepository.findOneBy({ id });
    if (!accessKey) throw new Error('AccessKey not found');
    accessKey.rateLimit = rateLimit;
    accessKey.expiresAt = expiresAt;
    return this.accessKeyRepository.save(accessKey);
  }

  async getAccessKeyDetails(id: string): Promise<AccessKey> {
    return this.accessKeyRepository.findOneBy({ id });
  }
}
