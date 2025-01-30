import React from 'react'
import { NavLink } from 'react-router-dom'

function SignUp() {
  return (
    <>
      <div className=" flex items-center justify-center h-screen">
        <div className="w-1/2 px-32">
          <h3 className="text-4xl mb-3">
            Welcome to <span className="text-blue-400 font-semibold">Quizzy</span>
          </h3>
          <h4 className="text-2xl mb-5">Create your account</h4>
          <form autoComplete="off"  method="post">
            <input
              className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
              type="text"
              placeholder="Full Name"
              name="fullname"
            />
            <input
              className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
              type="email"
              placeholder="Email"
              name="email"
            />
            <input
              className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
              type="password"
              placeholder="Password"
              name="password"
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
