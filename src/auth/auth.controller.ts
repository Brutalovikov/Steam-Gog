import { Controller, Get, Req, Res, Sse } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { MyLogger } from '../shared/providers/logger.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  public userAuth: boolean = false;
  public userData: any = null;
  private readonly logger: MyLogger = new MyLogger(AuthController.name);
  private authBS = new BehaviorSubject(null);
  frontURL: string;

  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {
    this.frontURL = this.configService.get('FRONT_URL');
  }
  
  //Перенаправляет пользователя на страницу авторизации Стим
  @Get('steam')
  async redirectToSteamLogin(): Promise<any> {
    const redirectUrl = await this.authService.getRedirectUrl();

    return {url: redirectUrl};
  }

  //Получение данных юзера со стима
  @Get('steam/callback')
  async handleSteamLoginCallback(@Req() req: any, @Res() res: any): Promise<any> {
    this.userData = await this.authService.authenticate(req);
    this.userAuth = true;
    this.authBS.next(this.userData.steamid);
    return res.redirect(this.frontURL);
  }

  @Get('steam/logout')
  async logout() {
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