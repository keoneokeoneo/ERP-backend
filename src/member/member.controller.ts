import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { SignUpDto } from './dto/signup.dto';
import { JwtAuthGuard } from 'src/auth/jwt-strategy.guard';

@Controller('/api/members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async addMember(@Body() signUpDto: SignUpDto) {
    return this.memberService.addMember(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMember(@Request() req) {
    return req.user;
  }
}
