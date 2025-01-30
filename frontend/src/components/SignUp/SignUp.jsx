import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios"
function SignUp() {

  const[fullname,setFullName]=useState()
  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const navigate=useNavigate()

  const handleSubmit=(e)=>{
e.preventDefault();
axios.post("http://localhost:3000/signup",{fullname,email,password})
.then(result=>console.log(result))
.catch(error=>console.log(error))
navigate("/home")
  }

  return (
    <>
      <div className=" flex items-center justify-center h-screen">
        <div className="w-1/2 px-32">
          <h3 className="text-4xl mb-3">
            Welcome to <span className="text-blue-400 font-semibold">Quizzy</span>
          </h3>
          <h4 className="text-2xl mb-5">Create your account</h4>
          <form autoComplete="off"  method="post" onSubmit={handleSubmit}>
            <input
              className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
              type="text"
              placeholder="Full Name"
              name="fullname"
              onChange={(e)=>setFullName(e.target.value)}
            />
            <input
              className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <input
              className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <input
              className="px-5 rounded-full py-3 mt-2 bg-blue-400 text-white"
              type="submit"
              value="Create My Account"
            />
          </form>
          <div className='flex flex-row mt-5 gap-3'>
          <p>Already have an account?</p>
          <NavLink to="/login" className='text-blue-400'>Login</NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
