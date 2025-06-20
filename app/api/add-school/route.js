import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req) {
  try {
    const { name, address, phone } = await req.json()

    if (!name || !address || !phone) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const newSchool = await prisma.school.create({
      data: {
        name,
        address,
        phone,
      },
    })

    return NextResponse.json(newSchool, { status: 201 })
  } catch (error) {
    console.error('[API ERROR]', error)
    return NextResponse.json({ error: 'Failed to add school' }, { status: 500 })
  }
}
