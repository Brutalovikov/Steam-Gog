import { Game } from "./game.interface";

//Игры для таблицы + их кол-во для карточки
export interface OwnedGames {
  game_count: number,
  games: Game[]
}