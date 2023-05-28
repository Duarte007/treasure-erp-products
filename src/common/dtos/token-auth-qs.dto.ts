import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokenAuthQueryParam {
  @ApiProperty()
  @IsString()
  token: string;
}
