import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {SearchTicketsDto} from "../railway/dto/search.tickets.dto";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'chat_id'})
    chatId: string;

    @Column({name: 'user_name'})
    userName: string;

    @Column('jsonb', { name: 'data' })
    data: SearchTicketsDto;
}
