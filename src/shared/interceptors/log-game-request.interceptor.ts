import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LogGameRequest implements NestInterceptor {
  //ДЛЯ ЛОГА ДАННЫХ ИЗ БД
  constructor() {}

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