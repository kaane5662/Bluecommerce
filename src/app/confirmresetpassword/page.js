"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

export default function PasswordReset(){
   
    const [message, setMessage] = useState("")

    const createResetSession = async (e) =>{
        e.preventDefault()
        const email = e.target.email.value
        console.log(email)
        setMessage("")
        axios.post("/api/accounts/reset", {email}).then((response)=>{
            setMessage(response.data.message)
            console.log(response.data)
        }).catch((error)=>{
            console.log(error)
            setMessage(error.response.data.message)
        })
    }

    return (
        
        <main className=" py-32 px-96 font-ubuntu">
        <form onSubmit={(e)=> createResetSession(e) }>
            <div className="px-32 shadow-lg flex flex-col gap-8 ">
            <h1 className="text-5xl text-theme-1 font-bold">Enter your Email</h1>
            <div>
                <p className=" opacity-50 font-semibold text-md text-black-0">Please enter your email address to receive a password reset link via email. This link is only valid for 5 minutes!</p> 
            </div>
            <p className="error text-lg  text-theme-2 text-center font-semibold">{message}</p>
            <label htmlFor="email" className="-mx-2 opacity-30 font-bold">Email</label>
            <input type="text" className="  -mt-6 px-4 text-lg h-[50px] rounded-md w-[100%] border-theme-1 border-opacity-30 border-2 border-solid"  placeholder="Email" name="email"></input>
            
            
            <button type = "submit" className="hover:-translate-y-1 duration-300 bg-theme-2 h-[65px] w-[250px] font-bold rounded-sm text-white-0 text-lg mb-12">Reset Password</button>
            
            
            </div>
        </form>
        </main>
        
    )

}