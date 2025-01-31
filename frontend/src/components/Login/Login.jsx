import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

function Login() {
  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const navigate=useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3000/login", 
      { email, password },
      { withCredentials: true }  // Add this line
    )
    .then(result=>{
      console.log(result)
      if(result.data.message==="Success")
      {
        toast.success("Login successful!"); 
        navigate("/home")
      }
    })
    .catch(error=>{console.log(error)
      toast.error("Login failed! Please check your credentials.");
    })
   
      }
  return (
    <>
      
      <div className="w-full flex items-center justify-center h-screen">
        <div className="w-1/2 px-32">
          <h4 className="text-2xl capitalize mb-5">Login your account</h4>
          <form autoComplete="off" onSubmit={handleSubmit} >
            <input
              className="block bg-zinc-100 w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <input
              className="block bg-zinc-100 w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <input
              className="px-5 block rounded-full py-3 mt-2 bg-blue-400 text-white"
              type="submit"
              value="Login"
            />
          </form>

          <div className='flex flex-row mt-5 gap-3'>
          <p>Dont't have an account?</p>
          <NavLink to="/" className='text-blue-400'>SignUp</NavLink>
          </div>
        </div>
      </div>

    </>
  );
}

export default Login;
