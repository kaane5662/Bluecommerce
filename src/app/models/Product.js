const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productCost: {
        type: Number,
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    productViews: {
        type: Number,
        required: true,
        default: 0
    },
    productLikes: {
        type: Number,
        required: true,
        default: 0
    },
    productTags: {
        type: Array,
        required: true
    },
    stripe_account_id: {
        type: String,
        required: true
    },
    seller_id: {
        type: String,
        required: true
    }

})

const Product = mongoose.models.Products || mongoose.model("Products", UserSchema)
export default Product