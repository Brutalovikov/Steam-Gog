import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './entities/game.entity';
import { CreateGameDTO } from './dto/create-game.dto';
import { UpdateGameDTO } from './dto/update-game.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("games")
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  getGames(): Promise<Game[]> {
    return this.gameService.getGames();
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
  ) {
    const deletedGame = await this.gameService.deleteGame(id);
    return `Игра ${deletedGame.name} удалена.`;
  }

  @Patch(':id')
  updateGame(
    @Param('id') id : number,
    @Body() updateGameDTO: UpdateGameDTO
  ) {
    //const game = this.gameService.getGame(id);
    console.log(updateGameDTO);
    this.gameService.updateGame(updateGameDTO, id);
  }
}
