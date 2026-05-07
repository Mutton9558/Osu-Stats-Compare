import { getAuthToken } from "@/lib/getAuth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tokenData = await getAuthToken();
    return NextResponse.json(tokenData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch token" }, { status: 500 });
  }
}