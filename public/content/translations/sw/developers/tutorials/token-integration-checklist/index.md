---
title: Orodha ya ukaguzi wa ujumuishaji wa tokeni
description: Orodha ya mambo ya kuzingatia wakati wa kuingiliana na tokeni
author: "Trailofbits"
lang: sw
tags:
  - solidity
  - mikataba mahiri
  - usalama
  - tokeni
skill: intermediate
breadcrumb: Ujumuishaji wa tokeni
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Fuata orodha hii ya ukaguzi wakati wa kuingiliana na tokeni zozote. Hakikisha unaelewa hatari zinazohusiana na kila kipengee, na utoe sababu za upekee wowote kwa sheria hizi.

Kwa urahisi, [zana](https://github.com/crytic/slither#tools) zote za Slither zinaweza kuendeshwa moja kwa moja kwenye anwani ya tokeni, kama vile:

[Mafunzo ya kutumia Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Ili kufuata orodha hii ya ukaguzi, utahitaji kuwa na matokeo haya kutoka kwa Slither kwa tokeni:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # inahitaji usanidi, na matumizi ya Echidna na Manticore
```

## Mazingatio ya jumla {#general-considerations}

- **Mkataba una ukaguzi wa usalama.** Epuka kuingiliana na mikataba ambayo haina ukaguzi wa usalama. Angalia urefu wa tathmini (inayojulikana pia kama "kiwango cha juhudi"), sifa ya kampuni ya usalama, na idadi na ukali wa matokeo.
- **Umewasiliana na wasanidi.** Unaweza kuhitaji kuarifu timu yao kuhusu tukio. Tafuta anwani zinazofaa kwenye [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Wana orodha ya barua pepe ya usalama kwa matangazo muhimu.** Timu yao inapaswa kuwashauri watumiaji (kama wewe!) wakati masuala muhimu yanapopatikana au wakati uboreshaji unatokea.

## Uzingatiaji wa ERC {#erc-conformity}

Slither inajumuisha zana, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), ambayo inakagua uzingatiaji wa tokeni kwa viwango vingi vinavyohusiana vya ERC. Tumia slither-check-erc kukagua kwamba:

- **Hamisho na transferFrom zinarudisha boolean.** Tokeni kadhaa hazirudishi boolean kwenye vipengele hivi. Kutokana na hili, wito wao katika mkataba unaweza kushindwa.
- **Vipengele vya name, decimals, na symbol vipo ikiwa vinatumika.** Vipengele hivi ni vya hiari katika kiwango cha ERC-20 na vinaweza visiwepo.
- **Decimals inarudisha uint8.** Tokeni kadhaa zinarudisha uint256 kimakosa. Ikiwa ndivyo ilivyo, hakikisha thamani iliyorudishwa iko chini ya 255.
- **Tokeni inapunguza [hali ya mbio ya ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) inayojulikana.** Kiwango cha ERC-20 kina hali ya mbio ya ERC-20 inayojulikana ambayo lazima ipunguzwe ili kuzuia washambuliaji kuiba tokeni.
- **Tokeni sio tokeni ya ERC-777 na haina wito wa kipengele cha nje katika hamisho na transferFrom.** Wito wa nje katika vipengele vya hamisho unaweza kusababisha kuingia tena (reentrancies).

Slither inajumuisha zana, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), ambayo inazalisha majaribio ya kitengo na sifa za usalama zinazoweza kugundua dosari nyingi za kawaida za ERC. Tumia slither-prop kukagua kwamba:

- **Mkataba unapitisha majaribio yote ya kitengo na sifa za usalama kutoka kwa slither-prop.** Endesha majaribio ya kitengo yaliyozalishwa, kisha uangalie sifa na [Echidna](https://github.com/crytic/echidna) na [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Hatimaye, kuna sifa fulani ambazo ni ngumu kutambua kiotomatiki. Kagua kwa mikono kwa masharti haya:

- **Hamisho na transferFrom hazipaswi kuchukua ada.** Tokeni zinazopunguza thamani (deflationary) zinaweza kusababisha tabia isiyotarajiwa.
- **Riba inayoweza kupatikana kutoka kwa tokeni inazingatiwa.** Baadhi ya tokeni husambaza riba kwa wamiliki wa tokeni. Riba hii inaweza kunaswa katika mkataba ikiwa haitazingatiwa.

## Muundo wa mkataba {#contract-composition}

- **Mkataba unaepuka utata usiohitajika.** Tokeni inapaswa kuwa mkataba rahisi; tokeni yenye msimbo tata inahitaji kiwango cha juu cha ukaguzi. Tumia [printa ya muhtasari wa binadamu](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) ya Slither kutambua msimbo tata.
- **Mkataba unatumia SafeMath.** Mikataba ambayo haitumii SafeMath inahitaji kiwango cha juu cha ukaguzi. Kagua mkataba kwa mikono kwa matumizi ya SafeMath.
- **Mkataba una vipengele vichache tu visivyohusiana na tokeni.** Vipengele visivyohusiana na tokeni huongeza uwezekano wa suala katika mkataba. Tumia [printa ya muhtasari wa mkataba](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) ya Slither kukagua kwa mapana msimbo uliotumika katika mkataba.
- **Tokeni ina anwani moja tu.** Tokeni zilizo na sehemu nyingi za kuingilia kwa sasisho za salio zinaweza kuvunja uwekaji hesabu wa ndani kulingana na anwani (k.m., `balances[token_address][msg.sender]` inaweza isionyeshe salio halisi).

## Haki za mmiliki {#owner-privileges}

- **Tokeni haiwezi kuboreshwa.** Mikataba inayoweza kuboreshwa inaweza kubadilisha sheria zake kadiri muda unavyopita. Tumia [printa ya muhtasari wa binadamu](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) ya Slither kubaini ikiwa mkataba unaweza kuboreshwa.
- **Mmiliki ana uwezo mdogo wa ufuzi.** Wamiliki wenye nia mbaya au waliodukuliwa wanaweza kutumia vibaya uwezo wa ufuzi. Tumia [printa ya muhtasari wa binadamu](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) ya Slither kukagua uwezo wa ufuzi, na ufikirie kukagua msimbo kwa mikono.
- **Tokeni haiwezi kusitishwa.** Wamiliki wenye nia mbaya au waliodukuliwa wanaweza kunasa mikataba inayotegemea tokeni zinazoweza kusitishwa. Tambua msimbo unaoweza kusitishwa kwa mikono.
- **Mmiliki hawezi kuweka mkataba kwenye orodha nyeusi.** Wamiliki wenye nia mbaya au waliodukuliwa wanaweza kunasa mikataba inayotegemea tokeni zilizo na orodha nyeusi. Tambua vipengele vya kuweka kwenye orodha nyeusi kwa mikono.
- **Timu iliyo nyuma ya tokeni inajulikana na inaweza kuwajibishwa kwa unyanyasaji.** Mikataba iliyo na timu za wasanidi wasiojulikana, au inayokaa katika makazi ya kisheria inapaswa kuhitaji kiwango cha juu cha ukaguzi.

## Uhaba wa tokeni {#token-scarcity}

Ukaguzi wa masuala ya uhaba wa tokeni unahitaji ukaguzi wa mikono. Angalia masharti haya:

- **Hakuna mtumiaji anayemiliki sehemu kubwa ya usambazaji.** Ikiwa watumiaji wachache wanamiliki tokeni nyingi, wanaweza kushawishi shughuli kulingana na mgawanyo wa tokeni.
- **Jumla ya usambazaji inatosha.** Tokeni zilizo na jumla ya usambazaji mdogo zinaweza kubadilishwa kwa urahisi.
- **Tokeni zinapatikana katika mabadilishano zaidi ya machache.** Ikiwa tokeni zote ziko katika ubadilishanaji mmoja, udukuzi wa ubadilishanaji unaweza kuhatarisha mkataba unaotegemea tokeni.
- **Watumiaji wanaelewa hatari zinazohusiana na fedha nyingi au mikopo ya haraka (flash loans).** Mikataba inayotegemea salio la tokeni lazima izingatie kwa uangalifu washambuliaji walio na fedha nyingi au mashambulizi kupitia mikopo ya haraka.
- **Tokeni hairuhusu ufuzi wa haraka (flash minting)**. Ufuzi wa haraka unaweza kusababisha mabadiliko makubwa katika salio na jumla ya usambazaji, ambayo inahitaji ukaguzi mkali na wa kina wa mzidio katika uendeshaji wa tokeni.