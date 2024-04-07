import { Achievement } from "./achievement.interface";

//Игра + ачивки к ней для таблицы
export interface GameStats {
  steamID: string,
  gameName: string,
  achievements: Achievement[]
}