"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"

export default function UploadProduct(){
    const [image, setImage] = useState({})
    const [base64Image, setBase64] = useState("")
    const [Types, setTypes] = useState([])
    const [currentType, setCurrentType] = useState()
    
    const base64Encode = async (e) => {
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=> {
            console.log(reader.result)
            setBase64(reader.result)
        }
    }

    const UploadProduct = (e) => {
        e.preventDefault()
        const productName = e.target.name.value
        const productType = currentType
        const productDesc = e.target.desc.value
        const productCost = parseFloat(e.target.cost.value)
        const productTags = e.target.tags.value.split(" ")
        console.log(productCost +5)
        console.log(productCost+productDesc+productName+productType)
        console.log(base64Image)
        if(base64Image.length < 1) return console.log("no image")
        axios.post("/api/product", {productName, productType, productCost, productDesc, productImage: base64Image, productTags}).then((response)=>{
            console.log(response.data)
            window.location.replace(`/product/${response.data.productId}`)
        }).catch((error)=>{
            console.log(error.message)
        })

    }


    const getTypes = async ()=>{
        axios.get("/api/product").then((response)=>{
            setTypes(response.data.Types)
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    useEffect(()=>{
        getTypes()
    }, [])

    return(
        <main className="bg-white-0">
            <Navbar></Navbar>
            <div className=" justify-center flex p-8 font-ubuntu">
                <form onSubmit={(e)=> UploadProduct(e)}  className="w-[65%] rounded-md  p-20 bg-white-0 flex flex-col gap-1">
                    <h1 className="text-theme-1 text-5xl text-center font-bold mb-9">Upload Item</h1>
                    <label htmlFor="name" className="text-theme-1 text-opacity-50 font-bold">Product Name</label>
                    
                    <input name = "name" type="text" placeholder="" className=" p-4 mb-12 text-md w-[100%] border-b-2 border-solid border-theme-2"></input>
                    <div className="flex gap-8 justify-first">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="cost" className="text-theme-1 text-opacity-50 font-bold mx">Product Cost</label>
                            <input name = "cost" type="text" placeholder="" className=" p-4 mb-12 text-md w-[200px] border-b-2 border-solid border-theme-2"></input>
                        </div>
                        <div className="flex flex-col gap-6 overflow-clip">
                            <label htmlFor="cost" className="text-theme-1 text-opacity-50 font-bold mx">Product Type</label>
                            <div className="flex gap-8 overflow-x-scroll p-4">
                                {Types.map((type, index)=>{
                                    return(
                                        currentType == type ?(
                                            <h3 className={" bg-theme-2 p-4 text-theme-0 hover:cursor-pointer rounded-md "} onClick={()=>setCurrentType(type)} key={index}>{type}</h3>
                                        ):(
                                            <h3 className={"border-2 border-theme-2 rounded-md p-4 hover:cursor-pointer "} onClick={()=>setCurrentType(type)} key={index}>{type}</h3> 
                                        )
                                        
                                    )
                                })}
                            </div>

                        </div>

                    </div>
                    
                    <label htmlFor="desc" className="text-theme-1 text-opacity-50 font-bold">Product Description</label>
                    <textarea name = "desc" type="text" placeholder="" className=" p-4 mb-12 text-md w-[100%] h-[350px] border-2 border-solid border-theme-2 rounded-md"></textarea>
                    <label htmlFor="tags" className="text-theme-1 text-opacity-50 font-bold">Product Tags</label>
                    <input name = "tags" type="text" placeholder="" className=" p-4 mb-12 text-md w-[100%] border-b-2 border-solid border-theme-2 rounded-md"></input>
                    
                    <label htmlFor="image" className="text-theme-1 text-opacity-50 font-bold">Product Image</label>
                    <div className="justify-center flex flex-col items-center" >
                        <img className="h-[600px] w-[500px] bg-theme-1 bg-opacity-10 object-scale-down" src = {base64Image || null}></img>
                        <input  type= "file" accept="image/png, image/jpeg" name="image" className=" w-[300px] h-[75px] rounded-md font-bold " onChange={(e)=> base64Encode(e)} ></input>
                    </div>
                    <div className="justify-center flex" >
                        <button type= "submit" className=" w-[300px] h-[75px]  text-theme-0 text-lg hover:-translate-y-2 duration-300 font-bold bg-theme-2 rounded-md font-bold]duration-500" >Upload Product</button>
                    </div>
                    

                </form>
            </div>
        </main>
    )
}