import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SubscriptionModule } from '../src/subscriptions/subscriptions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('Subscription - /subscriptions (e2e)', () => {
  let subscription;

  let app: INestApplication;

  beforeEach(() => {
    subscription = {
      name: faker.fake.name,
      email: faker.internet.email(),
      isVerified: true,
      country: 'TR',
      frequency: 'daily',
    };
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '',
          database: 'nesttest',
          autoLoadEntities: true,
          synchronize: true,
        }),
        SubscriptionModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /subscriptions]', () => {
    return request(app.getHttpServer())
      .post('/subscriptions')
      .send(subscription)
      .expect(201)
      .then(({ body }) => {
        expect(body.name).toEqual(subscription.name);
        expect(body.id).toBeDefined();
      });
  });

  it('Get all subscriptions [GET /subscriptions]', () => {
    return request(app.getHttpServer())
      .post('/subscriptions')
      .send(subscription)
      .expect(201)
      .then(({ body }) => {
        expect(body.name).toEqual(subscription.name);
        expect(body.id).toBeDefined();
        return request(app.getHttpServer())
          .get('/subscriptions')
          .expect(200)
          .then(({ body }) => {
            expect(body).toBeDefined();
          });
      });
  });

  it('Get one user [GET /subscriptions/:id]', () => {
    return request(app.getHttpServer())
      .post('/subscriptions')
      .send(subscription)
      .expect(201)
      .then(({ body }) => {
        expect(body.name).toEqual(subscription.name);
        expect(body.id).toBeDefined();
        return request(app.getHttpServer())
          .get(`/subscriptions?email=${subscription.email}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toBeDefined();
          });
      });
  });

  it('Delete one user [DELETE /subscriptions/:id]', async () => {
    return request(app.getHttpServer())
      .post('/subscriptions')
      .send(subscription)
      .expect(201)
      .then(({ body }) => {
        expect(body.name).toEqual(subscription.name);
        expect(body.id).toBeDefined();

        return request(app.getHttpServer())
          .delete(`/subscriptions/${body.id}`)
          .expect(200);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
