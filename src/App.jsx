import React, { useState, useEffect } from 'react';

const App = () => {
  const [politicians, setPoliticians] = useState([]);
  const [loading, setLoading] = useState(true); // Stato per il caricamento

  useEffect(() => {
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

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {politicians.map((politician) => (
        <div
          key={politician.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            width: "300px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={politician.image}
            alt={politician.name}
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <h2>{politician.name}</h2>
          <h4>{politician.position}</h4>
          <p>{politician.biography}</p>
        </div>
      ))}
    </div>
  );
};

export default App;



