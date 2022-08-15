import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MemberService } from 'src/member/member.service';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly memberService: MemberService,
  ) {}

  @Get('/test')
  async test() {
    const member = await this.memberService.getMemberByEmail('test2@test.com');
    return member;
  }

  @ApiOperation({ summary: 'SignUp' })
  @Post('/signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    const existedMember = await this.memberService.getMemberByEmail(
      signUpDto.email,
    );

    if (existedMember) {
      throw new BadRequestException('이미 존재하는 계정입니다.');
    }

    const hashedPassowrd = await this.authService.hashData(signUpDto.password);

    const newMember = await this.memberService.createMember({
      ...signUpDto,
      password: hashedPassowrd,
    });

    const tokens = this.authService.getTokens(newMember.id, newMember.name);

    return {
      ...newMember,
      ...tokens,
    };
  }

  @ApiOperation({ summary: 'SignIn' })
  @UseGuards(LocalAuthGuard)
  @Post('/signIn')
  async signIn(@Request() req) {
    const { id, name } = req.member;

    const tokens = this.authService.getTokens(id, name);
    await this.memberService.updateRefreshToken(tokens.refreshToken, id);

    return tokens;
  }

  @ApiOperation({ summary: 'SignOut' })
  @UseGuards(JwtAuthGuard)
  @Get('/signOut')
  async signOut(@Request() req) {
    const { id } = req.member;
    await this.memberService.deleteRefreshToken(id);
  }

  @ApiOperation({ summary: 'Refresh' })
  @UseGuards(JwtRefreshAuthGuard)
  @Get('/refresh')
  async refresh(@Request() req) {
    if (!req.member) {
      throw new ForbiddenException('Access Denied');
    }

    const { sub, name, refreshToken } = req.member;

    const member = await this.memberService.getMemberById(sub, {
      select: ['id', 'email', 'name', 'refreshToken'],
    });
    if (!member || !member.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const isRefreshTokenMatch = await this.authService.compareHashData(
      refreshToken,
      member.refreshToken,
    );
    if (!isRefreshTokenMatch) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = this.authService.getTokens(sub, name);
    await this.memberService.updateRefreshToken(sub, tokens.refreshToken);

    return tokens;
  }
}
