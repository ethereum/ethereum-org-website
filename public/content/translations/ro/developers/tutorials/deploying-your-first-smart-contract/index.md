---
title: Implementarea primului dvs. contract inteligent
description: Introducere despre implementarea primului dvs. contract inteligent într-o rețea de testare Ethereum
author: "jdourlens"
tags:
  - "contracte inteligente"
  - "remix"
  - "solidity"
  - "noțiuni de bază"
  - "implementare"
skill: beginner
lang: ro
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Cred că sunteţi la fel de entuziasmat ca noi să [implementaţi](/developers/docs/smart-contracts/deploying/) și să interacționaţi cu primul dvs. [contract inteligent](/developers/docs/smart-contracts/) pe blockchain-ul Ethereum.

Nu vă faceți griji, deoarece este primul nostru contract inteligent, îl vom implementa pe o [rețea locală de testare](/developers/docs/networks/), astfel încât să nu vă coste nimic să îl implementați și să încercați tot ce doriți cu el.

## Cum ne scriem contractul {#writing-our-contract}

Primul pas este să vizitaţi [Remix](https://remix.ethereum.org/) și să creaţi un fișier nou. În partea din stânga sus a interfeței Remix, adaugaţi un nou fișier și introduceţi numele dorit al fișierului.

![Adăugarea unui fișier nou în interfața Remix](./remix.png)

Vom insera următorul cod în noul fişier.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Public variable of type unsigned int to keep the number of counts
    uint256 public count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
    }

    // Not necessary getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Dacă sunteţi obişnuit să programaţi, vă puteţi da seama uşor ce face acest program. Iată un explicator linie cu linie:

- Linia 3: Definim un contract cu numele `Counter`.
- Linia 6: Contractul nostru stochează un număr întreg nesemnat numit `count`, începând de la 0.
- Linia 9: Prima funcție va modifica starea contractului și `increment()`(va creşte) variabila noastră `count`.
- Linia 14: A doua funcție este doar un getter pentru a putea citi valoarea variabilei `count` în afara contractului inteligent. Rețineţi că, întrucât am definit variabila noastră `count` ca fiind publică, aceasta nu este necesară, dar este prezentată ca exemplu.

Este tot ce avem de făcut pentru primul nostru contract inteligent simplu. După cum ştiţi probabil, arată ca o clasă din limbajele OOP, cum ar fi Java sau C++. A sosit momentul să facem încercări cu contractul nostru.

## Implementarea contractului nostru {#deploying-our-contract}

Acum, că ne-am scris primul contract inteligent, îl implementăm în blockchain pentru a putea face încercări cu el.

[Implementarea contractului inteligent în blockchain](/developers/docs/smart-contracts/deploying/) este de fapt doar trimiterea unei tranzacții care conține codul contractului inteligent compilat, fără a specifica vreun destinatar.

Mai întâi vom [compila contractul](/developers/docs/smart-contracts/compiling/) făcând clic pe pictograma de compilare din partea stângă:

![Pictograma de compilare din bara de instrumente Remix](./remix-compile-button.png)

Faceți clic apoi pe butonul de compilare:

![Butonul de compilare din compilatorul Remix solidity](./remix-compile.png)

You can choose to select the “Auto compile” option so the contract will always be compiled when you save the content on the text editor.

Apoi navigaţi la „deploy” și rulaţi ecranul de tranzacții:

![Pictograma de implementare din bara de instrumente Remix](./remix-deploy.png)

Odată cevă aflaţi în ecranul de „implementare și executare” tranzacţii, verificaţi din nou dacă apare numele contractului dvs. și faceţi clic pe „Deploy”. As you can see on the top of the page, the current environment is “JavaScript VM” that means that we’ll deploy and interact with our smart contract on a local test blockchain to be able to test faster and without any fees.

![Butonul de implementare din compilatorul Remix solidity](./remix-deploy-button.png)

După ce aţi făcut clic pe butonul „Deploy”, vă veţi vedea contractul în partea de jos. Faceţi clic pe săgeata din stânga pentru a o extinde, astfel încât să vedem conținutul contractului nostru. Aceasta este variabila `counter`, funcția noastră `increment()` și getter-ul `getCounter()`.

Dacă faceţi clic pe butonul `count` sau `getCount`, acesta va prelua conținutul variabilei `count` a contractului și îl va afișa. Deoarece nu am apelat încă funcția `increment`, ar trebui să afișeze 0.

![Butonul funcție din compilatorul Remix solidity](./remix-function-button.png)

Să apelăm acum funcția `increment` făcând clic pe buton. Veţi vedea jurnalele tranzacțiilor efectuate, care apar în partea de jos a ferestrei. Veţi vedea că jurnalele sunt diferite atunci când apăsaţi butonul de preluare a datelor, în locul butonului `increment`. Acest lucru se datorează faptului că citirea datelor pe blockchain nu are nevoie de tranzacții (scriere) sau taxe. Deoarece doar modificarea stării blockchain-ului necesită efectuarea unei tranzacții:

![Un registru al tranzacțiilor](./transaction-log.png)

După apăsarea butonului de incrementare, care va genera o tranzacție pentru a apela funcția noastră `increment()` dacă facem clic din nou pe butoanele count sau getCount, vom citi noua stare actualizată a contractului nostru inteligent, cu variabila count mai mare decât 0.

![Starea recent actualizată a contractului inteligent](./updated-state.png)

În tutorialul următor, vom acoperi [cum puteţi adăuga evenimente la contractele dvs. inteligente](/developers/tutorials/logging-events-smart-contracts/). Înregistrarea evenimentelor este o modalitate convenabilă de a elimina bug-urile din contractul dvs. inteligent și de a înțelege ce se întâmplă în timp ce apelaţi o funcție.
