const stripe = require("stripe")(process.env.STRIPE_KEY)
import Product from "@/src/app/models/Product"
const User = require("@/src/app/models/User")
import { NextResponse, NextRequest } from "next/server"
import getAuthToken from "../../helpers/getAuthToken"
import {connect} from "@/src/app/dbconfig/dbConfig"
connect()

export async function POST(request){
    console.log("Hello")
    const authToken = await getAuthToken(request)
    
    const UserDoc = await User.findById(authToken._id)
    const checkoutData = []
    const UserCart = UserDoc.cart
    for(let i = 0; i < UserCart.length; i++){
        const product = await Product.findOne({productId: UserCart[i].productId}).select("-productImage  ")
        const checkoutObj = {product, quantity: UserCart[i].quantity}
        checkoutData.push(checkoutObj)
    }

    console.log(checkoutData)
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: checkoutData.map((checkout)=>{
                // console.log(checkout.productCost)
                return {
                        price_data: {
                            product: checkout.product.productId,
                            currency: "usd",
                            unit_amount: checkout.product.productCost*100
                        },
                        quantity: checkout.quantity,
                    }
                
            }),
            success_url: `${process.env.DOMAIN}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`
        })
        return NextResponse.json({url: session.url}, {status: 200})

    }catch(error){
        return NextResponse.json({eror: error.message}, {status: 500})
      
    }

}

export async function PUT(request){
    const authToken = await getAuthToken(request)
    const reqBody = await request.json()
    const {session_id} = reqBody
    console.log(session_id)
    const session = await stripe.checkout.sessions.retrieve(session_id)
    console.log(session)
    if(session.payment_status == "unpaid") return NextResponse.json({message:"Did not pay"}, {status: 500})
    const session_items = await stripe.checkout.sessions.listLineItems(session_id)
    console.log(session_items.data)
    session_items.data.forEach(async function(item) {
        console.log(item)
        console.log(item.quantity)
        console.log(item.description)
        const details = {
            quantity: item.quantity,
            product_id: item.price.product,
            order_date: new Date(Date.now()).toDateString()
        }
        console.log(authToken._id)
        await User.findByIdAndUpdate(authToken._id, {$push: {ownedItems: details}})
        // const product = await stripe.products.retrieve(item.product_id)
        // console.log(product.name)
    });
    return NextResponse.json({message: "reee"}, {status: 200})
}

export async function GET(request){
    const authToken = await getAuthToken(request)
    const userDoc = await User.findById(authToken._id)
    const userOwnedItems = userDoc.ownedItems
    const ItemsData = []
    for(let i = 0; i< userOwnedItems.length; i++){
        const product = await Product.findOne({productId: userOwnedItems[i].product_id}).select("productName productImage productCost productType")
        ItemsData.push({product:product, quantity: userOwnedItems[i].quantity, order_date: userOwnedItems[i].order_date})

    }
    return NextResponse.json({ItemsData: ItemsData}, {status: 200})
}

