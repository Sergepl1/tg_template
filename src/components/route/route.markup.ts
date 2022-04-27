import {Markup} from "telegraf";
import {StationDto} from "./dto/station.dto";

export const getStationButtons = (data: StationDto[], actionName) =>
    Markup.inlineKeyboard(data.map((station: StationDto) =>
        Markup.button.callback(station.title, `${actionName}_${station.value}`)), {columns: 2})
