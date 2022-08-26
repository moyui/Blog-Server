import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/interfaces/response.interface';

import { GetListDto } from './dto/github.dto';
import { GithubService } from './github.service';

@ApiTags('blog接口')
@Controller('v1/blog')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('getList')
  async getList(@Query() resource: GetListDto): Promise<IResponse<any>> {
    const { page, pageSize } = resource;
    try {
      const vo = {
        page: page ?? 1,
        per_page: pageSize ?? 10,
      };
      const res = await this.githubService.getIssuesList(vo);
      return {
        status: '0',
        message: 'ok',
        data: res.data,
      };
    } catch (e) {
      console.error('error detail:', e);
      throw new HttpException('error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
