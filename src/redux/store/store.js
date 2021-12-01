import { createStore } from "redux";
import contactReducer from "../reducers/ContactReducers";

const store = createStore(contactReducer);
export default store;
