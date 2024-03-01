---
title: Maximal extractable value (MEV)
description: An introduction to maximal extractable value (MEV)
lang: ro
---

Maximal extractable value (MEV) refers to the maximum value that can be extracted from block production in excess of the standard block reward and gas fees by including, excluding, and changing the order of transactions in a block.

## Miner extractable value

This concept was first applied under the context of [proof-of-work](/developers/docs/consensus-mechanisms/pow/), and was initially referred to as "miner extractable value." Aceasta deoarece în dovada-muncii (PoW), miner-ii controlează includerea, excluderea și ordonarea tranzacțiilor. However, after the transition to proof-of-stake via [The Merge](/updates/merge) validators will be responsible for these roles, and mining will no longer be applicable. The value extraction methods here will still persist after this transition, and thus a name change was needed. To keep the same acronym for continuity while maintaining the same fundamental meaning, "maximal extractable value" is now used as a more inclusive replacement.

## Condiții prealabile {#prerequisites}

Aveţi grijă să vă familiarizaţi cu [tranzacțiile](/developers/docs/transactions/), [blocurile](/developers/docs/blocks/), [gazul](/developers/docs/gas/) și [minarea](/developers/docs/consensus-mechanisms/pow/mining/). Familiarizarea cu [aplicațiile dapp](/dapps/) și [DeFi](/defi/) este de asemenea utilă.

## Extragerea MEV {#mev-extraction}

In theory MEV accrues entirely to miners because miners are the only party that can guarantee the execution of a profitable MEV opportunity (at least on the current proof-of-work chain — this will change after [The Merge](/roadmap/merge/)). Cu toate acestea, în practică, o mare parte din MEV este extrasă de participanții independenți din rețea, denumiți „căutători” Căutătorii rulează algoritmi complecși pe datele blockchain pentru a detecta oportunitățile MEV profitabile și au roboți care să transmită automat aceste tranzacții profitabile în rețea.

Miner-ii primesc oricum o parte din întreaga sumă MEV, deoarece căutătorii sunt dispuși să plătească taxe mari pe gaz (care ajung la miner) în schimbul unei probabilități mai mari de includere a tranzacțiilor lor profitabile într-un bloc. Dacă presupunem că acești căutători sunt raționali din punct de vedere economic, taxa pe gaz pe care un căutător este dispus să o plătească va fi o sumă de până la 100% din MEV-ul căutătorului (deoarece dacă taxa pe gaz ar fi mai mare, căutătorul ar pierde bani).

Cu aceasta, pentru unele oportunități MEV foarte competitive, cum ar fi arbitrajul [DEX](#mev-examples-dex-arbitrage), căutătorii ar putea fi nevoiți să plătească 90% sau chiar mai mult din venitul lor MEV total pentru taxele pe gaz către miner, deoarece foarte mulți oameni doresc să efectueze aceeași tranzacție de arbitraj profitabilă. Acest lucru se datorează faptului că singura modalitate de a garanta că tranzacția lor de arbitraj se execută este dacă trimit tranzacția cu cel mai mare preț al gazului.

### Gas golfing {#mev-extraction-gas-golfing}

Această dinamică a făcut ca un bun jucător de „golf pe gaz” — care programează tranzacțiile astfel încât acestea să utilizeze cantitatea de gaz cea mai mică — să aibă astfel un avantaj competitiv, deoarece permite căutătorilor să stabilească un preț mai mare al gazului, menținând în același timp constante taxele totale pe gaz (deoarece taxele pe gaz = prețul gazului \* gazul utilizat).

Câteva tehnici binecunoscute de „golf pe gaz” includ: utilizarea de adrese care încep cu un șir lung de zerouri (de exemplu, [0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306)), deoarece acestea necesită mai puțin spațiu (și, prin urmare, gaz) pentru a fi stocate; și lăsarea unor solduri mici de tokenuri [ERC-20](/developers/docs/standards/tokens/erc-20/) în contracte, deoarece costă mai mult gaz pentru a inițializa un slot de stocare (cazul în care soldul este 0) decât pentru a actualiza un slot de stocare. Găsirea mai multor tehnici de reducere a consumului de gaz este un domeniu activ de studiu în rândul cercetătorilor.

### Generalized frontrunners {#mev-extraction-generalized-frontrunners}

În loc să programeze algoritmi complecși pentru a detecta oportunitățile MEV profitabile, unii căutători rulează frontrunneri generalizați. Frontrunnerii generalizați sunt roboți care supraveghează mempool pentru a detecta tranzacțiile profitabile. Frontrunner-ul va copia codul tranzacției potențial profitabile, va înlocui adresele cu adresa frontrunner-ului și va rula tranzacția la nivel local pentru a verifica dacă tranzacția modificată aduce un profit la adresa frontrunner-ului. În cazul în care tranzacția este într-adevăr profitabilă, frontrunner-ul va trimite tranzacția modificată cu adresa înlocuită și cu un preț mai mare al gazului, „devansând” tranzacția originală și obținând MEV-ul căutătorului inițial.

### Flashbots {#mev-extraction-flashbots}

Flashbots este un proiect independent care extinde clientul go-ethereum cu un serviciu care permite căutătorilor să trimită tranzacțiile MEV către miner-i fără a le dezvălui în mempool-ul public. Acest lucru previne ca tranzacțiile să nu fie rulate în față de către frontrunner-i generalizaţi.

În momentul scrierii acestui articol, o parte semnificativă a tranzacțiilor MEV este direcționată prin Flashbots, ceea ce înseamnă că frontrunner-ii generalizați nu mai sunt la fel de eficienți ca înainte.

## Exemple de MEV {#mev-examples}

MEV apare pe blockchain în câteva moduri.

### DEX arbitrage {#mev-examples-dex-arbitrage}

[Arbitrajul de schimb descentralizat](/glossary/#dex) (DEX) este cea mai simplă și cea mai cunoscută oportunitate MEV. Ca urmare, este și cea mai competitivă.

Funcționează astfel: dacă două DEX-uri oferă un token la două prețuri diferite, cineva poate cumpăra tokenul de pe DEX-ul cu prețul cel mai mic și îl poate vinde pe DEX-ul cu prețul cel mai mare într-o singură tranzacție atomică. Datorită mecanicii blockchain, acesta este un arbitraj adevărat, fără riscuri.

[Iată un exemplu](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4) de tranzacție de arbitraj profitabilă în care un căutător a transformat 1.000 ETH în 1.045 ETH profitând de prețurile diferite ale perechii ETH/DAI pe Uniswap față de Sushiswap.

### Liquidations {#mev-examples-liquidations}

Lichidările protocolului de împrumut prezintă o altă oportunitate MEV binecunoscută.

Protocoalele de împrumut precum Maker și Aave funcționează prin faptul că le cer utilizatorilor să depună un fel de garanție (de exemplu, ETH). Utilizatorii pot împrumuta apoi diferite active și tokenuri de la alții, în funcție de ceea ce au nevoie (de exemplu, pot împrumuta MKR dacă doresc să voteze o propunere de guvernanță MakerDAO sau SUSHI dacă doresc să câștige o parte din taxele de tranzacționare pe Sushiswap) până la o anumită sumă din garanția depusă – de exemplu, 30% (procentul exact al puterii de împrumut este determinat de protocol). Utilizatorii de la care împrumută celelalte tokenuri funcționează ca împrumutători în acest caz.

Pe măsură ce valoarea garanției unui împrumutat fluctuează, la fel și puterea de împrumut a acestuia. Dacă, din cauza fluctuațiilor pieței, valoarea activelor împrumutate depășește, să zicem, 30% din valoarea garanției lor (din nou, procentul exact este determinat de protocol); protocolul permite de obicei oricui să lichideze garanția, plătind instantaneu creditorii (acest lucru este similar cu modul în care funcționează [apelurile în marjă (margin call)](https://www.investopedia.com/terms/m/margincall.asp) în finanțele tradiționale). În cazul în care este lichidat, împrumutatul trebuie să plătească de obicei o taxă de lichidare considerabilă, din care o parte merge la lichidator — și aici intervine oportunitatea MEV.

Căutătorii concurează pentru a analiza datele blockchain-ului cât mai repede posibil pentru a determina ce împrumutați pot fi lichidați și pentru a fi primii care trimit o tranzacție de lichidare și colectează taxa de lichidare pentru ei înșiși.

### Sandwich trading {#mev-examples-sandwich-trading}

Tranzacționarea Sandwich este o altă metodă comună de extragere a MEV.

Pentru a face Sandwich, un căutător va căuta în mempool tranzacții DEX mari. De exemplu, să presupunem că cineva vrea să cumpere 10.000 UNI cu DAI pe Uniswap. A trade of this magnitude will have a meaningful effect on the UNI/DAI pair, potentially significantly raising the price of UNI relative to DAI.

A searcher can calculate the approximate price effect of this large trade on the UNI/DAI pair and execute an optimal buy order immediately _before_ the large trade, buying UNI cheaply, then execute a sell order immediately _after_ the large trade, selling it for the higher price caused by the large order.

Cu toate acestea, Sandwiching-ul este mai riscant, deoarece nu este atomic (spre deosebire de arbitrajul DEX, așa cum a fost descris mai sus) și este predispus la un [atac Salmonella](https://github.com/Defi-Cartel/salmonella).

### NFT MEV {#mev-examples-nfts}

MEV în spațiul NFT este un fenomen emergent și nu este neapărat profitabil.

Cu toate acestea, deoarece tranzacțiile NFT au loc pe același blockchain partajat de toate celelalte tranzacții Ethereum, căutătorii pot folosi tehnici similare cu cele utilizate în oportunitățile MEV tradiționale și pe piața NFT-urilor.

De exemplu, dacă există o scădere populară a NFT-ului și un căutător dorește un anumit NFT sau un set de NFT-uri, acesta poate programa o tranzacție astfel încât să fie primul la rând pentru a cumpăra NFT-ul sau poate cumpăra întregul set de NFT-uri într-o singură tranzacție. Sau, dacă un NFT este listat [din greșeală la un preț scăzut](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent), un căutător poate să devanseze alți cumpărători și să îl achiziționeze la preț redus.

Un exemplu proeminent de NFT MEV a avut loc atunci când un căutător a cheltuit 7 milioane USD pentru a [cumpăra](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5) fiecare Cryptopunk la prețul minim. Un cercetător blockchain [a explicat pe Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538) cum cumpărătorul a lucrat cu un furnizor MEV pentru a-și păstra secretă achiziția.

### The long tail {#mev-examples-long-tail}

Arbitrajul DEX, lichidările și tranzacțiile Sandwich sunt oportunități MEV foarte bine cunoscute și este puțin probabil să fie profitabile pentru noii căutători. Cu toate acestea, există o coadă lungă de oportunități MEV mai puțin cunoscute (NFT-ul MEV este, fără îndoială, o astfel de oportunitate).

Căutătorii care sunt la început de drum ar putea avea mai mult succes căutând MEV în această coadă mai lungă. [Panoul cu locuri de muncă MEV](https://github.com/flashbots/mev-job-board) al Flashbot enumeră câteva oportunități emergente.

## Consecințele MEV {#effects-of-mev}

MEV nu face numai rău — există atât consecințe pozitive, cât și negative ale MEV pe Ethereum.

### The good {#effects-of-mev-the-good}

Multe proiecte DeFi se bazează pe actori raționali din punct de vedere economic pentru a asigura utilitatea și stabilitatea protocoalelor lor. De exemplu, arbitrajul DEX garantează că utilizatorii obțin cele mai bune prețuri, cele mai corecte, pentru tokenurile lor, iar protocoalele de creditare se bazează pe lichidări rapide atunci când debitorii scad sub ratele de colateralizare pentru a se asigura că sunt rambursaţi creditorii.

Fără căutători raționali care caută și repară ineficiențele economice și care profită de stimulentele economice ale protocoalelor, protocoalele DeFi și aplicațiile dapp în general ar putea să nu fie la fel de solide ca în prezent.

### Aspectele rele {#effects-of-mev-the-bad}

La nivelul aplicației, unele forme de MEV, cum ar fi tranzacționarea Sandwich, au ca rezultat o experiență fără echivoc mai proastă pentru utilizatori. Utilizatorii care participă la tranzacții Sandwich se confruntă cu o creștere a derapajelor și o execuție mai slabă a tranzacțiilor.

La nivel de rețea, frontrunner-ii generalizați și licitațiile de preț al gazului în care aceștia se angajează adesea (când doi sau mai mulți frontrunner-i concurează pentru ca tranzacția lor să fie inclusă în blocul următor prin creșterea progresivă a prețului gazului pentru propriile tranzacții) conduc la congestia rețelei și prețuri ridicate ale gazului pentru toți ceilalți care încearcă să efectueze tranzacții obișnuite.

Dincolo de ceea ce se întâmplă _în interiorul_ blocurilor, MEV poate avea efecte dăunătoare _între_ blocuri. Dacă MEV-ul disponibil într-un bloc depășește în mod semnificativ recompensa standard a blocului, miner-ii pot fi stimulați să refacă blocurile și să captureze MEV-ul pentru ei înșiși, provocând reorganizarea blockchain-ului și instabilitatea consensului.

Această posibilitate de reorganizare a blockchain-ului a fost [explorată anterior pe blockchain-ul Bitcoin](https://dl.acm.org/doi/10.1145/2976749.2978408). Pe măsură ce recompensa blocului Bitcoin se înjumătățește, iar comisioanele de tranzacție reprezintă o parte din ce în ce mai mare din recompensa blocului, apar situații în care devine rațional din punct de vedere economic ca miner-ii să renunțe la recompensa blocului următor și să remineze în schimb blocurile anterioare cu taxe mai mari. Odată cu creșterea MEV-ului, același tip de situație ar putea apărea în Ethereum, amenințând integritatea blockchain-ului.

## Starea MEV {#state-of-mev}

Extracția de MEV a explodat la începutul anului 2021, ceea ce a dus la prețuri extrem de ridicate ale gazului în primele câteva luni ale anului. Apariția releului MEV de la Flashbots a redus eficiența frontrunner-ilor generalizați și a scos licitațiile pentru prețul gazului în afara lanțului, reducând prețurile la gaz pentru utilizatorii obișnuiți.

În timp ce mulți căutători încă fac bani buni din MEV, pe măsură ce oportunitățile devin mai cunoscute și tot mai mulți căutători concurează pentru aceeași oportunitate, miner-ii vor capta din ce în ce mai multe venituri totale din MEV (deoarece același tip de licitații de gaz descrise inițial mai sus au loc și în Flashbots, deși în mod privat, iar miner-ii vor capta veniturile rezultate din gaz). MEV nu este nici unic pentru Ethereum și, pe măsură ce oportunitățile devin mai competitive pe Ethereum, căutătorii se mută pe blockchain-uri alternative, cum ar fi Binance Smart Chain, unde există oportunități MEV similare cu cele de pe Ethereum, dar cu mai puțină concurență.

Pe măsură ce DeFi se dezvoltă și cresc în popularitate, MEV ar putea în curând să depășească în mod semnificativ recompensa de bază a blocului Ethereum. Odată cu aceasta, apare o posibilitate din ce în ce mai mare de reminare egoistă a blocurilor și de instabilitate a consensului. Unii consideră că aceasta este o amenințare existențială pentru Ethereum, iar inhibarea mineritului egoist este un domeniu activ de cercetare în teoria protocolului Ethereum. O soluție explorată în prezent este [uniformizarea recompenselor MEV](https://ethresear.ch/t/committee-driven-mev-smoothing/10408).

## Resurse conexe {#related-resources}

- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _Tablou de bord și explorator de tranzacții live pentru tranzacțiile MEV_

## Referințe suplimentare {#further-reading}

- [Ce este Valoarea extractibilă prin minare (MEV)?](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV și cu mine](https://research.paradigm.xyz/MEV)
- [Ethereum este o pădure întunecată](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [Evadarea din pădurea întunecată](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbots: Frontrunning-ul crizei MEV](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller's MEV Threads](https://twitter.com/bertcmiller/status/1402665992422047747)
