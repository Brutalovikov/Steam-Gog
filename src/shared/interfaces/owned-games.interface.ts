import { Game } from "./game.interface";

export interface OwnedGames {
  game_count: number,
  games: Game[]
}