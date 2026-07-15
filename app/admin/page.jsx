"use client"
import Sidebar from "@/components/sidebar"
import {supabase } from "@/lib/sbConn"
// import Sidebar from "@/components/sidebar"
import { useEffect, useState } from "react"

 export default function Home() {
  const [catArr,setcatArr]=useState([])
  const [proArr,setproArr]=useState([])
  const [ordArr,setordArr]=useState([])
  const [userArr,setuserArr]=useState([])
  useEffect(()=>{
    const fetchCat=async()=>{
const {data,error}=await supabase.from("catogories").select("*")
console.log(data)
 setcatArr(data)
  }
     const fetpro=async()=>{
const {data,error}=await supabase.from("products").select("*")
console.log(data)
 setproArr(data)
console.log(proArr)

 } 
    const fetOrd=async()=>{
const {data,error}=await supabase.from("orders").select("*")
console.log(data)
 setordArr(data)
console.log(proArr)

 }
    const fetcUser=async()=>{
const {data,error}=await supabase.from("profiles").select("*")
console.log(data)
 setuserArr(data)
console.log(proArr)

 }

 
fetchCat()
fetpro()
fetOrd()
fetcUser()

  },[])


console.log(proArr)

return (
  <>
    <Sidebar/>

    <div className="min-h-screen bg-gray-100 pl-76 p-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's a quick overview of your store.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Categories */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Categories
              </p>

              <h2 className="text-4xl font-bold text-gray-800 mt-2">
                {catArr.length}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
              📂
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-5">
            Total product categories available.
          </p>
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Products
              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-2">
                {proArr.length}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
              🛍️
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-5">
            Products currently listed in your store.
          </p>
        </div>

        {/* Users */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Users
              </p>

              <h2 className="text-4xl font-bold text-purple-600 mt-2">
                {userArr.length}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl">
              👥
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-5">
            Registered users on the platform.
          </p>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                Orders
              </p>

              <h2 className="text-4xl font-bold text-orange-500 mt-2">
                {ordArr.length}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl">
              📦
            </div>
          </div>

          <p className="text-gray-400 text-sm mt-5">
            Customer orders received so far.
          </p>
        </div>

      </div>

      {/* Welcome Section */}
      <div className="mt-10 bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Store Overview
        </h2>

        <p className="text-gray-500 mt-3 leading-7">
          Monitor your store performance from this dashboard. You can
          manage categories, products and customer orders while keeping
          track of your store statistics in one place.
        </p>
      </div>

    </div>
  </>
);

}