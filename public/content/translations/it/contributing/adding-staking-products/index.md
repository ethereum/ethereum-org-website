---
title: Aggiungere prodotti o servizi di staking
description: La politica che utilizziamo per l'aggiunta di prodotti o servizi di staking su ethereum.org
lang: it
---

Vogliamo assicurarci di elencare le migliori risorse possibili mantenendo gli utenti al sicuro e fiduciosi.

Chiunque è libero di suggerire l'aggiunta di un prodotto o servizio di staking su ethereum.org. Se ce n'è uno che ci è sfuggito, **[suggeriscilo](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Attualmente elenchiamo prodotti e servizi di staking nelle seguenti pagine:

- [Solo staking](/staking/solo/)
- [Staking come servizio](/staking/saas/)
- [Pool di staking](/staking/pools/)

La Proof-of-Stake (PoS) sulla Beacon Chain è attiva dal 1° dicembre 2020. Sebbene lo staking sia ancora relativamente nuovo, abbiamo cercato di creare un quadro equo e trasparente per la valutazione su ethereum.org, ma i criteri di inserimento cambieranno ed evolveranno nel tempo e sono, in ultima analisi, a discrezione del team del sito web di ethereum.org.

## Il quadro decisionale {#the-decision-framework}

La decisione di elencare un prodotto su ethereum.org non dipende da un singolo fattore. Vengono considerati insieme molteplici criteri quando si decide di elencare un prodotto o servizio. Più criteri vengono soddisfatti, maggiore è la probabilità che venga elencato.

**Innanzitutto, a quale categoria di prodotto o servizio appartiene?**

- Strumenti per nodi o client
- Gestione delle chiavi
- Staking come servizio (SaaS)
- Pool di staking

Attualmente, elenchiamo solo prodotti o servizi in queste categorie.

### Criteri di inclusione {#criteria-for-inclusion}

Le proposte di prodotti o servizi di staking saranno valutate in base ai seguenti criteri:

**Quando è stato lanciato il progetto o servizio?**

- Ci sono prove di quando il prodotto o servizio è diventato disponibile al pubblico?
- Questo viene utilizzato per determinare il punteggio "battle tested" (testato sul campo) del prodotto.

**Il progetto è mantenuto attivamente?**

- C'è un team attivo che sviluppa il progetto? Chi è coinvolto?
- Saranno presi in considerazione solo i prodotti mantenuti attivamente.

**Il prodotto o servizio è privo di intermediari umani/di fiducia?**

- Quali passaggi nel percorso dell'utente richiedono di fidarsi di esseri umani per detenere le chiavi dei propri fondi o per distribuire correttamente le ricompense?
- Questo viene utilizzato per determinare il punteggio "trustless" del prodotto o servizio.

**Il progetto fornisce informazioni accurate e affidabili?**

- È fondamentale che il sito web del prodotto presenti informazioni aggiornate, accurate e non fuorvianti, in particolare se riguardano il protocollo Ethereum o altre tecnologie correlate.
- Le proposte contenenti disinformazione, dettagli obsoleti o dichiarazioni potenzialmente fuorvianti su Ethereum o altri argomenti rilevanti non saranno elencate o verranno rimosse se già presenti.

**Quali piattaforme sono supportate?**

- es. Linux, macOS, Windows, iOS, Android

#### Software e smart contract {#software-and-smart-contracts}

Per qualsiasi software personalizzato o smart contract coinvolto:

**È tutto open source?**

- I progetti open source dovrebbero avere un repository di codice sorgente disponibile pubblicamente
- Questo viene utilizzato per determinare il punteggio "open source" del prodotto.

**Il prodotto è fuori dalla fase di sviluppo _beta_?**

- A che punto è il prodotto nel suo ciclo di sviluppo?
- I prodotti in fase beta non sono presi in considerazione per l'inclusione su ethereum.org

**Il software è stato sottoposto a un audit di sicurezza esterno?**

- In caso contrario, ci sono piani per condurre un audit esterno?
- Questo viene utilizzato per determinare il punteggio "audited" (sottoposto ad audit) del prodotto.

**Il progetto ha un programma di bug bounty?**

- In caso contrario, ci sono piani per creare un bug bounty di sicurezza?
- Questo viene utilizzato per determinare il punteggio "bug bounty" del prodotto.

#### Strumenti per nodi o client {#node-or-client-tooling}

Per i prodotti software relativi alla configurazione, gestione o migrazione di nodi o client:

**Quali client del livello di consenso (es. Lighthouse, Teku, Nimbus, Prysm, Grandine) sono supportati?**

- Quali client sono supportati? L'utente può scegliere?
- Questo viene utilizzato per determinare il punteggio "multi-client" del prodotto.

#### Staking come servizio {#staking-as-a-service}

Per gli [elenchi di staking come servizio](/staking/saas/) (es. operazione delegata del nodo):

**Quali sono le commissioni associate all'utilizzo del servizio?**

- Qual è la struttura delle commissioni, ad esempio, c'è una tariffa mensile per il servizio?
- Ci sono requisiti aggiuntivi per lo staking?

**Agli utenti è richiesto di registrarsi per un account?**

- Qualcuno può utilizzare il servizio senza autorizzazione o KYC?
- Questo viene utilizzato per determinare il punteggio "permissionless" del prodotto.

**Chi detiene le chiavi di firma e le chiavi di prelievo?**

- A quali chiavi l'utente mantiene l'accesso? A quali chiavi il servizio ottiene l'accesso?
- Questo viene utilizzato per determinare il punteggio "trustless" del prodotto.

**Qual è la diversità dei client dei nodi gestiti?**

- Quale percentuale di chiavi del validatore è eseguita da un client del livello di consenso (CL) di maggioranza?
- All'ultimo aggiornamento, Prysm è il client del livello di consenso eseguito dalla maggioranza degli operatori di nodi, il che è pericoloso per la rete. Se un qualsiasi client CL è attualmente utilizzato da oltre il 33% della rete, richiediamo dati relativi al suo utilizzo.
- Questo viene utilizzato per determinare il punteggio "diverse clients" (client diversificati) del prodotto.

#### Pool di staking {#staking-pool}

Per i [servizi di staking in pool](/staking/pools/):

**Qual è l'ETH minimo richiesto per mettere in staking?**

- es. 0,01 ETH

**Quali sono le commissioni o i requisiti di staking previsti?**

- Quale percentuale delle ricompense viene trattenuta come commissione?
- Ci sono requisiti aggiuntivi per lo staking?

**Esiste un token di liquidità?**

- Quali sono i token coinvolti? Come funzionano? Quali sono gli indirizzi del contratto?
- Questo viene utilizzato per determinare il punteggio "liquidity token" (token di liquidità) del prodotto.

**Gli utenti possono partecipare come operatori di nodo?**

- Cosa è richiesto per eseguire i client del validatore utilizzando i fondi in pool?
- Questo richiede l'autorizzazione da parte di un individuo, un'azienda o una DAO?
- Questo viene utilizzato per determinare il punteggio "permissionless nodes" (nodi permissionless) del prodotto.

**Qual è la diversità dei client degli operatori di nodo della pool?**

- Quale percentuale di operatori di nodo esegue un client del livello di consenso (CL) di maggioranza?
- All'ultimo aggiornamento, Prysm è il client del livello di consenso eseguito dalla maggioranza degli operatori di nodi, il che è pericoloso per la rete. Se un qualsiasi client CL è attualmente utilizzato da oltre il 33% della rete, richiediamo dati relativi al suo utilizzo.
- Questo viene utilizzato per determinare il punteggio "diverse clients" (client diversificati) del prodotto.

### Altri criteri: i vantaggi aggiuntivi {#other-criteria}

**Quali interfacce utente sono supportate?**

- es. App per browser, app desktop, app mobile, CLI

**Per gli strumenti dei nodi, il software fornisce un modo semplice per passare da un client all'altro?**

- L'utente può cambiare client in modo semplice e sicuro utilizzando lo strumento?

**Per il SaaS, quanti validatori sono attualmente gestiti dal servizio?**

- Questo ci dà un'idea della portata del tuo servizio finora.

## Come mostriamo i risultati {#product-ordering}

I [criteri di inclusione](#criteria-for-inclusion) sopra indicati vengono utilizzati per calcolare un punteggio cumulativo per ogni prodotto o servizio. Questo viene utilizzato come mezzo per ordinare e mostrare i prodotti che soddisfano determinati criteri oggettivi. Più sono i criteri per i quali vengono fornite prove, più in alto verrà ordinato un prodotto, con i pareggi randomizzati al caricamento.

La logica del codice e i pesi per questi criteri sono attualmente contenuti in [questo componente JavaScript](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid/index.tsx#L350) nel nostro repository.

## Aggiungi il tuo prodotto o servizio {#add-product}

Se desideri aggiungere un prodotto o servizio di staking su ethereum.org, crea una issue su GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Crea una issue
</ButtonLink>