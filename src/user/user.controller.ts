import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Request,
  Query,
  Req,
  Res,
  Session,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

// @Controller({
//   path: 'user',
//   version: '1',
// })
@Controller('user')
@ApiTags('user api')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('Config') private readonly base: string,
  ) { }

  @Post()
  @ApiOperation({ summary: 'create user', description: 'xxx' })
  create(@Body() createUserDto: CreateUserDto) {
    // @Body('name') get one property
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiQuery({ name: 'page', description: 'pagination' })
  @ApiResponse({ status: 200, description: 'ok' })
  findAll(@Request() req, @Query() query) {
    console.log(this.base);
    console.log(req.query, query);
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'xxx', required: true })
  @Version('1')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const result = this.userService.createCode();
    session.code = result.code;
    res.type('img/svg+xml');
    res.send(result.data);
  }

  @Post('create')
  createUser(@Body() body, @Session() session) {
    console.log(body, session.code);
    return { code: 200 };
  }
}
