import { useState, useEffect, useMemo } from "react"

function App() {

  const [politicians, setPoliticians] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(Response => Response.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error))
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
      const name = politician.name.toLowerCase().includes(search.toLowerCase());
      const bio = politician.biography.toLowerCase().includes(search.toLowerCase());
      return name || bio
    })
  }, [politicians, search])

  return (
    <div>
      <h1>Lista Politici</h1>
      <input
        type="text"
        placeholder='Cerca per nome o biografia'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="container">
        {filteredPoliticians.map(politician => (
          <div key={politician.id} className="card">
            <img src={politician.image} alt={politician.name} />
            <h2>{politician.name}</h2>
            <h4>{politician.position}</h4>
            <p>{politician.biography}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
