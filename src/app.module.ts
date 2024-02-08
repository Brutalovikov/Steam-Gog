import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AchievementController } from './achievement/achievement.controller';
import { AchievementService } from './achievement/achievement.service';
import { Achievement } from './achievement/entities/achievement.entity';
import { AchievementModule } from './achievement/achievement.module';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';
import { Game } from './game/entities/game.entity';
import { GameModule } from './game/game.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      password: 'rootroot',
      username: 'postgres',
      models: [Achievement, Game],
      database: 'rudevDB2',
      autoLoadModels: true,
      //synchronize: true,
      //logging: false,
    }),
    AchievementModule,
    GameModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
