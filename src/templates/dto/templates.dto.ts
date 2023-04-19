import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TemplateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  site_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  schema: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
