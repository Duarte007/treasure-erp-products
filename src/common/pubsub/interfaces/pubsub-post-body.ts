import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class PubSubPostBodyMessage {
    @IsString()
    @ApiProperty()
    data: string | any

    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    messageId?: string

    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    message_id?: string

    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    publishTime?: string

    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    publish_time?: string
}

export class PubsubPostBody {
    @ApiProperty({ type: PubSubPostBodyMessage })
    message: PubSubPostBodyMessage

    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    subscription?: string
}
