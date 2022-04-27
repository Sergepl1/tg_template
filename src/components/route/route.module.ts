import { Module } from '@nestjs/common';
import {RouteScene} from "./scenes/route.scene";
import {RailwayModule} from "../railway/railway.module";
import {UserModule} from "../user/user.module";

@Module({
    imports: [RailwayModule, UserModule],
    providers: [RouteScene],
    exports: [RouteScene]
})
export class RouteModule {}
