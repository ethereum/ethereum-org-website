---
title: Un ghid pentru instrumentele de securitate ale contractelor inteligente
description: O prezentare generală a trei tehnici diferite de testare și analiză a programelor
author: "Trailofbits"
lang: ro
tags:
  - "solidity"
  - "contracte inteligente"
  - "securitate"
skill: intermediate
published: 2020-09-07
source: Construirea de contracte securizate
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Vom folosi trei tehnici distincte de testare și analiză a programelor:

- **Analiza statică folosind [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). **Toate căile programului sunt aproximate și analizate în același timp, prin diferite prezentări ale programului (de exemplu, „control-flow-graph”)
- **Fuzzing-ul cu [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Codul este executat cu un generator pseudo-aleatoriu de tranzacții. Fuzzer-ul va încerca să găsească o secvență de tranzacții care să încalce o anumită proprietate.
- **Execuția simbolică folosind [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/). **O tehnică de verificare formală ce convertește fiecare cale de execuție într-o formulă matematică cu care se pot verifica restricțiile cele mai importante.

Fiecare tehnică are avantaje și capcane și va fi utilă în [anumite cazuri](#determining-security-properties):

| Tehnică            | Instrument | Utilizare                         | Viteză  | Bug-uri ratate | Alarme false |
| ------------------ | ---------- | --------------------------------- | ------- | -------------- | ------------ |
| Analiză statică    | Slither    | CLI & script-uri                  | secunde | moderat        | mic          |
| Fuzzing            | Echidna    | Proprietăți Solidity              | minute  | mic            | niciuna      |
| Execuție simbolică | Manticore  | Proprietăți Solidity & script-uri | ore     | niciuna\*      | niciuna      |

\* in cazul în care toate căile sunt explorate fără timp de expirare

**Slither** analizează contractele în câteva secunde; cu toate acestea, analiza statică ar putea duce la alarme false și va fi mai puțin indicată pentru verificări complexe (de exemplu, verificări aritmetice). Rulați Slither prin API pentru accesul prin butonul push la detectoarele încorporate sau prin API pentru verificările definite de utilizator.

**Echidna** trebuie să ruleze câteva minute și va produce numai rezultate adevărat pozitive. Echidna verifică proprietățile de securitate furnizate de utilizator, scrise în Solidity. Ar putea să rateze unele bug-uri, deoarece se bazează pe explorarea aleatorie.

**Manticore** efectuează analiza cu „cea mai mare pondere”. Ca și Echidna, Manticore verifică proprietățile furnizate de utilizator. Va avea nevoie de mai mult timp pentru a rula, dar poate dovedi validitatea unei proprietăți și nu va raporta alarme false.

## Flux de lucru sugerat {#suggested-workflow}

Începeți cu detectoarele încorporate în Slither pentru a vă asigura că nu este prezent niciun bug simplu la momentul respectiv, și nici nu va fi introdus ulterior. Utilizați Slither pentru a verifica proprietățile legate de moștenire (inheritance), dependențele variabilelor și problemele structurale. Pe măsură ce crește codul de bază, utilizați Echidna pentru a testa proprietățile mai complexe ale mașinii de stare. Revizitați Slither ca să dezvoltați verificări personalizate pentru protecțiile indisponibile în Solidity, cum ar fi protecția împotriva suprascrierii unei funcții. În cele din urmă, utilizați Manticore ca să efectuați verificări specifice ale proprietăților de importanță majoră pentru securitate, cum ar fi operațiile aritmetice.

- Utilizați CLI Slither pentru a detecta problemele obișnuite
- Utilizați Echidna pentru a testa proprietățile de securitate de nivel înalt ale contractului dvs.
- Utilizați Slither pentru a scrie verificări statice personalizate
- Utilizați Manticore atunci când doriți o asigurare avansată privind proprietățile de securitate de importanță majoră

**O observație despre testele unitare**. Testele unitare sunt necesare pentru a construi software de înaltă calitate. Totuși, aceste tehnici nu sunt cele mai potrivite pentru a găsi defectele de securitate. Ele sunt utilizate de obicei pentru a testa comportamentul pozitiv al codului (adică, codul funcționează conform așteptărilor în context normal), iar defectele de securitate tind să se regăsească în cazuri limită pe care dezvoltatorii nu le-au luat în considerare. În studiul nostru de zeci de analize de securitate a contractelor inteligente, asigurarea testelor unitare [nu a avut niciun efect asupra numărului sau gravității defectelor de securitate](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) pe care le-am găsit în codul clientului nostru.

## Determinarea proprietăților de securitate {#determining-security-properties}

Pentru a vă testa și verifica în mod eficient codul, trebuie să identificați zonele care necesită atenție. Întrucât resursele pe care le cheltuiți pentru securitate sunt limitate, este important să stabiliți părțile slabe sau de mare valoare din baza de cod pentru a vă optimiza măsurile. Este de ajutor modelarea pericolelor. Luați inițiativa să examinați:

- [Evaluările rapide ale riscurilor](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (abordarea noastră preferată în criză de timp)
- [Ghidul de modelare a pericolelor pentru sistemele centrate pe date](https://csrc.nist.gov/publications/detail/sp/800-154/draft) (cunoscut și sub denumirea de NIST 800-154)
- [Modelarea lineară Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Utilizarea aserțiunilor](https://blog.regehr.org/archives/1091)

### Componente {#components}

Dacă știți ce anume doriți să verificați, aceasta că va ajuta și să selectați instrumentul potrivit.

Dintre domeniile mari adesea relevante pentru contractele inteligente menționăm:

- **Mașina de stare.** Majoritatea contractelor pot fi reprezentate ca o mașină de stare. Gândiți-vă să verificați că (1) nu se poate ajunge la nicio stare invalidă, (2) dacă o stare este validă, aceasta poate fi atinsă și (3) nicio stare nu blochează contractul.

  - Echidna și Manticore sunt instrumentele preferate pentru a testa specificațiile mașinilor de stare.

- **Access controls.** If your system has privileged users (e.g. an owner, controllers, ...) you must ensure that (1) each user can only perform the authorized actions and (2) no user can block actions from a more privileged user.

  - Slither, Echidna și Manticore pot efectua verificarea controalelor corecte ale accesului. De exemplu, Slither poate să verifice că numai funcțiilor de pe lista albă le lipsește modificatorul „onlyOwner”. Echidna și Manticore sunt utile pentru un control al accesului mai complex, cum ar fi că o permisiune este acordată numai atunci când contractul atinge o anumită stare.

- **Operațiile aritmetice.** Verificarea corectitudinii operațiilor aritmetice este esențială. Este bine să se utilizeze `SafeMath` peste tot pentru a preveni „overflow/underflow”, însă trebuie să luați în considerare și alte defecte aritmetice, inclusiv problemele de rotunjire și defectele care blochează contractul.

  - Manticore este cea mai bună alegere în acest caz. Echidna poate fi utilizat dacă aritmetica nu intră în sfera de aplicare a rezolvatorului SMT.

- **Corectitudinea moștenirii.** Contractele Solidity se bazează în mare măsură pe moștenirea multiplă. Sunt ușor de introdus greșeli precum ratarea unui `super`-apel de către o funcție „shadowing” și interpretarea greșită a ordinii de liniarizare c3.

  - Slither este instrumentul care asigură detectarea acestor erori.

- **Interacțiunile externe.** Contractele interacționează și nu trebuie acordată credibilitate unora dintre contracte externe. De exemplu, în cazul în care contractul dvs. se bazează pe oracole externe, va rămâne acesta în siguranță dacă jumătate dintre oracolele disponibile sunt compromise?

  - Manticore și Echidna reprezintă cea mai bună alegere pentru testarea interacțiunilor externe cu contractele dvs. Manticore are un mecanism încorporat pentru blocarea contractelor externe.

- **Conformitatea cu standardele.** Standardele Ethereum (de exemplu, ERC20) au o serie lungă de defecte de concepție. Fiți conștienți de limitările standardului pe care vă bazați.
  - Slither, Echidna și Manticore vă vor ajuta să detectați devierile de la un anumit standard.

### Fișă de selecție a instrumentelor {#tool-selection-cheatsheet}

| Componente                   | Instrumente                 | Exemple                                                                                                                                                                                                                                                           |
| ---------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mașină de stare              | Echidna, Manticore          |                                                                                                                                                                                                                                                                   |
| Controlul accesului          | Slither, Echidna, Manticore | [Slither exercise 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise2.md), [Echidna exercise 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/Exercise-2.md)         |
| Operații aritmetice          | Manticore, Echidna          | [Exercițiul 1 Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/Exercise-1.md), [Exercițiile 1-3 Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Corectitudinea moștenirii    | Slither                     | [Exercițiul 1 Slither](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise1.md)                                                                                                                                     |
| Interacțiuni externe         | Manticore, Echidna          |                                                                                                                                                                                                                                                                   |
| Conformitatea cu standardele | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                           |

Va trebui să verificați și alte domenii, în funcție de obiectivele dvs., dar este bine să începeți cu aceste domenii mari de interes pentru orice sistem de contracte inteligente.

Auditurile noastre publice conțin exemple de proprietăți verificate sau testate. Gândiți-vă să citiți secțiunile de `Testare automată și verificare` din următoarele rapoarte pentru a examina proprietățile de securitate din lumea reală:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
