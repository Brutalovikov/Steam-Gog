import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam'; 
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SteamAuthService extends PassportStrategy(Strategy) {
  returnURL: string;
  realm: string;
  apiKey: string;

  constructor(
    private configService: ConfigService,
  ) {
    super({
      returnURL: `${configService.get('BACK_URL')}/auth/steam/return`,
      realm: `${configService.get('BACK_URL')}/`,
      apiKey: configService.get('STEAM_API_KEY'),
    });
  }

  //Тут по апи ссыле получаются все данные для авторизации
  async getUserInfo(steamId: string) {
    const response = await axios.get(`${this.configService.get('STEAM_API_URL')}/ISteamUser/GetPlayerSummaries/v0002/?key=${this.configService.get('STEAM_API_KEY')}&steamids=${steamId}`);
    return response.data;
  }

  async validate(identifier: string): Promise<any> {

  }
}