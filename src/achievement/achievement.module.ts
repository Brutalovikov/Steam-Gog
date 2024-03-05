import { Module } from "@nestjs/common";
import { Achievement } from "./entities/achievement.entity";
import { AchievementController } from "./achievement.controller";
import { AchievementService } from "./achievement.service";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([Achievement])],
  controllers: [AchievementController],
  providers: [AchievementService],
  exports: [SequelizeModule]
})
export class AchievementModule {}