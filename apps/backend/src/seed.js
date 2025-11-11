import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.destination.count();
  if (count === 0) {
    await prisma.destination.createMany({
      data: [
        { name: 'Taj Mahal', slug: 'taj-mahal', description: 'Agra, India' },
        { name: 'Hampi', slug: 'hampi', description: 'Historic ruins' },
        { name: 'Ladakh', slug: 'ladakh', description: 'Mountain region' },
      ],
    });
    console.log('✅ Seeded initial destinations');
  } else {
    console.log('ℹ️ Destinations already exist, skipping seed');
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
