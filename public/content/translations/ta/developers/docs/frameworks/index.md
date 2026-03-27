---
title: "Dapp மேம்பாட்டு கட்டமைப்புகள்"
description: "கட்டமைப்புகளின் நன்மைகளை ஆராய்ந்து, கிடைக்கக்கூடிய விருப்பங்களை ஒப்பிடுங்கள்."
lang: ta
---

## கட்டமைப்புகளுக்கான அறிமுகம் {#introduction-to-frameworks}

ஒரு முழுமையான dapp-ஐ உருவாக்க பல்வேறு தொழில்நுட்பங்கள் தேவைப்படுகின்றன. மென்பொருள் கட்டமைப்புகளில் தேவையான பல அம்சங்கள் உள்ளன அல்லது நீங்கள் விரும்பும் கருவிகளைத் தேர்ந்தெடுக்க எளிதான செருகுநிரல் (plugin) அமைப்புகளை வழங்குகின்றன.

கட்டமைப்புகள் பல ஆயத்த செயல்பாடுகளுடன் வருகின்றன, அவை:

- உள்ளூர் பிளாக்செயின் நிகழ்வை (instance) உருவாக்குவதற்கான அம்சங்கள்.
- உங்கள் ஸ்மார்ட் ஒப்பந்தங்களை (smart contracts) தொகுக்க மற்றும் சோதிக்க பயன்பாடுகள்.
- ஒரே திட்டத்தில்/களஞ்சியத்தில் (repository) பயனர்களை எதிர்கொள்ளும் பயன்பாட்டை உருவாக்க கிளையன்ட் மேம்பாட்டு துணை நிரல்கள்.
- Ethereum நெட்வொர்க்குகளுடன் இணைக்க மற்றும் ஒப்பந்தங்களை (contracts) பயன்படுத்த உள்ளமைவு, அது உள்ளூரில் இயங்கும் நிகழ்வாக இருந்தாலும் அல்லது Ethereum-இன் பொது நெட்வொர்க்குகளில் ஒன்றாக இருந்தாலும் சரி.
- பரவலாக்கப்பட்ட பயன்பாட்டு விநியோகம் - IPFS போன்ற சேமிப்பக விருப்பங்களுடனான ஒருங்கிணைப்புகள்.

## முன்நிபந்தனைகள் {#prerequisites}

கட்டமைப்புகளுக்குள் நுழைவதற்கு முன், [dapps](/developers/docs/dapps/) மற்றும் [Ethereum அடுக்கு](/developers/docs/ethereum-stack/) பற்றிய எங்கள் அறிமுகத்தை முதலில் படிக்குமாறு பரிந்துரைக்கிறோம்.

## கிடைக்கக்கூடிய கட்டமைப்புகள் {#available-frameworks}

**Foundry** - **_Foundry என்பது Ethereum பயன்பாட்டு மேம்பாட்டிற்கான மிக வேகமான, கையடக்க மற்றும் மட்டு (modular) கருவித்தொகுப்பாகும்_**

- [Foundry-ஐ நிறுவவும்](https://book.getfoundry.sh/)
- [Foundry புத்தகம்](https://book.getfoundry.sh/)
- [Telegram-இல் Foundry சமூக அரட்டை](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_தொழில் வல்லுநர்களுக்கான Ethereum மேம்பாட்டு சூழல்._**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_பைத்தானிஸ்டாக்கள், தரவு விஞ்ஞானிகள் மற்றும் பாதுகாப்பு நிபுணர்களுக்கான ஸ்மார்ட் ஒப்பந்த மேம்பாட்டுக் கருவி._**

- [ஆவணங்கள்](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVM-இல் பிளாக்செயின் பயன்பாடுகளை உருவாக்குவதற்கான தளம்._**

- [முகப்புப்பக்கம்](https://www.web3labs.com/web3j-sdk)
- [ஆவணங்கள்](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_EVM அடிப்படையிலான பிளாக்செயின்களுக்கான ஒத்திசைவற்ற (Async), உயர் செயல்திறன் கொண்ட Kotlin/Java/Android நூலகம்._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [எடுத்துக்காட்டுகள்](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_ஒரே கட்டளையுடன் Ethereum-ஆல் இயங்கும் பயன்பாடுகளை உருவாக்கவும். தேர்வு செய்ய பரந்த அளவிலான UI கட்டமைப்புகள் மற்றும் DeFi டெம்ப்ளேட்டுகளுடன் வருகிறது._**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [டெம்ப்ளேட்டுகள்](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Ethers.js + Hardhat + React கூறுகள் மற்றும் web3-க்கான ஹூக்குகள்: ஸ்மார்ட் ஒப்பந்தங்களால் இயங்கும் பரவலாக்கப்பட்ட பயன்பாடுகளை உருவாக்கத் தொடங்க உங்களுக்குத் தேவையான அனைத்தும்._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_பிளாக்செயின் டெவலப்பர்கள் ஸ்மார்ட் ஒப்பந்தங்களை உருவாக்க, சோதிக்க, பிழைத்திருத்தம் செய்ய, கண்காணிக்க மற்றும் இயக்க மற்றும் dapp UX-ஐ மேம்படுத்த உதவும் Web3 மேம்பாட்டு தளம்._**

- [இணையதளம்](https://tenderly.co/)
- [ஆவணங்கள்](https://docs.tenderly.co/)

**The Graph -** **_பிளாக்செயின் தரவை திறமையாக வினவுவதற்கான The Graph._**

- [இணையதளம்](https://thegraph.com/)
- [பயிற்சி](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_Ethereum மேம்பாட்டு தளம்._**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_Ethereum மேம்பாட்டு தளம்._**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_எங்கள் சக்திவாய்ந்த SDK-கள் மற்றும் CLI-ஐப் பயன்படுத்தி உங்கள் ஸ்மார்ட் ஒப்பந்தங்களுடன் தொடர்பு கொள்ளக்கூடிய web3 பயன்பாடுகளை உருவாக்குங்கள்._**

- [ஆவணங்கள்](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3 (Ethereum மற்றும் பிற) மேம்பாட்டு தளம்._**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_நிறுவன அளவிலான web3 மேம்பாட்டு தளம், இது அனைத்து முக்கிய EVM செயின்களிலும் (மற்றும் பிறவற்றிலும்) NFT பயன்பாடுகளை உருவாக்க உங்களை அனுமதிக்கிறது._**

- [இணையதளம்](https://www.crossmint.com)
- [ஆவணங்கள்](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_பைதான் அடிப்படையிலான மேம்பாட்டு சூழல் மற்றும் சோதனை கட்டமைப்பு._**

- [ஆவணங்கள்](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie தற்போது பராமரிக்கப்படவில்லை**

**OpenZeppelin SDK -** **_இறுதியான ஸ்மார்ட் ஒப்பந்த கருவித்தொகுப்பு: ஸ்மார்ட் ஒப்பந்தங்களை உருவாக்க, தொகுக்க, மேம்படுத்த, பயன்படுத்த மற்றும் தொடர்பு கொள்ள உதவும் கருவிகளின் தொகுப்பு._**

- [OpenZeppelin Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [சமூக மன்றம்](https://forum.openzeppelin.com/c/support/17)
- **OpenZeppelin SDK மேம்பாடு முடிவடைந்தது**

**Catapulta -** **_மல்டி-செயின் ஸ்மார்ட் ஒப்பந்தங்கள் பயன்படுத்தும் கருவி, பிளாக் எக்ஸ்ப்ளோரர்களில் சரிபார்ப்புகளை தானியங்குபடுத்துகிறது, பயன்படுத்தப்பட்ட ஸ்மார்ட் ஒப்பந்தங்களை கண்காணிக்கிறது மற்றும் வரிசைப்படுத்தல் அறிக்கைகளைப் பகிர்கிறது, Foundry மற்றும் Hardhat திட்டங்களுக்கான பிளக்-அண்ட்-பிளே (plug-n-play)._**

- [GitHub](https://github.com/catapulta-sh)

**GoldRush (Covalent-ஆல் இயக்கப்படுகிறது) -** **_GoldRush டெவலப்பர்கள், ஆய்வாளர்கள் மற்றும் நிறுவனங்களுக்கு மிகவும் விரிவான பிளாக்செயின் தரவு API தொகுப்பை வழங்குகிறது. நீங்கள் ஒரு DeFi டாஷ்போர்டு, வாலட், டிரேடிங் பாட், AI ஏஜென்ட் அல்லது இணக்க தளத்தை உருவாக்கினாலும், தரவு API-கள் உங்களுக்குத் தேவையான அத்தியாவசிய ஆன்செயின் தரவுகளுக்கு வேகமான, துல்லியமான மற்றும் டெவலப்பர்களுக்கு ஏற்ற அணுகலை வழங்குகின்றன_**

- [இணையதளம்](https://goldrush.dev/)
- [ஆவணங்கள்](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_ஒப்பந்த சோதனை, ஃபஸ்ஸிங் (fuzzing), வரிசைப்படுத்தல், பாதிப்பு ஸ்கேனிங் மற்றும் குறியீடு வழிசெலுத்தலுக்கான ஆல்-இன்-ஒன் பைதான் கட்டமைப்பு._**

- [முகப்புப்பக்கம்](https://getwake.io/)
- [ஆவணங்கள்](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code நீட்டிப்பு](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_திறந்த மூல, மட்டு மற்றும் அக்னாஸ்டிக் கட்டமைப்பு, இது பரவலாக்கப்பட்ட பயன்பாட்டு டெவலப்பர்கள் தங்கள் பயன்பாடுகளில் பரவலாக்கப்பட்ட அடையாளங்கள் மற்றும் சரிபார்க்கக்கூடிய நற்சான்றிதழ்களை உருவாக்குவதை எளிதாக்குகிறது._**

- [முகப்புப்பக்கம்](https://veramo.io/)
- [ஆவணங்கள்](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [Discord](https://discord.com/invite/FRRBdjemHV)
- [NPM தொகுப்பு](https://www.npmjs.com/package/@veramo/core)

## மேலும் படிக்க {#further-reading}

_உங்களுக்கு உதவிய சமூக வளம் பற்றி தெரியுமா? இந்தப் பக்கத்தைத் திருத்தி அதைச் சேர்க்கவும்!_

## தொடர்புடைய தலைப்புகள் {#related-topics}

- [உள்ளூர் மேம்பாட்டு சூழலை அமைக்கவும்](/developers/local-environment/)

## பயிற்சிகள்: Ethereum-இல் மேம்பாட்டு கட்டமைப்புகள் {#tutorials}

- [ஆரம்பநிலையாளர்களுக்கான ஹலோ வேர்ல்ட் ஸ்மார்ட் ஒப்பந்தம் – ஃபுல்ஸ்டாக்](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Hardhat-ஐப் பயன்படுத்தி ஹலோ வேர்ல்ட் ஸ்மார்ட் ஒப்பந்தத்தை உருவாக்கி பயன்படுத்தவும், பின்னர் அதை ஒரு முன்பக்கத்துடன் (frontend) இணைக்கவும்._