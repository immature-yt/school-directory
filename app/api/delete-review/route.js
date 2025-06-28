import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function DELETE(req) {
  try {
    const { id } = await req.json()

    if (!id) {
      console.error('[DELETE_REVIEW_ERROR] Missing ID in request body')
      return new Response('Review ID is required', { status: 400 })
    }

    await prisma.review.delete({
      where: { id },
    })

    return new Response('Review deleted', { status: 200 })
  } catch (err) {
    console.error('[DELETE_REVIEW_ERROR]', err)
    return new Response('Failed to delete review', { status: 500 })
  }
}
