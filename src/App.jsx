import React, { useState, useMemo } from 'react';

function PoliticianCard({ name, image, position, biography }) {
  console.log('card');
  return (

    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        width: "300px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h2>{name}</h2>
      <h4>{position}</h4>
      <p>{biography}</p>
    </div>
  )

}
const MemorizedPolitician = React.memo(PoliticianCard)

const App = () => {
  const [politicians, setPoliticians] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Chiamata API e memorizzazione dei dati
  useMemo(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://boolean-spec-frontend.vercel.app/freetestapi/politicians');
        const data = await response.json();
        setPoliticians(data);
      } catch (error) {
        console.error('Errore durante il caricamento dei dati', error);
      }
    };

    fetchData();
  }, []);

  // Filtraggio dei politici basato sulla ricerca
  const filteredPoliticians = useMemo(() => {
    return politicians.filter((politician) =>
      politician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      politician.biography.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [politicians, searchQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Cerca per nome o biografia..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "300px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredPoliticians.map((politician) => (
          <MemorizedPolitician key={politician.id} {...politician} />
        ))}
      </div>

    </div>
  );
};

export default App;


