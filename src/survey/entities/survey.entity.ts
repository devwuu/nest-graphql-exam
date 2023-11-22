import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
@Entity()
export class Survey {
  @Field(() => Int, { nullable: false })
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
