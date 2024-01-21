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
  
  getAchievements(): Promise<Achievement[]> {
    return this.achievementRepository.find();
  }

  getAchievement(id: number): Promise<Achievement> {
    return this.achievementRepository.findOneBy({id})
  }

  createAchievement(data: CreateAchievementDTO): Achievement {
    const achievement: Achievement = new Achievement(data.game, data.name, data.description, data.achieved);
    //console.log(achievement);
    this.achievementRepository.save(achievement);
    return achievement;
  }

  async accessAchievement(data: AccessAchievementDTO, id: number): Promise<Achievement> {
    const game = await this.getAchievement(id);
    if (!game) {
      throw new NotFoundException(`Достижения с Id: ${id} нет.`);
    }
    await this.achievementRepository.update(id, data);
    return this.getAchievement(id);
  }
}
