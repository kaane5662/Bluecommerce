import { connect } from "@/src/app/dbconfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
const User = require('@/src/app/models/User')

connect()
export async function POST(request){
    const reqBody = await request.json()
    const {email, password} = reqBody
    console.log(email)
    console.log(password)
    const user = await User.findOne({email})
    if(!user) return NextResponse.json({message: "User does not exist!"}, {status: 500})
    const validPassword = await bcryptjs.compare(password, user.password)
    if(!validPassword) return NextResponse.json({message: "Incorrect password!"}, {status: 500})
    console.log("Valid username and password")
    const tokenData = {
        _id: user._id,
        email: user.email,
        username: user.username,
        cart: user.cart
    }
    const token = jwt.sign(tokenData, process.env.SECRET_JWT, {expiresIn: "5h"})
    const response = NextResponse.json({message: "Created login token"}, {status:200})
    response.cookies.set("token", token, {httpOnly: true,})
    return response

    // 
}

