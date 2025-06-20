import prisma from '@/lib/prisma'

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
