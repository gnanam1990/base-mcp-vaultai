# VaultAI

AI-selected yield vault strategies on Base.

**Status:** Planned ninth build after DeFi Copilot proves read and recommendation logic.

VaultAI provides an ERC-4626-style vault interface where strategy changes are recommended by AI and approved through transparent onchain flows.

## Why It Exists
Base MCP gives AI assistants access to Base Account actions such as balances, sends, swaps, contract calls, and x402 payments, with user approval for writes. This project turns that capability into a focused product for DeFi users who prefer deposit-and-monitor yield products with transparent strategy proposals.

## Core Capabilities
- Vault deposit and withdraw UI with position and share accounting.
- Strategy adapter architecture for Morpho, Moonwell, Aerodrome, or future integrations.
- AI allocation proposal engine based on yield and risk inputs.
- User-approved rebalance prepare endpoints.
- Vault analytics for TVL, APY, allocation, and proposal history.

## Roadmap Snapshot
1. Prototype vault contract and local tests.
2. Build read-only vault dashboard and strategy proposal UI.
3. Add deposit/withdraw on Sepolia.
4. Implement one strategy adapter and user-approved rebalance path.
5. Launch only after contract review, docs, and clear risk disclosures.

## Repository Status
This repository is public from day one. It starts with product, architecture, roadmap, and demo documentation. Implementation commits should stay small and use conventional commit prefixes.

## License
MIT
