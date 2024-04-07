import { Controller, Get, Req, Res, Sse } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, distinctUntilChanged, fromEvent, interval, map, of, tap } from 'rxjs';
import { MyLogger } from 'src/shared/providers/logger.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('auth')
export class AuthController {
  public userAuth: boolean = false;
  public userData: any = null;
  private readonly logger: MyLogger = new MyLogger(AuthController.name);
  private authBS = new BehaviorSubject(null);

  constructor(
    private readonly authService: AuthService,
  ) {}
  
  //Перенаправляет пользователя на страницу авторизации Стим
  @Get('steam')
  async redirectToSteamLogin(): Promise<any> {
    const redirectUrl = await this.authService.getRedirectUrl();

    return {url: redirectUrl};
  }

  //Получение данных юзера со стима
  @Get('steam')
  async redirectToSteamLogin(): Promise<any> {
    const redirectUrl = await this.authService.getRedirectUrl();
    //res.setHeader('Access-Control-Allow-Origin', "*");
    return {url: redirectUrl};
  }

  @Get('steam/callback')
  async handleSteamLoginCallback(@Req() req: any, @Res() res: any): Promise<any> {
    this.userData = await this.authService.authenticate(req);
    this.userAuth = true;
    this.authBS.next(this.userData.steamid);
    return res.redirect('http://localhost:4200');
  }

  @Get('steam/logout')
  async logout() {
    console.log("lagg");
    this.userData = null;
    this.userAuth = false;
    this.authBS.next(null);
  }

  //SSE Отправляет данные авторизованного пользователя на фронт
  @Sse('sse')
  sse(): Observable<MessageEvent> {  
    if(this.userAuth) {
      return this.authBS.pipe(
        tap(() => this.logger.log("Log IN")),
        map((_) => ({ data: { 
          userId: this.userData.steamid, 
          userName: this.userData.username,
          avatar: this.userData.avatar.medium
        } }) as MessageEvent),
        tap(() => console.log(this.userData)),
      )
    }
    else {
      return this.authBS.pipe(
        tap(() => this.logger.log("Log OUT")),
        map((_) => ({ data: { userId: this.userData, userName: this.userData, avatar: this.userData } }) as MessageEvent),
      )
    }
  }
}