import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { CreateGameDTO } from './dto/create-game.dto';
import { UpdateGameDTO } from './dto/update-game.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Price } from './interfaces/price.interface';

@ApiTags("games")
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  getGames(): Promise<Game[]> {
    return this.gameService.getGames();
  }

  @Get(':id/price')
  async getGamePrices(
    @Param('id') id : number
  ): Promise<Price> {
   // const g = await this.gameService.getGamePrices(id);
   // console.log(g[0], g[1]);
    return this.gameService.getGamePrices(id);
  }

  @Get(':id')
  async getGame(
    @Param('id') id : number
  ): Promise<Game> {
   // const g = await this.gameService.getGamePrices(id);
   // console.log(g[0], g[1]);
    return this.gameService.getGame(id);
  }

  @Post()
  createGame(
    @Body() createGameDTO: CreateGameDTO
  ): string {
    const createdGame: Game = this.gameService.createGame(createGameDTO);
    return `Игра ${createdGame.name} добавлена.`;
  }

  @Delete(':id')
  async deleteGame(
    @Param('id') id : number
  ): Promise<string> {
    const deletedGame = await this.gameService.deleteGame(id);
    return `Игра ${deletedGame.name} удалена.`;
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The game record',
    type: Game,
  })
  updateGame(
    @Param('id') id : number,
    @Body() updateGameDTO: UpdateGameDTO
  ): Promise<Game> {
    //const game = this.gameService.getGame(id);
    console.log(updateGameDTO);
    return this.gameService.updateGame(updateGameDTO, id);
  }
}
