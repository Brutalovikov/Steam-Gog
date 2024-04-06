import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SteamAuthService } from 'src/shared/providers/auth.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
