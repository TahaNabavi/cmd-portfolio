"use client"
import React, { CSSProperties, useState } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const lang = localStorage.getItem("lang") as "en" | "fa";

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className="relative mid"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {visible && (
        <div
          className="bg-gray-500 text-white mid px-2 dark:bg-neutral-950 border-2 border-white border-opacity-10 rounded-2xl absolute ani-scale -top-12 z-10 before:w-3 before:h-3 before:bg-neutral-800 before:rounded before:rotate-45 before:absolute before:bottom-[-6px] before:border-2 before:border-white before:border-opacity-20 h-10"
          style={{ "--time": ".2s" } as CSSProperties}
          dir={lang === "fa" ? "rtl" : "ltr"}
        >
          {content.split(" ").map((e, i) => (
            <span key={i} className="mx-[1px]">
              {e}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
