// p308.hello.controller.ts

import { Controller, Get } from "@nestjs/common";

@Controller()
export class HelloController {
    @Get()
    hello() {
        return "Hi! This is the first application with NestJS.";
    }
}