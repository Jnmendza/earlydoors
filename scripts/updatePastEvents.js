import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const result = await prisma.event.updateMany({
    where: {
      data: { lt: now },
      status: { not: "COMPLETED" },
    },
    data: { status: "COMPLETED" },
  });
  console.log(`Updated ${result.count} past events`);
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect);
