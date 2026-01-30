---
title: Linee guida di Pectra 7702
description: Scopri di più sulla 7702 nella release Pectra
lang: it
---

# Pectra 7702

## Sintesi {#abstract}

L'EIP 7702 definisce un meccanismo per aggiungere codice a un EOA. Questa proposta consente agli EOA, i conti Ethereum legacy, di ricevere miglioramenti delle funzionalità a breve termine, aumentando l'usabilità delle applicazioni. Questo avviene impostando un puntatore al codice già distribuito utilizzando un nuovo tipo di transazione: 4.

Questo nuovo tipo di transazione introduce un elenco di autorizzazioni. Ogni tupla di autorizzazione nell'elenco è definita come

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** è la delega (bytecode già distribuito che sarà usato dall'EOA)
**chain_id** blocca l'autorizzazione a una catena specifica (o 0 per tutte le catene)
**nonce** blocca l'autorizzazione a un nonce di conto specifico
(**y_parity, r, s**) è la firma della tupla di autorizzazione, definita come keccak(0x05 || rlp ([chain_id ,address, nonce])) dalla chiave privata dell'EOA a cui si applica l'autorizzazione (chiamata anche l'autorità)

Una delega può essere reimpostata delegando all'indirizzo nullo.

La chiave privata dell'EOA mantiene il pieno controllo sul conto dopo la delega. Ad esempio, delegare a una Safe non rende il conto un multisig, perché c'è ancora una singola chiave che può bypassare qualsiasi politica di firma. In futuro, gli sviluppatori dovrebbero progettare partendo dal presupposto che qualsiasi partecipante al sistema possa essere un contratto intelligente. Per gli sviluppatori di contratti intelligenti, non è più sicuro dare per scontato che `tx.origin` si riferisca a un EOA.

## Migliori pratiche {#best-practices}

**Astrazione del Conto**: un contratto di delega dovrebbe allinearsi con gli standard più ampi di astrazione del conto (AA) di Ethereum per massimizzare la compatibilità. In particolare, dovrebbe idealmente essere conforme o compatibile con l'ERC-4337.

**Progettazione Permissionless e Resistente alla Censura**: Ethereum valorizza la partecipazione permissionless. Un contratto di delega NON DEVE codificare in modo fisso o fare affidamento su alcun singolo relayer o servizio "di fiducia". Questo bloccherebbe il conto se il relayer andasse offline. Funzionalità come il batching (ad es., approve+transferFrom) possono essere utilizzate dall'EOA stesso senza un relayer. Per gli sviluppatori di applicazioni che desiderano utilizzare le funzioni avanzate abilitate dalla 7702 (Astrazione del Gas, Prelievi che Preservano la Privacy) avranno bisogno di un relayer. Sebbene esistano diverse architetture di relayer, la nostra raccomandazione è di usare i [bundler 4337](https://www.erc4337.io/bundlers) che puntano almeno all'[entry point 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) perché:

- Forniscono interfacce standardizzate per il relaying
- Includono sistemi paymaster integrati
- Garantiscono la compatibilità futura
- Possono supportare la resistenza alla censura attraverso una [mempool pubblica](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Possono richiedere che la funzione init sia chiamata solo da [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

In altre parole, chiunque dovrebbe essere in grado di agire come sponsor/relayer della transazione, a patto di fornire la firma valida richiesta o la UserOperation dal conto. Questo garantisce la resistenza alla censura: se non è richiesta alcuna infrastruttura personalizzata, le transazioni di un utente non possono essere bloccate arbitrariamente da un relay di controllo. Ad esempio, il [Delegation Toolkit di MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) funziona esplicitamente con qualsiasi bundler o paymaster ERC-4337 su qualsiasi catena, invece di richiedere un server specifico di MetaMask.

**Integrazione delle dApp tramite le interfacce del portafoglio**:

Dato che i portafogli inseriranno nella whitelist specifici contratti di delega per l'EIP-7702, le dApp non dovrebbero aspettarsi di richiedere direttamente le autorizzazioni 7702. L'integrazione dovrebbe invece avvenire tramite interfacce di portafoglio standardizzate:

- **ERC-5792 (`wallet_sendCalls`)**: consente alle dApp di richiedere ai portafogli di eseguire chiamate in batch, facilitando funzionalità come il raggruppamento delle transazioni e l'astrazione del gas.

- **ERC-6900**: consente alle dApp di sfruttare le funzionalità dei conti intelligenti modulari, come le chiavi di sessione e il recupero del conto, tramite moduli gestiti dal portafoglio.

Utilizzando queste interfacce, le dApp possono accedere alle funzionalità dei conti intelligenti fornite dall'EIP-7702 senza gestire direttamente le deleghe, garantendo compatibilità e sicurezza tra diverse implementazioni di portafoglio.

> Nota: non esiste un metodo standardizzato per le dApp per richiedere direttamente le firme di autorizzazione 7702. Le dApp devono affidarsi a interfacce di portafoglio specifiche come l'ERC-6900 per sfruttare le funzionalità dell'EIP-7702.

Per maggiori informazioni:

- [Specifica ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Specifica ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Evitare il Vendor Lock-In**: in linea con quanto sopra, una buona implementazione è neutrale rispetto al fornitore e interoperabile. Questo spesso significa aderire agli standard emergenti per i conti intelligenti. Ad esempio, il [Modular Account di Alchemy](https://github.com/alchemyplatform/modular-account) utilizza lo standard ERC-6900 per i conti intelligenti modulari ed è progettato pensando a un "utilizzo interoperabile e permissionless".

**Preservazione della Privacy**: sebbene la privacy sulla catena sia limitata, un contratto di delega dovrebbe sforzarsi di minimizzare l'esposizione e la collegabilità dei dati. Ciò può essere ottenuto supportando funzionalità come i pagamenti del gas in token ERC-20 (in modo che gli utenti non debbano mantenere un saldo ETH pubblico, il che migliora la privacy e la UX) e le chiavi di sessione monouso (che riducono la dipendenza da una singola chiave a lungo termine). Ad esempio, l'EIP-7702 consente di pagare il gas in token tramite transazioni sponsorizzate e una buona implementazione renderà facile integrare tali paymaster senza divulgare più informazioni del necessario. Inoltre, la delega off-chain di alcune approvazioni (utilizzando firme verificate sulla catena) significa un minor numero di transazioni sulla catena con la chiave primaria dell'utente, favorendo la privacy. I conti che richiedono l'uso di un relayer costringono gli utenti a rivelare i loro indirizzi IP. Le PublicMempool migliorano questo aspetto: quando una transazione/UserOp si propaga attraverso la mempool, non si può dire se provenga dall'IP che l'ha inviata o se sia stata semplicemente inoltrata attraverso di esso tramite il protocollo p2p.

**Estensibilità e Sicurezza Modulare**: le implementazioni dei conti dovrebbero essere estensibili in modo da poter evolvere con nuove funzionalità e miglioramenti della sicurezza. L'aggiornabilità è intrinsecamente possibile con l'EIP-7702 (poiché un EOA può sempre delegare a un nuovo contratto in futuro per aggiornare la sua logica). Oltre all'aggiornabilità, una buona progettazione consente la modularità, ad esempio moduli plug-in per diversi schemi di firma o politiche di spesa, senza la necessità di una ridistribuzione completa. L'Account Kit di Alchemy ne è un ottimo esempio, consentendo agli sviluppatori di installare moduli di convalida (per diversi tipi di firma come ECDSA, BLS, ecc.) e moduli di esecuzione per logiche personalizzate. Per ottenere maggiore flessibilità e sicurezza nei conti abilitati all'EIP-7702, si incoraggiano gli sviluppatori a delegare a un contratto proxy piuttosto che direttamente a un'implementazione specifica. Questo approccio consente aggiornamenti fluidi e modularità senza richiedere autorizzazioni EIP-7702 aggiuntive per ogni modifica.

Vantaggi del pattern Proxy:

- **Aggiornabilità**: aggiornare la logica del contratto puntando il proxy a un nuovo contratto di implementazione.

- **Logica di Inizializzazione Personalizzata**: incorporare funzioni di inizializzazione all'interno del proxy per impostare in modo sicuro le variabili di stato necessarie.

Ad esempio, il [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) dimostra come un proxy possa essere utilizzato per inizializzare e gestire in modo sicuro le deleghe in conti compatibili con l'EIP-7702.

Svantaggi del pattern Proxy:

- **Dipendenza da attori esterni**: bisogna fare affidamento su un team esterno affinché non aggiorni a un contratto non sicuro.

## Considerazioni sulla sicurezza {#security-considerations}

**Guardia contro la rientranza**: con l'introduzione della delega EIP-7702, il conto di un utente può passare dinamicamente da un Conto di Proprietà Esterna (EOA) a un Contratto Intelligente (SC). Questa flessibilità consente al conto sia di avviare transazioni che di essere il destinatario di chiamate. Di conseguenza, gli scenari in cui un conto chiama se stesso ed effettua chiamate esterne avranno `msg.sender` uguale a `tx.origin`, il che mina alcune ipotesi di sicurezza che in precedenza si basavano sul fatto che `tx.origin` fosse sempre un EOA.

Per gli sviluppatori di contratti intelligenti, non è più sicuro dare per scontato che `tx.origin` si riferisca a un EOA. Allo stesso modo, l'uso di `msg.sender == tx.origin` come protezione contro gli attacchi di rientranza non è più una strategia affidabile.

In futuro, gli sviluppatori dovrebbero progettare partendo dal presupposto che qualsiasi partecipante al sistema possa essere un contratto intelligente. In alternativa, potrebbero implementare una protezione esplicita dalla rientranza utilizzando delle guardie di rientranza con pattern di modificatori `nonReentrant`. Consigliamo di seguire un modificatore verificato, ad es. la [Reentrancy Guard di OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Potrebbero anche usare una [variabile di archiviazione transitoria](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Considerazioni sulla sicurezza dell'inizializzazione**

L'implementazione dei contratti di delega EIP-7702 introduce specifiche sfide di sicurezza, in particolare per quanto riguarda il processo di inizializzazione. Una vulnerabilità critica si presenta quando la funzione di inizializzazione (`init`) è atomicamente accoppiata al processo di delega. In tali casi, un frontrunner potrebbe intercettare la firma della delega ed eseguire la funzione `init` con parametri alterati, prendendo potenzialmente il controllo del conto.

Questo rischio è particolarmente pertinente quando si tenta di utilizzare implementazioni di Conti di Contratti Intelligenti (SCA) esistenti con l'EIP-7702 senza modificare i loro meccanismi di inizializzazione.

**Soluzioni per Mitigare le Vulnerabilità di Inizializzazione**

- Implementare `initWithSig`
  Sostituire la funzione `init` standard con una funzione `initWithSig` che richiede all'utente di firmare i parametri di inizializzazione. Questo approccio garantisce che l'inizializzazione possa procedere solo con il consenso esplicito dell'utente, mitigando così i rischi di inizializzazione non autorizzata.

- Utilizzare l'EntryPoint di ERC-4337
  Richiedere che la funzione di inizializzazione sia chiamata esclusivamente dal contratto EntryPoint di ERC-4337. Questo metodo sfrutta il framework di convalida ed esecuzione standardizzato fornito da ERC-4337, aggiungendo un ulteriore livello di sicurezza al processo di inizializzazione.  
  _(Vedi: [Documentazione Safe](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Adottando queste soluzioni, gli sviluppatori possono migliorare la sicurezza dei contratti di delega EIP-7702, proteggendosi da potenziali attacchi di frontrunning durante la fase di inizializzazione.

**Collisioni di Archiviazione** La delega del codice non cancella l'archiviazione esistente. Quando si migra da un contratto di delega a un altro, i dati residui del contratto precedente rimangono. Se il nuovo contratto utilizza gli stessi slot di archiviazione ma li interpreta in modo diverso, può causare un comportamento imprevisto. Ad esempio, se la delega iniziale era a un contratto in cui uno slot di archiviazione rappresenta un `bool`, e la delega successiva è a un contratto in cui lo stesso slot rappresenta un `uint`, la mancata corrispondenza può portare a risultati imprevedibili.

**Rischi di phishing** Con l'implementazione della delega EIP-7702, gli asset nel conto di un utente possono essere interamente controllati da contratti intelligenti. Se un utente delega inconsapevolmente il proprio conto a un contratto malevolo, un aggressore potrebbe facilmente ottenerne il controllo e rubare i fondi. Quando si utilizza `chain_id=0` la delega viene applicata a tutti gli ID di catena. Delegare solo a un contratto immutabile (non delegare mai a un proxy), e solo a contratti che sono stati distribuiti usando CREATE2 (con initcode standard - nessun contratto metamorfico) in modo che il deployer non possa distribuire qualcosa di diverso allo stesso indirizzo altrove. Altrimenti la sua delega mette a rischio il suo conto su tutte le altre catene EVM.

Quando gli utenti eseguono firme delegate, il contratto di destinazione che riceve la delega dovrebbe essere visualizzato in modo chiaro ed evidente per aiutare a mitigare i rischi di phishing.

**Superficie di Fiducia Minima e Sicurezza**: pur offrendo flessibilità, un contratto di delega dovrebbe mantenere la sua logica di base minima e verificabile. Il contratto è di fatto un'estensione dell'EOA dell'utente, quindi qualsiasi difetto può essere catastrofico. Le implementazioni dovrebbero seguire le migliori pratiche della comunità di sicurezza dei contratti intelligenti. Ad esempio, le funzioni costruttore o inizializzatore devono essere protette con cura - come evidenziato da Alchemy, se si utilizza un pattern proxy con la 7702, un inizializzatore non protetto potrebbe consentire a un aggressore di prendere il controllo del conto. I team dovrebbero mirare a mantenere semplice il codice sulla catena: il contratto 7702 di Ambire è di sole ~200 righe di Solidity, minimizzando deliberatamente la complessità per ridurre i bug. È necessario trovare un equilibrio tra una logica ricca di funzionalità e la semplicità che facilita la verifica.

### Implementazioni note {#known-implementations}

Data la natura dell'EIP 7702, si raccomanda che i portafogli usino cautela quando aiutano gli utenti a delegare a un contratto di terze parti. Di seguito è riportato un elenco di implementazioni note che sono state verificate:

| Indirizzo del contratto                    | Fonte                                                                                                                                            | Controlli                                                                                                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                            | [audits](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                            | [audits](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)                    | [audits](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                                | [audits](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Team AA della Ethereum Foundation](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [audits](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                            | [audits](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Linee guida per i portafogli hardware {#hardware-wallet-guidelines}

I portafogli hardware non dovrebbero esporre la delega arbitraria. Il consenso nello spazio dei portafogli hardware è di utilizzare un elenco di contratti deleganti fidati. Suggeriamo di consentire le implementazioni note elencate sopra e di considerare le altre caso per caso. Poiché delegare il proprio EOA a un contratto conferisce il controllo su tutti gli asset, i portafogli hardware dovrebbero essere cauti nel modo in cui implementano la 7702.

### Scenari di integrazione per app companion {#integration-scenarios-for-companion-apps}

#### Lazy {#lazy}

Poiché l'EOA continua a funzionare come al solito, non c'è nulla da fare.

Nota: alcuni asset potrebbero essere rifiutati automaticamente dal codice di delega, come gli NFT ERC 1155, e il supporto dovrebbe esserne consapevole.

#### Consapevole {#aware}

Notificare all'utente che è in atto una delega per l'EOA controllando il suo codice e, opzionalmente, offrire di rimuovere la delega.

#### Delega comune {#common-delegation}

Il fornitore di hardware inserisce nella whitelist i contratti di delega noti e ne implementa il supporto nel software companion. Si raccomanda di scegliere un contratto con pieno supporto ERC 4337.

Gli EOA delegati a uno diverso saranno gestiti come EOA standard.

#### Delega personalizzata {#custom-delegation}

Il fornitore di hardware implementa il proprio contratto di delega e lo aggiunge agli elenchi, implementandone il supporto nel software companion. Si raccomanda di creare un contratto con pieno supporto ERC 4337.

Gli EOA delegati a uno diverso saranno gestiti come EOA standard.
