import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/api'

const UpdateProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        description: ''
    })

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`)

                setFormData({
                    productName: response.data.product_name ?? '',
                    price: response.data.price ?? '',
                    description: response.data.description ?? ''
                })
            } catch (error) {
                console.error('상품 조회 에러:', error)
                alert('상품 정보를 불러오지 못했습니다.')
            }
        }

        fetchProduct()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            !formData.productName.trim() ||
            !formData.price ||
            !formData.description.trim()
        ) {
            alert('모든 필드를 입력해주세요')
            return
        }

        if (isNaN(formData.price) || Number(formData.price) <= 0) {
            alert('가격은 0보다 커야합니다')
            return
        }

        try {
            const response = await api.put(`/products/${id}`, {
                productName: formData.productName,
                price: Number(formData.price),
                description: formData.description
            })

            alert(response.data)
            navigate(`/products/${id}`)

        } catch (error) {
            console.error('상품 수정 실패:', error)
            alert(
                error.response?.data || '상품 수정 중 오류가 발생했습니다.'
            )
        }
    }

    const handleCancel = () => {
        navigate(`/products/${id}`)
    }

    return (
        <div className="add-product">
            <h2>상품 수정</h2>

            <form onSubmit={handleSubmit} className="add-form">
                <div>
                    <label htmlFor="productName">상품명</label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="price">가격</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="description">설명</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        cols={30}
                    />
                </div>

                <div>
                    <button type="submit">수정</button>
                    <button type="button" onClick={handleCancel}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProduct