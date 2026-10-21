import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import Main from './layouts/Main'
import Header from './layouts/Header'
import ProductList from './pages/ProductList'
import ProductInfo from './pages/ProductInfo'
import AddProduct from './pages/AddProduct'
import SignIn from './users/SignIn'
import SignUp from './users/SignUp'
import UpdateProduct from './pages/UpdateProduct'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  // const [userRole, setUserRole] = useState('')


  const handleLogin = (username) => {
    setIsLoggedIn(true)
    setUsername(username)
    // setUserRole(role)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    // setUserRole('')
  }

  return (
    <div className='app'>

      <BrowserRouter>
        <Header 
          isLoggedIn={isLoggedIn} 
          username={username}  
          onLogout={handleLogout}
          // userRole={userRole}
        />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/products" element={<ProductList />} />
            <Route path='/products/:id' element={<ProductInfo />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/signin' element={<SignIn onLogin={handleLogin}/>} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/products/update/:id' element={<UpdateProduct />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
