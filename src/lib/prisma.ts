import { PrismaClient } from '@prisma/client'

// 전역 객체에 prisma가 있는지 확인 (개발 중 중복 생성을 방지)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 이미 전역에 prisma가 있으면 그걸 쓰고, 없으면 새로 생성
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient()

// 개발 환경일 때만 전역에 prisma를 저장해 둠
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
