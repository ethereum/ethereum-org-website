---
title: Astrazione account
description: Una panoramica dei piani di Ethereum per rendere i conti degli utenti più semplici e sicuri
lang: it
summaryPoints:
  - L'astrazione del conto semplifica molto la creazione di portafogli di contratti intelligenti
  - I portafogli di contratti intelligenti semplificano molto la gestione dell'accesso ai conti di Ethereum
  - Le chiavi perdute o esposte sono recuperabili utilizzando svariati backup
---

# Astrazione account {#account-abstraction}

Gli utenti interagiscono con Ethereum utilizzando i **[conti posseduti esternamente (EOA)](/glossary/#eoa)**. Questo è il solo modo per avviare una transazione o per eseguire un contratto intelligente. Ciò limita il modo in cui gli utenti possono interagire con Ethereum. Ad esempio, rende difficile eseguire transazioni in massa e richiede agli utenti di mantenere sempre un saldo di ETH per coprire i costi del gas.

L'astrazione del conto è un modo per risolvere tali problemi, consentendo agli utenti di programmare flessibilmente maggiore sicurezza e una migliore esperienza degli utenti, nei propri conti. Ciò può verificarsi [aggiornando gli EOA](https://eips.ethereum.org/EIPS/eip-3074) così che possano essere controllati da contratti intelligenti, o [aggiornando i contratti intelligenti](https://eips.ethereum.org/EIPS/eip-2938), così che possano avviare transazioni. Queste opzioni richiedono entrambe modifiche al protocollo di Ethereum. Esiste un terzo percorso che comporta l'aggiunta di un [secondo sistema separato di transazioni](https://eips.ethereum.org/EIPS/eip-4337) da eseguire in parallelo al protocollo esistente. Indipendentemente dal percorso, il risultato è l'accesso a Ethereum tramite i portafogli di contratti intelligenti, supportati nativamente come parte del protocollo esistente o tramite una rete di transazioni aggiuntiva.

I portafogli di contratti intelligenti sbloccano molti benefici per l'utente, tra cui:

- definire le proprie regole di sicurezza flessibili
- recuperare il proprio conto in caso di perdita delle chiavi
- condividere la sicurezza del proprio conto tra svariati dispositivi o individui
- pagare il gas altrui, o far pagare il proprio a qualcun altro
- raggruppare le transazioni (es. approvare ed eseguire uno scambio in una sola volta)
- incrementare le opportunità per gli svilupptori di dapp e portafogli, per innovare l'esperienza degli utenti

Tali benefici non sono oggi supportati nativamente, poiché soltanto gli account posseduti esternamente ([EOA](/glossary/#eoa)) possono avviare le transazioni. Gli EOA sono semplicemente coppie di chiavi pubblica-privata. Funzionano come segue:

- se hai la chiave privata puoi fare _qualsiasi cosa_ entro le regole della Macchina Virtuale di Ethereum (EVM)
- se non hai la chiave privata non puoi fare _nulla_.

Se perdi le tue chiavi non sono recuperabili e le chiavi rubate danno ai ladri l'accesso istantaneo a tutti i fondi in un conto.

I portafogli di contratti intelligenti sono la soluzione a tali problemi, ma a oggi sono difficili da programmare poiché, alla fine, qualsiasi logica che implementano dev'essere tradotta in una serie di transazioni dell'EOA, prima che possa essere elaborata da Ethereum. L'astrazione del conto consente ai contratti intelligenti di avviare da soli le transazioni, così che qualsiasi logica che l'utente desideri implementare possa essere programmata nel portafoglio del contratto intelligente stesso ed eseguita su Ethereum.

Infine, l'astrazione del conto migliora il supporto ai portafogli di contratti intelligenti, semplificandone la creazione e aumentandone la sicurezza di utilizzo. Infine, con l'astrazione del conto, gli utenti possono godere di tutti i benefici di Ethereum, senza conoscere o interessarsi della tecnologia sottostante.

## Oltre le frasi di seed {#beyond-seed-phrases}

I conti odierni sono protetti utilizzando chiavi private, calcolate dalle frasi di seed. Chiunque abbia accesso a una frase di seed può scoprire facilmente la chiave privata che protegge un conto e ottenere accesso a tutte le risorse che protegge. Se una chiave privata e una frase di seed sono perdute, non sono mai recuperabili e le risorse che controllano sono congelate per sempre. Proteggere queste frasi di seed è alquanto bizzarro, persino per gli utenti esperti e il phishing delle frasi di seed è uno dei metodi più comuni per truffare gli utenti.

L'astrazione del conto risolverà tale problema, utilizzando un contratto intelligente per detenere le risorse e autorizzare le transazioni. Questi contratti intelligenti sono quindi decorabili con logica personalizzata, per renderli il più sicuri e su misura possibile per l'utente. Infine, utilizzi ancora le chiavi private per controllare l'accesso al tuo conto, ma con reti di sicurezza che le rendono più facili e sicure da gestire.

Ad esempio, le chiavi di backup possono essere aggiunte a un portafoglio, così che se perdi o esponi accidentalmente la tua chiave principale, può essere sostituita da una nuova e sicura, con l'autorizzazione dalle chiavi di backup. Potresti proteggere ognuna di queste chiavi in un modo differente, o dividerle tra guardiani fidati. Questo rende molto più difficile, per un ladro, ottenere il pieno controllo sui tuoi fondi. Similmente, puoi aggiungere regole al portafoglio per ridurre l'impatto in caso di compromissione delle tue chiavi principali, ad esempio, potresti consentire la verifica delle transazioni di basso valore tramite un'unica firma, richiedendo invece l'approvazione di più firmatari autenticati per le transazoni di valore maggiore. Esistono anche altri modi in cui i portafogli di contratti intelligenti possono aiutarti a contrastare i ladri, ad esempio si può utilizzare una lista di autorizzazione per bloccare ogni transazione a meno che non provenga da un indirizzo attendibile, o sia verificata da svariate delle tue chiavi pre-approvate.

### Esempi di logica di sicurezza possono essere integrati in un portafoglio del contratto intelligente:

- **Autorizzazione multifirma**: Puoi condividere le credenziali di autorizzazione tra svariate persone o dispositivi affidabili. Quindi, il contratto, è configurabile affinché le transazioni di più di un dato valore predeterminato, richiedano l'autorizzazione da una certa porzione (ad esempio, 3/5) delle parti fidate. Ad esempio, le transazioni dal valore elevato potrebbero richiedere l'approvazione sia da un dispositivo mobile che da un portafoglio hardware, o le firme dai conti distribuiti ai membri familiari fidati.
- **Congelamento del conto**: Se un dispositivo è perduto o compromesso, il conto può essere bloccato da un altro dispositivo autorizzato, proteggendo le risorse dell'utente.
- **Recupero del conto**: Hai perso un dispositivo o hai dimenticato una password? Nel paradigma corrente, ciò significa che le tue risorse potrebbero essere state congelate per sempre. Con un portafoglio di contratti intelligenti puoi configurare un elenco di conti che possono autorizzare nuovi dispositivi e ripristinare l'accesso.
- **Imposta i limiti di transazione**: specifica le soglie giornaliere per quanto valore sia trasferibile dal conto in un giorno/una settimana/un mese. Ciò significa che, se un utente malevolo ottiene l'accesso al tuo conto, non può prelevare tutto in una volta e hai l'opportunità di congelare e ripristinare l'accesso.
- **Crea elenchi di autorizzazione**: consenti soltanto le transazioni verso certi indirizzi che sai essere sicuri. Ciò significa che _anche se_ la tua chiave privata è stata rubata, l'utente malevolo potrebbe inviare fondi soltanto ai conti di destinazione presenti nel tuo elenco. Questi elenchi di autorizzazione richiederebbero più firme per essere modificati, così che un utente malevolo non possa aggiungervi il proprio indirizzo senza avere accesso a svariate delle tue chiavi di backup.

## Migliore esperienza utente {#better-user-experience}

L'astrazione del conto consente un'**esperienza dell'utente complessiva migliore**, nonché **maggiore sicurezza**, poiché aggiunge supporto ai portafogli di contratti intelligenti, a livello del protocollo. Il motivo più importante per questo è che fornirà agli sviluppatori di contratti intelligenti, portafogli e applicazioni, molta più libertà di innovare l'esperienza degli utenti, in modi che potrebbero ancora non essere capaci di anticipare. Alcuni miglioramenti ovvi che proverrebbero dall'astrazione del conto, includono il raggruppamento delle transazioni, per velocità ed efficienza. Ad esempio, un semplice scambio dovrebbe essere un'operazione da un click, ma oggi richiede la firma di più transazioni per approvare la spesa di singoli token prima dell'esecuzione dello scambio. L'astrazione del conto rimuove quella frizione, consentendo il raggruppamento delle transazioni. Inoltre, le transazioni raggruppate potrebbero approvare precisamente il valore corretto di token necessari per ogni transazione, per poi revocare le approvazioni al suo completamento, fornendo maggiore sicurezza.

La gestione del gas, inoltre, è di molto migliorata con l'astrazione del conto. Non solo le applicazioni possono offrire di pagare le commissioni sul gas degli utenti ma, queste, possono essere pagate in token differenti da ETH, liberando gli utenti dal dover mantenere un saldo di ETH per finanziare le transazioni. Ciò potrebbe funzionare scambiando i token dell'utente per ETH nel contratto, quindi, utilizzando gli ETH per pagare il gas.

<ExpandableCard title="Come potrebbe aiutare, l'astrazione del conto, con il gas?" eventCategory="/roadmap/account-abstraction" eventName="clicked how can account abstraction help with gas?">

La gestione del gas è una delle frizioni principali per gli utenti di Ethereum, principalmente perché gli ETH sono la sola risorsa utilizzabile per pagare le transazioni. Immagina di avere un portafoglio con un saldo di USDC, ma nessun ETH. Non puoi spostare o scambiare quei token USDC, poiché non puoi pagare il gas. Non puoi nemmeno scambiare gli USDC per ETH, poiché anche questo costa del gas. Dovresti inviare altri ETH al tuo conto da una piattaforma di scambio o da un altro indirizzo per risolvere il problema. Con i portafogli di contratti intelligenti, invece, puoi semplicemente pagare il gas in USDC, liberando il tuo conto. Non devi più mantenere un saldo di ETH in tutti i tuoi conti.

L'astrazione del conto, inoltre, consente agli sviluppatori di dapp di essere creativi con la gestione del gas. Ad esempio, potresti riuscire a iniziare a pagare una commissione fissa mensile alla tua DEX preferita, per delle transazioni illimitate. Le Dapp potrebbero offrire di pagare tutte le tue commissioni di gas per conto tuo, come ricompensa per aver utilizzato la loro piattaforma, o come offerta di inserimento. Per gli sviluppatori, sarebbe molto più facile innovare sul gas, quando i portafogli di contratti intelligenti sono supportati al livello del protocollo.

</ExpandableCard>

Le sessioni fidate, inoltre, sono potenzialmente trasformative per le esperienze degli utenti, specialmente per applicazioni come il gaming, in cui grandi numeri di piccole transazioni, potrebbero necessitare dell'approvazione in un breve tempo. Approvare individualmente ogni transazione spezzerebbe l'esperienza di gioco, ma l'approvazione permanente non è sicura. Il portafoglio di un contratto intelligente potrebbe approvare certe transazioni per un dato tempo, fino a un valore specifico o solo per certi indirizzi.

Inoltre, è interessante considerare come gli acquisti potrebbero cambiare, con l'astrazione del conto. Oggi, ogni transazione dev'essere approvata ed eseguita da un portafoglio pre-finanziato con un importo sufficiente del token corretto. Con l'astrazione del conto, l'esperienza potrebbe somigliare di più allo shopping online di famiglia, in cui un utente potrebbe riempire un "carrello" di oggetti e cliccare una volta per acquistare tutto insieme, con tutta la logica necessaria gestita dal contratto, non dall'utente.

Esistono solo alcuni esempi di come le esperienze degli utenti potrebbero essere migliorate dall'astrazione del conto, ma ne esisteranno molti altri, che non abbiamo ancora immaginato. L'astrazione del conto libera gli sviluppatori dai vincoli dei EOA dei giorni nostri, consente loro di portare i migliori aspetti del web2 al web3 senza sacrificare la custodia personale e di incidere creativamente sull'inventiva di nuove esperienze degli utenti.

## Come sarà implementata l'astrazione del conto? {#how-will-aa-be-implemented}

I portafogli di contratti intelligenti, ad oggi, esistono, ma implementarli è impegnativo poiché l'EVM non li supporta. Invece, si affidano all'avvolgimento di codice relativamente complesso, intorno alle transazioni standard di Ethereum. Ethereum può modificare tale procedimento, consentendo ai contratti intelligenti di avviare le transazioni, gestendo la logica necessaria nei contratti intelligenti di Ethereum, invece che al di fuori della catena. Inoltre, inserire la logica nei contratti intelligenti, incrementa la decentralizzazione di Ethereum, poiché rimuove il bisogno di "staffettisti" operati dagli sviluppatori dei portafogli, di tradurre i messaggi firmati dall'utente, in transazioni regolari di Ethereum.

<ExpandableCard title="EIP-2771: astrazione del conto utilizzando le meta-transazioni" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2771: account abstraction using meta-transactions">

EIP-2771 introduce il concetto delle meta-transazioni, che consentono a terze parti di pagare i costi del gas degli utenti senza apportare modifiche al protocollo di Ethereum. L'idea è che le transazioni firmate da un utente sono inviate a un contratto `Corriere`. Il corriere è un'entità fidata che verifica che le transazioni siano valide, prima di inviarle a un ripetitore di gas. Ciò avviene all'esterno della catena, evitando il bisogno di pagare il gas. Il ripetitore di gas passa la transazione a un contratto `Destinatario`, pagando il gas necessario per rendere la transazione eseguibile su Ethereum. La transazione è eseguita se il `Corriere` è noto ed è ritenuto attendibile dal `Destinatario`. Questo modello semplifica, per gli sviluppatori, l'implementazione di transazioni a gas zero per gli utenti.

</ExpandableCard>

<ExpandableCard title="EIP-4337: astrazione del conto senza modificare il protocollo di Ethereum" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-4337: account abstraction without changing the Ethereum protocol">

L'EIP-4337 è il primo passo verso il supporto dei portafogli di contratti intelligenti nativi in modo decentralizzato, <em>senza richiedere modifiche al protocollo di Ethereum</em>. Invece di modificare il livello del consenso per supportare i portafogli di contratti intelligenti, un nuovo sistema è aggiunto separatamente al normale protocollo di gossip della transazione. Questo sistema di livello superiore si basa su un nuovo oggetto, detto <code>UserOperation</code>, che impacchetta le azioni da un utente, insieme alle firme rilevanti. Questi oggetti <code>UserOperation</code>, quindi, sono trasmessi in un mempool dedicato, dove i validatori possono raccoglierli in una "transazione raggruppata". La transazione raggruppata rappresenta una sequenza di molti <code>UserOperations</code> singoli e può essere inclusa nei blocchi di Ethereum, proprio come una normale transazione, che sarà raccolta dai validatori utilizzando un simile modello di selezione che massimizza le commissioni.

Anche il funzionamento dei portafogli cambierà sotto EIP-4337. Invece di far reimplementare da ogni portafoglio una logica di sicurezza complessa ma comune, queste funzioni saranno affidate a un contratto del portafoglio globale, noto come &quot;punto d'accesso&quot;. Questo, gestirebbe le operazioni come il pagamento delle commissioni e l'esecuzione del codice dell'EVM, così che gli sviluppatori di portafogli possano concentrarsi sul fornire eccellenti esperienze agli utenti.

<strong>Nota:</strong> il contratto del punto d'accesso dell'EIP-4337, è stato distribuito alla Rete Principale di Ethereum l'1 marzo 2023. Puoi visualizzare il contratto su <a href="https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57">Etherscan</a>.

</ExpandableCard>

<ExpandableCard title="EIP-2938: modificare il protocollo di Ethereum per supportare l'astrazione del conto" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2938: changing the Ethereum protocol to support account abstraction">

L'<a href="https://eips.ethereum.org/EIPS/eip-2938">EIP-2938</a> mira ad aggiornare il protocollo di Ethereum introducendo un nuovo tipo di transazione, <code>AA_TX_TYPE</code> che include tre campi: <code>nonce</code>, <code>target</code> e <code>data</code>, dove <code>nonce</code> è un contatore di transazioni, <code>target</code> è l'indirizzo del contratto del punto d'accesso, e <code>data</code> è il bytecode dell'EVM. Per eseguire queste transazioni, devono essere aggiunte due nuove istruzioni (note come codici operativi) all'EVM: <code>NONCE</code> e <code>PAYGAS</code>. Il codice operativo <code>NONCE</code> traccia la sequenza della transazione e <code>PAYGAS</code> calcola e preleva il gas necessario per eseguire la transazione dal saldo del contratto. Queste nuove funzionalità consentono a Ethereum di supportare nativamente i portafogli di contratti intelligenti, poiché l'infrastruttura necessaria è integrata nel protocollo di Ethereum.

Nota che l'EIP-2938 non è correntemente attiva. La community, al momento, preferisce EIP-4337 poiché non richiede modifiche al protocollo.

</ExpandableCard>

<ExpandableCard title="EIP-3074: aggiornare i conti posseduti esternamente per l'astrazione del conto" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-3074: upgrading externally-owned accounts for account abstraction">

L'<a href="https://eips.ethereum.org/EIPS/eip-3074">EIP-3074</a> mira ad aggiornare i conti posseduti esternamente di Ethereum, consentendo loro di delegare il controllo a un contratto intelligente. Ciò significa che la logica dei contratti intelligenti potrebbe approvare le transazioni originate da un EOA. Questo consentirebbe funzionalità come la sponsorizzazione del gas e le transazioni raggruppate. Perché funzioni, devono essere aggiunti due nuovi codici operativi all'EVM: <code>AUTH</code> e <code>AUTHCALL</code>. Con l'EIP-3074, i benefici del portafoglio di un contratto intelligente sono resi disponibili <em>senza la necessità di un contratto</em>, invece un tipo specifico di contratto privo di stato, privo di fiducia e non ggiornabile, noto come "invocatore", gestisce le transazioni.

Nota che EIP-3074 non è correntemente attivo. La community, al momento, preferisce EIP-4337 poiché non richiede modifiche al protocollo.

</ExpandableCard>

## Stato attuale {#current-progress}

I portafogli di contratti intelligenti sono già disponibili, ma sono necessari maggiori aggiornamenti per renderli il più decentralizzati e privi di permessi possibile. EIP-4337 è una proposta matura che non richiede alcuna modifica al protocollo di Ethereum, quindi è possibile che sarà implementata rapidamente. Tuttavia, gli aggiornamenti che alterano il protocollo di Ethereum non sono correntemente in sviluppo attivo, quindi potrebbe essere necessario più tempo per distribuire queste modifiche. Inoltre, è possibile che l'astrazione del conto sia raggiunta in modo soddisfacente da EIP-4337 e non sarà necessaria alcuna modifica al protocollo.

## Letture consigliate {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Discussione di gruppo sull'astrazione del conto dal Devcon Bogota](https://www.youtube.com/watch?app=desktop&v=WsZBymiyT-8)
- ["Perché l'astrazione del conto è una svolta per le dapp" da Devcon Bogota](https://www.youtube.com/watch?v=OwppworJGzs)
- ["Astrazione del conto ELI5" da Devcon Bogota](https://www.youtube.com/watch?v=QuYZWJj65AY)
- [Note di "Strada all'Astrazione del Conto" di Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Post del blog di Vitalik sui portafogli di recupero sociale](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Note sull'EIP-2938](https://hackmd.io/@SamWilsn/ryhxoGp4D#What-is-EIP-2938)
- [Documentazione sull'EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Note sull'EIP-4337](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a)
- [Documentazione sull'EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentazione sull'EIP-2771](https://eips.ethereum.org/EIPS/eip-2771)
- ["Basi dell'Astrazione del Conto": Cos'è l'Astrazione del Conto Parte I](https://www.alchemy.com/blog/account-abstraction)
