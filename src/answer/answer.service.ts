import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { Option } from '../option/entities/option.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async create(createAnswerInput: CreateAnswerInput) {
    const option = await this.optionRepository.findOneBy({
      id: createAnswerInput.optionId,
    });
    if (!option) throw new NotFoundException('Not exist option id');
    const answer = await this.answerRepository.save({
      user: createAnswerInput.userId,
      survey: createAnswerInput.surveyId,
      question: createAnswerInput.questionId,
      option,
    });
    return answer;
  }

  async findById(id: number) {
    const answer = await this.answerRepository.findOneBy({ id });
    if (!answer) throw new NotFoundException('Not exist answer id');
    return answer;
  }

  async update(id: number, updateAnswerInput: UpdateAnswerInput) {
    const answer = await this.answerRepository.findOneBy({ id });
    if (!answer) throw new NotFoundException('Not exist answer id');
    const option = await this.optionRepository.findOneBy({
      id: updateAnswerInput.optionId,
    });
    if (!option) throw new NotFoundException('Not exist option id');
    await this.answerRepository.update(id, { ...answer, option });
    return { ...answer, optionId: option.id };
  }

  async remove(id: number) {
    const answer = await this.answerRepository.findOneBy({ id });
    if (!answer) throw new NotFoundException('Not exist answer id');
    await this.answerRepository.delete(id);
    return { id };
  }
}
