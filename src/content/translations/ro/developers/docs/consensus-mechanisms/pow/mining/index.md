---
title: Minarea
description: O explicație a modului în care funcționează mineritul în Ethereum și modul în care acesta ajută la menținerea Ethereum în siguranță și descentralizat.
lang: ro
sidebar: true
incomplete: true
---

## Condiții prealabile {#prerequisites}

Pentru a înțelege mai bine această pagină, îți recomandăm să citești mai întâi despre [tranzacții](/en/developers/docs/transactions/), [blocuri](/en/developers/docs/blocks/) și [dovada muncii (PoW)](/developers/docs/consensus-mechanisms/pow/).

## Ce este mineritul Ethereum? {#what-is-ethereum-mining}

Mineritul este procesul de creare a unui bloc de tranzacții care trebuie adăugat la blockchain-ul Ethereum.

Ethereum, la fel ca Bitcoin, utilizează în prezent un mecanism de consens [dovada muncii (PoW)](/developers/docs/consensus-mechanisms/pow/). Mineritul este forța vie a dovezii muncii. Minerii Ethereum - computere care rulează software - își folosesc timpul și puterea de calcul pentru a procesa tranzacții și a produce blocuri.

## De ce există mineri? {#why-do-miners-exist}

În sisteme descentralizate precum Ethereum, trebuie să ne asigurăm că toată lumea este de acord cu ordinea tranzacțiilor. Minerii ajută acest lucru rezolvând puzzle-uri computerizate dificile pentru a produce blocuri, ceea ce servește ca o modalitate de a proteja rețeaua de atacuri.

[Mai multe despre dovada muncii](/developers/docs/consensus-mechanisms/pow/)

## Cum sunt minate tranzacțiile Ethereum {#how-ethereum-transactions-are-mined}

1. Un utilizator scrie și semnează o cerere de [tranzacție](/en/developers/docs/transactions/) cu cheia privată a unui [cont](/en/developers/docs/accounts/).
2. Utilizatorul transmite cererea de tranzacție către întreaga rețea Ethereum de la un anumit [nod](/en/developers/docs/nodes-and-clients/).
3. După primirea noii cereri de tranzacție, fiecare nod din rețeaua Ethereum adaugă cererea în mempool-ul local, o listă a tuturor cererilor de tranzacție despre care a auzit și care nu au fost încă angajate în blockchain într-un bloc.
4. La un moment dat, un nod minier agregă câteva zeci sau sute de cereri de tranzacții într-un potențial [bloc](/en/developers/docs/blocks/), într-un mod care maximizează [>comisioanele de tranzacție](/en/developers/docs/gas/) pe care le câștigă, rămânând totuși sub limita de gaz a blocului. Nodul minier atunci:
   1. Verifică validitatea fiecărei cereri de tranzacție (adică nimeni nu încearcă să transfere eter dintr-un cont pentru care nu au produs o semnătură, cererea nu este malformată etc.) și apoi execută codul cererii, modificând starea copiei locale a EVM. Minerul acordă taxa de tranzacție pentru fiecare astfel de cerere de tranzacție propriului lor cont.
   2. Începe procesul de producere a „certificatului de legitimitate” al dovezii muncii (PoW) pentru blocul potențial, odată ce toate cererile de tranzacție din bloc au fost verificate și executate pe copia EVM locală.
5. În cele din urmă, un miner va finaliza producerea unui certificat pentru un bloc care include solicitarea noastră specifică de tranzacție. Minerul transmite apoi blocul completat, care include certificatul și o sumă de control a noului stat EVM revendicat.
6. Alte noduri aud despre noul bloc. Acestea verifică certificatul, execută singure toate tranzacțiile de pe bloc (inclusiv tranzacția difuzată inițial de către utilizatorul nostru) și verifică dacă suma de control a noii lor stări EVM după executarea tuturor tranzacțiilor se potrivește cu suma de control a statului revendicat de blocul minerului. Abia atunci aceste noduri adaugă acest bloc la coada blockchain-ului lor și acceptă noua stare EVM ca stare canonică.
7. Fiecare nod elimină toate tranzacțiile din noul bloc din mempool-ul local de cereri de tranzacții neîndeplinite.
8. Noile noduri care se alătură rețelei descarcă toate blocurile în ordine, inclusiv blocul care conține tranzacția noastră de interes. Ele inițializează o copie EVM locală (care începe ca un EVM cu stare goală), și apoi parcurg procesul de executare a fiecărei tranzacții din fiecare bloc peste copia EVM locală, verificând sumele de control de stare a fiecărui bloc pe parcurs.

Fiecare tranzacție este minată (inclusă într-un bloc nou și propagată pentru prima dată) o singură dată, dar executată și verificată de fiecare participant în procesul de avansare a stării canonice a EVM. Aceasta evidențiază una dintre formulele centrale sacre ale blockchain-ului: **Nu te încrede, verifică**.

## O demonstrație vizuală {#a-visual-demo}

Urmărește cum Austin te ghidează prin minerit și blockchain-ul de dovadă a muncii. <iframe width="100%" height="315" src="https://www.youtube.com/embed/zcX7OJ-L8XQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Referințe suplimentare {#further-reading}

- [Ce înseamnă pentru mine Ethereum?](https://docs.ethhub.io/using-ethereum/mining/) _EthHub_
- [Cum funcționează mineritul Ethereum](https://www.coindesk.com/information/ethereum-mining-works) _Coindesk_

## Instrumente corelate {#related-tools}

- [Mineri de top Ethereum](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Calculator minier Ethereum](https://minerstat.com/coin/ETH)

## Subiecte corelate {#related-topics}

- [Gaz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Dovada muncii](/developers/docs/consensus-mechanisms/pow/)
