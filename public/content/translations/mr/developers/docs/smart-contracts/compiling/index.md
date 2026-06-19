---
title: स्मार्ट कॉन्ट्रॅक्ट्स कंपाईल करणे
description: तुम्हाला स्मार्ट कॉन्ट्रॅक्ट्स कंपाईल करण्याची आवश्यकता का आहे आणि कंपाईलेशन प्रत्यक्षात काय करते याचे स्पष्टीकरण.
lang: mr
incomplete: true
---

तुम्हाला तुमचे कॉन्ट्रॅक्ट कंपाईल करणे आवश्यक आहे जेणेकरून तुमचे वेब ॲप आणि इथेरियम व्हर्च्युअल मशीन (EVM) ते समजू शकतील.

## पूर्वअटी {#prerequisites}

कंपाईलेशनबद्दल वाचण्यापूर्वी तुम्ही आमची [स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/) आणि [इथेरियम व्हर्च्युअल मशीन](/developers/docs/evm/) ची ओळख वाचल्यास तुम्हाला ते उपयुक्त वाटू शकेल.

## EVM {#the-evm}

[EVM](/developers/docs/evm/) ला तुमचे कॉन्ट्रॅक्ट रन करता यावे यासाठी ते **बाइटकोड** मध्ये असणे आवश्यक आहे. कंपाईलेशन याचे रूपांतर:

```solidity
pragma solidity 0.4.24;

contract Greeter {

    function greet() public view returns (string memory) {
        return "Hello";
    }

}
```

**यामध्ये करते**

```
PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x41 JUMPI PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0xCFAE3217 EQ PUSH2 0x46 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x52 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x5B PUSH2 0xD6 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x9B JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x80 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xC8 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x40 DUP1 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x5 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x48656C6C6F000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP SWAP1 POP SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 SLT 0xec 0xe 0xf5 0xf8 SLT 0xc7 0x2d STATICCALL ADDRESS SHR 0xdb COINBASE 0xb1 BALANCE 0xe8 0xf8 DUP14 0xda 0xad DUP13 LOG1 0x4c 0xb4 0x26 0xc2 DELEGATECALL PUSH7 0x8994D3E002900
```

यांना **ऑपकोड्स** म्हणतात. EVM ऑपकोड्स या लो-लेव्हल सूचना आहेत ज्या इथेरियम व्हर्च्युअल मशीन (EVM) कार्यान्वित करू शकते. प्रत्येक ऑपकोड एका विशिष्ट क्रियेचे प्रतिनिधित्व करतो, जसे की अंकगणितीय क्रिया, तार्किक क्रिया, डेटा हाताळणी, कंट्रोल फ्लो इ.

[ऑपकोड्सबद्दल अधिक](/developers/docs/evm/opcodes/)

## वेब ॲप्लिकेशन्स {#web-applications}

कंपाईलर **ॲप्लिकेशन बायनरी इंटरफेस (ABI)** देखील तयार करेल ज्याची तुमच्या ॲप्लिकेशनला कॉन्ट्रॅक्ट समजण्यासाठी आणि कॉन्ट्रॅक्टच्या फंक्शन्सना कॉल करण्यासाठी आवश्यकता असते.

ABI ही एक JSON फाईल आहे जी डिप्लॉय केलेल्या कॉन्ट्रॅक्टचे आणि त्याच्या स्मार्ट कॉन्ट्रॅक्ट फंक्शन्सचे वर्णन करते. हे वेब२ आणि Web3 मधील दरी कमी करण्यासाठी सेतू म्हणून मदत करते.

तुमच्या वेब ॲपच्या इंटरफेसमध्ये तुमच्या स्मार्ट कॉन्ट्रॅक्टला कॉल करण्यासाठी [JavaScript क्लायंट लायब्ररी](/developers/docs/apis/javascript/) **ABI** वाचेल.

खाली ERC-20 टोकन कॉन्ट्रॅक्टसाठी ABI आहे. ERC-20 हे एक टोकन आहे ज्याचा तुम्ही इथेरियमवर व्यापार करू शकता.

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

## पुढील वाचन {#further-reading}

- [ABI स्पेसिफिकेशन](https://solidity.readthedocs.io/en/v0.7.0/abi-spec.html) _– Solidity_

## संबंधित विषय {#related-topics}

- [JavaScript क्लायंट लायब्ररीज](/developers/docs/apis/javascript/)
- [इथेरियम व्हर्च्युअल मशीन](/developers/docs/evm/)