import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Glimpse } from '../lib/glimpseType';
import { glimpseCreationDto, glimpseEditionDto } from '../lib/glimpseSchema';
import { UseZodGuard } from 'nestjs-zod';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('glimpses')
  async getAllGlimpses(): Promise<Glimpse[]> {
    return await this.appService.getAllGlimpses();
  }
  @Get('glimpse/:id')
  async getGlimpse(@Param('id') id: string): Promise<Glimpse> {
    return await this.appService.getGlimpse(id);
  }
  @Post('new')
  @UseZodGuard('body', glimpseCreationDto)
  async createNewGlimpse(
    @Body() glimpse: glimpseCreationDto,
  ): Promise<Glimpse> {
    return await this.appService.createNewGlimpse(glimpse);
  }
  @Put('edit')
  @UseZodGuard('body', glimpseEditionDto)
  async editGlimpse(@Body() glimpse: glimpseEditionDto): Promise<void> {
    await this.appService.editGlimpse(glimpse);
  }
}
