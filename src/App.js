import './App.css';
import 'swiper/css';
import Header from './components/Header';
import RoutesComponent from './routes/RoutesComponent';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase-config';
import { authorization } from './redux/actions/fetchActions';
import { useNavigate } from 'react-router-dom';
import {onAuthStateChanged} from "firebase/auth"
import { useTranslation } from 'react-i18next';
import { fetchDrinks } from './redux/actions/fetchActions';
import { fetchRandomDrinks } from './redux/actions/fetchActions';
import { debounce } from 'lodash';
import { useEffect } from 'react';
function App() {
  const {i18n} = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((data)=>data.loginUser.email)
  onAuthStateChanged(auth,(currentUser)=> {
    if(currentUser && !user){
      dispatch(authorization({type:`${'attachData'}`}))
    }
    auth.currentUser && ['/register','/login'].includes(window.location.pathname) && navigate('/')
  })
  useEffect(()=>{
    dispatch(fetchRandomDrinks(10)) 
    const alc = debounce(()=>dispatch(fetchDrinks("alcoholic")),200)
    const nonAlc = debounce(()=>dispatch(fetchDrinks("nonAlcoholic")),400)
    alc()
    nonAlc()
},[])

  return (
    <div className="App" style={{paddingBottom:"50px"}}>
        <Header/>
        <div  style={{marginTop:"80px"}}>
          <RoutesComponent/>
        </div>
    </div>
  );
}

export default App;
