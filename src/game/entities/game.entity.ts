import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Courses } from "../game.constants";

@Entity()
export class Game{
  @PrimaryGeneratedColumn()
  @ApiProperty() 
  id: number;
  
  @Column({ type: 'varchar', length: 30 })
  @ApiProperty() 
  name: string;

  @Column({ type: 'int'})
  @ApiProperty() 
  priceDollar: number;

  @Column({ type: 'int'})
  @ApiProperty() 
  priceRub: number;

  @Column({ type: 'int'})
  @ApiProperty() 
  priceEuro: number;

  constructor(name: string, priceDollar: number) {
    this.name = name;
    this.priceDollar = priceDollar;
    this.priceRub = priceDollar * Courses.rubCours;
    this.priceEuro = priceDollar * Courses.euroCours;
  } 
}