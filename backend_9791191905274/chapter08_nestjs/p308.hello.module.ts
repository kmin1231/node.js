// p308.hello.module.ts

import { Module } from "@nestjs/common";
import { HelloController } from "./p308.hello.controller";

@Module({
    controllers: [HelloController],
})
export class HelloModule {}