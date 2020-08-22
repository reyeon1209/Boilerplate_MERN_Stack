import React from 'react'
import { response } from 'express'
import axios from 'axios'

function LandingPage() {
    userEffect(() => {
        axios.get('/api/hello').then(response=> { console.log(response) })
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh' }}>
            <h2>시작 페이지</h2>
        </div>
    )
}

export default LandingPage
