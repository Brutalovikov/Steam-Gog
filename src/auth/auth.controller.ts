import { Controller, Get, Redirect, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly steamAuthService: AuthService) { }
  
  @Get('steam')
  async redirectToSteamLogin(): Promise<any> {
    console.log('auth')
    const redirectUrl = await this.steamAuthService.getRedirectUrl();
    //res.setHeader('Access-Control-Allow-Origin', "*");
    return {url: redirectUrl};
  }

  @Get('steam/callback')
  async handleSteamLoginCallback(@Req() req: any): Promise<string> {
    const userData = await this.steamAuthService.authenticate(req);
    console.log(userData);
    return `User login`;
  }
}