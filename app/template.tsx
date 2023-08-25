"use client";
import { ReactNode } from "react";
// import { SWRConfig } from "swr";

import { GenerationProvider } from "./GenerationContext";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Template({ children }: { children: ReactNode }) {
  return (
    // <SWRConfig
    //   value={{
    //     fetcher,
    //     onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    //       // Only retry up to 3 times.
    //       if (retryCount >= 3) return;
    //     },
    //     // to prevent same requests occur multiple times
    //     revalidateIfStale: false,
    //     revalidateOnFocus: false,
    //   }}
    // >
    <GenerationProvider>{children}</GenerationProvider>
    // </SWRConfig>
  );
}
