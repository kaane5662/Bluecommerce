import { NextResponse, NextRequest } from "next/server";
import Product from "@/src/app/models/Product";
import {connect} from "@/src/app/dbconfig/dbConfig"
import { decodeBase64 } from "bcryptjs";
const stripe = require("stripe")(process.env.STRIPE_KEY)


//slowly gonna convert to ts to get enums
const Types = ["Clothing", "Electronics", "Accessories", "Food", "Medical", "Skin", "Other"]
const Sorts = ["Low to High", "High to Low", "Price Ascending", "Price Descending"]
connect()


export async function POST(request){
    const reqBody = await request.json()
    console.log("hello from server")
    const {productName, productDesc, productCost, productImage, productType, productTags} = reqBody
    console.log(productType)
    if(!Types.find((element) => element == productType)) return NextResponse.json({message: "Invalid type"}, {status: 500})
    if(typeof(productTags) != "array" && productTags.length < 1 ) return NextResponse.json({message: "No tags"}, {status: 500})
    if(typeof(productCost) != "number" || productCost < 0) return NextResponse.json({message: "Not a valid price"}, {status: 500})
    console.log("Valid cost and tags and types")
    const product = await stripe.products.create({
        name: productName,
        description: productDesc
    });
    const priceData = await stripe.prices.create({
        unit_amount: productCost*100,
        currency: "usd",
        product: product.id
    })
    const newProduct = new Product({productName, productDesc, productCost, productImage, productId: product.id, productType, productTags })
    const savedProduct = await newProduct.save()
    return NextResponse.json({message: "Product saved", productId: savedProduct.productId}, {status: 200})
}

export async function GET(request){
    return NextResponse.json({Types, Sorts}, {status: 200})
}