import { Controller, Get } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller()
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}