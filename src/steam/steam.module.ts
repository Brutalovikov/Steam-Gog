import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SteamService } from './steam.service';
import { SteamController } from './steam.controller';
import { SteamApiService } from 'src/shared/providers/steam-api.service';

@Module({
  imports: [HttpModule],
  controllers: [SteamController],
  providers: [SteamService, SteamApiService],
  exports: [],
})
export class SteamModule {}
