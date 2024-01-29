import { Injectable, NotFoundException } from '@nestjs/common';
//import { marsAchievements } from './achievements.constants';
import { Achievement } from './entities/achievement.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAchievementDTO } from './dto/create-achievement.dto';
import { Console } from 'console';
import { AccessAchievementDTO } from './dto/access-achievement.dto';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement) private readonly achievementRepository: Repository<Achievement>,
  ) {}
  
  async getAchievements(): Promise<Achievement[]> {
    return this.achievementRepository.find();
  }

  async getAchievement(id: number): Promise<Achievement> {
    return this.achievementRepository.findOneBy({id})
  }

  createAchievement(data: CreateAchievementDTO): Achievement {
    const achievement: Achievement = new Achievement(data.game, data.name, data.description, data.achieved);
    //console.log(achievement);
    this.achievementRepository.save(achievement);
    return achievement;
  }

  async toggleAchievementStatus(data: AccessAchievementDTO, id: number): Promise<Achievement> {
    await this.achievementRepository.update(id, data);
    
    return this.getAchievement(id);
  }
}
