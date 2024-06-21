import { NextResponse, NextRequest } from "next/server";
import Product from "@/src/app/models/Product";
import { Paprika } from "next/font/google";

export async function POST(request){
    const reqBody =  await request.json()
    let {searchParam, productParam, sortParam} = reqBody
    console.log(searchParam)

    let params = {
        productName: { $regex: `${searchParam ? searchParam: ""}`, $options: "i"},
    }
    
    if(productParam){
        params.productType = productParam
    }
    let sort = 0
    if(sortParam){
        console.log(sortParam)
        if(sortParam == "Low to High"){
            sort = 1
        }
        if(sortParam == "High to Low"){
            sort = -1
        }
    }

    console.log(params)

    const matchingDocs = await Product.find(params).sort({productCost: sort})
    console.log(matchingDocs.length)
    if(matchingDocs == null) return NextResponse.json({error: 'Could not find results'}, {status: 500})
    return NextResponse.json({products : matchingDocs}, {status: 200})
}