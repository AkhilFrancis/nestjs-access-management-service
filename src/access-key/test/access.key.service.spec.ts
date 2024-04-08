import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccessKey } from '../entity/access-key.entity';
import { Repository } from 'typeorm';
import { AccessKeyService } from '../service/access.key.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = (): MockRepository<AccessKey> => ({
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
});

describe('AccessKeyService', () => {
  let service: AccessKeyService;
  let repository: MockRepository<AccessKey>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessKeyService,
        { provide: getRepositoryToken(AccessKey), useFactory: mockRepository },
      ],
    }).compile();

    service = module.get<AccessKeyService>(AccessKeyService);
    repository = module.get<MockRepository<AccessKey>>(
      getRepositoryToken(AccessKey),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createAccessKey', () => {
    it('should successfully create an access key', async () => {
      const rateLimit = 100;
      const rateLimitPeriod = 60;
      const expiresAt = new Date();
      const accessKey: AccessKey = {
        id: 'someId',
        rateLimit,
        rateLimitPeriod,
        expiresAt,
      } as AccessKey;

      repository.create.mockReturnValue(accessKey);
      repository.save.mockResolvedValue(accessKey);

      expect(
        await service.createAccessKey(rateLimit, rateLimitPeriod, expiresAt),
      ).toEqual(accessKey);
      expect(repository.create).toHaveBeenCalledWith(expect.any(Object));
      expect(repository.save).toHaveBeenCalledWith(accessKey);
    });
  });

  describe('deleteAccessKey', () => {
    it('should successfully delete an access key', async () => {
      const id = 'someId';
      repository.delete.mockResolvedValue({ affected: 1 });

      await service.deleteAccessKey(id);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('listAccessKeys', () => {
    it('should return an array of access keys', async () => {
      const accessKeyArray: AccessKey[] = [
        {
          id: 'id1',
          rateLimit: 100,
          rateLimitPeriod: 60,
          expiresAt: new Date(),
        } as AccessKey,
        {
          id: 'id2',
          rateLimit: 150,
          rateLimitPeriod: 30,
          expiresAt: new Date(),
        } as AccessKey,
      ];
      repository.find.mockResolvedValue(accessKeyArray);

      const result = await service.listAccessKeys();
      expect(result).toEqual(accessKeyArray);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('updateAccessKey', () => {
    it('should update and return the access key', async () => {
      const id = 'someId';
      const updatedRateLimit = 200;
      const updatedExpiresAt = new Date();
      const existingAccessKey: AccessKey = {
        id,
        rateLimit: 100,
        rateLimitPeriod: 60,
        expiresAt: new Date(),
      } as AccessKey;
      const updatedAccessKey: AccessKey = {
        ...existingAccessKey,
        rateLimit: updatedRateLimit,
        expiresAt: updatedExpiresAt,
      };

      repository.findOneBy.mockResolvedValue(existingAccessKey);
      repository.save.mockResolvedValue(updatedAccessKey);

      const result = await service.updateAccessKey(
        id,
        updatedRateLimit,
        updatedExpiresAt,
      );
      expect(result).toEqual(updatedAccessKey);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(repository.save).toHaveBeenCalledWith(updatedAccessKey);
    });
  });

  describe('getAccessKeyDetails', () => {
    it('should return details of a specific access key', async () => {
      const id = 'someId';
      const accessKey: AccessKey = {
        id,
        rateLimit: 100,
        rateLimitPeriod: 60,
        expiresAt: new Date(),
      } as AccessKey;
      repository.findOneBy.mockResolvedValue(accessKey);

      const result = await service.getAccessKeyDetails(id);
      expect(result).toEqual(accessKey);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });
});
