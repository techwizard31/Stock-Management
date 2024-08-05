import { Inventory } from "../mongo/route";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../mongo/route";

export async function GET(request) {
    const { slug } = request.body;
    try {
        await connectToDatabase();
      const allProducts = await Inventory.find({
        slug: { $regex: slug, $options: "i" }
      });
      return NextResponse.json(allProducts);
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  } 

