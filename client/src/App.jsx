import { Routes,Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Contact from './pages/Contact'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import {Toaster} from 'react-hot-toast'





function App() {
 

  return (
    <>
    <Toaster position=' top-center' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/policy' element={<Policy/>}/>
        <Route path='/pagenotfound' element={<PageNotFound/>}/>
       </Routes>
    </>
  )
}

export default App
