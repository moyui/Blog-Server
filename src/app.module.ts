import { Module } from '@nestjs/common';
import { GithubModule } from './modules/github/github.module';

@Module({
  imports: [GithubModule],
})
export class AppModule {}
