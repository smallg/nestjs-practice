import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const dto = plainToInstance(metadata.metatype, value);
    const errors = await validate(dto);
    console.log(errors);
    if (true) {
      console.log(errors);
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
