---
title: Migliorare l'esperienza utente
description: "Usare Ethereum è ancora troppo complesso per la maggior parte delle persone. Per incoraggiare l'adozione di massa, Ethereum deve abbassare drasticamente le sue barriere all'ingresso: gli utenti devono ottenere i vantaggi di un accesso decentralizzato, senza permessi e resistente alla censura a Ethereum, ma deve essere privo di attriti come l'uso di una tradizionale app web2."
lang: it
image: /images/roadmap/roadmap-ux.png
alt: "Piano d'azione di Ethereum"
template: roadmap
---

**L'uso di Ethereum deve essere semplificato**; dalla gestione delle [chiavi](/glossary/#key) e dei [portafogli](/glossary/#wallet) all'avvio delle transazioni. Per facilitare l'adozione di massa, Ethereum deve aumentare drasticamente la facilità d'uso, consentendo agli utenti di sperimentare un accesso a Ethereum senza permessi e resistente alla censura con l'esperienza priva di attriti dell'uso delle app [Web2](/glossary/#web2).

## Oltre le frasi di recupero {#no-more-seed-phrases}

Gli account di Ethereum sono protetti da una coppia di chiavi utilizzate per identificare gli account (chiave pubblica) e firmare i messaggi (chiave privata). Una chiave privata è come una password principale; consente l'accesso completo a un account Ethereum. Questo è un modo diverso di operare per le persone più abituate alle banche e alle app Web2 che gestiscono gli account per conto dell'utente. Affinché Ethereum raggiunga l'adozione di massa senza fare affidamento su terze parti centralizzate, deve esserci un modo semplice e privo di attriti per un utente di prendere in custodia le proprie risorse e mantenere il controllo dei propri dati senza dover comprendere la crittografia a chiave pubblica-privata e la gestione delle chiavi.

La soluzione a questo problema è l'utilizzo di portafogli di [contratti intelligenti](/glossary/#smart-contract) per interagire con Ethereum. I portafogli di contratti intelligenti creano modi per proteggere gli account in caso di smarrimento o furto delle chiavi, opportunità per un migliore rilevamento e difesa dalle frodi e consentono ai portafogli di ottenere nuove funzionalità. Sebbene i portafogli di contratti intelligenti esistano oggi, sono scomodi da costruire perché il protocollo di Ethereum deve supportarli meglio. Questo supporto aggiuntivo è noto come astrazione dell'account.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Maggiori informazioni sull'astrazione dell'account</ButtonLink>

## Nodi per tutti

Gli utenti che eseguono [nodi](/glossary/#node) non devono fidarsi di terze parti per farsi fornire i dati e possono interagire in modo rapido, privato e senza permessi con la [blockchain](/glossary/#blockchain) di Ethereum. Tuttavia, eseguire un nodo in questo momento richiede conoscenze tecniche e uno spazio su disco considerevole, il che significa che molte persone devono invece fidarsi degli intermediari.

Ci sono diversi aggiornamenti che renderanno l'esecuzione dei nodi molto più semplice e molto meno dispendiosa in termini di risorse. Il modo in cui i dati vengono archiviati verrà modificato per utilizzare una struttura più efficiente in termini di spazio nota come **Verkle Tree**. Inoltre, con l'[assenza di stato](/roadmap/statelessness) o la [scadenza dei dati](/roadmap/statelessness/#data-expiry), i nodi di Ethereum non avranno bisogno di archiviare una copia dell'intero stato dei dati di Ethereum, riducendo drasticamente i requisiti di spazio sul disco rigido. I [nodi leggeri](/developers/docs/nodes-and-clients/light-clients/) offriranno molti vantaggi dell'esecuzione di un nodo completo, ma potranno essere eseguiti facilmente sui telefoni cellulari o all'interno di semplici app per browser.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Leggi sugli alberi di Verkle</ButtonLink>

Con questi aggiornamenti, le barriere per l'esecuzione di un nodo si riducono di fatto a zero. Gli utenti beneficeranno di un accesso sicuro e senza permessi a Ethereum senza dover sacrificare spazio su disco o CPU sul proprio computer o telefono cellulare e non dovranno fare affidamento su terze parti per i dati o l'accesso alla rete quando utilizzano le app.

## Progressi attuali {#current-progress}

I portafogli di contratti intelligenti sono già disponibili, ma sono necessari ulteriori aggiornamenti per renderli il più decentralizzati e senza permessi possibile. L'EIP-4337 è una proposta matura che non richiede alcuna modifica al protocollo di Ethereum. Il principale contratto intelligente richiesto per l'EIP-4337 è stato **distribuito a marzo 2023**.

**La completa assenza di stato è ancora in fase di ricerca** ed è probabile che manchino diversi anni alla sua implementazione. Ci sono diverse pietre miliari sulla strada verso la completa assenza di stato, inclusa la scadenza dei dati, che potrebbero essere implementate prima. Altri elementi del piano d'azione, come gli [Alberi di Verkle](/roadmap/verkle-trees/) e la [Separazione tra proponente e costruttore](/roadmap/pbs/), devono essere completati prima.

Le reti di test degli alberi di Verkle sono già attive e funzionanti e la fase successiva consiste nell'eseguire client abilitati per gli alberi di Verkle su reti di test private e poi pubbliche. Puoi contribuire ad accelerare i progressi distribuendo contratti sulle reti di test o eseguendo client della rete di test.