---
title: Kujaribu mkataba-erevu rahisi kwa kutumia maktaba ya Waffle
description: Mafunzo kwa wanaoanza
author: Ewa Kowalska
tags: [ "mikataba erevu", "uimara", "Waffle", "majaribio" ]
skill: beginner
lang: sw
published: 2021-02-26
---

## Katika mafunzo haya utajifunza jinsi ya {#in-this-tutorial-youll-learn-how-to}

- Jaribu mabadiliko ya salio la mkoba
- Jaribu utoaji wa matukio na hoja maalum
- Thibitisha kuwa muamala ulirejeshwa

## Dhana {#assumptions}

- Unaweza kuunda mradi mpya wa JavaScript au TypeScript
- Una uzoefu wa kimsingi na majaribio katika JavaScript
- Umetumia wasimamizi wengine wa vifurushi kama vile yarn au npm
- Una ufahamu wa kimsingi sana wa mikataba-erevu na Solidity

## Kuanza {#getting-started}

Mafunzo haya yanaonyesha usanidi na uendeshaji wa jaribio kwa kutumia yarn, lakini hakuna shida ikiwa unapendelea npm - nitatoa marejeleo sahihi kwa [nyaraka](https://ethereum-waffle.readthedocs.io/en/latest/index.html) rasmi za Waffle.

## Sakinisha Vitegemezi {#install-dependencies}

[Ongeza](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) vitegemezi vya ethereum-waffle na typescript kwenye vitegemezi vya dev vya mradi wako.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Mfano wa mkataba-erevu {#example-smart-contract}

Wakati wa mafunzo haya tutafanyia kazi mfano rahisi wa mkataba-erevu - EtherSplitter. Haufanyi mengi isipokuwa kuruhusu mtu yeyote kutuma wei fulani na kuigawanya sawasawa kati ya wapokeaji wawili waliobainishwa awali.
Kitendaji cha kugawanya kinahitaji namba ya wei iwe shufwa, vinginevyo kitarejeshwa. Kwa wapokeaji wote wawili hufanya uhamisho wa wei ikifuatiwa na utoaji wa tukio la Uhamisho.

Weka kipande cha msimbo wa EtherSplitter katika `src/EtherSplitter.sol`.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Kiasi cha wei kisicho shufwa hakiruhusiwi');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Kusanya mkataba {#compile-the-contract}

Ili [kukusanya](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) mkataba ongeza ingizo lifuatalo kwenye faili la package.json:

```json
"scripts": {
    "build": "waffle"
  }
```

Ifuatayo, unda faili la usanidi la Waffle katika saraka kuu ya mradi - `waffle.json` - na kisha ubandike usanidi ufuatao hapo:

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Endesha `yarn build`. Kama matokeo, saraka ya `build` itaonekana na mkataba wa EtherSplitter uliokusanywa katika muundo wa JSON.

## Usanidi wa Jaribio {#test-setup}

Kujaribu na Waffle kunahitaji kutumia vilinganishi vya Chai na Mocha, kwa hivyo unahitaji [kuwaongeza](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) kwenye mradi wako. Sasisha faili yako ya package.json na ongeza ingizo la `test` katika sehemu ya scripts:

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Ikiwa unataka [kutekeleza](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) majaribio yako, endesha tu `yarn test` .

## Kujaribu {#testing}

Sasa unda saraka ya `test` na unda faili mpya `test\EtherSplitter.test.ts`.
Nakili kipande kilicho hapa chini na ukibandike kwenye faili letu la majaribio.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Kigawanyaji cha Ether", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // ongeza majaribio hapa
})
```

Maneno machache kabla ya kuanza.
`MockProvider` huja na toleo la mfano la mnyororo wa bloku. Pia hutoa mikoba ya mfano ambayo itatusaidia kwa kujaribu mkataba wa EtherSplitter. Tunaweza kupata hadi mikoba kumi kwa kuita mbinu ya `getWallets()` kwenye mtoa huduma. Katika mfano, tunapata mikoba mitatu - kwa mtumaji na kwa wapokeaji wawili.

Ifuatayo, tunatangaza kigezo kinachoitwa 'splitter' - huu ni mkataba wetu wa mfano wa EtherSplitter. Inaundwa kabla ya kila utekelezaji wa jaribio moja kwa mbinu ya `deployContract`. Mbinu hii inaiga upelekaji wa mkataba kutoka kwenye mkoba uliopitishwa kama kigezo cha kwanza (mkoba wa mtumaji katika kesi yetu). Kigezo cha pili ni ABI na bytecode ya mkataba unaojaribiwa - tunapitisha hapo faili la json la mkataba wa EtherSplitter uliokusanywa kutoka kwenye saraka ya `build`. Kigezo cha tatu ni safu yenye hoja za kiunda mkataba, ambazo katika kesi yetu, ni anwani mbili za wapokeaji.

## changeBalances {#changebalances}

Kwanza, tutaangalia ikiwa mbinu ya kugawanya inabadilisha salio kweli la mikoba ya wapokeaji. Ikiwa tutagawanya wei 50 kutoka kwa akaunti ya mtumaji, tutarajia salio la wapokeaji wote wawili kuongezeka kwa wei 25. Tutatumia kilinganishi cha `changeBalances` cha Waffle:

```ts
it("Hubadilisha salio la akaunti", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Kama kigezo cha kwanza cha kilinganishi, tunapitisha safu ya mikoba ya wapokeaji, na kama ya pili - safu ya ongezeko linalotarajiwa kwenye akaunti husika.
Ikiwa tungetaka kuangalia salio la mkoba mmoja maalum, tungeweza pia kutumia kilinganishi cha `changeBalance`, ambacho hakihitaji kupitisha safu, kama katika mfano hapa chini:

```ts
it("Hubadilisha salio la akaunti", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Kumbuka kuwa katika visa vyote viwili vya `changeBalance` na `changeBalances` tunapitisha kitendaji cha kugawanya kama simurejeshi kwa sababu kilinganishi kinahitaji kufikia hali ya salio kabla na baada ya wito.

Ifuatayo, tutajaribu ikiwa tukio la Uhamisho lilitolewa baada ya kila uhamisho wa wei. Tutaelekea kwenye kilinganishi kingine kutoka Waffle:

## Emit {#emit}

```ts
it("Hutoa tukio kwenye uhamisho kwa mpokeaji wa kwanza", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Hutoa tukio kwenye uhamisho kwa mpokeaji wa pili", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

Kilinganishi cha `emit` kinaturuhusu kuangalia ikiwa mkataba ulitoa tukio wakati wa kuita mbinu. Kama vigezo vya kilinganishi cha `emit`, tunatoa mkataba wa mfano ambao tunatabiri utatoa tukio, pamoja na jina la tukio hilo. Katika kesi yetu, mkataba wa mfano ni `splitter` na jina la tukio - `Transfer`. Tunaweza pia kuthibitisha thamani kamili za hoja ambazo tukio lilitolewa nazo - tunapitisha hoja nyingi kwenye kilinganishi cha `withArgs`, kama tamko letu la tukio linavyotarajia. Katika kesi ya mkataba wa EtherSplitter, tunapitisha anwani za mtumaji na mpokeaji pamoja na kiasi cha wei kilichohamishwa.

## revertedWith {#revertedwith}

Kama mfano wa mwisho, tutaangalia ikiwa muamala ulirejeshwa ikiwa nambari ya wei si shufwa. Tutatumia kilinganishi cha `revertedWith`:

```ts
it("Hurejesha kiasi cha Wei kikiwa si shufwa", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Kiasi cha wei kisicho shufwa hakiruhusiwi"
  )
})
```

Jaribio, likifaulu, litatuhakikishia kwamba muamala ulirejeshwa kweli. Hata hivyo, lazima pia kuwe na mlingano kamili kati ya ujumbe tuliouweka katika taarifa ya `require` na ujumbe tunaotarajia katika `revertedWith`. Tukirudi kwenye msimbo wa mkataba wa EtherSplitter, katika taarifa ya `require` kwa kiasi cha wei, tunatoa ujumbe: 'Kiasi cha wei kisicho shufwa hakiruhusiwi'. Huu unalingana na ujumbe tunaotarajia katika jaribio letu. Kama hazingekuwa sawa, jaribio lingefeli.

## Hongera! {#congratulations}

Umechukua hatua yako kubwa ya kwanza kuelekea kujaribu mikataba-erevu na Waffle!
