import { Module } from "@nestjs/common";
import { Game } from "./entities/game.entity";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { HttpModule } from "@nestjs/axios";
import { CurrencyService } from "../shared/providers/currency.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { SteamApiService } from "../shared/providers/steam-api.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [SequelizeModule.forFeature([Game]), HttpModule, ConfigModule],
  controllers: [GameController],
  providers: [GameService, CurrencyService, SteamApiService],
  exports: [SequelizeModule],
})
export class GameModule {}