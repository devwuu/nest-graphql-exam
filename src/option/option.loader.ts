import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';

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
}
