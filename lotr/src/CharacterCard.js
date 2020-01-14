import React from "react";
import axios from "axios";

const CharacterCard = props => {
  const handleDelete = id => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err.message));
  };

  return (
    <div>
      <h1>{props.data.name}</h1>
      <p>bio: {props.data.bio}</p>
      <button>edit</button>
      <button onClick={() => handleDelete(props.data.id)}>delete</button>
    </div>
  );
};

export default CharacterCard;
