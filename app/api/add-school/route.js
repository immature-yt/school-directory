import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, address, phone, image } = body

    if (!name || !address || !phone) {
      return new Response('Missing required fields', { status: 400 })
    }

    const newSchool = await prisma.school.create({
      data: {
        name,
        address,
        phone,
        image: image || null  // 👈 FIXED HERE
      }
    })

    return Response.json(newSchool)
  } catch (err) {
    console.error('[API ERROR]', err)
    return new Response('Internal Server Error', { status: 500 })
  }
}
