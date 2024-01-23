---
title: Introducere despre stiva Ethereum
description: O prezentare a diferitelor niveluri ale stivei Ethereum și a modului în care se îmbină.
lang: ro
---

Ca orice stivă de software, „Stiva Ethereum” completă este diferită de la un proiect la altul, în funcție de obiectivele dvs.

Cu toate acestea, există tehnologii de bază în Ethereum care oferă un model mental al modului în care interacţionează aplicațiile software cu blockchain-ul Ethereum. Dacă înţelegeţi nivelurile stivei, aceasta vă va ajuta să înţelegeţi diferitele moduri în care poate fi integrat Ethereum în proiecte de software.

## Nivelul 1: Mașina Virtuală Ethereum {#ethereum-virtual-machine}

[Mașina Virtuală Ethereum (EVM)](/developers/docs/evm/) este mediul runtime pentru contractele inteligente în Ethereum. Toate contractele inteligente și modificările de stare ale blockchain-ului Ethereum sunt executate de [tranzacții](/developers/docs/transactions/). EVM se ocupă de procesarea tuturor tranzacțiilor din rețeaua Ethereum.

Ca oricare mașină virtuală, EVM creează un nivel de abstractizare între codul de execuţie și mașina de execuţie (un nod Ethereum). Actualmente EVM rulează pe mii de noduri distribuite în întreaga lume.

În culise, EVM folosește un set de instrucțiuni opcode pentru a executa sarcini specifice. Aceste opcoduri (în număr de 140, unice) permit EVM să fie Turing-completă, ceea ce înseamnă că EVM este capabilă să calculeze aproape orice dacă posedă resurse suficiente.

Ca dezvoltator de aplicaţii dapp, nu trebuie să ştiţi prea multe despre EVM, în afară de faptul că există și că activează în mod fiabil toate aplicațiile de pe Ethereum, fără întreruperi.

## Nivelul 2: Contracte inteligente {#smart-contracts}

[Contractele inteligente](/developers/docs/smart-contracts/) sunt programele executabile care rulează pe blockchain-ul Ethereum.

Contractele inteligente sunt scrise folosind [limbaje de programare](/developers/docs/smart-contracts/languages/) care compilează în EVM bytecode (instrucțiuni de nivel scăzut ale mașinii numite opcoduri).

Contractele inteligente nu numai că servesc ca biblioteci open source, ci sunt în esență servicii API deschise care rulează în permanenţă și nu pot fi eliminate. Contractele inteligente oferă funcții publice cu care pot interacţiona utilizatorii și aplicațiile ([dapps](/developers/docs/dapps/)) fără a avea nevoie de permisiune. Orice aplicație se poate integra în contractele inteligente implementate pentru a compune funcționalități, cum ar fi adăugarea de [fluxuri de date](/developers/docs/oracles/) sau pentru a accepta swap-uri de tokenuri. În plus, oricine poate implementa noi contracte inteligente pe Ethereum pentru a adăuga funcționalități personalizate necesare aplicaţiilor proprii.

Ca dezvoltator de aplicații dapp, va trebui să scrieţi contracte inteligente numai dacă doriţi să adăugaţi funcționalități personalizate pe blockchain-ul Ethereum. Aţi putea descoperi că puteţi întruni cele mai multe sau toate condiţiile proiectului prin simpla integrare cu contractele inteligente existente, de exemplu, dacă doriţi să acceptaţi plățile în stablecoins sau să activaţi schimburi descentralizate de tokenuri.

## Nivelul 3: Noduri Ethereum {#ethereum-nodes}

Pentru ca o aplicație să interacționeze cu blockchain-ul Ethereum, trebuie să se conecteze la un [nod Ethereum](/developers/docs/nodes-and-clients/). Conectarea la un nod vă permite să citiţi datele blockchain-ului și/sau să trimiteţi tranzacții în rețea.

Nodurile Ethereum sunt computere care rulează software - un client Ethereum. Un client este o implementare a lui Ethereum care verifică toate tranzacțiile din fiecare bloc, menţinând securitatea reţelei şi precizia datelor. **Ethereum nodes are the Ethereum blockchain**. Acestea stochează în mod colectiv starea blockchain-ului Ethereum și ajung la un consens cu privire la tranzacțiile de transformare a stării blockchain-ului.

Prin conectarea aplicației dvs. la un nod Ethereum (prin intermediul [API-ului JSON-RPC](/developers/docs/apis/json-rpc/)), aplicația dvs. poate citi datele din blockchain (cum ar fi soldurile conturilor de utilizator) și poate transmite tranzacții noi în rețea (cum ar fi transferul de ETH între conturile de utilizator sau executarea funcțiilor din contractele inteligente).

## Nivelul 4: API-uri client Ethereum {#ethereum-client-apis}

Multe biblioteci utile (construite și întreținute de comunitatea open source Ethereum) permit aplicațiilor dvs. să se conecteze și să comunice cu blockchain-ul Ethereum.

Dacă aplicația destinată utilizatorilor este o aplicație web, puteţi opta să executaţi comanda `npm install` pentru a instala [API JavaScript](/developers/docs/apis/javascript/) direct în frontend. Sau poate că veţi opta să implementaţi această funcționalitate pe partea de server, folosind un API [Python](/developers/docs/programming-languages/python/) sau [Java](/developers/docs/programming-languages/java/).

Chiar dacă aceste API-uri nu sunt o parte necesară a stivei, ele înlătură o mare parte din complexitatea interacţionării directe cu un nod Ethereum. Ele oferă de asemenea funcții utilitare (cum ar fi conversia din ETH în Gwei), astfel încât dvs. ca dezvoltator să petreceţi mai mult timp axându-vă pe funcționalitatea specifică a aplicaţiei dvs. decât încercând să vă descurcaţi cu complexitatea clienților Ethereum.

## Nivelul 5: Aplicații pentru utilizatorul final {#end-user-applications}

La nivelul cel mai de sus al stivei sunt aplicații destinate utilizatorilor. Acestea sunt aplicațiile standard pe care le utilizaţi și le construiţi în mod regulat astăzi: în primul rând aplicații web și mobile.

Modul în care dezvoltaţi aceste interfețe cu utilizatorul rămâne în esență neschimbat. Adesea utilizatorii nu trebuie să știe că aplicația pe care o utilizează este construită folosind un blockchain.

## Sunteţivgata să vă alegeţi stiva? {#ready-to-choose-your-stack}

Consultaţi ghidul nostru pentru a [configura un mediu de dezvoltare local](/developers/local-environment/) pentru aplicația dvs. Ethereum.

## Referințe suplimentare {#further-reading}

- [Arhitectura aplicațiilor Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Cunoaşteţi o resursă comunitară care v-a ajutat? Editaţi această pagină și adăugaţi-o!_
