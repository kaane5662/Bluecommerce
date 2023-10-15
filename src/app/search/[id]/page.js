"use client"
import ProductBlock from "@/app/components/ProductBlock";
import Navbar from "@/app/components/Navbar";

import { useEffect, useState } from "react";
import axios from "axios";


export default function Search({params}){

    const [results, setResults] = useState([])

    const getMatchingResults = () =>{
        axios.get(`/api/search/${params.id}`).then((response)=>{
            console.log(response.data.products)
            setResults(response.data.products)
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    useEffect(()=>{

        console.log(params.id)
        getMatchingResults()
    },[])


    return(
        <main className="bg-white-0">
            <Navbar></Navbar>
            
            <div className="p-8">
                <h1 className=" text-4xl text-theme-1 font-bold last:font">Showing results for  {params.id}</h1>
                <div className="flex flex-wrap gap-12 py-10">
                    {
                        results.map((result, index)=>{
                            return (
                                <ProductBlock productCost={result.productCost} productImage={result.productImage} productId={result.productId} productName={result.productName} productType={result.productType} key = {index} ></ProductBlock>
                            )
                        })
                        
                    }

                    
                </div>
            </div>
        </main>
    )
}