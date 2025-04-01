import {
  allCommands,
  Command,
  commandExecute,
  CommandOption,
  findCommand,
} from "@/commands/main";
import { AppContextType } from "@components/context";

export function getHelpText(context: AppContextType, path: string) {
  const { writer, location } = context;
  const args = path.trim().split(/\s+/).filter(Boolean);

  function runHelpForCommand(name: string) {
    commandExecute(context, "command", name + " --help");
  }

  function formatCommand(cmd: Command | CommandOption, indent = 0) {
    return (
      <div key={cmd.name} className={`pl-${indent} ms-4 cmdFollow`}>
        <button
          className="text-green-400 hover:underline"
          data-menu-id="help"
          data-input={cmd.fullPath}
          onClick={() => runHelpForCommand(cmd.fullPath)}
        >
          {cmd.name}
        </button>{" "}
        <span className="text-gray-400">
          - {cmd.description || "No description"}
        </span>
        {/* Command Variables */}
        {cmd.commandVariable?.map((varObj) => (
          <div
            key={varObj.name}
            className={`pl-${indent + 6} text-blue-300 ms-4 cmdFollow`}
          >
            [{varObj.name}] -{" "}
            {varObj.required ? "Required variable" : "Optional variable"}
          </div>
        ))}
        {/* Subcommands */}
        {cmd.commandOption?.map((subCmd) => formatCommand(subCmd, indent + 6))}
      </div>
    );
  }

  let cmd = "";
  path.split(" ").map((g) => {
    if (![...location.path.map((e) => e.name)].includes(g)) {
      cmd += " " + g;
    }
  });
  cmd += " --help";
  cmd = cmd.trim();

  let currentCmd: Command | CommandOption | undefined = findCommand(args[0]);

  if (!currentCmd) {
    if (args.length === 0) {
      writer(
        "normal",
        cmd,
        <div className="text-gray-200 cmdFollow">
          {allCommands.map((cmd) => (
            <div key={cmd.name} className="cmdFollow">
              <button
                className="text-green-400 hover:underline"
                data-menu-id="help"
                data-input={cmd.fullPath}
                onClick={() => runHelpForCommand(cmd.fullPath)}
              >
                {cmd.name}
              </button>{" "}
              -{" "}
              <span className="text-gray-400">
                {cmd.description || "No description"}
              </span>
            </div>
          ))}
        </div>
      );
      return;
    } else {
      writer("error", cmd, `Command not found: ${path}`);
      return;
    }
  }

  // Follow path to get nested command
  for (let i = 1; i < args.length; i++) {
    const nextCmd: undefined | CommandOption = currentCmd?.commandOption?.find(
      (opt) => opt.name === args[i]
    );
    if (!nextCmd) {
      writer("error", cmd, `Invalid command path: ${path}`);
      return;
    }
    currentCmd = nextCmd;
  }

  writer(
    "normal",
    cmd,
    <div className="text-gray-200 w-full">{formatCommand(currentCmd)}</div>
  );
}
