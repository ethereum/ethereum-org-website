---
title: Orodha ya ukaguzi wa usalama wa mkataba mahiri
description: Mtiririko wa kazi uliopendekezwa wa kuandika mikataba mahiri salama
author: "Trailofbits"
tags:
  - mikataba mahiri
  - usalama
  - solidity
skill: intermediate
breadcrumb: Orodha ya ukaguzi wa usalama
lang: sw
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Orodha ya ukaguzi wa uundaji wa mkataba mahiri {#smart-contract-development-checklist}

Huu hapa ni mchakato wa kiwango cha juu tunaopendekeza uufuate unapoandika mikataba mahiri yako.

Kagua matatizo ya usalama yanayojulikana:

- Kagua mikataba yako ukitumia [Slither](https://github.com/crytic/slither). Ina zaidi ya vigunduzi 100 vilivyojengewa ndani kwa ajili ya udhaifu wa kawaida. Iendeshe kwenye kila uingizaji (check-in) wa msimbo mpya na uhakikishe inapata ripoti safi (au tumia hali ya kuchuja kunyamazisha matatizo fulani).
- Endesha Slither katika CI, kwa mfano ukitumia [slither-action](https://github.com/crytic/slither-action) kwenye GitHub, ili matatizo ya usalama yaonekane kwenye maombi ya kuvuta (pull requests).

Zingatia vipengele maalum vya mkataba wako:

- Je, mikataba yako inaweza kuboreshwa? Kagua msimbo wako wa uboreshaji kwa kasoro ukitumia [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks). Tumeandika njia 17 ambazo uboreshaji unaweza kuharibika.
- Je, mikataba yako inadai kufuata ERCs? Iangalie ukitumia [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Zana hii hutambua mara moja mikengeuko kutoka kwa vipimo sita vya kawaida.
- Je, unaunganisha na tokeni za wahusika wengine? Kagua [orodha yetu ya ukaguzi wa ujumuishaji wa tokeni](/developers/tutorials/token-integration-checklist/) kabla ya kutegemea mikataba ya nje.

Kagua kwa macho vipengele muhimu vya usalama vya msimbo wako:

- Kagua kichapishi cha [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) cha Slither. Epuka matatizo ya kufunika bila kukusudia na uwekaji mstari wa C3.
- Kagua kichapishi cha [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) cha Slither. Hutoa ripoti ya mwonekano wa utendakazi na vidhibiti vya ufikiaji.
- Kagua kichapishi cha [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) cha Slither. Hutoa ripoti ya vidhibiti vya ufikiaji kwenye vigeu vya hali.

Andika sifa muhimu za usalama na utumie vijenereta vya majaribio vya kiotomatiki kuzitathmini:

- Jifunze [kuandika sifa za usalama kwa msimbo wako](/developers/tutorials/guide-to-smart-contract-security-tools/). Ni ngumu mwanzoni, lakini ni shughuli muhimu zaidi kwa kufikia matokeo mazuri. Pia ni sharti la kutumia mbinu zozote za hali ya juu katika mafunzo haya.
- Fafanua sifa za usalama katika Solidity, kwa matumizi na vifazari (fuzzers) kama vile [Echidna](https://github.com/crytic/echidna) na [Medusa](https://github.com/crytic/medusa), na zana za utekelezaji wa kiishara kama vile [hevm](https://hevm.dev/). Zingatia mashine yako ya hali, vidhibiti vya ufikiaji, shughuli za hesabu, mwingiliano wa nje, na ufuataji wa viwango.
- Fafanua sifa za usalama ukitumia [API ya Python ya Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Zingatia urithi, utegemezi wa vigeu, vidhibiti vya ufikiaji, na matatizo mengine ya kimuundo.
- Endesha majaribio yako ya sifa kwenye kila uwasilishaji (commit) katika CI (kwa mfano, GitHub Actions) ili kila mtu kwenye timu yako aweze kuona kwa urahisi kuwa yamefaulu. Majaribio yanayofeli yanaweza kuzuia miunganisho (merges).

Hatimaye, kuwa mwangalifu na matatizo ambayo zana za kiotomatiki haziwezi kupata kwa urahisi:

- Ukosefu wa faragha: kila mtu mwingine anaweza kuona miamala yako inapokuwa kwenye foleni katika bwawa (pool)
- Miamala ya front running
- Shughuli za kriptografia
- Mwingiliano hatari na vipengele vya nje vya fedha zilizogatuliwa (DeFi)

## Omba msaada {#ask-for-help}

[Saa za ofisi za Ethereum](https://meetings.hubspot.com/trailofbits/office-hours) hufanyika kila Jumanne mchana. Vipindi hivi vya saa 1, vya mtu mmoja mmoja ni fursa ya kutuuliza maswali yoyote uliyo nayo kuhusu usalama, kutatua matatizo ukitumia zana zetu, na kupata maoni kutoka kwa wataalamu kuhusu mbinu yako ya sasa. Tutakusaidia kupitia mwongozo huu.

Jiunge na Slack yetu: [Empire Hacking](https://slack.empirehacking.nyc/). Tunapatikana kila wakati katika chaneli za #crytic na #ethereum ikiwa una maswali yoyote.
