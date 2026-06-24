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

Huu hapa ni mchakato wa kiwango cha juu tunaopendekeza uufuate unapokuwa unaandika mikataba mahiri yako.

Angalia masuala ya usalama yanayojulikana:

- Kagua mikataba yako ukitumia [Slither](https://github.com/crytic/slither). Ina zaidi ya vigunduzi 40 vilivyojengewa ndani kwa ajili ya udhaifu wa kawaida. Iendeshe kwenye kila uingizaji wa msimbo mpya na uhakikishe inapata ripoti safi (au tumia hali ya kuchuja ili kunyamazisha masuala fulani).
- Kagua mikataba yako ukitumia [Crytic](https://crytic.io/). Inakagua masuala 50 ambayo Slither haikagui. Crytic inaweza kusaidia timu yako kufuatiliana pia, kwa kuibua kwa urahisi masuala ya usalama katika Maombi ya Kuvuta (Pull Requests) kwenye GitHub.

Zingatia vipengele maalum vya mkataba wako:

- Je, mikataba yako inaweza kuboreshwa? Kagua msimbo wako wa uboreshaji kwa kasoro ukitumia [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) au [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Tumeandika njia 17 ambazo uboreshaji unaweza kwenda mrama.
- Je, mikataba yako inadai kufuata ERCs? Ikague ukitumia [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Zana hii inatambua papo hapo mikengeuko kutoka kwenye vipimo sita vya kawaida.
- Je, unaunganisha na tokeni za wahusika wengine? Kagua [orodha yetu ya ukaguzi wa ujumuishaji wa tokeni](/developers/tutorials/token-integration-checklist/) kabla ya kutegemea mikataba ya nje.

Kagua kwa macho vipengele muhimu vya usalama vya msimbo wako:

- Kagua kichapishi cha [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) cha Slither. Epuka masuala ya kufunika bila kukusudia na uwekaji mstari wa C3.
- Kagua kichapishi cha [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) cha Slither. Kinaripoti mwonekano wa utendakazi na vidhibiti vya ufikiaji.
- Kagua kichapishi cha [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) cha Slither. Kinaripoti vidhibiti vya ufikiaji kwenye vigezo vya hali.

Andika sifa muhimu za usalama na utumie vijenereta vya majaribio vya kiotomatiki kuzitathmini:

- Jifunze [kuandika sifa za usalama kwa ajili ya msimbo wako](/developers/tutorials/guide-to-smart-contract-security-tools/). Ni ngumu mwanzoni, lakini ni shughuli moja muhimu zaidi kwa kufikia matokeo mazuri. Pia ni sharti la kutumia mbinu zozote za hali ya juu katika mafunzo haya.
- Fafanua sifa za usalama katika Solidity, kwa matumizi na [Echidna](https://github.com/crytic/echidna) na [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Zingatia mashine yako ya hali, vidhibiti vya ufikiaji, shughuli za hesabu, mwingiliano wa nje, na ufuataji wa viwango.
- Fafanua sifa za usalama ukitumia [API ya Python ya Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Zingatia urithi, utegemezi wa vigezo, vidhibiti vya ufikiaji, na masuala mengine ya kimuundo.
- Endesha majaribio yako ya sifa kwenye kila uwasilishaji ukitumia [Crytic](https://crytic.io). Crytic inaweza kutumia na kutathmini majaribio ya sifa za usalama ili kila mtu kwenye timu yako aweze kuona kwa urahisi kwamba yamefaulu kwenye GitHub. Majaribio yanayofeli yanaweza kuzuia uwasilishaji.

Hatimaye, kuwa mwangalifu na masuala ambayo zana za kiotomatiki haziwezi kupata kwa urahisi:

- Ukosefu wa faragha: kila mtu mwingine anaweza kuona miamala yako inapokuwa kwenye foleni katika bwawa
- Miamala ya kutangulia (front running)
- Shughuli za kriptografia
- Mwingiliano hatari na vipengele vya nje vya fedha zilizogatuliwa (DeFi)

## Omba msaada {#ask-for-help}

[Saa za ofisi za Ethereum](https://calendly.com/dan-trailofbits/office-hours) hufanyika kila Jumanne mchana. Vipindi hivi vya saa 1, vya mtu mmoja mmoja ni fursa ya kutuuliza maswali yoyote uliyo nayo kuhusu usalama, kutatua matatizo ukitumia zana zetu, na kupata maoni kutoka kwa wataalamu kuhusu mbinu yako ya sasa. Tutakusaidia kupitia mwongozo huu.

Jiunge na Slack yetu: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Tunapatikana kila wakati katika chaneli za #crytic na #ethereum ikiwa una maswali yoyote.