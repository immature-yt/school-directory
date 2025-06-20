export default async function SchoolsPage() {
  const res = await fetch(
    'https://school-directory-theta.vercel.app/api/get-schools',
    { cache: 'no-store' }
  )
  const schools = await res.json()

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>📚 All Schools</h1>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'Arial, sans-serif',
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>{school.name}</td>
              <td style={tdStyle}>{school.address}</td>
              <td style={tdStyle}>{school.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
  borderBottom: '2px solid #ccc',
}

const tdStyle = {
  padding: '12px',
  verticalAlign: 'top',
}
