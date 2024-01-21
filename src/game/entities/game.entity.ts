import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game{
  @PrimaryGeneratedColumn()
  @ApiProperty() 
  id: number;
  
  @Column({ type: 'varchar', length: 30 })
  @ApiProperty() 
  name: string;

  @Column({ type: 'number', length: 10 })
  @ApiProperty() 
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  } 
}