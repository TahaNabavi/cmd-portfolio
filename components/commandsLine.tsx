import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "./context";

export default function CommandsLine({
  terminalRef,
}: {
  terminalRef: RefObject<HTMLDivElement | null>;
}) {
  const { commandItem } = useContext(AppContext)!;
  const [height, setHeight] = useState(
    // terminalRef.current ? terminalRef.current.clientHeight + 10 : 50
    0
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [commandItem]);

  useEffect(() => {
  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      setHeight(entry.contentRect.height + 10);
    }
  });

  if (terminalRef.current) {
    observer.observe(terminalRef.current);
  }

  return () => observer.disconnect();
}, []);

  return (
    <>
      <div
        ref={containerRef}
        className="overflow-x-hidden overflow-y-auto w-full"
        style={{ height: `calc(100% - ${height}px)` }}
      >
        {commandItem.map((e, i) => (
          <div key={i} className="flex flex-col items-start my-1 relative">
            <div className="me-1 font-extrabold whitespace-nowrap flex flex-warp">
              {e.location.split(":")[0].replace(/\/$/, "")}:
              <div className="opacity-70 ms-1">
                {e.location.split(":")[1].replace(/\/$/, "")}
              </div>
            </div>
            <div className="min-w-0 break-words ">{e.content}</div>
          </div>
        ))}
      </div>
    </>
  );
}
