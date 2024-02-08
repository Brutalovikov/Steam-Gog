import { ApiProperty } from "@nestjs/swagger";
import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Game extends Model<Game>{
  @Column
  @ApiProperty() 
  name: string;

  @Column
  @ApiProperty() 
  priceDollar: number;

  @Column
  @ApiProperty() 
  priceRub: number;

  @Column
  @ApiProperty() 
  priceEuro: number;

  /*constructor(name: string, priceDollar: number, priceRub: number, priceEuro: number) {
    super();
    this.name = name;
    this.priceDollar = priceDollar;
    this.priceEuro = priceEuro;
    this.priceRub = priceRub;
  } */
}