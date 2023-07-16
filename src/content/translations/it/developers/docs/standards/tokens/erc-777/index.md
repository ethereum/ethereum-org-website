---
title: Standard token ERC-777
description:
lang: it
---

## Attenzione {#warning}

**ERC-777 è difficile da implementare correttamente a causa della sua [suscettibilità a diverse forme di attacchi](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Si consiglia invece di utilizzare [ERC-20](/developers/docs/standards/tokens/erc-20/).** Questa pagina rimane come archivio storico.

## Introduzione? {#introduction}

ERC-777 è un token fungibile standard che migliora lo standard [ERC-20](/developers/docs/standards/tokens/erc-20/) esistente.

## Prerequisiti {#prerequisites}

Per meglio comprendere questa pagina, consigliamo prima di documentarsi su [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Quali miglioramenti propone l'ERC-777 rispetto all'ERC-20? {#-erc-777-vs-erc-20}

L'ERC-777 fornisce i seguenti miglioramenti rispetto all'ERC-20.

### Hook {#hooks}

Gli hook sono una funzione descritta nel codice di un contratto intelligente. Gli hook vengono chiamati quando si inviano o ricevono token tramite il contratto. Questo consente a un contratto intelligente di reagire ai token in entrata o in uscita.

Gli hook sono registrati e scoperti usando lo standard [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Perché gli hook sono un'ottima cosa? {#why-are-hooks-great}

1. Gli hook consentono di inviare token a un contratto e notificarlo in una sola transazione, a differenza di [ERC-20](https://eips.ethereum.org/EIPS/eip-20), che richiede una doppia chiamata (`approve`/`transferFrom`) per fare la stessa cosa.
2. I contratti privi di hook registrati non sono compatibili con l'ERC-777. Il contratto inviante interromperà la transazione se il contratto ricevente non registra un hook. Ciò previene i trasferimenti accidentali a contratti intelligenti non ERC-777.
3. Gli hook possono rifiutare le transazioni.

### Decimali {#decimals}

Lo standard risolve anche la confusione intorno ai `decimals` causata in ERC-20. Questa chiarezza migliora l'esperienza dello sviluppatore.

### Retrocompatibilità con ERC-20 {#backwards-compatibility-with-erc-20}

Si interagisce con i contratti ERC-777 come se fossero contratti ERC-20.

## Ulteriori Letture {#further-reading}

[EIP-777: Standard token](https://eips.ethereum.org/EIPS/eip-777)
