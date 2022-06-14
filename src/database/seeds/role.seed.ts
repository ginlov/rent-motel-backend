import { Factory, Seeder } from 'typeorm-seeding';
import { Role } from '../../roles/role.entity';

export default class CreateRole implements Seeder {
  public async run(factory: Factory, connection: any): Promise<void> {
    const countRole = await connection
      .createQueryBuilder()
      .select()
      .from(Role, 'roles')
      .getCount();

    if (countRole === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values([{ name: 'ADMIN' }, { name: 'RENTER' }, { name: 'OWNER' }])
        .execute();
    }
  }
}
