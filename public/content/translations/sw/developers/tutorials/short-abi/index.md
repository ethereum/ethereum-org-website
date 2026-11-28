---
title: "ABI Fupi kwa Uboreshaji wa Data za Mwito"
description: Kuboresha mikataba mahiri kwa ajili ya Mikusanyiko ya Optimistic
author: Ori Pomerantz
lang: sw
tags: ["tabaka la 2 (L2)"]
skill: intermediate
breadcrumb: ABI Fupi
published: 2022-04-01
---

## Utangulizi {#introduction}

Katika makala haya, unajifunza kuhusu [mikusanyiko ya optimistic](/developers/docs/scaling/optimistic-rollups), gharama ya miamala juu yake, na jinsi muundo huo tofauti wa gharama unavyotuhitaji kuboresha mambo tofauti kuliko kwenye Mtandao Mkuu wa Ethereum.
Pia unajifunza jinsi ya kutekeleza uboreshaji huu.

### Ufichuzi kamili {#full-disclosure}

Mimi ni mfanyakazi wa muda wote wa [Optimism](https://www.optimism.io/), kwa hivyo mifano katika makala haya itaendeshwa kwenye Optimism.
Hata hivyo, mbinu iliyoelezwa hapa inapaswa kufanya kazi vizuri kwa mikusanyiko mingine.

### Istilahi {#terminology}

Wakati wa kujadili mikusanyiko, neno 'tabaka la 1 (L1)' linatumika kwa Mtandao Mkuu, mtandao wa uzalishaji wa Ethereum.
Neno 'tabaka la 2 (L2)' linatumika kwa rollup au mfumo mwingine wowote unaotegemea L1 kwa usalama lakini hufanya uchakataji wake mwingi nje ya mnyororo.

## Tunawezaje kupunguza zaidi gharama ya miamala ya L2? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[Mikusanyiko ya optimistic](/developers/docs/scaling/optimistic-rollups) inapaswa kuhifadhi rekodi ya kila muamala wa kihistoria ili mtu yeyote aweze kuipitia na kuthibitisha kuwa hali ya sasa ni sahihi.
Wakati makala haya yalipoandikwa, njia ya bei nafuu zaidi ya kuingiza data kwenye Mtandao Mkuu wa Ethereum ilikuwa kuiandika kama data za mwito.
Suluhisho hili lilichaguliwa na [Optimism](https://docs.optimism.io/op-stack/protocol/overview) na [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction).
Tangu uboreshaji wa Dencun (Machi 2024), mikusanyiko inaweza kuchapisha data hii katika [mablobu](/roadmap/danksharding/) badala yake, ambayo ni ya bei nafuu zaidi.

### Gharama ya miamala ya L2 {#cost-of-l2-transactions}

Gharama ya miamala ya L2 inaundwa na vipengele viwili:

1. Uchakataji wa L2, ambao kwa kawaida ni wa bei nafuu sana
2. Uhifadhi wa L1, ambao unahusishwa na gharama za gesi za Mtandao Mkuu

Nilipoandika makala haya mnamo 2022, kwenye Optimism gharama ya gesi ya L2 ilikuwa 0.001 [Gwei](/developers/docs/gas/#what-is-gas).
Gharama ya gesi ya L1, kwa upande mwingine, ilikuwa takriban Gwei 40.

Baiti moja ya data za mwito inagharimu gesi 4 (ikiwa ni sifuri) au gesi 16 (ikiwa ni thamani nyingine yoyote).
Moja ya shughuli za gharama kubwa zaidi kwenye EVM ni kuandika kwenye hifadhi.
Gharama ya juu zaidi ya kuandika neno la baiti 32 kwenye hifadhi kwenye L2 ni gesi 22100. Wakati huo, hii ilikuwa Gwei 22.1.
Kwa hivyo ikiwa tungeweza kuokoa baiti moja ya sifuri ya data za mwito, tungeweza kuandika takriban baiti 200 kwenye hifadhi na bado tupate faida.

#### Jinsi gharama za L2 zilivyobadilika mnamo 2024 {#how-l2-costs-changed-in-2024}

Fomula ya [ada ya data ya L1](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) ya OP Stack imebadilika mara mbili tangu makala haya yaandikwe:

- Pamoja na [uboreshaji wa Ecotone](https://docs.optimism.io/op-stack/transactions/fees#ecotone) (Machi 2024), minyororo ya OP Stack ilianza kuchapisha data ya muamala kwenye mablobu, ambayo yanapangiwa bei na ada ya msingi ya blobu tofauti (na kwa kawaida ya chini sana).
- Pamoja na [uboreshaji wa Fjord](https://docs.optimism.io/op-stack/transactions/fees#fjord) (Julai 2024), ada ya data ya L1 inategemea makadirio ya ukubwa wa muamala baada ya mbano wa [FastLZ](https://github.com/ariya/FastLZ), na kiwango cha chini cha baiti 100 kwa kila muamala ([tazama vipimo](https://specs.optimism.io/protocol/fjord/exec-engine.html)).

Hii inabadilisha uchambuzi katika sehemu iliyosalia ya makala haya kwa njia tatu:

1. Baiti za sifuri hubanwa vizuri, kwa hivyo zinakaribia kuwa za bure.
   Takwimu za gesi 4 na 16 kwa kila baiti hapa chini ni gharama ya data za mwito za L1, sio kile unacholipa kwa data ya muamala kwenye mnyororo wa OP Stack leo.
2. Chini ya kiwango cha chini cha baiti 100, data za mwito fupi haziokoi chochote.
   Kwa mfano, mnamo Oktoba 2026 kwenye Mtandao Mkuu wa OP `transfer` ya kawaida ya ERC-20 (baiti 68 za data za mwito) na toleo fupi la baiti 23 katika makala haya zingelipa ada sawa kabisa ya data ya L1, kiwango cha chini, takriban Gwei 1 (10<sup>-9</sup> ETH).
3. Kwa sababu nafasi ya blobu ni ya bei nafuu, ada ya utekelezaji ya L2 sasa mara nyingi ni kubwa kuliko ada ya data ya L1.
   Kwa bei ya gesi ya L2 ya Gwei 0.001, gesi 1000 inagharimu Gwei 1, sawa na ada hiyo yote ya data ya L1, kwa hivyo gesi ya ziada ya utekelezaji ya kupitia mkataba wa uwakilishi inaweza kugharimu zaidi ya baiti inazookoa.

Kanuni bado inashikilia: baiti chache zilizobanwa zinamaanisha ada ya chini ya data ya L1.
ABI fupi zina maana zaidi kwa miamala yenye data nyingi ambayo haibanwi vizuri, na kwenye minyororo au nyakati ambapo data ya L1 ni ya gharama kubwa.
Ili kuona kile ambacho muamala mahususi ungelipa, ita `getL1Fee` kwenye [usambazaji wa awali wa `GasPriceOracle`](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle) na muamala ambao haujatiwa saini.
Kwa mfano, ukitumia `cast` ya [Foundry](https://getfoundry.sh/introduction/installation/):

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

Matokeo ni katika Wei.

### ABI {#the-abi}

Idadi kubwa ya miamala hufikia mkataba kutoka kwa akaunti inayomilikiwa nje.
Mikataba mingi imeandikwa katika Solidity na kutafsiri uga wao wa data kulingana na [kiolesura cha jozi cha programu (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Hata hivyo, ABI iliundwa kwa ajili ya L1, ambapo baiti moja ya data za mwito inagharimu takriban sawa na shughuli nne za hesabu, sio L2 ambapo (kwa bei za 2022) baiti moja ya data za mwito inagharimu zaidi ya shughuli elfu moja za hesabu.
Data za mwito zimegawanywa hivi:

| Sehemu | Urefu | Baiti | Baiti zilizopotea | Gesi iliyopotea | Baiti muhimu | Gesi muhimu |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Kichaguzi cha utendakazi | 4 | 0-3 | 3 | 48 | 1 | 16 |
| Sifuri | 12 | 4-15 | 12 | 48 | 0 | 0 |
| Anwani ya marudio | 20 | 16-35 | 0 | 0 | 20 | 320 |
| Kiasi | 32 | 36-67 | 17 | 68 | 15 | 240 |
| Jumla | 68 | | | 164 | | 576 |

Maelezo:

- **Kichaguzi cha utendakazi**: Mkataba una chini ya utendakazi 256, kwa hivyo tunaweza kuzitofautisha kwa baiti moja.
  Baiti hizi kwa kawaida si sifuri na kwa hivyo [zinagharimu gesi kumi na sita](https://eips.ethereum.org/EIPS/eip-2028).
- **Sifuri**: Baiti hizi daima ni sifuri kwa sababu anwani ya baiti ishirini haihitaji neno la baiti thelathini na mbili kuishikilia.
  Baiti zinazoshikilia sifuri zinagharimu gesi nne ([tazama waraka wa manjano](https://ethereum.github.io/yellowpaper/paper.pdf), Kiambatisho G,
  uk. 27, thamani ya `G`<sub>`txdatazero`</sub>).
- **Kiasi**: Ikiwa tutachukulia kuwa katika mkataba huu `decimals` ni kumi na nane (thamani ya kawaida) na kiasi cha juu zaidi cha tokeni tunachohamisha kitakuwa 10<sup>18</sup>, tunapata kiasi cha juu zaidi cha 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, kwa hivyo baiti kumi na tano zinatosha.

Upotevu wa gesi 164 kwenye L1 kwa kawaida hauzingatiwi. Muamala unagharimu angalau [gesi 21,000](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), kwa hivyo 0.8% ya ziada haijalishi.
Hata hivyo, kwenye L2 mnamo 2022, mambo yalikuwa tofauti. Takriban gharama nzima ya muamala ilikuwa kuiandika kwenye L1.
Mbali na data za mwito za muamala, kuna baiti 109 za kichwa cha muamala (anwani ya marudio, sahihi, n.k.).
Kwa hivyo gharama ya jumla ni `109*16+576+164=2484`, na tunapoteza takriban 6.6% ya hiyo.

## Kupunguza gharama wakati hudhibiti marudio {#reducing-costs-when-you-dont-control-the-destination}

Tukichukulia kuwa huna udhibiti wa mkataba wa marudio, bado unaweza kutumia suluhisho sawa na [hili](https://github.com/qbzzt/ethereum.org-20220330-shortABI).

Ili kuiendesha, unahitaji [Node.js](https://nodejs.org/) na git:

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

Jaribio husambaza mikataba kwenye mtandao wa ndani uliojengewa ndani wa Hardhat, kwa hivyo huhitaji ETH yoyote.
Hifadhi inatumia Hardhat 2.9, kwa hivyo kwenye matoleo ya sasa ya Node.js inaonya kuwa toleo lako la Node.js halitumiki, lakini jaribio bado linafaulu.

Hebu tupitie faili husika.

### Token.sol {#token-sol}

[Huu ni mkataba wa marudio](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Ni mkataba wa kawaida wa ERC-20, wenye kipengele kimoja cha ziada.
Utendakazi huu wa `faucet` unamruhusu mtumiaji yeyote kupata tokeni ya kutumia.
Ingefanya mkataba wa uzalishaji wa ERC-20 usiwe na maana, lakini inafanya maisha kuwa rahisi wakati ERC-20 ipo tu kuwezesha majaribio.

```solidity
    /**
     * @dev Inampa mpigaji tokeni 1000 za kucheza nazo
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Huu ni mkataba ambao miamala inapaswa kuita kwa data za mwito fupi zaidi](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Hebu tuupitie mstari kwa mstari.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Tunahitaji utendakazi wa tokeni ili kujua jinsi ya kuiita.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Anwani ya tokeni ambayo sisi ni mkataba wa uwakilishi wake.

```solidity

    /**
     * @dev Bainisha anwani ya tokeni
     * @param tokenAddr_ anwani ya mkataba wa ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // konstrukta
```

Anwani ya tokeni ndicho kigezo pekee tunachohitaji kubainisha.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Soma thamani kutoka kwa data za mwito.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Tutapakia neno moja la baiti 32 (biti 256) kwenye kumbukumbu na kuondoa baiti ambazo si sehemu ya uga tunaotaka.
Aligoriti hii haifanyi kazi kwa thamani ndefu zaidi ya baiti 32, na bila shaka hatuwezi kusoma kupita mwisho wa data za mwito.
Kwenye L1 inaweza kuwa muhimu kuruka majaribio haya ili kuokoa gesi, lakini kwenye L2 gesi ni ya bei nafuu sana, ambayo inawezesha ukaguzi wowote wa usahihi tunaoweza kufikiria.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Tungeweza kunakili data kutoka kwa mwito hadi `fallback()` (tazama hapa chini), lakini ni rahisi kutumia [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), lugha ya assembli ya EVM.

Hapa tunatumia [msimbo wa operesheni wa CALLDATALOAD](https://www.evm.codes/#35) kusoma baiti `startByte` hadi `startByte+31` kwenye staki.
Kwa ujumla, sintaksia ya msimbo wa operesheni katika Yul ni `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Baiti `length` muhimu zaidi pekee ndizo sehemu ya uga, kwa hivyo [tunahamisha kulia](https://en.wikipedia.org/wiki/Logical_shift) ili kuondoa thamani zingine.
Hii ina faida ya ziada ya kusogeza thamani upande wa kulia wa uga, kwa hivyo ni thamani yenyewe badala ya thamani mara 256<sup>kitu</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Wakati mwito kwa mkataba wa Solidity haulingani na sahihi yoyote ya utendakazi, inaita [utendakazi wa `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (kwa kudhani kuna moja).
Katika kesi ya `CalldataInterpreter`, mwito _wowote_ unafika hapa kwa sababu hakuna utendakazi zingine za `external` au `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Soma baiti ya kwanza ya data za mwito, ambayo inatuambia utendakazi.
Kuna sababu mbili kwa nini utendakazi haungepatikana hapa:

1. Utendakazi ambazo ni `pure` au `view` hazibadilishi hali na hazigharimu gesi (zinapoitwa nje ya mnyororo).
   Haina maana kujaribu kupunguza gharama zao za gesi.
2. Utendakazi zinazotegemea [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Thamani ya `msg.sender` itakuwa anwani ya `CalldataInterpreter`, sio mpigaji.

Kwa bahati mbaya, [kwa kuangalia vipimo vya ERC-20](https://eips.ethereum.org/EIPS/eip-20), hii inaacha utendakazi mmoja tu wa kawaida, `transfer` (kwa sababu tunaweza kuita `transferFrom`).
Tokeni yetu ya majaribio pia ina `faucet`, ambayo tunaweza kuisaidia kwa sababu tunaweza kuhamisha tokeni kurudi kwa yeyote aliyetuita.

```solidity

        // Ita mbinu za kubadilisha hali za tokeni kwa kutumia
        // taarifa kutoka kwenye data za mwito

        // bomba
        if (_func == 1) {
```

Mwito kwa `faucet()`, ambayo haina vigezo.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Baada ya kuita `token.faucet()` tunapata tokeni. Hata hivyo, kama mkataba wa uwakilishi, **hatuhitaji** tokeni.
Akaunti inayomilikiwa nje (EOA) au mkataba uliotuita unazihitaji.
Kwa hivyo tunahamisha tokeni zetu zote kwa yeyote aliyetuita.

```solidity
        // hamisho (chukulia tuna kibali chake)
        if (_func == 2) {
```

Kuhamisha tokeni kunahitaji vigezo viwili: anwani ya marudio na kiasi.

```solidity
            token.transferFrom(
                msg.sender,
```

Tunaruhusu tu wapigaji kuhamisha tokeni wanazomiliki

```solidity
                address(uint160(calldataVal(1, 20))),
```

Anwani ya marudio huanza kwenye baiti #1 (baiti #0 ni utendakazi).
Kama anwani, ina urefu wa baiti 20.

```solidity
                calldataVal(21, 2)
```

Kwa mkataba huu mahususi tunachukulia kuwa idadi ya juu zaidi ya tokeni ambayo mtu yeyote angetaka kuhamisha inatoshea katika baiti mbili (chini ya 65536).

```solidity
            );
        }
```

Kwa ujumla, hamisho huchukua baiti 23 za data za mwito:

| Sehemu | Urefu | Baiti |
| ------------------- | -----: | ----: |
| Kichaguzi cha utendakazi | 1 | 0 |
| Anwani ya marudio | 20 | 1-20 |
| Kiasi | 2 | 21-22 |

```solidity
    }   // rejeo

}       // mkataba CalldataInterpreter
```

### test.js {#test-js}

[Jaribio hili la kitengo cha JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) linatuonyesha jinsi ya kutumia utaratibu huu (na jinsi ya kuthibitisha inafanya kazi kwa usahihi).
Nitachukulia kuwa unaelewa [chai](https://www.chaijs.com/) na [ethers](https://docs.ethers.org/v5/) na kuelezea tu sehemu zinazotumika haswa kwa mkataba.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

Tunaanza kwa kusambaza mikataba yote miwili.

```javascript
    // Pata tokeni za kucheza nazo
    const faucetTx = {
```

Hatuwezi kutumia utendakazi wa kiwango cha juu ambao kwa kawaida tungetumia (kama vile `token.faucet()`) kuunda miamala, kwa sababu hatufuati ABI.
Badala yake, inabidi tujenge muamala wenyewe na kisha kuutuma.

```javascript
      to: cdi.address,
      data: "0x01"
```

Kuna vigezo viwili tunavyohitaji kutoa kwa ajili ya muamala:

1. `to`, anwani ya marudio.
   Huu ni mkataba wa mkalimani wa data za mwito.
2. `data`, data za mwito za kutuma.
   Katika kesi ya mwito wa bomba, data ni baiti moja, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Tunaita [mbinu ya `sendTransaction` ya mtia saini](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction) kwa sababu tayari tumebainisha marudio (`faucetTx.to`) na tunahitaji muamala utiwe saini.

```javascript
// Kagua kama faucet inatoa tokeni kwa usahihi
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Hapa tunathibitisha salio.
Hakuna haja ya kuokoa gesi kwenye utendakazi wa `view`, kwa hivyo tunaziendesha kawaida.

```javascript
// Ipe CDI kibali (idhinisho haziwezi kuwakilishwa)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Mpe mkalimani wa data za mwito kibali ili aweze kufanya uhamisho.

```javascript
// Hamisha tokeni
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Unda muamala wa hamisho. Baiti ya kwanza ni "0x02", ikifuatiwa na anwani ya marudio, na hatimaye kiasi (0x0100, ambayo ni 256 katika desimali).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Kagua kwamba tuna tokeni 256 pungufu
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // Na kwamba kituo chetu kimezipata
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Kupunguza gharama unapodhibiti mkataba wa marudio {#reducing-the-cost-when-you-do-control-the-destination-contract}

Ikiwa una udhibiti wa mkataba wa marudio unaweza kuunda utendakazi zinazoruka ukaguzi wa `msg.sender` kwa sababu zinaamini mkalimani wa data za mwito.
[Unaweza kuona mfano wa jinsi hii inavyofanya kazi hapa, katika tawi la `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).
Ili kuiendesha, badilisha hadi tawi hilo katika hifadhi uliyounda nakala yake hapo awali na uendeshe jaribio tena:

```sh
git checkout control-contract
npx hardhat test
```

Ikiwa mkataba ungekuwa unajibu tu miamala ya nje, tungeweza kufanikiwa kwa kuwa na mkataba mmoja tu.
Hata hivyo, hiyo ingevunja [utangamano](/developers/docs/smart-contracts/composability/).
Ni bora zaidi kuwa na mkataba unaojibu miito ya kawaida ya ERC-20, na mkataba mwingine unaojibu miamala yenye data za mwito fupi.

### Token.sol {#token-sol-2}

Katika mfano huu tunaweza kurekebisha `Token.sol`.
Hii inaturuhusu kuwa na idadi ya utendakazi ambazo mkataba wa uwakilishi pekee unaweza kuita.
Hizi hapa ni sehemu mpya:

```solidity
    // Anwani pekee inayoruhusiwa kubainisha anwani ya CalldataInterpreter
    address owner;

    // Anwani ya CalldataInterpreter
    address proxy = address(0);
```

Mkataba wa ERC-20 unahitaji kujua utambulisho wa mkataba wa uwakilishi ulioidhinishwa.
Hata hivyo, hatuwezi kuweka kigezo hiki katika konstrukta, kwa sababu bado hatujui thamani.
Mkataba huu unaundwa kwanza kwa sababu mkataba wa uwakilishi unatarajia anwani ya tokeni katika konstrukta yake.

```solidity
    /**
     * @dev Inapiga mwito kwa konstrukta ya ERC-20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Anwani ya muundaji (inayoitwa `owner`) imehifadhiwa hapa kwa sababu hiyo ndiyo anwani pekee inayoruhusiwa kuweka mkataba wa uwakilishi.

```solidity
    /**
     * @dev weka anwani kwa ajili ya proksi (CalldataInterpreter).
     * Inaweza tu kupigiwa mwito mara moja na mmiliki
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Mkataba wa uwakilishi una ufikiaji wa upendeleo, kwa sababu unaweza kuruka ukaguzi wa usalama.
Ili kuhakikisha tunaweza kuamini mkataba wa uwakilishi tunaruhusu tu `owner` kuita utendakazi huu, na mara moja tu.
Mara tu `proxy` inapokuwa na thamani halisi (sio sifuri), thamani hiyo haiwezi kubadilika, kwa hivyo hata kama mmiliki ataamua kuwa mhalifu, au neno la siri lake likifichuliwa, bado tuko salama.

```solidity
    /**
     * @dev Baadhi ya kazi zinaweza tu kupigiwa mwito na proksi.
     */
    modifier onlyProxy {
```

Huu ni [utendakazi wa `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), unarekebisha jinsi utendakazi mwingine unavyofanya kazi.

```solidity
      require(msg.sender == proxy);
```

Kwanza, thibitisha kuwa tuliitwa na mkataba wa uwakilishi na si mtu mwingine.
Ikiwa sivyo, `revert`.

```solidity
      _;
    }
```

Ikiwa ndivyo, endesha utendakazi ambao tunarekebisha.

```solidity
   /* Kazi zinazoruhusu proksi kuwakilisha akaunti haswa */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

Hizi ni shughuli tatu ambazo kwa kawaida zinahitaji ujumbe utoke moja kwa moja kwa chombo kinachohamisha tokeni au kuidhinisha kibali.
Hapa tuna toleo la uwakilishi la shughuli hizi ambalo:

1. Limerekebishwa na `onlyProxy()` ili hakuna mtu mwingine anayeruhusiwa kuzidhibiti.
2. Linapata anwani ambayo kwa kawaida ingekuwa `msg.sender` kama kigezo cha ziada.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Mkalimani wa data za mwito anafanana karibu kabisa na yule wa hapo juu, isipokuwa kwamba utendakazi uliowakilishwa hupokea kigezo cha `msg.sender` na hakuna haja ya kibali kwa `transfer`.

```solidity
        // hamisho (hakuna haja ya kibali)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

Kuna mabadiliko machache kati ya msimbo wa majaribio uliopita na huu.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Tunahitaji kuuambia mkataba wa ERC-20 ni mkataba upi wa uwakilishi wa kuamini

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Inahitaji watia saini wawili ili kuthibitisha vibali
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Ili kuangalia `approve()` na `transferFrom()` tunahitaji mtia saini wa pili.
Tunaiita `poorSigner` kwa sababu haipati tokeni zetu zozote (inahitaji kuwa na ETH, bila shaka).

```js
// Hamisha tokeni
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Kwa sababu mkataba wa ERC-20 unaamini mkataba wa uwakilishi (`cdi`), hatuhitaji kibali ili kupeleka uhamisho.

```js
// approve na transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Kagua mchanganyiko wa approve / transferFrom ulifanywa kwa usahihi
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Jaribu utendakazi mbili mpya.
Kumbuka kwamba `transferFromTx` inahitaji vigezo viwili vya anwani: mtoaji wa kibali na mpokeaji.

## Hitimisho {#conclusion}

[Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord) na [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) zote sasa zinabana data zinazoandika kwenye L1, na kutoza kila muamala kulingana na ukubwa wake uliobanwa, ili kupunguza gharama ya miamala.
Hata hivyo, kama watoa huduma wa miundombinu wanaotafuta suluhu za jumla, uwezo wetu ni mdogo.
Kama msanidi wa dapp, una ujuzi mahususi wa programu, ambao unakuruhusu kuboresha data za mwito zako vizuri zaidi kuliko tunavyoweza katika suluhisho la jumla.
Tunatumai, makala haya yatakusaidia kupata suluhisho bora kwa mahitaji yako.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).

