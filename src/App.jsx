
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/HomePage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  return (
    <>
    
      <Routes>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        
        <Route
          path='/home'
          element={isLoggedIn?<HomePage/>:<Navigate to="/login" replace/>}
          />

        <Route path='*' element={<Navigate to="/login" replace/>}/>
      </Routes>
    
    </>
  )
}

export default App
