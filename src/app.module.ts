import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    DemoModule,
    UserModule,
    ConfigModule,
    LoginModule,
    GuardModule,
    MongooseModule.forRoot('mongodb://admin:123456@localhost:27017'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
