import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function GET() {
  try {
    cookies().delete("_token");
    return NextResponse.json({ status: 200, body: "Logged Out Successfully" });
  } catch (error) {
    return NextResponse.json({ status: 500, body: "Error logging out" });
  }
}
