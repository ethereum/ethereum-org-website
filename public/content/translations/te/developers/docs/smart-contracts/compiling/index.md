---
title: స్మార్ట్ కాంట్రాక్ట్‌లను కంపైల్ చేయడం
description: మీరు స్మార్ట్ కాంట్రాక్ట్‌లను ఎందుకు కంపైల్ చేయాలి మరియు కంపైలేషన్ వాస్తవానికి ఏమి చేస్తుందనే దాని గురించి వివరణ.
lang: te
incomplete: true
---

మీ వెబ్ యాప్ మరియు ఎథీరియం వర్చువల్ మెషిన్ (EVM) అర్థం చేసుకోవడానికి మీరు మీ కాంట్రాక్ట్‌ను కంపైల్ చేయాలి.

## ముందస్తు అవసరాలు {#prerequisites}

కంపైలేషన్ గురించి చదవడానికి ముందు [స్మార్ట్ కాంట్రాక్ట్‌లు](/developers/docs/smart-contracts/) మరియు [ఎథీరియం వర్చువల్ మెషిన్](/developers/docs/evm/)కి సంబంధించిన మా పరిచయాన్ని చదవడం మీకు ఉపయోగకరంగా ఉండవచ్చు.

## EVM {#the-evm}

[EVM](/developers/docs/evm/) మీ కాంట్రాక్ట్‌ను రన్ చేయగలగాలంటే అది తప్పనిసరిగా **బైట్‌కోడ్**లో ఉండాలి. కంపైలేషన్ దీన్ని ఇలా మారుస్తుంది:

```solidity
pragma solidity 0.4.24;

contract Greeter {

    function greet() public view returns (string memory) {
        return "Hello";
    }

}
```

**ఇలా మారుస్తుంది**

```
PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x41 JUMPI PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0xCFAE3217 EQ PUSH2 0x46 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x52 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x5B PUSH2 0xD6 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x9B JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x80 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xC8 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x40 DUP1 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x5 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x48656C6C6F000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP SWAP1 POP SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 SLT 0xec 0xe 0xf5 0xf8 SLT 0xc7 0x2d STATICCALL ADDRESS SHR 0xdb COINBASE 0xb1 BALANCE 0xe8 0xf8 DUP14 0xda 0xad DUP13 LOG1 0x4c 0xb4 0x26 0xc2 DELEGATECALL PUSH7 0x8994D3E002900
```

వీటిని **ఆప్‌కోడ్‌లు** అని పిలుస్తారు. EVM ఆప్‌కోడ్‌లు అనేవి ఎథీరియం వర్చువల్ మెషిన్ (EVM) అమలు చేయగల తక్కువ-స్థాయి సూచనలు. ప్రతి ఆప్‌కోడ్ అంకగణిత కార్యకలాపాలు, తార్కిక కార్యకలాపాలు, డేటా మానిప్యులేషన్, కంట్రోల్ ఫ్లో మొదలైన నిర్దిష్ట ఆపరేషన్‌ను సూచిస్తుంది.

[ఆప్‌కోడ్‌ల గురించి మరింత సమాచారం](/developers/docs/evm/opcodes/)

## వెబ్ అప్లికేషన్‌లు {#web-applications}

కంపైలర్ **అప్లికేషన్ బైనరీ ఇంటర్‌ఫేస్ (ABI)**ని కూడా ఉత్పత్తి చేస్తుంది, మీ అప్లికేషన్ కాంట్రాక్ట్‌ను అర్థం చేసుకోవడానికి మరియు కాంట్రాక్ట్ ఫంక్షన్‌లను కాల్ చేయడానికి ఇది మీకు అవసరం.

ABI అనేది డిప్లాయ్ చేయబడిన కాంట్రాక్ట్ మరియు దాని స్మార్ట్ కాంట్రాక్ట్ ఫంక్షన్‌లను వివరించే JSON ఫైల్. ఇది వెబ్2 మరియు Web3 మధ్య అంతరాన్ని తగ్గించడానికి వారధిగా సహాయపడుతుంది.

మీ వెబ్ యాప్ ఇంటర్‌ఫేస్‌లో మీ స్మార్ట్ కాంట్రాక్ట్‌ను కాల్ చేయడానికి [JavaScript క్లయింట్ లైబ్రరీ](/developers/docs/apis/javascript/) **ABI**ని చదువుతుంది.

ERC-20 టోకెన్ కాంట్రాక్ట్ కోసం ABI క్రింద ఇవ్వబడింది. ERC-20 అనేది మీరు ఎథీరియంపై ట్రేడ్ చేయగల ఒక టోకెన్.

```json
[
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
]
```

## మరింత చదవడానికి {#further-reading}

- [ABI స్పెక్](https://solidity.readthedocs.io/en/v0.7.0/abi-spec.html) _– Solidity_

## సంబంధిత అంశాలు {#related-topics}

- [JavaScript క్లయింట్ లైబ్రరీలు](/developers/docs/apis/javascript/)
- [ఎథీరియం వర్చువల్ మెషిన్](/developers/docs/evm/)