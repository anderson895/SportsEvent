import { BracketType } from "../types";

export const BracketName: BracketType[] = [
  {
    "Single Elimination": [
      {
        name: "Single Elimination Bracket",
        isElimination: true,
      },
    ],
  },
  {
    "Double Elimination": [
      {
        name: "Upper Bracket",
        isElimination: true,
      },
      {
        name: "Lower Bracket",
        isElimination: true,
      },
    ],
  },
  {
    "Round Robin": [
      {
        name: "Group Stage",
        isElimination: false,
      },
      {
        name: "Finals",
        isElimination: true,
      },
    ],
  },
];
