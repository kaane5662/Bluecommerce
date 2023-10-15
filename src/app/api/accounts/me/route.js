import {connect} from "@/app/dbconfig/dbConfig"
const User = require('@/app/models/User')
import { NextRequest, NextResponse } from "next/server"
import getAuthToken from "@/app/helpers/getAuthToken"
import bcryptjs from "bcryptjs"

connect()

export async function GET(request){
    console.log("here")
    const tokenId = await getAuthToken(request)
    const user = await User.findOne({_id: tokenId}).select("-password")
    console.log("Get over here")
    return NextResponse.json({user}, {status: 200})
}