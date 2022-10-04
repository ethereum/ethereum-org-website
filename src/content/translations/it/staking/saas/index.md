---
title: Staking come servizio
description: Una panoramica di come iniziare con lo staking in pool di ETH
lang: it
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-saas.png
alt: Leslie il rinoceronte che fluttua tra le nuvole.
sidebarDepth: 2
summaryPoints:
  - Gli operatori di nodi di terze parti gestiscono l'operazione del tuo client del validatore
  - Ottima opzione per chiunque abbia 32 ETH e non si senta a proprio agio nell'affrontare la complessità tecnica dell'esecuzione di un nodo
  - Riduce la fiducia e mantiene la custodia delle tue chiavi di prelievo
---

## Cos'è lo staking come un servizio? {#what-is-staking-as-a-service}

Lo staking come un servizio ("SaaS") rappresenta una categoria di servizi di staking in cui depositi i tuoi 32 ETH per un validatore, ma deleghi le operazioni del nodo a un operatore di terze parti. Solitamente questo processo coinvolge la guida alla configurazione iniziale, inclusa la generazione della chiave e il deposito e il successivo caricamento delle tue chiavi di firma all'operatore. Questo consente al servizio di operare il tuo validatore per tuo conto, solitamente per una commissione mensile.

## Perché mettere in staking con un servizio? {#why-stake-with-a-service}

Il protocollo di Ethereum non supporta nativamente la delegazione dello staking, quindi questi servizi sono stati creati per soddisfare questa domanda. Se hai 32 ETH da mettere in staking, ma non hai dimestichezza con l'hardware, i servizi di SaaS ti consentono di delegare la parte hardware e ottenere le ricompense del blocco nativo.

<CardGrid>
  <Card title="Il tuo validatore" emoji=":desktop_computer:">
    Deposita i tuoi 32 ETH per attivare la tua serie di chiavi di firma che parteciperanno al consenso di Ethereum. Monitora i tuoi progressi con i dashboard per veder accumulare queste ricompense di ETH.
  </Card>
  <Card title="Facile iniziare" emoji="🏁">
    Dimentica le specifiche hardware, la configurazione, la manutenzione del nodo e gli aggiornamenti.
    I fornitori di SaaS ti consentono di esternalizzare la parte hardware caricando le tue credenziali di firma, consentendo loro di eseguire un validatore per conto tuo, per un piccolo costo.
  </Card>
  <Card title="Limita i tuoi rischi" emoji=":shield:">
    In molti casi, gli utenti non rinunciano all'accesso alle chiavi che consentono il prelievo o il trasferimento dei fondi in staking. Queste sono differenti dalle chiavi di firma e sono memorizzabili separatamente per limitare (ma non eliminare) il tuo rischio, in qualità di staker.
  </Card>
</CardGrid>

<StakingComparison page="saas" />

## Cosa considerare {#what-to-consider}

Esiste un numero crescente di fornitori di staking come servizio per aiutarti a mettere in staking i tuoi ETH, ma ognuno presenta diversi rischi e benefici.

Gli indicatori d'attributo sono usati di seguito per segnalare notevoli punti di forza o debolezze che un fornitore di SaaS elencato potrebbe avere. Usa questa sezione come un riferimento per come definiamo questi attributi mentre stai scegliendo un servizio per aiutarti con il tuo percorso di staking.

<StakingConsiderations page="saas" />

## Esplora i fornitori del servizio di staking {#saas-providers}

Di seguito alcuni fornitori di SaaS disponibili. Usa i suddetti indicatori per orientarti tra questi servizi

<InfoBanner emoji="⚠️" isWarning>
Ricorda l'importanza di supportare la <a href="/developers/docs/nodes-and-clients/client-diversity/">diversità del client</a> poiché migliora la sicurezza della rete e limita i tuoi rischi. I servizi per i quali è dimostrato che limitino l'uso del client di maggioranza sono contrassegnati come <em style="text-transform: uppercase;">"client diversi."</em>
</InfoBanner>

#### Fornitori di SaaS

<StakingProductsCardGrid category="saas" />

#### Generatori di chiavi

<StakingProductsCardGrid category="keyGen" />

Hai un suggerimento per un fornitore di staking come servizio che abbiamo dimenticato? Dai un'occhiata alla nostra [politica di elenco dei prodotti](/contributing/adding-staking-products/) per vedere se sarebbe adatto e sottoporcelo.

## Domande frequenti {#faq}

<ExpandableCard title="Chi detiene le mie chiavi?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
  Le disposizioni differiranno da fornitore a fornitore, ma in genere, sarai guidato alla configurazione di qualsiasi chiave di firma necessaria (una per 32 ETH) e al loro caricamento al tuo fornitore per consentirgli di validare per conto tuo. Le sole chiavi di firma non danno alcuna possibilità di prelevare, trasferire o spendere i tuoi fondi. Tuttavia, forniscono la possibilità di trasmettere voti a favore di un consenso, il che, se non fatto propriamente, può risultare in sanzioni offline o tagli.
</ExpandableCard>

<ExpandableCard title="Quindi esistono due serie di chiavi?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Sì. Ogni profilo è composto sia da chiavi di <em>firma</em> che da chiavi di <em>prelievo</em>. Perché un validatore possa attestare lo stato della catena, partecipare a comitati di sincronizzazione e proporre blocchi, le chiavi di firma devono essere prontamente accessibili presso un client del validatore. Queste devono esser connesse a Internet in qualche modo e sono dunque intrinsecamente considerate chiavi "calde". Questo è un requisito affinché il tuo validatore possa attestare e, dunque, le chiavi usate per trasferire o prelevare i fondi sono separate per motivi di sicurezza.

Tutte queste chiavi possono sempre essere rigenerate in un modo riproducibile, usando la tua frase di seed mnemonica di 24 parole. <em>Assicurati di mettere questo seed al sicuro o non potrai generare le tue chiavi di prelievo quando arriverà il momento</em>.
</ExpandableCard>

<ExpandableCard title="Quando posso prelevare?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
  Quando metti 32 ETH in stake con un fornitore di SaaS, quegli ETH sono ancora depositati al contratto di deposito di staking ufficiale. Come tali, gli staker SaaS sono attualmente limitati alle stesse restrizioni di prelievo degli staker in solo. Questo significa che mettere in staking i tuoi ETH è attualmente un deposito unidirezionale. Questo sarà il caso fino all'aggiornamento Shanghai che si pianifica seguirà la Fusione.
</ExpandableCard>

<ExpandableCard title="Cosa cambierà con la Fusione?" eventCategory="SaasStaking" eventName="clicked what will change with the Merge">
  Dopo la Fusione, gli staker in SaaS inizieranno a ricevere le commissioni/mance di transazione non bruciate. Verifica con il tuo fornitore per determinare come aggiornare le tue impostazioni per includere un indirizzo di Ethereum che usi e al quale saranno inviati questi fondi quando arriverà il momento.

La Fusione <em>non</em> consentirà di prelevare il tuo stake o le ricompense del protocollo; queste funzionalità sono pianificate per l'aggiornamento Shanghai, che seguirà la fusione di un periodo stimato a sei mesi fino a un anno.
</ExpandableCard>

<ExpandableCard title="Gli staker in SaaS devono fare qualcosa per La Fusione?">
Gli staker in SaaS <strong>non devono fare nulla per prepararsi alla Fusione</strong>.

Esistono alcune cose a cui gli operatori del nodo devono partecipare per questo aggiornamento. Verifica col tuo fornitore di staking per garantire che i loro sistemi siano pronti.

Scopri di più su [La Fusione](/upgrades/merge/)
</ExpandableCard>

<ExpandableCard title="Cosa succede se vengo tagliato?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Usando un fornitore di Saas, affidi l'operazione del tuo nodo a qualcun altro. Questo comporta il rischio delle scarse prestazioni del nodo, che non dipendono da te. Nell'evento in cui il tuo validatore sia tagliato, il saldo del tuo validatore sarà sanzionato e forzatamente rimosso dal pool dei validatori. Questi fondi saranno bloccati finché i prelievi non saranno abilitati a livello del protocollo.

Contatta il singolo fornitore di SaaS per ulteriori dettagli su qualsiasi garanzia od opzione d'assicurazione. Se preferisci avere il pieno controllo della configurazione del tuo validatore, <a href="/staking/solo/">scopri di più su come fare staking in solo dei tuoi ETH</a>.
</ExpandableCard>

## Approfondimenti {#further-reading}

- [Valutare i servizi di Staking](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
