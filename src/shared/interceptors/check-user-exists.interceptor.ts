import { Injectable, NestInterceptor, ExecutionContext, CallHandler, NotFoundException } from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';
import { MyLogger } from '../providers/logger.service';
import { SteamApiService } from '../providers/steam-api.service';

@Injectable()
export class CheckUser implements NestInterceptor {
  private readonly logger: MyLogger = new MyLogger(CheckUser.name);
  constructor(private readonly steamApiService: SteamApiService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const userId = request.params.userId;

    const game = await this.steamApiService.getUser(userId);
    if(!game) {
      const message = `Пользователя с Id: ${userId} нет.`;
      this.logger.error(message);
      throw new NotFoundException(message);
    }
   
    return next.handle()
  }
}