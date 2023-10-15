import { NextResponse, NextRequest } from "next/server";
import {connect} from "@/src/app/dbconfig/dbConfig"
import getAuthToken from "@/src/app/helpers/getAuthToken";
import Product from "@/src/app/models/Product";
const User = require('@/src/app/models/User')

connect()

export async function GET(request){
    const validToken = getAuthToken(request)
    const path = request.nextUrl.pathname
    console.log(path)
    const productId = path.split("/")[3]
    console.log(productId)
    const productDoc = await Product.findOne({productId})
    if(productDoc == null) return NextResponse.json({error: "Could not find product"}, {status: 500} )
    const quantity = 0;
    const UserCartProduct = await User.findOne({_id: validToken._id, cart: {$elemMatch: {productId}}}, {"cart.$": 1})
    console.log(UserCartProduct)
    return NextResponse.json({product: productDoc, quantity: quantity}, {status: 200})

}