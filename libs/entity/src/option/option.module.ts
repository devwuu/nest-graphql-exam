import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from '@app/entity/option/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  exports: [TypeOrmModule],
})
export class OptionModule {}
