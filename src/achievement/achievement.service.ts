import { Injectable } from '@nestjs/common';
import { Achievement } from './entities/achievement.entity';
import { CreateAchievementDTO } from './dto/create-achievement.dto';
import { AccessAchievementDTO } from './dto/access-achievement.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AchievementService {
  constructor(
    @InjectModel(Achievement) private achievementModel: typeof Achievement,
  ) {}
  
  async getAchievements(): Promise<Achievement[]> {
    return this.achievementModel.findAll();
  }

  async getAchievement(id: number): Promise<Achievement> {
    return this.achievementModel.findOne({
      where: {
        id,
      }
    })
  }

  async createAchievement(data: CreateAchievementDTO): Promise<Achievement> {
    const achievement = await this.achievementModel.create({
      game: data.game,
      name: data.name,
      description: data.description,
      achieved: data.achieved,
    });

    return achievement;
  }

  async toggleAchievementStatus(data: AccessAchievementDTO, id: number): Promise<Achievement> {
    await this.achievementModel.update(data, {
      where: {
        id,
      },
    });
    
    return this.getAchievement(id);
  }
}
