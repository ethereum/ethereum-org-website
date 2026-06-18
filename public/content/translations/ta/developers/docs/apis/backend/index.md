---
title: பின்தள API நிரலகங்கள்
description: உங்கள் பயன்பாட்டிலிருந்து தொகுதிச்சங்கிலியுடன் தொடர்பு கொள்ள அனுமதிக்கும் எத்திரியம் கிளையண்ட் API-களுக்கான அறிமுகம்.
lang: ta
---

ஒரு மென்பொருள் பயன்பாடு [எத்திரியம்](/) தொகுதிச்சங்கிலியுடன் தொடர்பு கொள்ள (அதாவது, தொகுதிச்சங்கிலி தரவைப் படிக்க மற்றும்/அல்லது பிணையத்திற்கு பரிவர்த்தனைகளை அனுப்ப), அது ஒரு எத்திரியம் கணுவுடன் இணைக்கப்பட வேண்டும்.

இந்த நோக்கத்திற்காக, ஒவ்வொரு எத்திரியம் கிளையண்டும் [ஜேசன்-ஆர்பிசி](/developers/docs/apis/json-rpc/) விவரக்குறிப்பைச் செயல்படுத்துகிறது, எனவே பயன்பாடுகள் நம்பியிருக்கக்கூடிய சீரான [முறைகள்](/developers/docs/apis/json-rpc/#json-rpc-methods) உள்ளன.

எத்திரியம் கணுவுடன் இணைக்க ஒரு குறிப்பிட்ட நிரலாக்க மொழியைப் பயன்படுத்த விரும்பினால், சுற்றுச்சூழல் அமைப்பிற்குள் இதை மிகவும் எளிதாக்கும் பல வசதியான நிரலகங்கள் உள்ளன. இந்த நிரலகங்கள் மூலம், டெவலப்பர்கள் எத்திரியத்துடன் தொடர்பு கொள்ளும் ஜேசன்-ஆர்பிசி கோரிக்கைகளை (உள்நிலையில்) தொடங்குவதற்கு உள்ளுணர்வுள்ள, ஒரு வரி முறைகளை எழுதலாம்.

## முன்நிபந்தனைகள் {#prerequisites}

[எத்திரியம் அடுக்கு](/developers/docs/ethereum-stack/) மற்றும் [எத்திரியம் கிளையண்டுகளைப்](/developers/docs/nodes-and-clients/) புரிந்துகொள்வது உதவியாக இருக்கும்.

## நிரலகத்தை ஏன் பயன்படுத்த வேண்டும்? {#why-use-a-library}

இந்த நிரலகங்கள் எத்திரியம் கணுவுடன் நேரடியாகத் தொடர்புகொள்வதில் உள்ள சிக்கலான தன்மையைப் பெரிதும் குறைக்கின்றன. அவை பயன்பாட்டுச் செயல்பாடுகளையும் (எ.கா., ETH-ஐ Gwei ஆக மாற்றுவது) வழங்குகின்றன, எனவே ஒரு டெவலப்பராக நீங்கள் எத்திரியம் கிளையண்டுகளின் சிக்கல்களைக் கையாள்வதில் குறைந்த நேரத்தையும், உங்கள் பயன்பாட்டின் தனித்துவமான செயல்பாட்டில் அதிக நேரத்தையும் செலவிடலாம்.

## கிடைக்கும் நிரலகங்கள் {#available-libraries}

### உள்கட்டமைப்பு மற்றும் கணு சேவைகள் {#infrastructure-and-node-services}

**Alchemy -** **_எத்திரியம் மேம்பாட்டு தளம்._**

- [alchemy.com](https://www.alchemy.com/)
- [ஆவணங்கள்](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [டிஸ்கார்ட்](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_சேவையாக கணு (Node-as-a-Service)._**

- [All That Node.com](https://www.allthatnode.com/)
- [ஆவணங்கள்](https://docs.allthatnode.com)
- [டிஸ்கார்ட்](https://discord.gg/GmcdVEUbJM)

**Bware Labs வழங்கும் Blast -** **_எத்தேரியம் முதன்மை வலைப்பின்னல் மற்றும் சோதனை வலைப்பின்னல்களுக்கான பரவலாக்கப்பட்ட API-கள்._**

- [blastapi.io](https://blastapi.io/)
- [ஆவணங்கள்](https://docs.blastapi.io)
- [டிஸ்கார்ட்](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_மிகவும் திறமையான மற்றும் வேகமான RPC சேவைகளை வழங்குகிறது_**

- [blockpi.io](https://blockpi.io/)
- [ஆவணங்கள்](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [டிஸ்கார்ட்](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare எத்திரியம் நுழைவாயில்.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - தொகுதி ஆராய்வி மற்றும் பரிவர்த்தனை API-கள்**
- [ஆவணங்கள்](https://docs.etherscan.io/)

**Blockscout - திறந்த மூல தொகுதி ஆராய்வி**
- [ஆவணங்கள்](https://docs.blockscout.com/)

**GetBlock-** **_Web3 மேம்பாட்டிற்கான சேவையாக தொகுதிச்சங்கிலி_**

- [GetBlock.io](https://getblock.io/)
- [ஆவணங்கள்](https://docs.getblock.io/)

**Infura -** **_சேவையாக எத்திரியம் API._**

- [infura.io](https://infura.io)
- [ஆவணங்கள்](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _செலவு குறைந்த EVM ஜேசன்-ஆர்பிசி வழங்குநர்_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [ஆவணங்கள்](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _முழு கணுக்கள் மற்றும் தொகுதி ஆராய்விகள்._**

- [NOWNodes.io](https://nownodes.io/)
- [ஆவணங்கள்](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_சேவையாக தொகுதிச்சங்கிலி உள்கட்டமைப்பு._**

- [quicknode.com](https://quicknode.com)
- [ஆவணங்கள்](https://www.quicknode.com/docs/welcome)
- [டிஸ்கார்ட்](https://discord.gg/quicknode)

**Rivet -** **_திறந்த மூல மென்பொருளால் இயக்கப்படும் சேவையாக எத்திரியம் மற்றும் எத்திரியம் கிளாசிக் API-கள்._**

- [rivet.cloud](https://rivet.cloud)
- [ஆவணங்கள்](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_ஜேசன்-ஆர்பிசி/WebSockets API ஆக வேகத்தை மையமாகக் கொண்ட எத்திரியம் கணுக்கள்._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [ஆவணங்கள்](https://docs.zmok.io/)
- [டிஸ்கார்ட்](https://discord.gg/fAHeh3ka6s)

### மேம்பாட்டு கருவிகள் {#development-tools}

**ethers-kt -** **_EVM அடிப்படையிலான தொகுதிச்சங்கிலிகளுக்கான ஒத்திசைவற்ற, உயர் செயல்திறன் கொண்ட Kotlin/Java/Android நிரலகம்._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [எடுத்துக்காட்டுகள்](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [டிஸ்கார்ட்](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_தொகுதிச்சங்கிலிக்கான திறந்த மூல .NET ஒருங்கிணைப்பு நிரலகம்._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [ஆவணங்கள்](https://docs.nethereum.com/docs/getting-started/welcome/)
- [டிஸ்கார்ட்](https://discord.com/invite/jQPrR58FxX)

**Python கருவி -** **_Python மூலம் எத்திரியம் தொடர்புகொள்வதற்கான பல்வேறு நிரலகங்கள்._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [Web3.py GitHub](https://github.com/ethereum/web3.py)
- [Web3.py அரட்டை](https://gitter.im/ethereum/web3.py)

**Tatum -** **_இறுதியான தொகுதிச்சங்கிலி மேம்பாட்டு தளம்._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [ஆவணங்கள்](https://docs.tatum.io/)
- [டிஸ்கார்ட்](https://discord.gg/EDmW3kjTC9)

**Web3j -** **_எத்திரியத்திற்கான Java/Android/Kotlin/Scala ஒருங்கிணைப்பு நிரலகம்._**

- [GitHub](https://github.com/web3j/web3j)
- [ஆவணங்கள்](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### தொகுதிச்சங்கிலி சேவைகள் {#blockchain-services}

**BlockCypher -** **_எத்திரியம் வலை API-கள்._**

- [blockcypher.com](https://www.blockcypher.com/)
- [ஆவணங்கள்](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_எத்திரியத்திற்கான ஆல்-இன்-ஒன் Web3 தரவு உள்கட்டமைப்பு._**

- [chainbase.com](https://chainbase.com/)
- [ஆவணங்கள்](https://docs.chainbase.com/)
- [டிஸ்கார்ட்](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_சேவையாக நெகிழ்வான மற்றும் பிரத்யேக எத்திரியம் கணுக்கள்._**

- [chainstack.com](https://chainstack.com)
- [ஆவணங்கள்](https://docs.chainstack.com/)
- [எத்திரியம் API குறிப்பு](https://docs.chainstack.com/reference/ethereum-getting-started)

**காயின்பேஸ் கிளவுட் கணு -** **_தொகுதிச்சங்கிலி உள்கட்டமைப்பு API._**

- [காயின்பேஸ் கிளவுட் கணு](https://www.coinbase.com/developer-platform)
- [ஆவணங்கள்](https://docs.cdp.coinbase.com/)

**Figment வழங்கும் DataHub -** **_எத்தேரியம் முதன்மை வலைப்பின்னல் மற்றும் சோதனை வலைப்பின்னல்களுடன் Web3 API சேவைகள்._**

- [DataHub](https://www.figment.io/)
- [ஆவணங்கள்](https://docs.figment.io/)

**Moralis -** **_நிறுவன-தர EVM API வழங்குநர்._**

- [moralis.io](https://moralis.io)
- [ஆவணங்கள்](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [டிஸ்கார்ட்](https://moralis.io/joindiscord/)
- [மன்றம்](https://forum.moralis.io/)

**NFTPort -** **_எத்திரியம் தரவு மற்றும் அச்சிடு API-கள்._**

- [nftport.xyz](https://www.nftport.xyz/)
- [ஆவணங்கள்](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [டிஸ்கார்ட்](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_பொதுவான பல-கிரிப்டோ தொகுதிச்சங்கிலி API-களின் தளம்._**

- [services.tokenview.io](https://services.tokenview.io/)
- [ஆவணங்கள்](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_எத்திரியம் தொகுதிச்சங்கிலிக்கு எளிய மற்றும் நம்பகமான API அணுகலை வழங்குகிறது._**

- [Watchdata](https://watchdata.io/)
- [ஆவணங்கள்](https://docs.watchdata.io/)
- [டிஸ்கார்ட்](https://discord.com/invite/TZRJbZ6bdn)

**Codex -** **_டஜன் கணக்கான சங்கிலிகளில் நிகழ்நேர, செறிவூட்டப்பட்ட தொகுதிச்சங்கிலி தரவு API._**

- [codex.io](https://www.codex.io/)
- [ஆவணங்கள்](https://docs.codex.io)
- [ஆராய்வி](https://docs.codex.io/explore)
- [GitHub](https://github.com/Codex-Data)
- [டிஸ்கார்ட்](https://discord.com/invite/mFpUhT3vAq)

**Covalent -** **_200+ சங்கிலிகளுக்கான செறிவூட்டப்பட்ட தொகுதிச்சங்கிலி API-கள்._**

- [covalenthq.com](https://www.covalenthq.com/)
- [ஆவணங்கள்](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [டிஸ்கார்ட்](https://www.covalenthq.com/discord/)


## மேலும் படிக்க {#further-reading}

_உங்களுக்கு உதவிய சமூக வளம் பற்றித் தெரியுமா? இந்தப் பக்கத்தைத் திருத்தி அதைச் சேர்க்கவும்!_

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [கணுக்கள் மற்றும் கிளையண்டுகள்](/developers/docs/nodes-and-clients/)
- [மேம்பாட்டு கட்டமைப்புகள்](/developers/docs/frameworks/)

## தொடர்புடைய பயிற்சிகள் {#related-tutorials}

- [JavaScript-இல் எத்திரியம் தொகுதிச்சங்கிலியைப் பயன்படுத்த Web3.js-ஐ அமைக்கவும்](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– உங்கள் திட்டத்தில் Web3.js-ஐ அமைப்பதற்கான வழிமுறைகள்._
- [JavaScript-இலிருந்து ஒரு திறன் ஒப்பந்தத்தை அழைத்தல்](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI வில்லையைப் பயன்படுத்தி, JavaScript-ஐப் பயன்படுத்தி ஒப்பந்தங்களின் செயல்பாட்டை எவ்வாறு அழைப்பது என்பதைப் பார்க்கவும்._