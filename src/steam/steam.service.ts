import { Injectable } from '@nestjs/common';
import { SteamApiService } from '../shared/providers/steam-api.service';
import { FriendsSelection } from './models/friends-selection.model';
import { Achievement } from '../shared/interfaces/achievement.interface';
import { OwnedGames } from '../shared/interfaces/owned-games.interface';
import { MyLogger } from '../shared/providers/logger.service';

@Injectable()
export class SteamService {
  private readonly logger: MyLogger = new MyLogger(SteamService.name);
  constructor(
    private readonly steamApiService: SteamApiService,
  ) {}

  //==============================ПО ЮЗЕРАМ==============================
  //Достать старейшего и новейшего друга узера
  async getOldestAndNewestFriend(userId: string): Promise<FriendsSelection> {
    const friends = await this.steamApiService.getFriendList(userId);
    const sortedByDateFriends = friends.sort((a, b) => a.friend_since - b.friend_since);
    const selectedFriends = await this.steamApiService.getUsers([sortedByDateFriends[0].steamid, sortedByDateFriends[sortedByDateFriends.length - 1].steamid]);

    return {
      oldest_friend: selectedFriends.find(friend =>  friend.steamid == sortedByDateFriends[0].steamid).personaname,
      newest_friend: selectedFriends.find(friend =>  friend.steamid == sortedByDateFriends[sortedByDateFriends.length - 1].steamid).personaname
    };
  }

  //Достать данные профиля
  async getUser(userId: string) {
    return this.steamApiService.getUser(userId);
  }

  //Достать всех друзей пользователя
  async getFriends(userId: string) {
    const friends = await this.steamApiService.getFriendList(userId);
    const friendsIds = friends.map(friend => friend.steamid);
    const users = await this.steamApiService.getUsers(friendsIds);

    return users.map(player => player.personaname);
  }

  //==============================ПО АЧИВКАМ И СТАТАМ==============================
  //Достать все ачивменты по игрушке
  async getAllAchievementsForGame(gameId: number) {
    return this.steamApiService.getAllAchievementsForGame(gameId);
  }

  //Достать все статы юзера по игрушке
  async getUserStatsForGame(userId: string, gameId: string) {
    return this.steamApiService.getUserStatsForGame(userId, gameId);
  }

  //Достать все достигнутые узером ачивменты по игре
  async getUserAchievementsForGame(userId: string, gameId: string): Promise<Achievement[]> {
    this.logger.log(`Пользователь ${userId} запросил данные об игре ${gameId}`);
    const stats = await this.getUserStatsForGame(userId, gameId);

    if (!stats) return [];

    let achievementsArr: Achievement[] = [];
    const all = await this.getAllAchievementsForGame(parseInt(gameId));

    all.forEach(achievement => {
      let statsAchievement = stats.achievements.find(statAchievement => statAchievement.name == achievement.name);
      achievementsArr.push({
          icon: achievement.icon, 
          name: achievement.displayName,
          description: achievement.description,
          achieved: !!statsAchievement,
      }); 
    });

    return achievementsArr;
  }

  //Качаем всю инфу по игре, чтоб заполнить карточку игры
  async getGameInfoForGamePage(id: number) {
    return this.steamApiService.getGameInfoForGamePage(id);
  }

  //==============================ПО ИГРУШКАМ==============================
  //Достать игру из стима
  async getGameFromSteam(id: number) {
    return this.steamApiService.getGame(id);
  }

  //Достать игрухи пользователя
  async getOwnedGames(userId: string): Promise<OwnedGames> {
    const ownedGames = await this.steamApiService.getOwnedGames(userId);

    return ownedGames;
  }

  //Получить название игры
  async getGameName(gameId: number) {
    const game = await this.steamApiService.getGame(gameId);

    return game.game.gameName;
  }
}
