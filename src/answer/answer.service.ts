import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { Option } from '../option/entities/option.entity';
import { Question } from '../question/entities/question.entity';
import { Survey } from '../survey/entities/survey.entity';

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
      userId: createAnswerInput.userId,
      surveyId: createAnswerInput.surveyId,
      questionId: createAnswerInput.questionId,
      option,
    });
    return answer;
  }

  async createAll(createAnswerInputs: CreateAnswerInput[]) {
    const answers = [];
    for (const input of createAnswerInputs) {
      const answer = await this.create(input);
      answers.push(answer);
    }
    return answers;
  }

  async findById(id: number) {
    const answer = await this.answerRepository.findOneBy({ id });
    if (!answer) throw new NotFoundException('Not exist answer id');
    return answer;
  }

  async update(id: number, updateAnswerInput: UpdateAnswerInput) {
    const answer = await this.answerRepository.findOneBy({ id });
    if (!answer) throw new NotFoundException('Not exist answer id');

    // 단순히 option의 유무만 판단하기 때문에 option과 question-survey 간의 정합성이 떨어질 가능성이 있음
    // querybuilder를 이용해 join으로 조회하면 해결할 수 있을 것으로 예상하나 id가 틀어질 경우의 수가 얼마나 있을지 고민해볼 필요가 있음

    const option = await this.optionRepository.findOneBy({
      id: updateAnswerInput.optionId,
    });
    if (!option) throw new NotFoundException('Not exist option id');
    await this.answerRepository.update(id, { option });
    return { id };
  }

  async remove(id: number) {
    const answer = await this.answerRepository.findOneBy({ id });
    if (!answer) throw new NotFoundException('Not exist answer id');
    await this.answerRepository.delete(id);
    return { id };
  }
}
