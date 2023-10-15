"use client"
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import OwnedItem from "../components/OwnedItem";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


export default function Cart(){

    const [cartItemsData, setCartItemsData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const router = useRouter()

    const getOwnedCartItems =async ()=>{
        axios.get("/api/checkout").then((response)=>{
            console.log(response.data.ItemsData)
            setIsLoaded(true)
            setCartItemsData(response.data.ItemsData.reverse())
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
       getOwnedCartItems()
    }, [])


    return (
        <main>
            <Navbar></Navbar>
            
            
            <div className=" p-16 flex gap-32 justify-center">
                {/* cart */}
                <div className="w-[50%] flex flex-col ">
                    <div className="top flex justify-between    ">
                        <h1 className="text-theme-1 text-4xl font-bold py-2 px-4 border-b-4 border-b-theme-2">Purchased Items</h1>
                        
                        
                    </div>
                    {/* products */}
                    <div className="flex justify-between pt-14 pb-4 gap-32 px-6">
                        <h2 className="text-lg text-theme-1 text-right font-semibold opacity-40">Product</h2>
                        <span></span>
                        <h2 className="text-lg text-theme-1 text-right font-semibold opacity-40">Quanitity</h2>
                       
                        <h2 className="text-lg text-theme-1 text-right font-semibold opacity-40">Price  </h2>
                        
                    </div>
                    <hr className="  bg-theme-1 opacity-30  "></hr>
                    
                    {!isLoaded ? (
                        (<div className="p-56 justify-center flex">
                        <FontAwesomeIcon className="text-4xl text-theme-2" icon={faCircleNotch} spin spinReverse />
                    </div>)
                    ):
                    
                    cartItemsData.map((cartItem, index)=>{
                        return (
                            <OwnedItem productCost={cartItem.product.productCost*cartItem.quantity} productName={cartItem.product.productName} productImage={cartItem.product.productImage} productType = {cartItem.product.productType} index = {index} key = {index} order_date = {cartItem.order_date}  productId={cartItem.product.productId} quantity={cartItem.quantity}></OwnedItem>
                        )
                    })}
                    
                    
                </div>
                
            </div>
            
        </main>
    )
}