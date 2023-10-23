import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Glimpse } from '../lib/glimpseType';
import { glimpseCreationDto, glimpseEditionDto } from '../lib/glimpseSchema';
import { UseZodGuard } from 'nestjs-zod';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('glimpses/:orderBy')
  async getAllGlimpses(@Param('orderBy') orderBy: string): Promise<Glimpse[]> {
    return await this.appService.getAllGlimpses(orderBy);
  }
  @Get('glimpse/:slug')
  async getGlimpse(@Param('slug') slug: string): Promise<Glimpse> {
    const res = await this.appService.getGlimpse(slug);
    if (res instanceof Error)
      throw new HttpException('Glimpse not found', HttpStatus.NOT_FOUND);
    else return res;
  }
  @Post('new')
  @UseZodGuard('body', glimpseCreationDto)
  async createNewGlimpse(
    @Body() glimpse: glimpseCreationDto,
  ): Promise<Glimpse> {
    const res = await this.appService.createNewGlimpse(glimpse);
    if (res instanceof Error)
      throw new HttpException('Slug already exists', HttpStatus.BAD_REQUEST);
    else return res;
  }
  @Post('edit')
  @UseZodGuard('body', glimpseEditionDto)
  async editGlimpse(@Body() glimpse: glimpseEditionDto): Promise<void> {
    const res = await this.appService.editGlimpse(glimpse);
    if (res instanceof Error)
      throw new HttpException('Glimpse not found', HttpStatus.NOT_FOUND);
  }
  @Delete('deleteExpired')
  async deleteExpiredGlimpses() {
    await this.appService.deleteExpiredGlimpses();
  }
}
