import React from "react";

const CharacterCard = (props.data && props.key) => {
  return (
    <div>
      <h1>{props.data.name}</h1>
      <p>{props.data.bio}</p>
    </div>
  );
};

export default CharacterCard;
