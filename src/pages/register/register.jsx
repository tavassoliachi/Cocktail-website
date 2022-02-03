import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { authorization } from '../../redux/actions/fetchActions';
import styles from "./styles.module.css"
import { useSelector } from 'react-redux';
import "./styles.css"
import TextField from '@mui/material/TextField';
export default function Register() {
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const dispatch = useDispatch()
    const handleRegister= async ()=>{
            dispatch(authorization({type:"register",email:`${email}`,password:`${pass}`}))
    }
    const data = useSelector(data => data?.registerUser)
  return <div className={styles.mainCont}>

            <h1>{data?.error}</h1>
            <div className={styles.regCont} id='inputs-mui'>
                <h1 className={styles.title}>registration</h1>

                        <TextField
                        error={data?.error?.includes("mail")}
                        label="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        helperText={data?.error?.includes("mail") && <p style={{width:'15rem'}}>{data.error}</p>}
                        />
                        <TextField
                        error={data?.error?.includes("password")}
                        label="Password"
                        value={pass}
                        onChange={(e)=>setPass(e.target.value)}
                        type={'password'}
                        helperText={data?.error?.includes("password") && <p style={{width:'15rem'}}>{data.error}</p>}
                        />



                <button onClick={handleRegister} className={styles.regButton}>register</button>
            </div>
        </div>;
}
