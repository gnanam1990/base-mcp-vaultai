# VaultAI

AI-selected vault strategy proposals for Base DeFi.

**Status:** Vault console MVP foundation

Let users inspect deposits, strategy allocations, risk signals, and user-approved rebalance proposals before vault automation.

## Current MVP
- Base industrial-neon UI theme from the shared suite prompt.
- Responsive dashboard with wallet/action controls, live vault metrics, workflow, MCP tools, and record surface.
- File-backed vault registry with creation, x402 quote lookup, paid strategy quote execution, and receipt recording.
- Demo x402 flow that returns `402 Payment Required` until a payment header or demo payment approval is provided.
- Product status API at `/api/vaultai/status`.
- MCP-compatible JSON endpoint at `/api/mcp/vaultai`.
- Smoke checks for creation, listing, quote, unpaid lock, paid unlock, receipt, and MCP quote.

## API Surface
- `GET /api/vaultai/vaults` lists active vaults.
- `POST /api/vaultai/vaults` creates a vault.
- `GET /api/vaultai/vaults/:slug/quote` returns the x402 payment requirement.
- `POST /api/vaultai/vaults/:slug/run` executes the paid strategy quote after payment verification and records a receipt.
- `GET /api/vaultai/status` returns dashboard data and stats.
- `GET /api/mcp/vaultai` lists MCP tools.
- `POST /api/mcp/vaultai` runs MVP tools for discovery, quote preparation, and stats.

## Local Development
```bash
npm install
npm run dev -- -p 3008
```

Open `http://127.0.0.1:3008`.

Local data is written to `.data/vaultai-db.json`. Override it with `VAULTAI_DATA_FILE` for isolated runs.

## Environment
Copy `.env.example` to `.env.local` when you need custom payment behavior.

- `VAULTAI_PAYMENT_MODE=demo` accepts the `x-demo-payment: accepted` header for local demos.
- `VAULTAI_PAYMENT_MODE=strict` requires a real `x-payment` header and facilitator configuration.
- `X402_FACILITATOR_URL` points to a facilitator that can verify and settle x402 payments.
- `X402_RECEIVING_ADDRESS` sets the payout address for paid runs.

## Checks
```bash
npm run typecheck
npm run build
npm run test:smoke
```

## Next Build Slice
Add vault share accounting, adapter allowlists, and user-approved deposit/rebalance calls.

## License
MIT
