---
title: Introducere în aplicații dapp
description:
lang: ro
sidebar: true
---

O aplicație descentralizată (dapp) este o aplicație construită pe o rețea descentralizată care combină un [contract inteligent](/en/developers/docs/smart-contracts/) și o interfață front-end cu utilizatorul. Notă, în Ethereum, contractele inteligente sunt accesibile și transparente – ca API-uri deschise – astfel încât aplicația ta dapp poate include un contract inteligent scris de altcineva.

## Condiții prealabile {#prerequisites}

Înainte de a învăța despre aplicațiile dapp, ar trebui să treci prin [elementele de bază despre blockchain](/developers/docs/intro-to-ethereum/) și să citești despre rețeaua Ethereum și modul în care este descentralizată.

## Definiția unei aplicații dapp {#definition-of-a-dapp}

O aplicație dapp are propriul cod back-end care rulează pe o rețea descentralizată peer-to-peer. Compară acest lucru cu o aplicație cu codul back-end care se execută pe servere centralizate.

O aplicație dapp poate avea cod front-end și interfețe de utilizator scrise în orice limbaj de programare (ca și o aplicație) care poate efectua apeluri către back-end-ul său. În plus, front-end-ul poate fi găzduit pe un spațiu de stocare descentralizat, cum ar fi [IPFS](https://ipfs.io/).

- **Descentralizat** care le face independente, și nimeni nu le controlează.
- **Determinist** adică îndeplinesc aceeași funcție, indiferent de mediul în care sunt executate.
- **Turing compatibil**, ceea ce înseamnă că dacă are resurse de cod suficiente, aplicația dapp poate efectua orice acțiune.
- **Izolat**, ceea ce înseamnă că sunt executate într-un mediu virtual cunoscut sub numele de Ethereum Virtual Machine, astfel încât, dacă acest contract inteligent se întâmplă să aibă o eroare, aceasta nu va împiedica funcționarea normală a rețelei blockchain.

### Despre contractele inteligente {#on-smart-contracts}

Pentru a introduce aplicațiile dapp, avem nevoie să introducem contractele inteligente – un back-end al aplicației dapp, în lipsa unui termen mai bun. Pentru o prezentare detaliată, accesează secțiunea noastră despre [contracte inteligente](/en/developers/docs/smart-contracts/).

Un contract inteligent este un cod care trăiește pe blockchain-ul Ethereum și funcționează exact așa cum a fost programat. Odată ce sunt implementate în rețea, nu le poți schimba. Aplicațiile dapp pot fi descentralizate, pentru că sunt controlate de logica scrisă în contract, nu de un individ sau o companie. Acest lucru înseamnă, de asemenea, că trebuie să concepi cu foarte mare atenție contractele și să le testezi în detaliu.

<!--Benefits and implications provided by Brian Gu)-->

## Avantajele dezvoltării de aplicații dapp {#benefits-of-dapp-development}

- **Zero inactivitate** – odată ce contractul inteligent din centrul unei aplicații este implementat și se află pe blockchain, rețeaua ca un întreg va fi întotdeauna în măsură să servească clienții care doresc să interacționeze cu contractul. Prin urmare, actorii răuvoitori nu pot lansa atacuri de refuzare a serviciului care vizează aplicațiile dapp individuale.
- **Confidențialitate** – nu trebuie să furnizezi identitatea din lumea reală pentru a implementa sau interacționa cu o aplicație dapp.
- **Rezistența la cenzură** – nicio entitate din rețea nu poate bloca utilizatorii să trimită tranzacții, să implementeze aplicații dapp sau să citească date din blockchain.
- **Integritate completă a datelor** – datele stocate pe blockchain sunt imuabile și incontestabile, datorită primitivelor criptografice. Actorii răuvoitori nu pot falsifica tranzacțiile sau alte date care au fost deja făcute publice.
- **Calcule fără încredere/comportament verificabil** – contractele inteligente pot fi analizate și sunt garantate să funcționeze în moduri previzibile, fără a fi necesar să ai încredere într-o autoritate centrală. Acest lucru nu este adevărat în modelele tradiționale; de exemplu, atunci când utilizăm sisteme bancare online, trebuie să avem încredere în instituțiile financiare că nu vor utiliza în mod abuziv datele noastre financiare, că nu vor modifica înregistrările sau că nu vor fi piratate.

## Implicațiile dezvoltării aplicației dapp {#implications-of-dapp-development}

<!-- - Transparency – transactions that trigger dapp functionality are public
- Open source
- Cost of storage – contracts are often only small percentages of the dapp. They are stored on-chain and this storage needs to be paid for, so it can be expensive.
 -->

- **Întreținere** – aplicațiile dapp pot fi mai greu de întreținut, deoarece codul și datele publicate în blockchain sunt mai greu de modificat. Este greu pentru programatori să-și actualizeze aplicațiile dapp (sau datele de bază stocate de un dapp) odată ce acestea sunt implementate - chiar dacă într-o versiune veche sunt identificate erori sau riscuri de securitate.
- **Performanță excesivă** – au un exces de funcții pentru le mări performanțele, încât scalabilitatea este foarte dificilă. Pentru a atinge nivelul de securitate, integritate, transparență și fiabilitate la care aspiră Ethereum, fiecare nod rulează și stochează fiecare tranzacție. În plus, dovada muncii necesită timp, de asemenea. Un calcul grosier pune excesul de calcule la ceva de genul de 1.000.000 de ori mai multe decât calculul standard în prezent.
- **Congestia rețelei** – cel puțin în modelul actual, dacă o aplicație dapp utilizează prea multe resurse de calcul, întreaga rețeaua încearcă să o susțină. În prezent, rețeaua este capabilă să proceseze doar aproximativ 10 tranzacții pe secundă; în cazul în care tranzacțiile sunt trimise mai repede decât aceasta, lista temporară de tranzacții neconfirmate poate crește foarte repede.
- **Experiența utilizatorului** – poate fi mai greu să proiectezi aplicații ușor de utilizat: utilizatorul final mediu ar putea găsi prea dificil să configureze o stivă de instrumente necesară interacțiunii cu blockchain-ul de o manieră cu adevărat securizată.

  - **Centralizare** – Soluțiile ușor de utilizat și ușor de dezvoltat construite pe stratul de bază al Ethereum, ar putea ajunge să arate ca serviciile centralizate: de exemplu, astfel de servicii pot să stocheze chei sau alte informații sensibile din partea serverului, pot servi un front-end folosind un server centralizat sau pot rula o logică de afaceri importantă pe un server centralizat înainte de a le scrie în blockchain. Acest lucru elimină multe (dacă nu toate) avantajele blockchain-ului față de modelul tradițional.<!-- ## Types of dapp

- Involving money
- Involving money and something else
- Other, including decentralized autonomous organizations

---==crwdHRulesLBB_2_BBsuleRHdwrc==

The application has to be open-source, operate autonomously, and can not be controlled by any one entity.
All data and record must be cryptographically stored in a public, decentralized blockchain.
The app must use a cryptographic token, also referred to as an App Coin, to access the application.
Tokens must be generated in order to prove the value nodes that contribute to the application.

---==crwdHRulesLBB_2_BBsuleRHdwrc==
-->## Instrumente Dapp {#dapp-tools}

**Rimble UI** **_- Componente adaptabile și standarde de design pentru aplicații descentralizate._**

- [rimble.consensys.design](https://rimble.consensys.design)
- [GitHub](https://github.com/ConsenSys/rimble-ui)

**One Click Dapp** **_- Instrument FOSS pentru a genera front-end-uri aplicației dapp dintr-un ABI._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/One-Click-Dapp/one-click-dApp)

**Etherflow** **_ - Instrument FOSS pentru programatorii Ethereum pentru a-și testa nodurile și a compune și depana apeluri RPC din browser._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

## Referințe suplimentare {#further-reading}

_Cunoști o resursă comunitară care te-a ajutat? Editează această pagină și adaug-o!_

## Subiecte corelate {#related-topics}

- [Introducere în stiva Ethereum](/en/developers/docs/ethereum-stack/)
- [Cadrele de dezvoltare](/en/developers/docs/frameworks/)
