import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Answer } from '@app/entity/answer/answer.entity';
import { Option } from '@app/entity/option/option.entity';
import { Question } from '@app/entity/question/question.entity';
import { Survey } from '@app/entity/survey/survey.entity';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';
import { AnswerModule } from './answer/answer.module';

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
    TypeOrmModule.forRootAsync(typeOrmOptions),
    SurveyModule,
    QuestionModule,
    OptionModule,
    AnswerModule,
  ],
  providers: [EntityService],
  exports: [
    EntityService,
    SurveyModule,
    QuestionModule,
    OptionModule,
    AnswerModule,
  ],
})
export class EntityModule {}
