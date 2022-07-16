import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../users/user.entity';
import * as bcrypt from 'bcrypt';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: any): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ email: 'admin', password: await bcrypt.hash('admin', 12) }])
      .execute();
  }
}
