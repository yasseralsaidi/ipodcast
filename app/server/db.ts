import { PrismaClient } from "@prisma/client";

// for queryCompiler
// import { PrismaPg } from '@prisma/adapter-pg';
// import { PrismaClient } from '../../generated/prisma';
// const adapter = new PrismaPg({ connectionString: env.DATABASE_URL })


const createPrismaClient = () =>
	new PrismaClient({
		// adapter // queryCompiler
		// log:
		// 	process.env.NODE_ENV === "development"
		// 		? ["query", "error", "warn"]
		// 		: ["error"],
	});

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
