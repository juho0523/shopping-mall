import { NavLink, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Header = ({isLoggedIn, username, userRole, onLogout}) => {
    const navigate = useNavigate()

    

    return (
        <header className="header">
            <Link to="/">Home</Link>
            <Link to="/products">상품 목록</Link>
            {isLoggedIn && userRole === 'admin' && (
                <Link to="/add-product">상품 등록</Link>
            )}
            {isLoggedIn && userRole === 'admin' && (
                <NavLink to='/admin'>관리자</NavLink>
            )}
            {isLoggedIn ? (
                <div className="header-user">
                    <span>{username}님</span>
                    <button
                        type="button"
                        className="logout-btn"
                        onClick={() => { onLogout(); navigate('/');}}
                    >
                        로그아웃
                    </button>
                </div>
            ) : (
                <Link to="/signin">로그인</Link>
            )}
            
        </header>
    )
}
export default Header