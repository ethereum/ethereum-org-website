---
title: "EIP-1271: Kutia Sahihi na Kuthibitisha Sahihi za Mkataba Mahiri"
description: Muhtasari wa uzalishaji na uthibitishaji wa sahihi za mkataba mahiri kwa kutumia EIP-1271. Pia tunapitia utekelezaji wa EIP-1271 unaotumika katika Safe (zamani Gnosis Safe) ili kutoa mfano halisi kwa wasanidi wa mikataba mahiri kujenga juu yake.
author: Nathan H. Leung
lang: sw
tags: ["eip-1271", "mikataba mahiri", "kuthibitisha", "kutia sahihi"]
skill: intermediate
breadcrumb: Sahihi za EIP-1271
published: 2023-01-12
---

Kiwango cha [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) kinaruhusu mikataba mahiri kuthibitisha sahihi.

Katika mafunzo haya, tunatoa muhtasari wa sahihi za kidijitali, usuli wa EIP-1271, na utekelezaji mahususi wa EIP-1271 unaotumiwa na [Safe](https://safe.global/) (zamani Gnosis Safe). Kwa pamoja, hii inaweza kutumika kama mahali pa kuanzia kwa kutekeleza EIP-1271 katika mikataba yako mwenyewe.

## Sahihi ni nini? {#what-is-a-signature}

Katika muktadha huu, sahihi (kwa usahihi zaidi, "sahihi ya kidijitali") ni ujumbe pamoja na aina fulani ya uthibitisho kwamba ujumbe ulitoka kwa mtu/mtumaji/anwani mahususi.

Kwa mfano, sahihi ya kidijitali inaweza kuonekana hivi:

1. Ujumbe: "Nataka kuingia kwenye tovuti hii kwa kutumia mkoba wangu wa Ethereum."
2. Mtia Sahihi: Anwani yangu ni `0x000…`
3. Uthibitisho: Huu hapa ni uthibitisho kwamba mimi, `0x000…`, kwa kweli niliunda ujumbe huu wote (hii kwa kawaida ni kitu cha kriptografia).

Ni muhimu kutambua kwamba sahihi ya kidijitali inajumuisha "ujumbe" na "sahihi".

Kwa nini? Kwa mfano, ikiwa ungenipa mkataba wa kutia sahihi, na kisha nikakata ukurasa wa sahihi na kukurudishia sahihi zangu pekee bila mkataba uliosalia, mkataba huo haungekuwa halali.

Kwa njia hiyo hiyo, sahihi ya kidijitali haimaanishi chochote bila ujumbe unaohusishwa!

## Kwa nini EIP-1271 ipo? {#why-does-eip-1271-exist}

Ili kuunda sahihi ya kidijitali kwa matumizi kwenye minyororo ya vitalu inayotegemea Ethereum, kwa ujumla unahitaji ufunguo wa siri ambao hakuna mtu mwingine anayeujua. Hiki ndicho kinafanya sahihi yako iwe yako (hakuna mtu mwingine anayeweza kuunda sahihi sawa bila kujua ufunguo wa siri).

Akaunti yako ya Ethereum (yaani, akaunti yako inayomilikiwa na nje/EOA) ina ufunguo wa siri unaohusishwa nayo, na huu ndio ufunguo wa siri ambao kwa kawaida hutumiwa wakati tovuti au programu tumizi iliyogatuliwa (dapp) inakuuliza sahihi (k.m., kwa "Ingia na Ethereum").

Programu inaweza [kuthibitisha sahihi](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) unayounda kwa kutumia maktaba ya wahusika wengine kama ethers.js [bila kujua ufunguo wa siri wako](https://en.wikipedia.org/wiki/Public-key_cryptography) na kuwa na uhakika kwamba _wewe_ ndiye uliyeunda sahihi hiyo.

> Kwa kweli, kwa sababu sahihi za kidijitali za EOA zinatumia kriptografia ya ufunguo wa umma, zinaweza kuzalishwa na kuthibitishwa **nje ya mnyororo**! Hivi ndivyo upigaji kura wa DAO usio na gesi unavyofanya kazi — badala ya kuwasilisha kura mnyororoni, sahihi za kidijitali zinaweza kuundwa na kuthibitishwa nje ya mnyororo kwa kutumia maktaba za kriptografia.

Wakati akaunti za EOA zina ufunguo wa siri, akaunti za mkataba mahiri hazina aina yoyote ya ufunguo wa siri (kwa hivyo "Ingia na Ethereum", n.k. haziwezi kufanya kazi kiasili na akaunti za mkataba mahiri).

Tatizo ambalo EIP-1271 inalenga kutatua: tunawezaje kujua kwamba sahihi ya mkataba mahiri ni halali ikiwa mkataba mahiri hauna "siri" inayoweza kujumuishwa kwenye sahihi?

## EIP-1271 inafanyaje kazi? {#how-does-eip-1271-work}

Mikataba mahiri haina funguo za siri zinazoweza kutumika kutia sahihi jumbe. Kwa hivyo tunawezaje kujua ikiwa sahihi ni halisi?

Naam, wazo moja ni kwamba tunaweza tu _kuuuliza_ mkataba mahiri ikiwa sahihi ni halisi!

Kile ambacho EIP-1271 inafanya ni kusanifisha wazo hili la "kuuuliza" mkataba mahiri ikiwa sahihi fulani ni halali.

Mkataba unaotekeleza EIP-1271 lazima uwe na kitendakazi kinachoitwa `isValidSignature` ambacho huchukua ujumbe na sahihi. Mkataba unaweza kisha kuendesha mantiki fulani ya uthibitishaji (vipimo havitekelezi chochote mahususi hapa) na kisha kurudisha thamani inayoonyesha ikiwa sahihi ni halali au la.

Ikiwa `isValidSignature` inarudisha matokeo halali, hiyo ni sawa na mkataba kusema "ndiyo, ninaidhinisha sahihi hii + ujumbe!"

### Kiolesura {#interface}

Hiki hapa ni kiolesura kamili katika vipimo vya EIP-1271 (tutazungumzia kigezo cha `_hash` hapa chini, lakini kwa sasa, kifikirie kama ujumbe unaothibitishwa):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Inapaswa kurudisha kama sahihi iliyotolewa ni halali kwa heshi iliyotolewa
   * @param _hash      Heshi ya data itakayotiwa sahihi
   * @param _signature Arei ya baiti ya sahihi inayohusishwa na _hash
   *
   * LAZIMA irudishe thamani ya kimazingaombwe ya bytes4 0x1626ba7e wakati utendaji unapofaulu.
   * LAZIMA ISIBADILISHE hali (kwa kutumia STATICCALL kwa solc < 0.5, kirekebishaji cha view kwa solc > 0.5)
   * LAZIMA iruhusu miito ya nje
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Mfano wa Utekelezaji wa EIP-1271: Safe {#example-eip-1271-implementation-safe}

Mikataba inaweza kutekeleza `isValidSignature` kwa njia nyingi — vipimo havielezi mengi kuhusu utekelezaji kamili.

Mkataba mmoja mashuhuri unaotekeleza EIP-1271 ni Safe (zamani Gnosis Safe).

Katika msimbo wa Safe, `isValidSignature` [inatekelezwa](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) ili sahihi ziweze kuundwa na kuthibitishwa kwa [njia mbili](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Jumbe za mnyororoni
   1. Uundaji: mmiliki wa safe anaunda muamala mpya wa safe ili "kutia sahihi" ujumbe, akipitisha ujumbe kama data kwenye muamala. Pindi wamiliki wa kutosha wanapotia sahihi muamala ili kufikia kiwango cha saini-nyingi, muamala unatangazwa na kuendeshwa. Katika muamala, kuna kitendakazi cha safe kinachoitwa (`signMessage(bytes calldata _data)`) ambacho huongeza ujumbe kwenye orodha ya jumbe "zilizoidhinishwa".
   2. Uthibitishaji: ita `isValidSignature` kwenye mkataba wa Safe, na upitishe ujumbe wa kuthibitisha kama kigezo cha ujumbe na [thamani tupu kwa kigezo cha sahihi](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (yaani, `0x`). Safe itaona kwamba kigezo cha sahihi ni kitupu na badala ya kuthibitisha sahihi kwa njia ya kriptografia, itajua tu kuendelea na kuangalia ikiwa ujumbe upo kwenye orodha ya jumbe "zilizoidhinishwa".
2. Jumbe za nje ya mnyororo:
   1. Uundaji: mmiliki wa safe anaunda ujumbe nje ya mnyororo, kisha anapata wamiliki wengine wa safe kutia sahihi ujumbe kila mmoja peke yake hadi kuwe na sahihi za kutosha kushinda kiwango cha kuidhinisha cha saini-nyingi.
   2. Uthibitishaji: ita `isValidSignature`. Katika kigezo cha ujumbe, pitisha ujumbe utakaothibitishwa. Katika kigezo cha sahihi, pitisha sahihi za kibinafsi za kila mmiliki wa safe zote zikiwa zimeunganishwa pamoja, mfululizo. Safe itaangalia kwamba kuna sahihi za kutosha kufikia kiwango **na** kwamba kila sahihi ni halali. Ikiwa ndivyo, itarudisha thamani inayoonyesha uthibitishaji wa sahihi uliofanikiwa.

## Kigezo cha `_hash` ni nini hasa? Kwa nini usipitishe ujumbe wote? {#what-exactly-is-the-hash-parameter-why-not-pass-the-whole-message}

Huenda umegundua kwamba kitendakazi cha `isValidSignature` katika [kiolesura cha EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) hakichukui ujumbe wenyewe, bali kigezo cha `_hash`. Maana ya hii ni kwamba badala ya kupitisha ujumbe kamili wa urefu wowote kwa `isValidSignature`, badala yake tunapitisha heshi ya baiti 32 ya ujumbe (kwa ujumla keccak256).

Kila baiti ya data za mwito — yaani, data ya kigezo cha kitendakazi inayopitishwa kwa kitendakazi cha mkataba mahiri — [inagharimu gesi 16 (gesi 4 ikiwa ni baiti sifuri)](https://eips.ethereum.org/EIPS/eip-2028), kwa hivyo hii inaweza kuokoa gesi nyingi ikiwa ujumbe ni mrefu.

### Vipimo vya Awali vya EIP-1271 {#previous-eip-1271-specifications}

Kuna vipimo vya EIP-1271 katika matumizi halisi ambavyo vina kitendakazi cha `isValidSignature` chenye kigezo cha kwanza cha aina ya `bytes` (urefu wowote, badala ya urefu uliowekwa wa `bytes32`) na jina la kigezo `message`. Hili ni [toleo la zamani](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) la kiwango cha EIP-1271.

## EIP-1271 inapaswa kutekelezwa vipi katika mikataba yangu mwenyewe? {#how-should-eip-1271-be-implemented-in-my-own-contracts}

Vipimo viko wazi sana hapa. Utekelezaji wa Safe una mawazo mazuri:

- Unaweza kuzingatia sahihi za EOA kutoka kwa "mmiliki" wa mkataba kuwa halali.
- Unaweza kuhifadhi orodha ya jumbe zilizoidhinishwa na kuzingatia hizo pekee kuwa halali.

Mwishowe, ni juu yako kama msanidi wa mkataba!

## Hitimisho {#conclusion}

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) ni kiwango chenye matumizi mengi kinachoruhusu mikataba mahiri kuthibitisha sahihi. Inafungua mlango kwa mikataba mahiri kutenda zaidi kama EOA — kwa mfano kutoa njia ya "Ingia na Ethereum" kufanya kazi na mikataba mahiri — na inaweza kutekelezwa kwa njia nyingi (Safe ikiwa na utekelezaji muhimu, wa kuvutia wa kuzingatia).