"use client"

import Link from "next/link"
import axios from "axios"
import { useState, useEffect } from "react"
import Deal from "../components/Deal"
import Navbar from "../components/Navbar"
import FeaturedList from "../components/FeaturedList"
import BestSellingList from "../components/BestSellingList"

export default function Dashboard(){

    const updatePurchasedItems = async(session_id)=>{
        console.log(session_id)
        axios.put("/api/checkout", {session_id}).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    }  


    useEffect(()=>{
        const splitUrl = window.location.href.split("success=true&session_id=")
        if(splitUrl.length > 1){
            updatePurchasedItems(splitUrl[1])
        }
    },[])

    return (
        <main className=" bg-white">
            <Navbar/>
            <Deal/>
            <FeaturedList></FeaturedList>
            {/* <BestSellingList></BestSellingList> */}

            
        </main>
    )
}