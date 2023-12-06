import { Controller, Get } from '@nestjs/common';
import { GraphqlsService } from './graphqls.service';

@Controller()
export class GraphqlsController {
  constructor(private readonly graphqlsService: GraphqlsService) {}

  @Get()
  getHello(): string {
    return this.graphqlsService.getHello();
  }
}
