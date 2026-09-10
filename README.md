# 🍪 CookieLogix | SVM Intent Execution & Security UX Prototype

> **CookieLogix** is a security-focused cApp built natively on the **Cookie Chain (SVM)**. It demonstrates real wallet connectivity, real on-chain transaction execution via the Solana Memo Program, and a security-dashboard UX concept for future threat-intelligence integration.

![Cookie Chain](https://img.shields.io/badge/Cookie%20Chain-SVM-emerald?style=for-the-badge)
![Next.js App Router](https://img.shields.io/badge/Next.js-App%20Router-black?style=for-the-badge&logo=next.js)
![Solana Web3.js](https://img.shields.io/badge/Solana-Web3.js-purple?style=for-the-badge)
![Nightly Wallet](https://img.shields.io/badge/Wallet-Nightly-blue?style=for-the-badge)

---

## 🚀 Overview & Objectives
Built for the **Superteam Earn Cookie Chain Bounty**, CookieLogix explores what a security-first transaction firewall could look like on Cookie Chain. It combines a **fully functional on-chain execution flow** (wallet connect → sign → broadcast → confirm) with a **UI prototype** of the security/risk-scoring experience that a production version of this product would eventually need.

This project was built with the assistance of AI coding tools, iterated and reviewed by the author.

### Core Features:

**✅ Implemented & functional (real on-chain interaction):**
- **Native Nightly Wallet Integration:** Detects the injected Nightly provider, connects, and retrieves the public key.
- **Real Balance & Activity Queries:** Fetches live SOL balance and recent transaction signatures directly from the Cookie Chain RPC via `@solana/web3.js`.
- **Real On-Chain Execution:** Builds, signs, broadcasts, and confirms a real transaction using the official Solana Memo Program (`MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`) on the Cookie Chain RPC (`https://rpc.cookiescan.io`), producing a verifiable transaction signature.
- **Live Slot Tracking:** Polls `getSlot()` every 5 seconds to display real-time network activity.
- **Panic Button:** Broadcasts a real, signed on-chain memo transaction flagging the wallet as compromised. *Note: this currently records an audit-trail message on-chain — it does not yet automatically revoke dApp allowances or freeze assets programmatically.*

**🧪 UI Prototype (not yet backed by live data):**
- **Risk Score Dashboard & Heuristic Breakdown:** The risk score, percentage breakdowns (Known Flag, Behavior Analysis, Counterparty Risk, Contract Integrity), and "threat intelligence" messaging are currently static/fixed values, designed to demonstrate the intended UX for a future integration with a real threat-intelligence provider (e.g., Webacy, DD.xyz).
- **Malicious Intent Detection:** The current implementation checks submitted text against a small keyword list (e.g., "drainer", "hack", "approve all") rather than performing real heuristic or simulation-based analysis.

---

## ⚙️ Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS, Heroicons
- **Blockchain Interaction:** `@solana/web3.js`, custom RPC configuration (`https://rpc.cookiescan.io`)
- **Wallet Provider:** Nightly Wallet Extension (`window.nightly.solana`)
- **Network:** Cookie Chain (SVM Mainnet)

---

## 🗺️ Roadmap (to move from prototype to production)
- [ ] Replace static risk-score values with real calls to a threat-intelligence API (Webacy / DD.xyz / Cookie DAS)
- [ ] Implement real heuristic/simulation-based intent analysis instead of keyword matching
- [ ] Implement actual allowance revocation logic for the Panic Button (not just an audit memo)
- [ ] Integrate native Cookie Chain ecosystem tools (Cookiebox, Cookieswap, Cookie DAS API)

---

## 🛠️ Getting Started & Local Setup

### Prerequisites
- Node.js (v18+ recommended)
- Nightly Wallet browser extension installed (`nightly.app`) connected to the Cookie Chain RPC.

### 1. Clone the Repository
```bash
git clone https://github.com/oficialponto6/cookielogix.git
cd cookielogix
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser to interact with the cApp.

---

## 🔍 On-Chain Architecture & Verification
- **Live Application URL:** https://cookielogix.vercel.app
- **Block Explorer:** [CookieScan Explorer](https://cookiescan.io/)
- **RPC Endpoint:** https://rpc.cookiescan.io
- **Verifiable Transactions:** Every executed intent and Panic Button action signs and broadcasts a real Memo Program transaction, verifiable on-chain via the explorer above.

---

## 🍪 Ecosystem Links
- Cookie Chain Homepage: [cookiechain.wtf](https://www.cookiechain.wtf)
- Cookie Chain Documentation: [docs.cookiechain.wtf](https://docs.cookiechain.wtf)
- Ecosystem Tools: [Cookieswap](https://cookieswap.fun/) | [Cookiebox](https://cookiebox.app/)

---

*Built for the Cookie Chain ecosystem — an honest work-in-progress, not a finished product.*
