import MainCommandsClass from "@/hooks/mainCommands";
import { Command } from "./main";

const MainClass = new MainCommandsClass();

const mainCommands: Command[] = [
  {
    name: "cd",
    description: "",
    color: "",
    followPath: false,
    icon: <></>,
    command: MainClass.cd,
    commandVariable: [
      {
        name: "path",
        required: true,
      },
    ],
    commandOption: [],
  },
  {
    name: "cls",
    description: "",
    color: "",
    followPath: false,
    icon: <></>,
    command: MainClass.cls,
    commandVariable: [],
    commandOption: [],
  },
];

export default mainCommands;
