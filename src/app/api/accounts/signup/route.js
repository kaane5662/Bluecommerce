import {connect} from "@/src/app/dbconfig/dbConfig"
const User = require('@/src/app/models/User')
import { NextRequest, NextResponse } from "next/server"
import sendEmail from "@/src/app/helpers/emailer"
import bcryptjs from "bcryptjs"
import  jwt  from "jsonwebtoken"


connect()

export async function POST(request){
    
    const reqBody = await request.json()
    const {username, email, password, confirmPassword} = reqBody
    if(password != confirmPassword) return NextResponse.json({message: "Passwords don't match"}, {status: 500})
    if(confirmPassword.length < 7) return NextResponse.json({message: "Password must be at least 8 characters"}, {status: 500})
    if(email.split("@").length < 2) return NextResponse.json({message: "Must be a valid email"}, {status: 500})
    const isUserName = await User.findOne({username})
    if(isUserName) return NextResponse.json({message: "User already exists"}, {status: 500})
    
    
    const isUser = await User.findOne({email}) 
    if(isUser) return NextResponse.json({message: "Email already exists"}, {status: 400})
    
    
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)
    
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    const savedUser = await newUser.save()
    console.log("made it to email")
    await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

    const tokenData = {
        _id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
        cart: savedUser.cart
    }
    const token = jwt.sign(tokenData, process.env.SECRET_JWT, {expiresIn: "5h"})
    const response = NextResponse.json({message: "Created login token"}, {status:200})
    response.cookies.set("token", token, {httpOnly: true})
    return response

}

