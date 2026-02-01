---
title: "اسمارٹ کنٹریکٹس کو کمپائل کرنا"
description: "یہ وضاحت کہ آپ کو اسمارٹ کنٹریکٹس کو کمپائل کرنے کی ضرورت کیوں ہے اور کمپائلیشن دراصل کیا کرتا ہے۔"
lang: ur-in
incomplete: true
---

آپ کو اپنے کنٹریکٹ کو کمپائل کرنے کی ضرورت ہے تاکہ آپ کی ویب ایپ اور Ethereum ورچوئل مشین (EVM) اسے سمجھ سکیں۔

## شرائط {#prerequisites}

کمپائلیشن کے بارے میں پڑھنے سے پہلے آپ کو [اسمارٹ کنٹریکٹس](/developers/docs/smart-contracts/) اور [Ethereum ورچوئل مشین](/developers/docs/evm/) کے تعارف کو پڑھنا مفید معلوم ہو سکتا ہے۔

## EVM {#the-evm}

[EVM](/developers/docs/evm/) کے لیے آپ کے کنٹریکٹ کو چلانے کے قابل ہونے کے لیے، اسے **بائٹ کوڈ** میں ہونا چاہیے۔ کمپائلیشن اسے اس میں بدل دیتا ہے:

```solidity
pragma solidity 0.4.24;

contract Greeter {

    function greet() public view returns (string memory) {
        return "Hello";
    }

}
```

**اس میں**

```
PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x41 JUMPI PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0xCFAE3217 EQ PUSH2 0x46 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x52 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x5B PUSH2 0xD6 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x9B JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x80 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xC8 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x40 DUP1 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x5 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x48656C6C6F000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP SWAP1 POP SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 SLT 0xec 0xe 0xf5 0xf8 SLT 0xc7 0x2d STATICCALL ADDRESS SHR 0xdb COINBASE 0xb1 BALANCE 0xe8 0xf8 DUP14 0xda 0xad DUP13 LOG1 0x4c 0xb4 0x26 0xc2 DELEGATECALL PUSH7 0x8994D3E002900
```

انہیں **آپ کوڈز** کہا جاتا ہے۔ EVM آپ کوڈز نچلی سطح کی ہدایات ہیں جنہیں Ethereum ورچوئل مشین (EVM) عمل میں لا سکتی ہے۔ ہر آپ کوڈ ایک مخصوص آپریشن کی نمائندگی کرتا ہے، جیسے کہ ریاضی کے آپریشنز، منطقی آپریشنز، ڈیٹا میں ہیرا پھیری، کنٹرول فلو، وغیرہ۔

[آپ کوڈز پر مزید](/developers/docs/evm/opcodes/)

## ویب ایپلیکیشنز {#web-applications}

کمپائلر **ایپلیکیشن بائنری انٹرفیس (ABI)** بھی تیار کرے گا جس کی آپ کو اپنی ایپلیکیشن کے لیے کنٹریکٹ کو سمجھنے اور کنٹریکٹ کے فنکشنز کو کال کرنے کے لیے ضرورت ہوتی ہے۔

ABI ایک JSON فائل ہے جو تعینات کردہ کنٹریکٹ اور اس کے اسمارٹ کنٹریکٹ فنکشنز کو بیان کرتی ہے۔ یہ ویب 2 اور ویب 3 کے درمیان فرق کو ختم کرنے میں مدد کرتا ہے

ایک [JavaScript کلائنٹ لائبریری](/developers/docs/apis/javascript/) **ABI** کو پڑھے گی تاکہ آپ اپنی ویب ایپ کے انٹرفیس میں اپنے اسمارٹ کنٹریکٹ پر کال کر سکیں۔

ذیل میں ERC-20 ٹوکن کنٹریکٹ کے لیے ABI ہے۔ ایک ERC-20 ایک ٹوکن ہے جسے آپ Ethereum پر ٹریڈ کر سکتے ہیں۔

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

## مزید پڑھیں {#further-reading}

- [ABI کی تفصیلات](https://solidity.readthedocs.io/en/v0.7.0/abi-spec.html) _– Solidity_

## متعلقہ موضوعات {#related-topics}

- [JavaScript کلائنٹ لائبریریز](/developers/docs/apis/javascript/)
- [Ethereum ورچوئل مشین](/developers/docs/evm/)
