---
title: PeerDAS
description: "Scopri di più su PeerDAS come parte dell'aggiornamento del protocollo Ethereum Fusaka"
lang: it
---

# PeerDAS {#peer-das}

Il protocollo [Ethereum](/) sta subendo il suo aggiornamento di scalabilità più significativo dall'[introduzione delle transazioni blob con l'EIP-4844](/roadmap/danksharding/). Come parte dell'[aggiornamento Fusaka](/roadmap/fusaka/), PeerDAS introduce un nuovo modo di gestire i dati dei blob, offrendo un aumento di circa un ordine di grandezza nella capacità di **[disponibilità dei dati (DA)](/developers/docs/data-availability/)** per i L2.

[Maggiori informazioni sul piano d'azione per la scalabilità dei blob](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Scalabilità {#scalability}

La visione di Ethereum è quella di essere una piattaforma neutrale, sicura e decentralizzata disponibile per chiunque nel mondo. Con la crescita dell'utilizzo della rete, ciò richiede di bilanciare il trilemma di scalabilità, sicurezza e decentralizzazione della rete. Se Ethereum aumentasse semplicemente i dati gestiti dalla rete all'interno del suo design attuale, correrebbe il rischio di sovraccaricare i [nodi su cui Ethereum fa affidamento per la sua decentralizzazione](/developers/docs/nodes-and-clients/). La scalabilità richiede una progettazione rigorosa dei meccanismi che riduca al minimo i compromessi.

Una delle strategie per raggiungere questo obiettivo è consentire un ecosistema diversificato di soluzioni di scalabilità di livello 2 piuttosto che elaborare tutte le transazioni sulla rete principale di [livello 1 (L1)](/glossary/#layer-1). I [livelli 2 (L2)](/glossary/#layer-2) o [rollup](/glossary#rollups) elaborano le transazioni sulle proprie catene separate e utilizzano Ethereum per la verifica e la sicurezza. Pubblicare solo gli impegni critici per la sicurezza e comprimere i payload consente ai L2 di utilizzare la capacità di disponibilità dei dati di Ethereum in modo più efficiente. A sua volta, il L1 trasporta meno dati senza compromettere le garanzie di sicurezza, mentre i L2 accolgono più utenti a costi del gas inferiori. Inizialmente, i L2 pubblicavano i dati come `calldata` in transazioni ordinarie, che competevano con le transazioni del L1 per il gas ed era poco pratico per la disponibilità dei dati in blocco.

## Proto-Danksharding {#proto-danksharding}

Il primo passo importante verso la scalabilità dei L2 è stato l'aggiornamento Dencun, che ha introdotto il [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). Questo aggiornamento ha creato un nuovo tipo di dati specializzato per i rollup chiamato blob. I [blob](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), o binary large objects, sono porzioni effimere di dati arbitrari che non necessitano dell'esecuzione della EVM e che i nodi archiviano solo per un periodo di tempo limitato. Questa elaborazione più efficiente ha consentito ai L2 di pubblicare più dati su Ethereum e di scalare ulteriormente. 

Nonostante abbia già forti vantaggi per la scalabilità, l'utilizzo dei blob è solo una parte dell'obiettivo finale. Nel protocollo attuale, ogni nodo della rete deve ancora scaricare ogni blob. Il collo di bottiglia diventa la larghezza di banda richiesta ai singoli nodi, con la quantità di dati che deve essere scaricata che aumenta direttamente con un numero maggiore di blob. 

Ethereum non scende a compromessi sulla decentralizzazione e la larghezza di banda è una delle manopole più sensibili. Anche con una potente capacità di calcolo ampiamente disponibile per chiunque possa permettersela, le [limitazioni della larghezza di banda in upload](https://www.speedtest.net/global-index) persino in città altamente urbane di nazioni sviluppate (come [Germania](https://www.speedtest.net/global-index/germany), [Belgio](https://www.speedtest.net/global-index/belgium), [Australia](https://www.speedtest.net/global-index/australia) o [Stati Uniti](https://www.speedtest.net/global-index/united-states)) potrebbero limitare i nodi a poter essere eseguiti solo dai data center se i requisiti di larghezza di banda non sono attentamente calibrati.

Gli operatori dei nodi hanno requisiti di larghezza di banda e spazio su disco sempre più elevati all'aumentare dei blob. Le dimensioni e la quantità dei blob sono limitate da questi vincoli. Ogni blob può trasportare fino a 128 kb di dati con una media di 6 blob per blocco. Questo è stato solo il primo passo verso un design futuro che utilizza i blob in un modo ancora più efficiente.

## Campionamento della disponibilità dei dati {#das}

La [disponibilità dei dati](/developers/docs/data-availability/) è la garanzia che tutti i dati necessari per convalidare in modo indipendente la catena siano accessibili a tutti i partecipanti della rete. Garantisce che i dati siano stati completamente pubblicati e possano essere utilizzati per verificare senza fiducia il nuovo stato della catena o le transazioni in entrata. 

I blob di Ethereum forniscono una forte garanzia di disponibilità dei dati che assicura la sicurezza dei L2. Per fare ciò, i nodi di Ethereum devono scaricare e archiviare i blob nella loro interezza. Ma cosa succederebbe se potessimo distribuire i blob nella rete in modo più efficiente ed evitare questa limitazione? 

Un approccio diverso per archiviare i dati e garantirne la disponibilità è il **campionamento della disponibilità dei dati (DAS)**. Invece che ogni computer che esegue Ethereum archivi completamente ogni singolo blob, il DAS introduce una divisione del lavoro decentralizzata. Suddivide l'onere dell'elaborazione dei dati distribuendo compiti più piccoli e gestibili sull'intera rete di nodi. I blob vengono divisi in parti e ogni nodo scarica solo alcune parti utilizzando un meccanismo per la distribuzione casuale uniforme su tutti i nodi. 

Questo introduce un nuovo problema: dimostrare la disponibilità e l'integrità dei dati. Come può la rete garantire che i dati siano disponibili e che siano tutti corretti quando i singoli nodi detengono solo piccole parti? Un nodo malintenzionato potrebbe fornire dati falsi e infrangere facilmente le forti garanzie di disponibilità dei dati! È qui che la crittografia viene in aiuto. 

Per garantire l'integrità dei dati, l'EIP-4844 è stato già implementato con gli impegni KZG. Queste sono prove crittografiche create quando un nuovo blob viene aggiunto alla rete. Una piccola prova è inclusa in ogni blocco e i nodi possono verificare che i blob ricevuti corrispondano all'impegno KZG del blocco.

Il DAS è un meccanismo che si basa su questo e garantisce che i dati siano sia corretti che disponibili. Il campionamento è un processo in cui un nodo interroga solo una piccola parte dei dati e la verifica rispetto all'impegno. KZG è uno schema di impegno polinomiale, il che significa che qualsiasi singolo punto sulla curva polinomiale può essere verificato. Controllando solo un paio di punti sul polinomio, il client che esegue il campionamento può avere una forte garanzia probabilistica che i dati siano disponibili. 

## PeerDAS {#peer-das}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) è una proposta specifica che implementa il meccanismo DAS in Ethereum, segnando probabilmente il più grande aggiornamento da The Merge. PeerDAS è progettato per estendere i dati dei blob, dividendoli in colonne e distribuendone un sottoinsieme ai nodi.

Ethereum prende in prestito un po' di matematica intelligente per ottenere questo risultato: applica la codifica di cancellazione in stile Reed-Solomon ai dati dei blob. I dati dei blob sono rappresentati come un polinomio i cui coefficienti codificano i dati, quindi valutano quel polinomio in punti aggiuntivi per creare un blob esteso, raddoppiando il numero di valutazioni. Questa ridondanza aggiunta consente il recupero della cancellazione: anche se mancano alcune valutazioni, il blob originale può essere ricostruito purché sia disponibile almeno la metà dei dati totali, comprese le parti estese.

![Polinomio esteso](./polynomial.png)

In realtà, questo polinomio ha migliaia di coefficienti. Gli impegni KZG sono valori di pochi byte, qualcosa di simile a un hash, noti a tutti i nodi. Ogni nodo che detiene abbastanza punti dati può [ricostruire in modo efficiente un set completo di dati dei blob](https://arxiv.org/abs/2207.11079). 

> Curiosità: la stessa tecnica di codifica veniva utilizzata dai DVD. Se graffiavi un DVD, il lettore era ancora in grado di leggerlo grazie alla codifica Reed-Solomon che aggiunge le parti mancanti del polinomio. 

Storicamente, i dati nelle blockchain, che si tratti di blocchi o blob, venivano trasmessi a tutti i nodi. Con l'approccio di divisione e campionamento di PeerDAS, trasmettere tutto a tutti non è più necessario. Dopo Fusaka, la rete del livello di consenso è organizzata in argomenti/sottoreti di gossip: le colonne dei blob sono assegnate a sottoreti specifiche e ogni nodo si iscrive a sottoinsiemi predeterminati e custodisce solo quelle parti.

Con PeerDAS, i dati estesi dei blob sono divisi in 128 parti chiamate colonne. I dati vengono distribuiti a questi nodi tramite un protocollo di gossip dedicato su sottoreti specifiche a cui si iscrivono. Ogni nodo regolare sulla rete partecipa ad almeno 8 sottoreti di colonne scelte casualmente. Ricevere dati da solo 8 delle 128 sottoreti significa che questo nodo predefinito riceve solo 1/16 di tutti i dati, ma poiché i dati sono stati estesi, questo corrisponde a 1/8 dei dati originali. 

Ciò consente un nuovo limite teorico di scalabilità di 8 volte rispetto all'attuale schema "tutti scaricano tutto". Con i nodi che si iscrivono a diverse sottoreti casuali che servono le colonne dei blob, la probabilità è molto alta che siano distribuiti uniformemente e quindi ogni porzione di dati esista da qualche parte nella rete. I nodi che eseguono validatori sono tenuti a iscriversi a più sottoreti per ogni validatore che eseguono.

> Ogni nodo ha un ID univoco generato casualmente, che normalmente funge da identità pubblica per le connessioni. In PeerDAS, questo numero viene utilizzato per determinare le sottoreti di set casuali a cui deve iscriversi, risultando in una distribuzione casuale uniforme di tutti i dati dei blob.

Una volta che un nodo ricostruisce con successo i dati originali, ridistribuisce le colonne recuperate nella rete, sanando attivamente eventuali lacune nei dati e migliorando la resilienza complessiva del sistema. I nodi connessi a validatori con un saldo combinato ≥4096 ETH devono essere un supernodo e quindi devono iscriversi a tutte le sottoreti delle colonne di dati e custodire tutte le colonne. Questi supernodi saneranno continuamente le lacune nei dati. La natura probabilisticamente auto-riparante del protocollo consente forti garanzie di disponibilità pur non limitando gli operatori domestici che detengono solo porzioni dei dati. 

![Nodi che si iscrivono alle colonne distribuite tramite sottoreti](./subnets.png)

La disponibilità dei dati può essere confermata da qualsiasi nodo che detiene solo un piccolo sottoinsieme dei dati dei blob grazie al meccanismo di campionamento descritto sopra. Questa disponibilità è applicata: i validatori devono seguire nuove regole di scelta della biforcazione, il che significa che accetteranno e voteranno per i blocchi solo dopo aver verificato la disponibilità dei dati.

L'impatto diretto sugli utenti (in particolare gli utenti dei L2) è la riduzione delle commissioni. Con uno spazio 8 volte maggiore per i dati dei rollup, le operazioni degli utenti sulla loro catena diventano ancora più economiche nel tempo. Ma le commissioni più basse dopo Fusaka richiederanno tempo e dipenderanno dai BPO.

## Blob-Parameter-Only (BPO) {#bpo}

La rete sarà teoricamente in grado di elaborare 8 volte più blob, ma gli aumenti dei blob sono un cambiamento che deve essere adeguatamente testato ed eseguito in modo sicuro e graduale. Le reti di test forniscono sufficiente sicurezza per distribuire le funzionalità sulla rete principale, ma dobbiamo garantire la stabilità della rete p2p prima di abilitare un numero significativamente più alto di blob. 

Per aumentare gradualmente il numero target di blob per blocco senza sovraccaricare la rete, Fusaka introduce le biforcazioni **[Blob-Parameter-Only (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. A differenza delle normali biforcazioni che necessitano di un ampio coordinamento dell'ecosistema, accordi e aggiornamenti software, i [BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) sono aggiornamenti pre-programmati che aumentano il numero massimo di blob nel tempo senza alcun intervento.

Ciò significa che subito dopo l'attivazione di Fusaka e il lancio di PeerDAS, il numero di blob rimarrà invariato. Il numero di blob inizierà a raddoppiare ogni poche settimane fino a raggiungere un massimo di 48, mentre gli sviluppatori monitorano per garantire che il meccanismo funzioni come previsto e non abbia effetti negativi sui nodi che eseguono la rete.

## Direzioni future {#future-directions}

PeerDAS è solo un passo [verso una visione di scalabilità più ampia di FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), o Danksharding. Mentre PeerDAS utilizza la codifica di cancellazione 1D per ogni blob individualmente, il Danksharding completo utilizzerà uno schema di codifica di cancellazione 2D più completo sull'intera matrice dei dati dei blob. L'estensione dei dati in due dimensioni crea proprietà di ridondanza ancora più forti e una ricostruzione e verifica più efficienti. La realizzazione di FullDAS richiederà sostanziali ottimizzazioni della rete e del protocollo, insieme a ulteriori ricerche.

## Letture consigliate {#further-reading}

- [PeerDAS: Peer Data Availability sampling di Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Una documentazione del PeerDAS di Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Dimostrare la sicurezza di PeerDAS senza l'AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik su PeerDAS, il suo impatto e i test su Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)