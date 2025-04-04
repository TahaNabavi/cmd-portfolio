import { ReactNode } from "react";
import skillCommands from "./skill";
import { AppContextType } from "@components/context";
import { getHelpText } from "@/functions/help";
import mainCommands from "./mainCommands";
import users from "@/data/users";

export type FuncData = {
  context: AppContextType;
  args: string[];
  input: string;
  cmd: CommandOption | Command;
};

export type CommandVariable = {
  name: string;
  required: boolean;
  type?: "string" | "number" | "boolean";
};

export interface BaseCommand {
  name: string;
  description: string;
  icon?: ReactNode;
  fullPath: string;
  command?: (data: FuncData) => void;
  preview?: (data: FuncData) => void;
}

export interface CommandOption extends BaseCommand {
  commandVariable?: CommandVariable[];
  commandOption?: CommandOption[];
}

export interface Command extends BaseCommand {
  commandVariable: CommandVariable[];
  commandOption: CommandOption[];
  color: string;
  icon: ReactNode;
  followPath: boolean;
}

export const allCommands: Command[] = [...mainCommands, skillCommands];
export const allCommandsMainName = [...allCommands.map((g) => g.name)];
export function findCommand(name: string) {
  return allCommands.find((g) => g.name === name);
}
function splitCommand(input: string): string[] {
  return input.match(/"[^"]*"|\S+/g)?.map(s => s.replace(/"/g, "")) || [];
}
function run(
  context: AppContextType,
  type: "command" | "preview",
  cmd: Command | CommandOption,
  args: string[],
  input: string
) {
  if (type === "command") {
    if (cmd.command) {
      cmd.command({ context, args, input, cmd });
      return true;
    } else {
      context.writer(
        "error",
        input,
        `The command "${cmd.name}" does not have an execution function. It might be a placeholder or missing implementation.`
      );
      return false;
    }
  } else {
    if (cmd.preview) {
      cmd.preview({ context, args, input, cmd });
      return true;
    } else {
      context.writer(
        "error",
        input,
        `The command "${cmd.name}" does not support preview mode.`
      );
      return false;
    }
  }
}

function executeCommand(
  context: AppContextType,
  type: "command" | "preview",
  cmd: Command,
  args: string[],
  input: string
): boolean {
  if (args.length === 0) {
    run(context, type, cmd, [], input);
  }

  let currentCommand: CommandOption | Command = cmd;
  let currentArgs: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    // Find if the argument matches a subcommand or option
    const foundOption = currentCommand.commandOption?.find(
      (opt) => opt.name === arg
    );

    if (foundOption) {
      currentCommand = foundOption;
    } else {
      currentArgs.push(arg);
    }
  }

  if (currentCommand.commandVariable) {
    const requiredArgsCount = currentCommand.commandVariable.filter(
      (g) => g.required
    ).length;
    const providedArgsCount = currentArgs.length;

    if (providedArgsCount < requiredArgsCount) {
      const missingArgs = currentCommand.commandVariable
        .filter((g) => g.required)
        .slice(providedArgsCount)
        .map((arg) => `[${arg.name}]`)
        .join(" ");

      context.writer(
        "error",
        input,
        <>
          Missing required arguments for command: <b>{currentCommand.name}</b>
          <br />
          <span className="text-gray-400">Expected:</span> {currentCommand.name}{" "}
          <b className="text-blue-500">{missingArgs}</b>
          <br />
          <span className="text-gray-400">To see the correct usage, run:</span>
          <br />
          <b className="text-blue-500">
            {input.split(currentCommand.name)[0]} {currentCommand.name} --help
          </b>
        </>
      );
      return false;
    }

    if (providedArgsCount > currentCommand.commandVariable.length) {
      context.writer(
        "error",
        input,
        <>
          Too many arguments for command: <b>{currentCommand.name}</b>
          <br />
          <span className="text-gray-400">To see the correct usage, run:</span>
          <br />
          <b className="text-blue-500">
            {input.split(currentCommand.name)[0]} {currentCommand.name} --help
          </b>
        </>
      );
      return false;
    }

    return run(context, type, currentCommand, currentArgs, input);
  } else {
    return run(context, type, currentCommand, currentArgs, input);
  }
}

export function commandExecute(
  context: AppContextType,
  type: "command" | "preview",
  input: string,
  base?: string
) {
  let args = splitCommand(input);
  if (args.length === 0) {
    context.writer("normal", input, "");
    return;
  }

  const user = users.find((g) => g.name === context.location.user);
  if (!user) {
    context.writer("error", input, "user is undefined");
    return;
  } else if (user.notAllowCommands.includes(args[0])) {
    context.writer(
      "error",
      input,
      `command ${args[0]} is not allowed for this user`
    );
    return;
  }

  if (args.includes("--help")) {
    if (args.indexOf("--help") !== args.length - 1) {
      context.writer(
        "error",
        input,
        `command --help has no any options or variables`
      );
      return;
    }
    let helptext: string[] = [];
    if (base) {
      args.unshift(base);
    }
    if (args.length !== 1) {
      args.pop();
      helptext = [...args];
    }
    getHelpText(context, helptext.join(" ").trim());
    return;
  }

  if (base) {
    const rootCmd = allCommands.find((g) => g.name === args[0]);
    if (rootCmd && rootCmd.followPath === false) {
      return executeCommand(context, type, rootCmd, args.slice(1), input);
    } else {
      args.unshift(base);
    }
  }

  const rootCmd = findCommand(args[0]);
  if (!rootCmd) {
    context.writer(
      "error",
      input,
      `"${args[0]}"  is not recognized as an internal or external command, operable program or batch file.`
    );
    return;
  }

  return executeCommand(context, type, rootCmd, args.slice(1), input);
}
