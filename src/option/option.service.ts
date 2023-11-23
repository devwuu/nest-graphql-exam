import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { Question } from '../question/entities/question.entity';
import * as process from 'process';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createOptionInput: CreateOptionInput) {
    const question = await this.questionRepository.findOneBy({
      id: createOptionInput.questionId,
    });
    if (!question) throw new NotFoundException('Not exist question id');
    const option = await this.optionRepository.save({
      ...createOptionInput,
      question,
    });
    return option;
  }

  // findAll() {
  //   return `This action returns all option`;
  // }

  async findById(id: number) {
    const option = await this.optionRepository.findOneBy({ id });
    if (!option) throw new NotFoundException('Not exist option id');
    return option;
  }

  async update(id: number, updateOptionInput: UpdateOptionInput) {
    const option = await this.optionRepository.findOneBy({ id });
    if (!option) throw new NotFoundException('Not exist option');
    await this.optionRepository.update(id, { ...option, ...updateOptionInput });
    return { ...option, ...updateOptionInput };
  }

  async remove(id: number) {
    const option = await this.optionRepository.findOneBy({ id });
    if (!option) throw new NotFoundException('Not exist option id');
    await this.optionRepository.softDelete(id);
    return { id };
  }
}
