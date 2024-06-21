import { NextResponse, NextRequest } from "next/server"
const stripe = require("stripe")(process.env.STRIPE_KEY)
import Product from "@/src/app/models/Product"
import { connect } from "@/src/app/dbconfig/dbConfig"
const User = require("@/src/app/models/User")

connect()
export async function POST(request){
    const reqBody = await request.json()
    const {quantity} = reqBody
    const productId = request.nextUrl.pathname.split("/")[3]
    console.log(productId)
    const matchingProduct = await Product.findOne({productId})
    const seller = await User.findById(matchingProduct.seller_id)
    // console.log(matchingProduct)
    console.log("The id of product "+matchingProduct.productId)
    try {
        
        // const session = await stripe.checkout.sessions.create({
        //     payment_method_types: ["card"],
        //     success_url: `${process.env.DOMAIN}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
        //     line_items: [
        //         {       
        //             price_data:{
        //                 currency: "usd",
        //                 unit_amount: matchingProduct.productCost *100,
        //                 product_data: "ojj430t90t094509"
        //             },
        //             quantity
        //         }
        //     ],
        //     mode: "payment",
    
        // })
        const totalCost = matchingProduct.productCost * quantity * 100
        const applicationFee = Math.floor(totalCost*.15)
        console.log(totalCost, applicationFee)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCost,
            currency: 'usd',
            payment_method_types: ['card'],
            application_fee_amount: applicationFee,
            transfer_data: {
              destination: seller.stripe_account_id,
            },
            metadata:{
                productName: matchingProduct.name,
                totalCost: totalCost,
                quantity
            }
        });
        return NextResponse.json({client_secret: paymentIntent.client_secret}, {status:201})
        // console.log(session.id)

        // session.success_url = `${process.env.DOMAIN}?=${session.id}`
        // console.log(session.success_url)
        // return NextResponse.json({url: session.url}, {status: 200})

    }catch(error){
        console.log(error.message)
        return NextResponse.json({error: error.message}, {status: 500})
    }
    


}