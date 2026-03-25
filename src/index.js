const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/team', async (req, res) => {
  try {
    const members = await prisma.teamMember.findMany();
    res.json(members);
  } catch (err) {
    console.error('failure:', err);
    res.status(500).json({ error: 'int error' });
  }
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`${PORT} <--- running here`);
});
