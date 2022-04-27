import { Module } from '@nestjs/common';
import {RailwayService} from "./railway.service";
import {HttpModule} from "@nestjs/axios";
import {EchoService} from "../echo/echo.service";

@Module({
    providers: [RailwayService, EchoService],
    exports: [RailwayService, EchoService],
    imports: [HttpModule],
})
export class RailwayModule {}
