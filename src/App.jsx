import { useState, useEffect } from "react"

function App() {

  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/politicians')
      .then(Response => Response.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error))
  }, []);

  return (
    <div>
      <h1>Lista Politici</h1>
      <div className="container">
        {politicians.map(politician => (
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
