import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  async addMember(signUpDto: SignUpDto) {
    const { email, name, password } = signUpDto;
    const result = await this.memberRepository.save({
      email,
      name,
      password,
    });

    return result;
  }
}
