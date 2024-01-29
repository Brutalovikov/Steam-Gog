import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDTO } from './dto/create-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { Repository } from 'typeorm';
import { UpdateGameDTO } from './dto/update-game.dto';
import { Price } from './interfaces/price.interface';
import { Courses } from './game.constants';
import { CurrencyService } from '../shared/providers/currency.service';

@Injectable()
export class GameService {
  //static readonly euroPrice = 0.92;
  //static readonly rubPrice = 89.43;
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>, 
    private readonly currencyService: CurrencyService
  ) {}
  
  async getGames(): Promise<Game[]> {
    //console.log(await this.currencyService.getCourses());
    return this.gameRepository.find();
  }

  async getGame(id: number): Promise<Game> {
    return this.gameRepository.findOneBy({id})
  }

  async createGame(data: CreateGameDTO): Promise<Game> {
    const prices = await this.calculatePrice(data.priceDollar);
    const game: Game = new Game(data.name, data.priceDollar, prices.priceRub, prices.priceEuro);

    this.gameRepository.save(game);
    return game;
  }


  async updateGame(data: UpdateGameDTO, id: number): Promise<Game> {
    const game = await this.getGame(id);
    /*
    for (const [key, value] of Object.entries(data.name)) {
      game[key] = value;
    }

    game.id = id;
    //game.name = rename;
    await this.gameRepository.save(game);*/
    /*game.calculatePrice(data.priceDollar);
    const shit = await this.getGamePrices(game.id);
    console.log(shit);*/
    if (data.priceDollar) 
      await this.gameRepository.update(id, {...data, ...this.calculatePrice(data.priceDollar)});
    else 
      await this.gameRepository.update(id, data);

    return this.getGame(id);
  }

  async deleteGame(gameId: number) {
    const game = await this.getGame(gameId);

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

    return {
      priceRub: game.priceRub,
      priceEuro: game.priceEuro
    };
  }

  public async calculatePrice( priceDollar: number): Promise<Price> {
    const courses = await this.currencyService.getCourses();

    const priceRub = Math.floor(priceDollar / courses.usd);
    const priceEuro = Math.floor(priceRub * courses.eur);

    return {priceRub, priceEuro};
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
