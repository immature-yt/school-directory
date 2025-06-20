import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const schools = await prisma.school.findMany()
    return Response.json(schools)
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch schools' }), {
      status: 500,
    })
  }
}
