"use client";

import CommandsLine from "@components/commandsLine";
import Terminal from "@components/terminal";
import { useContext, useEffect, useRef, useState } from "react";

export default function Page() {
  const terminalRef= useRef<HTMLDivElement>(null)

  useEffect(() => {}, []);

  return (
    <div className="mid w-full h-dvh">
      <div className="container h-[90dvh] mx-auto p-4 relative flex justify-center">
        <CommandsLine terminalRef={terminalRef} />

        <Terminal ref={terminalRef}/>
      </div>
    </div>
  );
}
