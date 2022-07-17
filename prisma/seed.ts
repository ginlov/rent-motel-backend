import { PrismaClient } from '@prisma/client';

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
};

try {
  main();
} catch (error) {
  console.log(error);
  process.exit(1);
} finally {
  prisma.$disconnect();
}
