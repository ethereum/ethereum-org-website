---
title: Gaz și taxe
description:
lang: ro
sidebar: true
incomplete: true
isOutdated: true
---

Gazul este esențial pentru rețeaua Ethereum. Este combustibilul care îi permite să funcționeze, ca o mașină care are nevoie de benzină pentru a rula.

## Condiții prealabile {#prerequisites}

Pentru a înțelege mai bine această pagină, îți recomandăm să citești mai întâi despre [tranzacții](/developers/docs/transactions/) și [EVM](/developers/docs/evm/).

## Ce este gazul? {#what-is-gas}

Gazul este unitatea care măsoară cantitatea de efort de calcul necesar pentru a executa operațiuni specifice în rețeaua Ethereum.

Deoarece fiecare tranzacție Ethereum necesită resurse de calcul pentru executare, fiecare tranzacție necesită o taxă. Gazul se referă la taxa necesară pentru a efectua cu succes o tranzacție pe Ethereum.

![O diagramă care arată unde este nevoie de gaz în operațiunile EVM](../../../../../developers/docs/gas/gas.png) _Diagramă adaptată după [Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

În esență, taxele pe gaz sunt plătite în moneda nativă a Ethereum, eterul (ETH). Prețurile gazului sunt indicate în Gwei, care este o denominație a ETH - fiecare Gwei este egal cu 0,000000001 ETH (10<sup>-9</sup> ETH). De exemplu, în loc să spui că gazul tău costă 0,000000001 eter, poți spune că el costă 1 Gwei.

Acest videoclip oferă o prezentare succintă a gazului și de ce există:

<YouTube id="AJvzNICwcwc" />

## De ce există taxe pe gaz? {#why-do-gas-fees-exist}

Pe scurt, taxele pe gaz contribuie la menținerea securității rețelei Ethereum. Cerând o taxă pentru fiecare calcul executat în rețea, împiedicăm actorii să trimită spam în rețea. Pentru a preveni bucle infinite accidentale sau ostile sau alte risipe de calcul din cod, fiecare tranzacție trebuie să stabilească o limită a numărului de pași de calcul de execuție a codului pe care îi poate folosi. Unitatea fundamentală de calcul este „gazul”.

Deși o tranzacție include o limită, orice gaz neutilizat într-o tranzacție este returnat utilizatorului.

![Diagrama care arată modul în care este rambursat gazul neutilizat](../../../../../developers/docs/transactions/gas-tx.png) _Diagramă adaptată după [Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Referințe suplimentare {#further-reading}

- [Înțelegerea gazului Ethereum, a blocurilor și a pieței taxelor](https://medium.com/@eric.conner/understanding-ethereum-gas-blocks-and-the-fee-market-d5e268bf0a0e)
- [Gaz Ethereum explicat](https://defiprime.com/gas)

## Instrumente corelate {#related-tools}

- [Stația de gaz ETH](https://ethgasstation.info/) _Măsurători orientate spre consumatori pentru piața gazelor Ethereum_
- [Etherscan Gas Tracker](https://etherscan.io/gastracker) _Estimator de preț de tranzacție gaze_
- [Bloxy Gas Analytics](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true) _Statistici gaz rețea Ethereum_

## Subiecte corelate {#related-topics}

- [Minarea](/developers/docs/consensus-mechanisms/pow/mining/)
