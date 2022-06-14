import { Factory, Seeder } from 'typeorm-seeding';
export default class CreateRole implements Seeder {
    run(factory: Factory, connection: any): Promise<void>;
}
