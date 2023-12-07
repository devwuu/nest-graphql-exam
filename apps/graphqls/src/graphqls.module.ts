import { Module } from '@nestjs/common';
import { GraphqlsController } from './graphqls.controller';
import { GraphqlsService } from './graphqls.service';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { CommonModule } from './common/common.module';
import { OptionModule } from './option/option.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filter/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      formatError: (formattedError, error) => {
        return {
          message: formattedError.message,
          code: formattedError.extensions.code,
        };
      },
    }),
    SurveyModule,
    QuestionModule,
    AnswerModule,
    CommonModule,
    OptionModule,
  ],
  controllers: [GraphqlsController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    GraphqlsService,
  ],
})
export class GraphqlsModule {}
