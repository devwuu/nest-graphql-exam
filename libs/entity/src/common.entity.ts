import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { Field } from '@nestjs/graphql';

@Entity()
export class CommonEntity {
  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  @Field()
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
  })
  @Field()
  deletedAt: Date;
}
