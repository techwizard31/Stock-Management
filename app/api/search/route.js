import { Inventory } from "../mongo/route";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../mongo/route";

export async function GET(request) {
  await connectToDatabase();
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const allProducts = await Inventory.find({
      slug: { $regex: slug, $options: "i" },
    });
    return NextResponse.json({ allProducts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
