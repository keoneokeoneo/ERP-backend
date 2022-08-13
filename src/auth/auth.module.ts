import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MemberRepository } from 'src/member/member.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({
      property: 'member',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '600s',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, MemberRepository],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
