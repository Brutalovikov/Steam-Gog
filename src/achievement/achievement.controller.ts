import { Body, Controller, Get, Post } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { Achievement } from './entities/achievement.entity';
import { CreateAchievementDTO } from './dto/achievement.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("achievements")
@Controller('achievements')
export class AchievementController {
  constructor(private readonly achievementsService: AchievementService) {}

  @Get()
  getAchievements(): Promise<Achievement[]> {
    return this.achievementsService.getAchievements();
  }

  @Post()
  createAchievement(
    @Body() createAchievementDTO: CreateAchievementDTO
  ): string {
    const createdAchievement: Achievement = this.achievementsService.createAchievement(createAchievementDTO);
    return `Добавлено - ${createdAchievement.name}`;
  }
}
