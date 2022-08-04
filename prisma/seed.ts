import { PrismaClient, RoleEnum } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import motelsData from '../mock/motels.json';

const prisma = new PrismaClient();

const main = async () => {
  /* Clear data */
  await prisma.utility.deleteMany();
  await prisma.motel.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  /* Role */
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

  /* Owner account */
  const roleOwner = await prisma.role.findFirst({
    where: {
      name: RoleEnum.OWNER,
    },
  });
  const owner = await prisma.user.create({
    data: {
      email: 'owner_test@gmail.com',
      password: bcrypt.hashSync(
        'owner_test',
        parseInt(process.env.AUTH_SALT_ROUND),
      ),
      role: {
        connect: {
          id: roleOwner.id,
        },
      },
    },
  });

  /* Motels */
  motelsData.forEach(async (motelData) => {
    await prisma.motel.create({
      data: {
        ...motelData,
        owner: {
          connect: {
            id: owner.id,
          },
        },
      },
    });
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
