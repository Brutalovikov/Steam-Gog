import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "./entities/game.entity";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { HttpModule } from "@nestjs/axios";
import { CurrencyService } from "../shared/providers/currency.service";

@Module({
  imports: [TypeOrmModule.forFeature([Game]), HttpModule],
  controllers: [GameController],
  providers: [GameService, CurrencyService],
})
export class GameModule {}