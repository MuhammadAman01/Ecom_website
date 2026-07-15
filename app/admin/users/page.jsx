"use client"
import Sidebar from "@/components/sidebar"
import { supabase } from "@/lib/sbConn"
import { useEffect, useState } from "react"

 


export default function Users(){
const [show,setshow]=useState(false)
const [userArr,setuserArr]=useState([])
const fetcUser=async()=>{
    const {data,error}=await  supabase.from("profiles").select("*").order("created_at", { ascending: false }) 
    
    if(!error){
        setuserArr(data)
    }else{
        console.log(error.message)
    }
}
useEffect(()=>{
fetcUser()
setshow(false)
},[show])
const blockUser=async(id)=>{
     const {data,error}=await supabase.from("profiles").update({
        is_blocked:true
     }).eq("id",id)
    if(!error){
        setshow(true)
    }
}
const  UnbUser=async(id)=>{
     const {data,error}=await supabase.from("profiles").update({
        is_blocked:false
     }).eq("id",id).order("created_at", { ascending: false })
    if(!error){
        setshow(true)
    }
}
return (
<>
<Sidebar/>
<div className="min-h-screen bg-gray-100 py-10 px-8 lg:pl-72">

  <div className="max-w-7xl mx-auto">

    {/* Header */}

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

      <div>

        <h1 className="text-4xl font-bold text-gray-800">
          User Management
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all registered users, block suspicious accounts and monitor activity.
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-md border  border-gray-200 px-10 py-5" style={{marginLeft:25+"%"}}>

        <p className="text-sm text-gray-500">
          Total Users
        </p>

        <h2 className="text-4xl font-bold text-indigo-600">
          {userArr.length}
        </h2>

      </div>
     
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-6 py-5">

        <p className="text-sm text-gray-500">
         blocked Users
        </p>

        <h2 className="text-4xl font-bold text-indigo-600">
           {userArr.reduce((count, v) => {
    return v.is_blocked=== true ? count + 1 : count;
  }, 0)}
        </h2>
{/* } */}
      </div>

    </div>

    {/* Users Table */}

    <div className="bg-red rounded-2xl shadow-md border border-gray-200 overflow-hidden ">
{/* bg-gradient-to-r */}
      {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-5 border-b border-gray-200 bg-black"> */}
        <div class="px-6 py-5 border-b bg-gradient-to-r from-gray-900 to-gray-800">

        <div >

          <h2 className="text-2xl font-bold text-white">
            Users List
          </h2>

          <p className="text-sm text-gray-500 mt-1 text-white">
            View and manage all registered users.
          </p>

        </div>

     
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr className="text-left text-xs uppercase tracking-wider text-gray-600">
                              <th className="px-6 py-4">
                Name
              </th>

              <th className="px-6 py-4">
                Email
              </th>

              <th className="px-6 py-4">
                Phone
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4 text-right">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {userArr.map((v,i)=>{

              return(

                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >

                  {/* Name */}

                  <td className="px-6 py-5">

                    <div>

                      <h2 className="font-semibold text-gray-800">
                        {v.name}
                      </h2>

                      <p className="text-xs text-gray-500 mt-1">
                        Registered User
                      </p>

                    </div>

                  </td>

                  {/* Email */}

                  <td className="px-6 py-5">

                    <span className="text-gray-600">
                      {v.email}
                    </span>

                  </td>

                  {/* Phone */}

                  <td className="px-6 py-5">

                    <span className="font-medium text-gray-700">
                      {v.phone}
                    </span>

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">

                    {v.is_blocked ? (

                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                        Blocked
                      </span>

                    ) : (

                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                        Active
                      </span>

                    )}

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-3">                      {v.is_blocked ? (

                        <button
                          onClick={()=>{
                            UnbUser(v.id)
                          }}
className="w-36 bg-black hover:bg-black-600 text-white py-2 rounded-xl font-medium transition"                        >
                          Unblock 
                        </button>

                      ) : (

                        <button
                          onClick={()=>{
                            blockUser(v.id)
                          }}
className="w-36 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium transition"
                        >
                          Block
                        </button>

                      )}

                    </div>

                  </td>

                </tr>

              )

            })}

          </tbody>

        </table>

        {userArr.length === 0 && (

          <div className="py-20 text-center">

            <div className="text-6xl">
              👥
            </div>

            <h2 className="text-2xl font-bold text-gray-700 mt-4">
              No Users Found
            </h2>

            <p className="text-gray-500 mt-2">
              There are no registered users available at the moment.
            </p>

          </div>

        )}

      </div>

    </div>

  </div>

</div>

</>
)
 }