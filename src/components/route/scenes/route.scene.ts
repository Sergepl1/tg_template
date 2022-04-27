import {SceneLeave, Command, On, Message, Ctx, Wizard, Scene, Action} from 'nestjs-telegraf';
import {Scenes} from "telegraf";
import * as moment from 'moment';
import {ROUTE_SCENE_ID} from "../../../constants/scenes.constants";
import {WizardStep} from "nestjs-telegraf/dist/decorators/scene/wizard-step.decorator";
import {RailwayService} from "../../railway/railway.service";
import {StationDto} from "../dto/station.dto";
import {getStationButtons} from "../route.markup";
import {ARRIVAL_SELECT, DEPARTURE_SELECT} from "../../../constants/actions.constants";
import {UserService} from "../../user/user.service";


@Wizard(ROUTE_SCENE_ID)
export class RouteScene {
    constructor(
        private railwayService: RailwayService,
        private userService: UserService,
    ){

    }

    @SceneLeave()
    onSceneLeave(): string {
        return 'Bye Bye 👋';
    }

    // @On('text')
    // async onMessage(
    //     @Message('text') text: string,
    //     @Ctx() ctx: Scenes.WizardContext
    //
    // ) {
    //     console.log('ctx111', ctx)
    //     console.log('cursor1', ctx.wizard.cursor)
    //
    //     await ctx.reply('Укажите место отправления')
    //     return ctx.wizard.next()
    // }

    @WizardStep(0)
    async departurePointer(@Ctx() ctx: Scenes.WizardContext, @Message('text') text: string){
        console.log('text1', text)
        console.log('state111', ctx.state)

        await ctx.reply('Укажите место отправления')
        ctx.wizard.next()
    }

    @WizardStep(1)
    async departureHandler(@Ctx() ctx: Scenes.WizardContext, @Message('text') text: string){
        const railwayResults: StationDto[] = await this.railwayService.getStation(text)
        const markup = getStationButtons(railwayResults, DEPARTURE_SELECT)
        await ctx.reply("Выберите станцию отправления из списка ниже:", markup);
        ctx.wizard.next()
    }

    @WizardStep(2)
    async arrivingPointer(@Ctx() ctx: Scenes.WizardContext, @Message() text: string){
        await ctx.reply('Укажите место прибытия')
        ctx.wizard.next()
    }

    @WizardStep(3)
    async arrivingHandler(@Ctx() ctx: Scenes.WizardContext, @Message('text') text: string){
        const railwayResults: StationDto[] = await this.railwayService.getStation(text)
        const markup = getStationButtons(railwayResults, ARRIVAL_SELECT)
        await ctx.reply('Выбирите место прибытия из списка ниже:', markup)
        ctx.wizard.next()
    }

    @WizardStep(4)
    async datePointer(@Ctx() ctx: Scenes.WizardContext, @Message('text') text: string){
        await ctx.reply('Теперь напишите дату поездки в формате день.месяц.год (например: 01.02.2022) или выберите из списка ниже')
        ctx.wizard.next()
    }

    @WizardStep(5)
    async dateHandler(@Ctx() ctx: Scenes.WizardContext, @Message('text') text: string){
        const date = moment(text, "DD.MM.YYYY").format('YYYY-MM-DD')
        const railwayResults: StationDto[] = await this.railwayService.getStation(text)
        console.log('railwayResults1', railwayResults)
        const requestData = {
            from: ctx.scene.state['departure'],
            to: ctx.scene.state['arrival'],
            date,
            time: "00:00",
            get_tpl: 1
        }
        await this.userService.saveUsers({
            chatId: ctx.chat.id,
            userName: ctx.chat['username'],
            data: requestData
        })
        const ticketsResults = await this.railwayService.getTickets(requestData)
        console.log('ticketsResults1', ticketsResults)
        await ctx.reply('Пару минут, ваш запрос обробатывается')
        ctx.wizard.next()
    }

    @WizardStep(6)
    async ticketsCountHandler(@Ctx() ctx: Scenes.WizardContext, @Message('text') text: string){
        console.log('state2', ctx.scene.state)
        ctx.scene.state = {...ctx.scene.state, departure: text}

        await ctx.reply('Укажите количество билетов')
        ctx.wizard.next()
    }


    // @Command(['rng', 'random'])
    // onRandomCommand(): number {
    //     console.log('Use "random" command');
    //     return Math.floor(Math.random() * 11);
    // }

    @Command('leave')
    async onLeaveCommand(ctx: Scenes.SceneContext): Promise<void> {
        await ctx.scene.leave();
    }

    @Action(/departure_select_(.+)/i)
    async onDepartureSelected(@Ctx() ctx, @Message() message){
        ctx.scene.state = {departure: ctx.match.input.substring(DEPARTURE_SELECT.length+1)}
        ctx.wizard.steps[ctx.wizard.cursor](ctx)
    }

    @Action(/arrival_select_(.+)/i)
    async onArrivalSelected(@Ctx() ctx){
        ctx.scene.state = {...ctx.scene.state, arrival: ctx.match.input.substring(ARRIVAL_SELECT.length+1)}
        ctx.wizard.steps[ctx.wizard.cursor](ctx)
    }
}
