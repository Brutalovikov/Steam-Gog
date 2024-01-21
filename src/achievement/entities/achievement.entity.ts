import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Achievement{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', length: 30 }) 
  game: string;

  @Column({ type: 'varchar', length: 30 }) 
  name: string;

  @Column({ type: 'varchar', length: 30 }) 
  description: string;

  @Column({ type: 'boolean'}) 
  achieved: boolean;

  constructor(game: string, name: string, description: string, achieved: boolean) {
    this.game = game;
    this.name = name;
    this.description = description;
    this.achieved = achieved;
  } 
}