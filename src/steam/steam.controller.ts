import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SteamService } from './steam.service';
import { FriendsSelection } from './models/friends-selection.model';
import { Achievement } from 'src/shared/interfaces/achievement.interface';
import { GameStats } from 'src/shared/interfaces/game-stats.interface';
import { OwnedGames } from 'src/shared/interfaces/owned-games.interface';

@ApiTags("steam")
@Controller('steam')
export class SteamController {
  constructor(
    private readonly steamService: SteamService,
  ) {}

  @Get('game/:id')
  async getGameFromSteam(
    @Param('id') id : number
  ): Promise<any> {
    return this.steamService.getGameFromSteam(id);
  }

  @Get('games/:userId')
  async getOwnedGames(
    @Param('userId') userId : string
  ): Promise<OwnedGames> {
    return this.steamService.getOwnedGames(userId);
  }

  @Get('friends/:userId')
  async getFriends(
    @Param('userId') userId : string
  ): Promise<string[]> {
    return this.steamService.getFriends(userId);
  }

  @Get('game/:gameId/stats/:userId')
  async getUserStatsForGame(
    @Param('userId') userId : string,
    @Param('gameId') gameId : string
  ): Promise<GameStats> {
    return this.steamService.getUserStatsForGame(userId, gameId);
  }

  @Get('game/:gameId/achievements/:userId')
  async getUserAchievementsForGame(
    @Param('userId') userId : string,
    @Param('gameId') gameId : string
  ): Promise<Achievement[]> {
    return this.steamService.getUserAchievementsForGame(userId, gameId);
  }

  @Get('friendship/:userId')
  async getOldestAndNewestFriends(
    @Param('userId') userId : string
  ): Promise<FriendsSelection> {
    // const friends = await this.steamApiService.getFriendList(userId);
    // const friendshipTime = friends.map(friend => friend.friend_since).join(',');

    // return this.steamApiService.getUserNames(friendshipTime);
    return this.steamService.getOldestAndNewestFriend(userId);
  }
}
