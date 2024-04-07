import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam'; 
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SteamAuthService extends PassportStrategy(Strategy) {
  constructor() {
    super({
      returnURL: 'http://localhost:3000/auth/steam/return',
      realm: 'http://localhost:3000/',
      apiKey: '9EA0004FFC993ED4C65632B399B53BDB',
    });
  }

  //Тут по апи ссыле получаются все данные для авторизации
  async getUserInfo(steamId: string) {
    const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=9EA0004FFC993ED4C65632B399B53BDB&steamids=${steamId}`);
    return response.data;
  }

  async validate(identifier: string): Promise<any> {

  }
}