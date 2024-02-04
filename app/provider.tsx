"use client";
import { TweedFrontendSdkProvider } from "@paytweed/frontend-sdk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { State, WagmiProvider } from "wagmi";
import { tweed } from "./tweed";
import { config } from "./wagmi";

type Props = {
  children: ReactNode;
  initialState: State | undefined;
};

export function Providers({ children, initialState }: Props) {
  const queryClient = new QueryClient();

  return (
    <TweedFrontendSdkProvider
      sendMessageToBackend={tweed}
      defaultBlockchainIds={["ethereumSepolia"]}
    >
      <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </TweedFrontendSdkProvider>
  );
}
