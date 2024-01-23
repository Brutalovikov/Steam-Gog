import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { Achievement } from './entities/achievement.entity';
import { CreateAchievementDTO } from './dto/create-achievement.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccessAchievementDTO } from './dto/access-achievement.dto';

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

  @Patch(':id')
  @ApiOkResponse({
    description: 'The achievement record',
    type: Achievement,
  })
  async accessAcievement(
    @Param('id') id : number,
    @Body() accessAchievementDTO: AccessAchievementDTO
  ): Promise<String> {
    //const game = this.gameService.getGame(id);
    //console.log(updateGameDTO);
    const accessAcievement = await this.achievementsService.toggleAchievementStatus(accessAchievementDTO, id);
    const achievementStatusTxt = accessAcievement.achieved ? "засчитано" : "теперь не достигнуто)";
    /*if (!accessAcievement.achieved) {
      return `Достижение ${accessAcievement.name} в игре ${accessAcievement.game} теперь НЕ ДОСТИГНУТО)`;
    }
    else
      return `Достижение ${accessAcievement.name} в игре ${accessAcievement.game} засчитано.`;*/
      return `Достижение ${accessAcievement.name} в игре ${accessAcievement.game} ${achievementStatusTxt}.`
  }
}

