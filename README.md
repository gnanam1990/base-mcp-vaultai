# VaultAI

> A Next.js MCP-style server and console for vault strategy proposals on Base, gated by x402 payments.

![License: MIT](https://img.shields.io/badge/license-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Overview

VaultAI is a Base-themed MVP that pairs a vault console UI with an HTTP API and an MCP-compatible JSON endpoint. It lets you inspect vault strategy proposals (allocations, risk signals, target APY) and execute paid strategy-quote runs. Paid runs are gated by the x402 payment protocol: a request returns `402 Payment Required` until a valid payment is supplied, after which a receipt is recorded. State is persisted to a local JSON file, so the project runs end to end without external infrastructure.

## Features

- Vault registry backed by a local JSON store: list, create, and stat vaults.
- x402 payment gating on paid runs, returning `402 Payment Required` with an `accepts` requirement until payment is provided.
- Two payment modes: `demo` accepts an `x-demo-payment` header for local testing; `strict` requires a real `x-payment` header verified and settled through an x402 facilitator.
- Receipt recording for each paid run (amount, network, mode, payload hash, optional facilitator reference) and a `payment-response` header on success.
- MCP-style JSON endpoint exposing discovery, quote, run-preparation, and stats tools.
- Server-rendered console (Next.js App Router) showing vault metrics, workflow, MCP tools, and records.
- Smoke test that exercises status, create, list, quote, unpaid lock (402), paid unlock, and an MCP tool call.

## Tech stack

- Next.js 16 (App Router) and React 19
- TypeScript
- lucide-react (icons)
- Node.js built-ins (`fs`, `crypto`) for the file-backed store and payment hashing

## Getting started

### Prerequisites

- Node.js (a version supported by Next.js 16; Node 20+ recommended)
- npm

### Installation

```bash
npm install
```

### Configuration

Copy `.env.example` to `.env.local` and set values as needed. All variables are optional for the default `demo` flow; the server falls back to sane defaults.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BASE_CHAIN_ID` | Base chain id exposed to the client. |
| `BASE_RPC_URL` | Base RPC endpoint. |
| `BASE_ACCOUNT_CLIENT_ID` | Base Account client identifier. |
| `BASE_MCP_URL` | Base MCP endpoint URL. |
| `X402_FACILITATOR_URL` | x402 facilitator base URL used to verify and settle payments in `strict` mode. |
| `X402_RECEIVING_ADDRESS` | Payout address used in payment requirements. |
| `X402_DEFAULT_NETWORK` | Default x402 network label. |
| `VAULTAI_PAYMENT_MODE` | `demo` (default) accepts the demo payment header; `strict` requires a real `x-payment` header and a configured facilitator. |
| `VAULTAI_X402_NETWORK` | Network identifier reported in payment requirements (default `eip155:8453`). |
| `VAULTAI_DATA_FILE` | Override path for the JSON store (useful for isolated runs). |
| `DATABASE_URL` | Reserved for future persistence. |
| `REDIS_URL` | Reserved for future caching. |
| `NEXT_PUBLIC_APP_URL` | Public app URL. |

Never commit real secret values.

### Running

```bash
npm run dev -- -p 3008
```

Open `http://127.0.0.1:3008`.

Local data is written to `.data/vaultai-db.json` (or `/tmp/vaultai-db.json` on Vercel). Override the path with `VAULTAI_DATA_FILE`.

## Usage

### HTTP API

- `GET /api/vaultai/vaults` — list active vaults.
- `POST /api/vaultai/vaults` — create a vault (`name`, `descriptor`, `detail`, `priceUsdc`, `payload`).
- `GET /api/vaultai/vaults/:slug/quote` — return the vault and its x402 payment requirement.
- `POST /api/vaultai/vaults/:slug/run` — execute the paid strategy quote after payment verification, returning the result and a receipt. Returns `402` until paid.
- `GET /api/vaultai/status` — dashboard data and aggregate stats.

### MCP-style endpoint

- `GET /api/mcp/vaultai` — list available tools.
- `POST /api/mcp/vaultai` — invoke a tool. Supported tools include `list_vaults`, `get_vault_quote`, `prepare_vault_run`, and `get_vaultai_stats`.

Example: request a paid run in demo mode.

```bash
# Returns 402 without a payment
curl -X POST http://127.0.0.1:3008/api/vaultai/vaults/<slug>/run

# Unlocks with the demo payment header (when VAULTAI_PAYMENT_MODE=demo)
curl -X POST http://127.0.0.1:3008/api/vaultai/vaults/<slug>/run \
  -H "x-demo-payment: accepted"
```

## Testing

The smoke test runs against a live dev server and checks status, vault creation, listing, quoting, the unpaid `402` lock, the paid unlock, and an MCP tool call.

```bash
# In one terminal
npm run dev -- -p 3008

# In another terminal
npm run test:smoke
```

It targets `http://127.0.0.1:3008` by default; override with `VAULTAI_BASE_URL`.

Type checking and a production build:

```bash
npm run typecheck
npm run build
```

## Project structure

```
app/
  api/
    mcp/vaultai/route.ts          MCP-style tool endpoint
    vaultai/status/route.ts       Dashboard data + stats
    vaultai/vaults/route.ts       List / create vaults
    vaultai/vaults/[slug]/quote   x402 payment requirement
    vaultai/vaults/[slug]/run     Paid run + receipt
  layout.tsx, page.tsx            Console UI
lib/
  mvp-store.ts                    File-backed JSON store + stats
  mvp-payment.ts                  x402 requirements + verification
  project-data.json, types.ts     Seed data and shared types
scripts/smoke-test.mjs            End-to-end smoke test
docs/                             Architecture, roadmap, UI notes
```

## Status

MVP foundation. The vault registry, x402 payment gating (demo and facilitator modes), receipt recording, MCP-style endpoint, and console UI are implemented and exercised by the smoke test. Persistence is a local JSON file rather than a database; the seed strategy data and dashboard metrics are illustrative. `strict` mode depends on an external x402 facilitator that must be configured. No on-chain contracts are deployed by this repository.

## License

MIT. See [LICENSE](LICENSE).
