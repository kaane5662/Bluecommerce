import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export default async function getAuthToken(request){
    try{
        
        const token = request.cookies.get("token")?.value || ""
        const verifiedToken = jwt.verify(token, process.env.SECRET_JWT)
        return verifiedToken
    }catch(error){
        request.cookies.set("token", null)
        // NextResponse.json({message: "error.message"}, {status: 500}).cookies.delete("token")
        throw new Error(error.message)
    }
    

}