---
title: Unirea
description: Află mai multe despre unire - atunci când rețeaua principală Ethereum se va alătura sistemului bazat pe Dovada Mizei (proof-of-stake), coordonat de rețeaua Beacon.
lang: ro
template: upgrade
image: ../../../../../assets/upgrades/merge.png
summaryPoint1: În cele din urmă, Rețeaua principală Ethereum se va „uni” cu sistemul bazat pe Dovada Mizei (proof-of-stake), coordonat de rețeaua Beacon.
summaryPoint2: Această schimbare va marca sfârșitul sistemului bazat pe Dovada Muncii (proof-of-work) și tranziția totală spre Dovada Mizei (proof-of-stake).
summaryPoint3: Acest sistem este menit să pregătească terenul pentru lansarea lanțurilor de fragmente.
summaryPoint4: Acest proces l-am numit „andocarea”
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
  Actualizarea reprezintă trecerea oficială la consensul bazat pe Dovada Mizei (proof-of-stake). Astfel, se elimină nevoia de minat folosind o cantitate mare de energie, securizând rețeaua folosind ether mizat. Un pas cu adevărat important în realizarea <a href="/upgrades/vision/">Viziunii Eth2</a> – mai multă scalabilitate, securitate și sustenabilitate.
</UpgradeStatus>

## Ce este unirea? {#what-is-the-docking}

Este important să ne amintim că inițial [rețeaua Beacon](/upgrades/beacon-chain/) a fost livrat separat de [rețeaua principală](/glossary/#mainnet) - rețeaua pe care o folosim în prezent. Rețeaua principală Ethereum continuă să fie securizată prin [Dovada Muncii (proof-of-work)](/developers/docs/consensus-mechanisms/pow/), chiar dacă rețeaua Beacon rulează în paralel folosind [Dovada Mizei (proof-of-stake)](/developers/docs/consensus-mechanisms/pos/). Unirea se va realiza atunci când aceste două sisteme se reunesc în cele din urmă.

Imaginează-ți că Ethereum este o navă spațială care nu este chiar pregătită pentru o călătorie interstelară. Cu rețeaua Beacon, comunitatea a construit un nou motor și o carenă întărită. Când va veni timpul, nava actuală va andoca împreună cu acest nou sistem, devenind o singură navă gata să călătorească câțiva ani lumină buni și să cucerească întreg universul.

## Unirea cu Rețeaua principală {#docking-mainnet}

Când va fi gata, Rețeaua principală Ethereum se va „uni” cu rețeaua Beacon, devenind propriul său fragment care folosește Dovada Mizei (proof-of-stake) în loc de [Dovada Muncii (proof-of-work)](/developers/docs/consensus-mechanisms/pow/).

Rețeaua principală va aduce posibilitatea de a rula contracte inteligente în sistemul de Dovadă a Mizei (PoS), plus istoricul complet și starea actuală a Ethereum, pentru a asigura tranziția lină pentru toți deținătorii și utilizatorii de ETH.

## După unire {#after-the-merge}

Sfârșitul unirii va însemna și sfârșitul Dovezii Muncii (proof-of-work) pentru Ethereum și va începe era unui Ethereum mai sustenabil și mai ecologic. La momentul respectiv, Ethereum va fi cu un pas mai aproape de atingerea nivelului maxim de securitate și sustenabilitate subliniat în [Viziunea Eth2](/upgrades/vision/).

Este important de remaracat faptul că obiectivul de implementare a unirii este pur și simplu de a livra tranziția dintre Dovada Muncii (proof-of-work) și Dovada Mizei (proof-of-stake). Dezvoltatorii își concentrează eforturile pe această tranziție și reduc la minim funcționalitățile suplimentare care ar putea întârzia acest obiectiv.

**Asta înseamnă mai puține funcționalități noi, cum ar fi abilitatea de a retrage ETH mizat care va trebui să aștepte puțin mai mult după ce unirea este completă.** Planurile includ o actualizare ulterioară pentru a aborda aceste funcționalități care vor fi implementate foarte repede după ce unirea este completă.

## Relația dintre actualizări {#relationship-between-upgrades}

Toate actualizările Eth2 sunt oarecum interdependente. Să recapitulăm modul în care unirea se leagă de celelalte acutalizări.

### Unirea și Rețeaua Beacon {#docking-and-beacon-chain}

După ce unirea este completă, stakerii vor fi desemnați să valideze Rețeaua principală Ethereum. [Minatul](/developers/docs/consensus-mechanisms/pow/mining/) nu va mai fi necesar, astfel încât minerii își vor investi probabil câștigurile în mizarea în noul sistem bazat pe Dovada Mizei (proof-of-stake).

<ButtonLink to="/upgrades/beacon-chain/">Rețeaua Beacon</ButtonLink>

### Unirea și curățarea după unire {#merge-and-post-merge-cleanup}

Imediat după unire, unele funcționalități precum retragerea monedelor ETH mizate nu vor fi suportate încă. Aceste funcționalități sunt planificate pentru o actualizare separată care să urmeze la scurt timp după unire.

Rămâi la curent cu [Blog-ul pentru Cercetare și Ethereum EF](https://blog.ethereum.org/category/research-and-development/). Pentru cei curioși, află mai multe despre [Ce se întâmplă după Unire](https://youtu.be/7ggwLccuN5s?t=101), prezentat de către Vitalik la evenimentul ETHGlobal din aprilie 2021.

### Unirea și lanțurile de fragmente {#docking-and-shard-chains}

Inițial, planul era ca lanțurile de fragmente să fie folosite înainte de unire – pentru a aborda scalabilitatea. Cu toate acestea, odată cu avântul [nivelului 2 de scalare a soluțiilor](/developers/docs/scaling/#layer-2-scaling), prioritatea s-a mutat la schimbul Dovezii Muncii (proof-of-work) cu Dovada Mizei (proof-of-stake) prin unire.

Acest lucru va fi evaluat în continuu de către comunitate în ceea ce privește necesitatea unor potențiale runde multiple de lanțuri de fragmente pentru a permite o scalabilitate infinită.

<ButtonLink to="/upgrades/sharding/">Lanțuri de fragmente</ButtonLink>
