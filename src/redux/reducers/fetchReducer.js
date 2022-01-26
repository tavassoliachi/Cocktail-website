import { alcoholic,nonAlcoholic,singleDrink,randomDrink,search,ingredient } from "../consts/reducerType"
export const alcoholicData = (state={},action) => {
    switch(action.type){
        case alcoholic.request:
            return {
                    loading:true,
            }
        case alcoholic.success:
            return {
                    data: action.payload,
                    loading:false,
                    error: ""
            }
        case alcoholic.fail:
            return {
                data: {},
                loading:false,
                error: action.error
            }
        default:
            return state
    }
}
export const nonAlcoholicData = (state={},action) => {
    switch(action.type){
        case nonAlcoholic.request:
            return {
                    loading:true,
            }
        case nonAlcoholic.success:
            return {
                    data: action.payload,
                    loading:false,
                    error: ""
            }
        case nonAlcoholic.Fail:
            return {
                data: {},
                loading:false,
                error: action.error
            }
        default:
            return state
    }
}
export const singleDrinkData = (state={},action) => {
    switch(action.type){
        case singleDrink.request:
            return {
                    loading:true,
                    data:{}
            }
        case singleDrink.success:
            return {
                    data: action.payload.drinks[0],
                    loading:false,
                    error: ''
            }
        case singleDrink.fail:
            return {
                data: undefined,
                loading:false,
                error: action.error
            }
        case singleDrink.erase:
            return {
                data:{}
            }
        default:
            return state
    }
}
export const randomDrinkData = (state={},action) => {

    switch(action.type){
        case randomDrink.request:
            return {
                    loading:true,
            }
        case randomDrink.success:
            return {
                    data: action.payload,
                    loading:false,
                    error: ""
            }
        case randomDrink.fail:
            return {
                data: state.data,
                loading:false,
                error: action.error
            }
        default:
            return state
    }
}
export const searchData = (state={},action) => {
    switch(action.type){
        case search.request:
            return {
                    loading:true,
            }
        case search.success:
            return {
                    data: action.payload,
                    loading:false,
                    error: ""
            }
        case search.fail:
            return {
                data: [],
                loading:false,
                error: action.error
            }
        default:
            return state
    }
}
export const ingredientsData = (state={},action) => {
    switch(action.type){
        case ingredient.request:
            return {
                    loading:true,
                    data:{}
            }
        case ingredient.success:
            return {
                    data: action.payload,
                    loading:false,
                    error: ""
            }
        case ingredient.fail:
            return {
                data: [],
                loading:false,
                error: action.error
            }
        default:
            return state
    }
}
