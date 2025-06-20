import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function SchoolsPage() {
  const schools = await prisma.school.findMany()

  return (
    <div style={{ padding: '2rem' }}>
      <h1>All Schools</h1>
      <ul>
        {schools.map((school) => (
          <li key={school.id}>
            <strong>{school.name}</strong> <br />
            Address: {school.address} <br />
            Phone: {school.phone} <br />
            Image: <img src={school.image} alt={school.name} style={{ width: 200 }} />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
}
