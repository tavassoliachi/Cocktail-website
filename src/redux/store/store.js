import { createStore,applyMiddleware,combineReducers } from "redux";
import { alcoholicData } from "../reducers/fetchReducer";
import { nonAlcoholicData } from "../reducers/fetchReducer";
import { singleDrinkData } from "../reducers/fetchReducer";
import { randomDrinkData } from "../reducers/fetchReducer";
import { searchData } from "../reducers/fetchReducer";
import { ingredientsData } from "../reducers/fetchReducer"
import { loginUser } from "../reducers/fetchReducer";
import { registerUser } from "../reducers/fetchReducer";
import { userDrinks } from "../reducers/fetchReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'

const reducers = combineReducers({alcoholicData,nonAlcoholicData,singleDrinkData,randomDrinkData,searchData,ingredientsData,loginUser,registerUser,
    userDrinks
})
const middleware = applyMiddleware(thunk)
export const store = createStore(reducers,composeWithDevTools(middleware))