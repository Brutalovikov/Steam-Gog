import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Achievement } from './achievement/entities/achievement.entity';
import { AchievementModule } from './achievement/achievement.module';
import { Game } from './game/entities/game.entity';
import { GameModule } from './game/game.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SteamModule } from './steam/steam.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

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
      synchronize: true,
      logging: false,
    }),
    EventEmitterModule.forRoot(),
    AchievementModule,
    GameModule,
    SteamModule,
    PassportModule,
    AuthModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
