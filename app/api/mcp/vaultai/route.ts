import { NextResponse } from "next/server";
import projectData from "@/lib/project-data.json";
import { findItem, listItems, projectStats } from "@/lib/mvp-store";

const tools = [
  ...projectData.tools,
  "list_vaults",
  "get_vault_quote",
  "prepare_vault_run",
  "get_vaultai_stats",
];

export function GET() {
  return NextResponse.json({
    server: "vaultai-mcp",
    version: "0.1.0",
    tools,
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    tool?: string;
    arguments?: {
      query?: string;
      slug?: string;
    };
  };

  if (projectData.tools.includes(body.tool || "") || body.tool === "list_vaults") {
    const query = body.arguments?.query?.toLowerCase() ?? "";
    const results = listItems().filter((item) =>
      [item.name, item.descriptor, item.detail].some((value) => value.toLowerCase().includes(query)),
    );
    return NextResponse.json({ data: results });
  }

  switch (body.tool) {
    case "get_vault_quote": {
      const item = body.arguments?.slug ? findItem(body.arguments.slug) : undefined;
      if (!item) {
        return NextResponse.json({ error: "vault_not_found" }, { status: 404 });
      }
      return NextResponse.json({
        data: {
          slug: item.slug,
          priceUsdc: item.priceUsdc,
          resource: `/api/vaultai/vaults/${item.slug}/run`,
          network: process.env.VAULTAI_X402_NETWORK || "eip155:84532",
        },
      });
    }
    case "prepare_vault_run": {
      const item = body.arguments?.slug ? findItem(body.arguments.slug) : undefined;
      if (!item) {
        return NextResponse.json({ error: "vault_not_found" }, { status: 404 });
      }
      return NextResponse.json({
        data: {
          method: "POST",
          resource: `/api/vaultai/vaults/${item.slug}/run`,
          maxPayment: `${item.priceUsdc.toFixed(3)} USDC`,
        },
      });
    }
    case "get_vaultai_stats":
      return NextResponse.json({ data: projectStats() });
    default:
      return NextResponse.json({ error: "unknown_tool" }, { status: 400 });
  }
}
