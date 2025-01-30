import React from 'react';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom';

function Login() {
  return (
    <>
      
      <div className="w-full flex items-center justify-center h-screen">
        <div className="w-1/2 px-32">
          <h4 className="text-2xl capitalize mb-5">Login your account</h4>
          <form autoComplete="off"  >
            <input
              className="block bg-zinc-100 w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
              type="email"
              placeholder="Email"
              name="email"
            />
            <input
              className="block bg-zinc-100 w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
              type="password"
              placeholder="Password"
              name="password"
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
