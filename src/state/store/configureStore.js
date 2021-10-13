import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";

const initalState = {
  currentUser: {},
  authenticated: false,
  showLogin: false
};

const configureStore = () => {
  return createStore(rootReducer, initalState)
};

export default configureStore;
