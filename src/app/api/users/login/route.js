import { connectToDb } from "@/utils/database";
import bcryptjs from "bcryptjs";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connectToDb();
export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    //debugger;
    const user = await User.findOne({ email });
    //console.log(user);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 400,
      });
    }

    const isValid = await bcryptjs.compare(password, user.password);
    //console.log(isValid);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid Password" }), {
        status: 400,
      });
    }

    const data = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //console.log(data);
    //create JWT Token
    const token = await jwt.sign(data, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });
    //console.log(token);
    //console.log(response);
    cookies().set("token", token, { httpOnly: true });

    return new Response(
      JSON.stringify({ message: "Login successful", success: true }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
