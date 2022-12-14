import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const getMongoConfig = async (
  configService: ConfigService
): Promise<MongooseModuleOptions> => {
  return {
    uri: configService.get('MONGODB_URI'),
    ...getMongoOptions()
  }
}
