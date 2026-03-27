---
title: "எலிக்சர் (Elixir) டெவலப்பர்களுக்கான Ethereum"
description: "எலிக்சர் (Elixir) அடிப்படையிலான திட்டங்கள் மற்றும் கருவிகளைப் பயன்படுத்தி Ethereum-க்காக எவ்வாறு உருவாக்குவது என்பதை அறிக."
lang: ta
incomplete: false
---

<FeaturedText>எலிக்சர் (Elixir) அடிப்படையிலான திட்டங்கள் மற்றும் கருவிகளைப் பயன்படுத்தி Ethereum-க்காக எவ்வாறு உருவாக்குவது என்பதை அறிக.</FeaturedText>

கிரிப்டோகரன்சி மற்றும் பிளாக்செயின் தொழில்நுட்பத்தின் நன்மைகளைப் பயன்படுத்தும் பரவலாக்கப்பட்ட பயன்பாடுகளை (அல்லது "dapps") உருவாக்க Ethereum-ஐப் பயன்படுத்தவும். இந்த டாப்ஸ்கள் (dapps) நம்பகத்தன்மையற்றதாக இருக்கலாம், அதாவது அவை Ethereum-ல் பயன்படுத்தப்பட்டவுடன், அவை எப்போதும் நிரல்படுத்தப்பட்டபடியே இயங்கும். புதிய வகையான நிதிப் பயன்பாடுகளை உருவாக்க அவை டிஜிட்டல் சொத்துக்களைக் கட்டுப்படுத்தலாம். அவை பரவலாக்கப்பட்டதாக இருக்கலாம், அதாவது எந்தவொரு தனி நிறுவனமோ அல்லது நபரோ அவற்றைக் கட்டுப்படுத்த முடியாது மற்றும் தணிக்கை செய்வது கிட்டத்தட்ட சாத்தியமற்றது.

## ஸ்மார்ட் ஒப்பந்தங்கள் மற்றும் Solidity மொழியுடன் தொடங்குதல் {#getting-started-with-smart-contracts-and-solidity}

**Ethereum உடன் Elixir-ஐ ஒருங்கிணைப்பதற்கான உங்கள் முதல் படிகளை எடுங்கள்**

முதலில் இன்னும் அடிப்படையான அறிமுகம் தேவையா? [ethereum.org/learn](/learn/) அல்லது [ethereum.org/developers](/developers/) ஐப் பார்க்கவும்.

- [பிளாக்செயின் விளக்கம்](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [ஸ்மார்ட் ஒப்பந்தங்களைப் புரிந்துகொள்வது](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [உங்கள் முதல் ஸ்மார்ட் ஒப்பந்தத்தை எழுதுங்கள்](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity-ஐ எவ்வாறு தொகுப்பது மற்றும் பயன்படுத்துவது என்பதை அறிக](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## தொடக்கநிலை கட்டுரைகள் {#beginner-articles}

- [இறுதியாக Ethereum கணக்குகளைப் புரிந்துகொள்வது](https://dev.to/q9/finally-understanding-ethereum-accounts-1kpe)
- [Ethers — Elixir-க்கான முதல் தர Ethereum Web3 நூலகம்](https://medium.com/@alisinabh/announcing-ethers-a-first-class-ethereum-web3-library-for-elixir-1d64e9409122)

## இடைநிலை கட்டுரைகள் {#intermediate-articles}

- [Elixir மூலம் மூல Ethereum ஒப்பந்த பரிவர்த்தனைகளில் எவ்வாறு கையொப்பமிடுவது](https://kohlerjp.medium.com/how-to-sign-raw-ethereum-contract-transactions-with-elixir-f8822bcc813b)
- [Ethereum ஸ்மார்ட் ஒப்பந்தங்கள் மற்றும் Elixir](https://medium.com/agile-alpha/ethereum-smart-contracts-and-elixir-c7c4b239ddb4)

## Elixir திட்டங்கள் மற்றும் கருவிகள் {#elixir-projects-and-tools}

### செயலில் உள்ளவை {#active}

- [block_keys](https://github.com/ExWeb3/block_keys) - _Elixir-ல் BIP32 & BIP44 செயலாக்கம் (தீர்மானிக்கப்பட்ட வாலெட்டுகளுக்கான பல-கணக்கு படிநிலை)_
- [ethereumex](https://github.com/mana-ethereum/ethereumex) - _Ethereum பிளாக்செயினுக்கான Elixir JSON-RPC கிளையன்ட்_
- [ethers](https://github.com/ExWeb3/elixir_ethers) - _Elixir-ஐப் பயன்படுத்தி Ethereum-ல் ஸ்மார்ட் ஒப்பந்தங்களுடன் தொடர்புகொள்வதற்கான விரிவான Web3 நூலகம்_
- [ethers_kms](https://github.com/ExWeb3/elixir_ethers_kms) - _Ethers-க்கான KMS கையொப்பமிடும் நூலகம் (AWS KMS உடன் பரிவர்த்தனைகளில் கையொப்பமிடுங்கள்)_
- [ex_abi](https://github.com/poanetwork/ex_abi) - _Elixir-ல் Ethereum ABI பாகுபடுத்தி/டிகோடர்/என்கோடர் செயலாக்கம்_
- [ex_keccak](https://github.com/ExWeb3/ex_keccak) - _NIF-ஆல் உருவாக்கப்பட்ட tiny-keccak Rust crate-ஐப் பயன்படுத்தி Keccak SHA3-256 ஹாஷ்களைக் கணக்கிடுவதற்கான Elixir நூலகம்_
- [ex_rlp](https://github.com/mana-ethereum/ex_rlp) - _Ethereum-இன் RLP (Recursive Length Prefix) குறியாக்கத்தின் Elixir செயலாக்கம்_

### காப்பகப்படுத்தப்பட்டவை / இனி பராமரிக்கப்படாதவை {#archived--no-longer-maintained}

- [eth](https://hex.pm/packages/eth) - _Elixir-க்கான Ethereum பயன்பாடுகள்_
- [exw3](https://github.com/hswick/exw3) - _Elixir-க்கான உயர்நிலை Ethereum RPC கிளையன்ட்_
- [mana](https://github.com/mana-ethereum/mana) - _Elixir-ல் எழுதப்பட்ட Ethereum முழு நோடு செயலாக்கம்_

மேலும் ஆதாரங்களைத் தேடுகிறீர்களா? [எங்கள் டெவலப்பரின் முகப்புப்பக்கத்தைப்](/developers/) பார்க்கவும்.

## Elixir சமூகப் பங்களிப்பாளர்கள் {#elixir-community-contributors}

[Elixir-இன் Slack #ethereum சேனல்](https://elixir-lang.slack.com/archives/C5RPZ3RJL) வேகமாக வளர்ந்து வரும் சமூகத்தின் தொகுப்பாளராகும், மேலும் இது மேற்கண்ட திட்டங்கள் மற்றும் தொடர்புடைய தலைப்புகள் குறித்த விவாதங்களுக்கான பிரத்யேக ஆதாரமாகும்.