import {alcoholic, nonAlcoholic,singleDrink} from "../consts/drinkTypes"
import axios from "axios"
import { baseUrl } from "../../utils/baseUrl"
export const fetchDrinks = (type) => async (dispatch) => {
    var url = ''
    switch (type){
        case "alcoholic":
            url = alcoholic
            break
        case "nonAlcoholic":
            url = nonAlcoholic
            break
    }
    await axios.get(`${baseUrl +url}`).then(response => dispatch({type:`Success_${type}`,payload:response.data.drinks}))
    .catch(error => dispatch({type:`Fail_${type}`,message:`${error}`}))

}
export const fetchSingleDrink = (id) => async (dispatch) => {
    await axios.get(`${baseUrl+singleDrink+id}`).then(response => dispatch({type:`Success_singleDrink`,payload:response.data}))
    .catch(error => dispatch({type:`Fail_singleDrink`,message:`${error}`}))

}


