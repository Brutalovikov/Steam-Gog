import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SteamService } from './steam.service';
import { SteamController } from './steam.controller';
import { SteamApiService } from 'src/shared/providers/steam-api.service';
import { AuthService } from 'src/shared/providers/auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    HttpModule, 
    PassportModule.register({
      defaultStrategy: 'steam',
    }),
  ],
  controllers: [SteamController],
  providers: [SteamService, SteamApiService, AuthService],
  exports: [],
})
export class SteamModule {}
