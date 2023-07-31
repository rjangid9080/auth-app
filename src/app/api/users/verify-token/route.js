import { connectToDb } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

connectToDb();

export const POST = async (req) => {
  try {
    const { token, type } = await req.json();
    if (type === "RESET") {
      const user = await User.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
      });
      console.log(user);
      if (!user) {
        return NextResponse.json({
          error: "Reset Token Expired",
          success: false,
        });
      }
      // user.forgotPasswordToken = undefined;
      // user.forgotPasswordTokenExpiry = undefined;
      // await user.save();

      return NextResponse.json({
        message: "Reset Token Verified",
        success: true,
        email: user.email,
      });
    } else if (type === "VERIFY") {
      const user = await User.findOne({
        verifyToken: token,
        verifyTokenExpiry: { $gt: Date.now() },
      });

      if (!user) {
        return NextResponse.json({
          error: "Verify Token Expired",
          success: false,
        });
      }

      user.isVerfied = true;
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
      await user.save();

      return NextResponse.json({
        message: "Email verified successfully",
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
