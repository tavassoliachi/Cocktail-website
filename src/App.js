import './App.css';
import Header from './components/Header';
import Routes from './routes/Routes';
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
        <Routes/>
    </div>
  );
}

export default App;
