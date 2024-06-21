"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {useRouter} from "next/navigation"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
export default function Deal(){
    const router = useRouter()
    const [isLoaded, setIsLoaded] = useState(false)
    const [DealData, setDealData] = useState({
        productName: null,
        productId: null,
        productDesc: null,
        productImage: null,
        productCost: null
    })


    const getDealProduct = async ()=>{
        axios.get("/api/products/deal").then((response)=>{
            console.log(response.data.DealProduct)
            setIsLoaded(true)
            const {productName, productId, productDesc, productCost, productImage} = response.data.DealProduct[0]
            setDealData({...DealData,
                productName,
                productId,
                productDesc,
                productImage,
                productCost 
            })
        }).catch((error)=>{
            console.log(error.message)
            
        })
    }
  
    useEffect(()=>{
        getDealProduct()
    },[])

    return (
        <main>
        {
        !isLoaded ?
        (
        <div className="bg-theme-1 p-12 flex justify-center items-center min-w-[100%] min-h-[60%] h-screen ">
            <FontAwesomeIcon icon={faCircleNotch} className="text-theme-0 text-6xl  " spin />
        </div>
        )
        :

        (<div className="  bg-theme-1 h-screen overflow-hidden max-w-screen font-outfit ">
            <motion.div className="justify-center flex min-w-[100%] min-h[30%] gap-32 items-center"
            initial={{
                opacity: 0,
                hidden: "true",
                x: "100%"
            }}
            whileInView={{
                x: 0,
                y: 0,   
                rotate: 0,
                opacity: 1
            }}
            transition={{
                duration: 2,
                type:"spring",
                damping: 10,
                stiffness: 20,
            }}
            viewport={{ once: true }} 
            >
                <div className="featured flex flex-col gap-8 pl-60 py-20">
                    {/* title and description */}
                    <h1 className="title text-theme-0 text-6xl font-bold inline border-b-4 py-4 border-b-theme-2">{DealData.productName}</h1>
                    <p className="text-theme-0 text-lg">{DealData.productDesc}</p>
                    {/* buttons */}
                    <div className="flex gap-12 items-center">
                        <button onClick={()=> router.push(`/product/${DealData.productId}`)} className="border-theme-2 border-2 h-14  w-48 text-theme-0 font-bold rounded-full duration-300 hover:scale-110 hover:bg-theme-2 shadow-md     ">Read More</button>
                        <h1 className="title text-theme-0 text-4xl font-bold">${DealData.productCost}</h1>
                    </div>
                </div>
                {/* img */}
                <img className=" pr-32 w-[700px] h-[600px] my-12 hover:rotate-12 duration-1000 object-cover" src = {DealData.productImage}></img>
            </motion.div>

        </div>)
        }
        </main>
    )
}