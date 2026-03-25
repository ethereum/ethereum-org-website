---
title: Aggiungere prodotti o servizi di staking
description: La politica che utilizziamo quando aggiungiamo prodotti o servizi di staking su ethereum.org
lang: it
---

# Aggiungere prodotti o servizi di staking {#adding-staking-products-or-services}

Vogliamo assicurarci di elencare le migliori risorse possibili mantenendo gli utenti al sicuro e fiduciosi.

Chiunque è libero di suggerire l'aggiunta di un prodotto o servizio di staking su ethereum.org. Se ce n'è uno che ci è sfuggito, **[suggeriscilo](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

Attualmente elenchiamo prodotti e servizi di staking nelle seguenti pagine:

- [Staking in solitaria](/staking/solo/)
- [Staking come servizio](/staking/saas/)
- [Pool di staking](/staking/pools/)

La prova di stake sulla beacon chain è attiva dal 1° dicembre 2020. Sebbene lo staking sia ancora relativamente nuovo, abbiamo cercato di creare un quadro equo e trasparente per la valutazione su ethereum.org, ma i criteri di inserimento cambieranno e si evolveranno nel tempo e sono, in ultima analisi, a discrezione del team del sito web di ethereum.org.

## Il quadro decisionale {#the-decision-framework}

La decisione di elencare un prodotto su ethereum.org non dipende da un singolo fattore. Vengono considerati insieme molteplici criteri quando si decide di elencare un prodotto o servizio. Più di questi criteri vengono soddisfatti, più è probabile che venga elencato.

**Innanzitutto, di quale categoria di prodotto o servizio si tratta?**

- Strumenti per nodi o client
- Gestione delle chiavi
- Staking come servizio (SaaS)
- Pool di staking

Attualmente, elenchiamo solo prodotti o servizi in queste categorie.

### Criteri di inclusione {#criteria-for-inclusion}

Le proposte di prodotti o servizi di staking saranno valutate in base ai seguenti criteri:

**Quando è stato lanciato il progetto o servizio?**

- Ci sono prove di quando il prodotto o servizio è diventato disponibile al pubblico?
- Questo viene utilizzato per determinare il punteggio "testato sul campo" (battle tested) del prodotto.

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

#### Software e contratti intelligenti {#software-and-smart-contracts}

Per qualsiasi software personalizzato o contratto intelligente coinvolto:

**È tutto open source?**

- I progetti open source dovrebbero avere un repository del codice sorgente disponibile pubblicamente
- Questo viene utilizzato per determinare il punteggio "open source" del prodotto.

**Il prodotto è fuori dalla fase di sviluppo _beta_?**

- A che punto è il prodotto nel suo ciclo di sviluppo?
- I prodotti in fase beta non sono presi in considerazione per l'inclusione su ethereum.org

**Il software è stato sottoposto a un audit di sicurezza esterno?**

- In caso contrario, ci sono piani per condurre un audit esterno?
- Questo viene utilizzato per determinare il punteggio "audited" (revisionato) del prodotto.

**Il progetto ha un programma di bug bounty?**

- In caso contrario, ci sono piani per creare un bug bounty per la sicurezza?
- Questo viene utilizzato per determinare il punteggio "bug bounty" del prodotto.

#### Strumenti per nodi o client {#node-or-client-tooling}

Per i prodotti software relativi alla configurazione, gestione o migrazione di nodi o client:

**Quali client di livello di consenso (es. Lighthouse, Teku, Nimbus, Prysm, Grandine) sono supportati?**

- Quali client sono supportati? L'utente può scegliere?
- Questo viene utilizzato per determinare il punteggio "multi-client" del prodotto.

#### Staking come servizio {#staking-as-a-service}

Per gli [elenchi di staking come servizio](/staking/saas/) (es. operazione di nodi delegata):

**Quali sono le commissioni associate all'utilizzo del servizio?**

- Qual è la struttura delle commissioni, ad esempio, c'è una commissione mensile per il servizio?
- Ci sono requisiti di staking aggiuntivi?

**Agli utenti è richiesto di registrarsi per un account?**

- Qualcuno può utilizzare il servizio senza permessi o KYC?
- Questo viene utilizzato per determinare il punteggio "senza permessi" (permissionless) del prodotto.

**Chi detiene le chiavi di firma e le chiavi di prelievo?**

- A quali chiavi l'utente mantiene l'accesso? A quali chiavi il servizio ottiene l'accesso?
- Questo viene utilizzato per determinare il punteggio "trustless" del prodotto.

**Qual è la diversità dei client dei nodi gestiti?**

- Quale percentuale di chiavi del validatore è gestita da un client di livello di consenso (CL) di maggioranza?
- All'ultimo aggiornamento, Prysm è il client di livello di consenso eseguito dalla maggioranza degli operatori di nodi, il che è pericoloso per la rete. Se un qualsiasi client CL è attualmente utilizzato da oltre il 33% della rete, richiediamo dati relativi al suo utilizzo.
- Questo viene utilizzato per determinare il punteggio "client diversi" del prodotto.

#### Pool di staking {#staking-pool}

Per i [servizi di pool di staking](/staking/pools/):

**Qual è l'ETH minimo richiesto per lo stake?**

- es. 0,01 ETH

**Quali sono le commissioni o i requisiti di staking previsti?**

- Quale percentuale delle ricompense viene trattenuta come commissione?
- Ci sono requisiti di staking aggiuntivi?

**C'è un token di liquidità?**

- Quali sono i token coinvolti? Come funzionano? Quali sono gli indirizzi del contratto?
- Questo viene utilizzato per determinare il punteggio "token di liquidità" del prodotto.

**Gli utenti possono partecipare come operatori di nodi?**

- Cosa è richiesto per eseguire i client del validatore utilizzando i fondi del pool?
- Questo richiede il permesso di un individuo, un'azienda o una DAO?
- Questo viene utilizzato per determinare il punteggio "nodi senza permessi" del prodotto.

**Qual è la diversità dei client degli operatori di nodi del pool?**

- Quale percentuale di operatori di nodi esegue un client di livello di consenso (CL) di maggioranza?
- All'ultimo aggiornamento, Prysm è il client di livello di consenso eseguito dalla maggioranza degli operatori di nodi, il che è pericoloso per la rete. Se un qualsiasi client CL è attualmente utilizzato da oltre il 33% della rete, richiediamo dati relativi al suo utilizzo.
- Questo viene utilizzato per determinare il punteggio "client diversi" del prodotto.

### Altri criteri: i requisiti opzionali {#other-criteria}

**Quali interfacce utente sono supportate?**

- es. App per browser, app desktop, app mobile, CLI

**Per gli strumenti dei nodi, il software fornisce un modo semplice per passare da un client all'altro?**

- L'utente può cambiare client in modo facile e sicuro utilizzando lo strumento?

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