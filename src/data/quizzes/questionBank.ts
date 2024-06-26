// Import data types
import type { QuestionBank } from "@/lib/types"

// Declare hash map of question bank
const questionBank = {
  // What is Ethereum?
  a001: {
    prompt: "a001-prompt",
    answers: [
      {
        id: "a001-a",
        label: "a001-a-label",
        explanation: "a001-a-explanation",
      },
      {
        id: "a001-b",
        label: "a001-b-label",
        explanation: "a001-b-explanation",
      },
      {
        id: "a001-c",
        label: "a001-c-label",
        explanation: "a001-c-explanation",
      },
      {
        id: "a001-d",
        label: "a001-d-label",
        explanation: "a001-d-explanation",
      },
    ],
    correctAnswerId: "a001-b",
  },
  a002: {
    prompt: "a002-prompt",
    answers: [
      {
        id: "a002-a",
        label: "a002-a-label",
        explanation: "a002-a-explanation",
      },
      {
        id: "a002-b",
        label: "a002-b-label",
        explanation: "a002-b-explanation",
      },
      {
        id: "a002-c",
        label: "a002-c-label",
        explanation: "a002-c-explanation",
      },
      {
        id: "a002-d",
        label: "a002-d-label",
        explanation: "a002-d-explanation",
      },
    ],
    correctAnswerId: "a002-a",
  },
  a003: {
    prompt: "a003-prompt",
    answers: [
      {
        id: "a003-a",
        label: "a003-a-label",
        explanation: "a003-a-explanation",
      },
      {
        id: "a003-b",
        label: "a003-b-label",
        explanation: "a003-b-explanation",
      },
      {
        id: "a003-c",
        label: "a003-c-label",
        explanation: "a003-c-explanation",
      },
      {
        id: "a003-d",
        label: "a003-d-label",
        explanation: "a003-d-explanation",
      },
    ],
    correctAnswerId: "a003-d",
  },
  a004: {
    prompt: "a004-prompt",
    answers: [
      {
        id: "a004-a",
        label: "a004-a-label",
        explanation: "a004-explanation",
      },
      {
        id: "a004-b",
        label: "a004-b-label",
        explanation: "a004-explanation",
      },
      {
        id: "a004-c",
        label: "a004-c-label",
        explanation: "a004-explanation",
      },
      {
        id: "a004-d",
        label: "a004-d-label",
        explanation: "a004-explanation",
      },
    ],
    correctAnswerId: "a004-a",
  },
  a005: {
    prompt: "a005-prompt",
    answers: [
      {
        id: "a005-a",
        label: "a005-a-label",
        explanation: "a005-a-explanation",
      },
      {
        id: "a005-b",
        label: "a005-b-label",
        explanation: "a005-b-explanation",
      },
      {
        id: "a005-c",
        label: "a005-c-label",
        explanation: "a005-c-explanation",
      },
      {
        id: "a005-d",
        label: "a005-d-label",
        explanation: "a005-d-explanation",
      },
    ],
    correctAnswerId: "a005-d",
  },
  // What is ether?
  b001: {
    prompt: "b001-prompt",
    answers: [
      {
        id: "b001-a",
        label: "b001-a-label",
        explanation: "b001-a-explanation",
      },
      {
        id: "b001-b",
        label: "b001-b-label",
        explanation: "b001-b-explanation",
      },
      {
        id: "b001-c",
        label: "b001-c-label",
        explanation: "b001-c-explanation",
      },
      {
        id: "b001-d",
        label: "b001-d-label",
        explanation: "b001-d-explanation",
      },
    ],
    correctAnswerId: "b001-c",
  },
  b002: {
    prompt: "b002-prompt",
    answers: [
      {
        id: "b002-a",
        label: "b002-a-label",
        explanation: "b002-a-explanation",
      },
      {
        id: "b002-b",
        label: "b002-b-label",
        explanation: "b002-b-explanation",
      },
      {
        id: "b002-c",
        label: "b002-c-label",
        explanation: "b002-c-explanation",
      },
      {
        id: "b002-d",
        label: "b002-d-label",
        explanation: "b002-d-explanation",
      },
    ],
    correctAnswerId: "b002-b",
  },
  b003: {
    prompt: "b003-prompt",
    answers: [
      {
        id: "b003-a",
        label: "b003-a-label",
        explanation: "b003-a-explanation",
      },
      {
        id: "b003-b",
        label: "b003-b-label",
        explanation: "b003-b-explanation",
      },
      {
        id: "b003-c",
        label: "b003-c-label",
        explanation: "b003-c-explanation",
      },
      {
        id: "b003-d",
        label: "b003-d-label",
        explanation: "b003-d-explanation",
      },
    ],
    correctAnswerId: "b003-b",
  },
  b004: {
    prompt: "b004-prompt",
    answers: [
      {
        id: "b004-a",
        label: "b004-a-label",
        explanation: "b004-a-explanation",
      },
      {
        id: "b004-b",
        label: "b004-b-label",
        explanation: "b004-b-explanation",
      },
      {
        id: "b004-c",
        label: "b004-c-label",
        explanation: "b004-c-explanation",
      },
      {
        id: "b004-d",
        label: "b004-d-label",
        explanation: "b004-d-explanation",
      },
    ],
    correctAnswerId: "b004-d",
  },
  // Web3
  c001: {
    prompt: "c001-prompt",
    answers: [
      {
        id: "c001-a",
        label: "c001-a-label",
        explanation: "c001-a-explanation",
      },
      {
        id: "c001-b",
        label: "c001-b-label",
        explanation: "c001-b-explanation",
      },
      {
        id: "c001-c",
        label: "c001-c-label",
        explanation: "c001-c-explanation",
      },
      {
        id: "c001-d",
        label: "c001-d-label",
        explanation: "c001-d-explanation",
      },
    ],
    correctAnswerId: "c001-b",
  },
  c002: {
    prompt: "c002-prompt",
    answers: [
      {
        id: "c002-a",
        label: "c002-a-label",
        explanation: "c002-a-explanation",
      },
      {
        id: "c002-b",
        label: "c002-b-label",
        explanation: "c002-b-explanation",
      },
      {
        id: "c002-c",
        label: "c002-c-label",
        explanation: "c002-c-explanation",
      },
      {
        id: "c002-d",
        label: "c002-d-label",
        explanation: "c002-d-explanation",
      },
    ],
    correctAnswerId: "c002-c",
  },
  c003: {
    prompt: "c003-prompt",
    answers: [
      {
        id: "c003-a",
        label: "c003-a-label",
        explanation: "c003-a-explanation",
      },
      {
        id: "c003-b",
        label: "c003-b-label",
        explanation: "c003-b-explanation",
      },
      {
        id: "c003-c",
        label: "c003-c-label",
        explanation: "c003-c-explanation",
      },
      {
        id: "c003-d",
        label: "c003-d-label",
        explanation: "c003-d-explanation",
      },
    ],
    correctAnswerId: "c003-c",
  },
  c004: {
    prompt: "c004-prompt",
    answers: [
      {
        id: "c004-a",
        label: "c004-a-label",
        explanation: "c004-a-explanation",
      },
      {
        id: "c004-b",
        label: "c004-b-label",
        explanation: "c004-b-explanation",
      },
      {
        id: "c004-c",
        label: "c004-c-label",
        explanation: "c004-c-explanation",
      },
      {
        id: "c004-d",
        label: "c004-d-label",
        explanation: "c004-d-explanation",
      },
    ],
    correctAnswerId: "c004-a",
  },
  c005: {
    prompt: "c005-prompt",
    answers: [
      {
        id: "c005-a",
        label: "c005-a-label",
        explanation: "c005-a-explanation",
      },
      {
        id: "c005-b",
        label: "c005-b-label",
        explanation: "c005-b-explanation",
      },
      {
        id: "c005-c",
        label: "c005-c-label",
        explanation: "c005-c-explanation",
      },
      {
        id: "c005-d",
        label: "c005-d-label",
        explanation: "c005-d-explanation",
      },
    ],
    correctAnswerId: "c005-c",
  },
  // Wallets
  d001: {
    prompt: "d001-prompt",
    answers: [
      {
        id: "d001-a",
        label: "d001-a-label",
        explanation: "d001-a-explanation",
      },
      {
        id: "d001-b",
        label: "d001-b-label",
        explanation: "d001-b-explanation",
      },
      {
        id: "d001-c",
        label: "d001-c-label",
        explanation: "d001-c-explanation",
      },
      {
        id: "d001-d",
        label: "d001-d-label",
        explanation: "d001-d-explanation",
      },
    ],
    correctAnswerId: "d001-b",
  },
  d002: {
    prompt: "d002-prompt",
    answers: [
      {
        id: "d002-a",
        label: "d002-a-label",
        explanation: "d002-a-explanation",
      },
      {
        id: "d002-b",
        label: "d002-b-label",
        explanation: "d002-b-explanation",
      },
      {
        id: "d002-c",
        label: "d002-c-label",
        explanation: "d002-c-explanation",
      },
      {
        id: "d002-d",
        label: "d002-d-label",
        explanation: "d002-d-explanation",
      },
    ],
    correctAnswerId: "d002-d",
  },
  d003: {
    prompt: "d003-prompt",
    answers: [
      {
        id: "d003-a",
        label: "d003-a-label",
        explanation: "d003-a-explanation",
      },
      {
        id: "d003-b",
        label: "d003-b-label",
        explanation: "d003-b-explanation",
      },
      {
        id: "d003-c",
        label: "d003-c-label",
        explanation: "d003-c-explanation",
      },
      {
        id: "d003-d",
        label: "d003-d-label",
        explanation: "d003-d-explanation",
      },
    ],
    correctAnswerId: "d003-d",
  },
  d004: {
    prompt: "d004-prompt",
    answers: [
      {
        id: "d004-a",
        label: "d004-a-label",
        explanation: "d004-a-explanation",
      },
      {
        id: "d004-b",
        label: "d004-b-label",
        explanation: "d004-b-explanation",
      },
    ],
    correctAnswerId: "d004-b",
  },
  // Security
  e001: {
    prompt: "e001-prompt",
    answers: [
      {
        id: "e001-a",
        label: "e001-a-label",
        explanation: "e001-a-explanation",
      },
      {
        id: "e001-b",
        label: "e001-b-label",
        explanation: "e001-b-explanation",
      },
      {
        id: "e001-c",
        label: "e001-c-label",
        explanation: "e001-c-explanation",
      },
      {
        id: "e001-d",
        label: "e001-d-label",
        explanation: "e001-d-explanation",
      },
    ],
    correctAnswerId: "e001-d",
  },
  e002: {
    prompt: "e002-prompt",
    answers: [
      {
        id: "e002-a",
        label: "e002-a-label",
        explanation: "e002-a-explanation",
      },
      {
        id: "e002-b",
        label: "e002-b-label",
        explanation: "e002-b-explanation",
      },
    ],
    correctAnswerId: "e002-b",
  },
  e003: {
    prompt: "e003-prompt",
    answers: [
      {
        id: "e003-a",
        label: "e003-a-label",
        explanation: "e003-a-explanation",
      },
      {
        id: "e003-b",
        label: "e003-b-label",
        explanation: "e003-b-explanation",
      },
      {
        id: "e003-c",
        label: "e003-c-label",
        explanation: "e003-c-explanation",
      },
      {
        id: "e003-d",
        label: "e003-d-label",
        explanation: "e003-d-explanation",
      },
    ],
    correctAnswerId: "e003-d",
  },
  e004: {
    prompt: "e004-prompt",
    answers: [
      {
        id: "e004-a",
        label: "e004-a-label",
        explanation: "e004-a-explanation",
      },
      {
        id: "e004-b",
        label: "e004-b-label",
        explanation: "e004-b-explanation",
      },
    ],
    correctAnswerId: "e004-b",
  },
  // NFTs
  f001: {
    prompt: "f001-prompt",
    answers: [
      {
        id: "f001-a",
        label: "f001-a-label",
        explanation: "f001-a-explanation", // with an owner
      },
      {
        id: "f001-b",
        label: "f001-b-label",
        explanation: "f001-b-explanation",
      },
      {
        id: "f001-c",
        label: "f001-c-label",
        explanation: "f001-c-explanation",
      },
      {
        id: "f001-d",
        label: "f001-d-label",
        explanation: "f001-d-explanation",
      },
    ],
    correctAnswerId: "f001-a",
  },
  f002: {
    prompt: "f002-prompt",
    answers: [
      {
        id: "f002-a",
        label: "f002-a-label",
        explanation: "f002-a-explanation",
      },
      {
        id: "f002-b",
        label: "f002-b-label",
        explanation: "f002-b-explanation",
      },
    ],
    correctAnswerId: "f002-b",
  },
  f003: {
    prompt: "f003-prompt",
    answers: [
      {
        id: "f003-a",
        label: "f003-a-label",
        explanation: "f003-a-explanation",
      },
      {
        id: "f003-b",
        label: "f003-b-label",
        explanation: "f003-b-explanation",
      },
      {
        id: "f003-c",
        label: "f003-c-label",
        explanation: "f003-c-explanation",
      },
      {
        id: "f003-d",
        label: "f003-d-label",
        explanation: "f003-d-explanation",
      },
    ],
    correctAnswerId: "f003-b",
  },
  f004: {
    prompt: "f004-prompt",
    answers: [
      {
        id: "f004-a",
        label: "f004-a-label",
        explanation: "f004-a-explanation",
      },
      {
        id: "f004-b",
        label: "f004-b-label",
        explanation: "f004-b-explanation",
      },
      {
        id: "f004-c",
        label: "f004-c-label",
        explanation: "f004-c-explanation",
      },
      {
        id: "f004-d",
        label: "f004-d-label",
        explanation: "f004-d-explanation",
      },
    ],
    correctAnswerId: "f004-c",
  },
  f005: {
    prompt: "f005-prompt",
    answers: [
      {
        id: "f005-a",
        label: "f005-a-label",
        explanation: "f005-a-explanation",
      },
      {
        id: "f005-b",
        label: "f005-b-label",
        explanation: "f005-b-explanation",
      },
    ],
    correctAnswerId: "f005-b",
  },
  // Layer 2
  g001: {
    prompt: "g001-prompt",
    answers: [
      {
        id: "g001-a",
        label: "g001-a-label",
        explanation: "g001-a-explanation",
      },
      {
        id: "g001-b",
        label: "g001-b-label",
        explanation: "g001-b-explanation",
      },
      {
        id: "g001-c",
        label: "g001-c-label",
        explanation: "g001-c-explanation",
      },
      {
        id: "g001-d",
        label: "g001-d-label",
        explanation: "g001-d-explanation",
      },
    ],
    correctAnswerId: "g001-a",
  },
  g002: {
    prompt: "g002-prompt",
    answers: [
      {
        id: "g002-a",
        label: "g002-a-label",
        explanation: "g002-a-explanation",
      },
      {
        id: "g002-b",
        label: "g002-b-label",
        explanation: "g002-b-explanation",
      },
      {
        id: "g002-c",
        label: "g002-c-label",
        explanation: "g002-c-explanation",
      },
      {
        id: "g002-d",
        label: "g002-d-label",
        explanation: "g002-d-explanation",
      },
    ],
    correctAnswerId: "g002-d",
  },
  g003: {
    prompt: "g003-prompt",
    answers: [
      {
        id: "g003-a",
        label: "g003-a-label",
        explanation: "g003-a-explanation",
      },
      {
        id: "g003-b",
        label: "g003-b-label",
        explanation: "g003-b-explanation",
      },
      {
        id: "g003-c",
        label: "g003-c-label",
        explanation: "g003-c-explanation",
      },
      {
        id: "g003-d",
        label: "g003-d-label",
        explanation: "g003-d-explanation",
      },
    ],
    correctAnswerId: "g003-d",
  },
  g004: {
    prompt: "g004-prompt",
    answers: [
      {
        id: "g004-a",
        label: "g004-a-label",
        explanation: "g004-a-explanation",
      },
      {
        id: "g004-b",
        label: "g004-b-label",
        explanation: "g004-b-explanation",
      },
      {
        id: "g004-c",
        label: "g004-c-label",
        explanation: "g004-c-explanation",
      },
      {
        id: "g004-d",
        label: "g004-d-label",
        explanation: "g004-d-explanation",
      },
    ],
    correctAnswerId: "g004-d",
  },
  // The Merge
  h001: {
    prompt: "h001-prompt",
    answers: [
      {
        id: "h001-a",
        label: "h001-a-label",
        explanation: "h001-a-explanation",
      },
      {
        id: "h001-b",
        label: "h001-b-label",
        explanation: "h001-b-explanation",
      },
      {
        id: "h001-c",
        label: "h001-c-label",
        explanation: "h001-c-explanation",
      },
      {
        id: "h001-d",
        label: "h001-d-label",
        explanation: "h001-d-explanation",
      },
    ],
    correctAnswerId: "h001-b",
  },
  h002: {
    prompt: "h002-prompt",
    answers: [
      {
        id: "h002-a",
        label: "h002-a-label",
        explanation: "h002-a-explanation",
      },
      {
        id: "h002-b",
        label: "h002-b-label",
        explanation: "h002-b-explanation",
      },
      {
        id: "h002-c",
        label: "h002-c-label",
        explanation: "h002-c-explanation",
      },
      {
        id: "h002-d",
        label: "h002-d-label",
        explanation: "h002-d-explanation",
      },
    ],
    correctAnswerId: "h002-d",
  },
  h003: {
    prompt: "h003-prompt",
    answers: [
      {
        id: "h003-a",
        label: "h003-a-label",
        explanation: "h003-a-explanation",
      },
      {
        id: "h003-b",
        label: "h003-b-label",
        explanation: "h003-b-explanation",
      },
      {
        id: "h003-c",
        label: "h003-c-label",
        explanation: "h003-c-explanation",
      },
      {
        id: "h003-d",
        label: "h003-d-label",
        explanation: "h003-d-explanation",
      },
    ],
    correctAnswerId: "h003-a",
  },
  h004: {
    prompt: "h004-prompt",
    answers: [
      {
        id: "h004-a",
        label: "h004-a-label",
        explanation: "h004-a-explanation",
      },
      {
        id: "h004-b",
        label: "h004-b-label",
        explanation: "h004-b-explanation",
      },
    ],
    correctAnswerId: "h004-b",
  },
  h005: {
    prompt: "h005-prompt",
    answers: [
      {
        id: "h005-a",
        label: "h005-a-label",
        explanation: "h005-a-explanation",
      },
      {
        id: "h005-b",
        label: "h005-b-label",
        explanation: "h005-b-explanation",
      },
      {
        id: "h005-c",
        label: "h005-c-label",
        explanation: "h005-c-explanation",
      },
      {
        id: "h005-d",
        label: "h005-d-label",
        explanation: "h005-d-explanation",
      },
    ],
    correctAnswerId: "h005-b",
  },
  // DAOs
  i001: {
    prompt: "i001-prompt",
    answers: [
      {
        id: "i001-a",
        label: "i001-a-label",
        explanation: "i001-a-explanation",
      },
      {
        id: "i001-b",
        label: "i001-b-label",
        explanation: "i001-b-explanation",
      },
      {
        id: "i001-c",
        label: "i001-c-label",
        explanation: "i001-c-explanation",
      },
      {
        id: "i001-d",
        label: "i001-d-label",
        explanation: "i001-d-explanation",
      },
    ],
    correctAnswerId: "i001-d",
  },
  i002: {
    prompt: "i002-prompt",
    answers: [
      {
        id: "i002-a",
        label: "i002-a-label",
        explanation: "i002-a-explanation",
      },
      {
        id: "i002-b",
        label: "i002-b-label",
        explanation: "i002-b-explanation",
      },
      {
        id: "i002-c",
        label: "i002-c-label",
        explanation: "i002-c-explanation",
      },
      {
        id: "i002-d",
        label: "i002-d-label",
        explanation: "i002-d-explanation",
      },
    ],
    correctAnswerId: "i002-d",
  },
  i003: {
    prompt: "i003-prompt",
    answers: [
      {
        id: "i003-a",
        label: "i003-a-label",
        explanation: "i003-a-explanation",
      },
      {
        id: "i003-b",
        label: "i003-b-label",
        explanation: "i003-b-explanation",
      },
      {
        id: "i003-c",
        label: "i003-c-label",
        explanation: "i003-c-explanation",
      },
      {
        id: "i003-d",
        label: "i003-d-label",
        explanation: "i003-d-explanation",
      },
    ],
    correctAnswerId: "i003-b",
  },
  i004: {
    prompt: "i004-prompt",
    answers: [
      {
        id: "i004-a",
        label: "i004-a-label",
        explanation: "i004-a-explanation",
      },
      {
        id: "i004-b",
        label: "i004-b-label",
        explanation: "i004-b-explanation",
      },
      {
        id: "i004-c",
        label: "i004-c-label",
        explanation: "i004-c-explanation",
      },
      {
        id: "i004-d",
        label: "i004-d-label",
        explanation: "i004-d-explanation",
      },
    ],
    correctAnswerId: "i004-c",
  },
  i005: {
    prompt: "i005-prompt",
    answers: [
      {
        id: "i005-a",
        label: "i005-a-label",
        explanation: "i005-a-explanation",
      },
      {
        id: "i005-b",
        label: "i005-b-label",
        explanation: "i005-b-explanation",
      },
      {
        id: "i005-c",
        label: "i005-c-label",
        explanation: "i005-c-explanation",
      },
      {
        id: "i005-d",
        label: "i005-d-label",
        explanation: "i005-d-explanation",
      },
    ],
    correctAnswerId: "i005-d",
  },
  // Solo staking
  j001: {
    prompt: "j001-prompt",
    answers: [
      {
        id: "j001-a",
        label: "j001-a-label",
        explanation: "j001-a-explanation",
      },
      {
        id: "j001-b",
        label: "j001-b-label",
        explanation: "j001-b-explanation",
      },
      {
        id: "j001-c",
        label: "j001-c-label",
        explanation: "j001-c-explanation",
      },
      {
        id: "j001-d",
        label: "j001-d-label",
        explanation: "j001-d-explanation",
      },
    ],
    correctAnswerId: "j001-d",
  },
  j002: {
    prompt: "j002-prompt",
    answers: [
      {
        id: "j002-a",
        label: "j002-a-label",
        explanation: "j002-a-explanation",
      },
      {
        id: "j002-b",
        label: "j002-b-label",
        explanation: "j002-b-explanation",
      },
      {
        id: "j002-c",
        label: "j002-c-label",
        explanation: "j002-c-explanation",
      },
      {
        id: "j002-d",
        label: "j002-d-label",
        explanation: "j002-d-explanation",
      },
    ],
    correctAnswerId: "j002-b",
  },
  j003: {
    prompt: "j003-prompt",
    answers: [
      {
        id: "j003-a",
        label: "j003-a-label",
        explanation: "j003-a-explanation",
      },
      {
        id: "j003-b",
        label: "j003-b-label",
        explanation: "j003-b-explanation",
      },
      {
        id: "j003-c",
        label: "j003-c-label",
        explanation: "j003-c-explanation",
      },
      {
        id: "j003-d",
        label: "j003-d-label",
        explanation: "j003-d-explanation",
      },
    ],
    correctAnswerId: "j003-b",
  },
  j004: {
    prompt: "j004-prompt",
    answers: [
      {
        id: "j004-a",
        label: "j004-a-label",
        explanation: "j004-a-explanation",
      },
      {
        id: "j004-b",
        label: "j004-b-label",
        explanation: "j004-b-explanation",
      },
      {
        id: "j004-c",
        label: "j004-c-label",
        explanation: "j004-c-explanation",
      },
      {
        id: "j004-d",
        label: "j004-d-label",
        explanation: "j004-d-explanation",
      },
    ],
    correctAnswerId: "j004-d",
  },
  j005: {
    prompt: "j005-prompt",
    answers: [
      {
        id: "j005-a",
        label: "j005-a-label",
        explanation: "j005-a-explanation",
      },
      {
        id: "j005-b",
        label: "j005-b-label",
        explanation: "j005-b-explanation",
      },
      {
        id: "j005-c",
        label: "j005-c-label",
        explanation: "j005-c-explanation",
      },
      {
        id: "j005-d",
        label: "j005-d-label",
        explanation: "j005-d-explanation",
      },
    ],
    correctAnswerId: "j005-c",
  },
  j006: {
    prompt: "j006-prompt",
    answers: [
      {
        id: "j006-a",
        label: "j006-a-label",
        explanation: "j006-a-explanation",
      },
      {
        id: "j006-b",
        label: "j006-b-label",
        explanation: "j006-b-explanation",
      },
      {
        id: "j006-c",
        label: "j006-c-label",
        explanation: "j006-b-explanation",
      },
      {
        id: "j006-d",
        label: "j006-d-label",
        explanation: "j006-b-explanation",
      },
    ],
    correctAnswerId: "j006-a",
  },
  j007: {
    prompt: "j007-prompt",
    answers: [
      {
        id: "j007-a",
        label: "j007-a-label",
        explanation: "j007-a-explanation",
      },
      {
        id: "j007-b",
        label: "j007-b-label",
        explanation: "j007-b-explanation",
      },
      {
        id: "j007-c",
        label: "j007-c-label",
        explanation: "j007-c-explanation",
      },
      {
        id: "j007-d",
        label: "j007-d-label",
        explanation: "j007-d-explanation",
      },
    ],
    correctAnswerId: "j007-c",
  },
  j008: {
    prompt: "j008-prompt",
    answers: [
      {
        id: "j008-a",
        label: "j008-a-label",
        explanation: "j008-a-explanation",
      },
      {
        id: "j008-b",
        label: "j008-b-label",
        explanation: "j008-b-explanation",
      },
      {
        id: "j008-c",
        label: "j008-c-label",
        explanation: "j008-c-explanation",
      },
      {
        id: "j008-d",
        label: "j008-d-label",
        explanation: "j008-d-explanation",
      },
    ],
    correctAnswerId: "j008-d",
  },
  // Scaling
  k001: {
    prompt: "k001-prompt",
    answers: [
      {
        id: "k001-a",
        label: "k001-a-label",
        explanation: "k001-a-explanation",
      },
      {
        id: "k001-b",
        label: "k001-b-label",
        explanation: "k001-b-explanation",
      },
      {
        id: "k001-c",
        label: "k001-c-label",
        explanation: "k001-c-explanation",
      },
      {
        id: "k001-d",
        label: "k001-d-label",
        explanation: "k001-d-explanation",
      },
    ],
    correctAnswerId: "k001-d",
  },
  k002: {
    prompt: "k002-prompt",
    answers: [
      {
        id: "k002-a",
        label: "k002-a-label",
        explanation: "k002-a-explanation",
      },
      {
        id: "k002-b",
        label: "k002-b-label",
        explanation: "k002-b-explanation",
      },
      {
        id: "k002-c",
        label: "k002-c-label",
        explanation: "k002-c-explanation",
      },
      {
        id: "k002-d",
        label: "k002-d-label",
        explanation: "k002-d-explanation",
      },
    ],
    correctAnswerId: "k002-c",
  },
  k003: {
    prompt: "k003-prompt",
    answers: [
      {
        id: "k003-a",
        label: "k003-a-label",
        explanation: "k003-a-explanation",
      },
      {
        id: "k003-b",
        label: "k003-b-label",
        explanation: "k003-b-explanation",
      },
      {
        id: "k003-c",
        label: "k003-c-label",
        explanation: "k003-c-explanation",
      },
      {
        id: "k003-d",
        label: "k003-d-label",
        explanation: "k003-d-explanation",
      },
    ],
    correctAnswerId: "k003-d",
  },
  k004: {
    prompt: "k004-prompt",
    answers: [
      {
        id: "k004-a",
        label: "k004-a-label",
        explanation: "k004-a-explanation",
      },
      {
        id: "k004-b",
        label: "k004-b-label",
        explanation: "k004-b-explanation",
      },
      {
        id: "k004-c",
        label: "k004-c-label",
        explanation: "k004-c-explanation",
      },
      {
        id: "k004-d",
        label: "k004-d-label",
        explanation: "k004-d-explanation",
      },
    ],
    correctAnswerId: "k004-b",
  },
  // Run a node
  l001: {
    prompt: "l001-prompt",
    answers: [
      {
        id: "l001-a",
        label: "l001-a-label",
        explanation: "l001-a-explanation",
      },
      {
        id: "l001-b",
        label: "l001-b-label",
        explanation: "l001-b-explanation",
      },
      {
        id: "l001-c",
        label: "l001-c-label",
        explanation: "l001-c-explanation",
      },
      {
        id: "l001-d",
        label: "l001-d-label",
        explanation: "l001-d-explanation",
      },
    ],
    correctAnswerId: "l001-a",
  },
  l002: {
    prompt: "l002-prompt",
    answers: [
      {
        id: "l002-a",
        label: "l002-a-label",
        explanation: "l002-a-explanation",
      },
      {
        id: "l002-b",
        label: "l002-b-label",
        explanation: "l002-a-explanation",
      },
      {
        id: "l002-c",
        label: "l002-c-label",
        explanation: "l002-a-explanation",
      },
      {
        id: "l002-d",
        label: "l002-d-label",
        explanation: "l002-d-explanation",
      },
    ],
    correctAnswerId: "l002-a",
  },
  l003: {
    prompt: "l003-prompt",
    answers: [
      {
        id: "l003-a",
        label: "l003-a-label",
        explanation: "l003-a-explanation",
      },
      {
        id: "l003-b",
        label: "l003-b-label",
        explanation: "l003-b-explanation",
      },
      {
        id: "l003-c",
        label: "l003-c-label",
        explanation: "l003-c-explanation",
      },
      {
        id: "l003-d",
        label: "l003-d-label",
        explanation: "l003-d-explanation",
      },
    ],
    correctAnswerId: "l003-d",
  },
  l004: {
    prompt: "l004-prompt",
    answers: [
      {
        id: "l004-a",
        label: "l004-a-label",
        explanation: "l004-a-explanation",
      },
      {
        id: "l004-b",
        label: "l004-b-label",
        explanation: "l004-b-explanation",
      },
      {
        id: "l004-c",
        label: "l004-c-label",
        explanation: "l004-c-explanation",
      },
      {
        id: "l004-d",
        label: "l004-d-label",
        explanation: "l004-d-explanation",
      },
    ],
    correctAnswerId: "l004-c",
  },
  l005: {
    prompt: "l005-prompt",
    answers: [
      {
        id: "l005-a",
        label: "l005-a-label",
        explanation: "l005-a-explanation",
      },
      {
        id: "l005-b",
        label: "l005-b-label",
        explanation: "l005-b-explanation",
      },
      {
        id: "l005-c",
        label: "l005-c-label",
        explanation: "l005-c-explanation",
      },
      {
        id: "l005-d",
        label: "l005-d-label",
        explanation: "l005-d-explanation",
      },
    ],
    correctAnswerId: "l005-a",
  },
  l006: {
    prompt: "l006-prompt",
    answers: [
      {
        id: "l006-a",
        label: "l006-a-label",
        explanation: "l006-a-explanation",
      },
      {
        id: "l006-b",
        label: "l006-b-label",
        explanation: "l006-a-explanation",
      },
    ],
    correctAnswerId: "l006-b",
  },
} as const satisfies QuestionBank

export default questionBank
