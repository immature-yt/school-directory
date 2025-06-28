import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function DELETE(req) {
  try {
    const { id } = await req.json()
    await prisma.school.delete({
      where: { id },
    })
    return new Response('School deleted', { status: 200 })
  } catch (err) {
    console.error('[DELETE_SCHOOL_ERROR]', err)
    return new Response('Failed to delete school', { status: 500 })
  }
}
