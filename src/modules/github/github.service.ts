import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { IIssuesList } from 'src/interfaces/github/issues.interface';
import { GITHUB_BASEURL, GITHUB_USERNAME, GITHUB_TOKEN } from '~/config';

@Injectable()
export class GithubService {
  constructor(private readonly httpService: HttpService) {}

  async getIssuesList({
    per_page,
    page,
  }): Promise<AxiosResponse<IIssuesList[], any>> {
    return this.httpService.axiosRef.get<IIssuesList[]>(
      `${GITHUB_BASEURL}/repos/${GITHUB_USERNAME}/BlogPosts/issues`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
        params: {
          page,
          per_page,
        },
      },
    );
  }
}
