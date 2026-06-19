---
title: "تصريف العقود الذكية"
description: "شرح لسبب حاجتك إلى تصريف العقود الذكية وما يفعله التصريف فعليًا."
lang: ar
incomplete: true
---

تحتاج إلى تصريف العقد الخاص بك حتى يتمكن تطبيق الويب الخاص بك وجهاز إيثيريوم الظاهري (<span dir="ltr">EVM</span>) من فهمه.

## المتطلبات الأساسية {#prerequisites}

قد تجد أنه من المفيد قراءة مقدمتنا عن [العقود الذكية](/developers/docs/smart-contracts/) و[جهاز إيثيريوم الظاهري](/developers/docs/evm/) قبل القراءة عن التصريف.

## <span dir="ltr">EVM</span> {#the-evm}

لكي يتمكن [<span dir="ltr">EVM</span>](/developers/docs/evm/) من تشغيل العقد الخاص بك، يجب أن يكون في شكل **رمز البايت**. يحول التصريف هذا:

```solidity
pragma solidity 0.4.24;

contract Greeter {

    function greet() public view returns (string memory) {
        return "Hello";
    }

}
```

**إلى هذا**

```
PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x41 JUMPI PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0xCFAE3217 EQ PUSH2 0x46 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x52 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x5B PUSH2 0xD6 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x9B JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x80 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xC8 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x40 DUP1 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x5 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x48656C6C6F000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP SWAP1 POP SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 SLT 0xec 0xe 0xf5 0xf8 SLT 0xc7 0x2d STATICCALL ADDRESS SHR 0xdb COINBASE 0xb1 BALANCE 0xe8 0xf8 DUP14 0xda 0xad DUP13 LOG1 0x4c 0xb4 0x26 0xc2 DELEGATECALL PUSH7 0x8994D3E002900
```

تُسمى هذه **رموز التشغيل**. رموز التشغيل في <span dir="ltr">EVM</span> هي التعليمات منخفضة المستوى التي يمكن لجهاز إيثيريوم الظاهري (<span dir="ltr">EVM</span>) تنفيذها. يمثل كل رمز تشغيل عملية محددة، مثل العمليات الحسابية، والعمليات المنطقية، ومعالجة البيانات، وتدفق التحكم، وما إلى ذلك.

[المزيد عن رموز التشغيل](/developers/docs/evm/opcodes/)

## تطبيقات الويب {#web-applications}

سينتج المترجم أيضًا **واجهة التطبيق الثنائية (<span dir="ltr">ABI</span>)** والتي تحتاجها لكي يفهم تطبيقك العقد ويستدعي وظائف العقد.

<span dir="ltr">ABI</span> هو ملف <span dir="ltr">JSON</span> يصف العقد المنشور ووظائف العقد الذكي الخاصة به. يساعد هذا في سد الفجوة بين ويب 2 و<span dir="ltr">Web3</span>

ستقرأ [مكتبة عميل <span dir="ltr">JavaScript</span>](/developers/docs/apis/javascript/) **<span dir="ltr">ABI</span>** لكي تتمكن من استدعاء العقد الذكي الخاص بك في واجهة تطبيق الويب الخاص بك.

يوجد أدناه <span dir="ltr">ABI</span> لعقد الرمز المميز <span dir="ltr">ERC-20</span>. <span dir="ltr">ERC-20</span> هو رمز مميز يمكنك تداوله على إيثيريوم.

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

## قراءة متعمقة {#further-reading}

- [مواصفات <span dir="ltr">ABI</span>](https://solidity.readthedocs.io/en/v0.7.0/abi-spec.html) _– <span dir="ltr">Solidity</span>_

## مواضيع ذات صلة {#related-topics}

- [مكتبات عميل <span dir="ltr">JavaScript</span>](/developers/docs/apis/javascript/)
- [جهاز إيثيريوم الظاهري](/developers/docs/evm/)