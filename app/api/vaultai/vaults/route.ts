import { NextResponse } from "next/server";
import { createItem, listItems } from "@/lib/mvp-store";

function numeric(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function GET() {
  return NextResponse.json({ data: listItems() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    descriptor?: string;
    detail?: string;
    priceUsdc?: number | string;
    payload?: Record<string, unknown>;
  };

  const item = createItem({
    name: body.name?.trim() || "Untitled Vault",
    descriptor: body.descriptor?.trim() || "35% allocation",
    detail: body.detail?.trim() || "8.9% APY",
    priceUsdc: numeric(body.priceUsdc, 0.1),
    payload: body.payload || {"allocation":"USDC lending basket","targetApy":"8.9%","risk":"medium"},
  });

  return NextResponse.json({ data: item }, { status: 201 });
}
