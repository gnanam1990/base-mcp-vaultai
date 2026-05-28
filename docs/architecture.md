# VaultAI Architecture

## Product Role
VaultAI provides an ERC-4626-style vault interface where strategy changes are recommended by AI and approved through transparent onchain flows.

## System Shape
- Frontend app: Next.js, TypeScript, Tailwind, shadcn-style components, responsive dashboards.
- API layer: Node/TypeScript endpoints for product reads, prepare flows, analytics, and x402-gated access.
- Base layer: Base Account for user approval and Base MCP for assistant-driven actions.
- Payment layer: x402 for paid API/content/service access using USDC on Base or Base Sepolia.
- Data layer: PostgreSQL for durable product state and Redis for cache/session/rate-limit workloads.
- Contracts: Solidity/Foundry only where the module needs onchain state or settlement logic.

## Main Modules
- Vault deposit and withdraw UI with position and share accounting.
- Strategy adapter architecture for Morpho, Moonwell, Aerodrome, or future integrations.
- AI allocation proposal engine based on yield and risk inputs.
- User-approved rebalance prepare endpoints.
- Vault analytics for TVL, APY, allocation, and proposal history.

## Data Model
- Vault shares, deposits, withdrawals, strategy allocations, and proposal states.
- Yield snapshots, risk scores, and accepted or rejected rebalance proposals.
- Contract events and indexed vault performance.
- User-facing receipts and disclosures.

## MCP And x402 Pattern
Every write action should be exposed as a prepare endpoint that returns unsigned calldata or a payment request. MCP/plugin documentation must explain onboarding, read endpoints, prepare endpoints, and the mapping into Base MCP actions.

For paid resources, endpoints should return an x402 payment requirement before serving premium data. The app must enforce a user-defined max payment cap and record receipts for analytics and support.

## Safety Defaults
- Base Sepolia first, then Base mainnet.
- No private keys in app config.
- No hidden approvals or auto-execution.
- Clear user review before paid access or onchain writes.
- Placeholder env vars only in committed files.
