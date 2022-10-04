---
title: Gaz și taxe
description:
lang: ro
---

Gazul este esențial pentru rețeaua Ethereum. Este combustibilul care îi permite să funcționeze, ca o mașină care are nevoie de benzină pentru a rula.

## Condiții prealabile {#prerequisites}

Pentru a înțelege mai bine această pagină, vă recomandăm să citiți mai întâi despre [tranzacții](/developers/docs/transactions/) și [EVM](/developers/docs/evm/).

## Ce este gazul? {#what-is-gas}

Gazele se referă la unitatea care măsoară volumul de calcul necesar pentru executarea operațiunilor specifice în rețeaua Ethereum.

Deoarece fiecare tranzacție Ethereum necesită resurse de calcul pentru executare, fiecare tranzacție necesită o taxă. Gazul se referă la taxa necesară pentru a efectua cu succes o tranzacție pe Ethereum.

![Diagramă care arată unde este nevoie de gaz în operațiunile EVM](./gas.png) _Diagramă adaptată după [Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

În esență, taxele pe gaz sunt plătite în moneda nativă a Ethereum, etherul (ETH). Prețurile gazului sunt indicate în gwei, care este o denominație a ETH -ului - fiecare gwei este egal cu 0,000000001 ETH (10<sup>-9</sup> ETH). De exemplu, în loc să spuneţi că gazul dvs. costă 0,000000001 ether, puteţi spune că acesta costă 1 gwei. Cuvântul „gwei” însuși înseamnă „giga-wei” și este egal cu 1.000.000.000.000 de wei. Wei însuși (numit după [Wei_Dai](https://wikipedia.org/wiki/Wei_Dai), creator al criptomonedei [b-money](https://www.investopedia.com/terms/b/bmoney.asp)), este cea mai mică unitate de ETH.

## Înainte de actualizarea Londra {#pre-london}

Modul de calcul al taxelor de tranzacție în rețeaua Ethereum s-a schimbat odată cu [Actualizarea Londra](/history/#london) din august 2021. Iată o recapitulare a felului în care funcționau lucrurile înainte:

Să spunem că Alice trebuia să-i plătească lui Bob 1 ETH. În cadrul tranzacției, limita de gaz este de 21.000 de unități, iar prețul gazului este de 200 gwei.

Taxa totală ar fi fost: `Unități de gaz (limită) * Prețul gazului pe unitate`, adică `21.000 * 200 = 4.200.000 gwei` sau 0,0042 ETH

Când Alice a trimis banii, suma de 1,0042 ETH ar fi fost dedusă din contul lui Alice. Bob ar fi creditat cu 1,0000 ETH. Miner-ul ar primi 0,0042 ETH.

Acest videoclip oferă o prezentare succintă a gazului și a motivului pentru care există:

<YouTube id="AJvzNICwcwc" />

## După actualizarea Londra {#post-london}

[Actualizarea Londra](/history/#london) a fost implementată pe 5 august 2021 pentru a face tranzacțiile pe Ethereum mai previzibile pentru utilizatori prin revizuirea mecanismului de taxe de tranzacționare pe Ethereum. Beneficiile de ansamblu introduse de această modificare cuprind o estimare mai bună a taxelor de tranzacție, o includere în general mai rapidă a tranzacțiilor și compensarea emiterii de ETH prin arderea unui procent din taxele de tranzacție.

Începând cu actualizarea Londra a rețelei, fiecare bloc are o taxă de bază, prețul minim pe unitatea de gaz pentru includerea în acest bloc, calculat de rețea în funcţie de cererea de spațiu în bloc. Având în vedere că este arsă taxa de bază a taxei de tranzacție, se preconizează ca utilizatorii să stabilească și un bacșiș („tip”) (taxă de prioritate) în tranzacțiile lor. Bacșișul (tip) compensează miner-ii pentru executarea și propagarea tranzacțiilor utilizatorilor în blocuri și se preconizează ca aceasta să fie stabilită automat de majoritatea portofelelor.

Calcularea taxei totale de tranzacție se face după cum urmează: `Unităţi de gaz (limită) * (Taxa de bază + Bacşiş)`

Să presupunem că Jordan trebuie să îi plătească lui Taylor 1 ETH. În cadrul tranzacției, limita de gaz este de 21.000 de unități, iar taxa de bază este de 100 gwei. Jordan include un bacșiș de 10 gwei.

Folosind formula de mai sus, se poate calcula în următorul mod: `21.000 * (100 + 10) = 2.310.000 gwei` sau 0,00231 ETH.

Când Jordan trimite banii, 1,00231 ETH va fi dedus din contul lui Jordan. Taylor va fi creditat cu 1,0000 ETH. Miner-ul primește un bacșiș de 0,00021 ETH. Taxa de bază de 0,0021 ETH este arsă.

În plus, Jordan poate configura și o taxă maximă (`maxFeePerGas`) pentru tranzacție. Diferența dintre taxa maximă și taxa reală este rambursată lui Jordan, adică `refund = taxa maximă - (taxa de bază + taxa de prioritate)`. Jordan poate să stabilească o sumă maximă pe care să o plătească pentru ca tranzacția să fie executată și să nu-și facă griji pentru „surplusul” plătit faţă de taxa de bază atunci când este executată tranzacția.

### Mărimea blocului {#block-size}

Înainte de Actualizarea Londra, Ethereum avea blocuri de dimensiuni fixe. În perioadele de cereri mari în rețea, aceste blocuri funcționau la capacitatea totală. Prin urmare, utilizatorii aveau adesea de aşteptat reducerea cererii ridicate pentru a fi incluși într-un bloc, ceea ce ducea la insatisfacţii.

Actualizarea Londra a introdus blocuri de dimensiuni variabile în Ethereum. Fiecare bloc are o dimensiune țintă de 15 milioane de gaz, dar dimensiunea blocurilor va crește sau va scădea în funcție de cererea din rețea, până la limita pentru bloc de 30 de milioane de gaz (2x dimensiunea țintă a blocului). Protocolul realizează o dimensiune de echilibru a blocurilor în medie de 15 milioane, prin procesul de _tatonare_. Aceasta înseamnă că, dacă dimensiunea blocului este mai mare decât dimensiunea blocului țintă, protocolul va crește taxa de bază pentru următorul bloc. În mod similar, protocolul va scădea taxa de bază dacă dimensiunea blocului este mai mică decât dimensiunea blocului țintă. Valoarea cu care se ajustează taxa de bază este proporțională cu diferenţa dintre mărimea actuală a blocului față de mărimea ţintă. [Mai multe despre blocuri](/developers/docs/blocks/).

### Taxa de bază {#base-fee}

Fiecare bloc are o taxă de bază care acționează ca un preț de rezervă. Ca să fie eligibil pentru includerea într-un bloc, prețul oferit pe gaz trebuie să fie cel puțin egal cu taxa de bază. Taxa de bază este calculată independent de blocul curent și este în schimb determinată de blocurile anterioare - ceea ce face ca taxele de tranzacționare să fie mai previzibile pentru utilizatori. Atunci când blocul este minat, această taxă de bază este „arsă”, fiind scoasă din circulație.

Taxa de bază este calculată printr-o formulă care compară dimensiunea blocului anterior (cantitatea de gaz utilizată pentru toate tranzacțiile) cu dimensiunea țintă. Taxa de bază va crește cu maximum 12,5% per bloc dacă dimensiunea țintă a blocului este depășită. Această creștere exponențială face ca, din punct de vedere economic, să nu fie o soluţie viabilă ca mărimea blocului să rămână ridicată la nesfârșit.

| Numărul blocului | Gaz inclus | Creșterea taxei | Taxa de bază actuală |
| ---------------- | ---------: | --------------: | -------------------: |
| 1                |        15M |              0% |             100 gwei |
| 2                |        30M |              0% |             100 gwei |
| 3                |        30M |           12,5% |           112,5 gwei |
| 4                |        30M |           12,5% |           126,6 gwei |
| 5                |        30M |           12,5% |           142,4 gwei |
| 6                |        30M |           12,5% |           160,2 gwei |
| 7                |        30M |           12,5% |           180,2 gwei |
| 8                |        30M |           12,5% |           202,7 gwei |

În raport cu piața de licitații pentru gaz dinainte de Londra, această schimbare a mecanismului de tranzacționare a taxelor face ca predicția taxelor să fie mai fiabilă. Conform tabelului de mai sus - pentru a crea o tranzacție pe blocul numărul 9, un portofel îi va permite utilizatorului să știe cu certitudine că **taxa de bază maximă** care va fi adăugată la următorul bloc este `taxa de bază curentă * 112,5%` sau `202,8 gwei * 112,5% = 228,1 gwei`.

Este de asemenea important de menționat că este puțin probabil să constatăm picuri ale blocurilor complete, din cauza vitezei cu care crește taxa de bază procedând la un bloc complet.

| Numărul blocului | Gaz inclus | Creșterea taxei | Taxa de bază actuală |
| ---------------- | ---------: | --------------: | -------------------: |
| 30               |        30M |           12,5% |          2705.6 gwei |
| ...              |        ... |           12,5% |                  ... |
| 50               |        30M |           12,5% |         28531.3 gwei |
| ...              |        ... |           12,5% |                  ... |
| 100              |        30M |           12,5% |      10302608.6 gwei |

### Taxa de prioritate (bacșișuri - „tips”) {#priority-fee}

Înainte de Actualizarea Londra, miner-ii primeau taxa totală pe gaz din orice tranzacție inclusă într-un bloc.

Cu noua taxă de bază care se arde, Actualizarea Londra a introdus o taxă de prioritate (bacșiș - „tip”) pentru a stimula miner-ii să includă o tranzacție în bloc. Fără bacșișuri („tips”), miner-ii ar putea considera că este o soluţie economic viabilă să extragă blocuri goale, deoarece ar primi aceeași recompensă pentru blocuri. În condiții normale, un bacșiș mic oferă miner-ilor un stimulent minim pentru a include o tranzacție. În cazul tranzacțiilor care trebuie să fie executate în mod preferențial înaintea altor tranzacții din același bloc, va fi necesar un bacșiș mai mare, pentru a încerca să supraliciteze tranzacțiile concurente.

### Taxa maximă {#maxfee}

Pentru a executa o tranzacție în rețea, utilizatorii pot specifica o limită maximă pe care sunt dispuși să o plătească pentru ca tranzacția lor să fie executată. Acest parametru opțional este cunoscut sub numele de `maxFeePerGas`. Pentru ca o tranzacție să fie executată, taxa maximă trebuie să depășească suma dintre taxa de bază și bacșiș. Expeditorului tranzacției i se rambursează diferența dintre taxa maximă și suma dintre taxa de bază și bacșiș.

### Calcularea taxelor {#calculating-fees}

Unul dintre beneficiile principale ale actualizării Londra este creşterea satisfacţiei utilizatorului la stabilirea taxelor de tranzacție. La portofelele care suportă actualizarea, în loc să precizeze în mod explicit cât de mult sunteți dispus să plătiți pentru efectuarea tranyacţiei dvs., furnizorii de portofele vor stabili automat o taxă de tranzacție recomandată (taxă de bază + taxa de prioritate recomandată), pentru a reduce gradul de complexitate pe care îl impun utilizatorilor.

## EIP-1559 {#eip-1559}

Punerea în aplicare a [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) în cadrul Actualizării Londra a făcut ca mecanismul taxelor de tranzacție să fie mai complex decât licitația anterioară a prețului gazului, dar are avantajul de a face ca taxele de gaz mai previzibile, conducând la o piață a taxelor de tranzacție mai eficientă. Utilizatorii pot transmite tranzacții cu un `maxFeePerGas` care corespunde sumei pe care sunt dispuși să o plătească pentru executarea tranzacţiei, ştiind că nu vor plăti mai mult decât prețul de piață pentru gaz (`baseFeePerGas`) și că orice sumă în plus, mai puțin bacșișul, le va fi rambursată.

Acest videoclip explică EIP-1559 și beneficiile aduse de acesta:

<YouTube id="MGemhK9t44Q" />

Dacă sunteți interesat, puteți citi [Specificațiile EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md)exacte.

Aprofundați-vă cunoștințele cu aceste [Resurse EIP-1559](https://hackmd.io/@timbeiko/1559-resources).

## De ce există taxe pe gaz? {#why-do-gas-fees-exist}

Pe scurt, taxele pe gaz contribuie la menținerea securității rețelei Ethereum. Prin solicitarea unei taxe pentru fiecare calcul executat în rețea, împiedicăm actorii răuvoitori să execute atacuri spam în rețea. Pentru a preveni bucle infinite accidentale sau ostile sau alt mod de a face risipă de calcul pentru cod, fiecare tranzacție trebuie să stabilească o limită a numărului de pași de calcul pentru execuția codului pe care îi poate folosi. Unitatea fundamentală de calcul este „gazul”.

Deși o tranzacție include o limită, orice gaz care nu este utilizat într-o tranzacție este returnat utilizatorului (de exemplu, se returnează `taxa maximă - (taxa de bază + bacşiş)`).

![Diagrama care arată modul în care este rambursat gazul neutilizat](../transactions/gas-tx.png) _Diagramă adaptată din [Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Ce este limita de gaz? {#what-is-gas-limit}

Limita de gaz se referă la cantitatea maximă de gaz pe care sunteți dispus să o consumați într-o tranzacție. Tranzacțiile mai complicate care implică [contracte inteligente](/developers/docs/smart-contracts/) au nevoie de mai multă muncă de calcul, deci au nevoie de o limită de gaz mai mare decât o simplă plată. Un transfer standard de ETH necesită o limită de gaz de 21.000 de unități de gaz.

De exemplu, dacă stabiliți o limită de gaz de 50.000 pentru un transfer simplu de ETH, EVM va consuma 21.000, iar dvs. veți primi înapoi restul de 29.000. Cu toate acestea, dacă specificați prea puțin gaz, de exemplu, o limită de gaz de 20.000 pentru un transfer simplu de ETH, EVM va consuma cele 20.000 de unități de gaz încercând să îndeplinească tranzacția, dar aceasta nu se va finaliza. Atunci EVM anulează orice modificări, dar, întrucât miner-ul a efectuat deja o muncă în valoare de 20.000 de unități de gaz, acel gaz este consumat.

## De ce taxele pe gaz pot creşte atât de mult? {#why-can-gas-fees-get-so-high}

Taxele mari pe gaz se datorează popularității lui Ethereum. Executarea oricărei operațiuni pe Ethereum necesită un consum de gaz, iar spațiul de gaz este limitat pe bloc. Taxele includ calcule, stocarea sau manipularea de date sau transferul de tokenuri, care consumă cantități diferite de unități de „gaz”. Pe măsură ce funcționalitatea aplicațiilor dapp devine mai complexă, crește și numărul de operațiuni pe care le efectuează un contract inteligent, ceea ce înseamnă că fiecare tranzacție ocupă mai mult spațiu dintr-un bloc de dimensiuni limitate. Dacă cererea este prea mare, va trebui ca utilizatorii să ofere un bacșiș mai mare pentru a încerca să supraliciteze tranzacțiile altor utilizatori. Un bacșiș mai mare poate să crească șansele ca tranzacția dvs. să ajungă în blocul următor.

Nu este numai preţul gazului cel care determină de fapt cât trebuie să plătim pentru o anumită tranzacție. Pentru a calcula taxa de tranzacție, trebuie să înmulțim gazul utilizat cu taxa de tranzacție, care se măsoară în gwei.

## Inițiative de reducere a costurilor gazului {#initiatives-to-reduce-gas-costs}

[Actualizările de scalabilitate](/upgrades/) ale lui Ethereum ar trebui să rezolve câteva din problemele taxei pe gaz, ceea ce va permite la rândul său platformei să proceseze mii de tranzacții pe secundă și să se extindă la nivel global.

Scalarea de Nivel 2 este o inițiativă primordială pentru a îmbunătăți considerabil costurile gazului, satisfacţia utilizatorilor și scalabilitatea. [Mai multe despre scalarea de nivel 2](/developers/docs/scaling/#layer-2-scaling).

Noul model cu dovada-mizei (proof-of-stake) introdus pe Lanțul Beacon ar trebui să diminueze consumul ridicat de energie și dependența de hardware specializat. Acest lanț va permite rețelei descentralizate Ethereum să ajungă la un acord și să mențină securitatea rețelei și în același timp să limiteze consumul de energie, solicitând în schimb un angajament financiar.

Oricine deține cel puțin 32 de ETH îi poate miza și poate deveni un validator responsabil cu procesarea tranzacțiilor, validarea blocurilor și propunerea de noi blocuri care să fie adăugate la lanț. Utilizatorii care au mai puțin de 32 ETH se pot înscrie în grupuri de mizare.

## Strategii prin care puteți reduce costurile gazului {#strategies-for-you-to-reduce-gas-costs}

În cazul în care doriți să reduceți costurile gazului pentru ETH-ul dvs., puteți să stabiliți un bacșiș care să indice nivelul de prioritate al tranzacției dvs. Miner-ii vor „lucra” la executarea tranzacțiilor care oferă un bacșiș mai mare per gaz, deoarece vor păstra bacșișurile pe care le plătiți și vor ezita să execute tranzacțiile la care bacșișurile stabilite sunt mai mici.

Dacă doriți să monitorizați prețurile gazului ca să vă puteți trimite ETH-ul la un preț mai mic, puteți utiliza diferite instrumente, cum ar fi:

- [Etherscan](https://etherscan.io/gastracker) _Estimator al prețului gazului pentru tranzacții_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Extensie Chrome de estimare a gazului care suportă atât tranzacțiile legacy de Tip 0, cât și tranzacțiile EIP-1559 de Tip˙2._

- [ETH Gas Station](https://ethgasstation.info/) _Măsurători orientate către consumator pentru piața de gaz Ethereum_
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, and Polygon._

## Instrumente corelate {#related-tools}

- [Bloxy Gas Analytics](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true) _Statistici privind gazul în rețeaua Ethereum_
- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API de estimare a gazului alimentată de platforma globală de date mempool a Blocknative_

## Referințe suplimentare {#further-reading}

- [Gazul Ethereum explicat](https://defiprime.com/gas)
- [Este Ethereum mai scump de utilizat pe măsură ce prețul crește?](https://docs.ethhub.io/questions-about-ethereum/is-ethereum-more-expensive-to-use-as-price-rises/)
- [Reducerea consumului de gaz al contractelor dvs. inteligente](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Dovada-mizei comparativ cu dovada-muncii](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)

## Subiecte corelate {#related-topics}

- [Minarea](/developers/docs/consensus-mechanisms/pow/mining/)
