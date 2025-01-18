---
title: स्मार्ट कॉन्ट्रैक्ट्स संकलित करना
description: आपको स्मार्ट अनुबंधों को संकलित करने की आवश्यकता क्यों है और संकलन वास्तव में क्या करता है, इसका स्पष्टीकरण।
lang: hi
incomplete: true
---

आपको अपने अनुबंध को संकलित करने की आवश्यकता है ताकि आपका वेब ऐप और एथेरियम वर्चुअल मशीन (EVM) इसे समझ सकें।

## आवश्यक शर्तें {#prerequisites}

संकलन के बारे में पढ़ने से पहले [स्मार्ट अनुबंध](/developers/docs/smart-contracts/) और [एथेरियम वर्चुअल मशीन](/developers/docs/evm/) के बारे में हमारा परिचय पढ़ने से आपको मदद मिल सकती है।

## EVM {#the-evm}

[EVM](/developers/docs/evm/) को आपका अनुबंध चलाने में सक्षम होने के लिए इसे **बाइटकोड** में होना चाहिए। संकलन इसे बदल देता है:

```solidity
pragma solidity 0.4.24;

contract Greeter {

    function greet() public constant returns (string) {
        return "Hello";
    }

}
```

**इस में**

```
PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x41 JUMPI PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0xCFAE3217 EQ PUSH2 0x46 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x52 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x5B PUSH2 0xD6 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x9B JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x80 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xC8 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x40 DUP1 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x5 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x48656C6C6F000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP SWAP1 POP SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 SLT 0xec 0xe 0xf5 0xf8 SLT 0xc7 0x2d STATICCALL ADDRESS SHR 0xdb COINBASE 0xb1 BALANCE 0xe8 0xf8 DUP14 0xda 0xad DUP13 LOG1 0x4c 0xb4 0x26 0xc2 DELEGATECALL PUSH7 0x8994D3E002900
```

इन्हें **ऑपकोड कहा जाता है**। EVM ऑपकोड निम्न-स्तरीय निर्देश हैं जिन्हें एथेरियम वर्चुअल मशीन (EVM) निष्पादित कर सकता है। प्रत्येक ऑपकोड एक विशिष्ट संचालन का प्रतिनिधित्व करता है, जैसे अंकगणितीय संचालन, तार्किक संचालन, डेटा हेरफेर, नियंत्रण प्रवाह आदि।

[ऑपकोड पर अधिक](/developers/docs/evm/opcodes/)

## वेब एप्लिकेशन {#web-applications}

कंपाइलर **एप्लिकेशन बाइनरी इंटरफेस (ABI)** का भी उत्पादन करेगा, जिसकी आवश्यकता आपके एप्लिकेशन को अनुबंध को समझने और अनुबंध के फंक्शन को कॉल करने के लिए होगी।

ABI एक JSON फ़ाइल है जो परिनियोजित अनुबंध और इसके स्मार्ट अनुबंध फंक्शंस का वर्णन करती है। यह web2 और web3 के बीच की खाई को पाटने में मदद करता है

एक [JavaScript क्लाइंट लाइब्रेरी](/developers/docs/apis/javascript/) आपके वेब ऐप के इंटरफ़ेस में अपने स्मार्ट अनुबंध पर कॉल करने के लिए **ABI** पढ़ेगी।

नीचे ERC-20 टोकन अनुबंध के लिए ABI है। ERC-20 एक टोकन है जिसे आप एथेरियम पर ट्रेड कर सकते हैं।

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

## अग्रिम पठन {#further-reading}

- [ABI विनिर्देश](https://solidity.readthedocs.io/en/v0.7.0/abi-spec.html) _– Solidity_

## संबंधित विषय {#related-topics}

- [JavaScript क्लाइंट लाइब्रेरी](/developers/docs/apis/javascript/)
- [एथेरियम वर्चुअल मशीन](/developers/docs/evm/)
