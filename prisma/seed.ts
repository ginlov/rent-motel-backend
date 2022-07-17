import { PrismaClient, RoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  /* Role */
  await prisma.role.deleteMany();
  await prisma.role.createMany({
    data: [
      {
        name: 'RENTER',
      },
      {
        name: 'OWNER',
      },
      {
        name: 'ADMIN',
      },
    ],
  });

  /* Utility */
  await prisma.utility.deleteMany();
  await prisma.utility.createMany({
    data: [
      { type: 'Máy giặt' },
      { type: 'Máy điều hòa' },
      { type: 'Giường' },
      { type: 'Bếp' },
      { type: 'Bóng đèn' },
      { type: 'Tủ' },
      { type: 'Bàn' },
      { type: 'Ghế' },
      { type: 'Quạt' },
    ],
  });

  /* Admin account */
  const roleAdmin = await prisma.role.findFirst({
    where: {
      name: RoleEnum.ADMIN,
    },
  });

  await prisma.user.create({
    data: {
      email: 'admin',
      password: bcrypt.hashSync('admin', parseInt(process.env.AUTH_SALT_ROUND)),
      role: {
        connect: {
          id: roleAdmin.id,
        },
      },
    },
  });
};

try {
  main();
} catch (error) {
  console.log(error);
  process.exit(1);
} finally {
  prisma.$disconnect();
}
