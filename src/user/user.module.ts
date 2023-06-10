import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger } from 'src/middlewares/logger/logger.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(Logger).forRoutes('user');
    // consumer
    //   .apply(Logger)
    //   .forRoutes({ path: 'user', method: RequestMethod.GET });
    consumer.apply(Logger).forRoutes(UserController);
  }
}
