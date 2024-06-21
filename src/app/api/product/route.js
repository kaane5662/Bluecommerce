import { NextResponse, NextRequest } from "next/server";
import Product from "@/src/app/models/Product";
import {connect} from "@/src/app/dbconfig/dbConfig"
import { decodeBase64 } from "bcryptjs";
import getAuthToken from "../../helpers/getAuthToken";
const stripe = require("stripe")(process.env.STRIPE_KEY)
const User = require("@/src/app/models/User")

//slowly gonna convert to ts to get enums
const Types = ["Clothing", "Electronics", "Accessories", "Food", "Medical", "Skin", "Other"]
const Sorts = ["Low to High", "High to Low", "Price Ascending", "Price Descending"]
connect()


export async function POST(request){
    const authToken = await getAuthToken(request)
    const reqBody = await request.json()
    console.log("hello from server")
    const {productName, productDesc, productCost, productImage, productType, productTags} = reqBody
    const UserDoc = await User.findById(authToken._id)
    console.log(UserDoc)
    if(UserDoc.stripe_account_id == null) return NextResponse.json({message: "No seller account"}, {status: 500})

    // console.log(productType)
    if(!Types.find((element) => element == productType)) return NextResponse.json({message: "Invalid type"}, {status: 500})
    if(typeof(productTags) != "array" && productTags.length < 1 ) return NextResponse.json({message: "No tags"}, {status: 500})
    if(typeof(productCost) != "number" || productCost < 0) return NextResponse.json({message: "Not a valid price"}, {status: 500})
    try{
        const newProduct = new Product({productName, productDesc, productCost, productImage, productId:Date.now()+Math.floor(Math.random()*1000), productType, productTags, stripe_account_id: UserDoc.stripe_account_id, seller_id: UserDoc._id })
        const savedProduct = await newProduct.save()
        return NextResponse.json({productId: savedProduct.productId}, {status: 201})
    }catch(error){
        return NextResponse.json({message:error.message}, {status:500})
    }
}

export async function GET(request){
    return NextResponse.json({Types, Sorts}, {status: 200})
}