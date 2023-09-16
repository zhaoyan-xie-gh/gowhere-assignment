import { Body, Controller, Post } from '@nestjs/common';
import { ReverseGeoCodingDto } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/reverse-geocode')
  reverseGeoCoding(@Body() reverseGeoCodingDto: ReverseGeoCodingDto) {
    return this.appService.reverseGeoCoding(reverseGeoCodingDto);
  }
}
