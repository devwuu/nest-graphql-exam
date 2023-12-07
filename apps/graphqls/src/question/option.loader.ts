import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from '@app/entity/option/option.entity';
import { Answer } from '@app/entity/answer/answer.entity';
import { AnsweredQuestion } from '../answer-survey/dto/answered-question.field';

@Injectable({ scope: Scope.REQUEST })
export class OptionLoader {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  findOptionsByQuestionId = new DataLoader(async (questionIds: number[]) => {
    const options = await this.optionRepository
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.question', 'q')
      .where('q.id in (:...questionIds)', { questionIds })
      .getMany();

    return questionIds.map((qId) =>
      options.filter((option) => option.question.id === qId),
    );
  });

  // todo 쿼리 검토 필요
  findSelectedOptionsByQuestionId = new DataLoader(
    async (questions: AnsweredQuestion[]) => {
      const questionIds = questions.map((question) => question.id);

      const options = await this.optionRepository
        .createQueryBuilder('o')
        .innerJoinAndSelect(Answer, 'a', 'a.optionId = o.id')
        .innerJoinAndSelect('o.question', 'q')
        .where('o.questionId in (:...questionIds)', { questionIds })
        .andWhere('a.userId = :userId', { userId: questions[0]?.userId })
        .getMany();

      if (!options) throw new NotFoundException('Answer is not exist');

      return questions.map((question) =>
        options.filter((option) => option.question.id === question.id),
      );
    },
  );
}
