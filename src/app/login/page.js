"use client"
import { Provider, useSelector, useDispatch } from "react-redux"
import { useRef, useState, useEffect } from "react"
import "./../globals.css"
import { login, logout } from "../redux/features/userReducer"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { motion } from "framer-motion"

export default function Login(){
    
    const [error, setError] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    let user = useSelector((state)=> state.user.value)
    const router = useRouter()
    const loginUser = async (e) => {
        e?.preventDefault()
        setIsProcessing(true)
        const password = e.target.password.value
        const email = e.target.email.value
        setError("")
        axios.post("/api/accounts/login", {password, email}).then((response)=>{
            setIsProcessing(false)
            console.log(response.data)
            router.push("/dashboard")
        }).catch((error)=>{
            setIsProcessing(false)
            console.log(error)
            setError(error.response.data.message)
        })
        
    }

    return (
        

        <div className="flex justify-center font-ubuntu content-center items-center center flex-col h-screen bg-white-0">
            <motion.form 
            initial={{
                opacity: 0,
                hidden: "true",
                y: "100%"
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
                stiffness: 20
            }}
            viewport={{ once: true }} 
            onSubmit={(e)=> loginUser(e)} className=" shadow-lg px-12 py-10 max-w-[500px] my-8 rounded-md bg-white-0">
                <h1 className=" text-theme-1 font-bold text-5xl text-center mb-6">Login</h1>
                <p className="error text-lg  text-theme-2 text-center font-semibold">{error}</p>
                <label htmlFor="email" className=" text-theme-1 -mx-2 opacity-50 text-sm font-semibold">Email</label>
                <input placeholder="Enter your email" type="text" name="email" className=" min-w-[100%] min-h-[50px] border-theme-1 border-opacity-30 border-2 rounded-md mb-10 px-4 "></input>
                <label htmlFor="password" className=" text-theme-1 opacity-50    text-sm -mx-2 font-semibold   ">Password</label>
                <input placeholder="Enter your password" type="password" name="password" className=" min-w-[100%] min-h-[50px] border-theme-1 border-opacity-30 border-2 rounded-md mb-10 px-4"></input>
                <div className="flex justify-between px-2">
                    <br></br>
                    <Link href="/confirmresetpassword" className=" hover:underline font-semibold text-md text-theme-2">Forgot Password</Link>
                </div>
                <div className="flex justify-center">
                    <button type='submit' className="hover:-translate-y-1 duration-300 mt-10 border-solid border-2 w-[100%] h-[65px] font-bold text-white-0 bg-theme-2 text-[20px]  rounded-md mb-8" onClick={()=> loginUser()}>{isProcessing ? (<FontAwesomeIcon icon={faSpinner} className="text-4xl text-theme-0" spinPulse />): ("Login")}  </button>
                </div>
                <p className="text-center">Don't have an account? <Link className="text-theme-2 font-semibold hover:underline" href="/signup">Sign Up</Link> </p>

            </motion.form>

            


        </div>
    )
}