import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  getHello(): string {
    const message = this.configService.get('MESSAGE');
    return message;
  }

  @Get('service-url')
  getServiceUrl(): string {
    console.log('SERVICE_URL:', this.configService.get('SERVICE_URL'));
    return this.configService.get<string>('SERVICE_URL')!;
    // in order to prevent TypeScript type error, added '!(non-null assertion operator)'
    // assert that the value will never be 'null' or 'undefined'
  }

  // commands for testing: npm run start; npm run start:dev; npm run start:prod
  // http://localhost:3000/service-url
}
