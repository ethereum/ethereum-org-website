---
title: "பின்தள API நூலகங்கள்"
description: "உங்கள் பயன்பாட்டிலிருந்து பிளாக்செயினுடன் தொடர்பு கொள்ள அனுமதிக்கும் எத்தேரியம் கிளையண்ட் API-களுக்கான அறிமுகம்."
lang: ta
---

ஒரு மென்பொருள் பயன்பாடு [Ethereum](/) பிளாக்செயினுடன் தொடர்பு கொள்ள (அதாவது, பிளாக்செயின் தரவைப் படிக்க மற்றும்/அல்லது நெட்வொர்க்கிற்கு பரிவர்த்தனைகளை அனுப்ப), அது ஒரு எத்தேரியம் நோடுடன் (node) இணைக்கப்பட வேண்டும்.

இந்த நோக்கத்திற்காக, ஒவ்வொரு எத்தேரியம் கிளையண்டும் [JSON-RPC](/developers/docs/apis/json-rpc/) விவரக்குறிப்பைச் செயல்படுத்துகிறது, எனவே பயன்பாடுகள் நம்பியிருக்கக்கூடிய ஒரு சீரான [முறைகளின்](/developers/docs/apis/json-rpc/#json-rpc-methods) தொகுப்பு உள்ளது.

எத்தேரியம் நோடுடன் இணைக்க ஒரு குறிப்பிட்ட நிரலாக்க மொழியைப் பயன்படுத்த விரும்பினால், சுற்றுச்சூழல் அமைப்பிற்குள் இதை மிகவும் எளிதாக்கும் பல வசதியான நூலகங்கள் உள்ளன. இந்த நூலகங்கள் மூலம், டெவலப்பர்கள் எத்தேரியத்துடன் தொடர்பு கொள்ளும் JSON-RPC கோரிக்கைகளை (பின்னணியில்) தொடங்குவதற்கு உள்ளுணர்வுள்ள, ஒரு வரி முறைகளை எழுதலாம்.

## முன்நிபந்தனைகள் {#prerequisites}

[எத்தேரியம் அடுக்கு (Ethereum stack)](/developers/docs/ethereum-stack/) மற்றும் [எத்தேரியம் கிளையண்டுகளைப்](/developers/docs/nodes-and-clients/) புரிந்துகொள்வது உதவியாக இருக்கும்.

## நூலகத்தை ஏன் பயன்படுத்த வேண்டும்? {#why-use-a-library}

இந்த நூலகங்கள் எத்தேரியம் நோடுடன் நேரடியாகத் தொடர்புகொள்வதில் உள்ள சிக்கலான தன்மையைப் பெரிதும் குறைக்கின்றன. அவை பயன்பாட்டுச் செயல்பாடுகளையும் (உதாரணமாக, ETH-ஐ Gwei-ஆக மாற்றுவது) வழங்குகின்றன, எனவே ஒரு டெவலப்பராக நீங்கள் எத்தேரியம் கிளையண்டுகளின் சிக்கல்களைக் கையாள்வதில் குறைந்த நேரத்தையும், உங்கள் பயன்பாட்டின் தனித்துவமான செயல்பாட்டில் அதிக நேரத்தையும் செலவிடலாம்.

## கிடைக்கும் நூலகங்கள் {#available-libraries}

### உள்கட்டமைப்பு மற்றும் நோடு சேவைகள் {#infrastructure-and-node-services}

**Alchemy -** **_எத்தேரியம் மேம்பாட்டு தளம்._**

- [alchemy.com](https://www.alchemy.com/)
- [ஆவணங்கள்](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_சேவையாக நோடு (Node-as-a-Service)._**

- [All That Node.com](https://www.allthatnode.com/)
- [ஆவணங்கள்](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_எத்தேரியம் மெயின்நெட் மற்றும் டெஸ்ட்நெட்டுகளுக்கான பரவலாக்கப்பட்ட API-கள்._**

- [blastapi.io](https://blastapi.io/)
- [ஆவணங்கள்](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_மிகவும் திறமையான மற்றும் வேகமான RPC சேவைகளை வழங்குகிறது_**

- [blockpi.io](https://blockpi.io/)
- [ஆவணங்கள்](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - பிளாக் எக்ஸ்ப்ளோரர் மற்றும் பரிவர்த்தனை API-கள்**
- [ஆவணங்கள்](https://docs.etherscan.io/)

**Blockscout - ஓப்பன் சோர்ஸ் பிளாக் எக்ஸ்ப்ளோரர்**
- [ஆவணங்கள்](https://docs.blockscout.com/)

**GetBlock-** **_Web3 மேம்பாட்டிற்கான சேவையாக பிளாக்செயின் (Blockchain-as-a-service)_**

- [GetBlock.io](https://getblock.io/)
- [ஆவணங்கள்](https://docs.getblock.io/)

**Infura -** **_ஒரு சேவையாக எத்தேரியம் API._**

- [infura.io](https://infura.io)
- [ஆவணங்கள்](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _செலவு குறைந்த EVM JSON-RPC வழங்குநர்_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [ஆவணங்கள்](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _முழு நோடுகள் மற்றும் பிளாக் எக்ஸ்ப்ளோரர்கள்._**

- [NOWNodes.io](https://nownodes.io/)
- [ஆவணங்கள்](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_ஒரு சேவையாக பிளாக்செயின் உள்கட்டமைப்பு._**

- [quicknode.com](https://quicknode.com)
- [ஆவணங்கள்](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_ஓப்பன் சோர்ஸ் மென்பொருளால் இயக்கப்படும் ஒரு சேவையாக எத்தேரியம் மற்றும் எத்தேரியம் கிளாசிக் API-கள்._**

- [rivet.cloud](https://rivet.cloud)
- [ஆவணங்கள்](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSockets API ஆக வேகத்தை மையமாகக் கொண்ட எத்தேரியம் நோடுகள்._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [ஆவணங்கள்](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### மேம்பாட்டு கருவிகள் {#development-tools}

**ethers-kt -** **_EVM அடிப்படையிலான பிளாக்செயின்களுக்கான ஒத்திசைவற்ற (Async), உயர் செயல்திறன் கொண்ட Kotlin/Java/Android நூலகம்._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [எடுத்துக்காட்டுகள்](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_பிளாக்செயினுக்கான ஓப்பன் சோர்ஸ் .NET ஒருங்கிணைப்பு நூலகம்._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [ஆவணங்கள்](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_பைதான் வழியாக எத்தேரியம் தொடர்புகொள்வதற்கான பல்வேறு நூலகங்கள்._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_சிறந்த பிளாக்செயின் மேம்பாட்டு தளம்._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [ஆவணங்கள்](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_எத்தேரியத்திற்கான Java/Android/Kotlin/Scala ஒருங்கிணைப்பு நூலகம்._**

- [GitHub](https://github.com/web3j/web3j)
- [ஆவணங்கள்](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### பிளாக்செயின் சேவைகள் {#blockchain-services}

**BlockCypher -** **_எத்தேரியம் வலை API-கள்._**

- [blockcypher.com](https://www.blockcypher.com/)
- [ஆவணங்கள்](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_எத்தேரியத்திற்கான ஆல்-இன்-ஒன் web3 தரவு உள்கட்டமைப்பு._**

- [chainbase.com](https://chainbase.com/)
- [ஆவணங்கள்](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_ஒரு சேவையாக நெகிழ்வான மற்றும் பிரத்யேக எத்தேரியம் நோடுகள்._**

- [chainstack.com](https://chainstack.com)
- [ஆவணங்கள்](https://docs.chainstack.com/)
- [எத்தேரியம் API குறிப்பு](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_பிளாக்செயின் உள்கட்டமைப்பு API._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [ஆவணங்கள்](https://docs.cdp.coinbase.com/)

**DataHub by Figment -** **_எத்தேரியம் மெயின்நெட் மற்றும் டெஸ்ட்நெட்டுகளுடன் Web3 API சேவைகள்._**

- [DataHub](https://www.figment.io/)
- [ஆவணங்கள்](https://docs.figment.io/)

**Moralis -** **_நிறுவன-தர EVM API வழங்குநர்._**

- [moralis.io](https://moralis.io)
- [ஆவணங்கள்](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [மன்றம்](https://forum.moralis.io/)

**NFTPort -** **_எத்தேரியம் தரவு மற்றும் மின்ட் API-கள்._**

- [nftport.xyz](https://www.nftport.xyz/)
- [ஆவணங்கள்](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_பொதுவான மல்டி-கிரிப்டோ பிளாக்செயின் API-களின் தளம்._**

- [services.tokenview.io](https://services.tokenview.io/)
- [ஆவணங்கள்](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_எத்தேரியம் பிளாக்செயினுக்கு எளிய மற்றும் நம்பகமான API அணுகலை வழங்குகிறது._**

- [Watchdata](https://watchdata.io/)
- [ஆவணங்கள்](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_டஜன் கணக்கான செயின்களில் நிகழ்நேர, செறிவூட்டப்பட்ட பிளாக்செயின் தரவு API._**

- [codex.io](https://www.codex.io/)
- [ஆவணங்கள்](https://docs.codex.io)
- [எக்ஸ்ப்ளோரர்](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [Discord](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_200+ செயின்களுக்கான செறிவூட்டப்பட்ட பிளாக்செயின் API-கள்._**

- [covalenthq.com](https://www.covalenthq.com/)
- [ஆவணங்கள்](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## மேலும் படிக்க {#further-reading}

_உங்களுக்கு உதவிய சமூக வளம் பற்றித் தெரியுமா? இந்தப் பக்கத்தைத் திருத்தி அதைச் சேர்க்கவும்!_

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [நோடுகள் மற்றும் கிளையண்டுகள்](/developers/docs/nodes-and-clients/)
- [மேம்பாட்டு கட்டமைப்புகள்](/developers/docs/frameworks/)

## தொடர்புடைய பயிற்சிகள் {#related-tutorials}

- [ஜாவாஸ்கிரிப்ட்டில் எத்தேரியம் பிளாக்செயினைப் பயன்படுத்த Web3js-ஐ அமைக்கவும்](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– உங்கள் திட்டத்தில் web3.js-ஐ அமைப்பதற்கான வழிமுறைகள்._
- [ஜாவாஸ்கிரிப்ட்டிலிருந்து ஸ்மார்ட் ஒப்பந்தத்தை அழைத்தல்](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI டோக்கனைப் பயன்படுத்தி, ஜாவாஸ்கிரிப்ட் மூலம் ஒப்பந்தங்களின் செயல்பாட்டை எவ்வாறு அழைப்பது என்பதைப் பார்க்கவும்._