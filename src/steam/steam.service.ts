import { Injectable } from '@nestjs/common';
import { SteamApiService } from 'src/shared/providers/steam-api.service';
import { FriendsSelection } from './models/friends-selection.model';
import { Achievement } from 'src/shared/interfaces/achievement.interface';
import { OwnedGames } from 'src/shared/interfaces/owned-games.interface';
import { Game } from 'src/shared/interfaces/game.interface';

@Injectable()
export class SteamService {
  constructor(
    private readonly steamApiService: SteamApiService,
  ) {}

  async getOldestAndNewestFriend(userId: string): Promise<FriendsSelection> {
    const friends = await this.steamApiService.getFriendList(userId);
    const sortedByDateFriends = friends.sort((a, b) => a.friend_since - b.friend_since);
    const selectedFriends = await this.steamApiService.getUsers([sortedByDateFriends[0].steamid, sortedByDateFriends[sortedByDateFriends.length - 1].steamid]);

    return {
      oldest_friend: selectedFriends.find(friend =>  friend.steamid == sortedByDateFriends[0].steamid).personaname,
      newest_friend: selectedFriends.find(friend =>  friend.steamid == sortedByDateFriends[sortedByDateFriends.length - 1].steamid).personaname
    };
  }

  async getFriends(userId: string) {
    const friends = await this.steamApiService.getFriendList(userId);
    const friendsIds = friends.map(friend => friend.steamid);
    const users = await this.steamApiService.getUsers(friendsIds);

    return users.map(player => player.personaname);
  }

  async getUserStatsForGame(userId: string, gameId: string) {
    return this.steamApiService.getUserStatsForGame(userId, gameId);
  }

  async getUserAchievementsForGame(userId: string, gameId: string): Promise<Achievement[]> {
    const stats = await this.getUserStatsForGame(userId, gameId);
    //console.log(stats);

    return stats.achievements;
  }

  async getGameFromSteam(id: number) {
    return this.steamApiService.getGame(id);
  }

  async getOwnedGames(userId: string): Promise<OwnedGames> {
    const ownedGames = await this.steamApiService.getOwnedGames(userId);
    //let counter: number = 0;
    //console.log(ownedGames.games[0].appid);
    //ownedGames.games[0].gameName = this.getGameName(251570)

    /*for(let i = 0; i < ownedGames.games.length; i++) {
      ownedGames.games[i].gameName = await this.getGameName(ownedGames.games[i].appid);
      if(ownedGames.games[i].gameName == undefined) {
        ownedGames.games[i].gameName = counter.toString();
        counter++;
      }       
    }*/
       
    //console.log(1, ownedGames);
   /* for(let i = 0; i < ownedGames.games.length; i++) {
      //let appId = await this.steamApiService.getAppId(userId, i);
      ownedGames.games[i].gameName = this.getGameName(appId);
      //console.log(2, ownedGames.games[i].gameName);
    }*/
    //const gameNames = await this.steamApiService.getGame(ownedGames.games[0].gameName);
    //console.log(ownedGames);
    return ownedGames;
  }

  async getGameName(gameId: number) {
    const game = await this.steamApiService.getGame(gameId);
    //console.log(3, game.game.gameName);

    return game.game.gameName;
  }
}
