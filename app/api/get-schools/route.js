import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      include: {
        reviews: true,
      },
    })

    const schoolsWithAverages = schools.map((school) => {
      const reviews = school.reviews
      const total = reviews.length || 1

      const sum = {
        infrastructure: 0,
        academics: 0,
        valueForMoney: 0,
        extracurricular: 0,
      }

      for (const r of reviews) {
        sum.infrastructure += r.infrastructure
        sum.academics += r.academics
        sum.valueForMoney += r.valueForMoney
        sum.extracurricular += r.extracurricular
      }

      return {
        id: school.id,
        name: school.name,
        address: school.address,
        phone: school.phone,
        image: school.image,
        avgInfrastructure: reviews.length ? sum.infrastructure / total : null,
        avgAcademics: reviews.length ? sum.academics / total : null,
        avgValue: reviews.length ? sum.valueForMoney / total : null,
        avgExtra: reviews.length ? sum.extracurricular / total : null,
      }
    })

    return NextResponse.json(schoolsWithAverages)
  } catch (error) {
    console.error('[GET SCHOOLS ERROR]', error)
    return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 })
  }
}
