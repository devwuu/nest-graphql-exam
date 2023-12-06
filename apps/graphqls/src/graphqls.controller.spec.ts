import { Test, TestingModule } from '@nestjs/testing';
import { GraphqlsController } from './graphqls.controller';
import { GraphqlsService } from './graphqls.service';

describe('GraphqlsController', () => {
  let graphqlsController: GraphqlsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GraphqlsController],
      providers: [GraphqlsService],
    }).compile();

    graphqlsController = app.get<GraphqlsController>(GraphqlsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(graphqlsController.getHello()).toBe('Hello World!');
    });
  });
});
