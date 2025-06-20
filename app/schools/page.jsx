export default async function SchoolsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-schools`, {
    cache: 'no-store',
  })
  const schools = await res.json()

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
