import { Game } from "../entities/game.entity";

export class GameResponseDTO {
  game?: Game | Game[];
  message?: string;
}