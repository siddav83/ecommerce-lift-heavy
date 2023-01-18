import { connectDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

export const findAllProducts = async () => {
    return await Product.find().exec();
};

const handle = async (req, res) => {
    await connectDatabase();
    res.json(findAllProducts);
};

export default handle;
