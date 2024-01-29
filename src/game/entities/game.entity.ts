import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Courses } from "../game.constants";
import { Price } from "../interfaces/price.interface";
import { GameService } from "../game.service";

@Entity()
export class Game{
  @PrimaryGeneratedColumn()
  @ApiProperty() 
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

  constructor(name: string, priceDollar: number, priceRub: number, priceEuro: number) {
    this.name = name;
    this.priceDollar = priceDollar;
    this.priceEuro = priceEuro;
    this.priceRub = priceRub;
  } 
}