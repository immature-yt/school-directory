import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, address, phone, imageUrl } = body

    if (!name || !address || !phone) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400
      })
    }

    const newSchool = await prisma.school.create({
      data: {
        name,
        address,
        phone,
        imageUrl: imageUrl || ''
      }
    })

    return new Response(JSON.stringify(newSchool), { status: 201 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500
    })
  }
}
