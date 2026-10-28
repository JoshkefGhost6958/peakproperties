import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const cleanUser = (username || "").trim().toLowerCase();
    const cleanPass = (password || "").trim();

    // Check credentials (supports admin@peakhousing.co.ke or admin)
    const validUsers = ["admin", "admin@peakhousing.co.ke", "joseph@peakhousing.co.ke"];
    const validPasswords = ["admin123", "peak2026", "joseph2026"];

    if (validUsers.includes(cleanUser) && validPasswords.includes(cleanPass)) {
      const response = NextResponse.json({
        success: true,
        user: {
          name: "Joseph Simiyu Kefa",
          email: "admin@peakhousing.co.ke",
          role: "Managing Director & Super Admin",
        },
      });

      // Set auth cookie
      response.cookies.set("peak_admin_auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
