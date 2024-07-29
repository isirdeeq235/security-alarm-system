const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function main() {
  const defaultEmail = process.env.NEXT_PUBLIC_EMAIL;
  const defaultPassword = process.env.NEXT_PUBLIC_PASSWORD;
  const defaultName = process.env.NEXT_PUBLIC_NAME;

  const user = await prisma.user.findUnique({
    where: { email: defaultEmail },
  });

  if (!user) {
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    await prisma.user.create({
      data: {
        email: defaultEmail,
        password: hashedPassword,
        name: defaultName,
        role: "ADMIN",
      },
    });
    console.log("Default user created");
  } else {
    console.log("Default user already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
