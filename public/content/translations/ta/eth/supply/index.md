---
title: "ETH வழங்கல் மற்றும் வெளியீட்டைப் புரிந்துகொள்ளல்"
description: "EIPகள், PoS மற்றும் EIP-1559 போன்ற முக்கியக் கருத்துக்களை உள்ளடக்கி, ETH வழங்கல் மற்றும் வெளியீடு குறித்த ஒரு தொடக்கநிலையாளர் நட்பு வழிகாட்டி."
lang: ta
---

# ETH Supply and Issuance {#eth-supply-and-issuance}

## முன்னேற்றக் கட்டுரை {#prerequisites}

இந்தக் கட்டுரை, முன்னதாக எந்த அறிவும் இல்லாத தொடக்க நிலை வாசகர்களுக்காக எழுதப்பட்டுள்ளது. இருப்பினும், இந்தத் தலைப்பை முழுமையாகப் புரிந்துகொள்ள, [எத்தேரியம் முன்னேற்ற முன்மொழிவுகள் (EIPs)](/eips/#introduction-to-ethereum-improvement-proposals), [பணிச்சான்று (PoW)](/developers/docs/consensus-mechanisms/pow/), [பங்குச்சான்று (PoS)](/developers/docs/consensus-mechanisms/pos/), மற்றும் [லண்டன் மேம்படுத்தல்](/ethereum-forks/#london) போன்ற கருத்துகளில் அடிப்படைப் புரிதல் இருப்பது உதவியாக இருக்கும்.

## How Many ETH Tokens Are There Today? {#current-eth-supply}

ETH-இன் மொத்த வழங்கல் (supply) நிலையானது அல்ல; அது எப்போதும் மாறிக்கொண்டே இருக்கும். இதற்குக் காரணமான முக்கியமான இரண்டு அம்சங்கள்:

1. Proof-of-Stake (PoS) Issuance: நெட்வொர்க்கை பாதுகாக்கும் validators-க்கு புதிய ETH பரிசாக உருவாக்கப்படும்
2. EIP-1559 Burning: பரிவர்த்தனை கட்டணத்தின் ஒரு பகுதி நிரந்தரமாக அழிக்கப்பட்டு (burn) சுழற்சியில் இருந்து அகற்றப்படும்

Eth-இன் தற்போதைய வழங்கலையும் இந்த மாற்றங்களையும் நேரடியாகக் கண்காணிக்க [Ultrasound Money](https://ultrasound.money) போன்ற தளங்களில் பார்க்கலாம்.

Ethereum-இன் supply மற்றும் issuance ஆகியவை நெட்வொர்க்கின் நலனையும் எதிர்காலத்தையும் புரிந்துகொள்வதில் முக்கியமான அளவுகோல்கள். ஆனால் ETH issuance என்றால் உண்மையில் என்ன? அதை நாமே பிரித்து பார்ப்போம்.

## Why ETH Supply and Issuance Matter {#why-eth-supply-matters}

பாரம்பரிய நிதியில் (Traditional finance), மத்திய வங்கிகள் பணத்தின் வழங்கலை (money supply) கட்டுப்படுத்துகின்றன; பல சமயங்களில் பொருளாதாரத்தை ஊக்குவிக்க மேலும் பணத்தை அச்சடிப்பார்கள். ஆனால் Ethereum, அதன் குறியீட்டால் (code) ஆளப்படுகிற வெளிப்படையான மற்றும் முன்னறியக்கூடிய (predictable) முறையில் இயங்குகிறது. எத்தனை ETH இருக்கிறது? புதிய ETH எவ்வளவு வேகமாக வெளியிடப்படுகிறது? என்பதை அறிதல் உதவுகிறது:

- நம்பிக்கை உருவாக்க: Ethereum சமூகமே, வழங்கல் மற்றும் வெளியீட்டு (issuance) தரவுகளை நேரடியாக blockchain-இலிருந்து சரிபார்க்க முடியும்.
- மதிப்பை புரிந்துகொள்ள: வெளியீட்டும் (issuance) எரிப்பும் (burn rates) இடையேயான உறவு ETH-இன் பணவீக்கம் (inflation) அல்லது பணவிலக்கு (deflation) என்பதை நிர்ணயிக்கும்; இது அதன் நீண்டகால மதிப்பை பாதிக்கும்.
- நெட்வொர்க் நலனை கண்காணிக்க: வெளியீடு மற்றும் எரிப்பு விகிதங்களில் ஏற்படும் மாற்றங்கள் நெட்வொர்க்கின் செயற்பாடு மற்றும் பாதுகாப்பை பிரதிபலிக்கின்றன.

## What is ETH Issuance? {#eth-issuance}

ETH issuance என்பது Ethereum நெட்வொர்க்கை பாதுகாக்கும் validators-க்கு பரிசாக புதிய ETH உருவாக்கப்படும் செயல்முறை. இது மொத்த வழங்கலிலிருந்து (total supply) வேறானது — total supply என்பது சுழற்சியில் இருக்கும் ETH-இன் மொத்த அளவாகும்.

### சரளமாக சொன்னால்:

- Issuance → புதிய ETH நெட்வொர்க்கில் சேர்க்கப்படும்.
- Burning (EIP-1559 மூலம் அறிமுகப்படுத்தப்பட்டது) → பரிவர்த்தனை கட்டணத்தின் ஒரு பகுதி அழிக்கப்பட்டு (burn) நெட்வொர்க்கிலிருந்து நிரந்தரமாக நீக்கப்படும்.

இந்த இரண்டு சக்திகளும் (forces) Ethereum-இன் வழங்கல் காலப்போக்கில் அதிகரிக்குமா (Inflationary) அல்லது குறையுமா (Deflationary) என்பதை நிர்ணயிக்கின்றன.

## ETH Supply and Issuance Today {#eth-supply-today}

Ethereum-ன் Proof-of-Stake (PoS) முறை, முந்தைய Proof-of-Work (PoW) முறைமையை ஒப்பிடும்போது ETH வெளியீட்டை (issuance) பெரிதும் குறைத்துள்ளது. நெட்வொர்க்கை பாதுகாக்க ETH-ஐ பூட்டிவைக்கும் (staking) validators ETH-ஐ பரிசாகப் பெறுகிறார்கள். தற்போதைய வெளியீட்டு விகிதத்தை (issuance rate) [Ultrasound Money](https://ultrasound.money)-ல் காணலாம்.

ஆனால் இந்த எண் நிலையானது அல்ல. EIP-1559-ன் காரணமாக, நெட்வொர்க் செயற்பாடு அதிகரிக்கும் போது ETH எரிப்பு விகிதம் (burn rate) வெளியீட்டை விட அதிகமாகி, deflationary effect உருவாகலாம். உதாரணமாக, NFT வெளியீடுகள் அல்லது DeFi செயற்பாடுகள் போன்ற அதிக தேவை கொண்ட காலங்களில், வெளியிடப்படுகிறதை விட அதிக ETH எரிக்கப்படலாம்.

### Tools to Track ETH Supply and Issuance:

- [Ultrasound Money](https://ultrasound.money) – ETH supply, issuance, மற்றும் burn rates-ஐ நேரடியாகக் கண்காணிக்க
- [Etherscan](https://etherscan.io) – supply metrics உடன் வரும் blockchain explorer

## Factors Influencing Future ETH Supply and Issuance {#future-eth-supply}

Ethereum-இன் எதிர்கால வழங்கல் (supply) நிரந்தரமாக நிர்ணயிக்கப்பட்டது அல்ல — அது பல காரணிகளால் பாதிக்கப்படும்:

1. Staking Participation:
   - அதிகமான validators நெட்வொர்க்கில் சேரும்போது, அதிக ETH பரிசாக வழங்கப்படும்.
   - குறைவான validators பங்கேற்றால், வெளியீடு குறையக்கூடும்.
   - [staking](/staking/) பற்றி மேலும் அறியவும்.

2. **Network Activity**:
   - அதிக பரிவர்த்தனைகள் நடந்தால், அதிக ETH எரிக்கப்படும்; இதனால் வெளியீட்டை சமநிலைப்படுத்தவோ அல்லது அதைவிட அதிகமாகக் குறைக்கவோ செய்யலாம்.
   - [gas fees](/developers/docs/gas/) மற்றும் burning-ஐ அது எப்படி பாதிக்கிறது என்பதைப் படிக்கவும்.

3. **Protocol Upgrades**:
   - எதிர்கால Ethereum code மாற்றங்கள் staking rewards அல்லது burning முறைகளில் மாற்றங்களை ஏற்படுத்தக்கூடும்; இதனால் supply நிலைகள் மேலும் மாறும்.
   - [Ethereum roadmap](/roadmap/)-ஐ தொடர்ந்து அறிந்துகொள்ளவும்.

## Recap: ETH Supply, Issuance, and What's Next {#recap}

இங்கே ETH supply மற்றும் issuance குறித்து நீங்கள் அறிந்து கொள்ள வேண்டியவற்றின் ஒரு விரைவான சுருக்கம்:

- ETH Supply: எப்போதும் மாறிக்கொண்டிருக்கும் இயக்கமானது (dynamic). [Ultrasound Money](https://ultrasound.money) போன்ற கருவிகளில் real-time-ஆக கண்காணிக்கலாம்
- Issuance Under PoS: PoW-ஐ ஒப்பிடும்போது மிகக் குறைவாக உள்ளது. பரிசுகள் validators-க்கு வழங்கப்படுகின்றன. தற்போதைய விகிதங்களை [Ultrasound Money](https://ultrasound.money)-ல் பார்க்கலாம்
- EIP-1559-ன் பங்கு: நெட்வொர்க் அதிகமாக செயல்படும் காலங்களில் ETH எரிப்பு, வெளியீட்டை விட அதிகரித்து, நெட்வொர்க்கை deflationary ஆக மாற்றக்கூடும்
- Future Trends: Staking பங்கேற்பு, நெட்வொர்க் தேவைகள், மற்றும் protocol மேம்பாடுகள் அனைத்தும் ETH supply-ஐ வடிவமைக்கும்

ETH issuance-ஐப் புரிந்துகொள்வது, Ethereum-ன் மதிப்பையும், அது deflationary மற்றும் decentralized சொத்து (asset) ஆகும் சாத்தியத்தையும் தெளிவாக அறிய உதவுகிறது. The Merge ETH supply-ஐ எவ்வாறு பாதித்தது என்பதை அறிய எங்கள் [விரிவான breakdown](/roadmap/merge/issuance/)-ஐ பார்க்கவும். ETH-இன் எதிர்காலம் குறித்து ஆர்வமாக உள்ளீர்களா? [Ultrasound Money](https://ultrasound.money கருவியிலும் எங்கள் staking guides-லும் ஆழமாக ஆராயுங்கள்.