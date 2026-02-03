---
title: "Waffle: டைனமிக் மாக்கிங் மற்றும் ஒப்பந்த அழைப்புகளைச் சோதித்தல்"
description: "டைனமிக் மாக்கிங் மற்றும் ஒப்பந்த அழைப்புகளைச் சோதிக்கப் மேம்பட்ட Waffle பயிற்சி"
author: "டேனியல் இஸ்டெப்ஸ்கி"
tags:
  [
    "waffle",
    "ஸ்மார்ட் ஒப்பந்தங்கள்",
    "திட்பம்",
    "சோதனை",
    "மாக் செய்தல்"
  ]
skill: intermediate
lang: ta
published: 2020-11-14
---

## இந்தப் பயிற்சி எதைப் பற்றியது? {#what-is-this-tutorial-about}

இந்தப் பயிற்சியில் நீங்கள் கற்றுக்கொள்வது:

- டைனமிக் மாக்கிங்கைப் பயன்படுத்துதல்
- ஸ்மார்ட் ஒப்பந்தங்களுக்கு இடையேயான தொடர்புகளைச் சோதித்தல்

அனுமானங்கள்:

- `Solidity`யில் ஒரு எளிய ஸ்மார்ட் ஒப்பந்தத்தை எப்படி எழுதுவது என்பது உங்களுக்கு ஏற்கனவே தெரியும்
- `JavaScript` மற்றும் `TypeScript`-ல் உங்களுக்குப் பரிச்சயம் உண்டு
- நீங்கள் மற்ற `Waffle` பயிற்சிகளைச் செய்துள்ளீர்கள் அல்லது அதைப் பற்றி ஓரிரு விடயங்கள் உங்களுக்குத் தெரியும்

## டைனமிக் மாக்கிங் {#dynamic-mocking}

டைனமிக் மாக்கிங் ஏன் பயனுள்ளதாக இருக்கிறது? சரி, இது ஒருங்கிணைப்புச் சோதனைகளுக்குப் பதிலாக யூனிட் சோதனைகளை எழுத அனுமதிக்கிறது. அதன் பொருள் என்ன? இதன் பொருள், ஸ்மார்ட் ஒப்பந்தங்களின் சார்புநிலைகளைப் பற்றி நாம் கவலைப்பட வேண்டியதில்லை, இதனால் அவை அனைத்தையும் முழுமையான தனிமையில் சோதிக்க முடியும். அதை நீங்கள் எப்படிச் சரியாகச் செய்ய முடியும் என்பதை நான் உங்களுக்குக் காட்டுகிறேன்.

### **1.** திட்டம்\*\* {#1-project}

நாம் தொடங்குவதற்கு முன், ஒரு எளிய node.js திட்டத்தை நாம் தயார் செய்ய வேண்டும்:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# அல்லது நீங்கள் npm பயன்படுத்துகிறீர்கள் என்றால்
npm init
```

typescript மற்றும் சோதனை சார்புநிலைகளான - mocha & chai-ஐச் சேர்ப்பதன் மூலம் தொடங்குவோம்:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# அல்லது நீங்கள் npm பயன்படுத்துகிறீர்கள் என்றால்
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

இப்போது `Waffle` மற்றும் `ethers`-ஐச் சேர்ப்போம்:

```bash
yarn add --dev ethereum-waffle ethers
# அல்லது நீங்கள் npm பயன்படுத்துகிறீர்கள் என்றால்
npm install ethereum-waffle ethers --save-dev
```

உங்கள் திட்டத்தின் கட்டமைப்பு இப்போது இப்படி இருக்க வேண்டும்:

```
.
├── contracts
├── package.json
└── test
```

### **2.** ஸ்மார்ட் ஒப்பந்தம்\*\* {#2-smart-contract}

டைனமிக் மாக்கிங்கைத் தொடங்க, நமக்குச் சார்புநிலைகளைக் கொண்ட ஒரு ஸ்மார்ட் ஒப்பந்தம் தேவை. கவலைப்பட வேண்டாம், நான் உங்களுக்கு உதவுகிறேன்!

இதோ `Solidity`-இல் எழுதப்பட்ட ஒரு எளிய ஸ்மார்ட் ஒப்பந்தம், அதன் ஒரே நோக்கம் நாம் பணக்காரர்களா என்று சரிபார்ப்பதுதான். நம்மிடம் போதுமான டோக்கன்கள் உள்ளதா என்பதைச் சரிபார்க்க, இது ERC20 டோக்கனைப் பயன்படுத்துகிறது. இதை `./contracts/AmIRichAlready.sol` இல் இடவும்.

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

நாம் டைனமிக் மாக்கிங்கைப் பயன்படுத்த விரும்புவதால், நமக்கு முழு ERC20-ம் தேவையில்லை, அதனால்தான் ஒரே ஒரு செயல்பாட்டுடன் கூடிய IERC20 இடைமுகத்தைப் பயன்படுத்துகிறோம்.

இந்த ஒப்பந்தத்தைக் கட்டமைக்கும் நேரம் இது! அதற்காக நாம் `Waffle`-ஐப் பயன்படுத்துவோம். முதலில், தொகுப்பு விருப்பங்களைக் குறிப்பிடும் ஒரு எளிய `waffle.json` கட்டமைப்பு கோப்பை நாம் உருவாக்கப் போகிறோம்.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

இப்போது நாம் Waffle மூலம் ஒப்பந்தத்தைக் கட்டமைக்கத் தயாராக உள்ளோம்:

```bash
npx waffle
```

சுலபம், இல்லையா? `build/` கோப்புறையில் ஒப்பந்தம் மற்றும் இடைமுகத்துடன் தொடர்புடைய இரண்டு கோப்புகள் தோன்றின. சோதிப்பதற்காகப் பின்னர் அவற்றைப் பயன்படுத்துவோம்.

### **3.** சோதித்தல்\*\* {#3-testing}

உண்மையான சோதனைக்காக, `AmIRichAlready.test.ts` என்ற கோப்பை உருவாக்குவோம். முதலில், நாம் இறக்குமதிகளைக் கையாள வேண்டும். அவை நமக்கு பின்னர் தேவைப்படும்:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

JS சார்புநிலைகளைத் தவிர, நாம் உருவாக்கிய ஒப்பந்தத்தையும் இடைமுகத்தையும் இறக்குமதி செய்ய வேண்டும்:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

சோதிப்பதற்காக Waffle `chai`-ஐப் பயன்படுத்துகிறது. இருப்பினும், நாம் அதைப் பயன்படுத்துவதற்கு முன்பு, Waffle-இன் மேட்சர்களை chai-யிலேயே செலுத்த வேண்டும்:

```typescript
use(solidity)
```

ஒவ்வொரு சோதனைக்கும் முன் ஒப்பந்தத்தின் நிலையை மீட்டமைக்கும் `beforeEach()` செயல்பாட்டை நாம் செயல்படுத்த வேண்டும். நமக்கு அங்கே என்ன தேவை என்று முதலில் சிந்திப்போம். ஒரு ஒப்பந்தத்தை வரிசைப்படுத்த நமக்கு இரண்டு விடயங்கள் தேவை: `AmIRichAlready` ஒப்பந்தத்திற்கு ஒரு ஆர்கியூமென்ட்டாக அனுப்ப, ஒரு வாலட் மற்றும் வரிசைப்படுத்தப்பட்ட ஒரு ERC20 ஒப்பந்தம்.

முதலில் நாம் ஒரு வாலட்டை உருவாக்குகிறோம்:

```typescript
const [wallet] = new MockProvider().getWallets()
```

பிறகு நாம் ஒரு ERC20 ஒப்பந்தத்தை வரிசைப்படுத்த வேண்டும். இதோ தந்திரமான பகுதி - நம்மிடம் ஒரு இடைமுகம் மட்டுமே உள்ளது. இந்த இடத்தில்தான் Waffle நம்மைக் காப்பாற்ற வருகிறது. Waffle ஒரு மாயாஜால `deployMockContract()` செயல்பாட்டைக் கொண்டுள்ளது, அது இடைமுகத்தின் _abi_ -ஐ மட்டுமே பயன்படுத்தி ஒரு ஒப்பந்தத்தை உருவாக்குகிறது:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

இப்போது வாலட் மற்றும் வரிசைப்படுத்தப்பட்ட ERC20 ஆகிய இரண்டையும் கொண்டு, நாம் `AmIRichAlready` ஒப்பந்தத்தை வரிசைப்படுத்தலாம்:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

இவை அனைத்தையும் கொண்டு, நமது `beforeEach()` செயல்பாடு முடிந்தது. இதுவரை உங்கள் `AmIRichAlready.test.ts` கோப்பு இப்படி இருக்க வேண்டும்:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

`AmIRichAlready` ஒப்பந்தத்திற்கான முதல் சோதனையை எழுதுவோம். நமது சோதனை எதைப் பற்றியதாக இருக்க வேண்டும் என்று நீங்கள் நினைக்கிறீர்கள்? ஆம், நீங்கள் சொல்வது சரிதான்! நாம் ஏற்கனவே பணக்காரர்களாக இருக்கிறோமா என்று சரிபார்க்க வேண்டும் :)

ஆனால் ஒரு நொடி பொறுங்கள். நமது மாக்கிங் செய்யப்பட்ட ஒப்பந்தத்திற்கு என்ன மதிப்புகளைத் திருப்பித் தர வேண்டும் என்று எப்படித் தெரியும்? `balanceOf()` செயல்பாட்டிற்கு நாம் எந்த லாஜிக்கையும் செயல்படுத்தவில்லை. மீண்டும், Waffle இங்கே உதவ முடியும். நமது மாக்கிங் செய்யப்பட்ட ஒப்பந்தத்தில் இப்போது சில புதிய சுவாரசியமான விடயங்கள் உள்ளன:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

இந்த அறிவுடன், நாம் இறுதியாக நமது முதல் சோதனையை எழுதலாம்:

```typescript
it("வாலட்டில் 1000000 டோக்கன்களை விடக் குறைவாக இருந்தால் தவறு எனத் திருப்பியளிக்கும்", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

இந்தச் சோதனையை நாம் பகுதிகளாகப் பிரிப்போம்:

1. எப்போதும் 999999 டோக்கன்களின் இருப்பைத் திருப்பியளிக்கும்படி நமது மாக் ERC20 ஒப்பந்தத்தை நாம் அமைக்கிறோம்.
2. `contract.check()` முறை `false` எனத் திருப்பியளிக்கிறதா எனச் சரிபார்க்கவும்.

இதை இயக்க நாம் தயாராக இருக்கிறோம்:

![ஒரு சோதனை தேர்ச்சி பெறுகிறது](./test-one.png)

எனவே சோதனை வேலை செய்கிறது, ஆனால்... இன்னும் மேம்படுத்துவதற்கு சில இடங்கள் உள்ளன. `balanceOf()` செயல்பாடு எப்போதும் 99999 எனத் திருப்பியளிக்கும். ஒரு உண்மையான ஒப்பந்தத்தைப் போலவே, எந்த வாலட்டிற்கு இந்தச் செயல்பாடு எதையாவது திருப்பியளிக்க வேண்டும் என்பதைக் குறிப்பிடுவதன் மூலம் நாம் அதை மேம்படுத்தலாம்:

```typescript
it("வாலட்டில் 1000001 டோக்கன்களை விடக் குறைவாக இருந்தால் தவறு எனத் திருப்பியளிக்கும்", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

இதுவரை, நாம் போதுமான பணக்காரர்களாக இல்லாத நிலையை மட்டுமே சோதித்துள்ளோம். அதற்குப் பதிலாக எதிர்மாறானதைச் சோதிப்போம்:

```typescript
it("வாலட்டில் குறைந்தது 1000001 டோக்கன்கள் இருந்தால் சரி எனத் திருப்பியளிக்கும்", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

நீங்கள் சோதனைகளை இயக்குகிறீர்கள்...

![இரண்டு சோதனைகள் தேர்ச்சி பெறுகின்றன](test-two.png)

...இதோ! நமது ஒப்பந்தம் உத்தேசித்தபடி செயல்படுவதாகத் தெரிகிறது :)

## ஒப்பந்த அழைப்புகளைச் சோதித்தல் {#testing-contract-calls}

இதுவரை நாம் செய்ததைச் சுருக்கமாகப் பார்ப்போம். நமது `AmIRichAlready` ஒப்பந்தத்தின் செயல்பாட்டை நாம் சோதித்துள்ளோம், மேலும் அது சரியாக வேலை செய்வதாகத் தெரிகிறது. அப்படியென்றால் நமது வேலை முடிந்தது, சரிதானே? சரியாகச் சொல்லப்போனால் இல்லை! நமது ஒப்பந்தத்தை இன்னும் மேலாகச் சோதிக்க Waffle நம்மை அனுமதிக்கிறது. ஆனால் எப்படிச் சரியாக? சரி, Waffle-இன் ஆயுதக் களஞ்சியத்தில் `calledOnContract()` மற்றும் `calledOnContractWith()` மேட்சர்கள் உள்ளன. நமது ஒப்பந்தம் ERC20 மாக் ஒப்பந்தத்தை அழைத்ததா என்பதைச் சரிபார்க்க அவை நம்மை அனுமதிக்கும். இந்த மேட்சர்களில் ஒன்றைப் பயன்படுத்தும் ஒரு அடிப்படைச் சோதனை இதோ:

```typescript
it("ERC20 டோக்கனில் ஒப்பந்தம் balanceOf-ஐ அழைத்ததா எனச் சரிபார்க்கிறது", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

நான் உங்களிடம் கூறிய மற்ற மேட்சரைப் பயன்படுத்தி, நாம் இன்னும் மேலே சென்று இந்தச் சோதனையை மேம்படுத்தலாம்:

```typescript
it("ERC20 டோக்கனில் ஒரு குறிப்பிட்ட வாலட்டுடன் ஒப்பந்தம் balanceOf-ஐ அழைத்ததா எனச் சரிபார்க்கிறது", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

சோதனைகள் சரியானவையா என்று சரிபார்ப்போம்:

![மூன்று சோதனைகள் தேர்ச்சி பெறுகின்றன](test-three.png)

அருமை, எல்லாச் சோதனைகளும் வெற்றி.

Waffle மூலம் ஒப்பந்த அழைப்புகளைச் சோதிப்பது மிகவும் சுலபம். இதோ இதன் சிறந்த பகுதி. இந்த மேட்சர்கள் சாதாரண மற்றும் மாக்கிங் செய்யப்பட்ட ஒப்பந்தங்கள் இரண்டிலும் வேலை செய்யும்! ஏனெனில், பிற தொழில்நுட்பங்களுக்கான பிரபலமான சோதனை லைப்ரரிகளைப் போலன்றி, Waffle குறியீட்டைச் செலுத்தாமல் EVM அழைப்புகளைப் பதிவுசெய்து வடிகட்டுகிறது.

## இறுதிக்கட்டம் {#the-finish-line}

வாழ்த்துக்கள்! ஒப்பந்த அழைப்புகளைச் சோதிக்கவும், ஒப்பந்தங்களை டைனமிக்காக மாக்கிங் செய்யவும் Waffle-ஐ எப்படிப் பயன்படுத்துவது என்பது இப்போது உங்களுக்குத் தெரியும். கண்டறிய இன்னும் பல சுவாரசியமான அம்சங்கள் உள்ளன. Waffle-இன் ஆவணத்தை முழுமையாகப் படிக்குமாறு பரிந்துரைக்கிறேன்.

Waffle-இன் ஆவணம் [இங்கே](https://ethereum-waffle.readthedocs.io/) கிடைக்கிறது.

இந்தப் பயிற்சிக்கான மூலக் குறியீட்டை [இங்கே](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls) காணலாம்.

நீங்கள் ஆர்வமாக இருக்கக்கூடிய பிற பயிற்சிகள்:

- [Waffle மூலம் ஸ்மார்ட் ஒப்பந்தங்களைச் சோதித்தல்](/developers/tutorials/waffle-test-simple-smart-contract/)
