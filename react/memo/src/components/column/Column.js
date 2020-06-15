import React from "react";
import Card from "./card/Card";

const Column = (props) => {
  return (
    <section className="col">
      <p>{props.index}</p>
      <div className="d-flex align-items-start">
        <button 
        onClick={props.onClickAddCard}
        className="btn btn-success mr-2">+</button>
        <h2>{props.column.name}</h2>
      </div>
      {props.column.cartes.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </section>
  );
};

export default Column;
