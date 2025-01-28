import { Level } from '@/types/game';

export const predefinedLevels: Level[] = [
  {
    id: "1",
    name: "Basic Planning",
    description: "Start with fundamental strategy concepts",
    words: ["plan", "goal", "step", "task", "aim"],
    timeLimit: 60,
    starScoreRequirements: {
      1: 200,
      2: 300,
      3: 400
    }
  },
  {
    id: "2",
    name: "Tactical Thinking",
    description: "Learn basic tactical elements",
    words: ["move", "plot", "path", "lead", "time", "mind"],
    timeLimit: 75,
    starScoreRequirements: {
      1: 300,
      2: 400,
      3: 500
    }
  },
  {
    id: "3",
    name: "Strategic Core",
    description: "Master core strategic concepts",
    words: ["think", "solve", "logic", "focus", "adapt"],
    timeLimit: 90,
    starScoreRequirements: {
      1: 400,
      2: 500,
      3: 600
    }
  },
  {
    id: "4",
    name: "Decision Making",
    description: "Practice making strategic decisions",
    words: ["choice", "decide", "option", "select", "pick", "judge"],
    timeLimit: 90,
    starScoreRequirements: {
      1: 500,
      2: 600,
      3: 700
    }
  },
  {
    id: "5",
    name: "Resource Management",
    description: "Learn to manage resources effectively",
    words: ["spend", "save", "trade", "share", "store", "gain"],
    timeLimit: 90,
    starScoreRequirements: {
      1: 500,
      2: 650,
      3: 800
    }
  },
  {
    id: "6",
    name: "Pattern Recognition",
    description: "Identify and utilize patterns",
    words: ["match", "align", "order", "group", "sort", "find"],
    timeLimit: 100,
    starScoreRequirements: {
      1: 600,
      2: 750,
      3: 900
    }
  },
  {
    id: "7",
    name: "Risk Assessment",
    description: "Evaluate and manage risks",
    words: ["risk", "safe", "guard", "check", "avoid", "secure"],
    timeLimit: 100,
    starScoreRequirements: {
      1: 600,
      2: 800,
      3: 1000
    }
  },
  {
    id: "8",
    name: "Advanced Planning",
    description: "Complex planning scenarios",
    words: ["method", "system", "scheme", "design", "format", "model"],
    timeLimit: 120,
    starScoreRequirements: {
      1: 700,
      2: 900,
      3: 1100
    }
  },
  {
    id: "9",
    name: "Problem Solving",
    description: "Tackle complex problems",
    words: ["puzzle", "riddle", "answer", "decode", "unlock", "solve"],
    timeLimit: 120,
    starScoreRequirements: {
      1: 800,
      2: 1000,
      3: 1200
    }
  },
  {
    id: "10",
    name: "Strategic Analysis",
    description: "Analyze situations deeply",
    words: ["review", "assess", "study", "probe", "examine", "analyze"],
    timeLimit: 120,
    starScoreRequirements: {
      1: 900,
      2: 1100,
      3: 1300
    }
  },
  {
    id: "11",
    name: "Competitive Edge",
    description: "Gain advantage through strategy",
    words: ["compete", "advance", "surpass", "achieve", "exceed", "master"],
    timeLimit: 130,
    starScoreRequirements: {
      1: 1000,
      2: 1200,
      3: 1400
    }
  },
  {
    id: "12",
    name: "Tactical Operations",
    description: "Execute complex tactical maneuvers",
    words: ["deploy", "position", "arrange", "direct", "command", "control"],
    timeLimit: 130,
    starScoreRequirements: {
      1: 1100,
      2: 1300,
      3: 1500
    }
  },
  {
    id: "13",
    name: "Strategic Positioning",
    description: "Master positioning and timing",
    words: ["timing", "placing", "staging", "locate", "station", "situate"],
    timeLimit: 140,
    starScoreRequirements: {
      1: 1200,
      2: 1400,
      3: 1600
    }
  },
  {
    id: "14",
    name: "Resource Optimization",
    description: "Maximize resource utilization",
    words: ["optimize", "enhance", "improve", "upgrade", "refine", "perfect"],
    timeLimit: 140,
    starScoreRequirements: {
      1: 1300,
      2: 1500,
      3: 1700
    }
  },
  {
    id: "15",
    name: "Strategic Alliances",
    description: "Form and manage alliances",
    words: ["alliance", "partner", "support", "combine", "unite", "merge"],
    timeLimit: 150,
    starScoreRequirements: {
      1: 1400,
      2: 1600,
      3: 1800
    }
  },
  {
    id: "16",
    name: "Contingency Planning",
    description: "Prepare for various scenarios",
    words: ["prepare", "backup", "reserve", "alternate", "fallback", "standby"],
    timeLimit: 150,
    starScoreRequirements: {
      1: 1500,
      2: 1700,
      3: 1900
    }
  },
  {
    id: "17",
    name: "Strategic Innovation",
    description: "Create new strategic approaches",
    words: ["innovate", "create", "develop", "pioneer", "discover", "invent"],
    timeLimit: 160,
    starScoreRequirements: {
      1: 1600,
      2: 1800,
      3: 2000
    }
  },
  {
    id: "18",
    name: "Master Tactician",
    description: "Advanced tactical challenges",
    words: ["strategy", "tactical", "planned", "execute", "conduct", "perform"],
    timeLimit: 160,
    starScoreRequirements: {
      1: 1700,
      2: 1900,
      3: 2100
    }
  },
  {
    id: "19",
    name: "Strategic Mastery",
    description: "Complex strategic scenarios",
    words: ["mastery", "expertise", "skillful", "proficient", "advanced", "expert"],
    timeLimit: 180,
    starScoreRequirements: {
      1: 1800,
      2: 2000,
      3: 2200
    }
  },
  {
    id: "20",
    name: "Grand Strategist",
    description: "Ultimate strategic challenge",
    words: ["strategic", "mastermind", "brilliant", "genius", "supreme", "ultimate"],
    timeLimit: 180,
    starScoreRequirements: {
      1: 2000,
      2: 2300,
      3: 2500
    }
  }
];
