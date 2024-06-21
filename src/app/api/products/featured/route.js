import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/src/app/dbconfig/dbConfig";
import Product from "@/src/app/models/Product";

connect()
export async function GET(request){
    const FeaturedProducts = await Product.find({}).sort({productViews: -1}).limit(14)
    if(FeaturedProducts){
        return NextResponse.json({FeaturedProducts}, {status: 200})
    }
}