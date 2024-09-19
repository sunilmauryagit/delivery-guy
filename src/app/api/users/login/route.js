import connectMongoDB from "@/app/config/config";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { encryptValue } from "@/app/controllers/hashing";
import { createSecretKey } from "node:crypto";

export async function POST(req, res) {
  const formData = await req.json();
  connectMongoDB();

  // Check if user exists and password matches hashed version in the database.
  try {
    // Get user by email from database
    const user = await User.findOne({
      email: formData.email,
    });

    if (user) {
      const hashedPassword = encryptValue(formData.password, user.token);

      if (hashedPassword === user.password) {
        // JWT cookies save to get user on all pages
        const payload = {
          id: user._id,
          firstName: user.firstName,
          username: user.username,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
        };

        // JWT token for authentication on each request
        const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
        const loginToken = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .sign(secretKey);

        // Set JWT cookie
        cookies().set("_token", loginToken);

        return NextResponse.json({
          status: 200,
          message: "Logged In successfully.",
          user,
        });
      }
    }

    // If user not found or password does not match, return error.
    return NextResponse.json({
      status: 401,
      message: "Invalid email or password.",
      error: true,
    });
  } catch (error) {
    // If any error occurs during the login process, return error.
    return NextResponse.json({
      status: 500,
      message: "Error login.",
      error: error,
    });
  }
}
