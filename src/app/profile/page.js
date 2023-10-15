"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import Link from "next/link"


export default function Profile(){


    const [username, setUsername] = useState("Default")
    const [email, setEmail] = useState("Default")

    useEffect(()=>{
        getUserData()
    }, [])

    const getUserData = async () => {
        console.log("Alive")
        console.log("Go here")
        axios.get("/api/accounts/me").then((response)=>{
            const userInfo = response.data.user
            console.log(response.data)
            setUsername(userInfo.username)
            setEmail(userInfo.email)

        }).catch((error)=>{
            console.log(error.message)
        })
    }


    return (
        <div className="flex justify-center items-center flex-col">
            <h1 className=" font-bold text-[40px] text-orange-0">{username}</h1>
            <p className="text-[30px] text-black-0">{email}</p>
        </div>
    )
}