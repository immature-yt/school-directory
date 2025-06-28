import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const body = await req.json()

    const {
      schoolId,
      infrastructure,
      academics,
      valueForMoney,
      extracurricular,
      feedback,
    } = body

    // Validate required fields
    if (
      !schoolId ||
      infrastructure == null ||
      academics == null ||
      valueForMoney == null ||
      extracurricular == null
    ) {
      return new Response('Missing required fields', { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        schoolId,
        infrastructure: parseInt(infrastructure),
        academics: parseInt(academics),
        valueForMoney: parseInt(valueForMoney),
        extracurricular: parseInt(extracurricular),
        feedback: feedback || '',
      },
    })

    return Response.json(review)
  } catch (error) {
    console.error('[ADD_REVIEW_ERROR]', error)
    return new Response('Error submitting review', { status: 500 })
  }
}
