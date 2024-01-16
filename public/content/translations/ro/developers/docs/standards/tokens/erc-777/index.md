---
title: Standardul de tokenuri ERC-777
description:
lang: ro
---

## Introducere? {#introduction}

ERC-777 este un standard de tokenuri fungibile care îmbunătățește standardul [ERC-20](/developers/docs/standards/tokens/erc-20/) existent.

## Condiții prealabile {#prerequisites}

Pentru a înțelege mai bine această pagină, vă recomandăm să citiți mai întâi despre [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Ce îmbunătățiri propune ERC-777 față de ERC-20? {#-erc-777-vs-erc-20}

ERC-777 oferă următoarele îmbunătățiri față de ERC-20.

### Hook-uri {#hooks}

Hook-urile sunt o funcție descrisă în codul unui contract inteligent. Hook-urile sunt apelate atunci când sunt trimise sau primite tokenuri prin intermediul contractului. Acest lucru permite unui contract inteligent să reacționeze la tokenurile primite sau trimise.

Hook-urile sunt înregistrate și descoperite folosind standardul [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### De ce sunt foarte utile hook-urile? {#why-are-hooks-great}

1. Hook-urile permit trimiterea de tokenuri către un contract și notificarea contractului într-o singură tranzacție, spre deosebire de [ERC-20](https://eips.ethereum.org/EIPS/eip-20), care necesită un apel dublu (`approve`/`transferFrom`) pentru a realiza acest lucru.
2. Contractele care nu au înregistrat hook-uri sunt incompatibile cu ERC-777. Contractul de trimitere va întrerupe tranzacția în cazul când contractul de primire nu a înregistrat un hook. Acest lucru împiedică transferurile accidentale către contractele inteligente care nu sunt ERC-777.
3. Hook-urile pot respinge tranzacțiile.

### Zecimale {#decimals}

Standardul rezolvă şi confuzia legată de `decimals` ce are loc în ERC-20. Această claritate creşte satisfacţia dezvoltatorului.

### Compatibilitate retroactivă cu ERC-20 {#backwards-compatibility-with-erc-20}

Se poate interacționa cu contractele ERC-777 ca și cum ar fi contracte ERC-20.

## Referințe suplimentare {#further-reading}

[EIP-777: Standard de tokenuri](https://eips.ethereum.org/EIPS/eip-777)
