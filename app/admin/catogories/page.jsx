"use client"
import { supabase } from "@/lib/sbConn"
import { useEffect, useState } from "react"
import { useRef } from "react"
import Image from "next/image";
import Sidebar from "@/components/sidebar";

export default function Catogoriesdata(){
    const [catArr,setcatArr]=useState([])
    const [inp1,setinp1]=useState("")
    const [inp3,setinp3]=useState("")
    const inp1Ref=useRef(null)
    const inp2Ref=useRef(null)
    const inp3Ref=useRef(null)
    const [inp2,setinp2]=useState("")
    const [show,setshow]=useState(false)
    const [upd,setupd]=useState(false)
    const [catId,setcatId]=useState("")
    const [imageurl,setimageurl]=useState("")


  const addCat=async(imagefile)=> {
 console.log(imagefile)
  const fileName = `${Date.now()}_${imagefile.name}`  
  const {data,error}=await supabase.storage.from("cat").upload(fileName,imagefile).catch()
  if(!error){
    console.log(data)

  }else{
    console.log(error.message)
  }
  
  const { data: publicUrlData } = supabase.storage
    .from("cat")
    .getPublicUrl(fileName);
// await  setimageurl()
  console.log(publicUrlData.publicUrl)

    const {data1,error1}=await supabase.from("catogories").insert({
    cat_name:inp1,
    cat_des:inp3,
    cat_url:publicUrlData.publicUrl
}).select()
if(!error){
    console.log(data1)
setshow(true)}  
  inp1Ref.current.value=""
  inp2Ref.current.value=""  
  inp3Ref.current.value=""  
   } 
   async function delCat(id) {
    console.log(id)
 
    
const {data,error}=await supabase.from("catogories").delete().eq("cat_id",id)
if(!error){
    setshow(true)
}    
   } 
   function editCat(cat_name,cat_des,cat_id){
    // console.log(inp1Ref.current)
     console.log(cat_des)
       setcatId(cat_id)
  inp1Ref.current.value=cat_name
  // inp2Ref.current.value=cat_url
  inp3Ref.current.value=cat_des
  setupd(true)

   }
async function updCat(imagefile) {
        // console.log(setinp3)
         console.log(imagefile)
  const fileName = `${Date.now()}_${imagefile.name}`  
  const {dataq,errorq}=await supabase.storage.from("cat").upload(fileName,imagefile)
  const { data: publicUrlData } = supabase.storage
    .from("cat")
    .getPublicUrl(fileName);
// await  setimageurl()
  console.log(publicUrlData.publicUrl)

     console.log(inp1Ref.current.value)
        const {data,error}=await supabase.from("catogories")
        .update({cat_name:inp1Ref.current.value,cat_url:publicUrlData.publicUrl,cat_des:inp3Ref.current.value,}).eq("cat_id",catId)
        setupd(false)
          inp1Ref.current.value=""
  inp2Ref.current.value=""
  inp3Ref.current.value=""

        setshow(true)

}
 
async function fetchCat(){
const {data,error}=await supabase.from("catogories").select("*")
.order("created_at", { ascending: false })
if(!error){
setcatArr(data)
console.log(data)
}else{
    alert(error)
}

}
useEffect(()=>{
fetchCat()
setshow(false)
console.log(catArr)
},[show])
 
return (

  <>
  <Sidebar/>
    <div className="min-h-screen bg-gray-100 py-10 px-8 lg:pl-72">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Category Management
            </h1>

            <p className="text-gray-500 mt-2">
              Create, update and organize product categories for your store.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-6 py-5">

            <p className="text-sm text-gray-500">
              Total Categories
            </p>

            <h2 className="text-4xl font-bold text-blue-600">
              {catArr.length}
            </h2>

          </div>

        </div>

        <div className="space-y-8">

          {/* Form */}

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">

            <h2 className="text-3xl font-bold text-gray-800">
              {upd ? "Update Category" : "Add New Category"}
            </h2>

            <p className="text-gray-500 mt-2 mb-7">
              Fill in the details below to organize your store categories.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <input
                type="text"
                ref={inp1Ref}
                placeholder="Category Name"
                onChange={(e)=>setinp1(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

              {/* <input
//                 type="text"
//                 ref={inp3Ref}
//                 placeholder="Category Description"          
//                   className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
// /> */}
                              <input
                type="text"
                ref={inp3Ref}
                placeholder="Category Description"
                onChange={(e)=>setinp3(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

              <input
                type="file"
                ref={inp2Ref}
                onChange={(e)=>{
                  setinp2(e.target.files[0]);
                  console.log(e.target.files[0]);
                }}
                className="border border-gray-300 rounded-xl px-3 py-2 file:mr-3 file:px-4 file:py-2 file:border-0 file:rounded-lg file:bg-black file:text-white hover:file:bg-gray-800"
              />

            </div>

            <div className="mt-7">

              {upd ? (

                <button
                  onClick={()=>updCat(inp2)}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                  Update Category
                </button>

              ) : (

                <button
                  onClick={()=>addCat(inp2)}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                  Add Category
                </button>

              )}

            </div>

          </div>

          {/* Table Card */}

          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-5 border-b border-gray-200 px-6 py-5 border-b bg-gradient-to-r from-gray-900 to-gray-800">

              <div >

                <h2 className="text-2xl font-bold text-gray-800 text-white">
                  Categories List
                </h2>

                <p className="text-sm text-gray-500 mt-1 text-white">
                  Manage all available product categories.
                </p>

              </div>

            

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-sm text-left border-collapse">

                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">                  <tr>

                    <th className="px-6 py-4">
                      Category
                    </th>

                    <th className="px-6 py-4">
                      Description
                    </th>

                    <th className="px-6 py-4">
                      Image
                    </th>

                    <th className="px-6 py-4 text-right">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {catArr.map((v,i)=>{

                    return(

                      <tr
                        key={i}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >

                        {/* Category */}

                        <td className="px-6 py-5">

                          <div>

                            <h2 className="font-semibold text-gray-800">
                              {v.cat_name}
                            </h2>

                            <p className="text-xs text-gray-500 mt-1">
                              Product Category
                            </p>

                          </div>

                        </td>

                        {/* Description */}

                        <td className="px-6 py-5 max-w-xs">

                          <p className="truncate text-gray-500">
                            {v.cat_des}
                          </p>

                        </td>

                        {/* Image */}

                        <td className="px-6 py-5">

                          <Image
                            src={v.cat_url}
                            width={60}
                            height={60}
                            alt="category"
                            className="rounded-xl border border-gray-200 object-cover shadow-sm"
                          />

                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5">

                          <div className="flex justify-end gap-3">                            <button
                              onClick={()=>{
                                editCat(
                                  v.cat_name,
                                  v.cat_des,
                                  v.cat_id
                                );
                              }}
                              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm transition"
                            >
                              Edit
                            </button>

                            <button
                              onClick={()=>{
                                delCat(v.cat_id);
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm transition"
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    )

                  })}

                </tbody>

              </table>

              {catArr.length === 0 && (

                <div className="py-20 text-center">

                  <div className="text-6xl">
                    📂
                  </div>

                  <h2 className="text-2xl font-bold text-gray-700 mt-4">
                    No Categories Found
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Start by creating your first category.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  </>
)
// </thead>
}