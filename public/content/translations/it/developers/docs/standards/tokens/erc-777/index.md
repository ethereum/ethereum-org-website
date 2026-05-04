---
title: Standard dei Token ERC-777
description: Scopri l'ERC-777, uno standard migliorato per i token fungibili con hook, sebbene l'ERC-20 sia raccomandato per la sicurezza.
lang: it
---

## Avvertenza {#warning}

**L'ERC-777 è difficile da implementare correttamente, a causa della sua [suscettibilità a diverse forme di attacco](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). Si raccomanda invece di utilizzare l'[ERC-20](/developers/docs/standards/tokens/erc-20/).** Questa pagina rimane come archivio storico.

## Introduzione? {#introduction}

L'ERC-777 è uno standard per token fungibili che migliora l'attuale standard [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima l'[ERC-20](/developers/docs/standards/tokens/erc-20/).

## Quali miglioramenti propone l'ERC-777 rispetto all'ERC-20? {#-erc-777-vs-erc-20}

L'ERC-777 fornisce i seguenti miglioramenti rispetto all'ERC-20.

### Hook {#hooks}

Gli hook sono una funzione descritta nel codice di un contratto intelligente. Gli hook vengono chiamati quando i token vengono inviati o ricevuti tramite il contratto. Ciò consente a un contratto intelligente di reagire ai token in entrata o in uscita.

Gli hook vengono registrati e scoperti utilizzando lo standard [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### Perché gli hook sono fantastici? {#why-are-hooks-great}

1. Gli hook consentono di inviare token a un contratto e di notificare il contratto in una singola transazione, a differenza dell'[ERC-20](https://eips.ethereum.org/EIPS/eip-20), che richiede una doppia chiamata (`approve`/`transferFrom`) per ottenere questo risultato.
2. I contratti che non hanno registrato hook sono incompatibili con l'ERC-777. Il contratto mittente interromperà la transazione quando il contratto ricevente non ha registrato un hook. Questo previene trasferimenti accidentali a contratti intelligenti non ERC-777.
3. Gli hook possono rifiutare le transazioni.

### Decimali {#decimals}

Lo standard risolve anche la confusione attorno ai `decimals` causata nell'ERC-20. Questa chiarezza migliora l'esperienza degli sviluppatori.

### Retrocompatibilità con l'ERC-20 {#backwards-compatibility-with-erc-20}

È possibile interagire con i contratti ERC-777 come se fossero contratti ERC-20.

## Letture consigliate {#further-reading}

[EIP-777: Standard dei Token](https://eips.ethereum.org/EIPS/eip-777)