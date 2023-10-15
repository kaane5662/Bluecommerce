import { faL } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useState } from "react"


export default function OwnedItem({productId,productName, productCost, productImage, productType, setCheck, index, quantity, order_date}){

    return (
        <div className=" shadow-md p-4   flex items-center justify-between  ">
            <div className=" justify-center flex gap-8   items-center">
                <img className="w-[150px] h-auto" src={productImage}></img>
                <div className=" flex flex-col gap-6">
                    <h3 className="font-bold text-lg">{productName}</h3>
                    <h3 className="text-sm font-medium">Ordered {order_date}</h3>
                    <h3 className="font-semibold text-theme-2 text-opacity-80    ">{productType}</h3>

                </div>
                

            </div>        
            <h3 className="font-bold text-lg">{quantity}</h3>  
            <h3 className="font-bold text-lg  flex">${productCost}</h3>

         </div>
    )
}