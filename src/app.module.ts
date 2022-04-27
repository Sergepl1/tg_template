import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import {BotModule} from "./components/bot/bot.module";
import {sessionMiddleware} from "./middleware/session.middleware";
import {RouteModule} from "./components/route/route.module";
import {RailwayModule} from "./components/railway/railway.module";
import {EchoModule} from "./components/echo/echo.module";
import {UserModule} from "./components/user/user.module";
import dbConfig from "./db/ormconfig"

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: dbConfig.host,
            port: Number(dbConfig.port),
            username: dbConfig.username,
            password: dbConfig.password,
            database: dbConfig.database,
            // entities: [User],
            entities: [__dirname + '/**/*.entity.{js,ts}'],
            synchronize: false,
        }),
        TelegrafModule.forRoot({
            token: process.env.BOT_TOKEN || '',
            middlewares: [sessionMiddleware],
            include: [BotModule],
        }),
        BotModule,
        RouteModule,
        RailwayModule,
        EchoModule,
        UserModule
    ],
})
export class AppModule {}
