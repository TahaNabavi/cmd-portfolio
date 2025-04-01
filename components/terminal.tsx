"use client";

import { commandExecute } from "@/commands/main";
import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./context";
import Image from "next/image";
import hexToRgba from "@global/hexToRgba";
import { AnimatePresence, motion } from "framer-motion";

export default function Terminal({
  ref,
}: {
  ref: RefObject<HTMLDivElement | null>;
}) {
  const context = useContext(AppContext)!;
  const { location, terminalRef } = context;

  const [height, setHeight] = useState(0);
  const [commands, setCommands] = useState<{ base: string; cmd: string }[]>([]);
  const [commandSelect, setCommandSelect] = useState(-1);

  const adjustHeight = () => {
    if (terminalRef.current) {
      terminalRef.current.style.height = "auto"; // Reset height
      terminalRef.current.style.height = `${terminalRef.current.scrollHeight}px`;
      setHeight(terminalRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    terminalRef.current?.focus();
    adjustHeight();

    const resizeObserver = new ResizeObserver(adjustHeight);
    if (terminalRef.current) {
      resizeObserver.observe(terminalRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!terminalRef.current) return;
    if (commandSelect === -1 || commands.length === 0) {
      terminalRef.current.value = "";
    } else {
      const cmd = commands[commandSelect];
      if (!cmd) {
        terminalRef.current.value = "";
      } else {
        const base = location.path.map((g) => g.name).join(" ");

        if (cmd.base === base) {
          terminalRef.current.value = cmd.cmd;
        } else if (cmd.base.startsWith(base)) {
          terminalRef.current.value =
            cmd.base.replace(base, "").trim() + " " + cmd.cmd;
        } else {
          terminalRef.current.value = `${cmd.base} ${cmd.cmd}`.trim();
        }
      }
      adjustHeight();
    }
  }, [commandSelect, commands, location.path]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCommandSelect((prev) => Math.max(prev + 1, 0));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCommandSelect((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const commandText = terminalRef.current!.value.trim();
      if (!commandText) return;

      let baseCommand = location.path.map((e) => e.name).join(" ");
      commandExecute(context, "command", commandText, baseCommand || undefined);

      setCommands((prev) => [{ base: baseCommand, cmd: commandText }, ...prev]);
      setCommandSelect(-1);
      terminalRef.current!.value = "";
      adjustHeight();
    }
  };

  return (
    <div
      ref={ref}
      className="bg-black absolute bottom-4 w-[calc(100%-16px)] rounded-xl border-2 border-white/[10%] shadow-[inset_0_0_10px_rgba(255,255,255,0.1),0_3px_10px_rgba(255,255,255,0.1)] flex"
      style={{ height: `${height}px` }}
    >
      <div className="mid relative me-2">
        <div
          className={`mid bg-neutral-900 h-full ps-4 pe-6 ${
            location.path.length === 0 && "rounded-r-lg"
          }`}
        >
          <Image
            src={location.image}
            alt=""
            width={25}
            height={25}
            className="rounded-full me-1"
          />
          <div className="text-lg font-extrabold text-green-700">
            {location.user}
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {location.path.map((e, i) => (
            <motion.div
              initial={{ x: -10, opacity: 0, scale: 0.6 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -10, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              key={i}
              className={`h-full ps-2 pe-4 mid font-extrabold relative ${
                location.path.length === i + 1 && "rounded-r-lg"
              }`}
              style={{ background: hexToRgba(e.color, 1) }}
            >
              <div
                className="h-full w-2 bg-red-600 absolute -left-2"
                style={{
                  clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                  background: hexToRgba(e.color, 1),
                }}
              ></div>
              <div className="">{e.icon}</div>
              <div className="opacity-90 tracking-wide ms-1">{e.name}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <textarea
        ref={terminalRef}
        className="bg-transparent text-green-400 outline-none resize-none w-full overflow-y-hidden pe-2 py-3"
        rows={1}
        autoFocus
        onKeyDown={handleKeyDown}
        onInput={adjustHeight}
      />
    </div>
  );
}
