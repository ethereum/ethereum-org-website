const whatIsEthereumQuiz = {
  title: "What is Ethereum Quiz",
  questions: [
    {
      correctAnswer: "b",
      question: "What is the biggest difference between Bitcoin and Ethereum?",
      answers: {
        a: {
          label:
            "Bitcoin has middlemen that mediate transactions, Ethereum does not",
          description:
            "The whole point of cryptocurrency, any cryptocurrency, is that you can transact directly with whoever you wish, without the need for middlemen",
        },
        b: {
          label: "Ethereum is programmable, Bitcoin is not",
          description:
            "Unlike Bitcoin, Ethereum has smart contracts, expanding the utility of the network past payments.",
        },
        c: {
          label:
            "Ethereum has middlemen that mediate transactions, Bitcoin does not",
          description:
            "The whole point of cryptocurrency, any cryptocurrency, is that you can transact directly with whoever you wish, without the need for middlemen",
        },
        d: {
          label: "Ethereum preserves privacy, Bitcoin does not",
          description:
            "Every node needs to be able to verify the blockchain's history from the beginning until the present. Therefore, there are no secrets on the blockchain. The only way to preserve privacy on the blockchain is to use private keys (and therefore identities) that cannot be traced back to you. This is possible on both Bitcoin and Ethereum.",
        },
      },
    },
    {
      correctAnswer: "a",
      question: "Blah Blah",
      answers: {
        a: {
          label: "a",
          description: "a",
        },
        b: {
          label: "b",
          description: "b",
        },
        c: {
          label: "c",
          description: "c",
        },
        d: {
          label: "d",
          description: "d",
        },
      },
    },
  ],
}

export default whatIsEthereumQuiz
