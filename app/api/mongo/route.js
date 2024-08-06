import { NextResponse } from "next/server";
import mongoose from "mongoose";

const uri =process.env.MONGO_URI

// Connect to MongoDB using mongoose
export async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}


const Schema = mongoose.Schema;
const inventorySchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Inventory = mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);

export async function GET(request) {
  await connectToDatabase();
  try {
    const allProducts = await Inventory.find({});
    return NextResponse.json({ allProducts },{status:200})
  } catch (error) {
    return NextResponse.json({ error: error.message },{status:400})
  }
}

export async function POST(request) {
  await connectToDatabase();
  try {
    const data = await request.json();
    console.log(data)
    const product = await Inventory.create(data);
    return NextResponse.json({ product, ok: true },{status:200})
  } catch (error) {
    return NextResponse.json({ error: error.message },{status:400})
  }
}

export { Inventory };
