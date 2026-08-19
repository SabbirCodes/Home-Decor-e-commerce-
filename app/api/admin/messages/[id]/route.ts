import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import { auth } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const { read } = await req.json();

    await connectDB();
    const message = await ContactMessage.findByIdAndUpdate(id, { read: Boolean(read) }, { new: true });
    if (!message) return NextResponse.json({ error: "Message not found." }, { status: 404 });

    return NextResponse.json({ message });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update message." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    await ContactMessage.findByIdAndDelete(id);

    return NextResponse.json({ message: "Message deleted." });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete message." }, { status: 500 });
  }
}