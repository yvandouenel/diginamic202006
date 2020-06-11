import React from "react";
const Nav = (props) => {
  function getBtnClass(selected) {
    // utilisation de l'opérateur ternaire
    return selected ? "btn-warning" : "btn-secondary";
  }
  return (
    <nav>
      <ul className="list-unstyled d-flex justify-content-center">
        {props.terms.map((term) => (
          <li
            key={term.id}
            className={`btn ${getBtnClass(term.selected)} m-2 p-2`}
          >
            {term.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
