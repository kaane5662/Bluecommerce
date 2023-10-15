import { NextResponse, NextRequest } from "next/server"
const stripe = require("stripe")(process.env.STRIPE_KEY)
import Product from "@/src/app/models/Product"
import { connect } from "@/src/app/dbconfig/dbConfig"


connect()
export async function POST(request){
    const reqBody = await request.json()
    const {quantity} = reqBody
    const productId = request.nextUrl.pathname.split("/")[3]
    console.log(productId)
    const matchingProduct = await Product.findOne({productId})
    // console.log(matchingProduct)
    console.log("The id of product "+matchingProduct.productId)
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            success_url: `${process.env.DOMAIN}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
            line_items: [
                {
                    price_data:{
                        currency: "usd",
                        product: matchingProduct.productId,
                        unit_amount: matchingProduct.productCost *100
                    },
                    quantity
                }
            ],
            mode: "payment",
    
        })
        console.log(session.id)

        session.success_url = `${process.env.DOMAIN}?=${session.id}`
        console.log(session.success_url)
        return NextResponse.json({url: session.url}, {status: 200})

    }catch(error){
        console.log(error.message)
        return NextResponse.json({error: error.message}, {status: 500})
    }
    


}