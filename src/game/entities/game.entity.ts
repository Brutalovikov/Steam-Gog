import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', length: 30 }) 
  name: string;

  constructor(name: string) {
    this.name = name;
  } 
}