import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../api/api'
const SignUp = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
    });


    const handleInputChange = (e) => {
        const { name, value  } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const {username, password, confirmPassword, email} = formData



        if(!formData.username.trim() || !formData.password.trim() || 
            !formData.confirmPassword.trim() || !formData.email.trim()) {
                alert('모든 필드 입력바랍니다')
                return
        }

        if(password !== confirmPassword){
          alert('비밀번호 불일치')
          return;
        }

        try {
          await api.post('/users', {username, password, email})
          alert('회원가입 완료')
          navigate('/signin')
        } catch (error) {
          alert('이미 존재하는 아이디이거나 예상치 못한 이유로 회원가입 실패')
        }

    }


    const handleCancel = () => {
        setFormData({
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
        })
    }

    return(
    <div className="sign-up">
      <h2>회원 가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>아이디</label>
          <input 
            type="text"
            name="username"
            value={formData.usernamename}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='password'>비밀번호</label>
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='confirmPassword'>비밀번호 확인</label>
          <input 
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='email'>이메일</label>
          <input 
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">가입</button>
          <button type="button" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp