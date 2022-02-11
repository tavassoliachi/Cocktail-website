import React,{useState,useRef} from 'react';
import { useDispatch } from 'react-redux';
import { authorization } from '../../redux/actions/fetchActions';
import styles from "./styles.module.css"
import { useSelector } from 'react-redux';
import "./styles.css"
import TextField from '@mui/material/TextField';

export default function Register() {
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [rePass,setRePass] = useState('')
    const dispatch = useDispatch()
    const registerRef = useRef()
    const handleRegister= async ()=>{
            registerRef.current.disabled = true
            dispatch(authorization({type:"register",email:`${email}`,password:`${pass}`}))
            setTimeout(() => {
                registerRef.current.disabled = false
              }, 1000);
    }
    const data = useSelector(data => data?.registerUser)
  return <div className={styles.mainCont}>

            <div className={styles.regCont} id='inputs-mui'>
                <h1 className={styles.title}>registration</h1>

                        <TextField
                        error={data?.error?.includes("mail")}
                        label="Email"
                        value={email}
                        autoComplete='off'
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
                        <TextField
                        error={pass.length>0 && rePass !== pass}
                        label="Repeat Password"
                        value={rePass}
                        onChange={(e)=>setRePass(e.target.value)}
                        type={'password'}
                        helperText={pass.length>0 && rePass !== pass && 'Passwords do not match'}
                        />
                        


                <button onClick={handleRegister} disabled={!Boolean(rePass==pass)} className={styles.regButton} ref={registerRef}>register</button>
            </div>
        </div>;
}
