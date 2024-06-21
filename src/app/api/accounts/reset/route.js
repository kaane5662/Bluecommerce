import { connect } from "@/src/app/dbconfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import sendEmail from "@/src/app/helpers/emailer"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const User = require('@/src/app/models/User')

connect()
export async function POST(request){
    const reqBody = await request.json()
    const {email} = reqBody
    console.log(email)
    const userDoc = await User.findOne({email})
    if (!userDoc) return NextResponse.json({message: "User does not exist!"}, {status: 500})
    try{
        await sendEmail({email: userDoc.email, emailType: "RESET", userId: userDoc._id})
    }catch(error){
        return NextResponse.json({message: error.message}, {status: 500})
    }
    
    return NextResponse.json({message: `A reset email has been sent to ${userDoc.email}`}, {status: 200})
    
}

export async function PUT(request){
    const reqBody = await request.json()
    const {token, password, confirmPassword} = reqBody
    console.log(token)
    if(confirmPassword != password) return NextResponse.json({message: "Passwords do not match"}, {status: 500})
    if(confirmPassword.length < 7) return NextResponse.json({message: "Password too short"}, {status: 500})
    let decoded
    try {
        decoded = jwt.verify(token, process.env.SECRET_JWT);
    }catch(error){
        console.log(error)
        return NextResponse.json({message: "Your session has expired"}, {status: 500})
    }
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(confirmPassword, salt)
    await User.findOneAndUpdate({_id:  decoded.userId}, {password: hashedPassword})
    return NextResponse.json({message: "Password has been reset successfully"}, {status: 200})
    
}