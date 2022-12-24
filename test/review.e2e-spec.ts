import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { Types, disconnect } from 'mongoose'
import * as request from 'supertest'

import { AppModule } from '../src/app.module'
import { CreateReviewDto } from '../src/review/dto/create-review.dto'
import { REVIEW_NOT_FOUND } from '../src/review/review.constants'
import { AuthDto } from '../src/auth/dto/auth.dto'

const productId = new Types.ObjectId().toHexString()
const loginDto: AuthDto = {
  login: 'a15@gmail.com',
  password: '12345678'
}

const testDto: CreateReviewDto = {
  name: 'Test',
  title: 'Title',
  description: 'Test description',
  rating: 5,
  productId
}

describe('Review controller', () => {
  let app: INestApplication
  let createdId: string
  let token: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)

    token = body.accessToken
  })

  it('/review/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id

        expect(createdId).toBeDefined()
      })
  })

  it('/review/create (POST) - failed', () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: 6 })
      .expect(400)
  })

  it('/review/byProduct/:productId (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + createdId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1)
      })
  })

  it('/review/byProduct/:productId (GET) - failed', async () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + new Types.ObjectId().toHexString())
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0)
      })
  })

  it('/review/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })

  it('/review/:id (DELETE) - failed', async () => {
    return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .set('Authorization', `Bearer ${token}`)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND
      })
  })

  afterAll(() => {
    disconnect()
  })
})
