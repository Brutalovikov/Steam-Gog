import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AchievementController } from './achievement/achievement.controller';
import { AchievementService } from './achievement/achievement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from './achievement/entities/achievement.entity';
import { AchievementModule } from './achievement/achievement.module';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';
import { Game } from './game/entities/game.entity';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      password: 'rootroot',
      username: 'postgres',
      entities: [Achievement, Game],
      database: 'rudevDB',
      synchronize: true,
      logging: false,
    }),
    AchievementModule,
    GameModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
