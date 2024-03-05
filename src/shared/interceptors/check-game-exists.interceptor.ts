import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GameService } from '../../game/game.service';

@Injectable()
export class CheckGameExists implements NestInterceptor {
  constructor(private readonly gameService: GameService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const searchedGameId = request.params.id;

    const game = await this.gameService.getGame(searchedGameId);
    console.log(game);
    if (!game) {
      throw new NotFoundException(`Игры с Id: ${searchedGameId} нет.`);
    }

    return next.handle();
  }
}