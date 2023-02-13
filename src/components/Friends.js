import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserFriends } from "../api";
import Loader from "./Loader";

export default function Friends() {
    const [friends, setFriends] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        setLoader(true)
      
        const userFriends = async () => {

            const response = await getUserFriends();
            if (response.success) {
                setFriends(response.data.friends)
            }
            else {
                toast.error("Error in finding friends")
            }
           setLoader(false)
        }
        userFriends();


    }, [])


    if (loader) {
        return <Loader />
    }
    return (
        <>
            {
                friends.map((friend) => {
                    {
                     return friend.to_user && (
                            <li className="user-info friend-li" key={`friend-${friend._id}`}>
                                <div>
                                    <i className="fa-sharp fa-solid fa-user-tie"></i>

                                </div>
                                <Link to={`/user-profile/${friend.to_user?._id}`}>
                                    <span>{friend.to_user?.name ? friend.to_user.name : 'Ajay bharti'}</span>
                                </Link>

                            </li>

                        )
                    }
                })
            }
        </>
    )
}