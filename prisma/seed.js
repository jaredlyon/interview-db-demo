const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedData = [
  {
    name: 'Bryan Miller',
    image_url: 'sample-link',
    job_title: 'ceo',
    job_description:
      'Bryan is responsible for running the company',
  },
  {
    name: 'Curran McLaughlin',
    image_url: 'sample-link',
    job_title: 'cto',
    job_description:
      'Curran is our best engineer',
  },
    {
    name: 'Jared Lyon',
    image_url: 'sample-link',
    job_title: 'ml/ai engineer',
    job_description:
      'Jared designs ml/ai systems',
  },
  {
    name: 'Lucas Peters',
    image_url: 'sample-link',
    job_title: 'software engineer',
    job_description:
      'Lucas designs software systems',
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
