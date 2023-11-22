import { Injectable } from '@nestjs/common';
import { CreateUserAnswerInput } from './dto/create-user-answer.input';
import { UpdateUserAnswerInput } from './dto/update-user-answer.input';

@Injectable()
export class UserAnswerService {
  create(createUserAnswerInput: CreateUserAnswerInput) {
    return 'This action adds a new userAnswer';
  }

  findAll() {
    return `This action returns all userAnswer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAnswer`;
  }

  update(id: number, updateUserAnswerInput: UpdateUserAnswerInput) {
    return `This action updates a #${id} userAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAnswer`;
  }
}
