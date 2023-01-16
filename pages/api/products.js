import { connectDatabase } from "@/lib/mongoose";
import Product from "@/models/Product";

const handle = async (req, res) => {
    await connectDatabase();
    res.json(await Product.find().exec());
};

export default handle;
