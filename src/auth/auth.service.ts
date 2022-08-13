import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Member } from 'src/member/member.entity';
import { MemberRepository } from 'src/member/member.repository';

@Injectable()
export class AuthService {
  constructor(
    private memberRepository: MemberRepository,
    private jwtService: JwtService,
  ) {}

  async validateMember(email: string, password: string) {
    const member = await this.memberRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'password', 'type'],
    });

    if (member && member.password === password) {
      const { password, ...result } = member;
      return result;
    }

    return null;
  }

  async login(member: Member) {
    const payload = { sub: member.id, name: member.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
