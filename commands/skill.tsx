import Skill from "@/hooks/skill";
import { Command } from "./main";
import { motion } from "framer-motion";

const SkillClass = new Skill();

const skillCommands: Command = {
  name: "skill",
  description: "show user skills",
  color: "#a15203",
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
        className="icon icon-tabler icons-tabler-outline icon-tabler-skull"
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
          d="M12 4c4.418 0 8 3.358 8 7.5c0 1.901 -.755 3.637 -2 4.96l0 2.54a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-2.54c-1.245 -1.322 -2 -3.058 -2 -4.96c0 -4.142 3.582 -7.5 8 -7.5z"
          variants={{
            hidden: {
              pathLength: 0,
            },
            visible: {
              pathLength: 1,
              transition: {
                duration: 1,
                ease: "easeOut",
              },
            },
          }}
          initial="hidden"
          animate="visible"
        />

        <motion.path
          d="M10 17v3"
          fill="none"
          variants={{}}
          initial="hidden"
          animate="visible"
        />

        <motion.path
          d="M14 17v3"
          variants={{}}
          initial="hidden"
          animate="visible"
        />

        <motion.path
          d="M9 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
          fill="undefined"
          variants={{
            hidden: {
              x: 0,
              y: 0,
              opacity: 1,
              pathLength: 0,
              rotate: 36,
              scale: 0.6,
            },
            visible: {
              x: 0,
              y: 0,
              opacity: 1,
              pathLength: 1,
              rotate: 0,
              scale: 1,
              transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0,
                repeat: Infinity,
                repeatDelay: 0,
              },
            },
          }}
          initial="hidden"
          animate="visible"
        />

        <motion.path
          d="M15 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
          fill="undefined"
          variants={{
            hidden: {
              x: 0,
              y: 0,
              opacity: 1,
              pathLength: 0,
              rotate: -40,
              scale: 0.5,
            },
            visible: {
              x: 0,
              y: 0,
              opacity: 1,
              pathLength: 1,
              rotate: 0,
              scale: 1,
              transition: {
                duration: 1,
                ease: "linear",
                delay: 0,
                repeat: Infinity,
                repeatDelay: 0,
              },
            },
          }}
          initial="hidden"
          animate="visible"
        />
      </motion.svg>
    </>
  ),
  followPath: true,
  preview: SkillClass.preview,
  commandVariable: [],
  commandOption: [
    {
      name: "show",
      description: "",
      command:SkillClass.showSkill,
      preview: SkillClass.showPreview,
      commandVariable: [
        {
          name: "skill_name",
          required: false,
          type: "string",
        },
      ],
      commandOption: [
        {
          name: "--all",
          description: "show all user skills",
          command: SkillClass.showAll,
          commandOption: [
            {
              name: "--details",
              description: "show all user skills with their description",
              command: SkillClass.showAllDetails,
            },
          ],
        },
      ],
    },
    {
      name: "cat",
      description: "show user skills with categories",
      command:SkillClass.cat,
      commandVariable: [
        {
          name: "name",
          required: true,
        },
      ],
      commandOption: [
        {
          name: "--details",
          description: "show user skills with categories & their description",
          command:SkillClass.catWithDetails,
        },
      ],
    },
  ],
};

export default skillCommands;
