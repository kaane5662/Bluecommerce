const nodemailer = require("nodemailer")
import User from "@/src/app/models/User"
import bcryptjs from "bcryptjs"
import { NextResponse, NextRequest } from "next/server"
const jwt = require("jsonwebtoken")

export default async function sendEmail({email, emailType, userId}){
    if(!userId) return NextResponse.json({message:"No user id"}, {status: 500})
    // const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    // const updatedUser = await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyExpiration: Date.now()+1800000})
    
    var transport = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL, //example of generated by Mailtrap 
        pass: process.env.PASSWORD //example of generated by Mailtrap 
      }
    });

    if(emailType == "VERIFY"){
      const code = Math.floor(Math.random()*10000).toString()
      const salt = await bcryptjs.genSalt(10)
      const hashedCode = await bcryptjs.hash(code, salt)
      const token = jwt.sign({_id: userId, hashedCode}, process.env.SECRET_JWT, {expiresIn: 600000})
      const setUserVerificationCode = await User.findByIdAndUpdate(userId, {verifyCode: hashedCode, verifyToken: token})

      console.log("Hello from emailer")
      const info = await transport.sendMail({
        from: 'kaane0169@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Verify your email", // Subject line
        html: `
        
        <h1 style = "font-weight: bold">${code}</h1>
        `, // html body
      });
      
    }
    
    if(emailType == "RESET"){
      console.log("This is reset")
      const resetToken = jwt.sign({userId, email}, process.env.SECRET_JWT, {expiresIn: "300000ms"})
      console.log("Email from emailer "+email)

      const info = await transport.sendMail({
        from: "kaane0169@gmail.com",
        to: email,
        subject: "Reset your password",
        
        html:`
        <a href = "${process.env.DOMAIN}/resetpassword?=${resetToken}" style = "font-weight: semi-bold">Click here to Reset your Password</a>
        `,
      })
    }
    
}