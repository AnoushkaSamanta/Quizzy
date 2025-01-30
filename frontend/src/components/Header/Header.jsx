import React from 'react'

function Header() {
  return (
    <div>
      <nav className="w-full flex justify-between px-5 py-3">
        <h3 className="text-2xl text-blue-400 font-semibold">Quizzy</h3>
        <div className="flex gap-5">
          <a href="" className="text-zinc-600 font-semibold">
            My Account
          </a>
          <a href="" className="text-zinc-600 font-semibold">
            About Us
          </a>
          <div className="px-2 py-1 bg-red-500 rounded-md">
            <a href="" className="text-white">
              Logout
            </a>
          </div>
        </div>
      </nav>

      <div className="bg-black h-[2px] w-[1500px] rounded-full ml-3"></div>
    </div>
  )
}

export default Header
