import { NextResponse, NextRequest } from "next/server";
import getAuthToken from "@/src/app/helpers/getAuthToken";
import { connect } from "@/src/app/dbconfig/dbConfig";
import Product from "@/src/app/models/Product";
const User = require("@/src/app/models/User")

connect()

export async function PUT(request){
    const validToken = await getAuthToken(request)
    const reqBody = await request.json()
    const {quantity} = reqBody
    const productId = request.nextUrl.pathname.split("/")[3]
    console.log("Does this seriously"+ productId)
    const productAlreadyInCart = await User.findOne({_id: validToken._id, "cart.productId": productId})
    if(productAlreadyInCart){
        await User.findOneAndUpdate({_id: validToken._id, "cart.productId": productId}, {$inc: {"cart.$.quantity": quantity}})
        await User.findByIdAndUpdate({_id: validToken._id}, {$pull: {cart: {productId, quantity: {$lte: 0}}} } )


        
        return NextResponse.json({message: "User product quantity has been decremented successfully or removed"}, {status: 200})
    }
    return NextResponse.json({message: "User product does not exist"}, {status: 500})

}