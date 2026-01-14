---
title: PeerDAS
description: Informazioni su PeerDAS come parte dell'aggiornamento del protocollo Ethereum Fusaka
lang: it
---

# PeerDAS {#peer-das}

Il protocollo Ethereum sta subendo il suo più significativo aggiornamento di ridimensionamento dall'[introduzione delle transazioni blob con l'EIP-4844](/roadmap/danksharding/). Come parte dell'[aggiornamento Fusaka](/roadmap/fusaka/), PeerDAS introduce un nuovo modo di gestire i dati blob, offrendo un aumento di circa un ordine di grandezza nella capacità di **[disponibilità dei dati (DA)](/developers/docs/data-availability/)** per gli L2.

[Maggiori informazioni sulla tabella di marcia del ridimensionamento dei blob](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Scalabilità {#scalability}

La visione di Ethereum è quella di essere una piattaforma neutrale, sicura e decentralizzata disponibile per tutti nel mondo. Con l'aumento dell'utilizzo della rete, ciò richiede di bilanciare il trilemma di scalabilità, sicurezza e decentralizzazione della rete. Se Ethereum semplicemente aumentasse i dati gestiti dalla rete con il suo design attuale, correrebbe il rischio di sovraccaricare i [nodi su cui Ethereum si basa per la sua decentralizzazione](/developers/docs/nodes-and-clients/). La scalabilità richiede una progettazione rigorosa dei meccanismi che minimizzi i compromessi.

Una delle strategie per raggiungere questo obiettivo è consentire un ecosistema diversificato di soluzioni di ridimensionamento di livello 2 invece di elaborare tutte le transazioni sulla Rete Principale di [livello 1 (L1)](/glossary/#layer-1). I [Livelli 2 (L2)](/glossary/#layer-2) o i [rollup](/glossary#rollups) elaborano le transazioni sulle proprie chain separate e utilizzano Ethereum per la verifica e la sicurezza. La pubblicazione dei soli commitment critici per la sicurezza e la compressione dei payload consente agli L2 di utilizzare la capacità di DA di Ethereum in modo più efficiente. A sua volta, l'L1 trasporta meno dati senza compromettere le garanzie di sicurezza, mentre gli L2 acquisiscono più utenti a costi del gas inferiori. Inizialmente, gli L2 pubblicavano i dati come `calldata` in transazioni ordinarie, che competevano con le transazioni L1 per il gas ed era poco pratico per la disponibilità di dati di massa.

## Proto-Danksharding {#proto-danksharding}

Il primo passo importante verso il ridimensionamento dell'L2 è stato l'aggiornamento Dencun, che ha introdotto il [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). Questo aggiornamento ha creato un nuovo tipo di dati specializzato per i rollup chiamato blob. I [blob](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), o oggetti binari di grandi dimensioni, sono frammenti effimeri di dati arbitrari che non necessitano dell'esecuzione dell'EVM e che i nodi archiviano solo per un periodo di tempo limitato. Questa elaborazione più efficiente ha permesso agli L2 di pubblicare più dati su Ethereum e di scalare ulteriormente.

Nonostante i notevoli vantaggi per il ridimensionamento, l'utilizzo dei blob è solo una parte dell'obiettivo finale. Nel protocollo attuale, ogni nodo della rete deve ancora scaricare ogni blob. Il collo di bottiglia diventa la larghezza di banda richiesta dai singoli nodi, con la quantità di dati da scaricare che aumenta direttamente con l'aumento del numero di blob.

Ethereum non scende a compromessi sulla decentralizzazione e la larghezza di banda è uno dei parametri più sensibili. Anche con potenti risorse di calcolo ampiamente disponibili per chiunque possa permettersele, le [limitazioni della larghezza di banda in upload](https://www.speedtest.net/global-index) anche in città altamente urbanizzate di nazioni sviluppate (come [Germania](https://www.speedtest.net/global-index/germany), [Belgio](https://www.speedtest.net/global-index/belgium), [Australia](https://www.speedtest.net/global-index/australia) o [Stati Uniti](https://www.speedtest.net/global-index/united-states)) potrebbero limitare i nodi a poter essere eseguiti solo da data center se i requisiti di larghezza di banda non sono attentamente calibrati.

Gli operatori dei nodi hanno requisiti di larghezza di banda e spazio su disco sempre più elevati man mano che i blob aumentano. La dimensione e la quantità dei blob sono limitate da questi vincoli. Ogni blob può trasportare fino a 128 kb di dati con una media di 6 blob per blocco. Questo è stato solo il primo passo verso un design futuro che utilizza i blob in un modo ancora più efficiente.

## Campionamento della disponibilità dei dati (DAS) {#das}

La [disponibilità dei dati](/developers/docs/data-availability/) è la garanzia che tutti i dati necessari per convalidare in modo indipendente la chain siano accessibili a tutti i partecipanti alla rete. Garantisce che i dati siano stati completamente pubblicati e possano essere utilizzati per verificare in modo trustless il nuovo stato della chain o le transazioni in entrata.

I blob di Ethereum forniscono una forte garanzia di disponibilità dei dati che garantisce la sicurezza degli L2. Per fare questo, i nodi di Ethereum devono scaricare e archiviare i blob nella loro interezza. Ma cosa succederebbe se potessimo distribuire i blob nella rete in modo più efficiente ed evitare questa limitazione?

Un approccio differente per archiviare i dati e garantirne la disponibilità è il **campionamento della disponibilità dei dati (DAS)**. Invece di fare in modo che ogni computer che esegue Ethereum archivi completamente ogni singolo blob, il DAS introduce una divisione decentralizzata del lavoro. Spezza l'onere dell'elaborazione dei dati distribuendo compiti più piccoli e gestibili attraverso l'intera rete di nodi. I blob vengono divisi in parti e ogni nodo scarica solo alcune parti utilizzando un meccanismo di distribuzione casuale uniforme tra tutti i nodi.

Questo introduce un nuovo problema: dimostrare la disponibilità e l'integrità dei dati. Come può la rete garantire che i dati siano disponibili e che siano tutti corretti quando i singoli nodi detengono solo piccole parti? Un nodo malevolo potrebbe servire dati falsi e infrangere facilmente le forti garanzie di disponibilità dei dati! È qui che la crittografia viene in aiuto.

Per garantire l'integrità dei dati, l'EIP-4844 è stato già implementato con i commitment KZG. Queste sono prove crittografiche create quando un nuovo blob viene aggiunto alla rete. Una piccola prova è inclusa in ogni blocco, e i nodi possono verificare che i blob ricevuti corrispondano al commitment KZG del blocco.

Il DAS è un meccanismo che si basa su questo e garantisce che i dati siano sia corretti che disponibili. Il campionamento è un processo in cui un nodo interroga solo una piccola parte dei dati e la verifica rispetto al commitment. KZG è uno schema di commitment polinomiale, il che significa che qualsiasi singolo punto sulla curva polinomiale può essere verificato. Controllando solo un paio di punti sul polinomio, il client che esegue il campionamento può avere una forte garanzia probabilistica che i dati siano disponibili.

## PeerDAS {#peer-das}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) è una proposta specifica che implementa il meccanismo DAS in Ethereum, segnando probabilmente il più grande aggiornamento da La Fusione. PeerDAS è progettato per estendere i dati dei blob, dividendoli in colonne e distribuendo un sottoinsieme ai nodi.

Per raggiungere questo obiettivo, Ethereum prende in prestito alcuni concetti matematici intelligenti: applica la codifica a cancellazione (erasure coding) in stile Reed-Solomon ai dati dei blob. I dati dei blob sono rappresentati come un polinomio i cui coefficienti codificano i dati, quindi quel polinomio viene valutato in punti aggiuntivi per creare un blob esteso, raddoppiando il numero di valutazioni. Questa ridondanza aggiunta consente il recupero da cancellazione: anche se mancano alcune valutazioni, il blob originale può essere ricostruito purché sia disponibile almeno la metà dei dati totali, comprese le parti estese.

![Polinomio esteso](./polynomial.png)

In realtà, questo polinomio ha migliaia di coefficienti. I commit KZG sono valori di pochi byte, qualcosa di simile a un hash, noto a tutti i nodi. Ogni nodo che detiene un numero sufficiente di punti dati può [ricostruire in modo efficiente un set completo di dati dei blob](https://arxiv.org/abs/2207.11079).

> Curiosità: la stessa tecnica di codifica era utilizzata dai DVD. Se si graffiava un DVD, il lettore era ancora in grado di leggerlo grazie alla codifica Reed-Solomon che aggiunge le parti mancanti del polinomio.

Storicamente, i dati nelle blockchain, che si tratti di blocchi o blob, venivano trasmessi a tutti i nodi. Con l'approccio di suddivisione e campionamento di PeerDAS, la trasmissione di tutto a tutti non è più necessaria. Dopo Fusaka, il networking del livello di consenso è organizzato in argomenti/subnet di gossip: le colonne di blob sono assegnate a subnet specifiche, e ogni nodo si iscrive a sottoinsiemi predeterminati e custodisce solo quelle parti.

Con PeerDAS, i dati dei blob estesi vengono divisi in 128 parti chiamate colonne. I dati vengono distribuiti a questi nodi tramite un protocollo di gossip dedicato su subnet specifiche a cui si iscrivono. Ogni nodo regolare sulla rete partecipa ad almeno 8 subnet di colonna scelte casualmente. Ricevere dati da sole 8 delle 128 subnet significa che questo nodo predefinito riceve solo 1/16 di tutti i dati, ma poiché i dati sono stati estesi, questo corrisponde a 1/8 dei dati originali.

Ciò consente un nuovo limite di ridimensionamento teorico di 8 volte rispetto all'attuale schema "tutti scaricano tutto". Con i nodi che si iscrivono a diverse subnet casuali che servono le colonne di blob, la probabilità che siano distribuiti uniformemente è molto alta e quindi ogni parte di dati esiste da qualche parte nella rete. I nodi che eseguono validatori sono tenuti a iscriversi a più subnet per ogni validatore che gestiscono.

> Ogni nodo ha un ID univoco generato casualmente, che normalmente funge da sua identità pubblica per le connessioni. In PeerDAS, questo numero viene utilizzato per determinare il set casuale di subnet a cui deve iscriversi, risultando in una distribuzione casuale uniforme di tutti i dati dei blob.

Una volta che un nodo ricostruisce con successo i dati originali, ridistribuisce le colonne recuperate nella rete, riparando attivamente eventuali lacune nei dati e migliorando la resilienza complessiva del sistema. I nodi connessi a validatori con un saldo combinato ≥4096 ETH devono essere un supernodo e quindi devono iscriversi a tutte le subnet di colonna di dati e custodire tutte le colonne. Questi supernodi ripareranno continuamente le lacune nei dati. La natura probabilisticamente autoriparante del protocollo consente forti garanzie di disponibilità senza limitare gli operatori domestici che detengono solo porzioni dei dati.

![Nodi che si iscrivono alle colonne distribuite tramite subnet](./subnets.png)

La disponibilità dei dati può essere confermata da qualsiasi nodo che detiene solo un piccolo sottoinsieme dei dati dei blob grazie al meccanismo di campionamento descritto sopra. Questa disponibilità è imposta: i validatori devono seguire nuove regole di scelta della biforcazione (fork-choice), il che significa che accetteranno e voteranno per i blocchi solo dopo aver verificato la disponibilità dei dati.

L'impatto diretto sugli utenti (in particolare gli utenti L2) sono le commissioni più basse. Con 8 volte più spazio per i dati dei rollup, le operazioni degli utenti sulla loro chain diventano ancora più economiche con il tempo. Ma le commissioni più basse dopo Fusaka richiederanno tempo e dipenderanno dai BPO.

## Biforcazioni solo per i parametri dei blob (BPO) {#bpo}

La rete sarà teoricamente in grado di elaborare 8 volte più blob, ma gli aumenti dei blob sono un cambiamento che deve essere adeguatamente testato ed eseguito in modo sicuro e graduale. Le reti di prova forniscono abbastanza fiducia per distribuire le funzionalità sulla Rete Principale, ma dobbiamo garantire la stabilità della rete p2p prima di abilitare un numero significativamente più alto di blob.

Per aumentare gradualmente il numero target di blob per blocco senza sovraccaricare la rete, Fusaka introduce le biforcazioni **[solo per i parametri dei blob (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. A differenza delle biforcazioni regolari che necessitano di un'ampia coordinazione dell'ecosistema, di accordo e di aggiornamenti software, i [BPO (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) sono aggiornamenti pre-programmati che aumentano il numero massimo di blob nel tempo senza intervento.

Ciò significa che immediatamente dopo l'attivazione di Fusaka e l'entrata in funzione di PeerDAS, il numero di blob rimarrà invariato. Il numero di blob inizierà a raddoppiare ogni poche settimane fino a raggiungere un massimo di 48, mentre gli sviluppatori monitorano per garantire che il meccanismo funzioni come previsto e non abbia effetti negativi sui nodi che eseguono la rete.

## Direzioni future {#future-directions}

PeerDAS è solo un passo [verso una visione di ridimensionamento più ampia di FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), o Danksharding. Mentre PeerDAS utilizza la codifica a cancellazione 1D per ogni singolo blob, il Danksharding completo utilizzerà uno schema di codifica a cancellazione 2D più completo sull'intera matrice di dati dei blob. L'estensione dei dati in due dimensioni crea proprietà di ridondanza ancora più forti e una ricostruzione e verifica più efficienti. La realizzazione di FullDAS richiederà notevoli ottimizzazioni della rete e del protocollo, oltre a ulteriori ricerche.

## Letture consigliate {#further-reading}

- [PeerDAS: Campionamento della disponibilità dei dati peer di Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Una documentazione del PeerDAS di Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Dimostrazione della sicurezza di PeerDAS senza l'AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik su PeerDAS, il suo impatto e i test di Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)