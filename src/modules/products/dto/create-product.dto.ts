import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty()
  @IsDefined()
  @IsString()
  name: string;
  @ApiProperty()
  @IsDefined()
  @IsString()
  description: string;
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  quantity: number;
}
