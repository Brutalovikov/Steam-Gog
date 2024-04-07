import { Injectable } from '@nestjs/common';
import { CreateGameDTO } from './dto/create-game.dto';
import { Game } from './entities/game.entity';
import { UpdateGameDTO } from './dto/update-game.dto';
import { Price } from './interfaces/price.interface';
import { CurrencyService } from '../shared/providers/currency.service';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game) private readonly gameModel: typeof Game, 
    private readonly currencyService: CurrencyService
  ) {}
  
  async getGames(): Promise<Game[]> {
    return this.gameModel.findAll();
  }

  async getGame(id: number): Promise<Game> {
    return this.gameModel.findOne({
      where: {
        id,
      }
    })
  }

  async createGame(data: CreateGameDTO): Promise<Game> {
    const prices = await this.calculatePrice(data.priceDollar);
    const game = await this.gameModel.create({
      name: data.name,
      priceDollar: data.priceDollar,
      priceRub: prices.priceRub,
      priceEuro: prices.priceEuro,
    });

    return game;
  }


  async updateGame(data: UpdateGameDTO, id: number): Promise<Game> {
    const game = await this.getGame(id);
    if (data.priceDollar) 
      await this.gameModel.update({...data, ...this.calculatePrice(data.priceDollar)}, {
        where: {
          id,
        },
      });
    else 
      await this.gameModel.update(data, {
        where: {
          id,
        },
      });

    return this.getGame(id);
  }

  async deleteGame(gameId: number) {
    const game = await this.getGame(gameId);

    await this.gameModel.destroy({
      where: {
        id: game.id,
      }
    });
    return game;
  }

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
}
