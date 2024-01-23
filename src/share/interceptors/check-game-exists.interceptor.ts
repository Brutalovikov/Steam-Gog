import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GameService } from '../../game/game.service';

@Injectable()
export class CheckGameExists implements NestInterceptor {
  constructor(private readonly gameService: GameService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const searchedGameId = request.params.id;

    const game = this.gameService.getGame(searchedGameId);
    if (!game) {
      throw new NotFoundException(`Игры с Id: ${searchedGameId} нет.`);
    }

    return next.handle();
  }
}