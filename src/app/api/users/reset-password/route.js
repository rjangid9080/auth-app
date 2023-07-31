import { connectToDb } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/mailer";

connectToDb();
export const POST = async (req) => {
  try {
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found", success: false });
    }

    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json(
      {
        message: "Reset Link has been sent Successfully on your Email.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
