---
title: Predlogi za izboljšanje Ethereuma (EIP)
description: Osnovne informacije za razumevanje predlogov za izboljšanje Ethereuma
lang: sl
---

# Uvod v predloge za izboljšanje Ethereuma (EIP) {#introduction-to-ethereum-improvement-proposals}

## Kaj so predlogi za izboljšanje Ethereuma? {#what-are-eips}

[Predlogi za izboljšanje Ethereuma (EIP-ji)](https://eips.ethereum.org/) so standardi, ki za Ethereum opredeljujejo nove potencialne funkcije ali postopke. Vsebujejo tehnične specifikacije za predlagane spremembe in delujejo kot "vir resnice" za skupnost. O nadgradnjah omrežja in standardih aplikacij za Ethereum se razpravlja in se jih razvija prek postopkov za predloge za izboljšanje Ethereuma.

Katerikoli član Ethereumove skupnosti lahko ustvari predlog za izboljšanje Ethereuma. Smernice za pisanje predlogov za izboljšanje Ethereuma so navedene na strani [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Predlog za izboljšanje Ethereuma mora vsebovati predvsem natančne tehnične specifikacije in kratek opis namena izboljšave. Avtor predloga za izboljšanje Ethereuma je odgovoren za vzpostavitev soglasja znotraj skupnosti in pripravo dokumentacije nasprotujočih si mnenj. Glede na visoke tehnične zahteve za predložitev dobro pripravljenega predloga za izboljšanje Ethereuma so bili avtorji takih predlogov običajno razvijalci aplikacij ali protokolov.

## Zakaj so predlogi za izboljšanje Ethereuma pomembni? {#why-do-eips-matter}

Predlogi za izboljšanje Ethereuma igrajo osrednjo vlogo pri tem, kako nastanejo spremembe, in so dokumentirani na Ethereumu. So način, na katerega lahko uporabniki predlagajo spremembe, o njih razpravljajo in jih sprejmejo. Obstaja [več vrst predlogov za izboljšanje Ethereuma](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types), vključno z jedrnimi predlogi za spremembe protokola na nižji ravni, ki vplivajo na mehanizem doseganja soglasja in zahtevajo nadgradnjo omrežja, na primer [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), in predlogi za standarde aplikacij ERC, na primer [EIP-20](https://eips.ethereum.org/EIPS/eip-20) in [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Vsaka nadgradnja omrežja je sestavljena iz nabora predlogov za izboljšanje Ethereuma, ki jih morajo uveljaviti vsi [Ethereumovi odjemalci](/learn/#clients-and-nodes) v omrežju. To pomeni, da morajo razvijalci odjemalcev uvesti vse zahtevane predloge za izboljšanje Ethereuma, da ostanejo v soglasju z drugimi odjemalci v glavnem Ethereumovem omrežju.

Poleg zagotavljanja tehničnih specifikacij za spremembe predstavljajo predlogi za izboljšanje Ethereuma tudi enoto, za katero se pri Ethereumu sprejema soglasje: kdorkoli lahko poda predlog za izboljšanje Ethereuma, nato pa različni deležniki iz skupnosti razpravljajo, ali bi ga morali prevzeti kot standard ali vključiti v nadgradnjo omrežja. Predlogov za izboljšanje Ethereuma, ki niso jedrni, ni treba sprejeti vsem aplikacijam (ustvarite lahko na primer žeton, ki ni v skladu s standardom ERC20), vse pa morajo sprejeti jedrne predloge za izboljšanje Ethereuma (vsa vozlišča je treba nadgraditi, da ostanejo del istega omrežja), zato jedrni predlogi za izboljšanje Ethereuma zahtevajo širše soglasje znotraj skupnosti kot predlogi, ki niso jedrni.

## Zgodovina predlogov za izboljšanje Ethereuma {#history-of-eips}

[Repozitorij predlogov za izboljšanje Ethereuma v GitHubu](https://github.com/ethereum/EIPs) je bil ustvarjen oktobra 2015. Postopek za predloge za izboljšanje Ethereuma temelji na [postopku predlogov za izboljšanje Bitcoina (BIP)](https://github.com/bitcoin/bips), ki je zasnovan na postopku [za izboljšanje Pythona (PEP)](https://www.python.org/dev/peps/).

Uredniki predlogov za izboljšanje Ethereuma so pristojni za pregled tehnične ustreznosti, oblikovnih težav, pravilnega črkovanja in slovnice ter sloga kode predlogov. Prvotni uredniki predlogov za izboljšanje Ethereuma so bili od leta 2015 do konca leta 2016 Martin Becze, Vitalik Buterin, Gavin Wood in še nekateri drugi.

Trenutni uredniki predlogov za izboljšanje Ethereuma so

- Alex Beregszaszi (@axic),
- Gavin John (@Pandapip1),
- Greg Colvin (@gcolvin),
- Matt Garnett (@lightclient) in
- Sam Wilson (@SamWilsn).

Častni uredniki predlogov za izboljšanje Ethereuma so

- Casey Detrio (@cdetrio),
- Hudson Jameson (@Souptacular),
- Martin Becze (@wanderer),
- Micah Zoltu (@MicahZoltu),
- Nick Johnson (@arachnid),
- Nick Savers (@nicksavers) in
- Vitalik Buterin (@vbuterin).

Če želite postati urednik predlogov za izboljšanje Ethereuma, obiščite [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Uredniki predlogov za izboljšanje Ethereuma odločajo, kdaj lahko osnutek postane predlog, in avtorjem predlogov za izboljšanje Ethereuma pomagajo, da predloge premaknejo v naslednje korake postopka. [Ethereumovi mačji pastirji](https://ethereumcatherders.com/) pomagajo organizirati srečanja urednikov predlogov za izboljšanje Ethereuma in skupnosti (oglejte si [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Celoten standardiziran postopek in grafikon sta opisana na strani [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Več informacij {#learn-more}

Če želite prebrati več o predlogih za izboljšanje Ethereuma, obiščite [spletno stran za predloge za izboljšanje Ethereuma](https://eips.ethereum.org/) in [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Spodaj je nekaj koristnih povezav:

- [Seznam vseh predlogov za izboljšanje Ethereuma](https://eips.ethereum.org/all)
- [Seznam vseh vrst predlogov za izboljšanje Ethereuma](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Seznam vseh statusov predlogov za izboljšanje Ethereuma](https://eips.ethereum.org/EIPS/eip-1#eip-process)

## Sodelovanje {#participate}

Predlog za izboljšanje Ethereuma lahko ustvari kdorkoli. Pred oddajo osnutka preberite [EIP-1](https://eips.ethereum.org/EIPS/eip-1), kjer sta opisana postopka ustvarjanja in oddaje predlogov za izboljšanje Ethereuma, ter oddajte povratne informacije na [forumu Ethereumovih čarovnikov](https://ethereum-magicians.org/), kjer se pred oddajo osnutka opravi prva razprava s skupnostjo.

## Reference {#references}

<cite class="citation">

Vsebino strani delno zagotavlja [Upravljanje razvoja Ethereum protokola in koordinacija nadgradnje omrežja](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) Hudsona Jamesona

</cite>
