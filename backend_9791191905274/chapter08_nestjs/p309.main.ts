// p309.main.ts

import { NestFactory } from "@nestjs/core";
import  { HelloModule } from "./p308.hello.module";

// entry point to run NestJS server
async function bootstrap() {
    const app = await NestFactory.create(HelloModule);
    // creates an NestApplication object, using NestFactory

    await app.listen(3000, () => { console.log("Start the server!"); });
}

bootstrap();

// npx ts-node p309.main.ts

// npm install ts-node (ts-node@10.9.2)
// ts-node p309.main.ts