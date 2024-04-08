import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { CreateGameDTO } from './dto/create-game.dto';
import { UpdateGameDTO } from './dto/update-game.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Price } from './interfaces/price.interface';
import { CheckGameExists } from '../shared/interceptors/check-game-exists.interceptor';
import { LogGameRequest } from '../shared/interceptors/log-game-request.interceptor';
import { GameResponseDTO } from './dto/game-response.dto';

@ApiTags("games")
@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
  ) {}

  @Get()
  @UseInterceptors(LogGameRequest)
  async getGames(): Promise<Game[]> {
    return this.gameService.getGames();
  }

  @Get(':id/price')
  @UseInterceptors(CheckGameExists, LogGameRequest)
  async getGamePrices(
    @Param('id') id : number
  ): Promise<Price> {

    return this.gameService.getGamePrices(id);
  }

  @Get(':id')
  @UseInterceptors(CheckGameExists)
  async getGame(
    @Param('id') id : number
  ): Promise<GameResponseDTO> {
  const game = await this.gameService.getGame(id);
  const message = `Игра ${game.name} получена.`;
  return {game, message};
  }

  @Post()
  @UseInterceptors(LogGameRequest)
  async createGame(
    @Body() createGameDTO: CreateGameDTO
  ): Promise<Game> {
    return this.gameService.createGame(createGameDTO);
  }

  @Delete(':id')
  @UseInterceptors(CheckGameExists, LogGameRequest)
  async deleteGame(
    @Param('id') id : number
  ): Promise<Game> {
    return this.gameService.deleteGame(id);
  }

  @Patch(':id')
  @UseInterceptors(CheckGameExists, LogGameRequest)
  @ApiOkResponse({
    description: 'The game record',
    type: Game,
  })
  async updateGame(
    @Param('id') id : number,
    @Body() updateGameDTO: UpdateGameDTO
  ): Promise<Game> {
    return this.gameService.updateGame(updateGameDTO, id);
  }
}
