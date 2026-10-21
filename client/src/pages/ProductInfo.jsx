import { useNavigate, useParams } from "react-router-dom"
import api from '../api/api'
import { useState, useEffect } from "react"
import dayjs from 'dayjs'
// import products from "../data/products"

const ProductInfo = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`)
                console.log('전체 응답:', response)
                console.log('응답 데이터:', response.data)
                setProduct(response.data)
            } catch (error) {
                console.error('상품 목록 조회 에러 : ', error)
            }
        }
        fetchProduct()
    }, [id])

    const handleDelete = async () => {
        // 삭제 여부 확인
        const isConfirmed = window.confirm("정말로 이 상품을 삭제하시겠습니까?");

        if (!isConfirmed) {
            return;
        }

        try {
            // 서버에 상품 삭제 요청
            const response = await api.delete(`/product/${id}`);

            alert(response.data);

            // 상품 목록 페이지로 이동
            navigate('/products');

        } catch (error) {
            console.error("상품 삭제 에러:", error);
            alert(error.response?.data || "상품 삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <section className="product-info">
            <h2>상품 정보</h2>

            {product ? (
                <div className="product-details">
                    <p>상품 ID: {id}</p>
                    <p>상품 이름: {product.product_name}</p>
                    <p>상품 가격: {product.price}</p>
                    <p>등록일 : {dayjs(product.created_at).format('YYYY-MM-DD HH:mm:ss')}</p>
                    <p>설명 : {product.description}</p>
                </div>
            ) : (
                <p>상품 정보를 불러오는 중입니다.</p>
            )}

            <div className="btn-list">
                <button onClick={() => navigate('/products')}>
                    목록
                </button>
                <button onClick={() => navigate(`/products/update/${id}`)}>수정</button>
                <button onClick={handleDelete}>삭제</button>
            </div>
        </section>
    )
}

export default ProductInfo