import { Body, Controller, Get, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { SignUpDto } from './dto/signup.dto';

@Controller('/api/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async addMember(@Body() signUpDto: SignUpDto) {
    return this.memberService.addMember(signUpDto);
  }

  @Get()
  async getMembers() {
    return this.memberService.getMembers();
  }
}
