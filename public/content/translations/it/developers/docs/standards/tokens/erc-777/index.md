---
title: Standard token ERC-777
description: Scopri ERC-777, uno standard di token fungibili migliorato con hook, sebbene l'ERC-20 sia raccomandato per la sicurezza.
lang: it
---

## Attenzione {#warning}

**L'ERC-777 è di difficile propria implementazione, a causa della sua [suscettibilità a svariate forme d'attacco](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Piuttosto, si consiglia di utilizzare [ERC-20](/developers/docs/standards/tokens/erc-20/).** Questa pagina funge da archivio storico.

## Introduzione? {#introduction}

ERC-777 è uno standard dei token fungibili che migliora lo standard esistente dell'[ERC-20](/developers/docs/standards/tokens/erc-20/).

## Prerequisiti {#prerequisites}

Per meglio comprendere questa pagina, ti consigliamo di leggere prima riguardo l'[ERC-20](/developers/docs/standards/tokens/erc-20/).

## Quali miglioramenti propone l'ERC-777 rispetto all'ERC-20? {#-erc-777-vs-erc-20}

L'ERC-777 fornisce i seguenti miglioramenti rispetto all'ERC-20.

### Hook {#hooks}

Gli hook sono una funzione descritta nel codice di un contratto intelligente. Gli hook vengono chiamati quando si inviano o ricevono token tramite il contratto. Questo consente a un contratto intelligente di reagire ai token in entrata o in uscita.

Gli hook sono registrati e scoperti utilizzando lo standard dell'[ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Perché gli hook sono un'ottima cosa? {#why-are-hooks-great}

1. Gli hook consentono di inviare i token a un contratto e di notificare il contratto in una singola transazione, a differenza dell'[ERC-20](https://eips.ethereum.org/EIPS/eip-20), che richiede una doppia chiamata per riuscirci (`approve`/`transferFrom`).
2. I contratti privi di hook registrati non sono compatibili con l'ERC-777. Il contratto inviante interromperà la transazione se il contratto ricevente non registra un hook. Ciò previene i trasferimenti accidentali a contratti intelligenti non ERC-777.
3. Gli hook possono rifiutare le transazioni.

### Decimali {#decimals}

Inoltre, lo standard risolve la confusione sui 'decimali' causati nell'ERC-20. Questa chiarezza migliora l'esperienza dello sviluppatore.

### Retrocompatibilità con l'ERC-20 {#backwards-compatibility-with-erc-20}

Si interagisce con i contratti ERC-777 come se fossero contratti ERC-20.

## Ulteriori letture {#further-reading}

[EIP-777: Standard dei token](https://eips.ethereum.org/EIPS/eip-777)
