import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOptionInput } from './dto/create-option.input';
import { UpdateOptionInput } from './dto/update-option.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class OptionService {
  private readonly logger = new Logger(OptionService.name);

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
