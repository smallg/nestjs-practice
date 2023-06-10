import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [DemoModule, UserModule, ConfigModule, LoginModule, GuardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
