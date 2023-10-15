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
            <div className=" justify-center flex p-12">
                <form onSubmit={(e)=> UploadProduct(e)}  className="min-w-[50%] max-w-[50%] shadow-2xl rounded-md  p-20    bg-white-0">
                    <h1 className="text-theme-1 text-4xl text-center font-bold mb-9">Upload Item</h1>
                    <label htmlFor="name" className="text-theme-2 font-bold mx-3">Product Name</label>
                    <input name = "name" type="text" placeholder="" className=" p-4 mb-12 w-[100%] h-[75px] shadow-lg border-b-4 border-solid border-theme-2 border-opacity-25"></input>
                    <label htmlFor="type" className="text-theme-2 font-bold mx-3">Type</label>
                    {/* Get types */}
                    <div className="flex overflow-x-scroll gap-4 p-4">
                        {Types.map((Type, index)=>{
                            return(
                                <p className="hover:cursor-pointer rounded-full min-w-auto  min-h-10 text-center shadow-md border-theme-2 border-solid border-2 px-4 hover:-translate-y-1 duration-300" key={index} onClick={()=> setCurrentType(Type)}>{Type}</p>
                            )
                        })
                        }
                    </div>
                    {/* current type */}
                    <div className=" items-center p-4 mb-12 w-[100%] shadow-lg border-b-4 border-solid border-theme-2 border-opacity-25">
                        <p className="items-center h-auto py-2 hover:cursor-pointer rounded-full text-lg text-center shadow-md bg-theme-2 w-auto text-theme-0 px-2  ">{currentType}</p>
                    </div>
                    <label htmlFor="cost" className="text-theme-2 font-bold mx-3">Product Cost</label>
                    <input name = "cost" type ="number" step=".01" placeholder="" className="p-4 mb-12 w-[30%] h-[75px] shadow-lg border-b-4 border-solid border-theme-2 border-opacity-25"></input>
                    <br></br>
                    <label htmlFor="desc" className="text-theme-2 font-bold mx-3">Description</label>
                    <textarea name = "desc" type ="text" placeholder="" className=" text-start p-4 mb-12 w-[100%] h-[200px] shadow-lg border-b-4 border-solid border-theme-2 border-opacity-25"></textarea>
                    <label htmlFor="tags" className="text-theme-2 font-bold mx-3">Tags</label>
                    <input name = "tags" type="text" placeholder="" className=" p-4 mb-12 w-[100%] h-[50px] shadow-lg border-b-4 border-solid border-theme-2 border-opacity-25"></input>
                    <br></br>
                    <label htmlFor="image" className="text-theme-2 font-bold mx-3">Image</label>
                    <div className="justify-center flex flex-col" >
                        <img className="h-auto w-[800px]" src = {base64Image}></img>
                        <input  type= "file" accept="image/png, image/jpeg" name="image" className=" w-[300px] h-[75px] rounded-md font-bold " onChange={(e)=> base64Encode(e)} ></input>
                    </div>
                    <div className="justify-center flex" >
                        <button type= "submit" className=" w-[300px] h-[75px] border-theme-2 border-solid border-2 text-theme-2 rounded-md font-bold hover:bg-theme-2 hover:text-theme-0 duration-500" >Upload Product</button>
                    </div>
                    

                </form>
            </div>
        </main>
    )
}