import { connectToDb } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectToDb();

export const POST = async (req) => {
  try {
    const { email, password } = await req.json();

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await User.findOneAndUpdate({ email: email }, { password: hashedPassword });

    return NextResponse.json({
      message: "Password has been changed",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
