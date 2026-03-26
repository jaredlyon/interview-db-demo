const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedData = [
  {
    name: 'jane doe',
    image_url: 'https://link',
    job_title: 'ceo',
    job_description:
      'jane is responsible for running the company',
  },
  {
    name: 'curran mclaughlin',
    image_url: 'https:// linkedin',
    job_title: 'cto',
    job_description:
      'curran is our best engineer',
  },
  {
    name: 'jared lyon',
    image_url: 'https://www.jaredlyon.dev',
    job_title: 'ml/ai intern',
    job_description:
      'jared designs ml./ai systems',
  }
];

async function main() {
  await prisma.teamMember.deleteMany();

  for (const member of seedData) {
    await prisma.teamMember.create({ data: member });
    console.log(`${member.name} ${member.image_url} ${member.job_title} ${member.job_description}`);
  }

  console.log('seed done with no issues');
}

main()
  .catch((err) => {
    console.error('failure:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
