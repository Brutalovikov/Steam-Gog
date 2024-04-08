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
}