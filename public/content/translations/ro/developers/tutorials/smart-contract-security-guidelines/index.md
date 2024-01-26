---
title: Liniile directoare privind securitatea contractelor inteligente
description: O listă de verificare a ghidurilor de securitate de luat în considerare la construirea aplicației dapp
author: "Trailofbits"
tags:
  - "solidity"
  - "contracte inteligente"
  - "securitate"
skill: intermediate
lang: ro
published: 2020-09-06
source: Construirea de contracte sigure
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Urmează aceste recomandări la nivel înalt pentru a crea contracte inteligente mai sigure.

## Linii directoare de proiectare {#design-guidelines}

Proiectarea contractului trebuie discutată din timp, înainte de a scrie orice linie de cod.

### Documentație și specificații {#documentation-and-specifications}

Documentația poate fi scrisă la diferite niveluri și trebuie actualizată în timpul implementării contractelor:

- **O descriere simplă în limba engleză a sistemului**, care prezintă ce fac contractele și orice ipoteze despre baza de coduri.
- **Schema și diagramele arhitecturale**, inclusiv interacțiunile contractuale și starea mașinii sistemului. [imprimantele Slither](https://github.com/crytic/slither/wiki/Printer-documentation) pot ajuta la generarea acestor scheme.
- **Documentația detaliată a codului**, [în format Natspec](https://solidity.readthedocs.io/en/develop/natspec-format.html) poate fi utilizată pentru Solidity.

### Calculul în lanț față de cel în afara lanțului {#on-chain-vs-off-chain-computation}

- **Păstrează cât mai mult cod în afara lanțului.** Menține nivelul în lanț mic. Pre-procesează datele cu codul în afara lanțului, astfel încât verificarea în lanț să fie simplă. Ai nevoie de o listă ordonată? Sortează lista în afara lanțului și numai după aceea verifică ordinea în lanț.

### Posibilitate de upgrade {#upgradeability}

Am discutat despre diferitele soluții de upgrade pe [blogul nostru](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Fă o alegere deliberată pentru a susține posibilitatea de upgrade sau nu înainte de a scrie orice cod. Decizia va influența modul în care îți structurezi codul. În general, recomandăm:

- **Favorizarea [migrării contractelor](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) cu posibilitate de upgrade.** Sistemul de migrare are multe dintre aceleași avantaje ca cele actualizabile, fără dezavantajele acestora.
- **Folosirea modelului de „separare a datelor” în loc de „delegatecallproxy".** Dacă proiectul tău are o separare clară a abstractizării, posibilitatea de upgrade utilizând separarea datelor va necesita doar câteva reglaje. DelegatecallProxy necesită expertiză EVM și este foarte predispus la erori.
- **Documentarea procedurii de migrare/upgrade înainte de implementare.** Dacă trebuie să reacționezi în condiții de stres, fără nici un ghid, vei face greșeli. Scrie procedura de urmat din timp. Aceasta ar trebui să includă:
  - Apelurile care inițiază noile contracte
  - Unde sunt stocate cheile și cum pot fi accesate
  - Cum să verifici implementarea! Elaborează și testează un script post-implementare.

## Orientări de implementare {#implementation-guidelines}

**Luptă-te pentru simplitate.** Folosește întotdeauna soluția cea mai simplă potrivită scopului tău. Orice membru din echipa ta trebuie să poată să-ți înțeleagă soluția.

### Compoziția funcției {#function-composition}

Arhitectura bazei de coduri ar trebui să ușureze examinarea codului. Evită alegerile arhitecturale care scad capacitatea de a raționa despre corectitudinea sa.

- **Divizează logica sistemului**, fie prin contracte multiple, fie prin gruparea unor funcții similare (de exemplu, autentificare, aritmetice,... ).
- **Scrie funcții mici, cu un scop clar.** Acest lucru va facilita revizuirea și va permite testarea componentelor individuale.

### Moștenire {#inheritance}

- **Păstrează moștenirea ușor de gestionat.** Moștenirea ar trebui să fie folosită pentru a împărți logica, totuși, proiectul tău ar trebui să vizeze minimizarea adâncimii și lățimii arborelui de moștenire.
- **Utilizează [imprimanta de moșteniri](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) Slither pentru a verifica ierarhia contractelor.** Imprimanta de moșteniri te va ajuta să analizezi dimensiunea ierarhiei.

### Evenimente {#events}

- **Înregistrează toate operațiile cruciale.** Evenimentele vor contribui la depanarea contractului în timpul dezvoltării și la monitorizarea acestuia după implementare.

### Evită capcanele cunoscute {#avoid-known-pitfalls}

- **Fii conștient de cele mai frecvente probleme de securitate.** Există multe resurse în linie pentru a afla despre probleme comune, cum ar fi [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capturează Eterului](https://capturetheether.com/), sau [Contracte nu chiar atât de inteligente](https://github.com/crytic/not-so-smart-contracts/).
- **Atenție la secțiunile de avertismente din [documentația Solidity](https://solidity.readthedocs.io/en/latest/). **Secțiunile de avertismente te vor informa despre comportamentul neevident al limbajului.

### Dependențe {#dependencies}

- **Utilizează biblioteci bine testate.** Importul de cod din bibliotecile bine testate reduce probabilitatea de coduri dezordonate, nestructurate și cu erori (buggy code). Dacă vrei să scrii un contract ERC20, utilizează [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Utilizează un manager de dependență; evită copierea și lipirea codului.** Dacă te bazezi pe o sursă externă, trebuie să o păstrați actualizată cu sursa originală.

### Testarea și verificarea {#testing-and-verification}

- **Scrie folosind teste unitare de module.** O serie extinsă de teste este esențială pentru a construi software de înaltă calitate.
- **Scrie controale și proprietăți personalizate cu [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) și [Manticore](https://github.com/trailofbits/manticore).** Instrumentele automate vor contribui la garantarea securității contractului tău. Consultă restul acestui ghid pentru a afla cum să scrii eficient controale și proprietăți.
- **Folosește [crytic.io](https://crytic.io/).** Critic se integrează cu GitHub, oferă acces la detectoarele Slither private și execută controale de proprietate personalizate din Echidna.

### Solidity {#solidity}

- **Alege Solidity 0.5 față de 0.4 și 0.6.** În opinia noastră, Solidity 0.5 este mai sigur și are practici mai sigure încorporate decât 0.4. Solidity 0.6 s-a dovedit a fi prea instabil pentru producție și are nevoie de timp pentru a se maturiza.
- **Utilizează o versiune stabilă pentru compilare; utilizează cea mai recentă versiune pentru a verifica pentru avertismente.** Verifică-ți codul dacă nu are probleme raportate cu cea mai recentă versiune de compilator. Totuși, Solidity are un ciclu rapid de lansări și are un istoric de erori de compilare, așa că nu recomandăm cea mai recentă versiune pentru implementare (vezi Slither pentru [versiunea recomandată de solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)).
- **Nu utiliza asamblarea în linie.** Asamblarea necesită expertiză EVM. Nu scrie cod EVM dacă nu _stăpânești_ yellow paper.

## Instrucțiuni de implementare {#deployment-guidelines}

Odată ce contractul a fost elaborat și implementat:

- **Monitorizează-ți contractele.** Urmărește jurnalele și fii gata să reacționezi în cazul compromiterii contractului sau a portofelului.
- **Adaugă informații de contact în baza de date de [contacte de securitate blockchain](https://github.com/crytic/blockchain-security-contacts).** Această listă ajută terțe părți să te contacteze, în cazul în care este descoperită o breșă de securitate.
- **Securizează portofelele utilizatorilor privilegiați.** Urmează [cele mai bune practici](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) ale noastre dacă stochezi chei în portofele hardware.
- **Fă-ți un plan cum să acționezi în cazul unui incident.** Consideră că aceste contracte inteligente pot fi compromise. Chiar când contractele nu prezintă erori, un atacator poate prelua controlul asupra cheilor proprietarului contractului.
