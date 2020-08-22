import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { response } from 'express'

function LoginPage(props) {
    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    // 타이핑할 때 onChange 이벤트를 발생시켜서 state을 바꿔주면 아래 html의 value가 바뀜
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault(); // login 버튼 클릭할 때마다 refresh 되는 것을 막아줌

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))   // loginUser : Action
            .then(response => {
                if (response.payload.loginSuccess) {    // 로그인 성공하면
                    props.history.push('/') // root page로 이동
                } else {
                    alert('Error')
                }
            })
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh' }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
