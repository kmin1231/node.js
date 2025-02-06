import { Controller, Param, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller("blog")
export class BlogController {
  blogService: BlogService;
  constructor() {
    this.blogService = new BlogService();
  }

  @Get()
  getAllPosts() {
    console.log('Fetching all posts');
    return this.blogService.getAllPosts();
  }

  @Post()
  createPost(@Body() postDto) {
    console.log('Creating a post');
    this.blogService.createPost(postDto);
    return 'success';
  }

  @Get('/:id')
  getPost(@Param('id') id: string) {
    console.log(`[id: ${id}] Fetching a single post`);
    return this.blogService.getPost(id);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string) {
    console.log('Deleting a post');
    this.blogService.delete(id);
    return 'success';
  }

  @Put('/:id')
  updatePost(@Param('id') id, @Body() postDto) {
    console.log('Updating a post', id, postDto);
    return this.blogService.updatePost(id, postDto);
  }
}