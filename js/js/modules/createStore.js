function createStore() {
  let state = 0;
  function getState() {
    return state;
  }
  return {
    getState
  }
}
export default createStore();