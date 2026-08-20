---
title: Staking delegato (staking come servizio)
description: Una panoramica su come iniziare con lo staking delegato
lang: it
template: staking
image: /images/staking/leslie-saas.png
sidebarDepth: 2
summaryPoints:
  - Operatori di nodi di terze parti gestiscono il funzionamento del tuo client del validatore
  - Un'ottima opzione per chiunque abbia 32 ETH e non voglia affrontare la complessità tecnica della gestione di un nodo
  - La delega copre uno spettro che va dai servizi in cui mantieni le tue chiavi di prelievo agli exchange completamente custodial
---

## Cos'è lo staking delegato? {#what-is-staking-as-a-service}

Lo staking delegato rappresenta una categoria di servizi di staking in cui depositi i tuoi 32 ETH per un validatore, ma deleghi le operazioni del nodo a un operatore di terze parti. Il processo di solito prevede di essere guidati attraverso la configurazione iniziale, inclusa la generazione delle chiavi e il deposito, per poi caricare le tue chiavi di firma all'operatore. Tu fornisci gli ETH, ma affidi il funzionamento dell'hardware del validatore a qualcun altro.

Il protocollo [Ethereum](/) non supporta nativamente la delega dello stake, quindi è stata creata una serie di servizi per soddisfare questa domanda. Questa categoria è meglio conosciuta come **staking come servizio (SaaS)**, ma copre uno spettro di accordi che differiscono sulla questione chiave di quanto controllo mantieni sui tuoi ETH messi in staking:

- **Staking come servizio non-custodial**: mantieni le tue chiavi di prelievo e deleghi solo il funzionamento del validatore.
- **Staking completamente custodial**: il fornitore, di solito un exchange, detiene sia le chiavi che i fondi.

Rispetto al [solo staking](/staking/solo/), ogni forma di delega pone un middleware tra te e il protocollo Ethereum. Quel middleware è software e infrastruttura gestiti dall'azienda di qualcun altro. Ogni passo verso la comodità aggiunge un'assunzione di fiducia, quindi prima di scegliere un servizio, valuta dove si colloca in questo spettro.

### Cosa non è lo staking delegato {#what-delegated-staking-is-not}

- **Staking in pool e token di liquid staking (LST)**: con le pool combini qualsiasi importo di ETH con altri staker, ricevendo di solito un token che rappresenta la tua quota dello stake della pool. Non stai delegando il tuo validatore; i contratti intelligenti della pool e gli operatori dei nodi controllano i validatori. [Maggiori informazioni sullo staking in pool](/staking/pools/)
- **Funzionamento del nodo vincolato (bonded)**: alcuni protocolli di staking ti consentono di eseguire un validatore sul tuo hardware con meno di 32 ETH depositando una cauzione. Questo è il funzionamento del nodo, l'opposto della delega, ed è trattato insieme al [solo staking](/staking/solo/).

## Perché delegare il tuo staking? {#why-stake-with-a-service}

Se hai 32 ETH da mettere in staking, ma non ti senti a tuo agio nel gestire l'hardware, i servizi di staking delegato ti consentono di delegare l'aspetto tecnico mentre guadagni le ricompense dei blocchi native di Ethereum.

<Grid>
  <Card title="Your own validator" icon={<MonitorCheck />} description="Deposita i tuoi 32 ETH per attivare il tuo set di chiavi di firma che parteciperanno al consenso di Ethereum. Monitora i tuoi progressi con le dashboard per guardare accumularsi quelle ricompense in ETH." />
  <Card title="Easy to start" icon={<Flag />} description="Dimentica le specifiche hardware, la configurazione, la manutenzione del nodo e gli aggiornamenti. I fornitori ti consentono di esternalizzare la parte difficile caricando le tue credenziali di firma, permettendo loro di eseguire un validatore per tuo conto, a un piccolo costo." />
  <Card title="Limit your risk" icon={<ShieldHalf />} description="Con i servizi non-custodial mantieni il controllo delle chiavi che consentono di prelevare o trasferire i fondi messi in staking. Queste sono diverse dalle chiavi di firma e possono essere archiviate separatamente per limitare (ma non eliminare) il tuo rischio come staker." />
</Grid>

## Confronto delle opzioni di staking {#comparison-of-staking-options}

<StakingComparison page="saas" />

## Lo spettro della delega {#the-delegation-spectrum}

I fornitori differiscono in base a quali chiavi detengono per te, e ogni chiave che detengono è qualcosa per cui devi fidarti di loro.

### Staking come servizio non-custodial {#non-custodial-staking-as-a-service}

Con il SaaS non-custodial, in genere vieni guidato attraverso la generazione delle chiavi del tuo validatore e l'effettuazione del tuo deposito di 32 ETH, quindi carichi le _chiavi di firma_ all'operatore. Le chiavi di firma consentono all'operatore di svolgere i compiti del validatore (attestare e proporre blocchi) per tuo conto. Un loro uso improprio può far penalizzare o subire lo slashing al tuo validatore, ma non possono essere utilizzate per prelevare, trasferire o spendere i tuoi fondi.

Le _credenziali di prelievo_ del validatore rimangono puntate a un indirizzo che controlli. Le ricompense e i fondi in uscita possono andare solo lì (vedi la sezione sul modello di fiducia di seguito).

### Servizi custodial e staking sugli exchange {#custodial-services-and-exchange-staking}

All'estremità completamente delegata dello spettro si trova lo staking custodial, offerto più comunemente dagli exchange centralizzati. Non gestisci mai le chiavi; detieni semplicemente ETH nel tuo account sulla piattaforma e scegli di partecipare allo staking. Questa è l'esperienza utente più semplice possibile ed è un'opzione legittima per le persone che tengono già fondi su un exchange e accettano il rischio custodial.

Richiede anche la massima fiducia. Il fornitore controlla sia le chiavi di firma che le credenziali di prelievo; ciò che detieni è un saldo sulla loro piattaforma, non un validatore. Ciò significa che:

- I tuoi ETH messi in staking sono esposti alla solvibilità, alla sicurezza e alla situazione normativa del fornitore, e i prelievi sono soggetti ai loro termini e tempi di elaborazione, non solo alle regole del protocollo Ethereum.
- Non hai alcun modo indipendente per uscire dal validatore o recuperare i fondi se il fornitore fallisce o congela i prelievi.
- Grandi quantità di ETH messi in staking sotto una manciata di operatori di exchange contribuiscono alla centralizzazione dello stake, e le scelte dei client di questi operatori influenzano la salute della rete. Fare staking in un modo che mantenga più controllo nelle tue mani, o scegliere fornitori che eseguono in modo dimostrabile client di minoranza, fa di più per la resilienza di Ethereum.

## Modello di fiducia: cosa valutare {#trust-model-what-to-evaluate}

Lo staking delegato significa sempre affidare a qualcun altro parte della tua configurazione di staking. Rispondi a queste domande prima di consegnare qualsiasi cosa:

- **Chi detiene le chiavi di prelievo?** Le credenziali di prelievo di un validatore (tipo 0x01 o 0x02) puntano a un indirizzo del livello di esecuzione che in ultima analisi controlla lo stake. Se quell'indirizzo è tuo, l'accordo è non-custodial; l'operatore può eseguire (o gestire male) il validatore, ma gli ETH potranno sempre e solo essere prelevati da te. Se le credenziali puntano all'indirizzo del fornitore, detieni una promessa, non uno stake.
- **Puoi uscire senza l'operatore?** Dall'aggiornamento [Pectra](/roadmap/pectra/), i [prelievi attivati dal livello di esecuzione (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) consentono all'indirizzo di prelievo di attivare l'uscita di un validatore (o, per i validatori 0x02 con capitalizzazione, un prelievo parziale del saldo superiore a 32 ETH) direttamente dal livello di esecuzione, senza le chiavi di firma. Richiede una transazione e costa gas, ma significa che un operatore non reattivo o defunto non può più tenere in ostaggio il tuo validatore, a condizione che le credenziali di prelievo siano tue.
- **Qual è la struttura delle commissioni?** I servizi addebitano una tariffa mensile fissa o una percentuale delle ricompense. Controlla come le commissioni interagiscono con i tempi di inattività e le penalizzazioni: chi sostiene il costo se l'operatore ha prestazioni inferiori e se vengono offerte garanzie o assicurazioni.
- **Quali client esegue l'operatore?** Un operatore che esegue [client di esecuzione o client di consenso](/developers/docs/nodes-and-clients/client-diversity/) di maggioranza espone sia il tuo stake che la rete a guasti correlati se quel client ha un bug. Preferisci i fornitori che documentano l'utilizzo di client di minoranza.
- **Il servizio è aperto e verificato?** I fornitori potrebbero eseguire software aggiuntivo attorno ai client Ethereum standard che non è open source o verificabile. Cerca audit pubblici, una storia operativa consolidata e un record pulito in termini di slashing.
- **Cosa succede se il fornitore scompare?** Un fornitore responsabile documenta il suo processo di offboarding, fornendo istruzioni chiare su come uscire dal tuo validatore, recuperare le tue chiavi o attivare tu stesso un'uscita. Se la risposta dipende interamente dal fatto che il fornitore rimanga in attività, si tratta di un accordo custodial.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
**Alcuni fornitori possono eseguire il tuo validatore utilizzando la tecnologia dei validatori distribuiti (DVT)**, dividendo la chiave di firma su più nodi in modo che nessuna singola macchina o operatore sia un punto di guasto. [Maggiori informazioni sulla tecnologia dei validatori distribuiti (DVT)](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Cosa considerare {#what-to-consider}

C'è un numero crescente di fornitori per aiutarti a delegare il funzionamento del tuo validatore, ma tutti hanno i propri vantaggi e rischi. Tutte le opzioni delegate richiedono assunzioni di fiducia aggiuntive rispetto al solo staking. Le opzioni delegate potrebbero avere codice aggiuntivo che avvolge i client Ethereum che non è aperto o verificabile. La delega ha anche un effetto dannoso sulla decentralizzazione della rete. A seconda della configurazione, potresti non controllare il tuo validatore e l'operatore potrebbe agire in modo disonesto utilizzando i tuoi ETH.

Gli indicatori degli attributi sono utilizzati di seguito per segnalare notevoli punti di forza o di debolezza che un fornitore elencato potrebbe avere. Usa questa sezione come riferimento per come definiamo questi attributi mentre scegli un servizio di staking.

<StakingConsiderations page="saas" />

## Esplora i fornitori di servizi di staking {#saas-providers}

Di seguito sono riportati alcuni fornitori di staking come servizio disponibili. Usa gli indicatori sopra per aiutarti a orientarti tra questi servizi.

<ProductDisclaimer />

### Fornitori SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Tieni presente l'importanza di supportare la [diversità dei client](/developers/docs/nodes-and-clients/client-diversity/) poiché migliora la sicurezza della rete e limita il tuo rischio. I servizi che hanno prove di limitare l'uso di client di maggioranza sono indicati con <em style={{ textTransform: "uppercase" }}>"diversità dei client di esecuzione"</em> e <em style={{ textTransform: "uppercase" }}>"diversità dei client di consenso".</em>

### Generatori di chiavi {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Hai un suggerimento per un fornitore di staking come servizio che ci è sfuggito? Dai un'occhiata alla nostra [politica di inserimento dei prodotti](/contributing/adding-staking-products/) per vedere se sarebbe adatto e per inviarlo per la revisione.

<StakingCommunityCallout className="my-16" />

## Domande frequenti {#faq}

<ExpandableCard title="Chi detiene le mie chiavi?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Gli accordi differiscono da fornitore a fornitore. Con i servizi non-custodial, verrai guidato attraverso la generazione delle chiavi di firma per il tuo validatore (ogni validatore detiene 32 ETH, o fino a 2048 ETH con credenziali di capitalizzazione (0x02) dall'aggiornamento Pectra), e il loro caricamento al tuo fornitore per consentirgli di validare per tuo conto. Le sole chiavi di firma non danno alcuna capacità di prelevare, trasferire o spendere i tuoi fondi. Tuttavia, forniscono la capacità di esprimere voti per il consenso, che se non fatto correttamente può comportare penalizzazioni per inattività o slashing.

Con i servizi custodial, come lo staking tramite un exchange centralizzato, il fornitore detiene tutte le chiavi: le chiavi di firma e le credenziali di prelievo. In tal caso stai affidando al fornitore i fondi stessi, non solo il funzionamento del validatore.
</ExpandableCard>

<ExpandableCard title="Quindi ci sono due set di chiavi?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Sì. Ogni validatore ha chiavi di _firma_ e _credenziali di prelievo_ separate. Affinché un validatore possa attestare lo stato della catena, partecipare ai comitati di sincronizzazione e proporre blocchi, le chiavi di firma devono essere facilmente accessibili da un client del validatore. Queste devono essere connesse a Internet in qualche forma e sono quindi intrinsecamente considerate chiavi "hot" (calde). Le chiavi che controllano i fondi prelevati sono tenute separate per motivi di sicurezza.

Le credenziali di prelievo designano l'indirizzo del livello di esecuzione a cui vanno le ricompense di staking e i fondi in uscita. I moderni strumenti di deposito ti consentono di impostare questo indirizzo al momento del deposito, come credenziale regolare (0x01) o di capitalizzazione (0x02), e dovrebbe essere un indirizzo che controlli, idealmente protetto in cold storage. Questo protegge i tuoi fondi anche se qualcun altro controlla le chiavi di firma del tuo validatore e, dall'aggiornamento Pectra, ti consente anche di uscire dal validatore direttamente da quell'indirizzo.

I validatori configurati nei primi giorni della rete senza un indirizzo di prelievo di esecuzione utilizzano chiavi di prelievo BLS legacy e devono firmare un messaggio una tantum che dichiara un indirizzo di prelievo prima che i prelievi possano iniziare. Ciò comporta la rigenerazione delle chiavi di prelievo dalla frase seme mnemonica creata durante la configurazione.

**Assicurati di eseguire il backup di questa frase seme in modo sicuro o non sarai in grado di generare le tue chiavi di prelievo quando sarà il momento.**

Verifica con il tuo fornitore per il supporto su come preparare il tuo validatore.
</ExpandableCard>

<ExpandableCard title="Quando posso prelevare?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Il funzionamento dei prelievi dipende dal tipo di credenziale di prelievo del tuo validatore. Per i validatori regolari (0x01), qualsiasi saldo superiore a 32 ETH viene automaticamente trasferito all'indirizzo di prelievo su base periodica ogni pochi giorni. Per i validatori con capitalizzazione (0x02), le ricompense si capitalizzano nel saldo del validatore fino a 2048 ETH, e prelevare al di sotto di tale soglia richiede l'attivazione di un prelievo parziale dal tuo indirizzo di prelievo, il che costa gas.

I validatori possono anche uscire completamente, il che sblocca l'intero saldo ETH rimanente. Dopo aver completato il processo di uscita, l'intero saldo viene trasferito all'indirizzo di prelievo durante un successivo sweep del validatore.

<ButtonLink href="/staking/withdrawals/">Maggiori informazioni sui prelievi di staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Cosa succede se il mio provider scompare o non fa uscire il mio validatore?" eventCategory="SaasStaking" eventName="clicked what if my provider disappears">
Se le tue credenziali di prelievo puntano a un indirizzo che controlli, puoi uscire dal validatore tu stesso e recuperare il tuo stake; vedi [Modello di fiducia: cosa valutare](#trust-model-what-to-evaluate).

Se il fornitore detiene le credenziali di prelievo (come con lo staking custodial e sugli exchange), non c'è modo a livello di protocollo per te di recuperare i fondi in modo indipendente; il tuo ricorso è limitato ai processi del fornitore stesso.
</ExpandableCard>

<ExpandableCard title="Cosa succede se subisco uno slashing?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Utilizzando un fornitore di staking delegato, stai affidando il funzionamento del tuo nodo a qualcun altro. Questo comporta il rischio di scarse prestazioni del nodo, che non è sotto il tuo controllo. Nel caso in cui il tuo validatore subisca lo slashing, viene applicata una penalizzazione iniziale proporzionale al saldo del tuo validatore (resa significativamente più piccola nell'aggiornamento Pectra), e il tuo validatore viene forzatamente fatto uscire dal set dei validatori.

Al completamento del processo di slashing/uscita, i fondi rimanenti vengono trasferiti all'indirizzo di prelievo assegnato al validatore.

Contatta i singoli fornitori per maggiori dettagli su eventuali garanzie o opzioni assicurative. Se preferisci avere il pieno controllo della configurazione del tuo validatore, [scopri di più su come fare solo staking dei tuoi ETH](/staking/solo/).
</ExpandableCard>

## Letture di approfondimento {#further-reading}

- [Cos'è lo Staking-as-a-Service?](https://figment.io/insights/what-is-staking-as-a-service/) - _Figment_
- [La directory dello staking di Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [Valutare i servizi di staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
- [EIP-7002: Prelievi attivabili dal livello di esecuzione](https://eips.ethereum.org/EIPS/eip-7002) - _la specifica per far uscire un validatore dal suo indirizzo di prelievo_