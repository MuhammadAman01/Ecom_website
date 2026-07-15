"use client"
import { supabase } from "@/lib/sbConn"
import { useState, useEffect } from "react"
import Image from "next/image";
import Link from "next/link"


export default function ProductData(){
  const [protArr, setproArr] = useState([])

  async function fetchpro(){
    const {data, error} = await supabase.from("products").select("*, catogories(*)")
      .order("created_at", { ascending: false })
    if(!error){
      setproArr(data)
    }
  }

  useEffect(()=>{
    fetchpro()
  },[])

  return (
  <div className="min-h-screen bg-gray-100 py-10 px-5">
    <div className="max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">

        {protArr.map((v, i) => {
          return (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col"
            >

              {/* Product Image */}
              <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                <Image
                  src={v.prod_url}
                  alt="product"
                  fill
                  className="object-contain p-5 group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-1">

                <h2 className="text-lg font-bold text-gray-800 truncate">
                  {v.prod_name}
                </h2>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {v.prod_description}
                </p>

                <div className="mt-4 flex justify-between items-center">

                  <span className="text-2xl font-bold text-green-600">
                    Rs. {v.prod_price}
                  </span>

                  <span className="text-sm text-gray-500">
                    Stock: {v.prod_stock}
                  </span>

                </div>

                <button className="mt-6 w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition">
                  <Link href={`/products/${v.id}`}>
                    More Details
                  </Link>
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  </div>
);
}