

import { Navigate } from 'react-router-dom';
import Friends from '../components/Friends';
import Posts from '../components/Posts';
import { useAuth } from '../hooks';

export default function Home() {

    const auth = useAuth();

    if (!auth.user) {
        return <Navigate to='/login' />
    }
    return (
        <div className="home-parent">
            <div className='posts-parent'>
                <Posts />
            </div>
            <ul className='friends-parent'>
                <h4>Friends</h4>
                <Friends />

            </ul>

        </div>
      
    )
}