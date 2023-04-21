---
title: Minarea
description: O explicație a modului în care funcționează minarea în Ethereum și modul în care aceasta ajută la menținerea lui Ethereum în securitate și descentralizat.
lang: ro
incomplete: true
---

## Condiții prealabile {#prerequisites}

Pentru a înțelege mai bine această pagină, vă recomandăm să citiți mai întâi despre [tranzacții](/developers/docs/transactions/), <a href="/developers/docs/blocks/">blocuri</a> și [dovada-muncii (PoW)](/developers/docs/consensus-mechanisms/pow/).

## Ce este minarea pe Ethereum? {#what-is-ethereum-mining}

Minarea este procesul de creare a unui bloc de tranzacții care trebuie adăugat la blockchain-ul Ethereum.

Ethereum, la fel ca Bitcoin, utilizează în prezent un mecanism de consens prin [dovada-muncii (PoW)](/developers/docs/consensus-mechanisms/pow/). Minarea este forța vie a dovezii-muncii. Miner-ii Ethereum - computere care rulează software - își folosesc timpul și puterea de calcul pentru a procesa tranzacții și a produce blocuri.

<InfoBanner emoji=":wave:">
   Dovada-mizei va înlocui minarea și dovada-muncii în cursul anului viitor. Puteți începe de astăzi să vă mizați ETH-ul. <a href="/staking/">Aflați mai multe despre mizare</a>    
</InfoBanner>

## De ce există miner-i? {#why-do-miners-exist}

În sistemele descentralizate precum Ethereum trebuie să ne asigurăm că toată lumea este de acord cu ordinea tranzacțiilor. Miner-ii contribuie la realizarea acestui lucru rezolvând puzzle-uri de calcul dificile pentru a produce blocuri, ceea ce servește ca modalitate de a proteja rețeaua de atacuri.

[Mai multe despre dovada-muncii](/developers/docs/consensus-mechanisms/pow/)

## Cine poate deveni miner pe Ethereum? {#who-can-become-a-miner}

Din punct de vedere tehnic, oricine poate mina în rețeaua Ethereum folosindu-și computerul. Totuși, nu toată lumea poate mina ether (ETH) în mod profitabil. În majoritatea cazurilor, miner-ii trebuie să cumpere echipamente informatice specializate pentru a mina în mod profitabil. Deși este adevărat că oricine poate rula software-ul de minare pe computerul său, este puțin probabil ca un computer obișnuit să câștige recompense suficiente sub formă de blocuri pentru a acoperi costurile minării.

### Costul minării {#cost-of-mining}

- Costurile potențiale de hardware necesare pentru construirea și întreținerea unei platforme de minare
- Costul electricității pentru alimentarea platformei de minare
- Dacă minați în grup, grupurile de minare percep de obicei o taxă fixă procentuală pentru fiecare bloc generat de grup
- Costul potențial al echipamentului necesar pentru susținerea platformei de minare (ventilație, monitorizare energetică, cabluri electrice etc.)

Pentru a analiza în continuare profitabilitatea minării, utilizați un calculator de minare, cum ar fi cel oferit de [Etherscan](https://etherscan.io/ether-mining-calculator).

## Cum sunt minate tranzacțiile în Ethereum {#how-ethereum-transactions-are-mined}

1. Un utilizator scrie și semnează o cerere de [tranzacție](/developers/docs/transactions/) cu cheia privată a unui [cont](/developers/docs/accounts/).
2. Utilizatorul transmite cererea de tranzacție către întreaga rețea Ethereum de la un anumit [nod](/developers/docs/nodes-and-clients/).
3. După primirea noii cereri de tranzacție, fiecare nod din rețeaua Ethereum adaugă cererea în mempool-ul local, o listă a tuturor cererilor de tranzacție despre care a auzit și care nu au fost încă alocate în blockchain într-un bloc.
4. La un moment dat, un nod de minare agregă câteva zeci sau sute de cereri de tranzacții într-un potențial [bloc](/developers/docs/blocks/), într-un mod care maximizează [>comisioanele de tranzacție](/developers/docs/gas/) pe care le câștigă, rămânând totuși sub limita de gaz a blocului. Atunci nodul de minare:
   1. Verifică validitatea fiecărei cereri de tranzacție (și anume că nimeni nu încearcă să transfere ether dintr-un cont pentru care nu a produs o semnătură, că cererea nu este malformată etc.) și apoi execută codul cererii, modificând starea copiei locale a EVM. Miner-ul atribuie taxa de tranzacție pentru fiecare astfel de cerere de tranzacție în propriul cont.
   2. Începe procesul de producere a „certificatului de legitimitate” al dovezii-muncii (PoW) pentru blocul potențial, odată ce toate cererile de tranzacție din bloc au fost verificate și executate pe copia EVM locală.
5. În cele din urmă, un miner va finaliza producerea unui certificat pentru un bloc care include solicitarea noastră de tranzacție anume. Miner-ul transmite apoi blocul completat, care include certificatul și o sumă de control a noii stări EVM revendicate.
6. Alte noduri aud despre noul bloc. Acestea verifică certificatul, execută singure toate tranzacțiile de pe bloc (inclusiv tranzacția difuzată inițial de către utilizatorul nostru) și verifică dacă suma de control a noii lor stări EVM după executarea tuturor tranzacțiilor se potrivește cu suma de control a stării revendicate de blocul miner-ului. Abia atunci aceste noduri adaugă acest bloc în coada blockchain-ului lor și acceptă noua stare EVM ca stare canonică.
7. Fiecare nod elimină toate tranzacțiile din noul bloc din mempool-ul său local de cereri de tranzacții neîndeplinite.
8. Noile noduri care se alătură rețelei descarcă toate blocurile în ordine, inclusiv blocul care conține tranzacția de care suntem interesați. Aceștia inițializează o copie EVM locală (care începe ca un EVM cu stare goală) și apoi parcurg procesul de execuție a fiecărei tranzacții din fiecare bloc peste copia EVM locală, verificând sumele de control pentru starea fiecărui bloc de pe parcurs.

Fiecare tranzacție este minată (inclusă într-un bloc nou și propagată pentru prima dată) o singură dată, dar executată și verificată de fiecare participant la procesul de avansare a stării canonice a EVM. Aceasta evidențiază una dintre formulele centrale sacre ale blockchain-ului: **Să nu aveți încredere, verificați**.

## O demonstrație vizuală {#a-visual-demo}

Urmăriți cum vă îndrumă Austin în procesul de minare și blockchain-ul dovezii-muncii.

<YouTube id="zcX7OJ-L8XQ" />

## Referințe suplimentare {#further-reading}

## Instrumente corelate {#related-tools}

- [Miner-i de top în Ethereum](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Calculator de minare Etherscan](https://etherscan.io/ether-mining-calculator)
- [Minerstat mining calculator](https://minerstat.com/coin/ETH)

## Subiecte corelate {#related-topics}

- [Gaz](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Dovada-muncii](/developers/docs/consensus-mechanisms/pow/)
