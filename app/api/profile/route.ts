import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import User from "@/models/User";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  await connectDB()
  const user = await User.findById(session.user.id).select("-password");
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

  return NextResponse.json({ user });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const body = await req.json();
    const { name, address } = body;

    const update: Record<string, any> = {};
    if (typeof name === "string" && name.trim()) update.name = name.trim();
    if (address && typeof address === "object") update.address = address;

    await connectDB();
    const user = await User.findByIdAndUpdate(session.user.id, update, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });
    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}