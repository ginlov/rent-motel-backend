import { UsersService } from './users.service';
import { IResponse } from '../common/interfaces';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(request: any): Promise<IResponse>;
}
