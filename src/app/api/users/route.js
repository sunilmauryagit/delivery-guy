import connectMongoDB from "@/app/config/config";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "Getting User" });
}

export function PUT() {
  return NextResponse.json({ status: "Updating User" });
}

export function DELETE() {
  return NextResponse.json({ status: "Deleting User" });
}
