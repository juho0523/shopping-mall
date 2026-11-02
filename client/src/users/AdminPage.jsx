import { useEffect, useState } from "react"
import api from '../api/api'
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const AdminPage = ({ userRole }) => {
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productRes, userRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/users')
                ])
                setProducts(productRes.data)
                setUsers(userRes.data)
            } catch (error) {
                console.log("관리자 대시보드 조회 에러: ", error);
            }
        }
        fetchData();
    }, [userRole])

    console.log(userRole);


    if (userRole !== 'admin') {
        return (
            <div className="admin-page">
                <p>관리자만 접근할 수 있습니다</p>
                <Link to="/signin">로그인</Link>
            </div>
        )
    }

    const adminCount = users.filter(user => user.role === 'admin').length

    const totalPrice = products.reduce((sum, product) =>
        sum + product.price, 0)

    const avgPrice = products.length > 0 ?
        Math.round(totalPrice / products.length) : 0

    const recentProducts = [...products]
        .sort((a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf())
        .slice(0, 5)


    return (
        <div>
            <h2>관리자 대시보드</h2>
            <div className="admin-cards">
                <div className="card">
                    <p>전체 상품</p>
                    <strong>{products.length} 개</strong>
                </div>
                <div className="card">
                    <p>전체 회원</p>
                    <strong>{users.length} 명</strong>
                </div>
                <div className="card">
                    <p>관리자</p>
                    <strong>{adminCount} 명</strong>
                </div>
                <div className="card">
                    <p>평균 상품 가격</p>
                    <strong>{avgPrice} 원</strong>
                </div>
            </div>
            {/* 빠른 메뉴 */}
            <div className="admin-menu">
                <Link to='/products/new'><button>상품 등록</button></Link>
                <Link to='/products'><button>상품 목록</button></Link>
            </div>

            {/* 최근 등록 상품 */}
            <h3>최근 등록 상품</h3>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {recentProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.price}</td>
                            <td>{dayjs(product.created_at).format('YYYY-MM-DD HH:mm')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 회원 목록 */}
            <h3>회원 목록</h3>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>이메일</th>
                        <th>권한</th>
                        <th>가입일</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role === "admin" ? "관리자" : "일반회원"}</td>
                            <td>{dayjs(user.created_at).format('YYYY-MM-DD HH:mm')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminPage