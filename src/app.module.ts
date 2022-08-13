import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import * as ormconfig from '../ormconfig';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    MemberModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
