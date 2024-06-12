import { Routes,Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Contact from './pages/Contact'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/policy' element={<Policy/>}/>
        <Route path='/pagenotfound' element={<PageNotFound/>}/>
       </Routes>
    </>
  )
}

export default App
