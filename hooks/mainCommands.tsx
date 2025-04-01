"use client";
import {
  allCommandsMainName,
  commandExecute,
  findCommand,
} from "@/commands/main";
import { AppContextType, LocationPath } from "@components/context";
import getRandomDarkColor from "@global/randomColor";

export default class MainCommandsClass {
  constructor() {}
  public cd(context: AppContextType, args: string[]) {
    const paths = args[0].split("/").filter((g) => g.length !== 0);
    const { setLocation } = context;

    setLocation((g) => {
      let fullPath = [...g.path.map((e) => e.name)];
      let newPath: LocationPath[] = [...g.path];
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        if (path === "..") {
          newPath.pop();
          fullPath.pop();
        } else {
          let cmd = allCommandsMainName.includes(path)
            ? findCommand(path)!
            : null;
          newPath.push({
            name: path,
            color: cmd ? cmd.color : getRandomDarkColor(),
            icon: cmd ? cmd.icon : <></>,
          });
        }
      }
      if (newPath.length !== 0) {
        const input = newPath
          .map((g) => g.name)
          .join(" ")
          .trim();

        const res = commandExecute(context, "preview", input);
        if (res) {
          return { ...g, path: newPath };
        } else {
          // error no preview
          return g;
        }
      }
      return { ...g, path: [] };
    });
  }
  public cls(context: AppContextType, args: string[]) {
    const { setCommandItem } = context;
    setCommandItem([]);
  }
  public user(context: AppContextType, args: string[]){
  }
  public userPreview(context: AppContextType, args: string[]){
  }
  public userShow(context: AppContextType, args: string[]){
  }
  public userChange(context: AppContextType, args: string[]){
  }
}
