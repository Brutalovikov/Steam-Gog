import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam'; 
import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async getUserInfo(steamId: string) {
    const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=9EA0004FFC993ED4C65632B399B53BDB&steamids=${steamId}`);
    return response.data;
  }

  async validate(identifier: string): Promise<any> {
    // Здесь можно добавить логику для проверки пользователя в вашей системе
    // Например, проверить есть ли пользователь с таким идентификатором в базе данных
    // Если пользователь найден, вернуть его данные
    // Если не найден, можно создать нового пользователя на основе данных из Steam и вернуть его данные
    // В случае ошибки, можно выбросить UnauthorizedException
    // Пример:
    // const user = await this.userService.findOrCreateUser(identifier);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
  }
}