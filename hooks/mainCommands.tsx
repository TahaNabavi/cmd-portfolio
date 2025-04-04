"use client";
import {
  allCommandsMainName,
  commandExecute,
  findCommand,
  FuncData,
} from "@/commands/main";
import users from "@/data/users";
import { LocationPath } from "@components/context";
import getRandomDarkColor from "@global/randomColor";
import Image from "next/image";

export default class MainCommandsClass {
  constructor() {}
  public cd(data: FuncData) {
    const { context, args } = data;
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
  public cls(data: FuncData) {
    const { context } = data;
    const { setCommandItem } = context;
    setCommandItem([]);
  }
  public userPreview(data: FuncData) {}
  public userShow(data: FuncData) {
    data.context.writer(
      "normal",
      data.input,
      <>
      {"["}{users.length}{"]"} users found:
      <div className="row">
        {users.map((e, i) => (
          <div key={i} className="m-2 mid">
            <Image
              src={e.image}
              alt=""
              width={25}
              height={25}
              className="rounded-full me-1"
            />
            <div className="font-extrabold">{e.name}</div>
          </div>
        ))}
      </div>
      </>
    );
  }
  public userChange(data: FuncData) {
    const { context, args, input } = data;
    const user = users.find((g) => g.name === args[0]);
    if (!user) {
      context.writer("error", input, `user with name "${args[0]} not found"`);
    } else {
      context.setLocation({
        user: user.name,
        image: user.image,
        path: [],
      });
    }
  }
}
