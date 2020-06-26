import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategyService } from './basic-strategy.service';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [BasicStrategyService, AuthService]
})
export class AuthModule {}
