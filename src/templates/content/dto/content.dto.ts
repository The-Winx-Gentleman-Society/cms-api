import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SaveContentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  site: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  template: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
