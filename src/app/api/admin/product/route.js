import connectMongoDB from "@/app/config/config";
import Product from "@/app/models/productModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.json();
  connectMongoDB();

  try {
    const product = await Product.findOne({ title: formData.title });

    if (product) {
      return NextResponse.json({
        status: 400,
        message: "Product with this title already exists.",
        error: true,
      });
    }

    const newProduct = await Product.create({
      title: formData.title,
      price: formData.price,
      qty: formData.qty,
      description: formData.description,
    });

    return NextResponse.json({
      status: 200,
      message: "Product added successfully",
      success: true,
      product: newProduct,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error adding product: " + error.message,
      error: error,
    });
  }
}

export async function GET() {
  connectMongoDB();
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ status: 200, data: products });
  } catch (error) {
    return NextResponse.json({ status: 500, error: error });
  }
}

export async function DELETE(req) {
  connectMongoDB();
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({
        status: 400,
        message: "Product ID is required",
      });
    }
    const isDeleted = await Product.findByIdAndDelete({ _id: id });
    if (!isDeleted) {
      return NextResponse.json({ status: 404, message: "Product not found" });
    }
    return NextResponse.json({
      status: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error: error });
  }
}
