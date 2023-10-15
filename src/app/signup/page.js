"use client"

import { useState ,useRef, useEffect } from "react"
import { login, setEmail, setPass } from "../redux/features/userReducer"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"



export default function Signup(){


    const dispatch = useDispatch()
    const router = useRouter()

    const [message, setMessage] = useState("")
    const [processing, setProcessing] = useState(false)
    
    const createAccount = async (e) => {
        e.preventDefault()
        const {username, email, password, confirmPassword} = e.target
        
        const accountObj ={
            username: username.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        }
        setMessage("")
        setProcessing(true)
    
        axios.post('/api/accounts/signup', accountObj).then((response)=> {
            setProcessing(false)
            setMessage(response.data.message)
            router.push('/verify')
            
        }).catch((error)=>{
            setProcessing(false)
            setMessage(error.response.data.message)
            console.log("This catching errors?")
            console.log(error)
        })
        
    }

    return (
        <div className=" flex flex-row fle">
            
            <form onSubmit={(e)=>createAccount(e)} className= " min-w-[35%] max-w-[35%] max-h-screen min-h-screen items-center bg-white-0 px-12 py-8 shadow-md drop-shadow-sm">
                <h1 className=" text-5xl font-bold m-4  text-theme-1 text-center">Get Started</h1>
                <p className="font-semibold text-theme-1 opacity-50 text-center mb-8">Create your account now</p>
                <h1 className="text-md font-semibold text-center text-theme-2">{message}</h1>


                <label className="-mx-2 text-white-1 opacity-30 font-semibold text-sm" htmlFor="username">Username</label><br></br>
                <input className=" border-solid border-[2px] border-theme-1 border-opacity-30 w-[100%] h-[45px] rounded-md mb-6 px-4" name="username" placeholder="Enter your username" type="text"></input>

                <label className="-mx-2 text-white-1 opacity-30 font-semibold text-sm" htmlFor="password">Email</label><br></br>
                <input  className=" border-solid border-[2px] border-theme-1 border-opacity-30 w-[100%] h-[45px] rounded-md mb-6 px-4" name="email" placeholder="Enter your email" type="text"></input>

                <label className="-mx-2 text-white-1 opacity-30 font-semibold text-sm" htmlFor="password">Password</label><br></br>
                <input  className=" border-solid border-[2px] border-theme-1 border-opacity-30 w-[100%] h-[45px] rounded-md mb-6 px-4" name="password" placeholder="Enter your password" type="password"></input>

                <label className="-mx-2 text-white-1 opacity-30 font-semibold text-sm" htmlFor="confirmPassword">Confirm Password</label><br></br>
                <input className=" border-solid border-[2px] border-theme-1 border-opacity-30 w-[100%] h-[45px] rounded-md mb-6 px-4" name="confirmPassword" placeholder="Rewrite your password" type="password"></input>

                <div className="centered-button flex justify-center items-center">
                    <button type = "submit" className="my-4 hover:-translate-y-1 duration-300 text-center w-[100%] h-[65px] text-[17.5px] bg-theme-2 text-theme-0 font-bold text-xl rounded-md">{   !processing ? ("Sign Up") : (<FontAwesomeIcon className="text-4xl text-theme-0" icon={faCircleNotch} spin></FontAwesomeIcon>) }</button>
                </div>
                
          
               
                
        
            </form>

            <div className= " min-h-[100%] max-w-[65%] min-w-[65%] flex flex-col items-center justify-center gap-4   bg-theme-1 p-10">

                <h3 className="text-center text-theme-0 text-4xl font-bold border-b-4 border-b-theme-2 ">Buy Items Now</h3>
                <p className="text-center  text-xl text-theme-0 ">Everything you need in a simplified Eccomerce website</p>
                <img src= "https://xitoshop.com/1558-large_default/hp-omen-15-en0375ng-ryzen-7-4800h-16gb-ddr4-512gb-ssd-w10home-fullhd-rtx2060.jpg" className="h-[520px] w-[520px] object-scale-down "></img>

            </div>

            
        </div>
    )
}