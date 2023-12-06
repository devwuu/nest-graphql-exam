import { Module } from '@nestjs/common';
import { GraphqlsController } from './graphqls.controller';
import { GraphqlsService } from './graphqls.service';
import { join } from 'path';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Answer } from './answer/entities/answer.entity';
import { Question } from './question/entities/question.entity';
import { Survey } from './survey/entities/survey.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { CommonModule } from './common/common.module';
import { OptionModule } from './option/option.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filter/http-exception.filter';
import { Option } from './option/entities/option.entity';

const typeOrmOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: +configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [Answer, Question, Survey, Option],
    synchronize: true, // // shouldn't be used in production
    logging: true,
  }),
  inject: [ConfigService],
};

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
    TypeOrmModule.forRootAsync(typeOrmOptions),
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
