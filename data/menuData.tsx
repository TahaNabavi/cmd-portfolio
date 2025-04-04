import { commandExecute } from "@/commands/main";
import { MenuOption } from "@components/rightClickMenu";

type MenuData = {
  id: string;
  options: MenuOption[];
};

const menuData: MenuData[] = [
  {
    id: "help",
    options: [
      {
        id:"help",
        icon: <></>,
        title: "Command help",
        onClick: (context, target) => {
          commandExecute(
            context,
            "command",
            target.dataset.input! + " --help",
            [...context.location.path.map((g) => g.name)].join(" ").trim()
          );
        },
      },
      {
        id:"run",
        icon: <></>,
        title: "Run command",
        onClick: (context, target) => {
          commandExecute(
            context,
            "command",
            target.dataset.input!,
            [...context.location.path.map((g) => g.name)].join(" ").trim()
          );
        },
      },
      {
        id:"preview",
        icon: <></>,
        title: "Show preview",
        onClick: (context, target) => {
          commandExecute(
            context,
            "preview",
            target.dataset.input!,
            [...context.location.path.map((g) => g.name)].join(" ").trim()
          );
        },
      },
      {
        id:"write",
        icon: <></>,
        title: "Write in terminal",
        onClick: (context, target) => {
          context.terminalRef.current!.value = target.dataset.input!;
          context.terminalRef.current!.focus();
        },
      },
    ],
  },
];
export default menuData;
