import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 10, {
    message: 'max 10 length',
  })
  @ApiProperty({ example: 'Join' })
  name: string;

  @IsNumber()
  @ApiProperty({ example: 18 })
  age: number;
}
