---
title: Pectra MaxEB
description: "Pectra வெளியீட்டில் MaxEB பற்றி மேலும் அறிக"
lang: ta
---

# MaxEB {#maxeb}

சுருக்கமாக (tl;dr):
Pectra ஹார்ட் ஃபோர்க் (Pectra hard fork) Ethereum வாலிடேட்டர்களுக்கு (validators) அதிகபட்ச செயல்திறன் இருப்புத் தொகை (max effective balance) மற்றும் கூட்டு வட்டியில் ஈடுபட (compounding) தேர்வு செய்ய அனுமதிக்கிறது. இதற்கு, அவர்கள் தங்கள் withdrawal அடையாளங்களை Type 1 இலிருந்து Type 2-க்குப் மாற்ற வேண்டும். இதைச் செய்வதற்கான அதிகாரப்பூர்வ கருவி Launchpad ஆகும். இந்த செயல்பாடு மீளமாற்ற முடியாதது.

## மேலோட்டம் (Overview) {#overview}

### எவர்கள் பாதிக்கப்படுவார்கள்? (Who is affected)? {#who-is-affected}

சரிபார்ப்பாளரை இயக்கும் எவரும் - இது பெரும்பாலும் அவர்கள் கட்டுப்படுத்தும் சரிபார்ப்பாளரின் குறியீட்டை (எ.கா., [சரிபார்ப்பாளர் #12345](https://beaconcha.in/validator/12345)) அறிந்த ஒருவராக இருப்பார். சரிபார்ப்பாளரை இயக்க நீங்கள் ஒரு நெறிமுறையைப் பயன்படுத்தினால் (எ.கா., Lido CSM அல்லது Rocket Pool), அவர்கள் maxEB-ஐ ஆதரிக்கிறார்களா மற்றும் எப்போது ஆதரிப்பார்கள் என்பதை அறிய நீங்கள் அவர்களுடன் சரிபார்க்க வேண்டும்.

நீங்கள் ஒரு லிக்விட் ஸ்டேக்கிங் டோக்கனைப் (எ.கா., rETH அல்லது stETH) பயன்படுத்தி ஸ்டேக் செய்தால், எந்த நடவடிக்கையும் தேவையில்லை அல்லது பரிந்துரைக்கப்படவில்லை.

### "maxEB" என்றால் என்ன? {#what-is-maxeb}

maxEB = MAXimum Effective Balance (அதிகபட்ச செயல்திறன் இருப்புத் தொகை) என்பதைக் குறிக்கிறது. Pectra ஹார்ட் ஃபோர்க் வரும்வரை, ஒவ்வொரு validator-க்கும் அதிகபட்சம் 32 ETH-க்கே வருமானம் கிடைக்கும். Pectra பிறகு, 32 ETH முதல் 2048 ETH வரையிலான (1 ETH மாறுபாட்டில்) எந்த அளவிலும் அவர்களது வருமானம் கணக்கிடப்பட opt-in செய்ய validator-களுக்கு வாய்ப்பு உண்டு.

### ஒரு Validator எப்படிப் opt-in செய்கிறார்? {#how-does-a-validator-opt-in}

ஒரு validator, Type 1 withdrawal credentials-இலிருந்து Type 2-க்குப் மாற்றம் செய்வதன் மூலம் maxEB மாற்றத்துக்குப் opt-in செய்கிறார். Pectra ஹார்டு ஃபோர்க் நேரலைக்கு வந்த பிறகு, இதை [Launchpad (சரிபார்ப்பாளர் நடவடிக்கைகள்)](https://launchpad.ethereum.org/validator-actions) இல் செய்யலாம். Type 0 → Type 1 மாற்றம் போலவே, Type 1 → Type 2 மாற்றமும் மீளமாற்ற முடியாதது.

### Withdrawal Credential என்றால் என்ன? {#whats-a-withdrawal-credential}

நீங்கள் ஒரு validator-ஆக இயங்கும் போது, உங்கள் validator-க்கான withdrawal credentials எனப்படும் அடையாள தகவல்கள் இருக்கின்றன. இந்த தகவல்களை நீங்கள் உங்கள் deposit data Json-ல் காணலாம், அல்லது உங்கள் validator-ன் beaconcha.in இணையதளத்தில் உள்ள [deposit tab](https://beaconcha.in/validator/12345#deposits) பக்கத்தில் பார்க்கலாம்.

1. Type 0 Withdrawal Credentials: உங்கள் withdrawal credentials 0x00... எனத் துவங்கினால், நீங்கள் Shapella hard fork-க்கு முன்னால் Eth வைத் துவைத்திருக்கிறீர்கள். இதுவரை உங்கள் withdrawal முகவரி (address) அமைக்கப்படவில்லை.

![Type 0 withdrawal credential](./0x00-wd.png)

2. Type 1 withdrawal credentials: உங்கள் validator இன் withdrawal credentials 0x01... என்று துவங்கினால், நீங்கள் Shapella hard forkக்கு பிறகு deposit செய்தவராக இருப்பீர்கள் அல்லது ஏற்கனவே உங்கள் Type 0 credentialsஐ Type 1 ஆக மாற்றியிருக்கிறீர்கள்.

![Type 1 withdrawal credential](./0x01-wd.png)

3. Type 2 withdrawal credentials: இந்த புதிய withdrawal credential வகை 0x02... என்று துவங்கும் மற்றும் இது Pectraக்கு பிறகு செயல்படுத்தப்படும். Type 2 withdrawal credentials உள்ள validators ஐ சில நேரங்களில் "compounding validators" என அழைக்கின்றனர். Type 2 withdrawal credentials உள்ள validators ஐ சில நேரங்களில் "compounding validators" என அழைக்கின்றனர்

| **Allowed**       | **Allowed**       |
| ----------------- | ----------------- |
| ✅ Type 0 → Type 1 | ❌ Type 0 → Type 2 |
| ✅ Type 1 → Type 2 | ❌ Type 1 → Type 0 |
|                   | ❌ Type 1 → Type 0 |
|                   | ❌ Type 2 → Type 0 |

### Risks {#risks}

MaxEB ஒரு validator தனது முழு இருப்புத்தொகையையும் மற்றொரு validatorக்கு அனுப்ப அனுமதிக்கிறது. Consolidation request சமர்ப்பிப்பதற்கு முன், நீங்கள் கையெழுத்திடும் பரிவர்த்தனையின் மூலம் மற்றும் உள்ளடக்கங்களை சரிபார்க்க வேண்டும். MaxEB அம்சங்களை பயன்படுத்துவதற்கான அதிகாரப்பூர்வ கருவி Launchpad ஆகும். மூன்றாம் தரப்பு கருவியை நீங்கள் பயன்படுத்த விரும்பினால், பின்வருவன சரிபார்க்கப்பட வேண்டும்:

- மூல validator இன் pubkey மற்றும் withdrawal முகவரி, அவர்கள் கட்டுப்படுத்தும் validator உடன் பொருந்தும்
- இலக்கு validator இன் pubkey சரியாகும் மற்றும் அது அவர்களுக்கே சொந்தமானது
- அவர்கள் மற்றொரு validatorக்கு நிதிகளை அனுப்ப விரும்பவில்லை என்றால், அது ஒரு conversion ஆகும், consolidation அல்ல
- சரியான withdrawal முகவரியால் பரிவர்த்தனைக்கு கையெழுத்திடப்படுகிறது

நீங்கள் எந்தவொரு மூன்றாம் தரப்பு கருவியையும் பயன்படுத்த விரும்பினால், அதை [EthStaker சமூகத்துடன்]](https://ethstaker.org/about) விவாதிப்பதை நாங்கள் வலியுறுத்துகிறோம். உங்கள் அணுகுமுறை சரியானதா என்பதை சரிபார்க்க இது ஒரு பயனுள்ள இடமாக இருக்கும் மற்றும் தவறுகளைத் தவிர்க்க உதவும். நீங்கள் தீய நோக்கமுள்ள அல்லது தவறாக கட்டமைக்கப்பட்ட கருவியைக் பயன்படுத்தினால், உங்கள் முழு validator இருப்புத்தொகையும் நீங்கள் கட்டுப்படுத்தாத validatorக்கு அனுப்பப்படலாம் — அதை மீட்டெடுக்க எந்தவொரு வழியும் இருக்காது.

## Technical details {#technical-details}

### The flow {#the-flow}

ConsolidationRequest செயல்பாட்டின் இரண்டு பயன்பாடுகள் இருக்கின்றன:

1. ஒரு Type 1 validatorஐ Type 2 validatorஆக மாற்றுவது
2. மற்ற validatorகளை உள்ளடக்கிய Type 2 validatorக்குள் கூட்டுவது

Type 1 ஐ Type 2 validator ஆக மாற்றும்போது, மூல validator மற்றும் இலக்கு validator இரண்டும் நீங்கள் மாற்றும் ஒரே validator ஆக இருக்கும். இந்த செயல்பாட்டிற்கு gas செலவாகும் மற்றும் இது மற்ற consolidation requestகளுக்குப் பின்னால் வரிசைப்படுத்தப்படும். இந்த வரிசை deposit வரிசையிலிருந்து தனியாக இருக்கும் மற்றும் புதிய validator depositக்களால் பாதிக்கப்படாது. இதைப் [pectrified.com](https://pectrified.com/). இல் காணலாம்.

Validatorகளை கூட்டுவதற்கு, உங்கள் இலக்கு validatorக்கு Type 2 withdrawal credential இருக்க வேண்டும். இது எந்த validator இருப்புத்தொகை கொண்டாலும் அதன் இலக்காக செயல்படும் மற்றும் அதன் index பாதுகாக்கப்படும்.

### Requirements for converting to Type 2 {#requirements-for-converting-to-type-2}

இது நீங்கள் முதன்முறையாக Type 2 ஆக மாற்றும் validatorக்காக தேவையாகும். இந்த validator இன் index பாதுகாக்கப்பட்டு, செயல்பாட்டில் இருக்கும். இந்த validator இன் index பாதுகாக்கப்பட்டு, செயல்பாட்டில் இருக்கும். Conversionக்காக, source validator == target validator

The validator must...

- செயல்பாட்டில் (active) இருக்க வேண்டும்
- type 1 withdrawal credentials வைத்திருக்க வேண்டும்
- exiting stateஇல் (அல்லது slashed) இருக்கக்கூடாது
- கைவினையாக தூண்டப்பட்ட withdrawals நிலுவையில் இருக்கக்கூடாது (sweepsக்கு இது பொருந்தாது)

![conversion illustration](./conversion.png)

### Requirements for consolidating {#requirements-for-consolidating}

இது conversion போலவே ஒரு செயல்பாடு, ஆனால் இங்கு source validator மற்றும் target validator வேறாக உள்ளனர். Target validator இன் index பாதுகாக்கப்படும் மற்றும் source validator இல் இருந்து இருப்புத்தொகையை ஏற்கும். Source validator இன் index EXITED நிலைக்கு மாற்றப்படும்.

இந்த நிலைமையில், source validatorக்கு மேலே உள்ள அனைத்து தேவைகளும் பொருந்தும், கூடுதலாக:

- குறைந்தபட்சம் ~27.3 மணி நேரங்களாக (ஒரு SHARD_COMMITTEE_PERIOD) செயல்பாட்டில் இருந்திருக்க வேண்டும்

Target validator

- type 2 withdrawal credentials வைத்திருக்க வேண்டும்
- exiting stateஇல் இருக்கக்கூடாது.

![consolidation illustration](./consolidation.png)

### The consolidation request {#the-consolidation-request}

Consolidation request source validator உடன் தொடர்புடைய withdrawal முகவரியால் கையெழுத்திடப்படும் மற்றும் இதில் பின்வருவன இருக்கும்:

1. மூல சரிபார்ப்பாளரின் முகவரி (எ.கா., `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. மூல சரிபார்ப்பாளரின் பொது விசை (எ.கா., `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Target validator இன் public key

Conversionஐச் செய்வதில், 2 மற்றும் 3 ஒன்றாக இருக்கும். இந்த செயல்பாடு [the Launchpad](https://launchpad.ethereum.org/) இல் செய்யப்படலாம்.

### Signing requirements {#signing-requirements}

ஒரு ConsolidationRequestஐ சமர்ப்பிக்க, source validator இன் withdrawal முகவரி அந்த requestஇற்கு கையெழுத்திட வேண்டும். இது validator நிதிகளின் கட்டுப்பாட்டை நிரூபிக்கிறது. இது validator நிதிகளின் கட்டுப்பாட்டை நிரூபிக்கிறது.

### What is signed? {#what-is-signed}

ConsolidationRequest பொருளின் domain-separated [signing root](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root) பயன்படுத்தப்படுகிறது.

- Domain: DOMAIN_CONSOLIDATION_REQUEST
- Signing root புலங்கள்
  - source_pubkey: BLSPubkey
  - target_pubkey: BLSPubkey
  - source_address: ExecutionAddress

இதனால் உருவாகும் BLS கையெழுத்து request உடன் சேர்த்து சமர்ப்பிக்கப்படுகிறது.

குறிப்பு: கையெழுத்து validator key மூலம் அல்ல, withdrawal முகவரியால் செய்யப்படுகிறது.

### Partial withdrawals {#partial-withdrawals}

Type 1 credentials கொண்ட validators தங்களுடைய அதிகபட்ச இருப்பு (32 ETHஐ மீறும் எதையும்) தானாகவே, gas இல்லாமல், தங்களின் withdrawal முகவரிக்கு sweep செய்யப்படுவார்கள். Type 2 withdrawal credentials உள்ள validatorகளுக்கு, அவர்கள் 1 ETH incrementsஇல் compound செய்ய முடியும் என்பதால், அவர்கள் இருப்புகள் 2048 ETHஐ அடையும் வரை தானாக sweep செய்யப்படாது. Type 2 validatorகளில் partial withdrawals கைமுறையாக தூண்டப்பட வேண்டியவை மற்றும் அவை gas செலவாகும்.

## Consolidation tooling {#consolidation-tooling}

Consolidationsஐ நிர்வகிக்க பல கருவிகள் கிடைக்கின்றன. Ethereum Foundation உருவாக்கிய அதிகாரப்பூர்வ கருவி Launchpad ஆகும். மேலும் [Launchpad](https://launchpad.ethereum.org/en/validator-actions) வழங்காத அம்சங்களை வழங்கக்கூடிய, staking சமூகத்தில் இருந்து உருவான மூன்றாம் தரப்பு கருவிகளும் உள்ளன. இங்கு உள்ள கருவிகள் Ethereum Foundation மூலம் audited செய்யப்படவில்லை அல்லது ஒப்புதலளிக்கப்படவில்லை, ஆனால் சமூகத்தில் அறியப்பட்ட நபர்களால் உருவாக்கப்பட்ட open source கருவிகள் ஆகும். இங்குள்ள கருவிகள் எத்தேரியம் அறக்கட்டளையால் தணிக்கை செய்யப்படவில்லை அல்லது அங்கீகரிக்கப்படவில்லை என்றாலும், பின்வருபவை சமூகத்தின் அறியப்பட்ட உறுப்பினர்களால் உருவாக்கப்பட்ட திறந்த மூலக் கருவிகளாகும்.

| கருவி                           | வலைத்தளம்                                                                                                 | திறந்த மூல                         | உருவாக்கியவர்                                  | தணிக்கை செய்யப்பட்டது                                                                                                                                    | இடைமுகம்                                                                                            | குறிப்பிடத்தக்க அம்சங்கள்                                                            |
| ------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Pectra Staking Manager          | pectrastaking.com                                                                         | ஆம், அப்பாச்சி 2.0 | [Pier Two](https://piertwo.com/)               | இல்லை                                                                                                                                                    | வலை இடைமுகம்                                                                                        | Wallet Connect, SAFE உடன் வேலை செய்கிறது                                             |
| Pectra Validator Ops CLI Tool   | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract)                                              | ஆம், MIT                           | [Luganodes](https://www.luganodes.com/)        | ஆம், குவாண்ட்ஸ்டாம்ப் [மே 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | கட்டளை வரி                                                                                          | தொகுப்பாக்குதல், ஒரே நேரத்தில் பல சரிபார்ப்பாளர்களுக்கு                              |
| Ethereal                        | [GitHub](https://github.com/wealdtech/ethereal)                                                           | ஆம், அப்பாச்சி 2.0 | [Jim McDonald](https://www.attestant.io/team/) | இல்லை                                                                                                                                                    | கட்டளை வரி                                                                                          | சரிபார்ப்பாளர் மற்றும் முனை நிர்வாகத்திற்கான முழு அம்சத் தொகுப்பு                    |
| Siren                           | [GitHub](https://github.com/sigp/siren)                                                                   | ஆம், அப்பாச்சி 2.0 | [Sigma Prime](https://sigmaprime.io/)          | இல்லை                                                                                                                                                    | சிறிதளவு கட்டளை வரி, ஆனால் முதன்மையாக வலை இடைமுகம்                                                  | நீங்கள் லைட்ஹவுஸ் கன்சென்சஸ் கிளையண்ட்டைப் பயன்படுத்தினால் மட்டுமே இது வேலை செய்யும் |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | ஆம், MIT உரிமங்கள்                 | [Stakely](https://stakely.io/)                 | இல்லை                                                                                                                                                    | வலை இடைமுகம், ஸ்டேக்லியால் ஹோஸ்ட் செய்யப்பட்டது மற்றும் இலவசமாக சுயமாக ஹோஸ்ட் செய்யத் தயாராக உள்ளது | walletconnect உடனான safe உட்பட முக்கிய பணப்பை இணைப்புகளை ஆதரிக்கிறது                 |

## கேள்விகள் மற்றும் பதில்கள் {#faq}

### என் பரிந்துரை அதிர்ஷ்டம் அல்லது வெகுமதிகளில் மாற்றம் வருமா? {#change-luck-or-rewards}

இல்லை. Opt-in செய்வதால் உங்கள் பரிந்துரை வாய்ப்பு குறையாது – உங்கள் கடமைகள் மற்றும் பரிந்துரை தேர்வு அதேபோல இருக்கும். உதாரணத்திற்கு, நீங்கள் இரண்டு 32 ETH வைலிடேட்டர்களை வைத்திருந்தாலும், அல்லது ஒரு 64 ETH வைலிடேட்டர் வைத்திருந்தாலும், உங்கள் மொத்த வாய்ப்புகள் சமமாகவே இருக்கும்.

### ஸ்லாஷிங் அபாயத்தில் மாற்றம் வருமா? {#change-slashing-risk}

சிறிய அல்லது தொழில்முறை அல்லாத ஆபரேட்டர்களுக்கு, சிறு பதில்: இல்லை. விரிவான பதில்: பெரிய அளவில் வைலிடேட்டர்களை ஒரே நோட்டில் இயக்கும் தொழில்முறை ஆபரேட்டர்களுக்காக, ஒற்றை வைலிடேட்டராக ஒன்றிணைப்பது ஸ்லாஷிங் ஏற்பட்டால் அதனை சரியான நேரத்தில் கையாளும் திறனை குறைக்கும் அபாயம் இருக்கலாம். ஆனால், ஆரம்ப ஸ்லாஷிங் அபராதம் முன்னர் 1 ETH (32 ETHக்கு) இருந்ததை தற்போது 0.0078125 ETH ஆக குறைத்துள்ளதால், இந்த அபாயம் சீர்படுத்தப்பட்டுள்ளது.

### மாற்ற அல்லது ஒன்றிணைக்க என் வைலிடேட்டரை வெளியேற்ற வேண்டுமா? {#exit-validator}

இல்லை. இல்லை. நீங்கள் வெளியேறாமல் நேரடியாகவே மாற்றம் செய்யலாம்.

### மாற்றம் / ஒன்றிணைப்பு செய்ய எவ்வளவு நேரம் ஆகும்? {#how-long}

குறைந்தபட்சம் 27.3 மணி நேரம் தேவைப்படும். ஆனால், இது ஒரு தனி வரிசையை (queue) சார்ந்திருக்கும். இது டெப்பாசிட் மற்றும் வித்‌டிராவல் வரிசைகளுடன் தொடர்புடையதல்ல.

### என் வைலிடேட்டர் குறியீட்டை வைத்திருக்க முடியுமா? {#keep-validator-index}

ஆம். நேரடி மாற்றம் செய்தால் அதே வைலிடேட்டர் குறியீடு இருக்கும். ஆனால் நீங்கள் பல வைலிடேட்டர்களை ஒன்றிணைக்கிறீர்களானால், இலக்கை (target) வைலிடேட்டரின் குறியீடைத்தான் வைத்திருக்க முடியும்.

### நான் அட்டெஸ்டேஷன்களை தவறவிடுவேனா? {#miss-attestations}

ஒன்றிணைப்பு செய்கிறபோது, மூல வைலிடேட்டர் வெளியேற்றப்படுகிறது, மேலும் இலக்கு வைலிடேட்டரில் பைலன்ஸ் செயலில் வர சுமார் 27 மணி நேரம் தேவைப்படும். ஆனால், இந்த காலநிலை செயல்திறன் அளவுகளை பாதிக்காது.

### எனக்கு அபராதம் (penalties) வருமா? {#incur-penalties}

இல்லை. உங்கள் வைலிடேட்டர் ஆன்லைனில் இருந்தால் எந்தவிதமான அபராதமும் வராது.

### ஒன்றிணைக்கப்படும் வைலிடேட்டர்களின் வித்‌டிராவல் முகவரிகள் ஒன்றாக இருக்க வேண்டுமா? {#withdrawal-addresses-match}

இல்லை. ஆனால், ஒவ்வொரு மூல வைலிடேட்டரும் தன்னுடைய முகவரியில் இருந்து இந்த கோரிக்கையை அங்கீகரிக்க வேண்டும்.

### மாற்றிய பிறகு என் வெகுமதிகள் கம்பவுண்ட் ஆகுமா? {#rewards-compound}

ஆம். Type 2 சான்றிதழ்களுடன், 32 ETHக்கு மேற்பட்ட வெகுமதிகள் தானாகவே மீண்டும் ஸ்டேக் செய்யப்படும். ஒரு சிறிய பஃபர் [_hysteresis_](https://eth2book.info/capella/part2/incentives/balances/#hysteresis) காரணமாக, உங்கள் பைலன்ஸ் சுமார் 1.25 ETH மேலாக சென்றபின்தான் மீண்டும் ஸ்டேக் செய்யப்படும். எ. கா., 33 ETH இல் இல்லாமல், 33.25 ETH (effective balance = 33 ETH), பின்னர் 34.25 ETH (effective balance = 34 ETH), என தொடரும்.

### மாற்றம் செய்த பிறகு எனக்கு தானாக சுயமாக ஸ்வீப் ஆகுமா? {#automatic-sweep}

தானாக ஸ்வீப் என்பது பைலன்ஸ் 2048 Eth-ஐ தாண்டும்போது மட்டுமே நடைபெறும். அதைத் தவிர மற்ற அனைத்து பகுதி வித்‌டிராவல்களும் கைமுறையாக தொடங்க வேண்டியது தான்.

### நான் என் முடிவை மாற்றி Type 2 இலிருந்து Type 1க்கு திரும்ப முடியுமா? {#go-back-to-type1}

இல்லை. Type 2-க்கு மாற்றிய பிறகு அது மீண்டும் மாற்ற முடியாதது.

### நான் பல வைலிடேட்டர்களை ஒன்றிணைக்க விரும்பினால், ஒவ்வொன்றையும் முதலில் Type 2-ஆக மாற்ற வேண்டுமா? {#consolidate-multiple-validators}

வேண்டாம்! ஒரு வைலிடேட்டரை Type 2-ஆக மாற்றி, அதை இலக்காக (target) பயன்படுத்தலாம். அதில் ஒன்றிணைக்கப்படும் மற்ற அனைத்து வைலிடேட்டர்களும் Type 1 ஆக இருந்தாலும் சரி, Type 2 ஆக இருந்தாலும் சரி – இரண்டும் பரவாயில்லை

### என் வைலிடேட்டர் ஆன்லைனில் இல்லை அல்லது 32 ETH க்கும் குறைவாக இருக்கிறதா – நான் அதைப் பரிவர்த்தனை செய்ய முடியுமா? {#offline-or-below-32eth}

ஆம். ஆம். உங்கள் வைலிடேட்டர் ஆக்டிவ் (exited ஆகவில்லை) நிலையில் இருந்தால், மற்றும் நீங்கள் அதன் withdrawal address மூலம் ஸைன் செய்ய முடிந்தால், மாற்ற இயலும்.

## ஆதாரங்கள் {#resources}

- [Electra consensus specs](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md): இது தான் "மெய்யான" மற்றும் நம்பக்கூடிய தொழில்நுட்ப விவரக்குறிப்பு. சந்தேகம் ஏற்பட்டால் இதைப் படிக்கவும்
- MaxEB-GPT: அனைவரும் கோடுகளைப் புரிந்துகொள்ள முடியாது என்பதால், [this maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt). உண்மையான தகவலுக்காக, எய்ஐயை (AI) அல்ல, அதிகாரப்பூர்வ ஸ்பெக் (specifications)-ஐ தான் நம்ப வேண்டும்.
  ஏனெனில், எய்ஐ சில நேரங்களில் தவறாக விளக்கமளிக்கலாம் அல்லது எண்ணியதைப் போல் பதில் அளிக்கலாம்
- [pectrified.com](https://pectrified.com/): ஒன்றிணைப்பு நிலை, டெப்பாசிட் மற்றும் க்யூ நிலைகள் ஆகியவற்றைக் காணலாம்
- [Ethereal](https://github.com/wealdtech/ethereal): சாதாரண validator பணிகளை நிர்வகிக்க சமூகத்தால் உருவாக்கப்பட்ட CLI கருவி
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): ஒரே டிரான்சாக்ஷனில் பல Ethereum வைலிடேட்டர்களை டெப்பாசிட் செய்யும் சமூகத்தால் உருவாக்கப்பட்ட smart contract
