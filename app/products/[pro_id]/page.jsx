"use client";

import { supabase } from "@/lib/sbConn";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
// import Link from "next/link";
import { useRouter } from "next/navigation";
export default function ProductData() {
  const [product, setProduct] = useState(null);
  const { pro_id } = useParams();
  const router=useRouter()

  useEffect(() => {
    if (pro_id) {
      fetchProduct();
    }
  }, [pro_id]);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*, catogories(*)")
      .eq("id", pro_id)
      .single();

    if (error) {
      console.log(error);
    } else {
      setProduct(data);
      console.log(data);
    }
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white">
        Loading...
      </div>
    );
  }


 const addCart=async ()=>{
const { data  } = await supabase.auth.getUser();
 
console.log(data.user.id);
console.log(product.id);

const {dataa,error}=await supabase.from("cart").insert({
user_id:data.user.id,
pro_id:product.id,
quantity:1
})
if(!error){
console.log("successfull")
router.push('/cart')

}else{
console.log(error)

}
}


return (
  <div className="min-h-screen bg-gray-100 py-10 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Product Image */}
        <div className="bg-gray-50 flex items-center justify-center p-8">
          <div className="relative w-full h-[450px]">
            <Image
              src={product.prod_url}
              alt={product.prod_name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="p-8 flex flex-col justify-between">

          <div>

            <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {product.catogories?.cat_name}
            </span>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.prod_name}
            </h1>

            <p className="text-gray-600 leading-7 mb-6">
              {product.prod_description}
            </p>

            <div className="border-t border-b py-5 space-y-4">

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  Category
                </span>

                <span className="text-gray-600">
                  {product.catogories?.cat_name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  Category Description
                </span>

                <span className="text-gray-600 text-right">
                  {product.catogories?.cat_des}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  Stock
                </span>

                <span className="text-green-600 font-semibold">
                  {product.prod_stock}
                </span>
              </div>

            </div>

            <div className="mt-8">
              <h2 className="text-4xl font-bold text-green-600">
                Rs. {product.prod_price}
              </h2>
            </div>

          </div>

          <button
            onClick={() => {
              addCart();
            }}
            className="mt-10 w-full bg-black hover:bg-gray-800 text-white py-4 rounded-xl text-lg font-semibold transition duration-300"
          >
            Add To Cart
          </button>

        </div>

      </div>
    </div>
  </div>
);
}