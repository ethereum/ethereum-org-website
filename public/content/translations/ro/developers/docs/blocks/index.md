---
title: Blocuri
description: O prezentare generală a blocurilor din blockchain-ul Ethereum – structura lor de date, motivul pentru care sunt necesare și modul în care sunt realizate.
lang: ro
---

Blocurile sunt loturi de tranzacții cu un hash din blocul anterior din lanț. Acesta leagă blocurile (în lanț), deoarece hash-urile sunt derivate criptografic din datele blocului. Acest lucru previne frauda, pentru că o modificare a oricărui bloc din istoric ar invalida toate blocurile următoare, întrucât toate hash-urile ulterioare se vor schimba și toți cei care rulează blockchain-ul vor observa.

## Condiții prealabile {#prerequisites}

Conturile sunt un subiect foarte potrivit pentru începători. Dar, pentru a vă ajuta să înțelegeți mai bine această pagină, vă recomandăm să citiți mai întâi despre [Conturi](/developers/docs/accounts/), [Tranzacții](/developers/docs/transactions/) și [Introducerea noastră despre Ethereum](/developers/docs/intro-to-ethereum/).

## De ce blocuri? {#why-blocks}

Pentru a ne asigura că toți participanții din rețeaua Ethereum mențin o stare sincronizată și sunt de acord cu privire la istoricul exact al tranzacțiilor, grupăm tranzacțiile în blocuri. Aceasta înseamnă că zeci (sau sute) de tranzacții sunt comise, aprobate și sincronizate simultan.

![O diagramă care arată tranzacții dintr-un bloc care provoacă schimbări de stare](./tx-block.png) _Diagramă adaptată din [Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Crescând perioada dintre comiteri, acordăm tuturor participanților la rețea suficient timp pentru a ajunge la consens: chiar dacă solicitările de tranzacții apar de zeci de ori pe secundă, blocurile Ethereum sunt executate aproximativ o dată la cincisprezece secunde.

## Cum funcționează blocurile {#how-blocks-work}

Pentru a păstra istoricul tranzacțiilor, blocurile sunt strict ordonate (fiecare bloc nou creat conține o trimitere la blocul părinte) iar tranzacțiile din interiorul blocurilor sunt și acestea strict ordonate. Cu excepția cazurilor rare, la un moment dat toți participanții la rețea sunt de acord cu privire la numărul exact și istoricul blocurilor și lucrează la gruparea solicitărilor curente de tranzacții live în blocul următor.

Odată ce un bloc este asamblat (minat) de către un miner din rețea, acesta este propagat către restul rețelei; toate nodurile adaugă acest bloc la sfârșitul blockchain-ului lor, iar minarea continuă. Procesul exact de asamblare a blocurilor (minarea) și procesul comiterii/consensului sunt specificate în prezent prin protocolul Ethereum „dovada-muncii”.

### O demonstrație vizuală {#a-visual-demo}

<YouTube id="_160oMzblY8" />

## Protocolul „dovada-muncii” {#proof-of-work-protocol}

Dovada-muncii înseamnă următoarele:

- Nodurile de minare trebuie să cheltuiască o cantitate variabilă, dar substanțială de energie, timp și putere de calcul pentru a produce un „certificat de legitimitate” pentru un bloc pe care îl propun rețelei. Acest lucru ajută la protejarea rețelei împotriva atacurilor de tip „spam”/refuz al serviciului, printre altele, deoarece producerea certificatelor este costisitoare.
- Ceilalți miner-i care aud că un nou bloc are un certificat de legitimitate valabil trebuie să accepte noul bloc ca fiind următorul bloc canonic din blockchain.
- Timpul exact necesar pentru ca fiecare miner să producă acest certificat este o variabilă aleatorie cu varianță mare. Acest lucru garantează că este puțin probabil ca doi miner-i să producă simultan validări pentru următorul bloc propus; atunci când un miner produce și propagă un nou bloc certificat, poate fi aproape sigur că blocul va fi acceptat de rețea ca următorul bloc canonic pe blockchain, fără conflicte (deși există un protocol pentru a gestiona conflictele chiar și în cazul în care două lanțuri de blocuri certificate sunt produse aproape simultan).

[Mai multe despre minare](/developers/docs/consensus-mechanisms/pow/mining/)

## Ce este într-un bloc? {#block-anatomy}

- `timestamp` – momentul la care a fost minat blocul.
- `blockNumber` – lungimea blockchain-ului în blocuri.
- `baseFeePerGas` – taxa minimă pe gaz necesară pentru ca o tranzacție să fie inclusă în bloc.
- `difficulty` – efortul necesar pentru minarea blocului.
- `mixHash` – un identificator unic pentru blocul respectiv.
- `parentHash` – identificatorul unic pentru blocul care a precedat (acesta este modul în care sunt legate blocurile într-un lanț).
- `tranzacții` – tranzacțiile incluse în bloc.
- `stateRoot` – întreaga stare a sistemului: soldurile conturilor, stocarea contractelor, codul contractului și nonce-urile conturilor, toate acestea se află în interior.
- `nonce` – un hash care, atunci când este combinat cu mixtHash, dovedește că blocul a trecut prin [dovada-muncii](/developers/docs/consensus-mechanisms/pow/).

## Timpul blocului {#block-time}

Timpul blocului se referă la timpul necesar pentru minarea unui nou bloc. În Ethereum, timpul mediu al unui bloc este cuprins între 12 și 14 secunde și este evaluat după fiecare bloc. Timpul preconizat al blocului este stabilit ca o constantă la nivel de protocol și este utilizat pentru a proteja securitatea rețelei atunci când miner-ii adaugă mai multă putere de calcul. Timpul mediu al blocului se compară cu timpul preconizat al blocului, iar dacă timpul mediu al blocului este mai mare, atunci dificultatea este redusă în header-ul blocului. Dacă timpul mediu al blocului este mai mic, atunci dificultatea din header-ul blocului va crește.

## Mărimea blocului {#block-size}

O ultimă observație importantă este că blocurile însele sunt limitate ca dimensiune. Fiecare bloc are o dimensiune țintă de 15 milioane de gaz, însă dimensiunea blocurilor va crește sau va scădea în funcție de cerințele rețelei până la o limită a blocului de 30 de milioane de gaz (2x dimensiunea blocului țintă). Cantitatea totală de gaz consumată de toate tranzacțiile din bloc trebuie să fie mai mică decât limita de gaz a blocului. Acest lucru este important, deoarece garantează că blocurile nu pot fi prea mari. Dacă blocurile ar putea fi în mod arbitrar mari, atunci nodurile complete mai puțin performante ar înceta treptat să poată ține pasul cu rețeaua din cauza cerințelor de spațiu și viteză.

## Referințe suplimentare {#further-reading}

_Cunoașteți o resursă a comunității care v-a ajutat? Editați această pagină și adăugați-o!_

## Subiecte corelate {#related-topics}

- [Minarea](/developers/docs/consensus-mechanisms/pow/mining/)
- [Tranzacții](/developers/docs/transactions/)
- [Gaz](/developers/docs/gas/)
