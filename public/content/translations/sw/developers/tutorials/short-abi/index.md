---
title: "ABI Fupi za Uboreshaji wa Calldata"
description: Kuboresha mikataba-erevu kwa ajili ya Optimistic Rollups
author: Ori Pomerantz
lang: sw
tags: [ "safu ya 2" ]
skill: intermediate
published: 2022-04-01
---

## Utangulizi {#introduction}

Katika makala haya, utajifunza kuhusu [optimistic rollups](/developers/docs/scaling/optimistic-rollups), gharama za miamala juu yao, na jinsi muundo huo tofauti wa gharama unavyotulazimu kuboresha mambo tofauti kuliko kwenye Mtandao Mkuu wa Ethereum.
Pia utajifunza jinsi ya kutekeleza uboreshaji huu.

### Ufichuzi kamili {#full-disclosure}

Mimi ni mfanyakazi wa muda wote wa [Optimism](https://www.optimism.io/), kwa hivyo mifano katika makala haya itaendeshwa kwenye Optimism.
Hata hivyo, mbinu iliyoelezwa hapa inapaswa kufanya kazi vizuri vile vile kwa rollups zingine.

### Istilahi {#terminology}

Wakati wa kujadili rollups, neno 'safu ya 1' (L1) hutumika kwa Mtandao Mkuu, mtandao wa uzalishaji wa Ethereum.
Neno 'safu ya 2' (L2) hutumika kwa rollup au mfumo mwingine wowote unaotegemea L1 kwa usalama lakini hufanya usindikaji wake mwingi nje ya chain.

## Je, tunawezaje kupunguza zaidi gharama ya miamala ya L2? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[Optimistic rollups](/developers/docs/scaling/optimistic-rollups) zinapaswa kuhifadhi rekodi ya kila muamala wa kihistoria ili mtu yeyote aweze kuzipitia na kuthibitisha kwamba hali ya sasa ni sahihi.
Njia ya bei nafuu zaidi ya kuingiza data kwenye Mtandao Mkuu wa Ethereum ni kuiandika kama calldata.
Suluhisho hili lilichaguliwa na [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) na [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Gharama ya miamala ya L2 {#cost-of-l2-transactions}

Gharama ya miamala ya L2 inaundwa na vijenzi viwili:

1. Usindikaji wa L2, ambao kwa kawaida ni wa bei nafuu sana
2. Ghala la L1, ambalo limeunganishwa na gharama za gesi za Mtandao Mkuu

Ninapoandika haya, kwenye Optimism gharama ya gesi ya L2 ni 0.001 [Gwei](/developers/docs/gas/#pre-london).
Gharama ya gesi ya L1, kwa upande mwingine, ni takriban gwei 40.
[Unaweza kuona bei za sasa hapa](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Baiti moja ya calldata hugharimu gesi 4 (ikiwa ni sifuri) au gesi 16 (ikiwa ni thamani nyingine yoyote).
Moja ya operesheni za gharama kubwa zaidi kwenye EVM ni kuandika kwenye ghala.
Gharama ya juu ya kuandika neno la baiti 32 kwenye ghala kwenye L2 ni gesi 22100. Kwa sasa, hii ni gwei 22.1.
Kwa hivyo ikiwa tunaweza kuokoa baiti moja ya sifuri ya calldata, tutaweza kuandika takriban baiti 200 kwenye ghala na bado tuwe na faida.

### ABI {#the-abi}

Idadi kubwa ya miamala hufikia mkataba kutoka kwa akaunti inayomilikiwa na mtu wa nje.
Mikataba mingi imeandikwa katika Solidity na kutafsiri uga wao wa data kulingana na [kiolesura cha binary cha programu (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Hata hivyo, ABI ilitengenezwa kwa ajili ya L1, ambapo baiti ya calldata hugharimu takriban sawa na operesheni nne za hesabu, sio L2 ambapo baiti ya calldata hugharimu zaidi ya operesheni elfu moja za hesabu.
Calldata imegawanywa kama ifuatavyo:

| Sehemu                          | Urefu | Baiti | Baiti zilizopotea | Gesi iliyopotea | Baiti zinazohitajika | Gesi inayohitajika |
| ------------------------------- | ----: | ----: | ----------------: | --------------: | -------------------: | -----------------: |
| Kiteuzi cha chaguo za kukokotoa |     4 |   0-3 |                 3 |              48 |                    1 |                 16 |
| Sifuri                          |    12 |  4-15 |                12 |              48 |                    0 |                  0 |
| Anwani ya mwisho                |    20 | 16-35 |                 0 |               0 |                   20 |                320 |
| Kiasi                           |    32 | 36-67 |                17 |              64 |                   15 |                240 |
| Jumla                           |    68 |       |                   |             160 |                      |                576 |

Maelezo:

- **Kiteuzi cha chaguo za kukokotoa**: Mkataba una chaguo za kukokotoa chini ya 256, kwa hivyo tunaweza kuzitofautisha kwa baiti moja.
  Kwa kawaida baiti hizi si sifuri na kwa hivyo [hugharimu gesi kumi na sita](https://eips.ethereum.org/EIPS/eip-2028).
- **Sifuri**: Baiti hizi daima ni sifuri kwa sababu anwani ya baiti ishirini haihitaji neno la baiti thelathini na mbili ili kuihifadhi.
  Baiti zinazoshikilia sifuri hugharimu gesi nne ([angalia karatasi ya njano](https://ethereum.github.io/yellowpaper/paper.pdf), Nyongeza G,
  k. 27, thamani ya `G`<sub>`txdatazero`</sub>).
- **Kiasi**: Tukichukulia kuwa katika mkataba huu `decimals` ni kumi na nane (thamani ya kawaida) na kiasi cha juu cha tokeni tunachohamisha kitakuwa 10<sup>18</sup>, tunapata kiasi cha juu cha 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, kwa hivyo baiti kumi na tano zinatosha.

Upotevu wa gesi 160 kwenye L1 kwa kawaida hauzingatiwi. Muamala hugharimu angalau [gesi 21,000](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), kwa hivyo 0.8% ya ziada haijalishi.
Hata hivyo, kwenye L2, mambo ni tofauti. Karibu gharama nzima ya muamala ni kuiandika kwa L1.
Mbali na calldata ya muamala, kuna baiti 109 za kichwa cha muamala (anwani ya mwisho, saini, n.k.).
Gharama ya jumla kwa hivyo ni `109*16+576+160=2480`, na tunapoteza takriban 6.5% ya hiyo.

## Kupunguza gharama wakati haudhibiti mwishilio {#reducing-costs-when-you-dont-control-the-destination}

Tukichukulia kuwa huna udhibiti juu ya mkataba wa mwishilio, bado unaweza kutumia suluhisho sawa na [hili](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Wacha tupitie faili zinazohusika.

### Token.sol {#token-sol}

[Huu ni mkataba wa mwishilio](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Ni mkataba wa kawaida wa ERC-20, wenye kipengele kimoja cha ziada.
Kitendo hiki cha `faucet` humruhusu mtumiaji yeyote kupata tokeni fulani ya kutumia.
Ingefanya mkataba wa uzalishaji wa ERC-20 usiwe na maana, lakini hurahisisha maisha wakati ERC-20 ipo tu kuwezesha majaribio.

```solidity
    /**
     * @dev Gives the caller 1000 tokens to play with
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Huu ni mkataba ambao miamala inapaswa kuita na calldata fupi](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Wacha tuipitie mstari kwa mstari.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Tunahitaji chaguo za kukokotoa za tokeni ili kujua jinsi ya kuiita.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

Anwani ya tokeni ambayo sisi ni proksi.

```solidity

    /**
     * @dev Specify the token address
     * @param tokenAddr_ The ERC-20 contract address
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

Anwani ya tokeni ndiyo kigezo pekee tunachohitaji kubainisha.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Soma thamani kutoka kwa calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Tutaipakia neno moja la baiti 32 (biti 256) kwenye kumbukumbu na kuondoa baiti ambazo si sehemu ya uga tunaotaka.
Algorithm hii haifanyi kazi kwa thamani ndefu kuliko baiti 32, na bila shaka hatuwezi kusoma zaidi ya mwisho wa calldata.
Kwenye L1 inaweza kuwa muhimu kuruka majaribio haya ili kuokoa gesi, lakini kwenye L2 gesi ni nafuu sana, ambayo huwezesha ukaguzi wowote wa kiakili tunaoweza kufikiria.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Tungeweza kunakili data kutoka kwa simu hadi `fallback()` (tazama hapa chini), lakini ni rahisi zaidi kutumia [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), lugha ya mkusanyiko ya EVM.

Hapa tunatumia [opcode ya CALLDATALOAD](https://www.evm.codes/#35) kusoma baiti `startByte` hadi `startByte+31` kwenye rundo.
Kwa ujumla, sintaksia ya opcode katika Yul ni `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Ni baiti za `urefu` muhimu pekee ndizo sehemu ya uga, kwa hivyo [tunahamisha kulia](https://en.wikipedia.org/wiki/Logical_shift) ili kuondoa thamani zingine.
Hii ina faida iliyoongezwa ya kuhamisha thamani upande wa kulia wa uga, kwa hivyo ni thamani yenyewe badala ya thamani mara 256<sup>kitu</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Wito kwa mkataba wa Solidity usipofanana na saini zozote za chaguo za kukokotoa, huita [chaguo la kukokotoa la `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (kwa kudhani kuna moja).
Katika kisa cha `CalldataInterpreter`, wito _yoyote_ hufika hapa kwa sababu hakuna chaguo zingine za kukokotoa za `external` au `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Soma baiti ya kwanza ya calldata, ambayo inatuambia chaguo za kukokotoa.
Kuna sababu mbili kwa nini chaguo za kukokotoa hazipatikani hapa:

1. Chaguo za kukokotoa ambazo ni `pure` au `view` hazibadilishi hali na hazigharimu gesi (zinapoitwa nje ya chain).
   Haina maana kujaribu kupunguza gharama yao ya gesi.
2. Chaguo za kukokotoa zinazotegemea [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   Thamani ya `msg.sender` itakuwa anwani ya `CalldataInterpreter`, si ya mpigaji simu.

Kwa bahati mbaya, [ukiangalia vipimo vya ERC-20](https://eips.ethereum.org/EIPS/eip-20), hii inaacha chaguo moja tu la kukokotoa, `transfer`.
Hii inatuacha na chaguo mbili tu za kukokotoa: `transfer` (kwa sababu tunaweza kuita `transferFrom`) na `faucet` (kwa sababu tunaweza kuhamisha tokeni kurudi kwa yeyote aliyetuita).

```solidity

        // Call the state changing methods of token using
        // information from the calldata

        // faucet
        if (_func == 1) {
```

Wito kwa `faucet()`, ambayo haina vigezo.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Baada ya kuita `token.faucet()` tunapata tokeni. Hata hivyo, kama mkataba wa proksi, **hatuhitaji** tokeni.
EOA (akaunti inayomilikiwa nje) au mkataba uliotuita unahitaji.
Kwa hivyo tunahamisha tokeni zetu zote kwa yeyote aliyetuita.

```solidity
        // transfer (assume we have an allowance for it)
        if (_func == 2) {
```

Kuhamisha tokeni kunahitaji vigezo viwili: anwani ya mwisho na kiasi.

```solidity
            token.transferFrom(
                msg.sender,
```

Tunawaruhusu tu wapigaji simu kuhamisha tokeni wanazomiliki

```solidity
                address(uint160(calldataVal(1, 20))),
```

Anwani ya mwisho huanza kwenye baiti #1 (baiti #0 ni chaguo za kukokotoa).
Kama anwani, ina urefu wa baiti 20.

```solidity
                calldataVal(21, 2)
```

Kwa mkataba huu mahususi tunadhani kwamba idadi ya juu ya tokeni ambazo mtu yeyote angetaka kuhamisha inatoshea katika baiti mbili (chini ya 65536).

```solidity
            );
        }
```

Kwa ujumla, uhamisho unachukua baiti 35 za calldata:

| Sehemu                          | Urefu | Baiti |
| ------------------------------- | ----: | ----: |
| Kiteuzi cha chaguo za kukokotoa |     1 |     0 |
| Anwani ya mwisho                |    32 |  1-32 |
| Kiasi                           |     2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Jaribio hili la kitengo cha JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) linatuonyesha jinsi ya kutumia utaratibu huu (na jinsi ya kuthibitisha kuwa inafanya kazi ipasavyo).
Nitachukulia kuwa unaelewa [chai](https://www.chaijs.com/) na [ethers](https://docs.ethers.io/v5/) na nitaelezea tu sehemu zinazohusu mkataba haswa.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Inapaswa kuturuhusu kutumia tokeni", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Anwani ya tokeni:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("Anwani ya CalldataInterpreter:", cdi.address)

    const signer = await ethers.getSigner()
```

Tunaanza kwa kupeleka mikataba yote miwili.

```javascript
    // Get tokens to play with
    const faucetTx = {
```

Hatuwezi kutumia chaguo za kukokotoa za kiwango cha juu ambazo tungetumia kwa kawaida (kama vile `token.faucet()`) kuunda miamala, kwa sababu hatufuati ABI.
Badala yake, tunapaswa kujenga muamala wenyewe na kisha kuutuma.

```javascript
      to: cdi.address,
      data: "0x01"
```

Kuna vigezo viwili tunavyohitaji kutoa kwa muamala:

1. `to`, anwani ya mwisho.
   Huu ni mkataba wa mkalimani wa calldata.
2. `data`, calldata ya kutuma.
   Katika kesi ya simu ya bomba, data ni baiti moja, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Tunaita [mbinu ya `sendTransaction` ya mtia saini](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) kwa sababu tayari tumebainisha lengo (`faucetTx.to`) na tunahitaji muamala utiwe saini.

```javascript
// Check the faucet provides the tokens correctly
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Hapa tunathibitisha salio.
Hakuna haja ya kuokoa gesi kwenye chaguo za kukokotoa za `view`, kwa hivyo tunaziendesha kawaida.

```javascript
// Give the CDI an allowance (approvals cannot be proxied)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Mpe mkalimani wa calldata posho ili aweze kufanya uhamisho.

```javascript
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Unda muamala wa uhamisho. Baiti ya kwanza ni "0x02", ikifuatiwa na anwani ya mwisho, na hatimaye kiasi (0x0100, ambayo ni 256 katika desimali).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Check that we have 256 tokens less
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // And that our destination got them
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Kupunguza gharama unapodhibiti mkataba wa mwisho {#reducing-the-cost-when-you-do-control-the-destination-contract}

Ikiwa una udhibiti juu ya mkataba wa mwisho unaweza kuunda chaguo za kukokotoa zinazokwepa ukaguzi wa `msg.sender` kwa sababu zinamuamini mkalimani wa calldata.
[Unaweza kuona mfano wa jinsi hii inavyofanya kazi hapa, katika tawi la `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Ikiwa mkataba ungekuwa ukijibu tu miamala ya nje, tungeweza kutosheka na kuwa na mkataba mmoja tu.
Hata hivyo, hilo lingevunja [uwezo wa kutunga](/developers/docs/smart-contracts/composability/).
Ni bora zaidi kuwa na mkataba unaojibu simu za kawaida za ERC-20, na mkataba mwingine unaojibu miamala yenye data fupi ya simu.

### Token.sol {#token-sol-2}

Katika mfano huu tunaweza kurekebisha `Token.sol`.
Hii inatuwezesha kuwa na idadi ya chaguo za kukokotoa ambazo proksi pekee inaweza kuita.
Hapa kuna sehemu mpya:

```solidity
    // The only address allowed to specify the CalldataInterpreter address
    address owner;

    // The CalldataInterpreter address
    address proxy = address(0);
```

Mkataba wa ERC-20 unahitaji kujua utambulisho wa proksi aliyeidhinishwa.
Hata hivyo, hatuwezi kuweka kigezo hiki katika mjenzi, kwa sababu hatujui thamani bado.
Mkataba huu unathibitishwa kwanza kwa sababu proksi inatarajia anwani ya tokeni katika mjenzi wake.

```solidity
    /**
     * @dev Calls the ERC20 constructor.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

Anwani ya muundaji (inayoitwa `owner`) huhifadhiwa hapa kwa sababu hiyo ndiyo anwani pekee inayoruhusiwa kuweka proksi.

```solidity
    /**
     * @dev set the proxy address (CalldataInterpreter).
     * Can only be called once by the owner
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Proksi ina ufikiaji wa upendeleo, kwa sababu inaweza kukwepa ukaguzi wa usalama.
Ili kuhakikisha tunaweza kuamini proksi tunamruhusu `mmiliki` pekee kuita chaguo hili la kukokotoa, na mara moja tu.
Mara `proksi` inapokuwa na thamani halisi (sio sifuri), thamani hiyo haiwezi kubadilika, kwa hivyo hata ikiwa mmiliki ataamua kuwa mhalifu, au mnemonic yake itafichuliwa, bado tuko salama.

```solidity
    /**
     * @dev Some functions can only be called by the proxy.
     */
    modifier onlyProxy {
```

Hiki ni kitendakazi cha `kirekebishaji` (https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), kinarekebisha jinsi vitendakazi vingine vinavyofanya kazi.

```solidity
      require(msg.sender == proxy);
```

Kwanza, thibitisha tumeitwa na proksi na si mtu mwingine.
Ikiwa sivyo, `revert`.

```solidity
      _;
    }
```

Ikiwa ndivyo, endesha kitendakazi tunachorekebisha.

```solidity
   /* Functions that allow the proxy to act on behalf of accounts */

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

Hizi ni shughuli tatu ambazo kwa kawaida huhitaji ujumbe kutoka moja kwa moja kutoka kwa huluki inayohamisha tokeni au kuidhinisha posho.
Hapa tuna toleo la proksi la shughuli hizi ambalo:

1. Hurekebishwa na `onlyProxy()` ili hakuna mtu mwingine anayeruhusiwa kuzidhibiti.
2. Hupata anwani ambayo kwa kawaida ingekuwa `msg.sender` kama kigezo cha ziada.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

Mkalimani wa calldata karibu anafanana na ule ulio juu, isipokuwa kwamba chaguo za kukokotoa zinazowakilishwa hupokea kigezo cha `msg.sender` na hakuna haja ya posho ya `transfer`.

```solidity
        // transfer (no need for allowance)
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

Kuna mabadiliko machache kati ya msimbo wa awali wa majaribio na huu.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Tunahitaji kuuambia mkataba wa ERC-20 ni proksi gani ya kuamini

```js
console.log("CalldataInterpreter address:", cdi.address)

// Need two signers to verify allowances
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Ili kuangalia `approve()` na `transferFrom()` tunahitaji mtia saini wa pili.
Tunaiita `poorSigner` kwa sababu haipati tokeni zetu zozote (inahitaji kuwa na ETH, bila shaka).

```js
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Kwa sababu mkataba wa ERC-20 unaiamini proksi (`cdi`), hatuhitaji posho ya kuwasilisha uhamisho.

```js
// approval and transferFrom
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

// Check the approve / transferFrom combo was done correctly
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Jaribu chaguo mbili mpya za kukokotoa.
Kumbuka kwamba `transferFromTx` inahitaji vigezo viwili vya anwani: mtoaji wa posho na mpokeaji.

## Hitimisho {#conclusion}

Wote [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) na [Arbitrum](https://developer.offchainlabs.com/docs/special_features) wanatafuta njia za kupunguza ukubwa wa calldata iliyoandikwa kwa L1 na kwa hivyo gharama ya miamala.
Hata hivyo, kama watoa huduma wa miundombinu wanaotafuta suluhisho za jumla, uwezo wetu una mipaka.
Kama msanidi programu wa mfumo mtawanyo wa kimamlaka, una ujuzi maalum wa programu, ambao unakuwezesha kuboresha calldata yako vizuri zaidi kuliko tunavyoweza katika suluhisho la jumla.
Tunatumahi, makala haya yanakusaidia kupata suluhisho bora kwa mahitaji yako.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).

