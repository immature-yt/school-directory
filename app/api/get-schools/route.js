import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const schools = await prisma.school.findMany()
    return NextResponse.json(schools)
  } catch (error) {
    console.error('[GET SCHOOLS ERROR]', error)
    return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 })
  }
}
