---
title: Astrazione dell'account
description: Una panoramica dei piani di Ethereum per rendere gli account degli utenti più semplici e sicuri
lang: it
summaryPoints:
  - L'astrazione dell'account rende molto più semplice creare portafogli smart contract
  - I portafogli smart contract rendono molto più semplice gestire l'accesso agli account Ethereum
  - Le chiavi perse ed esposte possono essere recuperate utilizzando backup multipli
---

La maggior parte degli utenti attuali interagisce con [Ethereum](/) utilizzando **[account di proprietà esterna (EOA)](/glossary/#eoa)**. Questo limita il modo in cui gli utenti possono interagire con Ethereum. Ad esempio, rende difficile eseguire lotti di transazioni e richiede agli utenti di mantenere sempre un saldo in ETH per pagare le commissioni di transazione.

L'astrazione dell'account è un modo per risolvere questi problemi consentendo agli utenti di programmare in modo flessibile maggiore sicurezza e migliori esperienze utente nei propri account. Questo può avvenire [aggiornando gli EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) in modo che possano essere controllati dagli smart contract. Esiste anche un altro percorso che prevede l'aggiunta di un [secondo sistema di transazioni separato](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) da eseguire in parallelo al protocollo esistente. Indipendentemente dal percorso, il risultato è l'accesso a Ethereum tramite portafogli smart contract, supportati nativamente come parte del protocollo esistente o tramite una rete di transazioni aggiuntiva.

I portafogli smart contract sbloccano molti vantaggi per l'utente, tra cui:

- definire le proprie regole di sicurezza flessibili
- recuperare il proprio account se si perdono le chiavi
- condividere la sicurezza del proprio account tra dispositivi o individui fidati
- pagare il gas di qualcun altro, o far pagare il proprio a qualcun altro
- raggruppare le transazioni (ad es., approvare ed eseguire uno swap in un colpo solo)
- maggiori opportunità per gli sviluppatori di applicazioni decentralizzate (dapp) e portafogli di innovare le esperienze utente

Questi vantaggi non sono supportati nativamente oggi perché solo gli account di proprietà esterna ([EOA](/glossary/#eoa)) possono avviare transazioni. Gli EOA sono semplicemente coppie di chiavi pubbliche-private. Funzionano in questo modo:

- se si possiede la chiave privata si può fare _qualsiasi cosa_ entro le regole della Ethereum Virtual Machine (EVM)
- se non si possiede la chiave privata non si può fare _nulla_.

Se si perdono le chiavi non possono essere recuperate, e le chiavi rubate danno ai ladri accesso immediato a tutti i fondi in un account.

I portafogli smart contract sono la soluzione a questi problemi, ma oggi sono difficili da programmare perché, alla fine, qualsiasi logica implementino deve essere tradotta in un insieme di transazioni EOA prima di poter essere elaborata da Ethereum. L'astrazione dell'account consente agli smart contract di avviare le transazioni da soli, in modo che qualsiasi logica l'utente desideri implementare possa essere codificata nel portafoglio smart contract stesso ed eseguita su Ethereum.

In definitiva, l'astrazione dell'account migliora il supporto per i portafogli smart contract, rendendoli più facili da creare e più sicuri da usare. Con l'astrazione dell'account, gli utenti possono godere di tutti i vantaggi di Ethereum senza dover comprendere la tecnologia sottostante.

## Oltre le frasi seme {#beyond-seed-phrases}

Gli account odierni sono protetti utilizzando chiavi private che vengono calcolate dalle frasi seme. Chiunque abbia accesso a una frase seme può facilmente scoprire la chiave privata che protegge un account e ottenere l'accesso a tutti gli asset che protegge. Se una chiave privata e una frase seme vengono perse, gli asset sono permanentemente inaccessibili. Proteggere queste frasi seme è scomodo, anche per gli utenti esperti, e il phishing delle frasi seme è una delle truffe più comuni.

L'astrazione dell'account risolve questo problema utilizzando uno smart contract per detenere gli asset e autorizzare le transazioni. Gli smart contract possono includere logiche personalizzate su misura per la massima sicurezza e usabilità. Gli utenti utilizzano ancora le chiavi private per controllare l'accesso, ma con misure di sicurezza migliorate.

Ad esempio, è possibile aggiungere chiavi di backup a un portafoglio, consentendo la sostituzione della chiave se la chiave primaria viene compromessa. Ogni chiave può essere protetta in modo diverso o distribuita tra individui fidati, aumentando significativamente la sicurezza. Regole aggiuntive del portafoglio possono mitigare i danni derivanti dall'esposizione della chiave, come richiedere firme multiple per transazioni di alto valore o limitare le transazioni a indirizzi fidati.

## Migliore esperienza utente {#better-user-experience}

L'astrazione dell'account migliora notevolmente l'esperienza utente e la sicurezza supportando i portafogli smart contract a livello di protocollo. Gli sviluppatori possono innovare liberamente, migliorando il raggruppamento delle transazioni per velocità ed efficienza. I semplici swap possono diventare operazioni con un solo clic, migliorando significativamente la facilità d'uso.

La gestione del gas migliora considerevolmente. Le applicazioni possono pagare le commissioni del gas degli utenti o consentire il pagamento in token diversi da ETH, eliminando la necessità di mantenere un saldo in ETH.

## Come verrà implementata l'astrazione dell'account? {#how-will-aa-be-implemented}

Attualmente, i portafogli smart contract sono difficili da implementare poiché si basano su codice complesso che avvolge le transazioni standard. Ethereum può cambiare questa situazione consentendo agli smart contract di avviare direttamente le transazioni, incorporando la logica negli smart contract di Ethereum piuttosto che fare affidamento su relayer esterni.

### EIP-4337: Astrazione dell'account senza modifiche al protocollo {#eip-4337-account-abstraction-without-protocol-changes}

L'EIP-4337 abilita il supporto nativo per i portafogli smart contract senza modificare il protocollo principale di Ethereum. Introduce oggetti `UserOperation` raccolti in pacchetti di transazioni dai validatori, semplificando lo sviluppo dei portafogli. Il contratto EntryPoint dell'EIP-4337 è stato distribuito sulla Mainnet di Ethereum il 1° marzo 2023 e ha facilitato la creazione di oltre 26 milioni di portafogli smart e 170 milioni di UserOperations.

## Progressi attuali {#current-progress}

Come parte dell'aggiornamento Pectra di Ethereum, l'EIP-7702 è programmato per il 7 maggio 2025. L'EIP-4337 è stato ampiamente adottato, [con oltre 26 milioni di account smart distribuiti e più di 170 milioni di UserOperations elaborate](https://www.bundlebear.com/erc4337-overview/all).

## Letture di approfondimento {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Documentazione dell'EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentazione dell'EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Dashboard di adozione dell'ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- ["Road to Account Abstraction" di Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog di Vitalik sui portafogli a recupero sociale](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)