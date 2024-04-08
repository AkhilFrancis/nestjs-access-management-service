import { Test, TestingModule } from '@nestjs/testing';
import { AccessKeyController } from '../controller/access.key.controller';
import { AccessKeyService } from '../service/access.key.service';

describe('AccessKeyController', () => {
  let controller: AccessKeyController;
  const mockAccessKeyService = {
    createAccessKey: jest.fn(),
    deleteAccessKey: jest.fn(),
    listAccessKeys: jest.fn(),
    updateAccessKey: jest.fn(),
    getAccessKeyDetails: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessKeyController],
      providers: [
        {
          provide: AccessKeyService,
          useValue: mockAccessKeyService,
        },
      ],
    }).compile();

    controller = module.get<AccessKeyController>(AccessKeyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new access key', async () => {
    const dto = {
      rateLimit: 100,
      rateLimitPeriod: 60,
      expiresAt: '2023-01-01T00:00:00.000Z',
    };
    mockAccessKeyService.createAccessKey.mockResolvedValue({
      ...dto,
      id: 'a-unique-id',
    });

    expect(await controller.create(dto)).toEqual({
      ...dto,
      id: 'a-unique-id',
    });
    expect(mockAccessKeyService.createAccessKey).toHaveBeenCalledWith(
      dto.rateLimit,
      dto.rateLimitPeriod,
      new Date(dto.expiresAt),
    );
  });

  it('should delete an access key', async () => {
    const id = 'a-unique-id';
    mockAccessKeyService.deleteAccessKey.mockResolvedValue(undefined); // Assuming deletion doesn't return any content

    await expect(controller.delete(id)).resolves.toBeUndefined();
    expect(mockAccessKeyService.deleteAccessKey).toHaveBeenCalledWith(id);
  });

  it('should return an array of access keys', async () => {
    const accessKeys = [
      { id: 'id1', rateLimit: 100, rateLimitPeriod: 60, expiresAt: new Date() },
      { id: 'id2', rateLimit: 150, rateLimitPeriod: 30, expiresAt: new Date() },
    ];
    mockAccessKeyService.listAccessKeys.mockResolvedValue(accessKeys);

    await expect(controller.list()).resolves.toEqual(accessKeys);
    expect(mockAccessKeyService.listAccessKeys).toHaveBeenCalled();
  });

  it('should update an access key', async () => {
    const id = 'a-unique-id';
    const updateDto = {
      rateLimit: 200,
      expiresAt: '2024-01-01T00:00:00.000Z',
    };
    const updatedAccessKey = {
      ...updateDto,
      id,
      rateLimitPeriod: 60, // Assuming this stays unchanged
    };
    mockAccessKeyService.updateAccessKey.mockResolvedValue(updatedAccessKey);

    await expect(controller.update(id, updateDto)).resolves.toEqual(
      updatedAccessKey,
    );
    expect(mockAccessKeyService.updateAccessKey).toHaveBeenCalledWith(
      id,
      updateDto.rateLimit,
      new Date(updateDto.expiresAt),
    );
  });

  it('should return details of a specific access key', async () => {
    const id = 'a-unique-id';
    const accessKeyDetails = {
      id,
      rateLimit: 100,
      rateLimitPeriod: 60,
      expiresAt: new Date('2023-01-01T00:00:00.000Z'),
    };
    mockAccessKeyService.getAccessKeyDetails.mockResolvedValue(
      accessKeyDetails,
    );

    await expect(controller.details(id)).resolves.toEqual(accessKeyDetails);
    expect(mockAccessKeyService.getAccessKeyDetails).toHaveBeenCalledWith(id);
  });
});
