import MainCommandsClass from "@/hooks/mainCommands";
import { Command } from "./main";
import { motion } from "framer-motion";

const MainClass = new MainCommandsClass();

const mainCommands: Command[] = [
  {
    name: "cd",
    description: "Changes the current directory to the specified path.",
    color: "",
    followPath: false,
    icon: <></>,
    command: MainClass.cd,
    fullPath: "cd",
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
    description: "Clears the terminal screen.",
    color: "",
    followPath: false,
    icon: <></>,
    command: MainClass.cls,
    fullPath: "cls",
    commandVariable: [],
    commandOption: [],
  },
  {
    name: "user",
    description: "Manage users, including listing and changing user profiles.",
    color: "#3E3F5B",
    followPath: false,
    icon: (
      <>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-user-bolt"
          variants={{}}
          initial="hidden"
          animate="visible"
        >
          <motion.path
            d="M0 0h24v24H0z"
            stroke="none"
            fill="none"
            variants={{}}
            initial="hidden"
            animate="visible"
          />

          <motion.path
            d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"
            fill="undefined"
            variants={{
              hidden: {
                x: 0,
                y: 0,
                opacity: 1,
                pathLength: 0,
                rotate: 0,
                scale: 1,
              },
              visible: {
                x: 0,
                y: 0,
                opacity: 1,
                pathLength: 1,
                rotate: 0,
                scale: 1,
                transition: { duration: 1, ease: "linear", delay: 0 },
              },
            }}
            initial="hidden"
            animate="visible"
          />

          <motion.path
            d="M6 21v-2a4 4 0 0 1 4 -4h4c.267 0 .529 .026 .781 .076"
            fill="undefined"
            variants={{
              hidden: {
                x: 0,
                y: 0,
                opacity: 1,
                pathLength: 0,
                rotate: 0,
                scale: 1,
              },
              visible: {
                x: 0,
                y: 0,
                opacity: 1,
                pathLength: 1,
                rotate: 0,
                scale: 1,
                transition: { duration: 1, ease: "linear", delay: 0 },
              },
            }}
            initial="hidden"
            animate="visible"
          />

          <motion.path
            d="M19 16l-2 3h4l-2 3"
            fill="undefined"
            variants={{
              hidden: {
                x: 0,
                y: 0,
                opacity: 1,
                pathLength: 0,
                rotate: 0,
                scale: 1,
              },
              visible: {
                x: 0,
                y: 0,
                opacity: 1,
                pathLength: 1,
                rotate: 0,
                scale: 1,
                transition: {
                  duration: 0.7,
                  ease: "linear",
                  delay: 0,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          />
        </motion.svg>
      </>
    ),
    preview: MainClass.userPreview,
    fullPath: "user",
    commandVariable: [],
    commandOption: [
      {
        name: "-s",
        description: "Displays a list of all users.",
        fullPath: "user -s",
        command: MainClass.userShow,
      },
      {
        name: "-ch",
        description: "Changes the active user profile.",
        fullPath: "user -ch",
        command: MainClass.userChange,
        commandVariable: [
          {
            name: "user_name",
            required: true,
          },
        ],
      },
    ],
  },
];

export default mainCommands;
