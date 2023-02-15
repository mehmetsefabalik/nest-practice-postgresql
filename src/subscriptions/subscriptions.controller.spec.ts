import { Test, TestingModule } from '@nestjs/testing';
import { CreateDto } from './dto/create.dto';
import { SubscriptionController } from './subscriptions.controller';
import { SubscriptionService } from './subscriptions.service';
import { faker } from '@faker-js/faker';

const createDto: CreateDto = {
  name: faker.fake.name,
  email: faker.internet.email(),
  isVerified: true,
  country: 'TR',
  frequency: 'daily',
};

describe('SubscriptionsController', () => {
  let controller: SubscriptionController;
  let service: SubscriptionService;

  const createdId = faker.datatype.uuid();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers: [
        SubscriptionService,
        {
          provide: SubscriptionService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((dto: CreateDto) =>
                Promise.resolve({ id: createdId, ...dto }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                name: faker.fake.name,
                email: faker.internet.email(),
                isVerified: true,
                country: 'TR',
                frequency: 'daily',
              },
              {
                name: faker.fake.name,
                email: faker.internet.email(),
                isVerified: true,
                country: 'TR',
                frequency: 'daily',
              },
            ]),
            findOneByEmail: jest.fn().mockImplementation((_: string) =>
              Promise.resolve({
                name: faker.fake.name,
                email: faker.internet.email(),
                isVerified: true,
                country: 'TR',
                frequency: 'daily',
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<SubscriptionController>(SubscriptionController);
    service = app.get<SubscriptionService>(SubscriptionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a subscription', () => {
      controller.create(createDto);
      expect(controller.create(createDto)).resolves.toEqual({
        id: createdId,
        ...createDto,
      });
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('get()', () => {
    it('should find all users ', () => {
      const mockResponse = {
        status: {
          json: jest.fn(),
        },
      };
      controller.get(undefined, mockResponse);
      expect(service.findAll).toHaveBeenCalled();
    });
    it('should find one user ', () => {
      const mockResponse = {
        status: {
          json: jest.fn(),
        },
      };
      controller.get(createDto.email, mockResponse);
      expect(service.findOneByEmail).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the subscription', () => {
      controller.remove(createdId);
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
