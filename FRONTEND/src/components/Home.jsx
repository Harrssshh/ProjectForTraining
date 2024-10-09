import React from 'react'
import logo from './logo.png'

const Home = () => {
  return (
    <div className='h-[100vh] w-[100vw]'>
      <div className='h-[10vh] w-[100vw] bg-slate-700 flex justify-between items-center '>
        <div className="text-white text-xl h-[10vh] w-[8vw] bg-cover items-center" >
          <img src={logo} alt="" />
        </div>



         <div className="hidden md:block">
            <form action="/search" className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-2 border border-slate-700 rounded-sm w-full"/>
              <button type="submit" className="absolute right-0 top-0 mt-2 mr-2 text-white">
                🔍
              </button>
            </form>
          </div>



            <div className="flex items-center space-x-4">
            <a href="/login" className="text-white hover:text-gray-800 m-5">
              Login
            </a>

            <a href="/signup" className="text-white hover:text-gray-800 m-5">
              Signup
            </a>


            <a href="/wishlist" className="relative text-white hover:text-gray-800 ml-8 ">
            💖 Wishlist
            </a>


            <a href="/cart" className="relative text-white hover:text-gray-800 ml-5">
              🛒 Cart (2)
            </a>
          </div>
      </div>
      HOME
    </div>
  )
}

export default Home
