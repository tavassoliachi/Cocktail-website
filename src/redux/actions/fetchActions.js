import {alcoholicURL, nonAlcoholicURL,singleDrinkURL,randomDrinkURL,searchDrinkURL, ingredientURL} from "../consts/drinkUrls"
import { alcoholic,nonAlcoholic,singleDrink,randomDrink,search,ingredient } from "../consts/reducerType"
import { api } from "../../utils/api"
export const fetchDrinks = (type) => async (dispatch) => {

    var url = ''
    var success,fail,request
    switch (type){
        case "alcoholic":
            url = alcoholicURL
            success = alcoholic.success
            fail=alcoholic.fail
            request=alcoholic.request
            break
        case "nonAlcoholic":
            url = nonAlcoholicURL
            success=nonAlcoholic.success
            fail=nonAlcoholic.fail
            request=nonAlcoholic.request
            break
    }

    const {data,error} = await api.get(`${url}`)
    data ? dispatch({type:`${success}`,payload:data}) : dispatch({type:`${fail}`,message:'Error,could not fetch drinks.'})

}
export const fetchSingleDrink = (id) => async (dispatch) => {
    dispatch({type:`${singleDrink.request}`})
    const {data,error} = await api.get(`${singleDrinkURL+id}`)
    data.drinks?.length ? dispatch({type:`${singleDrink.success}`,payload:data}) : dispatch({type:`${singleDrink.fail}`,message:`Error,could not fetch drink with id ${id}`})
}
export const fetchRandomDrinks = (n) => async (dispatch) => {
    var drinks = []
    dispatch({type:`${randomDrink.request}`})
    while(drinks.length!==n){
        const {data} = await api.get(`${randomDrinkURL}`)
        drinks.push(data.drinks[0])
    }
    if(drinks.length === n){
        dispatch({type:`${randomDrink.success}`,payload:drinks})
    }else{
        dispatch({type:`${randomDrink.fail}`,message:"Error"})
    }
}
export const fetchSearchResult = (keyword) => async (dispatch) =>{
    dispatch({type:`${search.request}`})
    const {data,error} = await api.get(`${searchDrinkURL+keyword}`)
    if(data){
        dispatch({type:`${search.success}`,payload:data.drinks})
    }else{
        dispatch({type:`${search.fail}`,error:error})
    }
}
export const fetchIngredient = (ingredients) =>  async (dispatch) =>{
    dispatch({type:`${ingredient.request}`})
    var dataArr = []
    for (const el in ingredients){
        const {data} = await api.get(`${ingredientURL + ingredients[el]}`)
        dataArr.push(data.ingredients[0])
    }
    dataArr.length ? dispatch({type:`${ingredient.success}`,payload:dataArr}) : dispatch({type:`${ingredient.fail}`,error:"error"})
    
}


