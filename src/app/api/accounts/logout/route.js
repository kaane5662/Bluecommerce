import { connect } from "@/src/app/dbconfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
const User = require('@/src/app/models/User')


export async function DELETE(request){
    console.log("Hello from logut")
    try {
        const response = NextResponse.json({message: "Logged out successfully"}, {status: 200})
        response.cookies.delete("token")
        return response
        
    }catch(error){
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}