import { NextResponse } from "next/server";
import mongoose from "mongoose";

const uri =
  "mongodb+srv://istaprasadpatra:Ista31@cluster0.j3q5e0x.mongodb.net/stock?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB using mongoose
export async function connectToDatabase() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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

const Inventory = mongoose.model("Inventory", inventorySchema);

export async function GET(request) {
  try {
    const allProducts = await Inventory.find({});
    return NextResponse.json({ allProducts });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const product = await Inventory.create(body);
    console.log(product)
    return NextResponse.json({ product, ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export { Inventory };
