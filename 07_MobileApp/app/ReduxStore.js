
import { createStore, combineReducers } from 'redux';
import ConnectionReducer from "./reducers/ConnectionReducer";

const store = createStore(ConnectionReducer);
export default store;