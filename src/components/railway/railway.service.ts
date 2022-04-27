import { Injectable} from "@nestjs/common";
import { AxiosRequestConfig } from 'axios';
import {HttpService} from '@nestjs/axios'
import {SearchTicketsDto} from "./dto/search.tickets.dto";
const FormData = require('form-data');


@Injectable()
export class RailwayService {
    private apiUrl;
    constructor(
        private readonly httpService: HttpService
    ) {
        this.apiUrl = process.env.API_URL;
    }

    public async getStation(searchString: string) {
        return await this.apiCall(`/train_search/station`, {params: {term: searchString}});
    }

    public async getTickets(search: SearchTicketsDto) {
        const requestFormData = new FormData();
        Object.keys(search).forEach(item=>{
            requestFormData.append(item, search[item])
        })
        return await this.apiCall(`/train_search`, {method: "POST", data: requestFormData});
    }

    private async apiCall(path: string, options?: AxiosRequestConfig) {
        let response;
        try {
            response = await this.httpService
                .request({
                    method: options?.method || 'GET',
                    baseURL: this.apiUrl,
                    data: options?.data,
                    params: options?.params,
                    url: path,
                })
                .toPromise();
        } catch (e: any) {
            console.log('Api error', e)
            throw e;
        }
        return response && response.data;
    }


}
