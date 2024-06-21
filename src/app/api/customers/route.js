import { NextResponse, NextRequest } from "next/server";
import getAuthToken from "@/src/app/helpers/getAuthToken";
const User = require("@/src/app/models/User")
import Product from "@/src/app/models/Product";
import { connect } from "../../dbconfig/dbConfig";
import axios from "axios";
import { get } from "mongoose";
const stripe = require("stripe")(process.env.STRIPE_KEY)
const ip = require("ip")

connect()

export async function POST(request){
    const authToken = await getAuthToken(request)
    const alreadyASeller = await User.findById(authToken._id)
    const ipAddress = ip.address()
    
    // await stripe.accounts.del(alreadyASeller.stripe_account_id)
    // await User.findByIdAndUpdate(authToken._id, {stripe_account_id: null})
    // return
    // console.log(alreadyASeller.stripe_customer_id)
    if(alreadyASeller.stripe_account_id != null){
        return NextResponse.json({message: "You already are a seller"}, {status: 500})
    }
    const reqForm = await request.formData()
    console.log(reqForm)
    console.log(reqForm.get("email"))
    

    // return NextResponse.json()
    
    // const {firstName, lastName, email, street1, street2, city, state, zip} = reqBody
    
    try{    
        const account = await stripe.accounts.create({
            type: "express",
            business_type: "individual",
            individual:{
                email: reqForm.get("email"),
                first_name: reqForm.get("firstName"),
                last_name: reqForm.get("lastName"),
                address:{
                    city: reqForm.get("city"),
                    line1: reqForm.get("street1"),
                    line2: reqForm.get("street2"),
                    postal_code: reqForm.get("zip"),
                    state: reqForm.get("state")
                },

            },
            country: "US",
            email: reqForm.get("email"),
            business_profile: {
                name: reqForm.get("businessName"),
                support_email: reqForm.get("email"),
                product_description: ""
            },
            capabilities: {
                card_payments: {
                  requested: true,
                },
                transfers: {
                  requested: true,
                },
            },
            settings: {
                branding: {
                  icon: reqForm.get("businessIcon"), // Replace with the URL of your logo
                  logo: reqForm.get("businessLogo"), // Replace with the URL of your logo
                  primary_color: "#4ecdc4", // Replace with your desired brand color

                },
            }
            // tos_acceptance: {
            //     date: 1609798905,
            //     ip: ipAddress
            // }
        })
        await User.findByIdAndUpdate(authToken._id, {stripe_account_id: account.id})
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: 'https://example.com/reauth',
            return_url: 'https://example.com/return',
            type: 'account_onboarding',
        });
        return NextResponse.json({url: accountLink.url}, {status:201})
        
    }catch(error){
        console.log(error)
        return NextResponse.json({message:error.message}, {status: 500})
    }



}

export async function GET(request){
    const authToken = await getAuthToken(request)
    const UserDoc = await User.findById(authToken._id)
    const accountLink = await stripe.accounts.createLoginLink(UserDoc.stripe_account_id)
    console.log(accountLink)
    return NextResponse.redirect(accountLink)
}