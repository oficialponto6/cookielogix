'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

interface WalletContextType {
  walletAddress: string | null;
  balance: number | null;
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const COOKIE_RPC = 'https://rpc.cookiescan.io';
const connection = new Connection(COOKIE_RPC, 'confirmed');

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const connectWallet = async () => {
    try {
      const provider = (window as any)?.nightly?.solana || (window as any)?.solana;
      if (!provider) {
        window.open('https://nightly.app/', '_blank');
        return;
      }

      const response = await provider.connect();
      let pubKeyStr = '';
      if (response && response.publicKey) {
        pubKeyStr = typeof response.publicKey === 'string' ? response.publicKey : response.publicKey.toString();
      } else if (provider.publicKey) {
        pubKeyStr = provider.publicKey.toString();
      }

      if (pubKeyStr) {
        setWalletAddress(pubKeyStr);
        try {
          const pubKey = new PublicKey(pubKeyStr);
          const lamports = await connection.getBalance(pubKey);
          setBalance(lamports / 1e9);
        } catch (e) {
          console.error("Could not fetch balance", e);
        }
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, balance, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}