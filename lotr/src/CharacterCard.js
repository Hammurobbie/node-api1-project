import React from "react";

const CharacterCard = props => {
  return (
    <div>
      <h1>{props.data.name}</h1>
      <p>bio: {props.data.bio}</p>
      <button>edit</button>
      <button>delete</button>
    </div>
  );
};

export default CharacterCard;
