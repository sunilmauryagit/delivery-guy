import connectMongoDB from "@/app/config/config";
import { encryptValue } from "@/app/controllers/hashing";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { generateFromEmail } from "unique-username-generator";

export async function POST(req, res) {
  const formData = await req.json();
  connectMongoDB();

  try {
    const user = await User.findOne({ email: formData.email });

    if (user) {
      return NextResponse.json({
        status: 400,
        message: "User with this email already exists",
        error: true,
      });
    }

    // hash password
    const randomKey = randomBytes(6).toString("hex");
    const hashedPassword = encryptValue(formData.password, randomKey);

    // generate username from email
    const genUsername = generateFromEmail(formData.email, 3);

    const newUser = await User.create({
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: genUsername,
      email: formData.email,
      password: hashedPassword,
      token: randomKey,
    });

    return NextResponse.json({
      status: 200,
      message: "User created successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error creating user",
      error: error,
    });
  }
}
