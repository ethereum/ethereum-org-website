---
title: Introducere despre aplicațiile dapp
description:
lang: ro
---

O aplicație descentralizată (dapp) este o aplicație construită pe o rețea descentralizată care combină un [contract inteligent](/developers/docs/smart-contracts/) cu o interfață-utilizator frontend. În Ethereum, contractele inteligente sunt accesibile și transparente – ca API-uri deschise – astfel încât aplicația dvs. dapp poate include un contract inteligent scris de altcineva.

## Condiții prealabile {#prerequisites}

Înainte de a învăța despre aplicațiile dapp, ar trebui să treceţi prin [elementele de bază despre blockchain](/developers/docs/intro-to-ethereum/) și să citiţi despre rețeaua Ethereum și cum este descentralizată.

## Definiția unei aplicații dapp {#definition-of-a-dapp}

O aplicație dapp are propriul cod backend care rulează pe o rețea descentralizată peer-to-peer. Comparaţi acest lucru cu o aplicație în care codul backend se execută pe servere centralizate.

O aplicație dapp poate avea cod frontend și interfețe cu utilizatorul scrise în orice limbaj de programare (ca și o aplicație) pentru a efectua apeluri către backend-ul său. În plus, frontend-ul acesteia poate fi găzduit pe un spațiu de stocare descentralizat, cum ar fi [IPFS](https://ipfs.io/).

- **Descentralizate** - aplicaţiile dapp operează pe Ethereum, o platformă publică deschisă și descentralizată, în care nicio persoană sau grup nu deține controlul
- **Deterministe** - aplicaţiile dapp îndeplinesc aceeași funcție indiferent de mediul în care sunt executate
- **Turing complet** - aplicațiile dapp pot efectua orice acțiune dacă dispun de resursele necesare
- **Izolat** - aplicațiile dapp sunt executate într-un mediu virtual cunoscut sub numele de Mașina Virtuală Ethereum, în așa fel încât, dacă acel contract inteligent are un bug, acesta nu va împiedica funcționarea normală a rețelei blockchain

### Despre contractele inteligente {#on-smart-contracts}

Pentru a introduce aplicațiile dapp, avem nevoie să introducem contractele inteligente – un backend al aplicației dapp, în lipsa unui termen mai bun. Pentru o prezentare detaliată, accesați secțiunea noastră despre [contractele inteligente](/developers/docs/smart-contracts/).

Un contract inteligent este un cod care locuieşte pe blockchain-ul Ethereum și funcționează exact așa cum a fost programat. Odată ce contractele inteligente sunt implementate în rețea, nu le mai puteți modifica. Aplicațiile dapp pot fi descentralizate, pentru că sunt controlate de logica scrisă în contract, nu de un individ sau o companie. Acest lucru înseamnă şi că trebuie să concepeţi cu foarte mare atenție contractele și să le testaţi în detaliu.

## Avantajele dezvoltării de aplicații dapp {#benefits-of-dapp-development}

- **Zero inactivitate** - odată ce contractul inteligent este implementat și se află pe blockchain, rețeaua ca întreg va fi întotdeauna capabilă să deservească clienții care doresc să interacționeze cu contractul. Prin urmare, actorii răuvoitori nu pot lansa atacuri de refuz al serviciului care vizează aplicațiile dapp individuale.
- **Confidențialitate** – nu trebuie să furnizaţi informaţii de identitate din lumea reală pentru a implementa sau interacționa cu o aplicație dapp.
- **Rezistența la cenzură** – nicio entitate din rețea nu poate bloca utilizatorii să trimită tranzacții, să implementeze aplicații dapp sau să citească date din blockchain.
- **Integritate completă a datelor** – datele stocate pe blockchain sunt imuabile și incontestabile, datorită primitivelor criptografice. Actorii răuvoitori nu pot falsifica tranzacțiile sau alte date care au fost deja făcute publice.
- **Calcule fără necesitatea de a acorda încredere / comportament verificabil** – contractele inteligente pot fi analizate și este garantată funcţionarea acestora în moduri previzibile, fără necesitatea de a acorda încredere unei autorităţi centrale. Acest lucru nu este valabil la modelele tradiționale; de exemplu, atunci când utilizăm sisteme bancare online, trebuie să avem încredere că instituțiile financiare nu vor utiliza în mod abuziv datele noastre financiare, că nu vor modifica înregistrările şi că nu vor fi piratate.

## Dezavantajele dezvoltării aplicațiilor dapp {#drawbacks-of-dapp-development}

- **Întreținere** – aplicațiile dapp pot fi mai greu de întreținut, deoarece codul și datele publicate în blockchain sunt mai greu de modificat. Este dificil pentru programatori să-și actualizeze aplicațiile dapp (sau datele de bază stocate de un dapp) odată ce acestea sunt implementate - chiar dacă într-o versiune veche sunt identificate bug-uri sau riscuri de securitate.
- **Performanțe excesive** – au un exces de funcții pentru a le îmbunătăți performanțele, iar scalarea este foarte dificilă. Pentru a atinge nivelul de securitate, integritate, transparență și fiabilitate la care aspiră Ethereum, fiecare nod rulează și stochează fiecare tranzacție. În plus, dovada-muncii necesită şi timp. Dintr-un calcul foarte aproximativ, se obţine un exces cam de 1.000.000 de ori mai mare decât este cazul actualmente la un calcul standard.
- **Congestia rețelei** – atunci când o aplicație dapp utilizează prea multe resurse de calcul, întreaga rețea devine saturată. Actualmente rețeaua este capabilă să proceseze doar aproximativ 10-15 tranzacții pe secundă; în cazul în care tranzacțiile sunt trimise la o viteză mai mare decât aceasta, lista temporară de tranzacții neconfirmate poate crește foarte repede.
- **Experiența utilizatorului** – ar fi mai greu de dezvoltat aplicații uşor de utilizat, deoarece utilizatorului final ce are cunoştinţe obişnuite i s-ar putea părea prea dificil să configureze o stivă de instrumente necesare pentru a interacționa cu blockchain-ul în deplină securitate.
- **Centralizare** – soluțiile uşor de utilizat și de dezvoltat construite pe nivelulvde bază al lui Ethereum s-ar putea oricum prezenta în final ca niște servicii centralizate. De exemplu, astfel de servicii pot stoca chei sau alte informații sensibile pe partea serverului, pot servi un frontend folosind un server centralizat sau pot rula o logică importantă de activităţi pe un server centralizat înainte de a scrie în blockchain. Centralizarea elimină multe avantaje (dacă nu toate) pe care le oferă blockchain-ul față de modelul tradițional.

## Învățați mai ușor prin vizualizare? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Instrumentele aplicaţiilor dapp {#dapp-tools}

**Scaffold-ETH _- experimentați rapid cu Solidity folosind un frontend care se adaptează la contractul dvs. inteligent._**

- [GitHub](https://github.com/austintgriffith/scaffold-eth)
- [Exemplu de aplicaţie dapp](https://punkwallet.io/)

**Create Eth App _- creați aplicații acţionate de Ethereum cu o singură comandă._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- instrument FOSS pentru generarea de frontend-uri pentru aplicații dapp dintr-un [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- instrument FOSS pentru dezvoltatorii Ethereum ca să-şi testeze nodul și ca să compună & apeluri RPC de eliminare a bug-urilor din browser._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

## Referințe suplimentare {#further-reading}

- [Arhitectura unei aplicații Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Un ghid din 2021 pentru aplicații descentralizate](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Ce sunt aplicațiile descentralizate?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_

_Cunoașteți o resursă a comunității care v-a ajutat? Editați această pagină și adăugați-o!_

## Subiecte corelate {#related-topics}

- [Introducere despre stiva Ethereum](/developers/docs/ethereum-stack/)
- [Framework-uri de dezvoltare](/developers/docs/frameworks/)
