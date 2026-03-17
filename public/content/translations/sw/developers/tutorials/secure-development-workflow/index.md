---
title: Orodha hakiki ya usalama wa mkataba-erevu
description: Mtiririko wa kazi unaopendekezwa wa kuandika mikataba-erevu salama
author: "Trailofbits"
tags: ["smart contracts", "security", "solidity"]
skill: intermediate
lang: sw
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Orodha hakiki ya uendelezaji wa mkataba-erevu {#smart-contract-development-checklist}

Huu hapa ni mchakato wa kiwango cha juu tunaopendekeza ufuate unapoandika mikataba yako-erevu.

Angalia masuala ya usalama yanayojulikana:

- Pitia mikataba yako na [Slither](https://github.com/crytic/slither). Ina vigunduzi zaidi ya 40 vilivyojengewa ndani kwa ajili ya udhaifu wa kawaida. Iendeshe kwa kila uwasilishaji wa msimbo mpya na hakikisha inapata ripoti safi (au tumia hali ya kutatua kunyamazisha masuala fulani).
- Pitia mikataba yako na [Crytic](https://crytic.io/). Hukagua masuala 50 ambayo Slither haikagui. Crytic inaweza kusaidia timu yako kuendelea kufuatiliana pia, kwa kuibua kwa urahisi masuala ya usalama katika Maombi ya Kuunganisha (Pull Requests) kwenye GitHub.

Fikiria vipengele maalum vya mkataba wako:

- Je, mikataba yako inaweza kusasishwa? Pitia msimbo wako wa uwezo wa kusasishwa kwa ajili ya dosari ukitumia [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) au [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Tumeandika njia 17 ambazo masasisho yanaweza kwenda mrama.
- Je, mikataba yako inadai kukidhi ERC? Zikague na [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Zana hii hutambua papo hapo mikengeuko kutoka kwa sifa sita za kawaida.
- Je, unaunganisha na tokeni za wahusika wengine? Pitia [orodha hakiki yetu ya uunganishaji wa tokeni](/developers/tutorials/token-integration-checklist/) kabla ya kutegemea mikataba ya nje.

Kagua kwa macho vipengele muhimu vya usalama vya msimbo wako:

- Pitia printa ya [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) ya Slither. Epuka kuficha kusiko kwa kukusudia na masuala ya urasmiishaji wa C3.
- Pitia printa ya [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) ya Slither. Huripoti mwonekano wa kazi na vidhibiti vya ufikiaji.
- Pitia printa ya [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) ya Slither. Huripoti vidhibiti vya ufikiaji kwenye vigezo vya hali.

Andika sifa muhimu za usalama na utumie jenereta za majaribio za kiotomatiki kuzitathmini:

- Jifunze [kuandika sifa za usalama kwa msimbo wako](/developers/tutorials/guide-to-smart-contract-security-tools/). Ni ngumu mwanzoni, lakini ndiyo shughuli muhimu zaidi ili kufikia matokeo mazuri. Pia ni sharti la kutumia mbinu zozote za hali ya juu katika mafunzo haya.
- Fafanua sifa za usalama katika Solidity, kwa matumizi na [Echidna](https://github.com/crytic/echidna) na [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Zingatia mashine yako ya hali, vidhibiti vya ufikiaji, operesheni za hesabu, maingiliano ya nje, na ukubalifu wa viwango.
- Fafanua sifa za usalama kwa [API ya Python ya Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Zingatia urithi, utegemezi wa vigezo, vidhibiti vya ufikiaji, na masuala mengine ya kimuundo.
- Endesha majaribio yako ya sifa kwa kila commit na [Crytic](https://crytic.io). Crytic inaweza kutumia na kutathmini majaribio ya sifa za usalama ili kila mtu kwenye timu yako aweze kuona kwa urahisi kwamba yamefaulu kwenye GitHub. Majaribio yanayofeli yanaweza kuzuia commit.

Mwisho, kuwa mwangalifu na masuala ambayo zana za kiotomatiki haziwezi kupata kwa urahisi:

- Ukosefu wa faragha: kila mtu mwingine anaweza kuona miamala yako wakati imepangwa kwenye foleni katika pool
- Miamala ya front-running
- Operesheni za kroptografia
- Maingiliano hatarishi na vijenzi vya nje vya DeFi

## Omba msaada {#ask-for-help}

[Saa za ofisi za Ethereum](https://calendly.com/dan-trailofbits/office-hours) hufanyika kila Jumanne alasiri. Vipindi hivi vya saa 1, vya ana kwa ana ni fursa ya kutuuliza maswali yoyote uliyo nayo kuhusu usalama, kutatua matatizo kwa kutumia zana zetu, na kupata maoni kutoka kwa wataalamu kuhusu mbinu yako ya sasa. Tutakusaidia kupitia mwongozo huu.

Jiunge na Slack yetu: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Tunapatikana kila wakati katika chaneli za #crytic na #ethereum ikiwa una maswali yoyote.
