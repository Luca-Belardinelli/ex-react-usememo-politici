import React, { useState, useEffect, useMemo } from "react";

function CardPolitician({ name, image, biography, position }) {
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <h4>{position}</h4>
      <p>{biography}</p>
    </div>
  )
}

// Memorizzo il componente per evitare render non necessari
const MemoPolitician = React.memo(CardPolitician)

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Chiamata API per recuperare i dati dei politici
    fetch('http://localhost:3333/politicians')
      .then(Response => Response.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error))
  }, []);

  // Memorizzo il risultato del filtro per evitare ricalcoli non necessari
  // Si aggiorna solo quando cambiano politicians o search
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
          <MemoPolitician key={politician.id} {...politician} />
        ))}
      </div>
    </div>
  )
}

export default App
