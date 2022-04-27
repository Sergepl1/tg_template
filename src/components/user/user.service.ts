import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {User} from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository,
    ) {
    }

    public saveUsers(user): Promise<User> {
        return this.usersRepository.save(user);
    }
}
