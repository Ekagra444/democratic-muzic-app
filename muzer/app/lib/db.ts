import { PrismaClient } from "@prisma/client/extension";

// export const prismaClient = new PrismaClient();
//later i will introduce a singelton over here 
let prismaClient:PrismaClient;

if (process.env.NODE_ENV === "production") {
  // In production, create a single instance
  prismaClient = new PrismaClient();
} else {
  // In development, attach Prisma to the global object
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prismaClient = global.prisma;
}

export default prismaClient;