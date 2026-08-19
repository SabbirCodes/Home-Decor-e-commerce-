import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { auth } from "@/lib/auth";

async function getOrCreateSettings() {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
}

export async function GET() {
  try {
    await connectDB();
    const settings = await getOrCreateSettings();
    return NextResponse.json({ settings });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to load settings." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await req.json();
    const { siteName, email, phone, location, locationMapUrl, hours } = body;

    await connectDB();
    const settings = await getOrCreateSettings();

    if (typeof siteName === "string") settings.siteName = siteName;
    if (typeof email === "string") settings.email = email;
    if (typeof phone === "string") settings.phone = phone;
    if (typeof location === "string") settings.location = location;
    if (typeof locationMapUrl === "string") settings.locationMapUrl = locationMapUrl;
    if (typeof hours === "string") settings.hours = hours;

    await settings.save();

    return NextResponse.json({ settings });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update settings." }, { status: 500 });
  }
}