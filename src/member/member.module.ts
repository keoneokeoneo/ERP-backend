import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { Member } from './member.entity';
import { MemberRepository } from './member.repository';
import { MemberService } from './member.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MemberService, MemberRepository],
  controllers: [MemberController],
  exports: [MemberService, MemberRepository],
})
export class MemberModule {}
