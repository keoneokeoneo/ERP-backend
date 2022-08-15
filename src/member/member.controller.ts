import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/api/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMember(@Request() req) {
    return req.user;
  }
}
