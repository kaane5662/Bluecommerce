import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        required: true,
        unique: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    isVerified: {
        default: false,
        type: Boolean
    },
    verifyToken: {
        default: null,
        type: String
    },
    verifyExpiration: {
        default: Date.now(),
        type: Date
    },
    verifyCode: {
        default: "",
        type: String
    },
    cart: {
        default: [],
        type: Array
    },
    ownedItems: {
        default: [],
        type: Array
    },
    stripe_customer_id: {
        default: null,
        type: String
    },
    stripe_account_id: {
        default: null, 
        type: String
    }
})

const User = mongoose.models.Users || mongoose.model("Users", UserSchema)
module.exports = User