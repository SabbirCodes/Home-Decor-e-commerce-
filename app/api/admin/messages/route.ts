import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await connectDB();
    const [messages, unreadCount] = await Promise.all([
      ContactMessage.find().sort({ createdAt: -1 }).lean(),
      ContactMessage.countDocuments({ read: false }),
    ]);

    return NextResponse.json({ messages, unreadCount });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load messages." }, { status: 500 });
  }
}