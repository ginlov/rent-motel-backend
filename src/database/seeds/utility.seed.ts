import { Factory, Seeder } from 'typeorm-seeding';
import { Utility } from '../../utilities/utility.entity';

export default class CreateUtility implements Seeder {
  public async run(factory: Factory, connection: any): Promise<void> {
    const countUtility = await connection
      .createQueryBuilder()
      .select()
      .from(Utility, 'utilities')
      .getCount();

    if (countUtility === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Utility)
        .values([
          { type: 'Máy giặt' },
          { type: 'Máy điều hòa' },
          { type: 'Giường' },
          { type: 'Bếp' },
          { type: 'Bóng đèn' },
          { type: 'Tủ' },
          { type: 'Bàn' },
          { type: 'Ghế' },
          { type: 'Quạt' },
        ])
        .execute();
    }
  }
}
