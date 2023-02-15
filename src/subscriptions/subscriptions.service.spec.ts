import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subscription } from './subscriptions.entity';
import { SubscriptionService } from './subscriptions.service';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

const dataArray = [
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
];

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let repository: Repository<Subscription>;
  let oneSubscription;

  beforeEach(async () => {
    oneSubscription = {
      name: faker.fake.name,
      email: faker.internet.email(),
      isVerified: true,
      country: 'TR',
      frequency: 'daily',
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: getRepositoryToken(Subscription),
          useValue: {
            find: jest.fn().mockResolvedValue(dataArray),
            findOneBy: jest.fn().mockResolvedValue(oneSubscription),
            save: jest.fn().mockResolvedValue(oneSubscription),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
    repository = module.get<Repository<Subscription>>(
      getRepositoryToken(Subscription),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', () => {
      expect(service.create(oneSubscription)).resolves.toEqual(oneSubscription);
    });
  });

  describe('findAll()', () => {
    it('should return an array of subscriptions', async () => {
      const subscriptions = await service.findAll();
      expect(subscriptions).toEqual(dataArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const id = faker.datatype.uuid();
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOne(id)).resolves.toEqual(oneSubscription);
      expect(repoSpy).toBeCalledWith({ id });
    });
  });

  describe('findOneByEmail()', () => {
    it('should get a single user by email', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findOneByEmail(oneSubscription.email)).resolves.toEqual(
        oneSubscription,
      );
      expect(repoSpy).toBeCalledWith({ email: oneSubscription.email });
    });
  });

  describe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const id = faker.datatype.uuid();
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove(id);
      expect(removeSpy).toBeCalledWith(id);
      expect(retVal).toBeUndefined();
    });
  });
});
