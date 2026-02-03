---
title: Pectra 7702
description: Pectra வெளியீட்டில் 7702 பற்றி மேலும் அறிக
lang: ta
---

# Pectra 7702

## சுருக்கம் {#abstract}

EIP 7702 என்பது ஒரு EOA-விற்கு (Externally Owned Account) குறியீட்டைக் (code) சேர்க்கும் ஒரு இயந்திரத்தை வரையறுக்கிறது. இந்தத் திட்டம், பாரம்பரிய எத்தீரியம் கணக்குகளான EOAs-க்கு குறுகிய கால செயல்பாட்டு மேம்பாடுகளை பெற அனுமதிக்கிறது, இது செயலிகளின் பயன்பாடுகளை அதிகரிக்கிறது. இது ஏற்கனவே ஏற்றப்பட்ட குறியீட்டிற்கான குறியீட்டு சுட்டியை (pointer) அமைக்கும் புதிய பரிவர்த்தனை வகை: 4-ஐ பயன்படுத்தி செய்யப்படுகிறது.

இந்த புதிய பரிவர்த்தனை வகை, ஒரு அங்கீகார பட்டியலை அறிமுகப்படுத்துகிறது. அந்த அங்கீகார பட்டியலில் உள்ள ஒவ்வொரு அங்கீகாரத் தொகுப்பும் (authorization tuple) கீழ்காணும் வடிவில் வரையறுக்கப்படுகிறது

```
[ chain_id, address, nonce, y_parity, r, s ]
```

address என்பது delegation ஆகும் (ஏற்கனவே deployment செய்யப்பட்ட bytecode, இது EOA மூலம் பயன்படுத்தப்படும்)
chain_id ஒரு குறிப்பிட்ட chain-க்கு authorization-ஐ lock செய்ய பயன்படுகிறது (அல்லது அனைத்து chain-களுக்கும் 0 ஆக இருக்கலாம்)
nonce authorization-ஐ ஒரு குறிப்பிட்ட account nonce-க்கு lock செய்யும்.
(y_parity, r, s) என்பது authorization tuple-இன் signature ஆகும், இது கீழ்கண்டபடி வரையறுக்கப்படுகிறது:
keccak(0x05 || rlp ([chain_id ,address, nonce]))
இது அந்த authorization உடைய EOA வின் private key கொண்டு செய்யப்பட்டதாகும் (இது authority என்றும் அழைக்கப்படுகிறது)

ஒரு delegation-ஐ null address-க்கு delegate செய்வதன் மூலம் reset செய்யலாம்.

EOA-வின் private key அக்கவுண்டின் மீது முழு கட்டுப்பாட்டையும் தொடர்ந்தும் வைத்திருக்கிறது. உதாரணமாக, ஒரு Safe-க்கு delegate செய்தாலும், அந்த account multisig ஆகாது, ஏனெனில் ஒரு தனி key ஐ பயன்படுத்தி எந்த signing policy-யையும் பைபாஸ் செய்ய முடியும். எதிர்காலத்தில், developers தங்கள் system-இல் பங்கேற்கும் யாரும் smart contract ஆக இருக்கலாம் என்று கருதி வடிவமைக்க வேண்டும். Smart contract developers-க்கு, இனிமேல் tx.origin என்பது EOA-வை குறிக்கும் என கருதுவது பாதுகாப்பானது அல்ல.

## சிறந்த நடைமுறைகள் {#best-practices}

Account Abstraction:
ஒரு delegation contract, Ethereum-இன் பரந்த account abstraction (AA) நிலைத்துணைகளுடன் ஒத்திருக்க வேண்டும், அதிகபட்ச பொருந்தக்கூடியதற்காக. குறிப்பாக, இது ERC-4337 இணக்கமானதாக (compliant) அல்லது குறைந்தபட்சம் அதனுடன் compatible ஆக இருக்க வேண்டும்.

Permissionless மற்றும் Censorship-Resistant Design: Ethereum-ன் மதிப்பு நெறிமுறைகளில் ஒன்று permissionless பங்கேற்பு. ஒரு delegation contract, எந்தவொரு “நம்பகமான” relayer அல்லது சேவையை hard-code செய்யக்கூடாது அல்லது அதன்மீது சார்ந்திருக்க கூடாது. இது அந்த relayer ஆனது ஆஃப்லைனில் சென்றுவிட்டால் அந்த account-ஐ பயன்படுத்த முடியாததாக (brick) மாற்றிவிடும். Batching போன்ற அம்சங்கள் (எ.கா. approve+transferFrom) EOA கொண்டு நேரடியாக (relayer இல்லாமல்) பயன்படுத்த முடியும். Application developers ஐந்து 7702 கொண்டு இயங்கும் advanced அம்சங்களை (Gas Abstraction, Privacy-Preserving Withdrawals) பயன்படுத்த விரும்பினால், relayer தேவைப்படும். வித்தியாசமான relayer கட்டமைப்புகள் உள்ளன என்றாலும், எங்கள் பரிந்துரை என்னவென்றால்:[4337 bundlers](https://www.erc4337.io/bundlers)-ஐ, குறைந்தபட்சம் [entry point 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)-ஐ குறிக்கும் வகையில் பயன்படுத்துங்கள், ஏனெனில்:

- Relaying-க்கு standardized interfaces வழங்குகிறார்கள்
- Paymaster systems உட்பட்டிருக்கின்றன
- Forward compatibility-ஐ உறுதி செய்கின்றன
- [Public mempool](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)வழியாக censorship resistance-ஐ ஆதரிக்க முடியும்
- Init செயல்பாடு [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)-இல் இருந்தே மட்டுமே அழைக்கப்படவேண்டும் என வலியுறுத்தலாம்

மறுபடியும் சொல்வதானால், தேவையான செல்லுபடியாகிய signature அல்லது UserOperation-ஐ கணக்கில் இருந்து வழங்குகிறார்கள் என்றால், யாரும் transaction sponsor அல்லது relayer ஆக செயல்படலாம். இது censorship resistance-ஐ உறுதி செய்கிறது: தனிப்பட்ட custom infrastructure தேவைப்படவில்லை என்றால், gatekeeping relay-கள் ஒரு பயனரின் transactions-ஐ இச்சைப்படி தடுக்க முடியாது. உதாரணமாக, [MetaMask-இன் Delegation Toolkit](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0), எந்த ERC-4337 bundler அல்லது paymaster-ஐயும் எந்த chain-இலும் வேலை செய்யச் செய்வதாகவும், MetaMask-க்கு சொந்தமான ஒரு server தேவைப்படும் என கட்டாயப்படுத்தவில்லை என்றும் குறிப்பிடப்படுகிறது.

dApps Integration via Wallet Interfaces:

Wallets, EIP-7702-க்கு குறிப்பிட்ட delegation contracts-ஐ மட்டும் whitelist செய்யும் போது,
dApps நேரடியாக 7702 authorizations-ஐ கோரலாம் என எதிர்பார்க்கக்கூடாது. அதற்கு பதிலாக, integration கீழ்கண்ட standardized wallet interfaces வழியாக நடைபெற வேண்டும்:

- ERC-5792 (wallet_sendCalls): dApps-கள் wallets-ஐ பயன்படுத்தி batched calls-ஐ நிறைவேற்றுமாறு கோர அனுமதிக்கிறது,
  இதன் மூலம் transaction batching மற்றும் gas abstraction போன்ற அம்சங்கள் சாத்தியம்.

- ERC-6900: dApps-களுக்கு modular smart account திறன்களை பயன்படுத்த அனுமதிக்கிறது,
  உதாரணமாக session keys, account recovery, இவை அனைத்தும் wallet-இன் modules வழியாக நிர்வகிக்கப்படலாம்.

இந்த interfaces-ஐ பயன்படுத்துவதன் மூலம், dApps-கள் EIP-7702 வழங்கும் smart account அம்சங்களை நேரடியாக delegation-ஐ நிர்வகிக்காமல் அணுக முடியும்.

> இது பலவிதமான wallet செயலாக்கங்களில் பொருந்தக்கூடியதையும், பாதுகாப்பானதுமானதை உறுதி செய்கிறது. EIP-7702-இன் அம்சங்களைப் பயன்படுத்த ERC-6900 போன்ற specific wallet interfaces-ஐ மட்டுமே dApps-கள் நம்பிக்கையுடன் பயன்படுத்த வேண்டும்.

மேலும் தகவலுக்கு:

- [ERC-5792 specification](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [ERC-6900 specification](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

Vendor Lock-In-ஐ தவிர்ப்பது: மேலே கூறியதற்கேற்ப, ஒரு சிறந்த செயலாக்கம் vendor-neutral ஆகவும், interoperable ஆகவும் இருக்க வேண்டும். இது பெரும்பாலும் smart accounts-க்கான புதிய standards-ஐ பின்பற்றுவதை பொருள் படுத்துகிறது. உதாரணமாக, [Alchemy-இன் Modular Account](https://github.com/alchemyplatform/modular-account), ERC-6900 standard-ஐ பயன்படுத்துகிறது மற்றும்
“permissionless interoperable usage” என்பதை கருத்தில் கொண்டு வடிவமைக்கப்பட்டுள்ளது.

தனிப்பட்ட தகவல்களை பாதுகாப்பது (Privacy Preservation): Onchain privacy வரையறுக்கப்பட்டதாக இருந்தாலும், ஒரு delegation contract, data exposure மற்றும் linkability குறைவாக இருக்கும்படி முயற்சி செய்ய வேண்டும். இதை அடைய, கீழ்கண்ட அம்சங்களை ஆதரிப்பது உதவும்: ERC-20 tokens-இல் gas payments:
பயனர்கள் ஒரு பொதுவான ETH balance-ஐ வைத்திருக்க வேண்டிய அவசியமில்லை.
இது privacy-யையும், UX-ஐயும் மேம்படுத்துகிறது. உதாரணமாக, EIP-7702 மூலம் sponsored transactions வழியாக token-களில் gas-ஐ செலுத்த முடிகிறது.
ஒரு சிறந்த செயலாக்கம், இதுபோன்ற paymasters-ஐ எளிதாக இணைக்க அனுமதிக்கும்,
அதே நேரத்தில் தேவைக்குட்பட்ட அளவிற்கு மட்டுமே தகவல்களை வெளிப்படுத்தும். மேலும், Certain approvals-ஐ off-chain delegation செய்வது (onchain-ல் verify செய்யப்படும் signature-கள் மூலம்)
பயனர் முக்கியமான key-ஐ கொண்டு onchain-ல் transaction செய்வதை குறைக்கும்,
இதனால் privacy மேம்படும். Relayer-ஐ கட்டாயமாக்கும் accounts, பயனர்களை தங்கள் IP address-ஐ வெளிப்படுத்த வைக்கின்றன. PublicMempools இதனை மேம்படுத்துகின்றன: ஒரு transaction/UserOp mempool-ஐ வழியாக பரவும்போது, அது எந்த IP-இல் இருந்து வந்தது, அல்லது p2p வழியாக relay செய்யப்பட்டதா என்பதை புரிந்துகொள்ள முடியாது.

Extensibility மற்றும் Modular Security: Account implementations புதிய அம்சங்கள் மற்றும் பாதுகாப்பு மேம்பாடுகளுடன் வளர முடியும் என extensible ஆக இருக்க வேண்டும். EIP-7702-இல் upgradability இயல்பாகவே உள்ளது — ஏனெனில் ஒரு EOA எப்போதும் ஒரு புதிய contract-க்கு delegate செய்ய முடியும், அதன் logic-ஐ upgrade செய்வதற்காக. Upgradability-க்கு அப்பாலும், ஒரு சிறந்த வடிவமைப்பு modularity-ஐ அனுமதிக்கிறது – எ.கா., வெவ்வேறு signature schemes அல்லது spending policies-க்கான ப்ளக்-இன் மாட்யூல்கள் – முழுமையாக மீண்டும் வரிசைப்படுத்த வேண்டிய அவசியமின்றி. Alchemy-இன் Account Kit இதற்கு ஒரு சிறந்த எடுத்துக்காட்டு:
இது developers-க்கு validation modules (பல்வேறு signature வகைகள் — ECDSA, BLS, முதலியன)
மற்றும் execution modules-ஐ (custom logic-ஐ) நிறுவ அனுமதிக்கிறது execution modules-ஐ (custom logic-ஐ) நிறுவ அனுமதிக்கிறது. EIP-7702-இல் அதிக flexibility மற்றும் security பெற,
developers-க்கு ஒரு proxy contract-க்கு delegate செய்ய பரிந்துரை செய்யப்படுகிறது,
ஒரு குறிப்பிட்ட implementation-க்கு நேரடியாக delegate செய்வதைவிட. இந்த அணுகுமுறை, ஒவ்வொரு மாற்றத்திற்கும் புதிய EIP-7702 authorization தேவைப்படாமல்,
seamless upgrades மற்றும் modularity-ஐ முடிவுறுத்துகிறது.

Proxy Pattern-இன் நன்மைகள் (Benefits of the Proxy Pattern):

- Upgradability: Proxy-யை புதிய implementation contract-ஐ நோக்கி மாற்றுவதன் மூலம்,
  contract logic-ஐ update செய்யலாம்.

- Custom Initialization Logic: தேவையான state variables-ஐ பாதுகாப்பாக அமைக்க proxy-க்குள் initialization functions-ஐ இணைக்கலாம்.

உதாரணமாக, [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe)
எப்படி ஒரு proxy-யை EIP-7702-இன் delegation-ஐ பாதுகாப்பாக initialize மற்றும் நிர்வகிக்க பயன்படுத்தலாம் என்பதை காண்பிக்கிறது.

Proxy Pattern-இன் குறைகள் (Cons of the Proxy Pattern):

- வெளிப்புற குழுக்களில் நம்பிக்கை (Reliance on external actors):
  Proxy-யை பாதுகாப்பற்ற contract-க்கு upgrade செய்யக்கூடாது என்பதில்,
  ஒரு வெளிப்புற development குழுவின் நேர்மையிலும் கவனத்திலும் நம்பிக்கை வைக்க வேண்டிய நிலை ஏற்படுகிறது.

## பாதுகாப்பு கருத்துகள் (Security Considerations) {#security-considerations}

EIP-7702 பிரதிநிதித்துவம் (delegation) அறிமுகப்படுத்தப்பட்டதைப்போல், ஒரு பயனர் கணக்கு (account) தனது நிலையை விட்டு வெளியே இருக்கும் கணக்கு (Externally Owned Account - EOA) மற்றும் ஸ்மார்ட் கான்ட்ராக்ட் (Smart Contract - SC) ஆகியவற்றுக்கிடையே மாறக்கூடும். இந்த வசதி அந்தக் கணக்கை transaction ஆரம்பிப்பதும் (initiate transactions) மற்றும் அழைப்புகளின் இலக்காகவும் (target of calls) இருக்க இயலும். இதனால், ஒரு கணக்கு தன்னைத் தானே அழைக்கும் போது மற்றும் வெளிப்புற அழைப்புகளை செய்யும் போது msg.sender மற்றும் tx.origin ஆகியவை சமமாகிவிடும். இது முந்தைய tx.origin எப்போதும் EOA என்பதை வைத்திருந்த பாதுகாப்பு முன்கூட்டிய முன்னோட்டங்களை முறியடிக்கிறது.

ஸ்மார்ட் கான்ட்ராக்ட் டெவலப்பர்களுக்கு, tx.origin என்பது எப்போதும் EOA என்று கருதுவது இனி பாதுகாப்பானது அல்ல. அதுபோல், reentrancy தாக்குதல்களைத் தடுப்பதற்காக msg.sender == tx.origin என்ற பாதுகாப்பு முறையும் நம்பகமானது இல்லை.

எதிர்காலத்தில், developers தங்கள் system-இல் பங்கேற்கும் யாரும் smart contract ஆக இருக்கலாம் என்று கருதி வடிவமைக்க வேண்டும். இனிமேல், டெவலப்பர்கள் எந்த பங்கேற்பாளரும் ஸ்மார்ட் கான்ட்ராக்ட் இருக்கக்கூடும் என்று கருதி வடிவமைக்க வேண்டும். அல்லது reentrancy பாதுகாப்பை நேரடியாக reentrancy guards மற்றும் nonReentrant modifier படிமுறைகள் மூலம் நடைமுறைப்படுத்த வேண்டும். [OpenZeppelin இன் Reentrancy Guard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol) போன்ற ஆய்வுபெற்ற modifier-ஐப் பயன்படுத்த பரிந்துரைக்கப்படுகிறது. அவ்வாறே ஒரு தற்காலிக சேமிப்பு மாறி (transient storage variable) பயன்படுத்துவதும் கூடுதல் பாதுகாப்பாக இருக்கும். அவ்வாறே ஒரு [transient storage variable](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html) பயன்படுத்துவதும் கூடுதல் பாதுகாப்பாக இருக்கும்.

துவக்கம் பாதுகாப்பு கவனிப்புகள்

EIP-7702 பிரதிநிதித்துவக் கான்ட்ராக்டுகளை (delegation contracts) செயல்படுத்தும் போது, குறிப்பாக துவக்க (initialization) செயல்முறையில் தனித்துவமான பாதுகாப்பு சவால்கள் உருவாகின்றன. Init என்ற துவக்க செயல்பாடு பிரதிநிதித்துவ செயல்முறையுடன் அணுக்கமாக இணைக்கப்பட்டால். ஒரு முன்னோட்ட அறிமுகம் (frontrunner) அந்த பிரதிநிதித்துவக் கையொப்பத்தை (delegation signature) பிடித்து init செயல்பாட்டை மாற்றப்பட்ட அளவுருக்களுடன் (parameters) இயக்கி கணக்கின் கட்டுப்பாட்டை கைப்பற்றக்கூடும்.

இந்த ஆபத்து குறிப்பாக EIP-7702 உடன் ஏற்கனவே உள்ள Smart Contract Account (SCA) நடைமுறைகளை மாற்றாமலேயே பயன்படுத்த முயற்சிக்கும் போது அதிகமாக ஏற்படக்கூடும்.

துவக்கம் பலவீனங்களை குறைக்கும் தீர்வுகள்

- InitWithSig-ஐ செயல்படுத்துங்கள்:
  சாதாரண init செயல்பாட்டை initWithSig என்ற செயல்பாட்டுடன் மாற்றி, அதில் துவக்க அளவுருக்களுக்கு பயனர் கையொப்பம் (signature) தேவைப்பட வேண்டும். இதனால் துவக்கம் பயனர் வெளிப்படையான ஒப்புதலுடன் மட்டுமே நடைபெறும், அங்கீகாரம் இல்லாத துவக்க ஆபத்துகளைத் தடுக்கும்.

- ERC-4337-இன் EntryPoint-ஐ பயன்படுத்துங்கள்:
  துவக்க செயல்பாடு ERC-4337 EntryPoint கான்ட்ராக்டிலிருந்து மட்டும் அழைக்கப்பட வேண்டும் என்று கோருங்கள். இதன் மூலம் ERC-4337 வழங்கும் நிலைத்தன்மை மற்றும் செயல்படுத்தல் அமைப்பின் பாதுகாப்பு அடுக்கு கூடுதலாக உருவாகும்.  
  (பாருங்கள்: [Safe Docs](https://docs.safe.global/advanced/eip-7702/7702-safe))

இந்த தீர்வுகளை பின்பற்றுவதன் மூலம், EIP-7702 பிரதிநிதித்துவக் கான்ட்ராக்டுகளின் பாதுகாப்பை மேம்படுத்தி துவக்க கட்டத்தில் முன்னோட்ட தாக்குதல்களை (frontrunning attacks) தடுப்பதில் உதவும்.

சேமிப்பு இடையூறுகள்பிரதிநிதித்துவக் கோடு (delegating code) தற்போதைய சேமிப்பை (storage) அழிக்காது. ஒரு பிரதிநிதித்துவக் கான்ட்ராக்டிலிருந்து மற்றொன்றிற்கு மாறும்போது, முந்தைய கான்ட்ராக்டிலிருந்து மீதமுள்ள தரவு நீங்காது. புதிய கான்ட்ராக்ட் அதே சேமிப்பு இடங்களை (storage slots) பயன்படுத்தினால், ஆனால் அவற்றை வேறுபட்ட முறையில் பொருள் படுத்தினால் (interpret), அது எதிர்பாராத செயல்பாடுகளை ஏற்படுத்தும். உதாரணமாக, முதலில் பிரதிநிதித்துவம் செய்யப்பட்ட கான்ட்ராக்டில் ஒரு சேமிப்பு இடம் ஒரு boolean மதிப்பாக இருந்தால், அடுத்து பிரதிநிதித்துவம் செய்யப்பட்ட கான்ட்ராக்ட் அதே இடத்தை ஒரு uint ஆக எடுத்துக்கொண்டால், இந்த ஒத்துழைப்பு இல்லாமல் உள்ள அதிர்ச்சியான விளைவுகள் உருவாகலாம்.

ஃபிஷிங் அபாயங்கள் (Phishing Risks) EIP-7702 பிரதிநிதித்துவம் (delegation) நடைமுறைப்படுத்தப்பட்டதன் மூலம், ஒரு பயனர் கணக்கில் உள்ள சொத்துக்கள் முழுமையாக ஸ்மார்ட் கான்ட்ராக்டுகளால் கட்டுப்படுத்தப்படலாம். பயனர் தெரியாமல் தமது கணக்கை ஒரு தீய நோக்கமான (malicious) கான்ட்ராக்டிற்கு பிரதிநிதித்துவம் செய்தால், அட்டாக்கர் எளிதில் கட்டுப்பாட்டை பிடித்து பணத்தை திருடக்கூடும். Chain_id=0 என்றால் பிரதிநிதித்துவம் அனைத்து சேன் ஐடிகளுக்கும் (chain ids) பொருந்தும். ஆகவே, ஒருபோதும் proxy-க்கு பிரதிநிதித்துவம் செய்யாமல், மாற்ற முடியாத (immutable) கான்ட்ராக்டிற்கு மட்டுமே பிரதிநிதித்துவம் செய்ய வேண்டும்; மேலும் CREATE2 மூலம் (standard initcode உடன் - metamorphic contracts இல்லாமல்) உருவாக்கப்பட்ட கான்ட்ராக்டுகளுக்கு மட்டுமே பிரதிநிதித்துவம் செய்ய வேண்டும். இதனால் deployer அந்த முகவரியில் வேறு வேறான கான்ட்ராக்டை வேறு இடத்தில் உருவாக்க முடியாது. இல்லையெனில், உங்கள் பிரதிநிதித்துவம் உங்கள் கணக்கை அனைத்து பிற EVM சங்கிலிகளிலும் ஆபத்துக்கு உள்ளாக்கும்.

பயனர்கள் பிரதிநிதித்துவ கையொப்பங்களைச் செய்தபோது, பிரதிநிதித்துவத்தைப் பெறும் இலக்கு கான்ட்ராக்ட் தெளிவாகவும் பிரதானமாகவும் காட்டப்பட வேண்டும்; இதனால் ஃபிஷிங் அபாயங்களை குறைக்க உதவும்.

குறைந்த அளவிலான நம்பகமான பரப்பு மற்றும் பாதுகாப்பு (Minimal Trusted Surface & Security):
சூழ்நிலையை நெகிழ்வாக்கொடுக்கும் போது, பிரதிநிதித்துவக் கான்ட்ராக்ட் அதன் முக்கிய செயல்முறையை குறைந்தளவு மற்றும் சரிபார்க்கக்கூடியதாக வைத்திருக்க வேண்டும். இந்தக் கான்ட்ராக்ட் பயனர் EOA-வின் நீட்டிப்பாகவே உள்ளது, அதனால் எந்த ஒரு தவறும் பெரும் நெருக்கடியை ஏற்படுத்தும். செயல்பாடுகள் ஸ்மார்ட் கான்ட்ராக்ட் பாதுகாப்பு சமூகவின் சிறந்த நடைமுறைகளை பின்பற்ற வேண்டும். உதாரணமாக, கட்டுமானி (constructor) அல்லது தொடக்க செயல்பாடுகள் (initializer functions) கவனமாக பாதுகாக்கப்பட வேண்டும் – Alchemy குறிப்பிடும் படி, 7702 கீழ் proxy மாதிரியை பயன்படுத்தும்போது பாதுகாப்பற்ற initializer மூலம் அட்டாக்கர் கணக்கை கைப்பற்ற வாய்ப்பு உள்ளது. குழுக்கள் சந்தையில் குறைந்த கோடுகள் கொண்ட எளிய onchain கோடை வைத்திருக்க வேண்டும்: Ambire இன் 7702 கான்ட்ராக்ட் சுமார் 200 வரிசை Solidity மட்டுமே கொண்டது, சிக்கல்களை குறைக்கவும் பிழைகளைத் தவிர்க்கவும் குறைந்த கம்ப்ளெக்ஸிட்டியுடன் உள்ளது. சிறப்பம்சங்களுக்கு இடையில் மற்றும் எளிமையைக் குறைக்கும் சீரமைப்புக்கு சமநிலை தேவை.

### அறிமுகமான செயல்பாடுகள் {#known-implementations}

EIP-7702 இயல்பினால், வாலெட்டுகள் பயனர்களுக்கு மூன்றாம் தரப்பு கான்ட்ராக்டிற்கு பிரதிநிதித்துவம் செய்ய உதவும்போது கவனமாக இருக்க பரிந்துரைக்கப்படுகிறது. கீழே ஆய்வு செய்யப்பட்ட சில அறிமுகமான செயல்பாடுகள் பட்டியலிடப்பட்டுள்ளது:

| ஒப்பந்த முகவரி                             | மூலம்                                                                                                                                        | தணிக்கைகள்                                                                                                                                                        |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                        | [தணிக்கைகள்](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                        | [தணிக்கைகள்](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)                | [தணிக்கைகள்](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                            | [தணிக்கைகள்](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [எத்தேரியம் அறக்கட்டளை AA குழு](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [தணிக்கைகள்](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                        | [தணிக்கைகள்](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## ஹார்ட்வேர் வாலெட் வழிகாட்டுதல்கள் (Hardware Wallet Guidelines) {#hardware-wallet-guidelines}

ஹார்ட்வேர் வாலெட்டுகள் எந்தவிதமான பிரதிநிதித்துவத்தையும் (arbitrary delegation) வெளிப்படுத்தக்கூடாது. ஹார்ட்வேர் வாலெட் துறையில் நிலவும் ஒப்பந்தமான அணுகுமுறை என்னவெனில், நம்பத்தகுந்த பிரதிநிதி கான்ட்ராக்டுகளின் பட்டியலை பயன்படுத்த வேண்டும். மேலே பட்டியலிடப்பட்ட அறியப்பட்ட செயலாக்கங்களை அனுமதிக்க பரிந்துரைக்கப்படுகிறது; மற்றவற்றைப் பற்றி தனிப்பட்ட முறையில் பரிசீலிக்கலாம். EOA-வை ஒரு கான்ட்ராக்டிற்கு பிரதிநிதித்துவம் செய்தால் அதன் அனைத்து சொத்துகளுக்கும் கட்டுப்பாடு அந்தக் கான்ட்ராக்டிடம் செல்லும் என்பதால், ஹார்ட்வேர் வாலெட்டுகள் 7702-ஐ செயல்படுத்தும் விதத்தில் மிகுந்த எச்சரிக்கையுடன் இருக்க வேண்டும்.

### துணை செயலிகள் (Companion Apps) ஒருங்கிணைப்பு சூழ்நிலைகள் (Integration Scenarios) {#integration-scenarios-for-companion-apps}

#### சோம்பேறி (Lazy) {#lazy}

EOA வழக்கம்போலவே செயல்படுவதால், இதற்காக எதையும் செய்ய தேவையில்லை.

குறிப்பு: சில சொத்துகள் (assets) பிரதிநிதி கோடால் தானாகவே நிராகரிக்கப்படலாம், உதாரணமாக ERC-1155 NFTs. ஆதரவு குழு இதைப் பற்றி தெரிந்திருக்க வேண்டும்.

#### அறிந்திருத்தல் (Aware) {#aware}

EOA-வில் ஒரு பிரதிநிதித்துவம் உள்ளதா என்பதை அதன் கோடைச் சோதித்து பயனருக்கு அறிவிக்கவும், விருப்பமாக அந்த பிரதிநிதித்துவத்தை அகற்ற (remove) வாய்ப்பையும் வழங்கலாம்.

#### பொது பிரதிநிதித்துவம் (Common Delegation) {#common-delegation}

ஹார்ட்வேர் வழங்குநர் (hardware provider) நம்பத்தகுந்த பிரதிநிதி கான்ட்ராக்டுகளை ஒப்புதல் பட்டியலில் சேர்க்கிறார் மற்றும் அவற்றுக்கான ஆதரவை சாப்ட்வேரில் (companion app) செயல்படுத்துகிறார். முழுமையான ERC-4337 ஆதரவை கொண்ட கான்ட்ராக்டைத் தேர்ந்தெடுக்க பரிந்துரைக்கப்படுகிறது.

மற்றொரு EOA-வுக்கு பிரதிநிதித்துவம் செய்யப்பட்ட EOA-கள், வழக்கமான EOA-க்களாகவே நடத்தப்படும்.

#### தனிப்பயன் பிரதிநிதித்துவம் (Custom Delegation) {#custom-delegation}

ஹார்ட்வேர் வழங்குநர் தாமாகவே ஒரு பிரதிநிதி கான்ட்ராக்டை உருவாக்கி அதை பட்டியலில் சேர்க்கிறார் மற்றும் அதன் ஆதரவை சாப்ட்வேரில் செயல்படுத்துகிறார். முழு ERC-4337 ஆதரவு கொண்ட கான்ட்ராக்ட் உருவாக்க பரிந்துரைக்கப்படுகிறது.

மற்றொரு EOA-வுக்கு பிரதிநிதித்துவம் செய்யப்பட்ட EOA-கள், வழக்கமான EOA-க்களாகவே நடத்தப்படும்.
