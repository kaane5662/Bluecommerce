"use client"
import Navbar from "../../components/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Product({params}){


    const [productData, setProductData] = useState({
        productDesc: "",
        productName: "",
        productCost: 0,
        productImage: "",
        productType: ""
    })
    const [productId, setProductId] = useState("")
    const [amount, setAmount] = useState(0)
    const router = useRouter()
    const getProductData = async () => {
        console.log(params.id)
        axios.get(`/api/product/${params.id}`).then((response)=>{
            console.log(response.data.product)
            const {productCost, productDesc, productImage, productName, productId, productType} = response.data.product
            setProductData(
                {productCost, productDesc, productImage, productName, productType} 
            )
            setProductId(productId)
        }).catch((error)=>{
            console.log(error.message)
        })
    }


    const addToCart = async () => {
        axios.post("/api/cart", {productId, amount}).then((response)=>{
            console.log(response.data)
            router.push("/cart")
        }).catch((error)=>{
               console.log(error.response.data.message)         
        })
    }

    const buyProductNow = async() => {
        console.log(params.id)
        axios.post(`/api/checkout/${params.id}`, {quantity: amount}).then((response)=>{
            console.log(response.data.url)
            window.location.replace(response.data.url)
        }).catch((error)=>{
            console.log(error)
        })
    }

    const updateAmount = async (count) => {
        const tempAmount = amount + count
        // if(tempAmount > 3) return setAmount(3)
        if(tempAmount < 0) return setAmount(0)
        setAmount(tempAmount )
    }

    useEffect(()=>{
        getProductData()
    }, [])


    return (
        <main className="bg-white-0">
            <Navbar></Navbar>
            
            {
                productData.productDesc == "" ?
            
            (
                <div className="flex justify-center items-center p-64">
                    <h1 className="text-4xl animate-bounce text-theme-2 font-bold">Loading...</h1>
                </div>
            )
            :
            (<div className="flex justify-center px-52 py-12 gap-14">
                <img className="h-[550px] min-w-[550px] shadow-lg rounded-md object-scale-down p-4" src={productData.productImage}></img>    
                <div className="details relative text-theme-1 flex flex-col gap-5">
                    <h1 className="title text-theme-1 text-6xl font-bold">{productData.productName}</h1>
                    <h2 className="type text-theme-1 text-xl font-semibold">{productData.productType}</h2>
                    <p>{productData.productDesc}</p>
                    <div className=" absolute bottom-0 flex flex-col-reverse gap-2   ">
                        <div className="flex flex-row gap-8">
                            <button onClick={()=> buyProductNow()} className="bg-theme-2 text-theme-0 border-solid border-2 shadow-md hover:-translate-y-1 duration-300 font-bold h-16 w-44 rounded-full">Buy Now    </button>
                            <button onClick={()=> addToCart()} className="border-theme-2 text-theme-2 border-solid border-2 shadow-md hover:animate-bounce font-bold h-16 w-44 rounded-full">Add to Cart <FontAwesomeIcon className="w-auto h-[20px] text-theme-2" icon = {faShoppingCart}></FontAwesomeIcon></button>

                        </div>
                        <div className="flex gap-5 items-center ">
                            <button onClick = {()=> updateAmount(-1)} className=" w-12 h-12 text-2xl   text-theme-2 hover:bg-theme-2 hover:text-theme-0 rounded-sm duration-300">-</button>
                            <h1 className="text-2xl font-bold">{amount}</h1>
                            <button onClick={()=> updateAmount(1)} className=" w-12 h-12 text-2xl  text-theme-2 hover:bg-theme-2 hover:text-theme-0 rounded-sm duration-300">+</button>
                        </div>
                        <h1 className="text-lg font-bold -my-2">Quantity</h1>
                        <h1 className="productName text-theme-1 font-bold text-4xl  ">$ {productData.productCost}</h1>
                    </div>
                    
                </div>

            </div>)
            }
            
        </main>
    )
}