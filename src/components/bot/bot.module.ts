import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import {RouteModule} from "../route/route.module";
import {EchoModule} from "../echo/echo.module";

@Module({
    providers: [BotUpdate, RouteModule],
    imports: [EchoModule, RouteModule],
})
export class BotModule {}
