import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Achievement extends Model{
  @Column 
  game: string;

  @Column
  name: string;

  @Column 
  description: string;

  @Column
  achieved: boolean;

  /*constructor(game: string, name: string, description: string, achieved: boolean) {
    super();
    this.game = game;
    this.name = name;
    this.description = description;
    this.achieved = achieved;
  }*/
}