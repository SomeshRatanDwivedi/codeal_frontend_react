import { useState, } from "react"
import { toast } from 'react-toastify';
import { useAuth } from "../hooks";
import { signup } from "../api";
import { Navigate } from 'react-router-dom'


export default function Setting() {
    const auth = useAuth();
    const [name, setName] = useState(auth.user?.name);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [isSaving, setSaving] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();


        if (!password || !confirmPassword || !name) {
            return toast.error('Please enter both email and password');
        }

        if (confirmPassword != password) {
            return toast.error('Password and confirm password is not matching');
        }

        setSaving(true);
        const response = await auth.editProfile(auth.user?._id, password, confirmPassword, name);
        if (response.success) {
            toast.success('Successfully saved your change')
        }
        else {
            toast.error(response.message)
        }
        setSaving(false);
        setEditMode(false);
    }

    if (!auth.user) {
        return <Navigate to='/login' />
    }
    return (
        <form className="form" onSubmit={handleSubmit}>
        <div>
            <img className="mb-4" src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
                alt="" width="200" />
            <h1 className="h3 mb-3 fw-normal">Settings</h1>

            <div className="form-floating">
                Email: {auth.user?.email}
            </div>
            {
                editMode ? <>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput1" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label>Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label >Password</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword2" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <label >Confirm Password</label>
                    </div>
                        <div className="d-flex justify-content-between">

                    <button disabled={isSaving} className=" btn btn-lg btn-primary" type="submit">{isSaving ? 'Saving...' : 'Save'}</button>
                    <button disabled={isSaving} className=" btn btn-lg btn-primary" type="button" onClick={() => setEditMode(false)}  >Back</button>
                    </div>

                </> :
                   <>
                        <div className="form-floating">
                            Name: {auth.user.name}
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="button" onClick={()=>setEditMode('true')}>Edit</button>

                   </>
                    
            }
           
            </div>
            
        </form>

    )
}