import { Inject, Injectable, NotFoundException } from '@nestjs/common';
//import { marsAchievements } from './achievements.constants';
import { Achievement } from './entities/achievement.entity';
import { CreateAchievementDTO } from './dto/create-achievement.dto';
import { Console } from 'console';
import { AccessAchievementDTO } from './dto/access-achievement.dto';
import { Repository } from 'sequelize-typescript';
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
    //const achievement: Achievement = new Achievement(data.game, data.name, data.description, data.achieved);
    const achievement = await this.achievementModel.create({
      game: data.game,
      name: data.name,
      description: data.description,
      achieved: data.achieved,
    });
    //console.log(achievement); 
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
