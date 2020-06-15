import store from './store';

// on "dispatche" l'action 
store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug 1"
  }
});

store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug 2"
  }
});
store.dispatch({
  type: "bugUpdated",
  payload: {
    id: 2,
    description: "Bug 2 modifié"
  }
});
console.log("store : ", store.getState());

store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1
  }
});
console.log("store : ", store.getState());
