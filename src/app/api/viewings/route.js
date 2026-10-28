import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "siteData.json");

function readSiteData() {
  try {
    const raw = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    return { viewings: [] };
  }
}

function writeSiteData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    return false;
  }
}

export async function GET() {
  const data = readSiteData();
  return NextResponse.json({ success: true, viewings: data.viewings || [] });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const currentData = readSiteData();

    if (!currentData.viewings) {
      currentData.viewings = [];
    }

    const newViewing = {
      id: `view-${Date.now()}`,
      clientName: body.clientName || body.fullName || "Anonymous Client",
      phone: body.phone || "",
      propertyType: body.propertyType || "General Property",
      preferredDate: body.preferredDate || body.date || "Next Available",
      timeSlot: body.timeSlot || "Morning",
      status: "Pending",
      notes: body.notes || body.message || "",
      createdAt: new Date().toISOString(),
    };

    currentData.viewings.unshift(newViewing);
    writeSiteData(currentData);

    return NextResponse.json({ success: true, viewing: newViewing });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id, status } = await request.json();
    const currentData = readSiteData();

    if (!currentData.viewings) {
      return NextResponse.json({ success: false, error: "No viewings found" }, { status: 404 });
    }

    const index = currentData.viewings.findIndex((v) => v.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Viewing not found" }, { status: 404 });
    }

    currentData.viewings[index].status = status;
    writeSiteData(currentData);

    return NextResponse.json({ success: true, viewing: currentData.viewings[index] });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
