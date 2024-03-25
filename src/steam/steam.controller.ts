import { Controller, Param, Get, NotFoundException, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SteamService } from './steam.service';
import { FriendsSelection } from './models/friends-selection.model';
import { Achievement } from 'src/shared/interfaces/achievement.interface';
import { GameStats } from 'src/shared/interfaces/game-stats.interface';
import { OwnedGames } from 'src/shared/interfaces/owned-games.interface';
import { CheckGameFromSteam } from 'src/shared/interceptors/check-steam-game-exists.interceptor';
import { CheckUser } from 'src/shared/interceptors/check-user-exists.interceptor';

@ApiTags("steam")
@Controller('steam')
export class SteamController {
  constructor(
    private readonly steamService: SteamService,
  ) {}

  @Get('info/:gameId')
  @UseInterceptors(CheckGameFromSteam)
  async getGameInfoForGamePage(
    @Param('gameId') id : number
  ): Promise<any> {
    return this.steamService.getGameInfoForGamePage(id);
  }

  @Get('user/:userId')
  @UseInterceptors(CheckUser)
  async getUser(
    @Param('userId') id : string
  ): Promise<any> {
    return this.steamService.getUser(id);
  }

  @Get('game/:gameId')
  @UseInterceptors(CheckGameFromSteam)
  async getGameFromSteam(
    @Param('gameId') id : number
  ): Promise<any> {
    return this.steamService.getGameFromSteam(id);
  }

  @Get('games/:userId')
  @UseInterceptors(CheckUser)
  async getOwnedGames(
    @Param('userId') userId : string
  ): Promise<OwnedGames> {
    return this.steamService.getOwnedGames(userId);
  }

  @Get('friends/:userId')
  @UseInterceptors(CheckUser)
  async getFriends(
    @Param('userId') userId : string
  ): Promise<string[]> {
    return this.steamService.getFriends(userId);
  }

  @Get('achievements/:gameId')
  @UseInterceptors(CheckGameFromSteam)
  async getAllAchievementsForGame(
    @Param('gameId') id : number
  ): Promise<any> {
    return this.steamService.getAllAchievementsForGame(id);
  }

  @Get('game/:gameId/stats/:userId')
  @UseInterceptors(CheckGameFromSteam, CheckUser)
  async getUserStatsForGame(
    @Param('userId') userId : string,
    @Param('gameId') gameId : string
  ): Promise<GameStats> {
    const stats = await this.steamService.getUserStatsForGame(userId, gameId);

    if (!stats) throw new NotFoundException("Stats not found.");
    
    return stats;
  }

  @Get('game/:gameId/achievements/:userId')
  @UseInterceptors(CheckGameFromSteam, CheckUser)
  async getUserAchievementsForGame(
    @Param('userId') userId : string,
    @Param('gameId') gameId : string
  ): Promise<Achievement[]> {
    //console.log(await this.steamService.getUserAchievementsForGame(userId, gameId));
    return this.steamService.getUserAchievementsForGame(userId, gameId);
  }

  @Get('friendship/:userId')
  @UseInterceptors(CheckUser)
  async getOldestAndNewestFriends(
    @Param('userId') userId : string
  ): Promise<FriendsSelection> {
    // const friends = await this.steamApiService.getFriendList(userId);
    // const friendshipTime = friends.map(friend => friend.friend_since).join(',');

    // return this.steamApiService.getUserNames(friendshipTime);
    return this.steamService.getOldestAndNewestFriend(userId);
  }
}
