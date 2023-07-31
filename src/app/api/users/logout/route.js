import { NextResponse } from "next/server";

export const GET = () => {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });
    
    return response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
