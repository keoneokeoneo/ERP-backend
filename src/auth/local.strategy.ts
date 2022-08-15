import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { MemberService } from 'src/member/member.service';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authService: AuthService,
    private readonly memberService: MemberService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, plainPassword: string) {
    const member = await this.memberService.getMemberByEmailWithPassword(email);
    if (!member) {
      throw new BadRequestException('존재하지 않는 계정입니다.');
    }

    const isPasswordMatch = await this.authService.compareHashData(
      plainPassword,
      member.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('아이디/비밀번호가 일치하지 않습니다.');
    }

    const { password, ...result } = member;
    return result;
  }
}
