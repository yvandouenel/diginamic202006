import React from 'react';
const Card = (props) => {
  return (
    <article>
      <h3>{props.card.question}</h3>
      <h4>{props.card.answer}</h4>
    </article>
  );
}

export default Card;