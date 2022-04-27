import { Command, Ctx, Hears, Start, Update, Sender } from 'nestjs-telegraf';
import {Scenes} from 'telegraf';
import {Context} from "../../interfaces/context.interface";
import {HELLO_SCENE_ID, ROUTE_SCENE_ID} from "../../constants/scenes.constants";

@Update()
export class BotUpdate {
    constructor(){}

    @Start()
    async onStart(ctx: Scenes.SceneContext) {
        await ctx.scene.enter(ROUTE_SCENE_ID, );
    }

    @Hears(['hi', 'hello', 'hey', 'qq'])
    onGreetings(
        @Sender('first_name') firstName: string,
    ): string {
        return `Hey ${firstName}`;
    }

    @Command('scene')
    async onSceneCommand(@Ctx() ctx: Context): Promise<void> {
        await ctx.scene.enter(HELLO_SCENE_ID);
    }
}
