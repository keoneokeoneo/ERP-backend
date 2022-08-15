import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    example: 'test@test.com',
    description: 'Email Address',
  })
  public email: string;

  @ApiProperty({
    example: 'Test',
    description: 'Member Name',
  })
  public name: string;

  @ApiProperty({
    example: 'test',
    description: 'Password',
  })
  public password: string;
}
