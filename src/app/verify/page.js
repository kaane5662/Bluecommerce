"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

export default function VerifyEmail(){
    const [token, setToken] = useState("")
    const [codePin, setCode] = useState("")
    const [message, setMessage] = useState("")
    const userSelector = useSelector((state)=> state.user.value)
    const router = useRouter()

    const verifyUser = async () =>{
        console.log(codePin)
        axios.post("/api/accounts/verify", {code: codePin, email: userSelector.email}).then((response)=>{
            setMessage(response.data.message)
            router.push("/dashboard")
        }).catch((error)=>{
            setMessage(error.response.data.message)
        })
    }

    const resetCode = async () => {
        axios.put("/api/accounts/verify").then((response)=>{
            setMessage(response.data.message)
        }).catch((error)=>{
            setMessage(error.response.data.message)
        })
    }

    return (
        <main className=" py-32 px-96">

            <div className="px-32 shadow-lg flex flex-col gap-10">
            <h1 className="text-5xl text-theme-1 font-bold text-center">Verify Email</h1>
            <div>
                <p className="font-bold text-lg text-center text-theme-2 p-4">{message}</p>
                <p className=" opacity-50 font-semibold text-lg text-black-0 text-center">A 4 digit security code has been sent to the associated email</p>
                <p className=" opacity-50 font-semibold text-md text-black-0 text-center">This code is only valid for 30 minutes</p> 
            </div>
            <input type="text" className=" font-bold text-2xl h-[50px] rounded-md w-[100%] border-theme-1 border-opacity-30 border-2 border-solid text-center" pattern="[0-9]{4}"  onChange = {(e)=> setCode(e.target.value) } maxLength={4}></input>
            <p onClick={()=> resetCode()} className="text-theme-2 text-center font-semibold hover:decoration-solid hover:underline hover:cursor-pointer ">Resend Link</p>
               
            <div className="flex justify-center">
                <button onClick={()=> verifyUser()} className="hover:-translate-y-1 duration-300 bg-theme-2 h-[75px] w-[250px] font-bold rounded-md text-white-0 text-2xl mb-12">Verify</button>
            </div>
        </div>
        </main>
        
    )

}