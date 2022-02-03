import {alcoholicURL, nonAlcoholicURL,singleDrinkURL,randomDrinkURL,searchDrinkURL, ingredientURL} from "../consts/drinkUrls"
import { alcoholic,nonAlcoholic,singleDrink,randomDrink,search,ingredient,user } from "../consts/reducerType"
import { api } from "../../utils/api"
import { auth } from "../../firebase-config"
import {signOut,signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {setDoc,getDoc,doc,deleteField} from "firebase/firestore"
import { db } from "../../firebase-config"

export const userRecepies = (props) => async (dispatch) => {

    const attachData = async () => {
        var res1 = await getDoc(doc(db,"users",auth.currentUser.uid))
        dispatch({type:'attachDrinks',payload:res1.data()})
    }

    switch(props.type){
        case "attach":
            attachData()
            break
        case "removeData":
            dispatch({type:'removeDrinks'})
            break
        case "add": 
            await setDoc(doc(db,"users",auth.currentUser.uid),{drinks: { [Date.now()]:props.payload } },{merge:true})
            break
        case "edit":
            const editData=props.payload.editData
            await setDoc(doc(db,"users",auth.currentUser.uid),{drinks:{[editData.idDrink]:props.payload.editData}},{merge:true})
            break
        case "delete":
            const id = props.payload.id
            await setDoc(doc(db,"users",auth.currentUser.uid),{drinks:{[id]:deleteField() }},{merge:true})
            break
        default : { }
    }
    props.type !=="removeData" && props.type !=="attach" && attachData()

}
export const authorization = (props) => async (dispatch) => {
    const login = async () =>{
        var success=true
        try{
            await signInWithEmailAndPassword(auth,props.email,props.password)
        } catch (error){
            dispatch({type:`${user.loginFail}`,error:`${error.message}`})
            success=false
        }finally {
            if(success){
                const payload = {
                    user:auth.currentUser,
                }
                dispatch({type:`${user.logIn}`,payload:payload})
                dispatch(userRecepies({type:"attach"}))
            }
          }
    }

    switch(props.type){
        case "logIn":
            login()
            break
        case "logOut":
            signOut(auth)
            dispatch(userRecepies({type:"removeData"}))
            dispatch({type:`${user.logOut}`})
            break
        case "attachData":
            const payload = {
                user:auth.currentUser,
            }
            dispatch({type:`${user.logIn}`,payload:payload})
            dispatch(userRecepies({type:"attach"}))
            break
        case "register":
            var success = true
            try{
                await createUserWithEmailAndPassword(auth,props.email,props.password)
            } catch (error){
                dispatch({type:`${user.registerFail}`,error:`${error.message}`})
                success=false
            }
            if(success){
                await updateProfile(auth.currentUser,{
                    displayName:`${props.displayName}`
                })
                dispatch({type:`${user.registerSuccess}`})  
                login()
            }
          break
        default : { }

    }
}
export const fetchDrinks = (type) => async (dispatch) => {

    var url = ''
    var success,fail
    switch (type){
        case "alcoholic":
            url = alcoholicURL
            success = alcoholic.success
            fail=alcoholic.fail
            break
        case "nonAlcoholic":
            url = nonAlcoholicURL
            success=nonAlcoholic.success
            fail=nonAlcoholic.fail
            break
        default : { }
    }

    const {data} = await api.get(`${url}`)
    data ? dispatch({type:`${success}`,payload:data}) : dispatch({type:`${fail}`,message:'Error,could not fetch drinks.'})

}
export const fetchSingleDrink = (id) => async (dispatch) => {
    dispatch({type:`${singleDrink.request}`})
    const {data} = await api.get(`${singleDrinkURL+id}`)
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


