---
title: Lista de verificare a integrării tokenului
description: Listă cu lucruri de considerat când interacționăm cu tokenuri
author: "Trailofbits"
lang: ro
tags:
  - "solidity"
  - "contracte inteligente"
  - "securitate"
  - "tokenuri"
skill: intermediate
published: 2020-08-13
source: Construirea de contracte sigure
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Urmează această listă de verificare când interacționezi cu tokenuri arbitrare. Asigură-te că înțelegi riscurile asociate cu fiecare articol și justifică orice excepție de la aceste reguli.

Pentru comoditate, toate [utilitarele](https://github.com/crytic/slither#tools) Slither pot fi rulate direct pe o adresă token, cum ar fi:

[Utilizarea tutorialului Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Pentru a urma această listă de verificare, vei dori să ai această ieșire din Slither pentru token:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # Necesită configurare și utilizarea Echidna și Manticore
```

## Considerații generale {#general-considerations}

- **Contractul are un control de securitate.** Evită interacțiunea cu contractele care nu au o revizuire de securitate. Verifică durata evaluării (adică „nivelul efortului”), reputația firmei de securitate și numărul și gravitatea constatărilor.
- **Ai contactat programatorii.** S-ar putea să fie necesar să alertezi echipa lor cu privire la un incident. Caută contacte adecvate pe [contacte pentru securitatea blockchain-ului](https://github.com/crytic/blockchain-security-contacts).
- **Ei au o listă de corespondență de securitate pentru anunțuri critice.** Echipa lor ar trebui să sfătuiască utilizatorii (ca tine!) când se găsesc probleme critice sau când apar actualizări.

## Conformitatea ERC {#erc-conformity}

Slither include un utilitar, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), care analizează conformitatea unui token cu multe standarde ERC conexe. Folosește slither-check-erc pentru a verifica dacă:

- **Transfer și transferFrom returnează un boolean.** Numeroase tokenuri nu returnează un boolean pe aceste funcții. Ca urmare, apelurile lor în contract ar putea eșua.
- **Funcțiile nume, zecimale și simboluri sunt prezente dacă sunt utilizate.** Aceste funcții sunt opționale în ERC20 standard și s-ar putea să nu fie prezente.
- **Zecimalele returnează un uint8.** Numeroase tokenuri returnează incorect un uint256. Dacă este cazul, asigură-te că valoarea returnată este sub 255.
- **Tokenul atenuează cunoscuta [condiție de cursă ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** ERC20 Standard are o condiție cunoscută de cursă ERC20, care trebuie atenuată pentru a împiedica atacatorii să fure tokenuri.
- **Tokenul nu este un token ERC777 și nu are niciun apel extern de funcție în transfer și transferFrom.** Apelurile externe în funcțiile transfer pot duce la re-intrări.

Slither include un utilitar, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), care generează teste de unitate și proprietăți de securitate, care pot descoperi multe defecte comune ERC. Utilizează slither-prop pentru a verifica dacă:

- **Contractul trece toate testele de unitate și proprietățile de securitate de la slither-prop.** Rulează testele unităților generate, apoi verifică proprietățile cu [Echidna](https://github.com/crytic/echidna) și [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

În cele din urmă, există anumite caracteristici care sunt dificil de identificat în mod automat. Consultă manual aceste condiții:

- **Transfer și transferFrom nu trebuie să ia o taxă.** Tokenurile deflaționiste pot duce la un comportament neașteptat.
- **Se ia în considerare dobânda potențială câștigată din token.** Unele tokenuri distribuie interesul deținătorilor de tokenuri. Acest interes poate rămâne blocat în contract dacă nu este luat în considerare.

## Componența contractului {#contract-composition}

- **Contractul evită complexitatea inutilă.** Tokenul ar trebui să fie un contract simplu; un token cu cod complex necesită un standard mai ridicat de revizuire. Utilizează [imprimantă-rezumativă-umană](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) Slither pentru a identifica un cod complex.
- **Contractul utilizează SafeMath.** Contractele care nu utilizează SafeMath necesită un standard mai ridicat de revizuire. Inspectează manual contractul pentru utilizarea SafeMath.
- **Contractul are doar câteva funcții care nu au legătură cu tokenul.** Funcțiile nelegate de token cresc probabilitatea apariției unei probleme în contract. Utilizează [imprimantă-rezumativă-umană](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slithert pentru a revizui în linii mari codul utilizat în contract.
- **Tokenul are o singură adresă.** Tokenurile cu mai multe puncte de intrare pentru actualizările balanței pot rupe evidența contabilă internă pe baza adresei (de exemplu `solduri[token_address][msg.sender]` s-ar putea să nu reflecte soldul real).

## Privilegiile proprietarului {#owner-privileges}

- **Tokenului nu i se poate fface upgrade.** Contractele cărora li se poate face upgrade își pot modifica regulile în timp. Utilizează [imprimantă-rezumativă-umană](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slither pentru a determina dacă se poate face un upgrade contractului.
- **Proprietarul are capacități limitate de batere de monedă.**Proprietarii rău intenționați sau compromiși pot abuza de capacitățile de batere de monedă. Utilizează [imprimantă-rezumativă-umană](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) Slither pentru a revizui capacitățile de batere monedă și ia în considerare revizuirea manuală a codului.
- **Tokenul nu poate fi pus în pauză.** Proprietarii rău intenționați sau compromiși pot prinde în capcană contracte bazate pe tokenuri ce nu pot fi puse în pauză. Identifică manual codul utilizabil.
- **Proprietarul nu poate pune contractul pe lista neagră.** Proprietarii rău intenționați sau compromiși pot prinde în capcană contracte care se bazează pe tokenuri de pe lista neagră. Identifică manual caracteristicile care pot fi trecute pe lista neagră.
- **Echipa din spatele tokenului este cunoscută și poate fi responsabilă pentru abuz.** Contractele cu echipe anonime de dezvoltare sau care locuiesc în adăposturi legale ar trebui să necesite un standard mai ridicat de revizuire.

## Deficit de token {#token-scarcity}

Recenziile pentru probleme de penurie de tokenuri necesită o revizuire manuală. Verifică aceste condiții:

- **Niciun utilizator nu deține cea mai mare parte a ofertei.** În cazul în care câțiva utilizatori dețin majoritatea tokenurilor, aceștia pot influența operațiunile bazate pe repartiția tokenului.
- **Cantitatea totală este suficientă.** Tokenurile într-o cantitate totală scăzută pot fi manipulate cu ușurință.
- **Tokenurile sunt situate pe o multitudine de schimburi.** Dacă toate tokenurile sunt într-un schimb, un compromis al bursei poate compromite contractul care se bazează pe token.
- **Utilizatorii înțeleg riscurile asociate fondurilor mari sau împrumuturilor flash.** Contractele care se bazează pe bilanțul tokenurilor trebuie sa ia in considerare cu atenție atacatorii cu fonduri mari sau atacurile prin împrumuturi flash.
- **Tokenul nu permite batere de monedă flash.**. Baterea de monedă flash poate duce la fluctuații substanțiale ale echilibrului și ofertei totale, care necesită controale excesive, stricte și complete în funcționarea tokenului.
