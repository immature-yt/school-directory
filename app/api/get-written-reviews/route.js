import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const schoolId = url.searchParams.get('schoolId')

    if (!schoolId) {
      return new Response('Missing schoolId parameter', { status: 400 })
    }

    const reviews = await prisma.review.findMany({
      where: { schoolId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, // ✅ Added this line
        infrastructure: true,
        academics: true,
        valueForMoney: true,
        extracurricular: true,
        feedback: true,
        createdAt: true,
      },
    })

    return Response.json(reviews)
  } catch (error) {
    console.error('[GET_WRITTEN_REVIEWS_ERROR]', error)
    return new Response('Error fetching reviews', { status: 500 })
  }
}
