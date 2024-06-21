"use client"
import { useRouter } from "next/navigation"

export default function SearchBlock({productName, productId, productImage}){
    const router = useRouter()
    return (
        <div className="w-[350px] p-4 h-auto flex flex-row shadow-inner rounded-sm mx-12 hover:scale-110  gap-4 justify-around bg-white-0 duration-500 hover:shadow-2xl hover:cursor-pointer"  onClick={()=> router.push(`/product/${productId}`)}>
            <p className=" text-md font-semibold">{productName}</p>
            <img src = {productImage} className=" h-[30px] w-[auto] rounded-sm"></img>
        </div>
    )
}