import { useState, } from "react"
import { toast } from 'react-toastify';
import { useAuth } from "../hooks";
import { signup } from "../api";
import { useNavigate, Navigate } from 'react-router-dom'


export default function Register() {
    const auth=useAuth();
    const [email, setEmail] = useState('');
    const [name, setName]=useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword]=useState('')
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate=useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();

       
        if (!email || !password || !confirmPassword || !name) {
            return toast.error('Please enter both email and password');
        }

        if (confirmPassword != password) {
            return toast.error('Password and confirm password is not matching');
        }

        setIsRegistering(true);
        const response = await signup(name, email, password, confirmPassword);
        if (response.success) {
            toast.success('Successfully registered')
            navigate('/login')
        }
        else {
            toast.error(response.message)
        }
        setIsRegistering(false)
    }

    if (auth.user) {
        return <Navigate to='/login' />
    }
    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Sign up</h1>

            <div className="form-floating">
                <input type="text" className="form-control" id="floatingInput1" placeholder="name@example.com" value={name} onChange={(e) => setName(e.target.value)} />
                <label>Name</label>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput2" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label >Password</label>
            </div>

            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword2" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <label >Confirm Password</label>
            </div>

            <button disabled={isRegistering} className="w-100 btn btn-lg btn-primary" type="submit">{isRegistering ? 'Registering...' : 'Register'}</button>
        </form>

    )
}