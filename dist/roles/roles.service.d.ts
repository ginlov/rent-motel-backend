import { FindOneOptions, Repository } from 'typeorm';
import { Role } from './role.entity';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    findOne(options: FindOneOptions<Role>): Promise<Role>;
}
