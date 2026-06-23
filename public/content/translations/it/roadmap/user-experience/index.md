---
title: Migliorare l'esperienza utente
description: "Per la maggior parte delle persone è ancora troppo complesso usare Ethereum. Per incoraggiare l'adozione di massa, Ethereum deve abbassare drasticamente le sue barriere all'ingresso: gli utenti devono ottenere i vantaggi di un accesso decentralizzato, permissionless e resistente alla censura a Ethereum, ma deve essere privo di attriti come l'uso di un'app Web2 tradizionale."
lang: it
image: /images/roadmap/roadmap-ux.png
alt: "Roadmap di Ethereum"
template: roadmap
---

**L'uso di Ethereum deve essere semplificato**; dalla gestione delle [chiavi](/glossary/#key) e dei [wallet](/glossary/#wallet) all'avvio delle transazioni. Per facilitare l'adozione di massa, Ethereum deve aumentare drasticamente la facilità d'uso, consentendo agli utenti di sperimentare un accesso permissionless e resistente alla censura a Ethereum con l'esperienza priva di attriti dell'uso delle app [Web2](/glossary/#web2).

## Oltre le frasi seed {#no-more-seed-phrases}

Gli account di Ethereum sono protetti da una coppia di chiavi utilizzate per identificare gli account (chiave pubblica) e firmare i messaggi (chiave privata). Una chiave privata è come una password principale; consente l'accesso completo a un account Ethereum. Questo è un modo di operare diverso per le persone più abituate alle banche e alle app Web2 che gestiscono gli account per conto dell'utente. Affinché Ethereum raggiunga l'adozione di massa senza fare affidamento su terze parti centralizzate, deve esserci un modo semplice e privo di attriti per un utente di prendere in custodia i propri asset e mantenere il controllo dei propri dati senza dover comprendere la crittografia a chiave pubblica-privata e la gestione delle chiavi.

La soluzione a questo problema è l'utilizzo di wallet [smart contract](/glossary/#smart-contract) per interagire con Ethereum. I wallet smart contract creano modi per proteggere gli account in caso di smarrimento o furto delle chiavi, opportunità per un migliore rilevamento e difesa dalle frodi e consentono ai wallet di ottenere nuove funzionalità. Sebbene i wallet smart contract esistano già oggi, sono complessi da costruire perché il protocollo di Ethereum deve supportarli meglio. Questo supporto aggiuntivo è noto come astrazione dell'account.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Maggiori informazioni sull'astrazione dell'account</ButtonLink>

## Nodi per tutti {#nodes-for-everyone}

Gli utenti che eseguono [nodi](/glossary/#node) non devono fidarsi di terze parti per ottenere i dati e possono interagire in modo rapido, privato e permissionless con la [blockchain](/glossary/#blockchain) di Ethereum. Tuttavia, eseguire un nodo in questo momento richiede conoscenze tecniche e un notevole spazio su disco, il che significa che molte persone devono invece fidarsi degli intermediari.

Ci sono diversi aggiornamenti che renderanno l'esecuzione dei nodi molto più semplice e molto meno dispendiosa in termini di risorse. Il modo in cui i dati vengono archiviati verrà modificato per utilizzare una struttura più efficiente in termini di spazio nota come **albero di Verkle**. Inoltre, con l'[assenza di stato](/roadmap/statelessness) o la [scadenza dei dati](/roadmap/statelessness/#data-expiry), i nodi di Ethereum non avranno bisogno di archiviare una copia dell'intero stato dei dati di Ethereum, riducendo drasticamente i requisiti di spazio sul disco rigido. I [nodi leggeri](/developers/docs/nodes-and-clients/light-clients/) offriranno molti dei vantaggi dell'esecuzione di un nodo completo, ma potranno essere eseguiti facilmente sui telefoni cellulari o all'interno di semplici app per browser.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Leggi sugli alberi di Verkle</ButtonLink>

Con questi aggiornamenti, le barriere per l'esecuzione di un nodo si riducono di fatto a zero. Gli utenti beneficeranno di un accesso sicuro e permissionless a Ethereum senza dover sacrificare quantità notevoli di spazio su disco o CPU sul proprio computer o telefono cellulare, e non dovranno fare affidamento su terze parti per i dati o l'accesso alla rete quando utilizzano le app.

## Progressi attuali {#current-progress}

I wallet smart contract sono già disponibili, ma sono necessari ulteriori aggiornamenti per renderli il più decentralizzati e permissionless possibile. L'EIP-4337 è una proposta matura che non richiede alcuna modifica al protocollo di Ethereum. Il principale smart contract richiesto per l'EIP-4337 è stato **distribuito a marzo 2023**.

**La completa assenza di stato è ancora in fase di ricerca** e probabilmente mancano diversi anni alla sua implementazione. Ci sono diverse pietre miliari sulla strada verso la completa assenza di stato, inclusa la scadenza dei dati, che potrebbero essere implementate prima. Altri elementi della roadmap, come gli [alberi di Verkle](/roadmap/verkle-trees/) e la [separazione proponente-costruttore (PBS)](/roadmap/pbs/), devono essere completati prima.

Le testnet degli alberi di Verkle sono già attive e funzionanti, e la fase successiva è l'esecuzione di client abilitati per gli alberi di Verkle su testnet private e poi pubbliche. Puoi contribuire ad accelerare i progressi distribuendo contratti sulle testnet o eseguendo client di testnet.