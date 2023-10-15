"use client"
import ProductBlock from "./ProductBlock"
import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

export default function FeaturedList(){

    const [FeaturedData, setFeaturedData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const getFeaturedProducts = async()=>{
        axios.get("/api/products/featured").then((response)=>{
            console.log(response.data)
            setFeaturedData(response.data.FeaturedProducts)
            setIsLoaded(true)
        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getFeaturedProducts()
    }, [])

    return (
        <main>
        {
        !isLoaded    ?
        (
            <div className="flex justify-center items-center p-64">
                    <h1 className="text-4xl animate-bounce text-theme-2 font-bold">Loading...</h1>
            </div>
        )
        :
        (
        <div className=" p-8 ">
            <h1 className=" text-4xl text-theme-1 font-bold">Featured</h1>
            <motion.div
            initial={{
                opacity: 0,
                hidden: "true",
                scale: 0
            }}
            whileInView={{
                x: 0,
                y: 0,   
                rotate: 0,
                opacity: 1,
                scale: 1
            }}
            transition={{
                duration: 2,
                type:"spring",
                damping: 10,
                stiffness: 20
            }}
            viewport={{ once: true }}  
            className="my-8 gap-12 overflow-x-scroll  py-8 flex  " >
                {/* Featured Block */}
                {FeaturedData.map((FeaturedProduct, index)=>{
                    return(
                        <>
                        <ProductBlock productName={FeaturedProduct.productName} productCost={FeaturedProduct.productCost} productId={FeaturedProduct.productId} productType={FeaturedProduct.productType} productImage={FeaturedProduct.productImage} key={index}/>
                        
                        </>
                        
                        

                    )
                })}

            </motion.div>
        </div>
        )
        }
        </main>
    )
}   