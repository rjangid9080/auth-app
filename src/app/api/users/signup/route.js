import { connectToDb } from "@/utils/database";
import User from "@/models/user";
import bcryptjs from "bcryptjs";

connectToDb();

export const POST = async (req) => {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return new Response(JSON.stringify({ error: "User Already Exists" }), {
        status: 400,
      });
    }
    //hash password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    
    const savedUser = await newUser.save();

    return new Response(
      JSON.stringify({
        message: "User Created Successfully",
        success: true,
        savedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
