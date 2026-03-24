---
title: Linee guida per Pectra 7702
description: "Scopri di più su 7702 nell'aggiornamento Pectra"
lang: it
---

# Pectra 7702

## Abstract {#abstract}

L'EIP 7702 definisce un meccanismo per aggiungere codice a un EOA. Questa proposta consente agli EOA, gli account legacy di Ethereum, di ricevere miglioramenti delle funzionalità a breve termine, aumentando l'usabilità delle applicazioni. Ciò avviene impostando un puntatore a un codice già distribuito utilizzando un nuovo tipo di transazione: 4.

Questo nuovo tipo di transazione introduce un elenco di autorizzazioni. Ogni tupla di autorizzazione nell'elenco è definita come

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** è la delega (bytecode già distribuito che verrà utilizzato dall'EOA)
**chain_id** blocca l'autorizzazione a una catena specifica (o 0 per tutte le catene)
**nonce** blocca l'autorizzazione a un nonce dell'account specifico
(**y_parity, r, s**) è la firma dell'autorizzazione della tupla, definita come keccak(0x05 || rlp ([chain_id ,address, nonce])) dalla chiave privata dell'EOA a cui si applica l'autorizzazione (chiamata anche autorità)

Una delega può essere ripristinata delegando all'indirizzo nullo.

La chiave privata dell'EOA mantiene il pieno controllo sull'account dopo la delega. Ad esempio, delegare a un Safe non rende l'account un multifirma perché c'è ancora una singola chiave che può aggirare qualsiasi politica di firma. In futuro, gli sviluppatori dovrebbero progettare partendo dal presupposto che qualsiasi partecipante al sistema potrebbe essere un contratto intelligente. Per gli sviluppatori di contratti intelligenti, non è più sicuro presumere che `tx.origin` si riferisca a un EOA.

## Migliori pratiche {#best-practices}

**Astrazione dell'account**: Un contratto di delega dovrebbe allinearsi con i più ampi standard di astrazione dell'account (AA) di Ethereum per massimizzare la compatibilità. In particolare, dovrebbe idealmente essere conforme o compatibile con l'ERC-4337.

**Design senza permessi e resistente alla censura**: Ethereum valorizza la partecipazione senza permessi. Un contratto di delega NON DEVE codificare in modo rigido o fare affidamento su un singolo relayer o servizio "fidato". Ciò bloccherebbe l'account se il relayer andasse offline. Funzionalità come il raggruppamento (ad es. approve+transferFrom) possono essere utilizzate dall'EOA stesso senza un relayer. Per gli sviluppatori di applicazioni che desiderano utilizzare funzionalità avanzate abilitate dal 7702 (Astrazione del gas, Prelievi che preservano la privacy) sarà necessario un relayer. Sebbene esistano diverse architetture di relayer, la nostra raccomandazione è di utilizzare i [bundler 4337](https://www.erc4337.io/bundlers) che puntano almeno all'[entry point 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) perché:

- Forniscono interfacce standardizzate per il relaying
- Includono sistemi paymaster integrati
- Garantiscono la compatibilità futura
- Possono supportare la resistenza alla censura attraverso una [mempool pubblica](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Possono richiedere che la funzione init venga chiamata solo da [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

In altre parole, chiunque dovrebbe essere in grado di agire come sponsor/relayer della transazione purché fornisca la firma valida richiesta o la UserOperation dall'account. Ciò garantisce la resistenza alla censura: se non è richiesta alcuna infrastruttura personalizzata, le transazioni di un utente non possono essere bloccate arbitrariamente da un relay di controllo (gatekeeping). Ad esempio, il [Delegation Toolkit di MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) funziona esplicitamente con qualsiasi bundler o paymaster ERC-4337 su qualsiasi catena, piuttosto che richiedere un server specifico per MetaMask.

**Integrazione delle dApp tramite le interfacce del portafoglio**:

Dato che i portafogli inseriranno in whitelist specifici contratti di delega per l'EIP-7702, le dApp non dovrebbero aspettarsi di richiedere direttamente le autorizzazioni 7702. L'integrazione dovrebbe invece avvenire attraverso interfacce standardizzate del portafoglio:

- **ERC-5792 (`wallet_sendCalls`)**: Consente alle dApp di richiedere ai portafogli di eseguire chiamate raggruppate, facilitando funzionalità come il raggruppamento delle transazioni e l'astrazione del gas.

- **ERC-6900**: Consente alle dApp di sfruttare le capacità modulari degli account intelligenti, come le chiavi di sessione e il recupero dell'account, attraverso moduli gestiti dal portafoglio.

Utilizzando queste interfacce, le dApp possono accedere alle funzionalità degli account intelligenti fornite dall'EIP-7702 senza gestire direttamente le deleghe, garantendo compatibilità e sicurezza tra le diverse implementazioni dei portafogli.

> Nota: Non esiste un metodo standardizzato per le dApp per richiedere direttamente le firme di autorizzazione 7702. Le dApp devono fare affidamento su specifiche interfacce del portafoglio come l'ERC-6900 per sfruttare le funzionalità dell'EIP-7702.

Per maggiori informazioni:

- [Specifica ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Specifica ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Evitare il Vendor Lock-In**: In linea con quanto sopra, una buona implementazione è neutrale rispetto al fornitore e interoperabile. Questo spesso significa aderire agli standard emergenti per gli account intelligenti. Ad esempio, il [Modular Account di Alchemy](https://github.com/alchemyplatform/modular-account) utilizza lo standard ERC-6900 per gli account intelligenti modulari ed è progettato tenendo a mente un "utilizzo interoperabile senza permessi".

**Preservazione della privacy**: Sebbene la privacy on-chain sia limitata, un contratto di delega dovrebbe sforzarsi di ridurre al minimo l'esposizione dei dati e la collegabilità. Ciò può essere ottenuto supportando funzionalità come i pagamenti del gas in token ERC-20 (in modo che gli utenti non debbano mantenere un saldo ETH pubblico, il che migliora la privacy e l'UX) e chiavi di sessione monouso (che riducono la dipendenza da una singola chiave a lungo termine). Ad esempio, l'EIP-7702 consente di pagare il gas in token tramite transazioni sponsorizzate e una buona implementazione renderà facile integrare tali paymaster senza far trapelare più informazioni del necessario. Inoltre, la delega fuori catena di determinate approvazioni (utilizzando firme che vengono verificate on-chain) significa meno transazioni on-chain con la chiave primaria dell'utente, favorendo la privacy. Gli account che richiedono l'utilizzo di un relayer costringono gli utenti a rivelare i propri indirizzi IP. Le PublicMempool migliorano questo aspetto: quando una transazione/UserOp si propaga attraverso la mempool, non è possibile dire se sia originata dall'IP che l'ha inviata o se sia stata semplicemente trasmessa attraverso di esso tramite il protocollo p2p.

**Estensibilità e sicurezza modulare**: Le implementazioni degli account dovrebbero essere estensibili in modo da potersi evolvere con nuove funzionalità e miglioramenti della sicurezza. L'aggiornabilità è intrinsecamente possibile con l'EIP-7702 (poiché un EOA può sempre delegare a un nuovo contratto in futuro per aggiornare la sua logica). Oltre all'aggiornabilità, un buon design consente la modularità (ad es. moduli plug-in per diversi schemi di firma o politiche di spesa) senza la necessità di ridistribuire interamente. L'Account Kit di Alchemy ne è un ottimo esempio, consentendo agli sviluppatori di installare moduli di convalida (per diversi tipi di firma come ECDSA, BLS, ecc.) e moduli di esecuzione per logiche personalizzate. Per ottenere maggiore flessibilità e sicurezza negli account abilitati per l'EIP-7702, gli sviluppatori sono incoraggiati a delegare a un contratto proxy piuttosto che direttamente a un'implementazione specifica. Questo approccio consente aggiornamenti e modularità senza interruzioni, senza richiedere ulteriori autorizzazioni EIP-7702 per ogni modifica.

Vantaggi del pattern Proxy:

- **Aggiornabilità**: Aggiorna la logica del contratto puntando il proxy a un nuovo contratto di implementazione.

- **Logica di inizializzazione personalizzata**: Incorpora funzioni di inizializzazione all'interno del proxy per impostare le variabili di stato necessarie in modo sicuro.

Ad esempio, il [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) dimostra come un proxy possa essere utilizzato per inizializzare e gestire in modo sicuro le deleghe negli account compatibili con l'EIP-7702.

Svantaggi del pattern Proxy:

- **Dipendenza da attori esterni**: Devi fare affidamento su un team esterno affinché non esegua l'aggiornamento a un contratto non sicuro.

## Considerazioni sulla sicurezza {#security-considerations}

**Protezione dalla rientranza**: Con l'introduzione della delega EIP-7702, l'account di un utente può passare dinamicamente da un account controllato esternamente (EOA) a un contratto intelligente (SC). Questa flessibilità consente all'account sia di avviare transazioni sia di essere il bersaglio di chiamate. Di conseguenza, gli scenari in cui un account chiama se stesso ed effettua chiamate esterne avranno `msg.sender` uguale a `tx.origin`, il che mina alcune ipotesi di sicurezza che in precedenza si basavano sul fatto che `tx.origin` fosse sempre un EOA.

Per gli sviluppatori di contratti intelligenti, non è più sicuro presumere che `tx.origin` si riferisca a un EOA. Allo stesso modo, utilizzare `msg.sender == tx.origin` come salvaguardia contro gli attacchi di rientranza non è più una strategia affidabile.

In futuro, gli sviluppatori dovrebbero progettare partendo dal presupposto che qualsiasi partecipante al sistema potrebbe essere un contratto intelligente. In alternativa, potrebbero implementare una protezione esplicita dalla rientranza utilizzando protezioni dalla rientranza con pattern di modificatori `nonReentrant`. Raccomandiamo di seguire un modificatore verificato, ad es. la [Reentrancy Guard di Open Zeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). Potrebbero anche utilizzare una [variabile di archiviazione transitoria](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Considerazioni sulla sicurezza dell'inizializzazione**

L'implementazione dei contratti di delega EIP-7702 introduce sfide di sicurezza specifiche, in particolare per quanto riguarda il processo di inizializzazione. Una vulnerabilità critica si presenta quando la funzione di inizializzazione (`init`) è accoppiata atomicamente al processo di delega. In tali casi, un frontrunner potrebbe intercettare la firma della delega ed eseguire la funzione `init` con parametri alterati, assumendo potenzialmente il controllo dell'account.

Questo rischio è particolarmente pertinente quando si tenta di utilizzare le implementazioni esistenti di Account di Contratto Intelligente (SCA) con l'EIP-7702 senza modificare i loro meccanismi di inizializzazione.

**Soluzioni per mitigare le vulnerabilità di inizializzazione**

- Implementare `initWithSig`  
  Sostituire la funzione `init` standard con una funzione `initWithSig` che richiede all'utente di firmare i parametri di inizializzazione. Questo approccio garantisce che l'inizializzazione possa procedere solo con il consenso esplicito dell'utente, mitigando così i rischi di inizializzazione non autorizzata.

- Utilizzare l'EntryPoint dell'ERC-4337  
  Richiedere che la funzione di inizializzazione venga chiamata esclusivamente dal contratto EntryPoint dell'ERC-4337. Questo metodo sfrutta il framework di convalida ed esecuzione standardizzato fornito dall'ERC-4337, aggiungendo un ulteriore livello di sicurezza al processo di inizializzazione.  
  _(Vedi: [Documentazione di Safe](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Adottando queste soluzioni, gli sviluppatori possono migliorare la sicurezza dei contratti di delega EIP-7702, salvaguardandosi da potenziali attacchi di frontrunning durante la fase di inizializzazione.

**Collisioni di archiviazione** La delega del codice non cancella l'archiviazione esistente. Quando si migra da un contratto di delega a un altro, i dati residui del contratto precedente rimangono. Se il nuovo contratto utilizza gli stessi slot di archiviazione ma li interpreta in modo diverso, può causare comportamenti imprevisti. Ad esempio, se la delega iniziale era a un contratto in cui uno slot di archiviazione rappresenta un `bool` e la delega successiva è a un contratto in cui lo stesso slot rappresenta un `uint`, la mancata corrispondenza può portare a risultati imprevedibili.

**Rischi di phishing** Con l'implementazione della delega EIP-7702, le risorse nell'account di un utente potrebbero essere interamente controllate da contratti intelligenti. Se un utente delega inconsapevolmente il proprio account a un contratto dannoso, un utente malintenzionato potrebbe facilmente prenderne il controllo e rubare i fondi. Quando si utilizza `chain_id=0` la delega viene applicata a tutti gli ID della catena. Delega solo a un contratto immutabile (non delegare mai a un proxy) e solo a contratti che sono stati distribuiti utilizzando CREATE2 (con initcode standard - nessun contratto metamorfico) in modo che il distributore non possa distribuire qualcosa di diverso allo stesso indirizzo altrove. Altrimenti la tua delega mette a rischio il tuo account su tutte le altre catene EVM.

Quando gli utenti eseguono firme delegate, il contratto di destinazione che riceve la delega dovrebbe essere visualizzato in modo chiaro e ben visibile per aiutare a mitigare i rischi di phishing.

**Superficie fidata minima e sicurezza**: Pur offrendo flessibilità, un contratto di delega dovrebbe mantenere la sua logica di base minima e verificabile. Il contratto è di fatto un'estensione dell'EOA dell'utente, quindi qualsiasi difetto può essere catastrofico. Le implementazioni dovrebbero seguire le migliori pratiche della comunità di sicurezza dei contratti intelligenti. Ad esempio, le funzioni del costruttore o dell'inizializzatore devono essere accuratamente protette: come evidenziato da Alchemy, se si utilizza un pattern proxy con il 7702, un inizializzatore non protetto potrebbe consentire a un utente malintenzionato di assumere il controllo dell'account. I team dovrebbero mirare a mantenere semplice il codice on-chain: il contratto 7702 di Ambire è di sole ~200 righe di Solidity, riducendo deliberatamente la complessità per diminuire i bug. È necessario trovare un equilibrio tra una logica ricca di funzionalità e la semplicità che facilita l'auditing.

### Implementazioni note {#known-implementations}

A causa della natura dell'EIP 7702, si raccomanda ai portafogli di usare cautela quando aiutano gli utenti a delegare a un contratto di terze parti. Di seguito è riportata una raccolta di implementazioni note che sono state sottoposte ad audit:

| Indirizzo del contratto                    | Fonte                                                                                                                                      | Audit                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [audit](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [audit](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [audit](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [audit](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Ethereum Foundation AA team](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [audit](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [audit](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Linee guida per i portafogli hardware {#hardware-wallet-guidelines}

I portafogli hardware non dovrebbero esporre deleghe arbitrarie. Il consenso nello spazio dei portafogli hardware è di utilizzare un elenco di contratti deleganti fidati. Suggeriamo di consentire le implementazioni note elencate sopra e di considerarne altre caso per caso. Poiché delegare il proprio EOA a un contratto conferisce il controllo su tutte le risorse, i portafogli hardware dovrebbero essere cauti nel modo in cui implementano il 7702.

### Scenari di integrazione per le app complementari {#integration-scenarios-for-companion-apps}

#### Lazy {#lazy}

Poiché l'EOA continua a funzionare come al solito, non c'è nulla da fare.

Nota: alcune risorse potrebbero essere rifiutate automaticamente dal codice di delega, come gli NFT ERC 1155, e il supporto dovrebbe esserne consapevole.

#### Consapevole {#aware}

Notifica all'utente che è in atto una delega per l'EOA controllando il suo codice e, facoltativamente, offri di rimuovere la delega.

#### Delega comune {#common-delegation}

Il fornitore di hardware inserisce in whitelist i contratti di delega noti e implementa il loro supporto nel software complementare. Si raccomanda di scegliere un contratto con pieno supporto ERC 4337.

Gli EOA delegati a uno diverso verranno gestiti come EOA standard.

#### Delega personalizzata {#custom-delegation}

Il fornitore di hardware implementa il proprio contratto di delega e lo aggiunge agli elenchi, implementandone il supporto nel software complementare. Si raccomanda di creare un contratto con pieno supporto ERC 4337.

Gli EOA delegati a uno diverso verranno gestiti come EOA standard.