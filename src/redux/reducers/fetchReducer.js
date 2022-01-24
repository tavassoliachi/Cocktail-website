export const alcoholicData = (state={},action) => {
    switch(action.type){
        case "Success_alcoholic":
            return {
                    data: action.payload,
                    error: ""
            }
        case "Fail_alcoholic":
            return {
                data: {},
                error: action.error
            }
        default:
            return state
    }
}
export const nonAlcoholicData = (state={},action) => {
    switch(action.type){
        case "Success_nonAlcoholic":
            return {
                    data: action.payload,
                    error: ""
            }
        case "Fail_nonAlcoholic":
            return {
                data: {},
                error: action.error
            }
        default:
            return state
    }
}
export const singleDrinkData = (state={},action) => {
    switch(action.type){
        case "Success_singleDrink":
            return {
                    data: action.payload?.drinks[0],
                    error: ""
            }
        case "Fail_singleDrink":
            return {
                data: {},
                error: action.error
            }
        default:
            return state
    }
}
export const randomDrinkData = (state={},action) => {

    switch(action.type){
        case "Success_randomDrink":
            return {
                    data: action.payload,
                    error: ""
            }
        case "Fail_randomDrink":
            return {
                data: state.data,
                error: action.error
            }
        default:
            return state
    }
}
export const searchData = (state={},action) => {
    switch(action.type){
        case "Success_searchDrink":
            return {
                    data: action.payload,
                    error: ""
            }
        case "Fail_searchDrink":
            return {
                data: [],
                error: action.error
            }
        default:
            return state
    }
}
