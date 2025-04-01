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
        icon: <></>,
        title: "Write in terminal",
        onClick: (context, target) => {
          context.terminalRef.current!.value = target.dataset.input!;
          context.terminalRef.current!.focus();
        },
      },
    ],
  },
  {
    id: "file",
    options: [
      {
        icon: <></>,
        title: "Open File",
        onClick: (context, target) => {
          alert(`Opening file: ${target.dataset.menuId}`);
        },
      },
    ],
  },
];
export default menuData;
