import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { GameService } from "../../game/game.service";

@Injectable()
export class LogGameRequest implements NestInterceptor {
  constructor(private readonly gameService: GameService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest();


    return next.handle().pipe(
      tap(game => {
        let message: string = '';  
        switch (request.method) {
          case 'GET':
            var hasPrice = /game\/\d\/price/;
            hasPrice.test("ABC33SDF");
            if (/game\/\d\/price/.test(request.url)) {
              message = 'Цена найдена.';
            }
            else if(/game\/\d/.test(request.url)) {
              message = `Игра ${game.name} найдена.`;
            }
            else {
              message = 'Игры найдены.';
            }
            break;
          case 'POST':
            message = `Игра ${game.name} добавлена.`;
            break;
          case 'DELETE':
            message = `Игра ${game.name} удалена.`;
            break;
          case 'PATCH':
            message = `Игра ${game.name} изменена.`;
            break;    
          default:
            break;
        }
        console.log(message);
      }),
    );
  }
}