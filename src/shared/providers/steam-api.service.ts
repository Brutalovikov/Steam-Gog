import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { SteamUser } from '../interfaces/steam-user.interface';
import { SteamFriend } from '../interfaces/steam-friend.interface';
import { GameStats } from '../interfaces/game-stats.interface';
import { OwnedGames } from '../interfaces/owned-games.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SteamApiService {
  //Здесь все основные ссылки по работе с апи стим, выдергивание контента и тд
  apiKey: string;
  steamApiURL: string;
  steamStoreURL: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService
  ) {
    this.apiKey = this.configService.get('STEAM_API_KEY');
    this.steamStoreURL = `${this.configService.get('STEAM_STORE_URL')}/appdetails`;
    this.steamApiURL = this.configService.get('STEAM_API_URL');
  }

  //https://store.steampowered.com/api/appdetails?appids=550
  getGameInfoForGamePage(gameId: number): Promise<any> {
    return lastValueFrom(
      this.httpService.get(`${this.steamStoreURL}?appids=${gameId}`).pipe(
      map(response => response.data[gameId].data),
    ))
  }

  //https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=9EA0004FFC993ED4C65632B399B53BDB&appid=570
  async getGame(gameId: number): Promise<any> {
    return lastValueFrom(
      this.httpService.get(`${this.steamApiURL}/ISteamUserStats/GetSchemaForGame/v2/?key=${this.apiKey}&appid=${gameId}`).pipe(
      map(response => response.data),
      catchError(error => of(null))
    ))
  }

  //http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=XXXXXXXXXXXXXXXXX&steamid=76561197960434622&format=json
  getOwnedGames(userId: string): Promise<OwnedGames> {
    return lastValueFrom(
      this.httpService.get(`${this.steamApiURL}/IPlayerService/GetOwnedGames/v0001/?key=${this.apiKey}&steamid=${userId}&include_appinfo=true`).pipe(
      map(res => res.data.response),
    ))
  }

  //https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=9EA0004FFC993ED4C65632B399B53BDB&steamids=76561198280250790
  async getUser(userId: string): Promise<any> {
    return lastValueFrom(
      this.httpService.get(`${this.steamApiURL}/ISteamUser/GetPlayerSummaries/v2/?key=${this.apiKey}&steamids=${userId}`).pipe(
      map(response => response.data.response.players[0] ?? null),
    ))
  }

  //http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=76561197960435530&relationship=friend
  getFriendList(userId: string): Promise<SteamFriend[]> {
    return lastValueFrom(
      this.httpService.get(`${this.steamApiURL}/ISteamUser/GetFriendList/v0001/?key=${this.apiKey}&steamid=${userId}&relationship=friend`).pipe(
      map(response => response.data.friendslist.friends),
    ))
  }

  //http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=XXXXXXXXXXXXXXXXXXXXXXX&steamids=76561197960435530
  getUsers(userIds: string[]): Promise<SteamUser[]> {
    return lastValueFrom(
      this.httpService.get(`${this.steamApiURL}/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKey}&steamids=${userIds.join(',')}`).pipe(
      map(res => res.data.response.players),
    ))
  }

   //https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=9EA0004FFC993ED4C65632B399B53BDB&appid=570
   async getAllAchievementsForGame(gameId: number): Promise<any> {
    return lastValueFrom(
      this.httpService.get(`${this.steamApiURL}/ISteamUserStats/GetSchemaForGame/v2/?key=${this.apiKey}&appid=${gameId}`).pipe(
      map(response => response.data.game.availableGameStats.achievements),
    ))
  }

  //http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=76561197972495328
  async getUserStatsForGame(userId: string, gameId: string): Promise<GameStats> {
    const info = await this.getGame(parseInt(gameId));
    if(Object.keys(info.game).length != 0) {
      return lastValueFrom(
        this.httpService.get(`${this.steamApiURL}/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${gameId}&key=${this.apiKey}&steamid=${userId}`).pipe(
        map(res => res.data.playerstats),
      ));
    }
    
    return null;
  } 
}
