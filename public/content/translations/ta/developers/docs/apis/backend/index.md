---
title: பின்தள API நூலகங்கள்
description: உங்கள் பயன்பாட்டிலிருந்து பிளாக்செயினுடன் தொடர்பு கொள்ள உதவும் எத்தேரியம் வாடிக்கையாளர் API-களுக்கான ஒரு அறிமுகம்.
lang: ta
---

ஒரு மென்பொருள் பயன்பாடு எத்தேரியம் பிளாக்செயினுடன் தொடர்பு கொள்வதற்கு (அதாவது, பிளாக்செயின் தரவைப் படிக்க மற்றும்/அல்லது நெட்வொர்க்கிற்கு பரிவர்த்தனைகளை அனுப்ப), அது ஒரு எத்தேரியம் முனையுடன் இணைக்கப்பட வேண்டும்.

இந்த நோக்கத்திற்காக, ஒவ்வொரு எத்தேரியம் வாடிக்கையாளரும் [JSON-RPC](/developers/docs/apis/json-rpc/) விவரக்குறிப்பைச் செயல்படுத்துகிறது, எனவே பயன்பாடுகள் நம்பியிருக்கக்கூடிய ஒரு சீரான [முறைகளின்](/developers/docs/apis/json-rpc/#json-rpc-methods) தொகுப்பு உள்ளது.

ஒரு எத்தேரியம் முனையுடன் இணைக்க ஒரு குறிப்பிட்ட நிரலாக்க மொழியைப் பயன்படுத்த விரும்பினால், இதை மிகவும் எளிதாக்கும் பல வசதியான நூலகங்கள் இந்த சூழல் அமைப்பில் உள்ளன. இந்த நூலகங்கள் மூலம், உருவாக்குநர்கள் எத்தேரியத்துடன் தொடர்பு கொள்ளும் JSON-RPC கோரிக்கைகளை (பின்னணியில்) துவக்குவதற்கு, உள்ளுணர்வுமிக்க, ஒரு-வரி முறைகளை எழுத முடியும்.

## முன்னேற்றக் கட்டுரை {#prerequisites}

[எத்தேரியம் அடுக்கையும்](/developers/docs/ethereum-stack/) மற்றும் [எத்தேரியம் வாடிக்கையாளர்களையும்](/developers/docs/nodes-and-clients/) புரிந்துகொள்வது உதவியாக இருக்கும்.

## ஏன் ஒரு நூலகத்தைப் பயன்படுத்த வேண்டும்? {#why-use-a-library}

இந்த நூலகங்கள் ஒரு எத்தேரியம் முனையுடன் நேரடியாகத் தொடர்புகொள்வதில் உள்ள சிக்கல்களில் பெரும்பாலானவற்றை நீக்கிவிடுகின்றன. அவை பயன்பாட்டுச் செயல்பாடுகளையும் (எ.கா., ETH-ஐ Gwei ஆக மாற்றுவது) வழங்குகின்றன, எனவே ஒரு உருவாக்குநராக நீங்கள் எத்தேரியம் வாடிக்கையாளர்களின் நுணுக்கங்களைக் கையாள்வதில் குறைந்த நேரத்தைச் செலவிட்டு, உங்கள் பயன்பாட்டின் தனித்துவமான செயல்பாட்டில் அதிக கவனம் செலுத்த முடியும்.

## கிடைக்கும் நூலகங்கள் {#available-libraries}

### உள்கட்டமைப்பு மற்றும் முனை சேவைகள் {#infrastructure-and-node-services}

**Alchemy -** **_எத்தீரியம் மேம்பாட்டு தளம்._**

- [alchemy.com](https://www.alchemy.com/)
- [ஆவணம்](https://www.alchemy.com/docs/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**All That Node -** **_ஒரு சேவையாக முனை._**

- [All That Node.com](https://www.allthatnode.com/)
- [ஆவணம்](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Bware Labs வழங்கும் Blast -** **_எத்தேரியம் முதன்மை வலை மற்றும் சோதனை வலைகளுக்கான பரவலாக்கப்பட்ட API-கள்._**

- [blastapi.io](https://blastapi.io/)
- [ஆவணம்](https://docs.blastapi.io)
- [Discord](https://discord.gg/SaRqmRUjjQ)

**BlockPi -** **_மிகவும் திறமையான மற்றும் வேகமான RPC சேவைகளை வழங்குதல்_**

- [blockpi.io](https://blockpi.io/)
- [ஆவணம்](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare எத்தேரியம் நுழைவாயில்.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - தொகுதி ஆய்வு கருவி மற்றும் பரிவர்த்தனை API-கள்**

- [ஆவணம்](https://docs.etherscan.io/)

**Blockscout - திறந்த மூல தொகுதி ஆய்வு கருவி**

- [ஆவணம்](https://docs.blockscout.com/)

**GetBlock -** **_Web3 உருவாக்கத்திற்கான ஒரு சேவையாக பிளாக்செயின்_**

- [GetBlock.io](https://getblock.io/)
- [ஆவணம்](https://docs.getblock.io/)

**Infura -** **_ஒரு சேவையாக எத்தேரியம் API._**

- [infura.io](https://infura.io)
- [ஆவணம்](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _செலவு குறைந்த EVM JSON-RPC வழங்குநர்_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [ஆவணம்](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _முழு முனைகள் மற்றும் தொகுதி ஆய்வு கருவிகள்._**

- [NOWNodes.io](https://nownodes.io/)
- [ஆவணம்](https://nownodes.gitbook.io/documentation)

**QuickNode -** **_ஒரு சேவையாக பிளாக்செயின் உள்கட்டமைப்பு._**

- [quicknode.com](https://quicknode.com)
- [ஆவணம்](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_திறந்த மூல மென்பொருளால் இயக்கப்படும், ஒரு சேவையாக எத்தேரியம் மற்றும் எத்தேரியம் கிளாசிக் API-கள்._**

- [rivet.cloud](https://rivet.cloud)
- [ஆவணம்](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_JSON-RPC/WebSockets API ஆக வேகம் சார்ந்த எத்தேரியம் முனைகள்._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [ஆவணம்](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### உருவாக்க கருவிகள் {#development-tools}

**ethers-kt -** **_EVM-அடிப்படையிலான பிளாக்செயின்களுக்கான ஒத்திசைவற்ற, உயர் செயல்திறன் கொண்ட Kotlin/Java/Android நூலகம்._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [எடுத்துக்காட்டுகள்](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_பிளாக்செயினுக்கான ஒரு திறந்த மூல .NET ஒருங்கிணைப்பு நூலகம்._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [ஆவணம்](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**பைதான் கருவி -** **_பைதான் வழியாக எத்தேரியத்துடன் தொடர்பு கொள்ள பல்வேறு நூலகங்கள்._**

- [py.ethereum.org](https://snakecharmers.ethereum.org/)
- [web3.py கிட்ஹப்](https://github.com/ethereum/web3.py)
- [web3.py அரட்டை](https://gitter.im/ethereum/web3.py)

**Tatum -** **_உன்னதமான பிளாக்செயின் உருவாக்க தளம்._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [ஆவணம்](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_எத்தேரியத்திற்கான ஒரு ஜாவா/ஆண்ட்ராய்டு/கோட்லின்/ஸ்காலா ஒருங்கிணைப்பு நூலகம்._**

- [GitHub](https://github.com/web3j/web3j)
- [ஆவணங்கள்](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### பிளாக்செயின் சேவைகள் {#blockchain-services}

**BlockCypher -** **_எத்தேரியம் வலை API-கள்._**

- [blockcypher.com](https://www.blockcypher.com/)
- [ஆவணம்](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_எத்தேரியத்திற்கான ஆல்-இன்-ஒன் web3 தரவு உள்கட்டமைப்பு._**

- [chainbase.com](https://chainbase.com/)
- [ஆவணம்](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_ஒரு சேவையாக நெகிழ்வான மற்றும் பிரத்யேக எத்தேரியம் முனைகள்._**

- [chainstack.com](https://chainstack.com)
- [ஆவணம்](https://docs.chainstack.com/)
- [எத்தேரியம் API குறிப்பு](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_பிளாக்செயின் உள்கட்டமைப்பு API._**

- [Coinbase Cloud Node](https://www.coinbase.com/developer-platform)
- [ஆவணம்](https://docs.cdp.coinbase.com/)

**Figment வழங்கும் DataHub -** **_எத்தேரியம் முதன்மை வலை மற்றும் சோதனை வலைகளுடனான Web3 API சேவைகள்._**

- [DataHub](https://www.figment.io/)
- [ஆவணம்](https://docs.figment.io/)

**Moralis -** **_நிறுவன-தர EVM API வழங்குநர்._**

- [moralis.io](https://moralis.io)
- [ஆவணம்](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [மன்றம்](https://forum.moralis.io/)

**NFTPort -** **_எத்தேரியம் தரவு மற்றும் மின்ட் API-கள்._**

- [nftport.xyz](https://www.nftport.xyz/)
- [ஆவணம்](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_பொதுவான பல-கிரிப்டோ பிளாக்செயின் API-களுக்கான தளம்._**

- [services.tokenview.io](https://services.tokenview.io/)
- [ஆவணம்](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_எத்தேரியம் பிளாக்செயினுக்கு எளிய மற்றும் நம்பகமான API அணுகலை வழங்குதல்._**

- [Watchdata](https://watchdata.io/)
- [ஆவணம்](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_200+ சங்கிலிகளுக்கான செறிவூட்டப்பட்ட பிளாக்செயின் API-கள்._**

- [covalenthq.com](https://www.covalenthq.com/)
- [ஆவணம்](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

## மேலும் வாசிக்க {#further-reading}

_உங்களுக்கு உதவிய ஒரு சமூக வளம் பற்றி தெரியுமா?_ இந்தப் பக்கத்தைத் திருத்தி அதைச் சேர்க்கவும்!_

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [முனைகள் மற்றும் வாடிக்கையாளர்கள்](/developers/docs/nodes-and-clients/)
- [உருவாக்க கட்டமைப்புகள்](/developers/docs/frameworks/)

## தொடர்புடைய பயிற்சிகள் {#related-tutorials}

- [ஜாவாஸ்கிரிப்டில் எத்தேரியம் பிளாக்செயினைப் பயன்படுத்த Web3js-ஐ அமைத்தல்](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– உங்கள் திட்டத்தில் web3.js-ஐ அமைப்பதற்கான வழிமுறைகள்._
- [ஜாவாஸ்கிரிப்டிலிருந்து ஒரு ஸ்மார்ட் ஒப்பந்தத்தை அழைத்தல்](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– DAI டோக்கனைப் பயன்படுத்தி, ஜாவாஸ்கிரிப்ட் மூலம் ஒப்பந்தங்களின் செயல்பாடுகளை எப்படி அழைப்பது என்று பாருங்கள்._
