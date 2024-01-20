import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateAchievementDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  game: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  achieved: boolean;
}