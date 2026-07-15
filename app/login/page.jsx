
"use client"
import { useRouter } from 'next/navigation'
import {  useState } from "react"

import { supabase } from "@/lib/sbConn"


// import { useNavigate } from "react-router-dom"

function Signup(){
  const router=useRouter()
const [email,setEmail]=useState("")
const [password,setpassword]=useState("")

const login= async ()=>{
    
const {data,error}=await supabase.auth.signInWithPassword({
    email:email,
    password:password,   
})
if (error){
    alert(error.message)
}else{
  alert("login user...")
  router.push('/products')

}
}
const signup=async()=>{
  router.push('/')
}

return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Welcome Back
      </h1>

      <p className="text-center text-gray-500 mb-8">
        Login to continue shopping
      </p>

      <div className="space-y-5">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          onClick={() => {
            login();
          }}
          className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>

      </div>

      <p className="text-center text-gray-600 mt-6">
        Don't have an account?{" "}
        <button
          onClick={() => {
            signup();
          }}
          className="text-blue-600 hover:underline font-semibold"
        >
          Sign Up
        </button>
      </p>

    </div>
  </div>
);

}
export default Signup


