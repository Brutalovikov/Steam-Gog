import { Module } from "@nestjs/common";
import { Game } from "./entities/game.entity";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { HttpModule } from "@nestjs/axios";
import { CurrencyService } from "../shared/providers/currency.service";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([Game]), HttpModule],
  controllers: [GameController],
  providers: [GameService, CurrencyService],
  exports: [SequelizeModule],
})
export class GameModule {}