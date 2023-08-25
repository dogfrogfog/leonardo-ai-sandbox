"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GenerationProvider } from "./GenerationContext";

const queryClient = new QueryClient();

export default function Template({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <GenerationProvider>{children}</GenerationProvider>
    </QueryClientProvider>
  );
}
