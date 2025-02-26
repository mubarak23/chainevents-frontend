"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  useInjectedConnectors,
  jsonRpcProvider,
  voyager,
} from "@starknet-react/core";

export function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "random",
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StarknetConfig
        chains={[sepolia]}
        provider={jsonRpcProvider({
          rpc: () => ({ nodeUrl: process.env.NEXT_PUBLIC_RPC_URL }),
        })}
        connectors={connectors}
        explorer={voyager}
      >
        {children}
      </StarknetConfig>
    </QueryClientProvider>
  );
}
