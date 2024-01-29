import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AchievementService } from "../../achievement.service";

@Injectable()
export class CheckAchievementExists implements NestInterceptor {
  constructor(private readonly achievementService: AchievementService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const searchedAchievementId = request.params.id;

    const achievement = await this.achievementService.getAchievement(searchedAchievementId);
    if (!achievement) {
      throw new NotFoundException(`Достижения с Id: ${searchedAchievementId} нет.`);
    }

    return next.handle();
  }
}