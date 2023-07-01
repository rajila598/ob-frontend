import React, { useState } from 'react'
import { forgotPasswordApi } from '../../apis/Api';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const[email, setEmail] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        forgotPasswordApi({email}).then((res) =>{
            toast.success("password reset link sent to your email")
        }).catch((err) => {
            console.log(err)
            toast.error("Something went wrong")
        })
    }

  return (
    <div className='container'>
        <h1>Forgot Password</h1>
        <label htmlFor="">Enter your email:</label> <br />
        <input className='form-control w-25' type="email" placeholder='Enter valid email' onChange={(e) => setEmail(e.target.value)}/> 
        <button className='btn btn-info mt-2' onClick={handleSubmit}>
            Send password reset link
        </button>
    </div>
  )
}

export default ForgotPassword