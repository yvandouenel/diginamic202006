import React from "react";

const Column = (props) => {
  return (
    <section className="col">
      <div className="d-flex align-items-start">
        <button
          onClick={(event) => {
            props.onClickAddCard(event);
          }}
          className="btn btn-success mr-2"
        >
          +
        </button>
        <h2>{props.column.title}</h2>
      </div>
    </section>
  );
};

export default Column;
