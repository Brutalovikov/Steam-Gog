import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SteamService } from './steam.service';
import { SteamController } from './steam.controller';
import { SteamApiService } from '../shared/providers/steam-api.service';
import { SteamAuthService } from '../shared/providers/auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule, 
    PassportModule.register({
      defaultStrategy: 'steam',
    }),
    ConfigModule,
  ],
  controllers: [SteamController],
  providers: [SteamService, SteamApiService, SteamAuthService, AuthService],
  exports: [],
})
export class SteamModule {}
