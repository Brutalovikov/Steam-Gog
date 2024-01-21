import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty} from "class-validator";

export class AccessAchievementDTO {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  achieved: boolean;
}