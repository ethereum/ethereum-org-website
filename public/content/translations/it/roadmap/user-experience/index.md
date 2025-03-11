---
title: Migliorare l'esperienza degli utenti
description: Per molti, è ancora troppo complesso utilizzare Ethereum. Per incoraggiare l'adozione di massa, Ethereum deve ridurre drasticamente le proprie barriere d'accesso; gli utenti devono ricevere i benefici dell'accesso decentralizzato, privo di permessi e resistente alla censura a Ethereum, ma dev'essere privo di frizione, tanto quanto utilizzare una tradizionale app del web2.
lang: it
image: /images/roadmap/roadmap-ux.png
alt: "Roadmap di Ethereum"
template: roadmap
---

**L'utilizzo di Ethereum dev'essere semplificato**; dalla gestione di [chiavi](/glossary/#key) e [portafogli](/glossary/#wallet) avvio di transazioni. Per facilitare l'adozione di massa, Ethereum deve aumentare drasticamente la facilità d'uso, consentendo agli utenti di sperimentare un accesso privo di permessi e resistente alla censura a Ethereum, con l'esperienza priva di attrito dell'utilizzo delle app [Web2](/glossary/#web2).

## Oltre le frasi di seed {#no-more-seed-phrases}

I conti di Ethereum sono protetti da una coppia di chiavi, utilizzate per identificare i conti (chiave pubblica) e firmare i messaggi (chiave privata). Una chiave privata è come una password principale; consente di completare l'accesso a un conto di Ethereum. Questo è un metodo di operazione differente per le persone che hanno più dimestichezza con le banche e le app Web2, che gestiscono i conti per conto di un utente. Perché Ethereum raggiunga l'adozione di massa senza affidarsi a terze parti centralizzate, deve esistere un metodo diretto e privo di attrito per un utente, per prendere custodia delle proprie risorse e mantenere il controllo dei propri dati senza dover comprendere la crittografia delle chiavi pubbliche e private e la gestione delle chiavi.

La soluzione è utilizzare portafogli di [contratti intelligenti](/glossary/#smart-contract) per interagire con Ethereum. I portafogli di contratti intelligenti creano modi per proteggere i conti se le chiavi sono perdute o rubate, opportunità per un migliore rilevamento e difesa dalle truffe e consentono ai portafogli di ottenere nuove funzionalità. Sebbene i portafogli di contratti intelligenti esistano oggi, sono imbarazzanti da creare perché il protocollo di Ethereum necessita di supportarli meglio. Questo supporto aggiuntivo è noto come astrazione del conto.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Di più sull'astrazione del conto</ButtonLink>

## Nodi per tutti

Gli utenti che eseguono [nodi](/glossary/#node) non devono fidarsi di terze parti per fornire loro i dati, e possono interagire rapidamente, privatamente e senza permessi con la [blockchain](/glossary/#blockchain) di Ethereum. Tuttavia, al momento, operare un nodo richiede una conoscenza tecnica e sostanziale spazio su disco, a significare che molte persone devono invece fidarsi degli intermediari.

Esistono diversi aggiornamenti che semplificheranno l'esecuzione dei nodi, riducendo di molto il consumo di risorse. Il metodo di archiviazione dei dati sarà modificato per utilizzare una struttura molto più efficiente a livello di spazio, nota come **Albero di Verkle**. Inoltre, con l'[assenza di stato](/roadmap/statelessness) o la [scadenza dei dati](/roadmap/statelessness/#data-expiry), i nodi di Ethereum non dovranno memorizzare una copia degli interi dati di stato di Ethereum, riducendo drasticamente i requisiti di spazio su disco. I [nodi leggeri](/developers/docs/nodes-and-clients/light-clients/) offriranno molti benefici dell'operare un nodo completo, ma potranno facilmente operare su smartphone o in semplici app per browser.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Leggi di più sugli alberi di Verkle</ButtonLink>

Con questi aggiornamenti, le barriere all'esecuzione di un nodo sono ridotte effettivamente a zero. Gli utenti beneficeranno di un accesso sicuro e privo di permessi a Ethereum, senza dover sacrificare notevole spazio su disco o CPU sul proprio computer o il proprio dispositivo mobile e non dovranno affidarsi a terze parti per l'accesso a dati o alla rete, utilizzando le app.

## Stato attuale {#current-progress}

I portafogli di contratti intelligenti sono già disponibili, ma sono necessari maggiori aggiornamenti per renderli il più decentralizzati e privi di permessi possibile. L'EIP-4337 è una proposta matura che non richiede alcuna modifica al protocollo di Ethereum. Il contratto intelligente principale necessario per l'EIP-4337 è stato **distribuito a marzo 2023**.

**L'assenza di stato completa è ancora in fase di ricerca** e potrebbe richiedere svariati anni per essere implementata. Esistono diverse pietre miliari sul percorso alla completa assenza di stato, inclusa la scadenza dei dati, che potrebbe essere implementata prima. Devono prima essere completati altri punti della tabella di marcia, come gli [Alberi di Verkle](/roadmap/verkle-trees/) e la [Separazione tra propositori e costruttori](/roadmap/pbs/).

Le reti di prova degli alberi di Verkle sono già in esecuzione e la prossima fase, consiste nell'operare client che consentano gli alberi di Verkle su reti pubbliche dapprima private, quindi pubbliche. Puoi aiutare ad accelerare il progresso distribuendo contratti alle reti di prova od operando dei client delle reti di prova.
