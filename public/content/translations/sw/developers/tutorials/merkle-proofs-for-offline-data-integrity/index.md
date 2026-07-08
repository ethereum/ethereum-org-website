---
title: Ushahidi wa Merkle kwa uadilifu wa data nje ya mnyororo
description: Kuhakikisha uadilifu wa data mnyororoni kwa data ambayo imehifadhiwa, zaidi, nje ya mnyororo
author: Ori Pomerantz
tags: ["uhifadhi"]
skill: advanced
breadcrumb: Ushahidi wa Merkle
lang: sw
published: 2021-12-30
---

## Utangulizi {#introduction}

Kwa hakika tungependa kuhifadhi kila kitu katika hifadhi ya Ethereum, ambayo imehifadhiwa kwenye maelfu ya kompyuta na ina upatikanaji wa juu sana (data haiwezi kudhibitiwa) na uadilifu (data haiwezi kurekebishwa kwa njia isiyoidhinishwa), lakini kuhifadhi neno la baiti 32 kwa kawaida hugharimu gesi 20,000. Ninapoandika haya, gharama hiyo ni sawa na $6.60. Kwa senti 21 kwa kila baiti hii ni ghali sana kwa matumizi mengi.

Ili kutatua tatizo hili mfumo wa ikolojia wa Ethereum ulitengeneza [njia nyingi mbadala za kuhifadhi data kwa njia iliyogatuliwa](/developers/docs/storage/). Kawaida zinahusisha maelewano kati ya upatikanaji na bei. Hata hivyo, uadilifu kwa kawaida unahakikishwa.

Katika makala haya unajifunza **jinsi** ya kuhakikisha uadilifu wa data bila kuhifadhi data kwenye mnyororo wa vitalu, ukitumia [ushahidi wa Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Inafanyaje kazi? {#how-does-it-work}

Kinadharia tungeweza tu kuhifadhi heshi ya data mnyororoni, na kutuma data yote katika miamala inayoihitaji. Hata hivyo, hii bado ni ghali sana. Baiti ya data kwa muamala inagharimu takriban gesi 16, kwa sasa ni takriban nusu senti, au takriban $5 kwa kila kilobaiti. Kwa $5000 kwa kila megabaiti, hii bado ni ghali sana kwa matumizi mengi, hata bila gharama ya ziada ya uheshiji wa data.

Suluhisho ni kuheshi mara kwa mara vijisehemu tofauti vya data, kwa hivyo kwa data ambayo huhitaji kutuma unaweza tu kutuma heshi. Unafanya hivi ukitumia mti wa Merkle, muundo wa data wa mti ambapo kila nodi ni heshi ya nodi zilizo chini yake:

![Merkle Tree](tree.png)

Heshi ya mzizi ndiyo sehemu pekee inayohitaji kuhifadhiwa mnyororoni. Ili kuthibitisha thamani fulani, unatoa heshi zote zinazohitaji kuunganishwa nayo ili kupata mzizi. Kwa mfano, ili kuthibitisha `C` unatoa `D`, `H(A-B)`, na `H(E-H)`.

![Proof of the value of C](proof-c.png)

## Utekelezaji {#implementation}

[Msimbo wa mfano umetolewa hapa](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Msimbo wa nje ya mnyororo {#offchain-code}

Katika makala haya tunatumia JavaScript kwa ukokotoaji wa nje ya mnyororo. Programu nyingi zilizogatuliwa zina kijenzi chao cha nje ya mnyororo katika JavaScript.

#### Kuunda mzizi wa Merkle {#creating-the-merkle-root}

Kwanza tunahitaji kutoa mzizi wa Merkle kwenye mnyororo.

```javascript
const ethers = require("ethers")
```

[Tunatumia kazi ya heshi kutoka kwa kifurushi cha ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Data ghafi ambayo uadilifu wake tunapaswa kuuthibitisha. Baiti mbili za kwanza n
// i kitambulisho cha mtumiaji, na baiti mbili za mwisho ni kiasi cha tokeni ambacho
// mtumiaji anamiliki kwa sasa.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Kusimba kila ingizo katika nambari kamili moja ya biti 256 husababisha msimbo usiosomeka sana kuliko kutumia JSON, kwa mfano. Hata hivyo, hii inamaanisha uchakataji mdogo sana ili kupata data katika mkataba, hivyo gharama za chini sana za gesi. [Unaweza kusoma JSON mnyororoni](https://github.com/chrisdotn/jsmnSol), ni wazo baya tu ikiwa linaweza kuepukika.

```javascript
// Orodha ya thamani za heshi, kama BigInts
const hashArray = dataArray
```

Katika hali hii data yetu ni thamani za biti 256 kuanzia, kwa hivyo hakuna uchakataji unaohitajika. Ikiwa tunatumia muundo wa data mgumu zaidi, kama vile mifuatano, tunahitaji kuhakikisha kuwa tunaheshi data kwanza ili kupata safu ya heshi. Kumbuka kwamba hii pia ni kwa sababu hatujali ikiwa watumiaji wanajua taarifa za watumiaji wengine. Vinginevyo tungelazimika kuheshi ili mtumiaji 1 asijue thamani ya mtumiaji 0, mtumiaji 2 asijue thamani ya mtumiaji 3, n.k.

```javascript
// Badilisha kati ya mfuatano ambao kazi ya heshi inatarajia na
// BigInt tunayotumia kila mahali pengine.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

Kazi ya heshi ya ethers inatarajia kupata mfuatano wa JavaScript wenye nambari ya heksadesimali, kama vile `0x60A7`, na hujibu kwa mfuatano mwingine wenye muundo sawa. Hata hivyo, kwa msimbo uliosalia ni rahisi kutumia `BigInt`, kwa hivyo tunabadilisha kuwa mfuatano wa heksadesimali na kurudi tena.

```javascript
// Heshi linganifu ya jozi ili tusijali ikiwa mpangilio utageuzwa.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Kazi hii ni linganifu (heshi ya a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Hii inamaanisha kwamba tunapokagua ushahidi wa Merkle hatuhitaji kuwa na wasiwasi kuhusu kama tuweke thamani kutoka kwa ushahidi kabla au baada ya thamani iliyokokotolewa. Ukaguzi wa ushahidi wa Merkle unafanywa mnyororoni, kwa hivyo kadiri tunavyohitaji kufanya kidogo huko ndivyo inavyokuwa bora.

Onyo:
Kriptografia ni ngumu zaidi kuliko inavyoonekana.
Toleo la awali la makala haya lilikuwa na kazi ya heshi `hash(a^b)`.
Hilo lilikuwa wazo **baya** kwa sababu lilimaanisha kwamba ikiwa ulijua thamani halali za `a` na `b` ungeweza kutumia `b' = a^b^a'` kuthibitisha thamani yoyote unayotaka ya `a'`.
Kwa kazi hii itabidi ukokotoe `b'` kiasi kwamba `hash(a') ^ hash(b')` ni sawa na thamani inayojulikana (tawi linalofuata kwenye njia ya kuelekea kwenye mzizi), ambayo ni ngumu zaidi.

```javascript
// Thamani ya kuonyesha kwamba tawi fulani ni tupu, halina
// thamani
const empty = 0n
```

Wakati idadi ya thamani si nambari kamili ya kipeo cha pili tunahitaji kushughulikia matawi tupu. Njia ambayo programu hii inafanya ni kuweka sifuri kama kishikilia nafasi.

![Merkle tree with branches missing](merkle-empty-hash.png)

```javascript
// Kokotoa kiwango kimoja juu ya mti wa orodha ya heshi kwa kuchukua heshi ya
// kila jozi kwa mfuatano
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Ili kuepuka kufuta na kuandika juu ya ingizo // Ongeza thamani tupu ikiwa ni lazima (tunahitaji majani yote yawe // yameoanishwa)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Kazi hii "inapanda" kiwango kimoja katika mti wa Merkle kwa kuheshi jozi za thamani kwenye tabaka la sasa. Kumbuka kwamba huu si utekelezaji mzuri zaidi, tungeweza kuepuka kunakili ingizo na kuongeza tu `hashEmpty` inapofaa katika kitanzi, lakini msimbo huu umeboreshwa kwa usomaji.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Panda juu ya mti hadi kuwe na thamani moja tu, ambayo ni // mzizi. // // Ikiwa tabaka lina idadi isiyo shufwa ya maingizo // msimbo katika oneLevelUp unaongeza thamani tupu, kwa hivyo ikiwa tuna, kwa mfano, // majani 10 tutakuwa na matawi 5 katika tabaka la pili, matawi 3 // katika la tatu, 2 katika la nne na mzizi ni la tano

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Ili kupata mzizi, panda hadi kubaki thamani moja tu.

#### Kuunda ushahidi wa Merkle {#creating-a-merkle-proof}

Ushahidi wa Merkle ni thamani za kuheshi pamoja na thamani inayothibitishwa ili kurudisha mzizi wa Merkle. Thamani ya kuthibitisha mara nyingi inapatikana kutoka kwa data nyingine, kwa hivyo napendelea kuitoa kando badala ya kama sehemu ya msimbo.

```javascript
// Ushahidi wa Merkle unajumuisha thamani ya orodha ya maingizo ya
// kuheshi nayo. Kwa sababu tunatumia kazi ya heshi linganifu, hatu
// hitaji eneo la kipengee ili kuthibitisha ushahidi, isipokuwa tu kuutengeneza
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Hadi tufike kileleni
    while (currentLayer.length > 1) {
        // Hakuna matabaka yenye urefu usio shufwa
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Ikiwa currentN si shufwa, ongeza pamoja na thamani iliyo kabla yake kwenye ushahidi
            ? currentLayer[currentN-1]
               // Ikiwa ni shufwa, ongeza thamani iliyo baada yake
            : currentLayer[currentN+1])

```

Tunaheshi `(v[0],v[1])`, `(v[2],v[3])`, n.k. Kwa hivyo kwa thamani shufwa tunahitaji inayofuata, kwa thamani witiri tunahitaji iliyotangulia.

```javascript
        // Nenda kwenye tabaka linalofuata juu
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // wakati currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Msimbo wa mnyororoni {#onchain-code}

Hatimaye tuna msimbo unaokagua ushahidi. Msimbo wa mnyororoni umeandikwa katika [Solidity](https://docs.soliditylang.org/en/v0.8.11/). Uboreshaji ni muhimu zaidi hapa kwa sababu gesi ni ghali kiasi.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Niliandika hii nikitumia [mazingira ya usanidi ya Hardhat](https://hardhat.org/), ambayo inaturuhusu kuwa na [towe la kiweko kutoka kwa Solidity](https://hardhat.org/docs/cookbook/debug-logs) wakati wa kusanidi.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Sio salama kabisa, katika msimbo wa uzalishaji ufikiaji wa
    // kazi hii LAZIMA uwekewe mipaka madhubuti, labda kwa
    // mmiliki
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Kazi za kuweka na kupata kwa ajili ya mzizi wa Merkle. Kuruhusu kila mtu kusasisha mzizi wa Merkle ni _wazo baya sana_ katika mfumo wa uzalishaji. Ninafanya hapa kwa ajili ya urahisi wa msimbo wa mfano. **Usifanye kwenye mfumo ambapo uadilifu wa data ni muhimu sana**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Kazi hii inazalisha heshi ya jozi. Ni tafsiri tu ya Solidity ya msimbo wa JavaScript kwa `hash` na `pairHash`.

**Kumbuka:** Hii ni hali nyingine ya uboreshaji kwa usomaji. Kulingana na [ufafanuzi wa kazi](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), inaweza kuwezekana kuhifadhi data kama thamani ya [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) na kuepuka ubadilishaji.

```solidity
    // Thibitisha ushahidi wa Merkle
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

Katika nukuu ya hisabati uthibitishaji wa ushahidi wa Merkle unaonekana hivi: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Msimbo huu unautekeleza.

## Ushahidi wa Merkle na mikusanyiko haichanganyiki {#merkle-proofs-and-rollups}

Ushahidi wa Merkle haufanyi kazi vizuri na [mikusanyiko](/developers/docs/scaling/#rollups). Sababu ni kwamba mikusanyiko huandika data yote ya muamala kwenye tabaka la 1 (l1), lakini huchakata kwenye tabaka la 2 (l2). Gharama ya kutuma ushahidi wa Merkle na muamala ni wastani wa gesi 638 kwa kila tabaka (kwa sasa baiti katika data za mwito inagharimu gesi 16 ikiwa si sifuri, na 4 ikiwa ni sifuri). Ikiwa tuna maneno 1024 ya data, ushahidi wa Merkle unahitaji matabaka kumi, au jumla ya gesi 6380.

Tukiangalia kwa mfano [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), kuandika gesi ya tabaka la 1 (l1) kunagharimu takriban Gwei 100 na gesi ya tabaka la 2 (l2) inagharimu Gwei 0.001 (hiyo ni bei ya kawaida, inaweza kupanda kukiwa na msongamano). Kwa hivyo kwa gharama ya gesi moja ya tabaka la 1 (l1) tunaweza kutumia gesi laki moja kwenye uchakataji wa tabaka la 2 (l2). Kwa kudhani hatuandiki juu ya hifadhi, hii inamaanisha kwamba tunaweza kuandika takriban maneno matano kwenye hifadhi kwenye tabaka la 2 (l2) kwa bei ya gesi moja ya tabaka la 1 (l1). Kwa ushahidi mmoja wa Merkle tunaweza kuandika maneno yote 1024 kwenye hifadhi (kwa kudhani yanaweza kukokotolewa mnyororoni kuanzia, badala ya kutolewa katika muamala) na bado kubakiwa na gesi nyingi.

## Hitimisho {#conclusion}

Katika maisha halisi unaweza usitekeleze miti ya Merkle peke yako. Kuna maktaba zinazojulikana na zilizokaguliwa ambazo unaweza kutumia na kwa ujumla ni bora kutotekeleza misingi ya kriptografia peke yako. Lakini natumai kwamba sasa unaelewa ushahidi wa Merkle vizuri zaidi na unaweza kuamua wakati inafaa kuutumia.

Kumbuka kwamba ingawa ushahidi wa Merkle unahifadhi _uadilifu_, hauhifadhi _upatikanaji_. Kujua kwamba hakuna mtu mwingine anayeweza kuchukua rasilimali zako ni faraja ndogo ikiwa hifadhi ya data itaamua kutoruhusu ufikiaji na huwezi kuunda mti wa Merkle ili kuzifikia pia. Kwa hivyo miti ya Merkle inatumiwa vyema na aina fulani ya hifadhi iliyogatuliwa, kama vile IPFS.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).