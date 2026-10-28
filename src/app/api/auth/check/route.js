import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("peak_admin_auth");

  if (auth && auth.value === "true") {
    return NextResponse.json({
      authenticated: true,
      user: {
        name: "Joseph Simiyu Kefa",
        email: "admin@peakhousing.co.ke",
        role: "Managing Director & Super Admin",
      },
    });
  }

  return NextResponse.json({ authenticated: false });
}
