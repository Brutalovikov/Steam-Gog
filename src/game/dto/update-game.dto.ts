import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateGameDTO {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional()
  priceDollar?: number;
}