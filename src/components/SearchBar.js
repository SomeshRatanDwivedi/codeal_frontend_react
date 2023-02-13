import { useState } from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllUser } from "../api";

export default function SearchBar(){
    const [users, setUsers]=useState('');

    const handleInput=async(value)=>{
        if(!value){
            setUsers('');
            return;
        }
         const response=await getAllUser(value);
         if(response.success){
            setUsers(response.data.users);
         }


    }



    return(
        <div className="search-bar-parent">
            <input onChange={(e)=>handleInput(e.target.value)} />
            {
                users &&
                <ul className="users-parent">
                     {
                        users.map((user)=>{
                            return (
                                <li className="user-info friend-li" key={`friend-${user._id}`}>
                                    <div>
                                        <i className="fa-sharp fa-solid fa-user-tie"></i>

                                    </div>
                                    <Link to={`/user-profile/${user._id}`} onClick={()=>setUsers('')}>
                                        <span>{user.name}</span>
                                    </Link>

                                </li>
                            )
                        }) 

                     }

                </ul>
            }
             
        </div>
    )

}