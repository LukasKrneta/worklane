import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { env } from '../utils/env.js'

const globalForPrisma = globalThis
const adapter = new PrismaPg({
  connectionString: env.databaseUrl,
})

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  })

if (env.nodeEnv !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
