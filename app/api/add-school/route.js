import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const { name, address, phone, image } = await req.json()

    const newSchool = await prisma.school.create({
      data: {
        name,
        address,
        phone,
        image: image || ""
      }
    })

    return new Response(JSON.stringify(newSchool), { status: 200 })
  } catch (error) {
    console.error("[API ERROR]", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
