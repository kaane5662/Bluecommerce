"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Stripe from "stripe"
const stripe = Stripe(process.env.STRIPE_KEY)

export default function ProductContainer({Product}){
    // const [productId, setProductId] = useState(productId)
    const [amount, setAmount] = useState(0)
    
    const router = useRouter()
    
    const addToCart = async () => {
        axios.post("/api/cart", {productId:Product.productId, amount}).then((response)=>{
            
            console.log(response.data)
            router.push("/cart")
        }).catch((error)=>{
               console.log(error.response.data.message)         
        })
    }

    const buyProductNow = async() => {
        // console.log(params.id)
        axios.post(`/api/checkout/${Product.productId}`, {quantity: amount}).then(async(response)=>{
            // await stripe.confirmCardPayment(response.data.client_secret,{})

            console.log(response.data.client_secret)
            router.push(`/checkout/${response.data.client_secret}`)
            // window.location.href = response.data.url
        }).catch((error)=>{
            console.log(error)
        })
    }

    const updateAmount = async (count) => {
        if(count == -1){
            return setAmount(Math.max(0,amount+count))
        }else{
            return setAmount(Math.min(5,amount+count))
        }
    }

    return(
        <div className="flex justify-center px-52 py-12 gap-14 font-ubuntu">
                <img className="h-[550px] w-[40%] bg-theme-1 bg-opacity-5 rounded-md object-scale-down p-4" src={Product.productImage}></img>    
                <div className="details relative text-theme-1 flex flex-col gap-5">
                    <h1 className="title text-theme-1 text-6xl font-bold">{Product.productName}</h1>
                    <h2 className="type text-theme-1 text-xl font-semibold">{Product.productType}</h2>
                    <p>{Product.productDesc}</p>
                    <div className=" absolute bottom-0 flex flex-col-reverse gap-2   ">
                        <div className="flex flex-row gap-8">
                            <button onClick={buyProductNow} className="bg-theme-2 text-theme-0 border-solid border-2 shadow-md hover:-translate-y-1 duration-300 font-bold h-16 w-44 rounded-md">Buy Now    </button>
                            <button onClick={addToCart} className="border-theme-2 text-theme-2 border-solid border-2 shadow-md  font-bold h-16 w-44 rounded-md hover:scale-105 duration-300">Add to Cart <FontAwesomeIcon className="w-auto h-[20px] text-theme-2" icon = {faShoppingCart}></FontAwesomeIcon></button>

                        </div>
                        <div className="flex gap-5 items-center ">
                            <button onClick = {()=> updateAmount(-1)} className=" w-12 h-12 text-2xl   text-theme-2 hover:bg-theme-2 hover:text-theme-0 rounded-sm duration-300">-</button>
                            <h1 className="text-2xl font-bold">{amount}</h1>
                            <button onClick={()=> updateAmount(1)} className=" w-12 h-12 text-2xl  text-theme-2 hover:bg-theme-2 hover:text-theme-0 rounded-sm duration-300">+</button>
                        </div>
                        <h1 className="text-lg font-bold -my-2">Quantity</h1>
                        <h1 className="productName text-theme-1 font-bold text-4xl  ">$ {Product.productCost}</h1>
                    </div>
                    
                </div>

        </div>
    )
}