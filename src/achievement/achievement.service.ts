import { Injectable } from '@nestjs/common';
//import { marsAchievements } from './achievements.constants';
import { Achievement } from './entities/achievement.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAchievementDTO } from './dto/achievement.dto';
import { Console } from 'console';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement) private readonly achievementRepository: Repository<Achievement>,
  ) {}
  
  getAchievements(): Promise<Achievement[]> {
    return this.achievementRepository.find();
  }

  createAchievement(data: CreateAchievementDTO): Achievement {
    const achievement: Achievement = new Achievement(data.game, data.name, data.description, data.achieved);
    //console.log(achievement);
    this.achievementRepository.save(achievement);
    return achievement;
  }
}
