import { createStore,applyMiddleware,combineReducers } from "redux";
import { alcoholicData } from "../reducers/fetchReducer";
import { nonAlcoholicData } from "../reducers/fetchReducer";
import { singleDrinkData } from "../reducers/fetchReducer";
import { randomDrinkData } from "../reducers/fetchReducer";
import { searchData } from "../reducers/fetchReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'

const reducers = combineReducers({alcoholicData,nonAlcoholicData,singleDrinkData,randomDrinkData,searchData})
const middleware = applyMiddleware(thunk)
export const store = createStore(reducers,composeWithDevTools(middleware))