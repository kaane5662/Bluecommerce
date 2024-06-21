import { NextRequest, NextResponse } from "next/server";
import User from "@/src/app/models/User"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import getAuthToken from "@/src/app/helpers/getAuthToken";
import sendEmail from "@/src/app/helpers/emailer";
import { faArrowUpAZ } from "@fortawesome/free-solid-svg-icons";

export async function POST(request){
    console.log("hello")
    const authToken = await getAuthToken(request)
    const userDoc = await User.findById(authToken._id)
    if(userDoc.verifyCode == null) return NextResponse.json({message: "No code"}, {status: 500}) 
    const decryptedToken = jwt.verify(userDoc.verifyToken, process.env.SECRET_JWT)
    if(!decryptedToken) return NextResponse.json({message: "Token expired or something went wrong"}, {status: 500})

    const reqBody = await request.json()
    const {code} = reqBody
    console.log(decryptedToken._id)
    console.log(decryptedToken)
    if(!await bcryptjs.compare(code, decryptedToken.hashedCode)) return NextResponse.json({message: "Invalid pin"}, {status: 500})

    userDoc.verifyCode = null
    userDoc.isVerified = true
    userDoc.verifyToken = null
    await userDoc.save()
    return NextResponse.json({message: "User Verified!"}, {status: 200})

}


export async function PUT(request){
    const authToken = await getAuthToken(request)
    const userDoc = await User.findById(authToken._id)
    if(userDoc.isVerified) return NextResponse.json({message: "User already verified!"}, {status: 500})
    await sendEmail({email: userDoc.email, emailType: "VERIFY", userId: userDoc._id})
    return NextResponse.json({message:"Check your email for new verification code"}, {status: 200})
}

