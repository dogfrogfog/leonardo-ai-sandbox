"use client";
import { ReactNode } from "react";
import { GenerationProvider } from "./GenerationContext";

export default function Template({ children }: { children: ReactNode }) {
  return <GenerationProvider>{children}</GenerationProvider>;
}
