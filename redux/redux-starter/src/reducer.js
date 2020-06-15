let lastId = 0;

export default function reducer(state = [], action) { // l'état initial est un tableau vide
  if(action.type === "bugAdded") {
    return [
      ...state,
      {
        id: ++lastId,
        description: action.payload.description,
        resolve: false
      }
    ]
  } if(action.type === "bugUpdated") {
    return state.map(bug => {
      if(bug.id === action.payload.id){
        bug.description = action.payload.description;
      }
      return bug;
    })
  }
  else if (action.type === "bugRemoved") {
    return state.filter(
      bug => bug.id !== action.payload.id
      );
  }
  return state; // permet de revenir à l'état initial l'action n'est pas pris en compte
}