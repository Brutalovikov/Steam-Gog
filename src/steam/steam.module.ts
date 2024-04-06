import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SteamService } from './steam.service';
import { SteamController } from './steam.controller';
import { SteamApiService } from 'src/shared/providers/steam-api.service';
import { SteamAuthService } from 'src/shared/providers/auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    HttpModule, 
    PassportModule.register({
      defaultStrategy: 'steam',
    }),
  ],
  controllers: [SteamController],
  providers: [SteamService, SteamApiService, SteamAuthService, AuthService],
  exports: [],
})
export class SteamModule {}
