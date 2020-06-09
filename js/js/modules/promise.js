"use strict";
const getToken = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() > 0) {
        const token = "qsdfEDLSoie5d8899;dEDd";
        console.log("Token ok");
        res(token);
      } else
        rej(new Error("Pas de chance, vous n'avez pas pu obtenir de token"));
    }, 2000);
  });
};

const getUser = token => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0) {
        console.log("User ok", token);
        resolve({ id: 1, token: token });
      } else reject(new Error("Pas d'utilisateur"));
    }, 2000);
  });
};

getToken()
  .then(value => {
    console.log("value dans le premier then : ", value);
    // notez ici que "then" doit renvoyer une promesse pour que l'on puisse "chaîner"
    return getUser(value); 
  })
  .then(value => {
    console.log("value dans le deuxième then : ", value);
  })
  .catch(error => {
    console.error("Erreur: ", error.message);
  });