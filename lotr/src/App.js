import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CharacterCard from "./CharacterCard";

function App() {
  const [characters, setCharacters] = useState(null);

  console.log(characters);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => {
        console.log(res.data);
        setCharacters(res.data);
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
    <div className="App">
      {characters.map(char => {
        <CharacterCard key={char.id} data={char} />;
      })}
    </div>
  );
}

export default App;
