import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MyLogger } from '../providers/logger.service';
import { SteamApiService } from '../providers/steam-api.service';

@Injectable()
export class CheckGameFromSteam implements NestInterceptor {
  private readonly logger: MyLogger = new MyLogger(CheckGameFromSteam.name);
  constructor(private readonly steamApiService: SteamApiService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const searchedGameId = request.params.gameId;

    const game = await this.steamApiService.getGame(searchedGameId);
    if(!game) {
      const message = `Игры с Id: ${searchedGameId} нет.`;
      this.logger.error(message);
      throw new NotFoundException(message);
    }
   
    return next.handle()
  }
}