"use client"

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
  
} from "@stripe/react-stripe-js";

import CheckoutForm from "../../components/CheckoutForm";
// import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
console.log(process.env.STRIPE_KEY)
const stripePromise = loadStripe("pk_test_51NY8YkAYEJxKPF2BQeJPWxiRnZoGeUAtXsYZARA36w0q6EdpyzUDQpR0UjvoB9O2T47JslaGDJaTLj6WKk2i1T6A00A3TZZFJo");

export default function CheckOut({params}){
    
    
    const clientSecret = params.id
    // console.log(clientSecret)
    
    
    const appearance = {
        theme: 'stripe',
      };
    const options = {
      clientSecret,
      appearance,
    };
  
    return (
      <div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    );

}