import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GetListDto {
  @ApiProperty({ description: '当前页数', required: true })
  @IsNumberString()
  page: number;

  @ApiProperty({ description: '页大小', required: true })
  @IsNumberString()
  pageSize: number;
}
