---
title: Staking as a service
description: "Scopri di più sullo staking as a service"
lang: it
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Il rinoceronte Leslie che fluttua tra le nuvole.
sidebarDepth: 2
summaryPoints:
  - Operatori di nodi di terze parti gestiscono il funzionamento del tuo client del validatore
  - Ottima opzione per chiunque abbia 32 ETH e non si senta a proprio agio nell'affrontare la complessità tecnica della gestione di un nodo
  - Riduci la fiducia necessaria e mantieni la custodia delle tue chiavi di prelievo
---

## Cos'è lo staking as a service? {#what-is-staking-as-a-service}

Lo staking as a service ("SaaS") rappresenta una categoria di servizi di staking in cui depositi i tuoi 32 ETH per un validatore, ma deleghi le operazioni del nodo a un operatore di terze parti. Questo processo di solito prevede di essere guidati attraverso la configurazione iniziale, inclusa la generazione delle chiavi e il deposito, per poi caricare le tue chiavi di firma all'operatore. Ciò consente al servizio di gestire il tuo validatore per tuo conto, di solito in cambio di una tariffa mensile.

## Perché fare staking con un servizio? {#why-stake-with-a-service}

Il protocollo di [Ethereum](/) non supporta nativamente la delega dello stake, quindi questi servizi sono stati creati per soddisfare questa domanda. Se hai 32 ETH da mettere in staking, ma non ti senti a tuo agio nel gestire l'hardware, i servizi SaaS ti consentono di delegare la parte difficile mentre guadagni le ricompense dei blocchi native.

<Grid>
  <Card title="Il tuo validatore personale" emoji=":desktop_computer:" description="Deposita i tuoi 32 ETH per attivare il tuo set di chiavi di firma che parteciperanno al consenso di Ethereum. Monitora i tuoi progressi con le dashboard per vedere accumularsi quelle ricompense in ETH." />
  <Card title="Facile da iniziare" emoji="🏁" description="Dimentica le specifiche hardware, la configurazione, la manutenzione del nodo e gli aggiornamenti. I fornitori SaaS ti permettono di esternalizzare la parte difficile caricando le tue credenziali di firma, consentendo loro di eseguire un validatore per tuo conto, a un costo ridotto." />
  <Card title="Limita il tuo rischio" emoji=":shield:" description="In molti casi gli utenti non devono rinunciare all'accesso alle chiavi che consentono di prelevare o trasferire i fondi in staking. Queste sono diverse dalle chiavi di firma e possono essere conservate separatamente per limitare (ma non eliminare) il tuo rischio come staker." />
</Grid>

<StakingComparison page="saas" />

## Cosa considerare {#what-to-consider}

C'è un numero crescente di fornitori SaaS per aiutarti a mettere in staking i tuoi ETH, ma tutti hanno i propri vantaggi e rischi. Tutte le opzioni SaaS richiedono assunzioni di fiducia aggiuntive rispetto allo staking domestico. Le opzioni SaaS potrebbero avere codice aggiuntivo che avvolge i client di Ethereum che non è aperto o verificabile. Il SaaS ha anche un effetto dannoso sulla decentralizzazione della rete. A seconda della configurazione, potresti non controllare il tuo validatore: l'operatore potrebbe agire in modo disonesto utilizzando i tuoi ETH.

Gli indicatori degli attributi sono utilizzati di seguito per segnalare notevoli punti di forza o di debolezza che un fornitore SaaS elencato potrebbe avere. Usa questa sezione come riferimento per come definiamo questi attributi mentre scegli un servizio che ti aiuti nel tuo percorso di staking.

<StakingConsiderations page="saas" />

## Esplora i fornitori di servizi di staking {#saas-providers}

Di seguito sono riportati alcuni fornitori SaaS disponibili. Usa gli indicatori sopra per farti guidare attraverso questi servizi

<ProductDisclaimer />

### Fornitori SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Tieni presente l'importanza di supportare la [diversità dei client](/developers/docs/nodes-and-clients/client-diversity/) poiché migliora la sicurezza della rete e limita i tuoi rischi. I servizi che mostrano prove di limitare l'uso dei client di maggioranza sono indicati con <em style={{ textTransform: "uppercase" }}>"diversità dei client di esecuzione"</em> e <em style={{ textTransform: "uppercase" }}>"diversità dei client di consenso".</em>

### Generatori di chiavi {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Hai un suggerimento per un fornitore di staking as a service che ci è sfuggito? Dai un'occhiata alla nostra [politica di inserimento dei prodotti](/contributing/adding-staking-products/) per vedere se sarebbe adatto e per inviarlo per la revisione.

## Domande frequenti {#faq}

<ExpandableCard title="Chi detiene le mie chiavi?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Gli accordi differiranno da fornitore a fornitore, ma comunemente sarai guidato attraverso la configurazione di tutte le chiavi di firma di cui hai bisogno (una per ogni 32 ETH) e il loro caricamento sul tuo fornitore per consentirgli di convalidare per tuo conto. Le sole chiavi di firma non danno alcuna capacità di prelevare, trasferire o spendere i tuoi fondi. Tuttavia, forniscono la capacità di esprimere voti per il consenso, che se non fatto correttamente può comportare penalità per inattività o slashing.
</ExpandableCard>

<ExpandableCard title="Quindi ci sono due set di chiavi?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Sì. Ogni account è composto sia da chiavi di <em>firma</em> BLS, sia da chiavi di <em>prelievo</em> BLS. Affinché un validatore possa attestare lo stato della catena, partecipare ai comitati di sincronizzazione e proporre blocchi, le chiavi di firma devono essere prontamente accessibili da un client del validatore. Queste devono essere connesse a Internet in qualche forma e sono quindi intrinsecamente considerate chiavi "hot" (calde). Questo è un requisito affinché il tuo validatore sia in grado di attestare, e quindi le chiavi utilizzate per trasferire o prelevare fondi sono separate per motivi di sicurezza.

Le chiavi di prelievo BLS vengono utilizzate per firmare un messaggio una tantum che dichiara a quale account del livello di esecuzione dovrebbero andare le ricompense di staking e i fondi usciti. Una volta trasmesso questo messaggio, le chiavi di <em>prelievo BLS</em> non sono più necessarie. Invece, il controllo sui fondi prelevati viene delegato in modo permanente all'indirizzo che hai fornito. Ciò ti consente di impostare un indirizzo di prelievo protetto tramite il tuo cold storage, riducendo al minimo i rischi per i fondi del tuo validatore, anche se qualcun altro controlla le chiavi di firma del tuo validatore.

L'aggiornamento delle credenziali di prelievo è un passaggio richiesto per abilitare i prelievi\*. Questo processo prevede la generazione delle chiavi di prelievo utilizzando la tua frase seme mnemonica.

<strong>Assicurati di eseguire il backup di questa frase seme in modo sicuro o non sarai in grado di generare le tue chiavi di prelievo quando sarà il momento.</strong>

\*Gli staker che hanno fornito un indirizzo di prelievo con il deposito iniziale non hanno bisogno di impostarlo. Verifica con il tuo fornitore SaaS per ricevere supporto su come preparare il tuo validatore.
</ExpandableCard>

<ExpandableCard title="Quando posso prelevare?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Gli staker devono fornire un indirizzo di prelievo (se non fornito al momento del deposito iniziale) e i pagamenti delle ricompense inizieranno a essere distribuiti automaticamente su base periodica ogni pochi giorni.

I validatori possono anche uscire completamente come validatori, il che sbloccherà il loro saldo ETH rimanente per il prelievo. Gli account che hanno fornito un indirizzo di prelievo di esecuzione e completato il processo di uscita riceveranno l'intero saldo all'indirizzo di prelievo fornito durante la successiva scansione dei validatori.

<ButtonLink href="/staking/withdrawals/">Maggiori informazioni sui prelievi di staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Cosa succede se subisco lo slashing?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Utilizzando un fornitore SaaS, affidi il funzionamento del tuo nodo a qualcun altro. Questo comporta il rischio di scarse prestazioni del nodo, che non sono sotto il tuo controllo. Nel caso in cui il tuo validatore subisca lo slashing, il saldo del tuo validatore verrà penalizzato e rimosso forzatamente dal pool dei validatori.

Al completamento del processo di slashing/uscita, questi fondi verranno trasferiti all'indirizzo di prelievo assegnato al validatore. Ciò richiede di fornire un indirizzo di prelievo per l'abilitazione. Questo potrebbe essere stato fornito al momento del deposito iniziale. In caso contrario, le chiavi di prelievo del validatore dovranno essere utilizzate per firmare un messaggio che dichiara un indirizzo di prelievo. Se non è stato fornito alcun indirizzo di prelievo, i fondi rimarranno bloccati finché non verrà fornito.

Contatta il singolo fornitore SaaS per maggiori dettagli su eventuali garanzie o opzioni assicurative e per istruzioni su come fornire un indirizzo di prelievo. Se preferisci avere il pieno controllo della configurazione del tuo validatore, [scopri di più su come fare staking in solitaria dei tuoi ETH](/staking/solo/).
</ExpandableCard>

## Letture consigliate {#further-reading}

- [La directory dello staking di Ethereum](https://www.staking.directory/) - _Eridian e Spacesider_
- [Valutazione dei servizi di staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_