import { Body, Controller, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { Achievement } from './entities/achievement.entity';
import { CreateAchievementDTO } from './dto/create-achievement.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccessAchievementDTO } from './dto/access-achievement.dto';
import { CheckAchievementExists } from './shared/interceptors/check-achievement-exists.interceptors';
import { AnsweringAcievement } from './shared/interceptors/answering-acievement.interceptor';

@ApiTags("achievements")
@Controller('achievements')
export class AchievementController {
  constructor(private readonly achievementsService: AchievementService) {}

  @Get()
  async getAchievements(): Promise<Achievement[]> {
    return this.achievementsService.getAchievements();
  }

  @Post()
  async createAchievement(
    @Body() createAchievementDTO: CreateAchievementDTO
  ): Promise<string> {
    const createdAchievement: Achievement = await this.achievementsService.createAchievement(createAchievementDTO);

    return AnsweringAcievement.toString();
  }

  @Patch(':id')
  @UseInterceptors(CheckAchievementExists, AnsweringAcievement)
  @ApiOkResponse({
    description: 'The achievement record',
    type: Achievement,
  })
  async accessAcievement(
    @Param('id') id : number,
    @Body() accessAchievementDTO: AccessAchievementDTO
  ): Promise<String> {
    const accessAcievement = await this.achievementsService.toggleAchievementStatus(accessAchievementDTO, id);
    const achievementStatusTxt = accessAcievement.achieved ? "засчитано" : "теперь не достигнуто)";

    return `Достижение ${accessAcievement.name} в игре ${accessAcievement.game} ${achievementStatusTxt}.`
  }
}

