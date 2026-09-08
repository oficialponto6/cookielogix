# 🍪 CookieLogix | Autonomous SVM Intent Firewall & Due Diligence cApp

> **CookieLogix** is a professional-grade security cApp and Autonomous Intent Firewall built natively on the **Cookie Chain (SVM)**. It protects users from malicious smart contracts, analyzes transaction intent heuristics, and records immutable cryptographic audit proofs on-chain.

![Cookie Chain](https://img.shields.io/badge/Cookie%20Chain-SVM-emerald?style=for-the-badge)
![Next.js App Router](https://img.shields.io/badge/Next.js-App%20Router-black?style=for-the-badge&logo=next.js)
![Solana Web3.js](https://img.shields.io/badge/Solana-Web3.js-purple?style=for-the-badge)
![Nightly Wallet](https://img.shields.io/badge/Wallet-Nightly-blue?style=for-the-badge)

---

## 🚀 Overview & Objectives
Built for the **Superteam Earn Cookie Chain Bounty**, CookieLogix bridges natural language intent execution with rigorous on-chain safety. Instead of blind transaction signing, CookieLogix intercepts user intents, runs heuristic threat assessments, and securely executes verified operations on the SVM.

### Core Features:
- **Autonomous Intent Firewall:** Natural language intent processing with heuristic interception of malicious patterns (e.g., drainers, unauthorized approvals).
- **Native Nightly Wallet Integration:** Seamless connection and provider injection for the Cookie Chain ecosystem.
- **Proof of Audit On-Chain Execution:** Real transaction broadcasting using the official Solana Memo Program (`MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`) on the Cookie Chain RPC (`https://rpc.cookiescan.io`), generating verifiable transaction signatures.
- **Ecosystem Quick Gateway:** Direct, native access points to core Cookie Chain ecosystem tools including **Cookieswap** and **Cookiebox**.
- **Real-Time Kernel Telemetry:** Live RPC block height tracking, latency calculation, and detailed execution logs.

---

## ⚙️ Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS, Heroicons
- **Blockchain Interaction:** `@solana/web3.js`, custom RPC configuration (`https://rpc.cookiescan.io`)
- **Wallet Provider:** Nightly Wallet Extension (`window.nightly.solana`)
- **Network:** Cookie Chain (SVM Mainnet)

---

## 🛠️ Getting Started & Local Setup

### Prerequisites
- Node.js (v18+ recommended)
- Nightly Wallet browser extension installed (`nightly.app`) connected to the Cookie Chain RPC.

### 1. Clone the Repository
```bash
git clone [https://github.com/oficialponto6/cookielogix.git](https://github.com/oficialponto6/cookielogix.git)
cd cookielogix
2. Install Dependencies
Bash
npm install
# or
yarn install
3. Run Development Server
Bash
npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser to interact with the cApp.

🔍 On-Chain Architecture & Verification
Live Application URL: https://cookielogix.vercel.app

Block Explorer: CookieScan Explorer

RPC Endpoint: https://rpc.cookiescan.io

Verified Transactions: Every secure intent signed via CookieLogix issues an immutable on-chain audit receipt verifiable directly on the official explorer.

🍪 Ecosystem Links
Cookie Chain Homepage: cookiechain.wtf

Cookie Chain Documentation: docs.cookiechain.wtf

Ecosystem Tools: Cookieswap | Cookiebox

Built with precision for the Cookie Chain ecosystem.