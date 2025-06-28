import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const schoolId = url.searchParams.get('schoolId')

    if (!schoolId) {
      return new Response('Missing schoolId parameter', { status: 400 })
    }

    const averages = await prisma.review.aggregate({
      where: { schoolId },
      _avg: {
        infrastructure: true,
        academics: true,
        valueForMoney: true,
        extracurricular: true,
      },
    })

    return Response.json({
      avgInfrastructure: averages._avg.infrastructure || 0,
      avgAcademics: averages._avg.academics || 0,
      avgValue: averages._avg.valueForMoney || 0,
      avgExtra: averages._avg.extracurricular || 0,
    })
  } catch (error) {
    console.error('[GET_REVIEWS_ERROR]', error)
    return new Response('Error fetching reviews', { status: 500 })
  }
}
