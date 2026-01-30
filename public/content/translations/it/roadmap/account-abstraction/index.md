---
title: Astrazione dell'account
description: Una panoramica dei piani di Ethereum per rendere i conti degli utenti più semplici e sicuri
lang: it
summaryPoints:
  - L'astrazione del conto semplifica molto la creazione di portafogli di contratti intelligenti
  - I portafogli di contratti intelligenti semplificano molto la gestione dell'accesso ai conti di Ethereum
  - Le chiavi perdute o esposte sono recuperabili utilizzando svariati backup
---

# Astrazione del conto {#account-abstraction}

La maggior parte degli utenti esistenti interagisce con Ethereum usando **[conti di proprietà esterna (EOA)](/glossary/#eoa)**. Ciò limita il modo in cui gli utenti possono interagire con Ethereum. Ad esempio, rende difficile eseguire lotti di transazioni e richiede agli utenti di mantenere sempre un saldo in ETH per pagare le commissioni sulle transazioni.

L'astrazione del conto è un modo per risolvere tali problemi, consentendo agli utenti di programmare flessibilmente maggiore sicurezza e una migliore esperienza degli utenti, nei propri conti. Ciò può accadere [aggiornando gli EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) in modo che possano essere controllati da smart contract. Esiste anche un'altra via che prevede l'aggiunta di un [secondo sistema di transazioni separato](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) da eseguire in parallelo al protocollo esistente. Indipendentemente dal percorso, il risultato è l'accesso a Ethereum tramite i portafogli di contratti intelligenti, supportati nativamente come parte del protocollo esistente o tramite una rete di transazioni aggiuntiva.

I portafogli di contratti intelligenti sbloccano molti benefici per l'utente, tra cui:

- definire le proprie regole di sicurezza flessibili
- recuperare il proprio conto in caso di perdita delle chiavi
- condividere la sicurezza del proprio conto tra svariati dispositivi o individui
- pagare il gas altrui, o far pagare il proprio a qualcun altro
- raggruppare le transazioni (ad es., approvare ed eseguire uno swap in una sola volta)
- incrementare le opportunità per gli svilupptori di dapp e portafogli, per innovare l'esperienza degli utenti

Questi vantaggi non sono supportati in modo nativo oggi perché solo i conti di proprietà esterna ([EOA](/glossary/#eoa)) possono avviare le transazioni. Gli EOA sono semplicemente coppie di chiavi pubblica-privata. Funzionano come segue:

- se hai la chiave privata puoi fare _qualsiasi cosa_ entro le regole della macchina virtuale di Ethereum (EVM)
- se non hai la chiave privata, non puoi fare _niente_.

Se perdi le tue chiavi non sono recuperabili e le chiavi rubate danno ai ladri l'accesso istantaneo a tutti i fondi in un conto.

I portafogli smart contract sono la soluzione a questi problemi, ma oggi sono difficili da programmare perché alla fine, qualsiasi logica implementata deve essere tradotta in una serie di transazioni EOA prima di poter essere elaborata da Ethereum. L'astrazione del conto consente ai contratti intelligenti di avviare da soli le transazioni, così che qualsiasi logica che l'utente desideri implementare possa essere programmata nel portafoglio del contratto intelligente stesso ed eseguita su Ethereum.

Infine, l'astrazione del conto migliora il supporto ai portafogli di contratti intelligenti, semplificandone la creazione e aumentandone la sicurezza di utilizzo. Con l'astrazione del conto, gli utenti possono godere di tutti i vantaggi di Ethereum senza dover comprendere la tecnologia sottostante.

## Oltre le frasi seed {#beyond-seed-phrases}

I conti odierni sono protetti utilizzando chiavi private, calcolate dalle frasi di seed. Chiunque abbia accesso a una frase seed può facilmente scoprire la chiave privata che protegge un account e ottenere l'accesso a tutti gli asset che questo protegge. Se una chiave privata e una frase seed vengono perse, gli asset sono permanentemente inaccessibili. La protezione di queste frasi seed è difficile, anche per gli utenti esperti, e il phishing delle frasi seed è una delle truffe più comuni.

L'astrazione del conto risolve questo problema utilizzando uno smart contract per detenere gli asset e autorizzare le transazioni. Gli smart contract possono includere una logica personalizzata, creata su misura per ottenere la massima sicurezza e usabilità. Gli utenti utilizzano ancora le chiavi private per controllare l'accesso, ma con misure di sicurezza avanzate.

Ad esempio, è possibile aggiungere chiavi di backup a un portafoglio, consentendo la sostituzione della chiave qualora la chiave principale venga compromessa. Ogni chiave può essere protetta in modo diverso o distribuita tra persone di fiducia, aumentando notevolmente la sicurezza. Regole aggiuntive del portafoglio possono mitigare i danni derivanti dall'esposizione della chiave, come richiedere firme multiple per transazioni di valore elevato o limitare le transazioni a indirizzi fidati.

## Migliore esperienza utente {#better-user-experience}

L'astrazione del conto migliora notevolmente l'esperienza utente e la sicurezza supportando i portafogli smart contract a livello di protocollo. Gli sviluppatori possono innovare liberamente, migliorando il raggruppamento delle transazioni per ottenere maggiore velocità ed efficienza. I semplici swap possono diventare operazioni da un clic, migliorando notevolmente la facilità d'uso.

La gestione del gas migliora notevolmente. Le applicazioni possono pagare le commissioni sul gas degli utenti o consentire il pagamento in token diversi da ETH, eliminando la necessità di mantenere un saldo in ETH.

## Come sarà implementata l'astrazione del conto? {#how-will-aa-be-implemented}

Attualmente, i portafogli smart contract sono difficili da implementare in quanto si basano su un codice complesso che avvolge le transazioni standard. Ethereum può cambiare questa situazione consentendo agli smart contract di avviare direttamente le transazioni, incorporando la logica negli smart contract di Ethereum anziché affidarsi a relayer esterni.

### EIP-4337: Astrazione del conto senza modifiche al protocollo

L'EIP-4337 abilita il supporto nativo dei portafogli smart contract senza modificare il protocollo di base di Ethereum. Introduce oggetti `UserOperation` raccolti in bundle di transazioni dai validatori, semplificando lo sviluppo di portafogli. Il contratto EntryPoint dell'EIP-4337 è stato distribuito sulla Mainnet di Ethereum il 1° marzo 2023 e ha facilitato la creazione di oltre 26 milioni di portafogli smart e 170 milioni di UserOperation.

## Progressi attuali {#current-progress}

Come parte dell'aggiornamento Pectra di Ethereum, l'EIP-7702 è previsto per il 7 maggio 2025. L'EIP-4337 è stato ampiamente adottato, [con oltre 26 milioni di smart account distribuiti e più di 170 milioni di UserOperation elaborate](https://www.bundlebear.com/erc4337-overview/all).

## Letture consigliate {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Documentazione EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentazione EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Dashboard di adozione ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- ["Road to Account Abstraction" di Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog di Vitalik sui portafogli a recupero sociale](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)
