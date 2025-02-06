import { Controller, Param, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller("blog")
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @Get()
  getAllPosts() {
    console.log('Fetching all posts');
  }

  @Post()
  createPost(@Body() post: any) {
    console.log('Creating a post');
    console.log(post);
  }

  @Get('/:id')
  getPost(@Param('id') id: string) {
    console.log(`[id: ${id}] Fetching a single post`);
  }

  @Delete('/:id')
  deletePost() {
    console.log('Deleting a post');
  }

  @Put('/:id')
  updatePost(@Param('id') id, @Body() post: any) {
    console.log(`[${id}] Updating a post`);
    console.log(post);
  }
}