import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GameService } from '../../game/game.service';
import { MyLogger } from '../providers/logger.service';

@Injectable()
export class CheckGameExists implements NestInterceptor {
  private readonly logger: MyLogger = new MyLogger(CheckGameExists.name);
  constructor(private readonly gameService: GameService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const searchedGameId = request.params.id;

    const game = await this.gameService.getGame(searchedGameId);
    if (!game) {
      this.logger.error(`Игры с Id: ${searchedGameId} нет.`);
      throw new NotFoundException(`Игры с Id: ${searchedGameId} нет.`);   
    }

    return next.handle();
  }
}