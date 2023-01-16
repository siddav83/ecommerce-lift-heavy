import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    picture: String,
    weight: String,
});

const Product =
    mongoose.models?.Product || mongoose.model("Product", productSchema);

export default Product;
