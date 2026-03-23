---
title: "स्मार्ट कॉन्ट्रॅक्ट्स संकलित करणे"
description: "स्मार्ट कॉन्ट्रॅक्ट्स का संकलित करावे लागतात आणि संकलन नेमके काय करते, याचे स्पष्टीकरण."
lang: mr
incomplete: true
---

तुम्हाला तुमचा कॉन्ट्रॅक्ट संकलित करण्याची गरज आहे जेणेकरून तुमचे वेब ॲप आणि इथेरियम व्हर्च्युअल मशीन (EVM) ते समजू शकतील.

## पूर्वतयारी {#prerequisites}

संकलनाबद्दल वाचण्यापूर्वी, [स्मार्ट कॉन्ट्रॅक्ट्स](/developers/docs/smart-contracts/) आणि [इथेरियम व्हर्च्युअल मशीन](/developers/docs/evm/) यांबद्दलचा आमचा परिचय वाचणे तुम्हाला उपयुक्त वाटू शकते.

## EVM {#the-evm}

[EVM](/developers/docs/evm/) ला तुमचा कॉन्ट्रॅक्ट चालवता यावा यासाठी, तो **बाइटकोड** मध्ये असणे आवश्यक आहे. संकलन याचे रूपांतर यात करते:

```solidity
pragma solidity 0.4.24;\n\ncontract Greeter {\n\n    function greet() public view returns (string memory) {\n        return \
```

**यात**

```
PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0x41 JUMPI PUSH1 0x0 CALLDATALOAD PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND DUP1 PUSH4 0xCFAE3217 EQ PUSH2 0x46 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x52 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x5B PUSH2 0xD6 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x9B JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x80 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0xC8 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x40 DUP1 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x5 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x48656C6C6F000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP SWAP1 POP SWAP1 JUMP STOP LOG1 PUSH6 0x627A7A723058 KECCAK256 SLT 0xec 0xe 0xf5 0xf8 SLT 0xc7 0x2d STATICCALL ADDRESS SHR 0xdb COINBASE 0xb1 BALANCE 0xe8 0xf8 DUP14 0xda 0xad DUP13 LOG1 0x4c 0xb4 0x26 0xc2 DELEGATECALL PUSH7 0x8994D3E002900
```

यांना **ऑपकोड्स** म्हणतात. EVM ऑपकोड्स ह्या निम्न-स्तरीय सूचना आहेत ज्या इथेरियम व्हर्च्युअल मशीन (EVM) कार्यान्वित करू शकते. प्रत्येक ऑपकोड एक विशिष्ट ऑपरेशन दर्शवतो, जसे की अंकगणितीय ऑपरेशन्स, तार्किक ऑपरेशन्स, डेटा मॅनिप्युलेशन, कंट्रोल फ्लो, इत्यादी.

[ऑपकोड्सबद्दल अधिक](/developers/docs/evm/opcodes/)

## वेब ॲप्लिकेशन्स {#web-applications}

कंपाइलर **ॲप्लिकेशन बायनरी इंटरफेस (ABI)** सुद्धा तयार करतो. तुमच्या ॲप्लिकेशनला कॉन्ट्रॅक्ट समजण्यासाठी आणि त्याची फंक्शन्स कॉल करण्यासाठी तुम्हाला याची गरज असते.

ABI ही एक JSON फाईल आहे जी तैनात केलेल्या कॉन्ट्रॅक्ट आणि त्याच्या स्मार्ट कॉन्ट्रॅक्ट फंक्शन्सचे वर्णन करते. हे वेब2 आणि वेब3 मधील अंतर कमी करण्यास मदत करते.

तुम्ही तुमच्या वेब ॲप इंटरफेसमध्ये तुमच्या स्मार्ट कॉन्ट्रॅक्टवर कॉल करू शकावे, यासाठी एक [जावास्क्रिप्ट क्लायंट लायब्ररी](/developers/docs/apis/javascript/) **ABI** वाचते.

खाली ERC-20 टोकन कॉन्ट्रॅक्टसाठी ABI दिलेला आहे. ERC-20 हे एक टोकन आहे ज्याचा तुम्ही इथेरियमवर व्यापार करू शकता.

```json
[\n  {\n    \
```

## पुढील वाचन {#further-reading}

- [ABI तपशील](https://solidity.readthedocs.io/en/v0.7.0/abi-spec.html) _– सॉलिडिटी_

## संबंधित विषय {#related-topics}

- [जावास्क्रिप्ट क्लायंट लायब्ररी](/developers/docs/apis/javascript/)
- [इथेरियम व्हर्च्युअल मशीन](/developers/docs/evm/)
