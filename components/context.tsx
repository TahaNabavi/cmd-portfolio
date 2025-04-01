"use client";
import users from "@/data/users";
import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";

export type LocationPath = {
  name: string;
  color: string;
  icon: ReactNode | string;
};
export type Location = {
  user: string;
  image: string;
  path: LocationPath[];
};
export type CommandItem = {
  location: string;
  content: ReactNode;
};

export type AppContextType = {
  location: Location;
  setLocation: Dispatch<SetStateAction<Location>>;
  commandItem: CommandItem[];
  setCommandItem: Dispatch<SetStateAction<CommandItem[]>>;
  terminalRef:RefObject<HTMLTextAreaElement | null>;
  writer: (
    type: "success" | "warn" | "error" | "normal",
    cmd: string,
    text: string | ReactNode
  ) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

export default function AppProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>({
    user: users[0].name,
    image: users[0].image,
    path: [],
  });
  const [commandItem, setCommandItem] = useState<CommandItem[]>([]);

  const terminalRef = useRef<HTMLTextAreaElement>(null);

  function writer(
    type: "success" | "warn" | "error" | "normal",
    cmd: string,
    text: string | ReactNode
  ) {
    setCommandItem((g) => [
      ...g,
      {
        location:
          location.user +
          "/" +
          [...location.path.map((g) => g.name)].join("/") +
          ":" +
          cmd,
        content: (
          <div className="ms-4">
            {type === "warn" && (
              <b className="font-extrabold text-yellow-600 me-1">Warn :</b>
            )}
            {type === "error" && (
              <b className="font-extrabold text-red-700 me-1">Error :</b>
            )}
            {type === "success" && (
              <b className="font-extrabold text-green-700 me-1">Successfuly :</b>
            )}
            {text}
          </div>
        ),
      },
    ]);
  }

  const contextValue: AppContextType = {
    location,
    setLocation,
    commandItem,
    setCommandItem,
    terminalRef,
    writer,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
