---
title: Introducere despre ether
description: Introducere din partea dezvoltatorului despre criptomoneda ether.
lang: ro
---

## Condiții prealabile {#prerequisites}

Pentru a vă ajuta să înțelegeți mai bine această pagină, vă recomandăm să citiți mai întâi [Introducerea despre Ethereum](/developers/docs/intro-to-ethereum/).

## Ce este o criptomonedă? {#what-is-a-cryptocurrency}

O criptomonedă este un mediu de schimb garantat de un registru de evidență bazat pe blockchain.

Un mijloc de schimb este orice lucru acceptat pe scară largă ca mijloc de plată pentru bunuri și servicii, iar un registru este un depozit de date care ține evidența tranzacțiilor. Tehnologia blockchain permite utilizatorilor să efectueze tranzacții în registrul de evidență fără să-şi pună încrederea într-un terţ care să mențină registrul de evidență.

Prima criptomonedă a fost Bitcoin, creată de Satoshi Nakamoto. Din momentul lansării Bitcoin în 2009, oamenii au creat mii de criptomonede pe mai multe blockchain-uri diferite.

## Ce este ether-ul? {#what-is-ether}

**Ether-ul (ETH)** este criptomoneda cu multe utilizări în rețeaua Ethereum. Fundamentally, it is the only acceptable form of payment for transaction fees, and after [The Merge](/upgrades/merge), ether will be required to validate and propose blocks on Mainnet. Ether-ul este utilizat şi ca formă principală de garanție pe piețele de împrumut [DeFi](/defi), ca unitate de cont pe piețele NFT, ca plată câștigată pentru prestarea de servicii sau vânzarea de bunuri din lumea reală și multe altele.

Ethereum permite dezvoltatorilor să creeze [**aplicații descentralizate (dapp-uri)**](/developers/docs/dapps), care împărtășesc toate un fond comun (pool) de putere de calcul. Acest fond comun este finit, așa că Ethereum are nevoie de un mecanism care să determine cine îl folosește. În caz contrar, o aplicație dapp ar putea consuma accidental sau rău intenționat toate resursele rețelei, ceea ar bloca accesul celorlalţi.

Criptomoneda ether acceptă un mecanism de stabilire a prețurilor pentru puterea de calcul a lui Ethereum. Atunci când utilizatorii doresc să facă o tranzacție, trebuie să plătească ether pentru ca tranzacția lor să fie recunoscută în blockchain. Aceste costuri de utilizare sunt cunoscute sub numele de [taxă pe gaz](/developers/docs/gas/), iar taxa pe gaz depinde de cantitatea de putere de calcul necesară pentru a executa tranzacția și de cererea de putere de calcul la nivelul întregii rețele în acel moment.

Prin urmare, chiar dacă o aplicație dapp dăunătoare a trimis o buclă infinită, tranzacția va rămâne până la urmă fără ether și se va încheia, permițând rețelei să revină la normal.

Este o greşeală [comună](https://www.reuters.com/article/us-crypto-currencies-lending-insight-idUSKBN25M0GP#:~:text=price%20of%20ethereum) [să](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845#:~:text=cryptocurrencies%20including%20ethereum) [confundați](https://www.cnn.com/2021/03/14/tech/nft-art-buying/index.html#:~:text=price%20of%20ethereum) Ethereum cu ether-ul — atunci când lumea se referă la „prețul Ethereum”, este vorba de prețul ether-ului.

## Emiterea de ether {#minting-ether}

Emiterea monedei este procesul prin care se creează ether nou în registrul Ethereum. Protocolul care stă la baza lui Ethereum este cel care creează noul ether și nu este posibil ca un utilizator să creeze ether.

Ether-ul este emis atunci când un miner creează un bloc pe blockchain-ul Ethereum. Ca un stimulent pentru mineri, protocolul acordă o recompensă în fiecare bloc, mărind soldul unei adrese stabilite de miner-ul blocului respectiv. Recompensa pe bloc s-a modificat de-a lungul timpului, iar în prezent este de 2 ETH pe bloc.

## Arderea de ether {#burning-ether}

Ca și crearea de ether prin recompense de bloc, ether-ul poate fi distrus printr-un proces numit „ardere”. Atunci când este ars, ether-ul este scos definitiv din circulație.

Arderea ether-ului are loc în fiecare tranzacție pe Ethereum. When users pay for their transactions, a base gas fee, set by the network according to transactional demand, gets destroyed. This, coupled with variable block sizes and a maximum gas fee, simplifies transaction fee estimation on Ethereum. When network demand is high, [blocks](https://etherscan.io/block/12965263) can burn more ether than they mint, effectively offsetting ether issuance.

Burning the base fee prevents various ways the miners could manipulate it otherwise. For example, if miners got the base fee, they could include their own transactions for free and raise the base fee for everyone else. Alternatively, they could refund the base fee to some users off-chain, leading to a more opaque and complex transaction fee market.

## Denominații de ether {#denominations}

Întrucât multe dintre tranzacțiile pe Ethereum sunt de valoare mică, ether-ul are mai multe denominații la care se poate face referire pentru sume mai mici. Of these denominations, Wei and gwei are particularly important.

Wei este cantitatea cea mai mică posibilă de ether și, ca urmare, multe implementări tehnice, cum ar fi [Cartea galbenă Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), îşi vor baza toate calculele pe Wei.

Gwei, prescurtare de la giga-wei, este adesea folosit pentru a descrie costurile pe gaz în Ethereum.

| Denominație | Valoare în ether  | Utilizare obișnuită                     |
| ----------- | ----------------- | --------------------------------------- |
| Wei         | 10<sup>-18</sup>. | Implementări tehnice                    |
| Gwei        | 10<sup>-9</sup>.  | Taxe pe gaz pe care lumea le poate citi |

## Transferul de ether {#transferring-ether}

Fiecare tranzacție pe Ethereum conține un câmp al `valorii`, care specifică suma de ether care urmează să fie transferată, denominată în wei, pentru a fi trimisă de la adresa expeditorului la adresa destinatarului.

When the recipient address is a [smart contract](/developers/docs/smart-contracts/), this transferred ether may be used to pay for gas when the smart contract executes its code.

[Mai multe despre tranzacții](/developers/docs/transactions/)

## Interogarea soldului de ether {#querying-ether}

Utilizatorii pot interoga soldul de ether al oricărui [cont](/developers/docs/accounts/) prin inspectarea câmpului `sold` al contului, care arată valorile de ether deținute exprimate în wei.

[Etherscan](https://etherscan.io) este un instrument popular pentru inspectarea soldurilor adreselor prin intermediul unei aplicații pe web. For example, [this Etherscan page](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) shows the balance for the Ethereum Foundation.

## Referințe suplimentare {#further-reading}

- [Definiția ether -ului și a lui Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Cartea albă Ethereum](/whitepaper/): Propunerea originală pentru Ethereum. Acest document cuprinde o descriere a ether-ului și a motivațiilor care au stat la baza creării sale.

_Cunoaşteţi o resursă comunitară care v-a ajutat? Editaţi această pagină și adăugaţi-o!_
