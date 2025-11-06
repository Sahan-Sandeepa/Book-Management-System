import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const categories = [
    'Fiction',
    'Non-fiction',
    'Science',
    'History',
    'Technology',
  ];
  for (const name of categories) {
    await prisma.bookCategory.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log('Seeded categories');
};

main()
  .catch((error: unknown) => {
    console.error('Error seeding data:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
