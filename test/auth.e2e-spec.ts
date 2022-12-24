import { INestApplication } from '@nestjs/common'
import { TestingModule, Test } from '@nestjs/testing'
import * as request from 'supertest'
import { disconnect } from 'mongoose'

import { AppModule } from '../src/app.module'
import { AuthDto } from '../src/auth/dto/auth.dto'
import {
  WRONG_PASSWORD_ERROR,
  USER_NOT_FOUND
} from '../src/auth/auth.constants'

const loginDtoSuccess: AuthDto = {
  login: 'a15@gmail.com',
  password: '12345678'
}

const loginDtoWrongPassword: AuthDto = {
  login: 'a15@gmail.com',
  password: '123456789'
}

const loginDtoUserNotFound: AuthDto = {
  login: 'a1fgdf5@gmail.com',
  password: '123456789'
}

describe('Auth controller', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDtoSuccess)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.accessToken).toBeDefined()
      })
  })

  it('/auth/login (POST) - wrong password', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDtoWrongPassword)
      .expect(401)
      .then(({ body }: request.Response) => {
        expect(body.message).toBe(WRONG_PASSWORD_ERROR)
      })
  })

  it('/auth/login (POST) - wrong email', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDtoUserNotFound)
      .expect(401)
      .then(({ body }: request.Response) => {
        expect(body.message).toBe(USER_NOT_FOUND)
      })
  })

  afterAll(() => {
    disconnect()
  })
})
