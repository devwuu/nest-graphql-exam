import { Injectable } from '@nestjs/common';

@Injectable()
export class GraphqlsService {
  getHello(): string {
    return 'Hello World!';
  }
}
