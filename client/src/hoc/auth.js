import React, { useEffect } from 'react'
import Axios from 'axios'
import { auth } from '../_actions/user_action'
import { useDispatch } from 'react-redux'

export default function (SpecificComponent, option, adminRoute = null) {
    /*  option  - null : 아무나 출입 가능한 페이지
               - true : 로그인한 유저만 출입 가능한 페이지
               - false: 로그인한 유저는 출입 불가능한 페이지    */

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                if (!response.payload.isAuth) { // 로그인 하지 않은 상태
                    if (option) {   // 로그인 유저만 출입 가능 페이지 들어가려 할 때
                        props.history.push('/login')
                    }
                } else {    // 로그인 상태
                    if (adminRoute && !response.payload.isAdmin) {  // 관리자가 아닌데 관리자 출입 페이지 들어가려 할 때
                        props.history.push('/')
                    } else {
                        if (option === false) { // 로그인한 유저 출입 불가능 페이지 들어가려 할 때
                            props.history.push('/')
                        }
                    }
                }
            })
            Axios.get('/api/users/auth');
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}