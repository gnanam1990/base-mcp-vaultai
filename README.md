# VaultAI

AI-selected vault strategy proposals for Base DeFi.

**Status:** Vault console MVP foundation

Let users inspect deposits, strategy allocations, risk signals, and user-approved rebalance proposals before vault automation.

## Current MVP
- Base industrial-neon UI theme from the shared suite prompt.
- Responsive dashboard with wallet/action controls, metrics, workflow, MCP tools, and live record surface.
- Product status API at `/api/vaultai/status`.
- Smoke checks for required dashboard data.

## Local Development
```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Checks
```bash
npm run typecheck
npm run build
npm run test:smoke
```

## Next Build Slice
Wire the mocked dashboard data into real Base Sepolia reads, x402 payment verification, or contract prepare endpoints depending on this product's launch path.

## License
MIT
