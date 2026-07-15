"use client"
import { supabase } from "@/lib/sbConn"
// import { convertReusedFlightRouterStateToRouteTree } from "next/dist/client/components/segment-cache/cache"
import { useState,useEffect } from "react"
import { useRef } from "react"
import Image from "next/image";
import Sidebar from "@/components/sidebar";

export default function ProductData(){

  const [catArr,setcatArr]=useState([])
  const [protArr,setproArr]=useState([])
    const [inp1,setinp1]=useState("")
    const selRef=useRef(null)
    const inp1Ref=useRef(null)
    const inp2Ref=useRef(null)
    const inp3Ref=useRef(null)
    const inp4Ref=useRef(null)
    const inp5Ref=useRef(null)
    const [inp2,setinp2]=useState("")
    const [inp3,setinp3]=useState("")
    const [inp4,setinp4]=useState("")
    const [inp5,setinp5]=useState("")
    const [show,setshow]=useState(true)
    const [upd,setupd]=useState(false)
    const [prodId,setprodId]=useState("")
    const [imagefile,setimagefile]=useState("")
    const [imageurl,setimageurl]=useState("")

     useEffect(()=>{
    fetchCat()
      if(catArr.length==0){
setshow(false)
console.log("khali hay")
    }else{
        console.log("nh hay")
    }
    // setshow(false)
    },[])
    // console.log(catArr)

    async function fetchCat(){
    const {data,error}=await supabase.from("catogories").select("*")
    .order("created_at", { ascending: false })
    if(!error){
    setcatArr(data)
  
    
    }else{
        alert(error)
    }
    
    }
    // if(){

    // }
//        if(catArr.length==0){
// setshow(false)}
 async function addPro(imagefile) {
  console.log(imagefile)
  const fileName = `${Date.now()}_${imagefile.name}`  
  const {data,error}=await supabase.storage.from("pro").upload(fileName,imagefile)
  if(!error){
    console.log(data)
  }
  else{
    console.log(error)
  }
  const { data: publicUrlData } = supabase.storage
    .from("pro")
    .getPublicUrl(fileName);
// await  setimageurl()
  console.log(publicUrlData.publicUrl)
const {data1,error1}=await supabase.from("products").insert({
    prod_name:inp1,
    prod_price:inp3,
    prod_description:inp2,
    // category_id:,
    category_id:selRef.current.value,
    prod_url:publicUrlData.publicUrl,
    prod_stock:inp4,
})
console.log(data)
setshow(false)
        inp1Ref.current.value=""
  inp2Ref.current.value=""
  inp3Ref.current.value=""
  inp4Ref.current.value=""
  inp5Ref.current.value=""
}

async function fetchpro(){
const {data,error}=await supabase.from("products").select("*, catogories(*)")
.order("created_at", { ascending: false })
if(!error){
    console.log(data)
setproArr(data)
// console.log(data)
}
// e
// lse{
//     alert("wroing")
// }

}
useEffect(()=>{
fetchpro()
setshow(true)
},[show])



  async function delpro(id) {
    console.log(id)
const {data,error}=await supabase.from("products").delete().eq("id",id)
if(!error){
    setshow(false)
    console.log("ok")
}    
}


 function editCat(a,b,c,d,e,id){
  console.log(id)
    setupd(true)
  inp1Ref.current.value=a
  inp2Ref.current.value=b
  inp3Ref.current.value=c
  inp4Ref.current.value=d
  // inp5Ref.current.value=e
  setprodId(id)


  console.log(selRef.current)
    // console.log(inp1Ref.current)
  //    console.log(cat_id)
  //      setcatId(cat_id)

  setupd(true)

   }
   async function updpro(imagefile) {
      
 console.log(imagefile)
  const fileName = `${Date.now()}_${imagefile.name}`  
  const {data1,error1}=await supabase.storage.from("all").upload(fileName,imagefile)
  const { data: publicUrlData } = supabase.storage
    .from("all")
    .getPublicUrl(fileName);

  console.log(publicUrlData.publicUrl)
 const {data,error}=await supabase.from("products")
        .update({prod_name:inp1Ref.current.value,prod_description:inp3Ref.current.value,
          prod_price:inp3Ref.current.value,prod_stock:inp4Ref.current.value,prod_url:publicUrlData.publicUrl,}).eq("id",prodId)
        setupd(false)
// console.log(data)
setshow(false)
        inp1Ref.current.value=""
  inp2Ref.current.value=""
  inp3Ref.current.value=""
  inp4Ref.current.value=""
  inp5Ref.current.value=""
}
return (
<>
<Sidebar/>
<div className="min-h-screen bg-gray-100 pl-76 py-10 px-8">

  {/* Header */}
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

    <div>
      <h1 className="text-4xl font-bold text-gray-800">
        Product Management
      </h1>

      <p className="text-gray-500 mt-2">
        Add, update and manage all products from one place.
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-6 py-5">
      <p className="text-sm text-gray-500">
        Total Products
      </p>

      <h2 className="text-4xl font-bold text-green-600 mt-1">
        {protArr.length}
      </h2>
    </div>

  </div>

  {/* Form Card */}

  <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">

    <div className="flex items-center justify-between mb-6">

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          {upd ? "Update Product" : "Add New Product"}
        </h2>

        <p className="text-gray-500 mt-1">
          Fill the information below to manage your products.
        </p>
      </div>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

      <input
        type="text"
        ref={inp1Ref}
        placeholder="Product Name"
        onChange={(e)=>setinp1(e.target.value)}
        className="h-12 rounded-xl border border-gray-300 bg-white px-4 outline-none focus:ring-2 focus:ring-black transition"
      />

      <input
        type="text"
        ref={inp2Ref}
        placeholder="Product Description"
        onChange={(e)=>setinp2(e.target.value)}
        className="h-12 rounded-xl border border-gray-300 bg-white px-4 outline-none focus:ring-2 focus:ring-black transition"
      />

      <input
        type="number"
        ref={inp3Ref}
        placeholder="Product Price"
        onChange={(e)=>setinp3(e.target.value)}
        className="h-12 rounded-xl border border-gray-300 bg-white px-4 outline-none focus:ring-2 focus:ring-black transition"
      />
            <input
        type="number"
        ref={inp4Ref}
        placeholder="Available Stock"
        onChange={(e)=>setinp4(e.target.value)}
        className="h-12 rounded-xl border border-gray-300 bg-white px-4 outline-none focus:ring-2 focus:ring-black transition"
      />

      <select
        ref={selRef}
        className="h-12 rounded-xl border border-gray-300 bg-white px-4 outline-none focus:ring-2 focus:ring-black transition"
      >
        <option value="doesnt exist">
          Select Category
        </option>

        {catArr.map((v,i)=>{
          return(
            <option
              value={v.cat_id}
              key={i}
            >
              {v.cat_name}
            </option>
          )
        })}

      </select>

      <input
        type="file"
        ref={inp5Ref}
        onChange={(e)=>{
          setimagefile(e.target.files[0])
        }}
        className="h-12 rounded-xl border border-gray-300 bg-white px-3 py-2
        file:mr-4 file:px-4 file:py-2 file:border-0
        file:bg-black file:text-white file:rounded-lg
        hover:file:bg-gray-800 cursor-pointer"
      />

    </div>

    <div className="mt-8">

      {upd ? (

        <button
          onClick={()=>{
            updpro(imagefile)
          }}
          className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-medium transition"
        >
          Update Product
        </button>

      ) : (

        <button
          onClick={()=>{
            addPro(imagefile)
          }}
          className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-medium transition"
        >
          Add Product
        </button>

      )}

    </div>

  </div>

  {/* Products Table */}

  <div className="mt-8 bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b
            px-6 py-5 border-b bg-gradient-to-r from-gray-900 to-gray-800">

   

      <div >

        <h2 className="text-2xl font-bold text-gray-800 " style={{color:"white"}}>
          Products List
        </h2>

        <p className="text-gray-500 mt-1" style={{color:"white"}}>
          All products currently available in your store.
        </p>

      </div>

      {/* <div className="mt-4 md:mt-0">

        <input
          type="text"
          placeholder="🔍 Search products..."
          className="w-72 h-11 border border-gray-300 rounded-xl px-4 outline-none focus:ring-2 focus:ring-black"
        />

      </div> */}

    </div>

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr className="text-left text-xs uppercase tracking-wider text-gray-600">

            <th className="px-6 py-4">
              Image
            </th>

            <th className="px-6 py-4">
              Product
            </th>

            <th className="px-6 py-4">
              Category
            </th>

            <th className="px-6 py-4">
              Price
            </th>

            <th className="px-6 py-4">
              Stock
            </th>
                        <th className="px-6 py-4">
              Description
            </th>

            <th className="px-6 py-4 text-right">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {protArr.map((v,i)=>{

            return(

              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >

                {/* Image */}

                <td className="px-6 py-5">

                  <Image
                    src={v.prod_url}
                    width={65}
                    height={65}
                    alt="product"
                    className="rounded-xl border border-gray-200 object-cover"
                  />

                </td>

                {/* Product */}

                <td className="px-6 py-5">

                  <h2 className="font-semibold text-gray-800">
                    {v.prod_name}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Premium Quality Product
                  </p>

                </td>

                {/* Category */}

                <td className="px-6 py-5">

                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">

                    {v.catogories.cat_name}

                  </span>

                </td>

                {/* Price */}

                <td className="px-6 py-5">

                  <span className="text-lg font-bold text-green-600">
                    Rs. {v.prod_price}
                  </span>

                </td>

                {/* Stock */}

                <td className="px-6 py-5">

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">

                    {v.prod_stock} In Stock

                  </span>

                </td>

                {/* Description */}

                <td className="px-6 py-5 max-w-xs">

                  <p className="truncate text-gray-500">

                    {v.prod_description}

                  </p>

                </td>

                {/* Actions */}

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-3">

                    <button
                      onClick={()=>{
                        editCat(
                          v.prod_name,
                          v.prod_description,
                          v.prod_price,
                          v.prod_stock,
                          v.prod_url,
                          v.id
                        )
                      }}
                      className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-xl transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={()=>{
                        delpro(v.id)
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
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

      {protArr.length === 0 && (
        <div className="py-20 text-center">

          <div className="text-6xl mb-4">📦</div>

          <h2 className="text-2xl font-bold text-gray-700">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Start by adding your first product.
          </p>

        </div>
      )}

    </div>
  </div>

</div>
</>
);

}