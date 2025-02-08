import { PostDto } from './blog.model';
import { BlogMongoRepository } from './blog.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {

  constructor(private blogRepository: BlogMongoRepository) { }

  posts = [];

  async getAllPosts() {
    return await this.blogRepository.getAllPost();
  }

  createPost(PostDto: PostDto) {
    this.blogRepository.createPost(PostDto);
  }

  async getPost(id): Promise<PostDto> {
    return await this.blogRepository.getPost(id);
  }

  delete(id) {
    this.blogRepository.deletePost(id);
  }

  updatePost(id, postDto: PostDto) {
    this.blogRepository.updatePost(id, postDto);
  }
}