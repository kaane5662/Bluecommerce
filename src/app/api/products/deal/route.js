import { NextResponse, NextRequest } from "next/server";
import Product from "@/src/app/models/Product";
import { connect } from "@/src/app/dbconfig/dbConfig";

connect()
export async function GET(request){
    console.log("hello")
    const DealProduct = await Product.find({}).sort({productViews: -1}).limit(1)
    if(DealProduct){
        return NextResponse.json({DealProduct}, {status: 200})
    }
    return NextResponse.json({message: "Item not found"}, {status: 500})
}