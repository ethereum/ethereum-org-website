---
title: திறன் ஒப்பந்தங்களை தொகுத்தல்
description: திறன் ஒப்பந்தங்களை நீங்கள் ஏன் தொகுக்க வேண்டும் மற்றும் தொகுத்தல் உண்மையில் என்ன செய்கிறது என்பதற்கான விளக்கம்.
lang: ta
incomplete: true
---

உங்கள் வலைப் பயன்பாடு மற்றும் எத்திரியம் மெய்நிகர் இயந்திரம் (EVM) ஆகியவற்றால் புரிந்துகொள்ளும் வகையில் உங்கள் ஒப்பந்தத்தை நீங்கள் தொகுக்க வேண்டும்.

## முன்நிபந்தனைகள் {#prerequisites}

தொகுத்தல் பற்றி படிப்பதற்கு முன், [திறன் ஒப்பந்தங்கள்](/developers/docs/smart-contracts/) மற்றும் [எத்திரியம் மெய்நிகர் இயந்திரம்](/developers/docs/evm/) பற்றிய எங்கள் அறிமுகத்தைப் படிப்பது உங்களுக்கு பயனுள்ளதாக இருக்கும்.

## EVM {#the-evm}

[EVM](/developers/docs/evm/) உங்கள் ஒப்பந்தத்தை இயக்க, அது **பைட் குறியீடு** வடிவத்தில் இருக்க வேண்டும். தொகுத்தல் இதை:

```solidity
pragma solidity 0.4.24;

contract Greeter {

    function greet() public view returns (string memory) {
        return "Hello";
    }

}
```

**இப்படி மாற்றுகிறது**

```
PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x41 JUMPI PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0xCFAE3217 EQ PUSH2 0x46 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x52 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x5B PUSH2 0xD6 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x9B JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x80 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xC8 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x40 DUP1 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x5 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x48656C6C6F000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP SWAP1 POP SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 SLT 0xec 0xe 0xf5 0xf8 SLT 0xc7 0x2d STATICCALL ADDRESS SHR 0xdb COINBASE 0xb1 BALANCE 0xe8 0xf8 DUP14 0xda 0xad DUP13 LOG1 0x4c 0xb4 0x26 0xc2 DELEGATECALL PUSH7 0x8994D3E002900
```

இவை **செயல்பாட்டுக் குறியீடுகள்** (opcodes) என்று அழைக்கப்படுகின்றன. EVM செயல்பாட்டுக் குறியீடுகள் என்பவை எத்திரியம் மெய்நிகர் இயந்திரம் (EVM) இயக்கக்கூடிய கீழ்-நிலை வழிமுறைகளாகும். ஒவ்வொரு செயல்பாட்டுக் குறியீடும் எண்கணித செயல்பாடுகள், தருக்க செயல்பாடுகள், தரவு கையாளுதல், கட்டுப்பாட்டு ஓட்டம் போன்ற ஒரு குறிப்பிட்ட செயல்பாட்டைக் குறிக்கிறது.

[செயல்பாட்டுக் குறியீடுகள் பற்றி மேலும் அறிய](/developers/docs/evm/opcodes/)

## வலைப் பயன்பாடுகள் {#web-applications}

உங்கள் பயன்பாடு ஒப்பந்தத்தைப் புரிந்துகொள்ளவும், ஒப்பந்தத்தின் செயல்பாடுகளை அழைக்கவும் தேவையான **பயன்பாட்டு பைனரி இடைமுகத்தையும் (ABI)** தொகுப்பான் உருவாக்கும்.

ABI என்பது பயன்படுத்தப்பட்ட ஒப்பந்தம் மற்றும் அதன் திறன் ஒப்பந்த செயல்பாடுகளை விவரிக்கும் ஒரு JSON கோப்பாகும். இது வெப்2 மற்றும் Web3 ஆகியவற்றுக்கு இடையேயான இடைவெளியைக் குறைக்க ஒரு பாலமாக உதவுகிறது.

உங்கள் வலைப் பயன்பாட்டின் இடைமுகத்தில் உங்கள் திறன் ஒப்பந்தத்தை அழைப்பதற்காக, ஒரு [JavaScript கிளையண்ட் நிரலகம்](/developers/docs/apis/javascript/) **ABI**-ஐப் படிக்கும்.

ERC-20 வில்லை ஒப்பந்தத்திற்கான ABI கீழே கொடுக்கப்பட்டுள்ளது. ERC-20 என்பது எத்திரியத்தில் நீங்கள் வர்த்தகம் செய்யக்கூடிய ஒரு வில்லையாகும்.

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

## மேலும் படிக்க {#further-reading}

- [ABI விவரக்குறிப்பு](https://solidity.readthedocs.io/en/v0.7.0/abi-spec.html) _– Solidity_

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [JavaScript கிளையண்ட் நிரலகங்கள்](/developers/docs/apis/javascript/)
- [எத்திரியம் மெய்நிகர் இயந்திரம்](/developers/docs/evm/)