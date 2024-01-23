import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDTO } from './dto/create-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { UpdateGameDTO } from './dto/update-game.dto';
import { Price } from './interfaces/price.interface';

@Injectable()
export class GameService {
  //static readonly euroPrice = 0.92;
  //static readonly rubPrice = 89.43;
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
    const game: Game = new Game(data.name, data.priceDollar);
    this.gameRepository.save(game);
    return game;
  }


  async updateGame(data: UpdateGameDTO, id: number): Promise<Game> {
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
    return this.getGame(id);
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

  async getGamePrices(id: number): Promise<Price> {
    const game = await this.getGame(id);
    if (!game) {
      throw new NotFoundException(`Игры с Id: ${id} нет.`);
    }

    return {
      euroPrice: game.priceEuro,
      rubPrice: game.priceRub
    };
  }

  /*conculatePrice(gamePrice: number): number[] {
    //let prices: Array<number> = [gamePrice * GameService.euroPrice, gamePrice * GameService.rubPrice];
    const gp = gamePrice * GameService.euroPrice;
    const rp = gamePrice * GameService.rubPrice;

    return [gp, rp];
  }*/

  /*conculatePrice(gamePrice: number): Price {
    //let prices: Array<number> = [gamePrice * GameService.euroPrice, gamePrice * GameService.rubPrice];
    const price: Price = new 
    const gp = gamePrice * GameService.euroPrice;
    const rp = gamePrice * GameService.rubPrice;

    return [gp, rp];
  }*/
}
