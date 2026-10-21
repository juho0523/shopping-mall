import api from '../api/api'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ProductList = () => {
    const [products, setProducts] = useState([])

    // 검색창에 입력 중인 키워드
    const [searchKeyWord, setSearchKeyWord] = useState('')

    // 실제 검색에 적용된 키워드
    const [appliedKeyword, setAppliedKeyword] = useState('')

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products')
                setProducts(response.data)
            } catch (error) {
                console.error('상품 목록 조회 에러:', error)
            }
        }

        fetchProducts()
    }, [])

    // 검색 버튼 클릭
    const handleSearch = () => {
        setAppliedKeyword(searchKeyWord.trim())
    }

    // Enter 키로도 검색
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    // 검색 결과 필터링
    const filteredProducts = products.filter((product) =>
        product.product_name
            .toLowerCase()
            .includes(appliedKeyword.toLowerCase())
    )

    return (
        <div className='product-list'>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="상품명으로 검색"
                    value={searchKeyWord}
                    onChange={(e) => setSearchKeyWord(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button type="button" onClick={handleSearch}>
                    검색
                </button>
            </div>

            <table className="table-list">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>가격</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    <Link to={`/products/${product.id}`}>
                                        {product.product_name}
                                    </Link>
                                </td>
                                <td>{product.price}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">검색 결과가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="btn-add">
                <Link to="/add-product">
                    <button type="button">상품 등록</button>
                </Link>
            </div>
        </div>
    )
}

export default ProductList