"use client"

import axios from "axios";
import Navbar from "../components/Navbar";

export default function Seller(){

    const createCustomer = (e)=>{
        e.preventDefault()
        // console.log(e.target.first.value)
        
        const formData = new FormData(e.currentTarget)

        axios.post("/api/customers", formData,{
            headers:{
                "Content-Type": 'multipart/form-data'
            }
        }).then(async (response)=>{
            // console.log(response.data.message)
            window.location.replace(response.data.url)
            
        }).catch((error)=>{
            console.log(error.response.data.message)
        })
    }


    return(
        <>
        <Navbar></Navbar>
        <form onSubmit={createCustomer} className="flex gap-2 font-ubuntu p-16">
            <div className="flex flex-col gap-3 w-[50%]">
                <h1 className="text-5xl font-bold ">Become a Seller</h1>
                <h1 className="text-xl font-bold ">Name</h1>
                <div className="flex gap-16">

                    <input required name="firstName" type="input" placeholder="First Name" className="w-[200px] p-2 text-md border-b-2 border-theme-2"></input>
                    <input required name="lastName" type="input" placeholder="Last Name" className="w-[200px] p-2 text-md border-b-2 border-theme-2"></input>
                </div>
                <h1 className="text-xl font-bold ">Email</h1>
                <input required name="email" type="input" placeholder="Email" className="w-[400px] p-2    text-md border-b-2 border-theme-2"></input>
                <h1 className="text-xl font-bold ">Address</h1>
                <input required name="street1" type="input" placeholder="Street Address *   " className="w-[500px] p-2    text-md border-b-2 border-theme-2"></input>
                <input name="street2" type="input" placeholder="Street Address 2" className="w-[500px] p-2    text-md border-b-2 border-theme-2"></input>
                <div className="flex gap-16">
                    <input required name="city" type="input" placeholder="City" className="w-[250px] p-2    text-md border-b-2 border-theme-2"></input>
                    <input required name="state" type="input" placeholder="State" className="w-[100px] p-2    text-md border-b-2 border-theme-2"></input>
                    <input required name="zip" type="input" placeholder="ZIP" className="w-[150px] p-2    text-md border-b-2 border-theme-2"></input>
                </div>
                
                <h3 className="text-lg">By clicking Join, you accept the <a href="https://stripe.com/legal/connect-account" className="text-theme-2 hover:underline ">Stripe Connect Account Agreement</a> and the <a href="https://stripe.com/legal/connect-account/recipient" className="text-theme-2 hover:underline ">Stripe Recipent Agreement</a></h3>
            </div>
            <div className="flex flex-col gap-3">
                <h1 className="text-5xl font-bold ">Business Info</h1>
                
                <input required name="businessName" type="input" placeholder="Business Name" className="w-[400px] p-2    text-md border-b-2 border-theme-2"></input>
                <h1 className="text-lg font-bold ">Business Logo</h1>
                <input required name="businessLogo" type="file" placeholder="Business Name" className="w-[150px] p-2 h-[150px] items-center    text-md border-b-2 border-theme-2 bg-theme-1 bg-opacity-5 rounded-md self-center"></input>
                <h1 className="text-lg font-bold ">Business Icon</h1>
                <input required name="businessIcon" type="file" placeholder="Business Name" className="w-[150px] p-2 h-[150px] items-center    text-md border-b-2 border-theme-2 bg-theme-1 bg-opacity-5 rounded-md self-center"></input>
            </div>
            <button type="submit" className="text-theme-0 bg-theme-1 rounded-md hover:scale-105 duration-300 w-[150px] my-2 h-[50px]  text-xl font-bold">Join</button>
            
        </form>

        </>
    )
}