import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { compare, hash } from 'bcryptjs';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { FindOneOptions } from 'typeorm';
import { Member } from './member.entity';

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  async getMemberById(id: string, options?: FindOneOptions<Member>) {
    const member = await this.memberRepository.findOne({
      ...options,
      where: { id },
    });

    return member;
  }

  async getMemberByEmail(email: string) {
    const member = await this.memberRepository.findOne({
      where: { email },
    });

    return member;
  }

  async getMemberByEmailWithPassword(email: string) {
    const member = await this.memberRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'password'],
    });
    return member;
  }

  async createMember(signUpDto: SignUpDto) {
    const newMember = await this.memberRepository.save({
      ...signUpDto,
    });

    return newMember;
  }

  async updateRefreshToken(refreshToken: string, id: string) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.memberRepository.update(id, {
      refreshToken: hashedRefreshToken,
    });
  }

  async checkRefreshToken(refreshToken: string, id: string) {
    const member = await this.memberRepository.findOne({ where: { id } });

    const isRefreshTokenMatch = await compare(
      refreshToken,
      member.refreshToken,
    );

    if (isRefreshTokenMatch) {
      return member;
    }
  }

  async deleteRefreshToken(id: string) {
    return this.memberRepository.update(id, {
      refreshToken: null,
    });
  }
}
