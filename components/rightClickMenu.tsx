"use client";
import { useState, useEffect, useRef, ReactNode, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import menuData from "@/data/menuData";
import { AppContext, AppContextType } from "./context";

export type MenuOption = {
  id: string;
  icon: ReactNode;
  title: string;
  onClick: (context: AppContextType, target: HTMLElement) => void;
};

type Menu = {
  visible: boolean;
  x: number;
  y: number;
  options: MenuOption[];
};

const RightClickMenu = () => {
  const context = useContext(AppContext)!;
  const [menu, setMenu] = useState<Menu>({
    visible: false,
    x: 0,
    y: 0,
    options: [],
  });

  const [clickedElement, setClickedElement] = useState<HTMLElement | null>(
    null
  );
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setMenu((prev) => ({ ...prev, visible: false }));
  };

  const getMenuTarget = (element: HTMLElement | null): HTMLElement | null => {
    while (element && !element.dataset.menuId) {
      element = element.parentElement;
    }
    return element;
  };

  const getMenuOptions = (id: string) => menuData.find((g) => g.id === id);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  
    const target = getMenuTarget(e.target as HTMLElement);
    if (!target) return;
  
    const menuOptions = getMenuOptions(target.dataset.menuId!);
    if (!menuOptions) return;
  
    const menuWidth = 200; // match your minWidth
    const menuHeight = menuOptions.options.length * 36; // estimated height per item
  
    let x = e.pageX;
    let y = e.pageY;
  
    const padding = 8;
  
    // Adjust if the menu will overflow the viewport
    if (x + menuWidth + padding > window.innerWidth) {
      x = window.innerWidth - menuWidth - padding;
    }
  
    if (y + menuHeight + padding > window.innerHeight) {
      y = window.innerHeight - menuHeight - padding;
    }
  
    setClickedElement(target);
    setMenu({
      visible: true,
      x,
      y,
      options: menuOptions.options,
    });
  
    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      closeMenu();
      document.removeEventListener("click", handleClickOutside);
    }
  };

  const OptionBtn = ({ o }: { o: MenuOption }) => {
    const dataKey = "btn" + o.id[0].toUpperCase() + o.id.slice(1);
    const isVisible =
      clickedElement?.dataset[dataKey] === "true" ||
      clickedElement?.dataset[dataKey] === undefined;
    return isVisible ? (
      <button
        className="p-1 hover:bg-gray-700 flex gap-2 items-center w-full rounded text-sm"
        onClick={() => {
          closeMenu();
          clickedElement && o.onClick(context, clickedElement);
        }}
      >
        {o.icon}
        {o.title}
      </button>
    ) : null;
  };

  useEffect(() => {
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {menu.visible && (
          <motion.div
            key="context-menu"
            initial={{ x: -10, opacity: 0, scale: 0.6 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -10, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            ref={menuRef}
            className="absolute bg-gray-900 shadow-lg rounded-xl p-[2px] z-50 border-4 border-white/[5%]"
            style={{ top: menu.y, left: menu.x, minWidth: "200px" }}
          >
            {menu.options.map((option, i) => (
              <OptionBtn o={option} key={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RightClickMenu;
