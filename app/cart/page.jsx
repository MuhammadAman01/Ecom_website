
"use client"
import { supabase } from "@/lib/sbConn"
import { FiMinus, FiPlus } from "react-icons/fi";
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
export default function Cart(){
const [cartArr,setcartArr]=useState([])
 const [show,setshow]=useState("false")
//  const [buy,setbuy]=useState("false")
const btnref=useRef("button")


async function fetchCart() {
const { data } = await supabase.auth.getUser();
console.log(data.user.id);
    const {data:det,error}=await supabase.from("cart").select("*,products(*)").eq("user_id",data.user.id) 
     .order("created_at", { ascending: false })
    // console.log(data1)
    if(!error){
        console.log(det)
setcartArr(det)
    }else{
        console.log(error.message)
    }
}
const increaseQuantity = async (id, quantity) => {
    console.log(id,quantity)
  const { error } = await supabase
    .from("cart")
    .update({ quantity: quantity + 1 })
    .eq("id", id);

  if (!error) {
  setshow(true); // cart dobara fetch kar lo
  }
};
const decreaseQuantity = async (id, quantity) => {
  if (quantity <= 1) return;

  const { error } = await supabase
    .from("cart")
    .update({ quantity: quantity - 1 })
    .eq("id", id);

  if (!error) {
    setshow(true); // cart dobara fetch kar lo
  }
};
useEffect(()=>{
    fetchCart()
    setshow(false)
},[show])
console.log(cartArr)


const addOrder=async(price,quantity,id,p_id,i,e)=>{
  e.target.innerText="Ordered"
  e.target.innerText="Ordered"
  console.log(e.target.innerText="ordered")
const {data,error}= await supabase.from("orders").insert({
  user_id:id,
  prod_id:p_id,
  quantity:quantity,
  total_amount:quantity*price,


})


}


  return (
  <div className="min-h-screen bg-gray-100 py-10">
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="space-y-5">
        {cartArr.map((v, i) => {
          return (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col md:flex-row items-center gap-6"
            >
              {/* Product Image */}
              <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={v.products.prod_url}
                  width={120}
                  height={120}
                  alt={v.products.prod_name}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-semibold text-gray-800">
                  {v.products.prod_name}
                </h2>

                <p className="text-green-600 text-lg font-bold mt-2">
                  Rs. {v.products.prod_price}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Premium Quality Product
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 border rounded-lg px-3 py-2">
                <button
                  onClick={() => {
                    decreaseQuantity(v.id, v.quantity);
                  }}
                  className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                >
                  <FiMinus />
                </button>

                <span className="text-lg font-semibold w-8 text-center">
                  {v.quantity}
                </span>

                <button
                  onClick={() => {
                    increaseQuantity(v.id, v.quantity);
                  }}
                  className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                >
                  <FiPlus />
                </button>
              </div>

              {/* Total */}
              <div className="text-center">
                <p className="text-gray-500 text-sm">Total</p>
                <h2 className="text-xl font-bold text-green-600">
                  Rs. {v.products.prod_price * v.quantity}
                </h2>
              </div>

              {/* Buy Button */}
              <button id={`btn-${i}`}   onClick={(e)=>{
                addOrder(v.products.prod_price,v.quantity,v.user_id,v.products.id,i,e)
            console.log(e.target.innerText)
               }} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium">
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

    

} 