#This project is not finished. The preview option needs to be worked on.

# custom-cmd

`custom-cmd` is a fully customizable command-line interface simulation built with React and TailwindCSS. It supports command execution, preview modes, right-click context menus, and dynamic command trees. This can be used as a part of a dev portfolio, system UI simulation, or educational project.

## ✨ Features

- Command and subcommand system
- Right-click context menu per element
- Support for command preview and full execution
- Argument validation
- Help system
- Extendable and modular architecture

---

## 🚀 Getting Started

```bash
git clone https://github.com/TahaNabavi/custom-cmd.git
cd custom-cmd
npm install
npm run dev
```

---

## 🧠 How It Works

### 🖱️ Right Click Menu

To enable a custom right-click menu on any element:

- Add the attribute `data-menu-id="menuId"` to the element.
- Define the menu in `/data/menuData.ts` with the corresponding `id`.

#### Option Visibility Control

Each option in a menu has an `id`. To control its visibility on specific elements:

- Add `data-btn-[OptionId]` attribute:
  - If `undefined` or `"true"` → the button will be shown
  - If `"false"` → the button will be hidden

**Example:**

```html
<div data-menu-id="user" data-btn-Delete="false" data-btn-Edit="true">
  Right click me
</div>
```

---

## 💻 Command System

Each command is an object that defines how it behaves. Commands are stored in `/commands/` (like `yourCommand.tsx`).

```ts
{
  name: "command-name",
  description: "command description",
  color: "#fff", // a custom color in hash format
  followPath: false,
  icon: <UserIcon />, // Optional icon
  fullPath: "",
  commandVariable: [],
  commandOption: [
    {
      name: "command-option-one",
      description: "command option description",
    },
    {
      name: "command-option-two",
      description: "command option description",
      commandVariable: [
        {
          name: "var_one",
          required: true,
        },
      ],
    },
  ],
  command: (context, input) => { ... },
  preview: (context, input) => { ... }
}
```

### 🔍 Object Property Reference

| Property          | Description                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| `name`            | Command name. Used in input like `user`, `cd`, etc.                                                 |
| `description`     | Description shown in help or UI.                                                                    |
| `color`           | Optional color for UI display.                                                                      |
| `icon`            | JSX/React icon for visual UI.                                                                       |
| `followPath`      | If false, no nested subcommands are processed.                                                      |
| `fullPath`        | Internal use – typically left blank unless building nested paths manually.                          |
| `commandVariable` | List of expected arguments. Each argument has `name`, `required`, and optional `type`.              |
| `commandOption`   | Subcommands or flags (like `-s`, `-ch`). Can also define their own `commandVariable` and `command`. |
| `command`         | Main function to run when executing this command. Accepts `(context, input)`                        |
| `preview`         | Function to show a non-executing preview result. Accepts `(context, input)`                         |

### 🧠 Context Object

Each `command`, `preview`, or `right-click menu option` receives a `context` object that provides utility functions and global state.

| Property / Function       | Description                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `location`                | The current simulated path state `{ user, image, path[] }`.                                |
| `setLocation()`           | Updates the current location.                                                              |
| `commandItem`             | All printed terminal command items.                                                        |
| `setCommandItem()`        | Updates terminal history items.                                                            |
| `terminalRef`             | Reference to the terminal textarea (for focus or manipulation).                            |
| `writer(type, cmd, text)` | Prints output to the terminal with a status type: `success`, `warn`, `error`, or `normal`. |

Use these in commands and menus to build interactive behaviors like printing results, modifying location, or accessing terminal focus.

---

## 📂 Built-in Commands

### 🔹 `cls`

Clears the terminal screen.

```bash
cls
```

- Uses `context.setCommandItem([])`
- Clears all output in the terminal.

### 🔹 `cd`

Simulates directory change (preview only).

```bash
cd [directory]
```

- Has a `preview()` function only.
- Calls `context.setLocation()` to update virtual path.
- No actual execution.

### 🔹 `users`

Manages or lists user data.

```bash
users
```

- Calls `context.writer()` to display or modify user data.
- Uses `context.location.user` to show who is active.
- Can display available users.

---

## 🧪 Available Scripts

- `npm run dev` — Runs the app in development mode
- `npm run build` — Builds for production
- `npm run lint` — Lints all files

---

## 📁 File Structure

```
/data
  └── users.tsx         # All users defined
  └── menuData.tsx      # Right click menus per element
/hooks                  # Write all command logic as hooks or classes
/commands               # Write and organize command objects
```

---

## 🧩 Adding a New Command

1. Create a new file in `/commands/`
2. Export a new `Command` object
3. Add it to the `allCommands` array in `commands/main.tsx`

---

## 🆘 Help Functionality

You can append `--help` to any **main command** to see its usage, available options, and description.

```bash
users --help
cd --help
```

**Note:**  
Do **not** define a `--help` subcommand manually for your custom commands — it is handled automatically by the system for each main command. Subcommands should not implement or override `--help`.

---

## 📜 License

MIT — [Taha Nabavi](https://github.com/TahaNabavi)
