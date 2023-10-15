import { NextRequest, NextResponse } from "next/server";
import Product from "@/src/app/models/Product";
import {connect} from "@/src/app/dbconfig/dbConfig"
connect()

export async function GET(request){
    let searchParam = request.nextUrl.pathname.split("/")[3]
    const spacedParam = searchParam.split("%20")
    if(spacedParam.length > 1){
        searchParam = ""
        for(let i = 0; i < spacedParam.length; i++){
            searchParam += spacedParam[i]
            searchParam += " "
        }
    }
    console.log(searchParam)
    const matchingDocs = await Product.find({ productName: { $regex: `(?i)${searchParam}`} }
    )
    if(matchingDocs == null) return NextResponse.json({error: 'Could not find results'}, {status: 500})
    return NextResponse.json({products : matchingDocs}, {status: 200})

}