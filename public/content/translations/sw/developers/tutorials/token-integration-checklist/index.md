---
title: Orodha hakiki ya muunganisho wa tokeni
description: Orodha hakiki ya mambo ya kuzingatia unaposhughulika na tokeni
author: "Trailofbits"
lang: sw
tags: [ "uimara", "mikataba erevu", "usalama", "tokeni" ]
skill: intermediate
published: 2020-08-13
source: Kujenga mikataba salama
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Fuata orodha hakiki hii unaposhughulika na tokeni holela. Hakikisha unaelewa hatari zinazohusiana na kila kipengee, na uthibitishe uondoaji wowote wa sheria hizi.

Kwa urahisi, huduma zote za Slither [utilities](https://github.com/crytic/slither#tools) zinaweza kuendeshwa moja kwa moja kwenye anwani ya tokeni, kama vile:

[Mafunzo ya kutumia Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Ili kufuata orodha hakiki hii, utahitaji kuwa na matokeo haya kutoka kwa Slither kwa ajili ya tokeni:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # inahitaji usanidi, na matumizi ya Echidna na Manticore
```

## Mambo ya jumla ya kuzingatia {#general-considerations}

- **Mkataba una ukaguzi wa usalama.** Epuka kushughulika na mikataba ambayo haina ukaguzi wa usalama. Angalia urefu wa tathmini (pia inajulikana kama “kiwango cha juhudi”), sifa ya kampuni ya usalama, na idadi na ukali wa matokeo.
- **Umewasiliana na wasanidi programu.** Huenda ukahitaji kuarifu timu yao kuhusu tukio. Tafuta anwani zinazofaa kwenye [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Wana orodha ya barua pepe ya usalama kwa matangazo muhimu.** Timu yao inapaswa kuwashauri watumiaji (kama wewe!) masuala muhimu yanapopatikana au maboresho yanapotokea.

## Upatanifu wa ERC {#erc-conformity}

Slither inajumuisha huduma, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), ambayo hukagua upatanifu wa tokeni na viwango vingi vinavyohusiana na ERC. Tumia slither-check-erc kukagua kuwa:

- **Transfer na transferFrom hurejesha boolean.** Tokeni kadhaa hazirejeshi boolean kwenye vipengele hivi. Kwa sababu hiyo, wito wao katika mkataba unaweza kushindwa.
- **Vipengele vya jina, desimali, na alama vipo ikiwa vinatumika.** Vipengele hivi ni vya hiari katika kiwango cha ERC20 na huenda visiwepo.
- **Desimali hurejesha uint8.** Tokeni kadhaa hurejesha uint256 kimakosa. Ikiwa hali ni hii, hakikisha thamani iliyorejeshwa iko chini ya 255.
- **Tokeni inapunguza [hali ya mbio ya ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) inayojulikana.** Kiwango cha ERC20 kina hali ya mbio ya ERC20 inayojulikana ambayo lazima ipunguzwe ili kuzuia washambuliaji kuiba tokeni.
- **Tokeni si tokeni ya ERC777 na haina wito wa kipengele cha nje katika transfer na transferFrom.** Wito wa nje katika vipengele vya uhamisho unaweza kusababisha uingiaji tena.

Slither inajumuisha huduma, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), ambayo hutengeneza majaribio ya kitengo na sifa za usalama ambazo zinaweza kugundua dosari nyingi za kawaida za ERC. Tumia slither-prop kukagua kuwa:

- **Mkataba unapita majaribio yote ya kitengo na sifa za usalama kutoka kwa slither-prop.** Endesha majaribio ya kitengo yaliyotengenezwa, kisha angalia sifa na [Echidna](https://github.com/crytic/echidna) na [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Mwishowe, kuna sifa fulani ambazo ni ngumu kuzitambua kiotomatiki. Kagua hali hizi kwa mikono:

- **Transfer na transferFrom hazipaswi kuchukua ada.** Tokeni za mfumuko wa bei zinaweza kusababisha tabia zisizotarajiwa.
- **Riba inayoweza kupatikana kutoka kwa tokeni inazingatiwa.** Baadhi ya tokeni husambaza riba kwa wamiliki wa tokeni. Riba hii inaweza kunaswa katika mkataba ikiwa haitazingatiwa.

## Muundo wa mkataba {#contract-composition}

- **Mkataba unaepuka utata usiohitajika.** Tokeni inapaswa kuwa mkataba rahisi; tokeni yenye msimbo tata inahitaji kiwango cha juu cha ukaguzi. Tumia [printa ya muhtasari wa binadamu](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) ya Slither kutambua msimbo tata.
- **Mkataba unatumia SafeMath.** Mikataba isiyotumia SafeMath inahitaji kiwango cha juu cha ukaguzi. Kagua mkataba kwa mikono kwa matumizi ya SafeMath.
- **Mkataba una vipengele vichache tu visivyohusiana na tokeni.** Vipengele visivyohusiana na tokeni huongeza uwezekano wa suala katika mkataba. Tumia [printa ya muhtasari wa mkataba](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) ya Slither kukagua kwa upana msimbo uliotumika katika mkataba.
- **Tokeni ina anwani moja tu.** Tokeni zenye sehemu nyingi za kuingilia kwa ajili ya masasisho ya salio zinaweza kuvunja utunzaji wa vitabu vya ndani kulingana na anwani (k.m., `balances[token_address][msg.sender]` inaweza isionyeshe salio halisi).

## Haki za mmiliki {#owner-privileges}

- **Tokeni haiwezi kuboreshwa.** Mikataba inayoweza kuboreshwa inaweza kubadilisha sheria zake baada ya muda. Tumia [printa ya muhtasari wa binadamu](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) ya Slither kubaini kama mkataba unaweza kuboreshwa.
- **Mmiliki ana uwezo mdogo wa kutengeneza.** Wamiliki wenye nia mbaya au walioathiriwa wanaweza kutumia vibaya uwezo wa kutengeneza. Tumia [printa ya muhtasari wa binadamu](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) ya Slither kukagua uwezo wa kutengeneza, na fikiria kukagua msimbo kwa mikono.
- **Tokeni haiwezi kusitishwa.** Wamiliki wenye nia mbaya au walioathiriwa wanaweza kunasa mikataba inayotegemea tokeni zinazoweza kusitishwa. Tambua msimbo unaoweza kusitishwa kwa mikono.
- **Mmiliki hawezi kuorodhesha mkataba.** Wamiliki wenye nia mbaya au walioathiriwa wanaweza kunasa mikataba inayotegemea tokeni zenye orodha nyeusi. Tambua vipengele vya orodha nyeusi kwa mikono.
- **Timu iliyo nyuma ya tokeni inajulikana na inaweza kuwajibishwa kwa matumizi mabaya.** Mikataba yenye timu za wasanidi wasiojulikana, au iliyo katika hifadhi za kisheria inapaswa kuhitaji kiwango cha juu cha ukaguzi.

## Uhaba wa tokeni {#token-scarcity}

Ukaguzi wa masuala ya uhaba wa tokeni unahitaji ukaguzi wa mikono. Angalia hali hizi:

- **Hakuna mtumiaji anayemiliki idadi kubwa ya usambazaji.** Ikiwa watumiaji wachache wanamiliki idadi kubwa ya tokeni, wanaweza kuathiri shughuli kulingana na ugawaji wa tokeni.
- **Jumla ya usambazaji inatosha.** Tokeni zenye jumla ya usambazaji mdogo zinaweza kudanganywa kwa urahisi.
- **Tokeni zinapatikana katika zaidi ya exchange chache.** Ikiwa tokeni zote ziko katika exchange moja, udukuzi wa exchange unaweza kuathiri mkataba unaotegemea tokeni.
- **Watumiaji wanaelewa hatari zinazohusiana na fedha nyingi au mikopo ya haraka.** Mikataba inayotegemea salio la tokeni lazima izingatie kwa makini washambuliaji wenye fedha nyingi au mashambulizi kupitia mikopo ya haraka.
- **Tokeni hairuhusu utengenezaji wa haraka**. Utengenezaji wa haraka unaweza kusababisha mabadiliko makubwa katika salio na jumla ya usambazaji, ambayo yanahitaji ukaguzi mkali na wa kina wa mfuriko katika utendaji wa tokeni.
