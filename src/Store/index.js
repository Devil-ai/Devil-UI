import {createStore} from "redux";
import reducer from "../Reducers";
const initState =  {
  status: 'sleeping',
  user: {},
  system: {},
  GRIDUSERINPUT: '',
  };
const store = createStore(reducer, initState);
export default store;