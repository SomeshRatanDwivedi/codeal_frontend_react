import { useState } from "react"
import {toast } from 'react-toastify';
import { useAuth } from "../hooks";
import { useNavigate, Navigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const auth = useAuth();
    const navigate=useNavigate();
  

   async function handleSubmit(e){
        e.preventDefault();
      
        setIsLoggingIn(true);
        if(!email || !password){
            toast.error('Please enter both email and password');
        }
       

        const response=await auth.login(email, password);
        if(response.success){
            toast.success('Successfully logged in');
            navigate('/')
        }
        else{
            toast.error(response.message)
        }
        setIsLoggingIn(false)
    }

    if(auth.user){
       return  <Navigate to='/'/>
    }
    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label>Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <label >Password</label>
            </div>

            <button disabled={isLoggingIn} className="w-100 btn btn-lg btn-primary" type="submit">{isLoggingIn?'Signing in...': 'Sign in'}</button>
        </form>

    )
}