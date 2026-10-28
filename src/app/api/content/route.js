import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "siteData.json");

function readSiteData() {
  try {
    const raw = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading siteData.json:", err);
    return {
      villas: [],
      land: [],
      apartments: [],
      bnbs: [],
      construction: [],
      engineers: [],
      heroSlides: [],
      viewings: [],
    };
  }
}

function writeSiteData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing siteData.json:", err);
    return false;
  }
}

// GET all site content or specific collection
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get("collection");
  const data = readSiteData();

  if (collection) {
    return NextResponse.json({
      success: true,
      data: data[collection] || [],
    });
  }

  return NextResponse.json({ success: true, data });
}

// POST: Add new item to a collection or perform bulk action
export async function POST(request) {
  try {
    const body = await request.json();
    const { collection, item, action, items, key, value } = body;

    const currentData = readSiteData();

    // Bulk / collection replace action
    if (action === "replaceCollection" && collection && Array.isArray(items)) {
      currentData[collection] = items;
      writeSiteData(currentData);
      return NextResponse.json({ success: true, items });
    }

    if (action === "setKey" && key && value !== undefined) {
      currentData[key] = value;
      writeSiteData(currentData);
      return NextResponse.json({ success: true, value });
    }

    if (!collection || !item) {
      return NextResponse.json(
        { success: false, error: "Collection name and item are required" },
        { status: 400 }
      );
    }

    if (!currentData[collection]) {
      currentData[collection] = [];
    }

    // Auto-generate ID if not provided
    const newItem = {
      ...item,
      id: item.id || `${collection}-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    currentData[collection].unshift(newItem);
    writeSiteData(currentData);

    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PUT: Update existing item in a collection
export async function PUT(request) {
  try {
    const body = await request.json();
    const { collection, item } = body;

    if (!collection || !item || !item.id) {
      return NextResponse.json(
        { success: false, error: "Collection and item with valid ID are required" },
        { status: 400 }
      );
    }

    const currentData = readSiteData();
    if (!currentData[collection]) {
      return NextResponse.json(
        { success: false, error: "Collection does not exist" },
        { status: 404 }
      );
    }

    const index = currentData[collection].findIndex((i) => i.id === item.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Item not found in collection" },
        { status: 404 }
      );
    }

    currentData[collection][index] = {
      ...currentData[collection][index],
      ...item,
      updatedAt: new Date().toISOString(),
    };

    writeSiteData(currentData);

    return NextResponse.json({
      success: true,
      item: currentData[collection][index],
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE: Remove an item by ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get("collection");
    const id = searchParams.get("id");

    if (!collection || !id) {
      return NextResponse.json(
        { success: false, error: "Collection and id parameters are required" },
        { status: 400 }
      );
    }

    const currentData = readSiteData();
    if (!currentData[collection]) {
      return NextResponse.json(
        { success: false, error: "Collection not found" },
        { status: 404 }
      );
    }

    currentData[collection] = currentData[collection].filter((i) => i.id !== id);
    writeSiteData(currentData);

    return NextResponse.json({ success: true, message: "Item deleted successfully" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
