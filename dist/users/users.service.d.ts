import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: Partial<CreateUserDto>): Promise<User>;
    findOne(options: FindOneOptions<User>, populate?: boolean): Promise<User>;
}
