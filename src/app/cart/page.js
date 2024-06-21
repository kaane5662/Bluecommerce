"use client"
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCircleNotch, faL } from "@fortawesome/free-solid-svg-icons";
import CartItem from "../components/Cartitem";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Cart(){
    const [cartItemsData, setCartItemsData] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const router = useRouter()

    const getCartItems = () => {
        
        axios.get("/api/cart").then((response)=>{
            setIsLoaded(true)
            console.log(response.data)
            const cartItems = response.data.cartItemsData
            setCartItemsData(cartItems)
            let cost = 0
            cartItems.forEach( (cartItem) => {
                let itemCost = cartItem.product.productCost
                itemCost *= cartItem.quantity
                cost += itemCost

            });
            
            setTotalCost(cost)
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    const deleteCartItems = ()=>{

        const productIds = []
        cartItemsData.forEach((cartItem) => {
            if(cartItem.remove) productIds.push(cartItem.product.productId)
        });
        console.log(productIds)
        axios.put("/api/cart", {productData: productIds}).then((response)=>{
            console.log(response.data)
            window.location.reload(window.location.pathname)
            
            
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    const setCartItem = (index)=>{
        cartItemsData[index].remove = !cartItemsData[index].remove
        console.log(cartItemsData[index].remove)
    }

    const checkout = () =>{
        console.log("Checking out   ")
        axios.post("/api/checkout").then((response)=>{
            window.location.replace(response.data.url)
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getCartItems()
    }, [])



    return (
        <main>
            <Navbar></Navbar>
            <div className=" p-16 flex gap-32 justify-center font-mono">
                {/* cart */}
                <div className="w-[50%] flex flex-col ">
                    <div className="top flex justify-between    ">
                        <h1 className="text-theme-1 text-4xl font-bold border-b-4 border-b-theme-2 px-4 py-2">Cart</h1>
                        <div className="flex flex-row items-center">
                            <h2 onClick={()=> deleteCartItems()} className=" hover:underline hover:decoration-solid hover:cursor-pointer text-md text-theme-1 text-right font-semibold    -my-6       ">Remove</h2>
                            <FontAwesomeIcon icon = {faTrashCan} className=" text-theme-2 first-letter:text-right mx-2 "></FontAwesomeIcon> 
                        </div>
                        
                    </div>
                    {/* products */}
                    <div className="flex justify-between pt-14 pb-4 gap-32 px-6">
                        <h2 className="text-lg text-theme-1 text-right font-semibold opacity-40">Product</h2>
                        <h2 className="text-lg text-theme-1 text-right font-semibold opacity-40"></h2>
                        <h2 className="text-lg text-theme-1 text-right font-semibold opacity-40">Quanitity</h2>
                       
                        <h2 className="text-lg text-theme-1 text-right font-semibold opacity-40">Price  </h2>
                        
                    </div>
                    <hr className="  bg-theme-1 opacity-30  "></hr>
                    
                    {
                     !isLoaded ?
                    (
                    <div className="p-56 justify-center flex">
                        <FontAwesomeIcon className="text-4xl text-theme-2" icon={faCircleNotch} spin spinReverse />
                    </div>
                    ):
                    cartItemsData.map((cartItem, index)=>{
                        return (
                            <CartItem productCost={cartItem.product.productCost} productName={cartItem.product.productName} productImage={cartItem.product.productImage} productType = {cartItem.product.productType} index = {index} key = {index} setCheck={setCartItem} productId={cartItem.product.productId} quantity={cartItem.quantity}></CartItem>
                        )
                    })
                    }
                    
                    
                </div>
                <div className="w-[30%] shadow-md flex flex-col p-8 gap-4   h-min">
                    <div className="flex justify-between">
                        <h3 className="font-semibold text-lg opacity-40">Subtotal</h3>
                        <h3 className="font-bold text-lg justify-center">${isLoaded ? totalCost : <FontAwesomeIcon spin spinReverse className="w-5 text-theme-1" icon={faCircleNotch}></FontAwesomeIcon> }</h3>
                    </div>
                    <div className="flex justify-between">
                        <h3 className="font-semibold text-lg opacity-40">Discount</h3>
                        <h3 className="font-bold text-lg">$0</h3>
                    </div>
                    <hr className="bg-theme-1 opacity-30"  ></hr>
                    <div className="flex justify-between">
                        <h3 className="font-semibold text-lg opacity-40">Grand Total</h3>
                        <h3 className="font-bold text-lg">${isLoaded ? totalCost : <FontAwesomeIcon spin spinReverse className="w-5 text-theme-1" icon={faCircleNotch}></FontAwesomeIcon> }</h3>
                    </div>
                    <button onClick={()=> isLoaded ?  checkout(): null} className="bg-theme-2 text-theme-0 rounded-md w-[100%] text-lg font-bold  hover:-translate-y-1 duration-300   h-[50px]">{isLoaded ? "Check out": <FontAwesomeIcon spin spinReverse className="w-5 text-theme-0" icon={faCircleNotch}></FontAwesomeIcon> }</button>
                </div>
                
            </div>
        </main>
    )
}