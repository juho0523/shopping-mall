import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

import Main from './layouts/Main'
import Header from './layouts/Header'
import ProductList from './pages/ProductList'
import ProductInfo from './pages/ProductInfo'
import AddProduct from './pages/AddProduct'
import SignIn from './users/SignIn'
import SignUp from './users/SignUp'
import UpdateProduct from './pages/UpdateProduct'
import AdminPage from './users/AdminPage'

// 관리자 권한 확인
const AdminCheck = ({ userRole, children }) => {
  const alertShown = useRef(false)

  useEffect(() => {
    
    if (userRole !== 'admin' && !alertShown.current) {
      alertShown.current = true
      alert('관리자만 접근할 수 있습니다.')
    }
  }, [userRole])

  if (userRole !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [userRole, setUserRole] = useState('')

  const handleLogin = (username, role) => {
    setIsLoggedIn(true)
    setUsername(username)
    setUserRole(role)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setUserRole('')
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Header
          isLoggedIn={isLoggedIn}
          username={username}
          userRole={userRole}
          onLogout={handleLogout}
        />

        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductInfo />} />

            {/* 관리자만 상품 등록 가능 */}
            <Route
              path="/add-product"
              element={
                <AdminCheck userRole={userRole}>
                  <AddProduct />
                </AdminCheck>
              }
            />

            <Route
              path="/products/update/:id"
              element={<UpdateProduct />}
            />

            <Route
              path="/signin"
              element={<SignIn onLogin={handleLogin} />}
            />

            <Route path="/signup" element={<SignUp />} />

            {/* 관리자만 관리자 페이지 접근 가능 */}
            <Route
              path="/admin"
              element={
                <AdminCheck userRole={userRole}>
                  <AdminPage userRole={userRole} />
                </AdminCheck>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App