"use client";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
const AppProvider = dynamic(() => import("@/components/context"), {
  ssr: false,
});
export default function Client({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}
