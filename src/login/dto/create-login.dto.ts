import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 10, {
    message: 'max 10 length',
  })
  name: string;
  @IsNumber()
  age: number;
}
