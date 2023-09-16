import { Body, Controller, Post } from '@nestjs/common';
import { ReverseGeoCodingDto } from './app.dto';
import { AppService } from './app.service';

@Controller('api/v1/reverse-geocode')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/')
  reverseGeoCoding(@Body() reverseGeoCodingDto: ReverseGeoCodingDto) {
    return this.appService.reverseGeoCoding(reverseGeoCodingDto);
  }
}
