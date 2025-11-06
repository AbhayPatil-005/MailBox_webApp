
import SignUpPage from './pages/Auth/SignUpPage';
import LoginPage from './pages/Auth/LoginPage';
import HomePage from './pages/HomePage';
import InboxView from './components/Features/InboxView';
import ComposeMail from './components/Features/ComposeMail';
import ReadMail from './components/Features/ReadMail';
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
          element={isLoggedIn ? <HomePage/> : <Navigate to="/login" replace/>}>

          <Route index element={<InboxView />}/>
          <Route path='inbox' element={<InboxView />} />
          <Route path='compose' element={<ComposeMail />} />
          <Route path="mail/:id" element={<ReadMail />} />
        </Route>

        <Route path='*' element={<Navigate to="/login" replace/>}/>
      </Routes>
    
    </>
  )
}

export default App
