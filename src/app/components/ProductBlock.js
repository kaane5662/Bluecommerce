import {Router} from "next/navigation"
import { useRouter } from "next/navigation"

export default function ProductBlock({productName, productCost, productImage, productType, productId}){
    const router = useRouter()
    return (
        <div onKeyDown={()=> router.push(`/product/${productId}`)   } onClick={()=> router.push(`/product/${productId}`) } className="hover:cursor-pointer hover:shadow-2xl duration-500 shadow-lg w-[250px] h-auto rounded-md shadow-8 hover:scale-110">
                    <div className="flex justify-center pt-5">
                        <img className="w-auto h-[200px] object-scale-down px-4" src = {productImage}></img>
                    </div>
                    <div className=" flex flex-col px-4 py-4 gap-2">
                        <h1 className="productName text-theme-1 font-bold text-2xl">{productName}</h1>
                        <p className="text-bold text-theme-1  font-semibold">{productType}</p>
                        <h1 className="productName text-theme-1 font-bold text-2xl">${productCost}</h1>
                    </div>
                    
                    
        </div>
    )
}