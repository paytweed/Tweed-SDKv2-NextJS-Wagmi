"use client";

import { useTweedFrontendSDK } from "@paytweed/frontend-sdk-react";
export default function Home() {
  const sdk = useTweedFrontendSDK();
  return (
    <>
      <h1>TWEED</h1>

      <button
        onClick={() => {
          sdk.wallet.create({
            callbacks: {
              onSuccess: (wallet) => {
                console.log(wallet);
              },
            },
          });
        }}
      >
        Create Wallet
      </button>

      <button
        onClick={() => {
          sdk.wallet.showAddress();
        }}
      >
        Show Wallet Address
      </button>
    </>
  );
}
