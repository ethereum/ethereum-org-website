---
title: Canali di stato
description: Un'introduzione ai canali di stato e ai canali di pagamento come soluzione di scalabilità, attualmente utilizzata dalla comunità Ethereum.
lang: it
sidebarDepth: 3
---

I canali di stato consentono ai partecipanti di transare al di fuori della catena in sicurezza, mantenendo l'interazione con la Rete principale di Ethereum a un minimo. I pari del canale possono condurre un numero arbitrario di transazioni off-chain inviando solo due transazioni su catena per aprire e chiudere il canale. Questo consente un volume di transazioni estremamente elevato e risulta in costi minori per gli utenti.

##  {#how-do-sidechains-work}

Le blockchain pubbliche, come Ethereum, affrontano sfide di scalabilità dovute alla loro architettura distribuita: le transazioni on-chain devono essere eseguite da tutti i nodi. I nodi devono poter gestire il volume di transazioni in un blocco usando hardware modesto, imponendo un limite al volume di transazioni per mantenere decentralizzata la rete.

###  {#consensus-algorithms}

I canali sono semplici protocolli peer-to-peer che consentono a due parti di effettuare molte transazioni tra loro e poi di pubblicare solo i risultati finali nella blockchain. Il canale usa la crittografia per dimostrare che i dati sommari che generano sono davvero il risultato di una serie valida di transazioni intermedie. Un contratto intelligente ["multifirma"](/developers/docs/smart-contracts/#multisig) assicura che le transazioni siano firmate dalle parti corrette.

Con i canali, i cambiamenti di stato sono eseguiti e convalidati dalle parti interessate, riducendo al minimo il calcolo sul livello di esecuzione di Ethereum. Questo riduce la congestione su Ethereum e, inoltre, aumenta le velocità di elaborazione delle transazioni per gli utenti.

####  {#block-parameters}

Ogni canale è gestito da un [contratto intelligente multifirma](/developers/docs/smart-contracts/#multisig) eseguito su Ethereum. Per aprire un canale, i partecipanti distribuiscono il contratto del canale sulla catena e vi depositano i fondi.

Per chiudere il canale, i partecipanti inviano l'ultimo stato concordato del canale sulla catena. Dopodiché, il contratto intelligente distribuisce i fondi bloccati in base al saldo di ogni partecipante nello stato finale del canale.

I canali peer-to-peer sono particolarmente utili per situazioni in cui alcuni partecipanti predefiniti desiderano eseguire transazioni ad alta frequenza senza incorrere in sovraccarichi visibili. I canali della blockchain rientrano in due categorie: **canali di pagamento** e **canali di stato**.

###  {#evm-compatibility}

Un canale di pagamento è meglio descritto come un "registro bidirezionale" tenuto collettivamente da due utenti. Il saldo iniziale del registro è la somma dei depositi bloccati nel contratto on-chain durante la fase di apertura del canale.

Gli aggiornamenti al saldo del registro (cioè, lo stato del canale di pagamento) richiedono l'approvazione di tutte le parti nel canale. Un aggiornamento del canale firmato da tutti i partecipanti al canale è considerato finalizzato, analogamente a una transazione su Ethereum.

I canali di pagamento furono tra le primissime soluzioni di ridimensionamento progettate per minimizzare l'attività costosa sulla catena delle semplici interazioni tra utenti (es., trasferimenti di ETH, scambi atomici, micro-pagamenti). I partecipanti al canale possono condurre una quantità illimitata di transazioni istantanee e senza commissioni tra loro purché la somma netta dei loro trasferimenti non superi i token depositati.

Oltre a supportare i pagamenti off-chain, i canali di pagamento non si sono dimostrati utili per gestire la logica di transizione di stato generale. I canali di stato sono stati creati per risolvere questo problema e rendere i canali utili per ridimensionare il calcolo a scopo generale.

###  {#asset-movement}

I canali di stato hanno comunque molto in comune con i canali di pagamento. Ad esempio, gli utenti interagiscono scambiandosi messaggi firmati crittograficamente (transazioni), che devono esser firmati anche dagli altri partecipanti del canale. Se un aggiornamento di stato proposto non è firmato da tutti i partecipanti, non è considerato valido.
