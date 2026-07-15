"use client"
import { supabase } from "@/lib/sbConn"
// import Image from "next/image"
import { useEffect, useState } from "react"
import Image from "next/image";
import Sidebar from "@/components/sidebar";
export default function OrderTable(){
    const [orderArr,setorderArr]=useState([])
    const [acc,setacc]=useState(0)
    const [show,setshow]=useState(false)
useEffect(()=>{
    fetchOrder()
    setshow(false)
},[show])

const  fetchOrder=async()=> {
    const {data,error}=await supabase.from("orders").select("*,products(*)").order("created_at",{ascending:true})
    if(!error){
      console.log(data)
    setorderArr(data)
        
    }else{
        console.log(error.message)
    }
}
const accOrder=async(id)=>{ 
const {data,error}=await supabase.from("orders").update({
  status:"accepted"
}).eq("id",id)
 if(!error){
  console.log(data)
  setshow(true)

 }
}
const rejOrder=async(id)=>{ 
const {data,error}=await supabase.from("orders").update({
  status:"rejected"
}).eq("id",id)
 if(!error){
  console.log(data)
  setshow(true)

 }
}
return (
  <>
  <Sidebar/>
    <div className="min-h-screen bg-gray-100 pl-76 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Orders Management
        </h1>

        <p className="text-gray-500 mt-2">
          View, manage and update all customer orders from one place.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 bg-white px-5 py-2 rounded-xl shadow-sm border">
          <span className="font-semibold text-gray-700">
            Total Orders
          </span>

          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
            {orderArr.length}
          </span>
        </div>
        <div className="mt-5 ml-10 inline-flex items-center gap-2 bg-white px-5 py-2 rounded-xl shadow-sm border">
          <span className="font-semibold text-gray-700">
            Total Accepted
          </span>

         <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
  {orderArr.reduce((count, v) => {
    return v.status === "accepted" ? count + 1 : count;
  }, 0)}
</span>
        </div>
        <div className="mt-5 ml-10 inline-flex items-center gap-2 bg-white px-5 py-2 rounded-xl shadow-sm border">
          <span className="font-semibold text-gray-700">
            Total Rejected
          </span>

         <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
  {orderArr.reduce((count, v) => {
    return v.status === "rejected" ? count + 1 : count;
  }, 0)}
</span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

        <div className="px-6 py-5 border-b bg-gradient-to-r from-gray-900 to-gray-800">
          <h2 className="text-xl font-semibold text-white">
            Customer Orders
          </h2>

          <p className="text-gray-300 text-sm mt-1">
            Review and update incoming product orders.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gray-100">
              <tr className="text-left text-gray-600 uppercase text-xs tracking-wider">

                <th className="px-6 py-4">Product</th>

                <th className="px-6 py-4">Image</th>

                <th className="px-6 py-4">Price</th>

                <th className="px-6 py-4">Status</th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {orderArr.map((v, i) => {

                return (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50 duration-200"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <h2 className="font-semibold text-gray-800">
                          {v.products.prod_name}
                        </h2>

                        <p className="text-xs text-gray-500 mt-1">
                          Premium Quality Product
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <Image
                        src={v.products.prod_url}
                        width={60}
                        height={60}
                        alt="product"
                        className="rounded-xl border object-cover"
                      />
                    </td>

                    <td className="px-6 py-5 font-semibold text-green-600">
                      Rs. {v.products.prod_price}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          v.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : v.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {v.status}
                      </span>

                    </td>

                     <td className="px-6 py-5">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => {
                            accOrder(v.id);
                          }}
                          className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-xl transition font-medium"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => {
                            rejOrder(v.id);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition font-medium"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );

              })}

            </tbody>

          </table>

          {orderArr.length === 0 && (
            <div className="py-20 text-center">

              <div className="text-6xl mb-4">
                📦
              </div>

              <h2 className="text-2xl font-semibold text-gray-700">
                No Orders Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Customer orders will appear here once they place an order.
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  </>
);
}