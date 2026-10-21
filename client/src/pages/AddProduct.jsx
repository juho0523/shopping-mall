import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from '../api/api'

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.price ||
            !formData.description.trim()
        ) {
            alert("모든 필드를 입력해주세요");
            return;
        }

        if (isNaN(formData.price) || Number(formData.price) <= 0) {
            alert("가격은 0보다 커야합니다");
            return;
        }

        try {
            const response = await api.post("/products", {
                productName: formData.name,
                price: Number(formData.price),
                description: formData.description
            });

            alert(response.data);
            navigate("/products");

        } catch (error) {
            console.error("상품 등록 실패:", error);
            alert(
                error.response?.data || "상품 등록 중 오류가 발생했습니다."
            );
        }
    }

    const handleCancel = () => {
        setFormData({
            name: '',
            price: '',
            description: ''
        })
    }

    return (
        <div className="add-product">
            <h2>상품 등록</h2>
            <form onSubmit={handleSubmit} className="add-form">
                <div>
                    <label htmlFor="name">상품명</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="상품명을 입력하세요"
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
                        placeholder="가격을 입력하세요"
                    />
                </div>
                <div>
                    <label htmlFor="description">설명</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        cols={30}
                        placeholder="상품 설명을 입력하세요"
                    />
                </div>
                <div>
                    <button type="submit">등록</button>
                    <button type="button" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    )
}
export default AddProduct