import { Achievement } from "./achievement.interface";

export interface GameStats {
  steamID: string,
  gameName: string,
  achievements: Achievement[]
}