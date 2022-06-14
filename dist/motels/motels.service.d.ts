import { Repository } from 'typeorm';
import { Motel } from './motel.entity';
export declare class MotelsService {
    private usersRepository;
    constructor(usersRepository: Repository<Motel>);
}
