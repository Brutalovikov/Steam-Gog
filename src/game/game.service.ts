import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDTO } from './dto/create-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { UpdateGameDTO } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
  ) {}
  
  getGames(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  getGame(id: number): Promise<Game> {
    return this.gameRepository.findOneBy({id})
  }

  createGame(data: CreateGameDTO): Game {
    const game: Game = new Game(data.name);
    this.gameRepository.save(game);
    return game;
  }

  async updateGame(data: UpdateGameDTO, id: number) {
    const game = await this.getGame(id);
    if (!game) {
      throw new NotFoundException(`Игры с Id: ${id} нет.`);
    }
    /*
    for (const [key, value] of Object.entries(data.name)) {
      game[key] = value;
    }

    game.id = id;
    //game.name = rename;
    await this.gameRepository.save(game);*/
    await this.gameRepository.update(id, data);
  }

  async deleteGame(gameId: number) {
    const game = await this.getGame(gameId);
    if (!game) {
      throw new NotFoundException(`Игры с Id: ${gameId} нет.`);
    }
    await this.gameRepository.delete(game.id);
    return game;
  }
 /* async deleteGame(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }*/
 /* createGame(createGameDTO: CreateGameDTO): import("./entities/game.entity").Game {
    throw new Error('Method not implemented.');
  }
  getGames(): Promise<import("./entities/game.entity").Game[]> {
    throw new Error('Method not implemented.');
  }*/
}