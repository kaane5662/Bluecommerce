import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  
} from "@stripe/react-stripe-js";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const stripe2 = loadStripe("pk_test_51NY8YkAYEJxKPF2BQeJPWxiRnZoGeUAtXsYZARA36w0q6EdpyzUDQpR0UjvoB9O2T47JslaGDJaTLj6WKk2i1T6A00A3TZZFJo")
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [PaymentMeta, setPaymentMeta] = useState(null);

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");



    useEffect(() => {
        if (!stripe) {
            return;
        }

        

        if (!clientSecret) {
            return;
        }

        

        // console.log("jiergjeroeijoji ogejgoierj ero jgoe")

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent} ) => {

            setPaymentMeta(paymentIntent.metadata)
            switch (paymentIntent.status) {
                case "succeeded":
                setMessage("Payment succeeded!");
                break;
                case "processing":
                setMessage("Your payment is processing.");
                break;
                case "requires_payment_method":
                setMessage("Your payment was not successful, please try again.");
                break;
                default:
                setMessage("Something went wrong.");
                break;
            }
        });

        

        
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:3000/login",
        },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
        } else {
        setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <form id="payment-form" className="p-40 flex flex-col font-ubuntu gap-8" onSubmit={handleSubmit}>
        <h1 className="text-3xl">Payment Form</h1>
        <h1 className="text-2xl font-bold">{PaymentMeta?.productName}</h1>
        <h1 className="text-lg font-bold">${PaymentMeta?.totalCost}</h1>
        <h1 className="text-md">x {PaymentMeta?.quantity}</h1>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button className="bg-theme-2 w-[250px] text-xl rounded-md p-4" disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
            </span>
        </button>
        {/* Show any error or success messages */}
        {message && <h3 className=" text-theme-1 text-lg">{message}</h3>}
        </form>
    );
}