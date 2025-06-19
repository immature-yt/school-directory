import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function SchoolsPage() {
  const schools = await prisma.school.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">All Schools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{school.name}</h2>
            <p><strong>Address:</strong> {school.address}</p>
            <p><strong>Phone:</strong> {school.phone}</p>
            {school.imageUrl && (
              <img
                src={school.imageUrl}
                alt={school.name}
                className="mt-2 max-h-40 w-full object-cover rounded"
              />
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
