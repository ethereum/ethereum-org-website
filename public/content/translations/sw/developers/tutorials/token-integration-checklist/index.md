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

Fuata orodha hii ya ukaguzi unapoingiliana na tokeni zozote. Hakikisha unaelewa hatari zinazohusiana na kila kipengee, na utoe sababu za vighairi vyovyote kwa sheria hizi.

Kwa urahisi, [huduma](https://github.com/crytic/slither#tools) zote za Slither zinaweza kuendeshwa moja kwa moja kwenye anwani ya tokeni, kama vile:

[Mafunzo ya kutumia Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

Kuleta msimbo wa chanzo uliothibitishwa kutoka Etherscan kunahitaji [ufunguo wa API wa Etherscan](https://docs.etherscan.io/set-up-your-api-key) (ufunguo wa bure unafanya kazi). Uipitishe na `--etherscan-apikey`, au weka kigezo cha mazingira cha `ETHERSCAN_API_KEY`, ambacho Slither pia inasoma:

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

Bila ufunguo, amri inashindwa na hitilafu ya `Invalid etherscan API Key`.

Ili kufuata orodha hii ya ukaguzi, utahitaji kuwa na matokeo haya kutoka kwa Slither kwa tokeni:

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # inahitaji usanidi, na matumizi ya Echidna
```

## Mazingatio ya jumla {#general-considerations}

- **Mkataba una ukaguzi wa usalama.** Epuka kuingiliana na mikataba ambayo haina ukaguzi wa usalama. Angalia urefu wa tathmini (inayojulikana pia kama "kiwango cha juhudi"), sifa ya kampuni ya usalama, na idadi na ukali wa matokeo.
- **Umewasiliana na wasanidi.** Unaweza kuhitaji kuarifu timu yao kuhusu tukio. Tafuta anwani zinazofaa kwenye [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Wana orodha ya barua pepe ya usalama kwa matangazo muhimu.** Timu yao inapaswa kuwashauri watumiaji (kama wewe!) wakati masuala muhimu yanapopatikana au wakati uboreshaji unatokea.

## Utiifu wa ERC {#erc-conformity}

Slither inajumuisha huduma, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), ambayo inakagua utiifu wa tokeni kwa viwango vingi vinavyohusiana vya ERC. Tumia slither-check-erc kukagua kwamba:

- **Transfer na transferFrom zinarudisha boolean.** Tokeni kadhaa hazirudishi boolean kwenye vipengele hivi. Kwa sababu hiyo, miito yao katika mkataba inaweza kushindwa.
- **Vipengele vya name, decimals, na symbol vipo ikiwa vinatumika.** Vipengele hivi ni vya hiari katika kiwango cha ERC-20 na vinaweza visiwepo.
- **Decimals inarudisha uint8.** Tokeni kadhaa zinarudisha uint256 kimakosa. Ikiwa ndivyo ilivyo, hakikisha thamani iliyorudishwa iko chini ya 255.
- **Tokeni inapunguza [hali ya mbio ya ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) inayojulikana.** Kiwango cha ERC-20 kina hali ya mbio ya ERC-20 inayojulikana ambayo lazima ipunguzwe ili kuzuia washambuliaji kuiba tokeni.
- **Tokeni si tokeni ya ERC-777 na haina mwito wa kipengele cha nje katika transfer na transferFrom.** Miito ya nje katika vipengele vya hamisho inaweza kusababisha kuingia tena (reentrancies).

Slither inajumuisha huduma, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), ambayo inazalisha majaribio ya kitengo na sifa za usalama zinazoweza kugundua dosari nyingi za kawaida za ERC. Tumia slither-prop kukagua kwamba:

- **Mkataba unapitisha majaribio yote ya kitengo na sifa za usalama kutoka kwa slither-prop.** Endesha majaribio ya kitengo yaliyozalishwa, kisha uangalie sifa na [Echidna](https://github.com/crytic/echidna).

Hatimaye, kuna sifa fulani ambazo ni ngumu kutambua kiotomatiki. Kagua hali hizi kwa mikono:

- **Transfer na transferFrom hazipaswi kuchukua ada.** Tokeni za kupunguza thamani (deflationary) zinaweza kusababisha tabia isiyotarajiwa.
- **Riba inayoweza kupatikana kutoka kwa tokeni inazingatiwa.** Baadhi ya tokeni husambaza riba kwa wamiliki wa tokeni. Riba hii inaweza kunaswa katika mkataba ikiwa haitazingatiwa.

## Muundo wa mkataba {#contract-composition}

- **Mkataba unaepuka utata usiohitajika.** Tokeni inapaswa kuwa mkataba rahisi; tokeni yenye msimbo tata inahitaji kiwango cha juu cha ukaguzi. Tumia [printa ya muhtasari wa binadamu](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) ya Slither kutambua msimbo tata.
- **Mkataba unatumia hesabu iliyokaguliwa.** Solidity 0.8 na matoleo mapya zaidi yanatengua kwenye mzidio na upungufu (underflow) kwa chaguo-msingi; mikataba ya zamani inahitaji SafeMath kwa ulinzi sawa. Mikataba iliyokusanywa na matoleo ya zamani bila SafeMath, au inayotumia vizuizi vya `unchecked`, inahitaji kiwango cha juu cha ukaguzi. Kagua hesabu kwa mikono, hasa ndani ya vizuizi vya `unchecked` na inline assembly.
- **Mkataba una vipengele vichache tu visivyohusiana na tokeni.** Vipengele visivyohusiana na tokeni vinaongeza uwezekano wa suala katika mkataba. Tumia [printa ya muhtasari wa mkataba](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) ya Slither kukagua kwa mapana msimbo uliotumika katika mkataba.
- **Tokeni ina anwani moja tu.** Tokeni zilizo na sehemu nyingi za kuingilia kwa sasisho za salio zinaweza kuvunja uwekaji hesabu wa ndani kulingana na anwani (k.m., `balances[token_address][msg.sender]` inaweza isionyeshe salio halisi).

## Haki za mmiliki {#owner-privileges}

- **Tokeni haiwezi kuboreshwa.** Mikataba inayoweza kuboreshwa inaweza kubadilisha sheria zake kadiri muda unavyopita. Tumia [printa ya muhtasari wa binadamu](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) ya Slither kubaini ikiwa mkataba unaweza kuboreshwa.
- **Mmiliki ana uwezo mdogo wa ufuzi.** Wamiliki wenye nia mbaya au waliodukuliwa wanaweza kutumia vibaya uwezo wa ufuzi. Tumia [printa ya muhtasari wa binadamu](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) ya Slither kukagua uwezo wa ufuzi, na ufikirie kukagua msimbo kwa mikono.
- **Tokeni haiwezi kusitishwa.** Wamiliki wenye nia mbaya au waliodukuliwa wanaweza kunasa mikataba inayotegemea tokeni zinazoweza kusitishwa. Tambua msimbo unaoweza kusitishwa kwa mikono.
- **Mmiliki hawezi kuweka mkataba kwenye orodha nyeusi.** Wamiliki wenye nia mbaya au waliodukuliwa wanaweza kunasa mikataba inayotegemea tokeni zilizo na orodha nyeusi. Tambua vipengele vya kuweka kwenye orodha nyeusi kwa mikono.
- **Timu iliyo nyuma ya tokeni inajulikana na inaweza kuwajibishwa kwa unyanyasaji.** Mikataba iliyo na timu za wasanidi wasiojulikana, au inayokaa katika makazi ya kisheria inapaswa kuhitaji kiwango cha juu cha ukaguzi.

## Uhaba wa tokeni {#token-scarcity}

Ukaguzi wa masuala ya uhaba wa tokeni unahitaji ukaguzi wa mikono. Angalia hali hizi:

- **Hakuna mtumiaji anayemiliki sehemu kubwa ya usambazaji.** Ikiwa watumiaji wachache wanamiliki sehemu kubwa ya tokeni, wanaweza kuathiri shughuli kulingana na mgawanyo wa tokeni.
- **Jumla ya usambazaji inatosha.** Tokeni zilizo na jumla ya usambazaji mdogo zinaweza kudanganywa kwa urahisi.
- **Tokeni zinapatikana katika mabadilishano (exchanges) zaidi ya machache.** Ikiwa tokeni zote ziko katika mabadilishano moja, udukuzi wa mabadilishano hayo unaweza kuhatarisha mkataba unaotegemea tokeni hiyo.
- **Watumiaji wanaelewa hatari zinazohusiana na fedha nyingi au mikopo ya haraka (flash loans).** Mikataba inayotegemea salio la tokeni lazima izingatie kwa uangalifu washambuliaji wenye fedha nyingi au mashambulizi kupitia mikopo ya haraka.
- **Tokeni hairuhusu ufuzi wa haraka (flash minting).** Ufuzi wa haraka unaweza kusababisha mabadiliko makubwa katika salio na jumla ya usambazaji, ambayo yanahitaji ukaguzi mkali na wa kina wa mzidio katika uendeshaji wa tokeni.
## Tokeni za ERC-20 zisizo za kawaida zinazojulikana {#known-non-standard-erc20-tokens}

Itifaki zinazoruhusu ujumuishaji na tokeni zozote lazima zichukue tahadhari kushughulikia ipasavyo baadhi ya tokeni za ERC-20 zisizo za kawaida zinazojulikana sana. Rejelea [orodha ya tokeni zisizo za kawaida](https://secure-contracts.com/development-guidelines/non-standard-tokens.html) kwa tokeni zinazojulikana sana ambazo hubeba hatari za ziada.

## Tokeni za ERC-721 {#erc721-tokens}

### Ukaguzi wa utiifu wa ERC-721 {#erc721-conformity-checks}

Tabia ya baadhi ya mikataba inaweza kutofautiana na vipimo asili vya ERC. Kagua hali zifuatazo kwa mikono:

- **Mahamisho ya tokeni kwenda kwenye anwani ya 0x0 yanatengua.** Baadhi ya tokeni zinaruhusu mahamisho kwenda 0x0 na huchukulia tokeni zilizotumwa kwenye anwani hiyo kuwa zimeteketezwa; hata hivyo, kiwango cha ERC-721 kinahitaji kwamba mahamisho kama hayo yatengue.
- **Vipengele vya `safeTransferFrom` vinatekelezwa kwa sahihi sahihi.** Baadhi ya mikataba ya tokeni haitekelezi vipengele hivi. Kuhamisha NFT kwenye mojawapo ya mikataba hiyo kunaweza kusababisha upotevu wa mali.
- **Vipengele vya `name`, `decimals`, na `symbol` vipo ikiwa vinatumika.** Vipengele hivi ni vya hiari katika kiwango cha ERC-721 na vinaweza visiwepo.
- **Ikiwa inatumika, `decimals` inarudisha `uint8(0)`.** Thamani nyingine ni batili.
- **Vipengele vya `name` na `symbol` vinaweza kurudisha mfuatano tupu (empty string).** Tabia hii inaruhusiwa na kiwango.
- **Kipengele cha `ownerOf` kinatengua ikiwa `tokenId` ni batili au inarejelea tokeni ambayo tayari imeteketezwa.** Kipengele hakiwezi kurudisha 0x0. Tabia hii inahitajika na kiwango lakini inaweza isitekelezwe kwa usahihi kila wakati.
- **Hamisho la NFT linafuta idhini zake.** Hili linahitajika na kiwango.
- **Kitambulisho cha tokeni cha NFT hakiwezi kubadilishwa wakati wa uhai wake.** Hili linahitajika na kiwango.

### Hatari za kawaida za kiwango cha ERC-721 {#common-risks-of-the-erc721-standard}

Punguza hatari zinazohusiana na mikataba ya ERC-721 kwa kufanya ukaguzi wa mikono wa hali zifuatazo:

- **Mwito wa kurudi (callback) wa `onERC721Received` unazingatiwa.** Miito ya nje katika vipengele vya hamisho inaweza kusababisha kuingia tena, hasa wakati mwito wa kurudi si wazi (k.m., katika miito ya [`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code)).
- **Wakati NFT inafuzwa, inahamishwa kwa usalama kwenye mkataba mahiri.** Ikiwa kipengele cha ufuzi kipo, kinapaswa kufanya kazi sawa na `safeTransferFrom` na kushughulikia ufuzi wa tokeni mpya kwenye mkataba mahiri ipasavyo, kuzuia upotevu wa mali.
- **Kuteketeza tokeni kunafuta idhini zake.** Ikiwa kipengele cha kuteketeza kipo, kinapaswa kufuta idhini za awali za tokeni.
