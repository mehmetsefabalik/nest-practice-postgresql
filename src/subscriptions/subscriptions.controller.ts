import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CreateDto } from './dto/create.dto';
import { Subscription } from './subscriptions.entity';
import { SubscriptionService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly service: SubscriptionService) {}

  @Get()
  @ApiQuery({ name: 'email', required: false })
  async get(@Query('email') email, @Res() res) {
    if (email) {
      const subscription = await this.service.findOneByEmail(email);
      if (subscription) {
        res.status(HttpStatus.OK).json(subscription);
      } else {
        res.status(HttpStatus.NOT_FOUND).send();
      }
    } else {
      const result = await this.service.findAll();
      return res.status(HttpStatus.OK).json(result);
    }
  }

  @Post()
  create(@Body() createUserDto: CreateDto) {
    return this.service.create(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
