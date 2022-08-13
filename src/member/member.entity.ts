import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum MemberType {
  EMPLOYEE,
  ADMIN,
}

@Entity({ name: 'Members' })
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, length: 30 })
  email: string;

  @Column('varchar', { nullable: false })
  password: string;

  @Column('varchar', { nullable: false, length: 10 })
  name: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: MemberType,
    default: MemberType.EMPLOYEE,
  })
  type!: MemberType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
