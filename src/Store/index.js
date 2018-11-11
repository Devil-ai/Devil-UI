import {createStore} from "redux";
import reducer from "../Reducers";
const initState =  {
    status: "sleeping",
    value: '',
  };
const store = createStore(reducer, initState);
export default store;