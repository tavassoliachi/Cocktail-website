import {alcoholic, nonAlcoholic,singleDrink,randomDrink} from "../consts/drinkTypes"
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
export const fetchRandomDrinks = (n) => async (dispatch) => {
    var drinks = []
    while(drinks.length!==n){
        const {data} = await axios.get(`${baseUrl + randomDrink}`)
        drinks.push(data.drinks[0])
    }
    if(drinks.length === n){
        dispatch({type:"Success_randomDrink",payload:drinks})
    }else{
        dispatch({type:"Fail_randomDrink",message:"Error"})
    }
}


