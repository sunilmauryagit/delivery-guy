import connectMongoDB from "@/app/config/config";
import User from "@/app/models/userModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const userId = await req.json();
  connectMongoDB();

  // Check if user exists and password matches hashed version in the database.
  try {
    // Get user by email from database
    const user = await User.findOne({
      username: userId.username,
    });

    if (user) {
      return NextResponse.json({
        status: 200,
        message: "User Found.",
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isActive: user.isActive,
        },
      });
    }

    // If user not found or password does not match, return error.
    return NextResponse.json({
      status: 404,
      message: "User coud not be found.",
      error: true,
    });
  } catch (error) {
    // If any error occurs during the login process, return error.
    return NextResponse.json({
      status: 500,
      message: "Something went wrong. Please try sometimes.",
      error: error,
    });
  }
}

export async function GET() {
  try {
    // Get user from token
    const getCookies = cookies();
    const token = getCookies.get("_token");

    if (token.value) {
      const userData = jwt.verify(token.value, process.env.SECRET_KEY);

      return NextResponse.json({
        status: 200,
        message: "Current User Details.",
        data: userData,
      });
    }

    return NextResponse.json({
      status: 404,
      message: "Please login first to access your account.",
      error: true,
    });
  } catch (error) {
    // If any error occurs during the login process, return error.
    return NextResponse.json({
      status: 500,
      message: "Something went wrong. Please try again sometimes.",
      error: true,
    });
  }
}
