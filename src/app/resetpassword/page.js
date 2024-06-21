"use client"

import axios from "axios"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

export default function PasswordReset(){
    const [token, setToken] = useState("")
    const [message, setMessage] = useState("")
    const userSelector = useSelector((state)=> state.user.value)
    const router = useRouter()

    useEffect(()=>{
        setToken(window.location.href.split("?=")[1])
    }, [])

    const resetPassword = async (e) => {
        e.preventDefault()
        const password = e.target.password.value
        const confirmPassword = e.target.confirmPassword.value
        console.log("heruiweuiferui")
        setMessage("")
        axios.put("/api/accounts/reset", {password,confirmPassword,token}).then((response)=>{
            setMessage("Password reset successfully")
            router.push("/dashboard")
        }).catch((error)=>{
            setMessage(error.response.data.message)
            console.log(error)
            console.log(error.message)
        })

    }

    return (
        <main className=" py-24 px-96 ">
        <form onSubmit={(e)=> resetPassword(e)}>
            <div className="px-32 shadow-lg flex flex-col gap-8">
            <h1 className="text-5xl text-theme-1 font-bold">Reset Your Password</h1>
            <div>
                <p className=" opacity-50 font-semibold text-md text-black-0">Enter a new password to reset the password on your account. This session is only valid for 5 minutes</p> 
            </div>
                <p className="error text-lg  text-theme-2 text-center font-semibold">{message}</p>
                <label htmlFor="password" className="-mx-2 opacity-30 font-bold">Password</label>
                <input type="password" className="-mt-6 px-4 text-md focus:border-theme-2 h-[50px] rounded-md w-[100%] border-theme-1 border-opacity-30 border-2 border-solid" name = "password" placeholder="New Password"></input>
                <label htmlFor="confirmPassword" className="-mx-2 opacity-30 font-bold">Confirm Password</label>
                <input type="password" name = "confirmPassword" className=" -mt-6  px-4 text-md h-[50px] rounded-md w-[100%] border-theme-1 border-opacity-30 border-2 border-solid" placeholder="Repeat Password"></input>
                
                <button type = "submit" className="hover:-translate-y-1 duration-300 bg-theme-2 h-[65px] w-[250px] font-bold rounded-sm text-white-0 text-lg mb-12">Reset Password</button>
            
            </div>
        </form>
        </main>
        
    )

}