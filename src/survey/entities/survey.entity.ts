import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from '../../common/entity/CommonEntity';

@ObjectType()
@Entity()
export class Survey extends CommonEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @Column()
  @IsString()
  desc: string;
}
