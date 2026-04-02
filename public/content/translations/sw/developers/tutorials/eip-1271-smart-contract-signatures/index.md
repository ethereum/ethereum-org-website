---
title: "EIP-1271: Kusaini na Kuthibitisha Sahihi za Mkataba-erevu"
description: Muhtasari wa uundaji na uthibitishaji wa sahihi za mkataba-erevu kwa kutumia EIP-1271. Pia tunapitia utekelezaji wa EIP-1271 unaotumika katika Safe (awali Gnosis Safe) ili kutoa mfano halisi kwa wasanidi programu wa mkataba-erevu kuutumia kama msingi.
author: Nathan H. Leung
lang: sw
tags:
  [
    "eip-1271",
    "mikataba erevu",
    "kuthibitisha",
    "kusaini"
  ]
skill: intermediate
published: 2023-01-12
---

Kiwango cha [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) huruhusu mikataba-erevu kuthibitisha sahihi.

Katika mafunzo haya, tunatoa muhtasari wa sahihi za dijitali, historia ya EIP-1271, na utekelezaji mahususi wa EIP-1271 unaotumiwa na [Safe](https://safe.global/) (awali Gnosis Safe). Kwa pamoja, hii inaweza kutumika kama sehemu ya kuanzia kwa ajili ya kutekeleza EIP-1271 katika mikataba yako mwenyewe.

## Sahihi ni nini?

Katika muktadha huu, sahihi (kwa usahihi zaidi, "sahihi ya dijitali") ni ujumbe pamoja na aina fulani ya uthibitisho kwamba ujumbe umetoka kwa mtu/mtumaji/anwani maalum.

Kwa mfano, sahihi ya dijitali inaweza kuonekana hivi:

1. Ujumbe: “Nataka kuingia katika tovuti hii kwa kutumia mkoba wangu wa Ethereum.”
2. Msaini: Anwani yangu ni `0x000…`
3. Uthibitisho: Huu ni uthibitisho kwamba mimi, `0x000…`, ndiye niliyeunda ujumbe huu wote (kwa kawaida hii ni kitu cha kroptografia).

Ni muhimu kuzingatia kwamba sahihi ya dijitali inajumuisha "ujumbe" na "sahihi".

Kwa nini? Kwa mfano, kama ungenipa mkataba wa kusaini, kisha nikakata ukurasa wa sahihi na kukurejeshea sahihi zangu pekee bila sehemu nyingine ya mkataba, mkataba huo haungekuwa halali.

Vivyo hivyo, sahihi ya dijitali haina maana yoyote bila ujumbe unaohusiana nayo!

## Kwa nini EIP-1271 ipo?

Ili kuunda sahihi ya dijitali kwa matumizi katika blockchain zinazotumia Ethereum, kwa ujumla unahitaji ufunguo binafsi wa siri ambao hakuna mtu mwingine anayejua. Hiki ndicho kinachofanya sahihi yako kuwa yako (hakuna mtu mwingine anayeweza kuunda sahihi sawa bila kujua ufunguo wa siri).

Akaunti yako ya Ethereum (yaani, akaunti yako inayomilikiwa nje/EOA) ina ufunguo binafsi unaohusishwa nayo, na huu ndio ufunguo binafsi unaotumiwa kwa kawaida wakati tovuti au mfumo mtawanyo wa kimamlaka inakuomba sahihi (k.m., kwa ajili ya “Ingia na Ethereum”).

Programu inaweza [kuthibitisha sahihi](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) unayounda kwa kutumia maktaba ya wahusika wengine kama ethers.js [bila kujua ufunguo wako binafsi](https://en.wikipedia.org/wiki/Public-key_cryptography) na kuwa na uhakika kwamba _wewe_ ndiye uliyeunda sahihi hiyo.

> Kwa hakika, kwa sababu sahihi za dijitali za EOA hutumia kroptografia ya ufunguo wa umma, zinaweza kuundwa na kuthibitishwa **nje ya mnyororo**! Hivi ndivyo upigaji kura wa DAO bila gesi unavyofanya kazi — badala ya kuwasilisha kura kwenye mnyororo, sahihi za dijitali zinaweza kuundwa na kuthibitishwa nje ya mnyororo kwa kutumia maktaba za kroptografia.

Ingawa akaunti za EOA zina ufunguo binafsi, akaunti za mkataba-erevu hazina aina yoyote ya ufunguo binafsi au wa siri (hivyo "Ingia na Ethereum", n.k. haziwezi kufanya kazi moja kwa moja na akaunti za mkataba-erevu).

Tatizo ambalo EIP-1271 inalenga kutatua: tunawezaje kujua kuwa sahihi ya mkataba-erevu ni halali ikiwa mkataba-erevu hauna “siri” inayoweza kujumuishwa katika sahihi?

## EIP-1271 inafanyaje kazi?

Mikataba-erevu haina funguo binafsi zinazoweza kutumika kusaini jumbe. Basi tunawezaje kujua ikiwa sahihi ni halisi?

Naam, wazo moja ni kwamba tunaweza tu _kuuliza_ mkataba-erevu ikiwa sahihi ni halisi!

Anachofanya EIP-1271 ni kusawazisha wazo hili la “kuuliza” mkataba-erevu ikiwa sahihi fulani ni halali.

Mkataba unaotekeleza EIP-1271 lazima uwe na kitendakazi kiitwacho `isValidSignature` ambacho huchukua ujumbe na sahihi. Mkataba unaweza kisha kuendesha mantiki fulani ya uthibitishaji (vipimo havishurutishi kitu chochote maalum hapa) kisha kurudisha thamani inayoonyesha kama sahihi ni halali au la.

Ikiwa `isValidSignature` inarudisha matokeo halali, hiyo ni sawa na mkataba kusema “ndiyo, naidhinisha sahihi + ujumbe huu!”

### Kiolesura

Huu hapa ni muundo kamili katika vipimo vya EIP-1271 (tutazungumzia kigezo cha `_hash` hapo chini, lakini kwa sasa, fikiria kama ni ujumbe unaothibitishwa):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Inapaswa kurudisha iwapo sahihi iliyotolewa ni halali kwa hashi iliyotolewa
   * @param _hash      Hashi ya data itakayosainiwa
   * @param _signature Safu ya baiti za Sahihi inayohusishwa na _hash
   *
   * LAZIMA irudishe thamani ya uchawi ya bytes4 0x1626ba7e wakati kitendakazi kinafaulu.
   * LAZIMA ISIBADILISHE hali (kwa kutumia STATICCALL kwa solc < 0.5, kirekebishaji cha mwonekano kwa solc > 0.5)
   * LAZIMA iruhusu wito wa nje
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Mfano wa Utekelezaji wa EIP-1271: Safe

Mikataba inaweza kutekeleza `isValidSignature` kwa njia nyingi — vipimo havisemi mengi kuhusu utekelezaji kamili.

Mkataba mmoja mashuhuri unaotekeleza EIP-1271 ni Safe (awali Gnosis Safe).

Katika msimbo wa Safe, `isValidSignature` [imetekelezwa](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) ili sahihi ziweze kuundwa na kuthibitishwa kwa [njia mbili](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Ujumbe wa kwenye mnyororo
   1. Uundaji: mmiliki wa safe huunda muamala mpya wa safe ili “kusaini” ujumbe, akipitisha ujumbe kama data kwenye muamala. Mara tu wamiliki wa kutosha wanaposaini muamala kufikia kizingiti cha multisig, muamala hutangazwa na kuendeshwa. Katika muamala, kuna kitendakazi cha safe kiitwacho (`signMessage(bytes calldata _data)`) ambacho huongeza ujumbe kwenye orodha ya jumbe “zilizoidhinishwa”.
   2. Uthibitishaji: ita `isValidSignature` kwenye mkataba wa Safe, na kupitisha ujumbe wa kuthibitisha kama kigezo cha ujumbe na [thamani tupu kwa kigezo cha sahihi](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (yaani, `0x`). Safe itaona kuwa kigezo cha sahihi ni tupu na badala ya kuthibitisha sahihi kwa njia ya kroptografia, itajua kuendelea na kuangalia ikiwa ujumbe upo kwenye orodha ya jumbe “zilizoidhinishwa”.
2. Jumbe za nje ya mnyororo:
   1. Uundaji: mmiliki wa safe huunda ujumbe nje ya mnyororo, kisha anawapata wamiliki wengine wa safe kusaini ujumbe huo kila mmoja kivyake hadi kuwe na sahihi za kutosha kuvuka kizingiti cha idhini ya multisig.
   2. Uthibitishaji: ita `isValidSignature`. Katika kigezo cha ujumbe, pitisha ujumbe wa kuthibitishwa. Katika kigezo cha sahihi, pitisha sahihi za kila mmiliki wa safe zikiwa zimeunganishwa pamoja, moja baada ya nyingine. Safe itaangalia kuwa kuna sahihi za kutosha kufikia kizingiti **na** kwamba kila sahihi ni halali. Ikiwa ndivyo, itarudisha thamani inayoonyesha uthibitishaji uliofaulu wa sahihi.

## Kigezo cha `_hash` ni nini hasa? Kwa nini usipitishe ujumbe wote?

Huenda umegundua kwamba kitendakazi cha `isValidSignature` katika [muundo wa EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) hakichukui ujumbe wenyewe, bali kigezo cha `_hash`. Hii inamaanisha kuwa badala ya kupitisha ujumbe kamili wa urefu wowote kwa `isValidSignature`, badala yake tunapitisha hashi ya baiti 32 ya ujumbe (kwa ujumla keccak256).

Kila baiti ya calldata — yaani, data ya kigezo cha kitendakazi inayopitishwa kwa kitendakazi cha mkataba-erevu — [hugharimu gesi 16 (gesi 4 ikiwa ni baiti ya sifuri)](https://eips.ethereum.org/EIPS/eip-2028), hivyo hii inaweza kuokoa gesi nyingi ikiwa ujumbe ni mrefu.

### Vipimo vya Awali vya EIP-1271

Kuna vipimo vya EIP-1271 vinavyotumika ambavyo vina kitendakazi cha `isValidSignature` chenye kigezo cha kwanza cha aina ya `bytes` (urefu wowote, badala ya urefu usiobadilika wa `bytes32`) na jina la kigezo `message`. Hili ni [toleo la zamani](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) la kiwango cha EIP-1271.

## EIP-1271 inapaswa kutekelezwa vipi katika mikataba yangu mwenyewe?

Vipimo havina masharti mengi hapa. Utekelezaji wa Safe una mawazo mazuri:

- Unaweza kuzingatia sahihi za EOA kutoka kwa "mmiliki" wa mkataba kuwa halali.
- Unaweza kuhifadhi orodha ya jumbe zilizoidhinishwa na kuzingatia hizo tu kuwa halali.

Mwishowe, ni juu yako kama msanidi programu wa mkataba!

## Hitimisho

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) ni kiwango chenye matumizi mengi kinachoruhusu mikataba-erevu kuthibitisha sahihi. Inafungua mlango kwa mikataba-erevu kufanya kazi zaidi kama EOA — kwa mfano kutoa njia ya "Ingia na Ethereum" kufanya kazi na mikataba-erevu — na inaweza kutekelezwa kwa njia nyingi (Safe ikiwa na utekelezaji usio rahisi na wa kuvutia kuzingatia).
