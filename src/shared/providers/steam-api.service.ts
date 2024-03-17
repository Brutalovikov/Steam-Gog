import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { NEVER, lastValueFrom, map, tap } from 'rxjs';
import { Courses } from '../interfaces/courses.interface';
import { SteamUser } from '../interfaces/steam-user.interface';
import { SteamFriend } from '../interfaces/steam-friend.interface';
import { GameStats } from '../interfaces/game-stats.interface';
import { OwnedGames } from '../interfaces/owned-games.interface';
import { Achievement } from '../interfaces/achievement.interface';


@Injectable()
export class SteamApiService {
  constructor(private readonly httpService: HttpService) {}
  apiKey = '9EA0004FFC993ED4C65632B399B53BDB';
  steamApiURL = 'https://api.steampowered.com';
  steamStoreURL = 'https://store.steampowered.com/api/appdetails';
  //Мой стим айде - 76561198280250790

  //https://store.steampowered.com/api/appdetails?appids=550
  getGameInfoForGamePage(gameId: number): Promise<any> {
    return lastValueFrom(
      this.httpService.get(`${this.steamStoreURL}?appids=${gameId}`).pipe(
      map(response => response.data[gameId].data),
    ))
  }

  //https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=9EA0004FFC993ED4C65632B399B53BDB&appid=570
  async getGame(gameId: number): Promise<any> {
    // console.log(await lastValueFrom(
    //   this.httpService.get(`${this.steamURL}/ISteamUserStats/GetSchemaForGame/v2/?key=${this.apiKey}&appid=${gameId}&include_appinfo=true`).pipe(
    //   map(response => response.data),
    // )));
    return lastValueFrom(
      this.httpService.get(`${this.steamApiURL}/ISteamUserStats/GetSchemaForGame/v2/?key=${this.apiKey}&appid=${gameId}`).pipe(
      map(response => response.data),
    ))
  }

  //http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=XXXXXXXXXXXXXXXXX&steamid=76561197960434622&format=json
  getOwnedGames(userId: string): Promise<OwnedGames> {
    return lastValueFrom(
      this.httpService.get(`${this.steamApiURL}/IPlayerService/GetOwnedGames/v0001/?key=${this.apiKey}&steamid=${userId}&include_appinfo=true`).pipe(
      map(res => res.data.response),
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
    // console.log(lastValueFrom(
    //   this.httpService.get(`${this.steamURL}/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${gameId}&key=${this.apiKey}&steamid=${userId}`).pipe(
    //   map(res => res.data),
    // )));
    const info = await this.getGame(parseInt(gameId));
    if(Object.keys(info.game).length != 0) {
      return lastValueFrom(
        this.httpService.get(`${this.steamApiURL}/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${gameId}&key=${this.apiKey}&steamid=${userId}`).pipe(
        map(res => res.data.playerstats),
      ));
    }
    
    return null;
    // else {
    //   let achievement: Achievement[] = [];
    //   achievement.push({icon: "net", name: "Ачивменты отсутствуют", achieved: 1});
    //   return {
    //     steamID: "Неизвестно",
    //     gameName: "Неизвестно",
    //     achievements: achievement
    //   };
    // }
    // const stats = await lastValueFrom(
    //   this.httpService.get(`${this.steamURL}/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${gameId}&key=${this.apiKey}&steamid=${userId}`).pipe(
    //   map(res => res.data.playerstats),
    // ))

    // return stats;
  } 
}