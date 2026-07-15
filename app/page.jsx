
"use client"
import { useRouter } from 'next/navigation'
import {  useState } from "react"

import { supabase } from "@/lib/sbConn"
import { Router } from 'next/router'

// import { useNavigate } from "react-router-dom"

function Signup(){
  const router=useRouter()
const [email,setEmail]=useState("")
     const [password,setpassword]=useState("")
     const [name,setname]=useState("")
     const [phone,setPhone]=useState("")
const signUp= async ()=>{
    
const {data,error}=await supabase.auth.signUp({
    email:email,
    password:password,
    
options: {
  data: {
    full_name:name,
    phone: phone
  }
}
})
if (!error){
   console.log(data.user.id)
const {data:user,error}=await supabase.from("profiles").insert({
  user_id:data.user.id,
  name:name,
  email:email,
  phone:phone
}).select()
if(!error){
  console.log(user)

}else{
  console.log(error.message)
}

}else{
  alert("signed no up")
  

}
}
const login=async()=>{
  router.push('/login')
}

return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Create Account
      </h1>

      <p className="text-center text-gray-500 mb-8">
        Sign up to continue shopping
      </p>

      <div className="space-y-5">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>

          <input
            type="name"
            placeholder="Enter your name"
            onChange={(e) => {
              setname(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>

          <input
            type="text"
            placeholder="Enter your phone number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          onClick={() => {
            signUp();
          }}
          className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition"
        >
          Sign Up
        </button>

      </div>

      <p className="text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <button
          onClick={() => {
            login();
          }}
          className="text-blue-600 hover:underline font-semibold"
        >
          Login
        </button>
      </p>

    </div>
  </div>
);

}
export default Signup


