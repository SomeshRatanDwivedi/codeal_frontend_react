import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import { useAuth } from "../hooks";
import { Navigate, useParams } from 'react-router-dom'
import { getUserFriends, getUserInfo, addFriend as makeFriend, removeFriendShip } from "../api";
import { Loader } from "../components";


export default function Profile() {
    const auth = useAuth();
    const[thisUser, setThisUser]=useState({});
    const[addingFriend, setAddingFriend]=useState(false);
    const [removingFriend, setRemovingFriend] = useState(false);
    const [friends, setFriends]=useState([]);
    const [loading, setLoading]=useState(true);
    const {userId}=useParams();

    useEffect(() => {
        const getProfileInfo= async()=>{
            const response=await getUserInfo(userId);
            if(response.success){
                setThisUser(response.data.user);
            }
            else{
                toast.error(response.message);
            }
        }

        const getFriends = async () => {
            const response = await getUserFriends();
            if (response.success) {
                setFriends(response.data.friends)
            }
            else {
                toast.error(response.message);
            }
            setLoading(false);
        }
        
        getProfileInfo();
        getFriends();
       
    }, [userId]);
     

  
     
    const addFriend=async()=>{
        setAddingFriend(true);
          const response=await makeFriend(userId);
          if(response.success){
            const newFriendList=[...friends, response.data.friendship];
            setFriends(newFriendList);
            toast.success("User added in your friendlist");
          }
          else{
            toast.error(response.message)
          }

        setAddingFriend(false)
    }


    const removeFriend=async()=>{
        setRemovingFriend(true);
        const response=await removeFriendShip(userId);
        if(response.success){
            const newFriendList=friends.filter((friend)=>friend.to_user?._id!=userId);
            setFriends(newFriendList);
            toast.success("User is removed from your friendlist")
        }
        else {
            toast.error(response.message)
        }
        setRemovingFriend(false)

    }
   
    if(loading){
        return <Loader/>
    }

    if (!auth.user) {
        return <Navigate to='/login' />
    }
    if(!thisUser){
        return <Navigate to='/'/>
    }
    const isUserFriend=()=>{
        const friendsUserId=friends.map((friend)=>friend.to_user?._id);
        const isThisUserFriend=friendsUserId.filter((id)=>id===userId);
        if(isThisUserFriend.length>0){
            return true;
        }
        return false;
         
    }

   
    return (
        <form className="form">
            <div>
                <img className="mb-4" src="https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg"
                    alt="" width="200" />
                <h1 className="h3 mb-3 fw-normal">Profile</h1>

                <div className="form-floating">
                    Email: {thisUser.email}
                </div>
                <div className="form-floating">
                    Name: {thisUser.name}
                </div>
             
                  {
                    isUserFriend() ? <button disabled={removingFriend} className="w-100 btn btn-lg btn-primary" type="button" onClick={removeFriend}>{removingFriend ? 'Removing friend' : 'Remove friend'}</button> :
                        <button disabled={addingFriend} className="w-100 btn btn-lg btn-primary" type="button" onClick={addFriend}>{addingFriend ? 'Adding friend' : ' Add friend'}</button> 
                  }         
                

            </div>

        </form>

    )
}
