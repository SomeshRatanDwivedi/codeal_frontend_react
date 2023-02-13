
import { Home, Login, Page404, Setting, Profile } from '../pages';
import Loader from './Loader'
import Navbar from './Navbar';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks';
import Register from '../pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

   const auth=useAuth();

   if(auth.loading){
    return <Loader/>
   }

  return (
    <div className="App">
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/'  element={<Home/>} />
          <Route path='/login'  element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/user-profile/:userId' element={<Profile/>} />
          <Route path='*' element={<Page404/>}  />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
