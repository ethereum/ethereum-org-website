---
title: "Waffle: Uigaji unaobadilika na kupima wito wa mkataba"
description: Mafunzo ya kina ya Waffle kwa kutumia uigaji unaobadilika na kupima wito wa mkataba
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "mikataba erevu",
    "uimara",
    "majaribio",
    "kuiga"
  ]
skill: intermediate
lang: sw
published: 2020-11-14
---

## Mafunzo haya yanahusu nini? {#what-is-this-tutorial-about}

Katika mafunzo haya utajifunza jinsi ya:

- kutumia uigaji unaobadilika
- kupima mwingiliano kati ya mikataba-erevu

Mawazo:

- tayari unajua jinsi ya kuandika mkataba-erevu rahisi katika `Solidity`
- unafahamu vizuri `JavaScript` na `TypeScript`
- umefanya mafunzo mengine ya `Waffle` au unajua kitu kimoja au viwili kuihusu

## Uigaji unaobadilika {#dynamic-mocking}

Kwa nini uigaji unaobadilika ni muhimu? Naam, inaturuhusu kuandika majaribio ya kitengo badala ya majaribio ya ujumuishaji. Hii inamaanisha nini? Inamaanisha kuwa hatuhitaji kuwa na wasiwasi kuhusu utegemezi wa mikataba-erevu, hivyo tunaweza kupima zote kwa kujitenga kabisa. Acha nikuonyeshe jinsi unavyoweza kufanya hivyo.

### **1. Mradi** {#1-project}

Kabla hatujaanza tunahitaji kuandaa mradi rahisi wa node.js:

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# au kama unatumia npm
npm init
```

Tuanze kwa kuongeza typescript na tegemezi za majaribio - mocha & chai:

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# au kama unatumia npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Sasa tuongeze `Waffle` na `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# au kama unatumia npm
npm install ethereum-waffle ethers --save-dev
```

Muundo wa mradi wako unapaswa kuonekana hivi sasa:

```
.
├── contracts
├── package.json
└── test
```

### **2. Mkataba-erevu** {#2-smart-contract}

Ili kuanza uigaji unaobadilika, tunahitaji mkataba-erevu wenye utegemezi. Usijali, nimekusaidia!

Huu hapa ni mkataba-erevu rahisi ulioandikwa kwa `Solidity` ambao lengo lake pekee ni kuangalia kama sisi ni matajiri. Inatumia tokeni ya ERC20 kuangalia kama tuna tokeni za kutosha. Weka katika `./contracts/AmIRichAlready.sol`.

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

Kwa vile tunataka kutumia uigaji unaobadilika hatuhitaji ERC20 nzima, ndiyo maana tunatumia kiolesura cha IERC20 chenye chaguo moja la kukokotoa.

Ni wakati wa kujenga mkataba huu! Kwa ajili hiyo tutatumia `Waffle`. Kwanza, tutaenda kuunda faili rahisi ya usanidi ya `waffle.json` inayobainisha chaguo za ujenzi.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Sasa tuko tayari kujenga mkataba kwa kutumia Waffle:

```bash
npx waffle
```

Rahisi, sivyo? Katika folda ya `build/` faili mbili zinazolingana na mkataba na kiolesura zimeonekana. Tutazitumia baadaye kwa ajili ya majaribio.

### **3. Kupima** {#3-testing}

Tuunde faili inayoitwa `AmIRichAlready.test.ts` kwa ajili ya majaribio halisi. Kwanza kabisa, tunapaswa kushughulikia uingizaji. Tutazihitaji baadaye:

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

Isipokuwa tegemezi za JS, tunahitaji kuingiza mkataba wetu uliojengwa na kiolesura:

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle hutumia `chai` kwa ajili ya majaribio. Hata hivyo, kabla hatujaweza kuitumia, tunapaswa kuingiza vilinganishi vya Waffle ndani ya chai yenyewe:

```typescript
use(solidity)
```

Tunahitaji kutekeleza chaguo la kukokotoa la `beforeEach()` litaloweka upya hali ya mkataba kabla ya kila jaribio. Tufikirie kwanza kile tunachohitaji hapo. Ili kupeleka mkataba tunahitaji vitu viwili: mkoba na mkataba wa ERC20 uliotumwa ili kuupitisha kama hoja kwa mkataba wa `AmIRichAlready`.

Kwanza tunatengeneza mkoba:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Kisha tunahitaji kupeleka mkataba wa ERC20. Hapa ndipo penye ugumu - tuna kiolesura pekee. Hapa ndipo Waffle inakuja kutuokoa. Waffle ina chaguo la kukokotoa la kimiujiza la `deployMockContract()` linalounda mkataba kwa kutumia _abi_ ya kiolesura pekee:

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Sasa tukiwa na mkoba na ERC20 iliyopelekwa, tunaweza kuendelea na kupeleka mkataba wa `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Kwa hayo yote, chaguo letu la kukokotoa la `beforeEach()` limekamilika. Hadi sasa faili lako la `AmIRichAlready.test.ts` linapaswa kuonekana hivi:

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

Tuandike jaribio la kwanza kwa mkataba wa `AmIRichAlready`. Unafikiri jaribio letu linapaswa kuwa kuhusu nini? Ndio, uko sahihi! Tunapaswa kuangalia ikiwa tayari sisi ni matajiri :)

Lakini subiri kidogo. Mkataba wetu ulioigwa utajuaje thamani zipi za kurudisha? Hatujatekeleza mantiki yoyote kwa chaguo la kukokotoa la `balanceOf()`. Tena, Waffle inaweza kusaidia hapa. Mkataba wetu ulioigwa una mambo mapya ya kuvutia sasa:

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Kwa ujuzi huu hatimaye tunaweza kuandika jaribio letu la kwanza:

```typescript
it("hurudisha uongo ikiwa mkoba una tokeni chini ya 1000000", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Tugawanye jaribio hili katika sehemu:

1. Tunaweka mkataba wetu wa kuiga wa ERC20 kurudisha salio la tokeni 999999 kila wakati.
2. Angalia kama njia ya `contract.check()` inarudisha `uongo`.

Tuko tayari kuanzisha mambo:

![Jaribio moja limefaulu](./test-one.png)

Kwa hiyo jaribio linafanya kazi, lakini... bado kuna nafasi ya kuboresha. Chaguo la kukokotoa la `balanceOf()` litarudisha 999999 kila wakati. Tunaweza kuiboresha kwa kubainisha mkoba ambayo chaguo la kukokotoa linapaswa kurudisha kitu - kama mkataba halisi:

```typescript
it("hurudisha uongo ikiwa mkoba una tokeni chini ya 1000001", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Hadi sasa, tumejaribu tu kisa ambapo hatuna utajiri wa kutosha. Badala yake, tupime kinyume chake:

```typescript
it("hurudisha kweli ikiwa mkoba una angalau tokeni 1000001", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Unaendesha majaribio...

![Majaribio mawili yamefaulu](test-two.png)

...na umefika! Mkataba wetu unaonekana kufanya kazi kama ilivyokusudiwa :)

## Kupima wito wa mkataba {#testing-contract-calls}

Tufanye muhtasari wa kile tumefanya hadi sasa. Tumepima utendaji wa mkataba wetu wa `AmIRichAlready` na unaonekana kufanya kazi ipasavyo. Hiyo inamaanisha tumemaliza, sivyo? Sio kabisa! Waffle inaturuhusu kupima mkataba wetu hata zaidi. Lakini vipi hasa? Naam, katika safu ya Waffle kuna vilinganishi vya `calledOnContract()` na `calledOnContractWith()`. Vitatruhusu kuangalia ikiwa mkataba wetu uliita mkataba wa kuiga wa ERC20. Hili hapa ni jaribio la msingi na kimoja cha vilinganishi hivi:

```typescript
it("huangalia ikiwa mkataba uliita balanceOf kwenye tokeni ya ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Tunaweza kwenda mbali zaidi na kuboresha jaribio hili kwa kilinganishi kingine nilichokuambia:

```typescript
it("huangalia ikiwa mkataba uliita balanceOf na mkoba fulani kwenye tokeni ya ERC20", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Hebu tuangalie kama majaribio ni sahihi:

![Majaribio matatu yamefaulu](test-three.png)

Safi sana, majaribio yote yamefaulu.

Kupima wito wa mkataba kwa Waffle ni rahisi sana. Na hapa ndipo sehemu bora zaidi. Vilinganishi hivi hufanya kazi na mikataba ya kawaida na iliyoigwa! Hii ni kwa sababu Waffle hurekodi na kuchuja wito za EVM badala ya kuingiza msimbo, kama ilivyo kwa maktaba maarufu za majaribio kwa teknolojia nyingine.

## Mstari wa Mwisho {#the-finish-line}

Hongera! Sasa unajua jinsi ya kutumia Waffle kupima wito wa mkataba na kuiga mikataba kwa ubadilikaji. Kuna vipengele vingi zaidi vya kuvutia vya kugundua. Ninapendekeza kuzama katika nyaraka za Waffle.

Nyaraka za Waffle zinapatikana [hapa](https://ethereum-waffle.readthedocs.io/).

Msimbo chanzo wa mafunzo haya unapatikana [hapa](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Mafunzo ambayo unaweza kupendezwa nayo pia:

- [Kupima mikataba-erevu na Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
