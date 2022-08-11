import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { Member } from './member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async addMember(signUpDto: SignUpDto) {
    const { email, name, password } = signUpDto;
    const result = await this.memberRepository.save({
      email,
      name,
      password,
    });

    return result;
  }

  async getMembers() {
    const result = await this.memberRepository.find();

    return result;
  }
}
