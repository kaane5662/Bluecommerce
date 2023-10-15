import { NextResponse, NextRequest } from "next/server";
import getAuthToken from "@/src/app/helpers/getAuthToken";
const User = require("@/src/app/models/User")
import Product from "@/src/app/models/Product";
import { connect } from "../../dbconfig/dbConfig";
connect()

export async function GET(request){
    
    const authToken = await getAuthToken(request)
    const UserDoc = await User.findById(authToken._id)
    const userCartItems = UserDoc.cart
    const cartItemsData = []
    
    for(let i = 0; i < userCartItems.length; i++){ 
        const product = await Product.findOne({productId: userCartItems[i].productId})
        const productObject = {product, quantity: userCartItems[i].quantity }
        productObject.remove = false
        cartItemsData.push(productObject)        
    }
    return NextResponse.json({cartItemsData}, {status: 200})
    
}

export async function POST(request){
    const validToken = await getAuthToken(request)
    console.log(validToken)
    const reqBody = await request.json()
    const { productId, amount } = reqBody
    const productAlreadyInCart = await User.findOne({_id: validToken._id, "cart.productId": productId})
    console.log(productAlreadyInCart)
    if(productAlreadyInCart){
        await User.findOneAndUpdate({_id: validToken._id, "cart.productId": productId}, {$inc: {"cart.$.quantity": (amount)}})
        return NextResponse.json({message: "User product quantity has been incremented successfully"}, {status: 200})
    }else{
        await User.findByIdAndUpdate(validToken._id, {$push :{ cart: {productId, quantity: amount} }})
        return NextResponse.json({message: "User cart has been updated successfully with new product"}, {status: 200})
    }
    
}

export async function PUT(request){
    const validToken = await getAuthToken(request)
    const reqBody = await request.json()
    const {productData} = reqBody
    console.log(productData)
    for(let i = 0; i < productData.length; i++){
        await User.findByIdAndUpdate(validToken._id, {$pull: {cart: {productId: productData[i]}}})
    }
    return NextResponse.json({message: "Successfully removed items from cart"}, {status: 200})
    
}