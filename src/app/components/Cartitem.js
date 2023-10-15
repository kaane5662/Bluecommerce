import { faL } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useState } from "react"


export default function CartItem({productId,productName, productCost, productImage, productType, setCheck, index, quantity}){

    const [originalAmount, setOriginalAmount] = useState(quantity)
    const [amount, setAmount] = useState(quantity)
    const [active, setActive] = useState(false)
    const updateQuanitity = async()=>{
        console.log(productId)
        const change = amount-originalAmount
        console.log(change)

        axios.put(`/api/cart/${productId}`, {quantity: change}).then((response)=>{
            console.log(response.data.message)
            window.location.reload()
        }).catch((error)=>{
            console.log(error.message)
        })
    }


    const updateAmount = async(dir)=>{
        const editedAmount = amount + dir
        if(editedAmount == originalAmount){
            setActive(false)
        }else{
            setActive(true)
        }

        if(editedAmount< 0) return setAmount(0)
        setAmount(editedAmount)
    }

    return (
        <div className=" shadow-md p-4   flex items-center justify-between  ">
            <input className="border-theme-1 w-6 h-6  checked:bg-theme-2   " type= "checkbox" onClick={()=>setCheck(index)} ></input>
            <img className="w-[150px] h-auto" src={productImage}></img>
            <div className="product mx-4 my-2 ">
                <h3 className="font-bold text-lg">{productName}</h3>
                <p className="type text-md ">{productType}</p>
            </div>
            <div className="flex items-center    gap-4">
                <button onClick={()=> updateAmount(-1)} className="text-2xl font-bold hover:bg-theme-2 hover:text-theme-0 w-10 h-10 duration-300 rounded-sm">-</button>
                <h3 className="font-bold text-lg">{amount  }</h3>
                <button onClick={()=> updateAmount(1)} className="text-2xl font-bold hover:bg-theme-2 hover:text-theme-0 w-10 h-10 duration-300 rounded-sm">+</button>
                <button disabled = {!active} className={active ? " text-sm font-bold text-theme-2 hover:underline": " text-sm text-theme-2 text-opacity-30"} onClick={()=> updateQuanitity()}>Save</button>

            </div>
            
            <h3 className="font-bold text-lg  flex">${productCost *amount}</h3>

         </div>
    )
}