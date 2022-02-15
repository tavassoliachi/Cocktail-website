import './App.css';
import 'swiper/css';
import Header from './components/Header';
import RoutesComponent from './routes/RoutesComponent';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase-config';
import { authorization } from './redux/actions/fetchActions';
import { useNavigate } from 'react-router-dom';
import {onAuthStateChanged} from "firebase/auth"
function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((data)=>data.loginUser.email)
  onAuthStateChanged(auth,(currentUser)=> {
    if(currentUser && !user){
      dispatch(authorization({type:`${'attachData'}`}))
    }
    auth.currentUser && ['/register','/login'].includes(window.location.pathname) && navigate('/')
  })

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
