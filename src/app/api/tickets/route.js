import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "siteData.json");

function readSiteData() {
  try {
    const raw = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    return { tickets: [] };
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

// GET all tickets or by status
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const data = readSiteData();
  let tickets = data.tickets || [];

  if (status && status !== "all") {
    tickets = tickets.filter((t) => t.status === status);
  }

  return NextResponse.json({ success: true, tickets });
}

// POST: Create ticket from Contact Us form or Admin
export async function POST(request) {
  try {
    const body = await request.json();
    const currentData = readSiteData();

    if (!currentData.tickets) {
      currentData.tickets = [];
    }

    const ticketNumber = Math.floor(1000 + Math.random() * 9000);
    const newTicket = {
      id: `TIC-${ticketNumber}`,
      clientName: body.name || body.clientName || "Anonymous Client",
      email: body.email || "",
      phone: body.phone || "",
      interest: body.interest || "General Inquiry",
      preferredLocation: body.preferredLocation || body.location || "Westlands & Lavington",
      subject: body.subject || `${body.interest || "Inquiry"} - ${body.name || "Client"}`,
      message: body.message || body.notes || "",
      status: "Open",
      priority: body.priority || "High",
      createdAt: new Date().toISOString(),
      replies: [],
    };

    currentData.tickets.unshift(newTicket);
    writeSiteData(currentData);

    return NextResponse.json({
      success: true,
      ticket: newTicket,
      message: "Ticket created successfully",
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PATCH: Update ticket status, priority, or add response
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status, priority, reply, adminNotes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Ticket ID is required" },
        { status: 400 }
      );
    }

    const currentData = readSiteData();
    const tickets = currentData.tickets || [];
    const index = tickets.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Ticket not found" },
        { status: 404 }
      );
    }

    if (status) tickets[index].status = status;
    if (priority) tickets[index].priority = priority;
    if (adminNotes !== undefined) tickets[index].adminNotes = adminNotes;

    if (reply) {
      if (!tickets[index].replies) tickets[index].replies = [];
      tickets[index].replies.push({
        sender: reply.sender || "Joseph Simiyu Kefa",
        text: reply.text || reply,
        date: new Date().toISOString(),
      });
      // Auto-advance status to In Progress if currently Open
      if (tickets[index].status === "Open") {
        tickets[index].status = "In Progress";
      }
    }

    tickets[index].updatedAt = new Date().toISOString();
    writeSiteData(currentData);

    return NextResponse.json({
      success: true,
      ticket: tickets[index],
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE: Delete ticket
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Ticket ID required" }, { status: 400 });
    }

    const currentData = readSiteData();
    currentData.tickets = (currentData.tickets || []).filter((t) => t.id !== id);
    writeSiteData(currentData);

    return NextResponse.json({ success: true, message: "Ticket deleted successfully" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
