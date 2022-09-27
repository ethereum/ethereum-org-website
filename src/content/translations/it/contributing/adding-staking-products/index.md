---
title: Aggiungere prodotti o servizi di staking
description: La politica che usiamo quando aggiungiamo prodotti o servizi di staking a ethereum.org
lang: it
---

# Aggiungere prodotti o servizi di staking {#adding-staking-products-or-services}

Vogliamo assicurarci di elencare le migliori risorse possibili, mantenendo gli utenti al sicuro.

Chiunque è libero di suggerire e aggiungere prodotti o servizi di staking su ethereum.org. Se ce ne siamo dimenticati uno, **[sei pregato di suggerirlo](https://github.com/ethereum/ethereum-org-website/issues/new?&template=suggest_staking_product.md)!**

Attualmente, elenchiamo i prodotti e i servizi di staking sulle seguenti pagine:

- [Staking in solo](/staking/solo/)
- [Staking come servizio](/staking/saas/)
- [Pool di staking](/staking/pools/)

Il proof-of-stake sulla Beacon Chain è attivo dal 1° dicembre 2020. Sebbene lo staking sia relativamente nuovo, abbiamo provato a creare un meccanismo equo e trasparente per la considerazione su ethereum.org, ma i criteri per l'inclusione nell'elenco cambieranno ed evolveranno col tempo e, in ultima analisi, saranno a discrezione del team del sito web di ethereum.org.

## Il meccanismo decisionale {#the-decision-framework}

La decisione di elencare un prodotto su ethereum.org non dipende da un unico fattore. Nel decidere se elencare un prodotto o servizio, vengono considerati diversi criteri. Più di questi criteri sono soddisfatti, più è probabile che la risorsa venga inclusa nell'elenco.

**Innanzitutto, di quale categoria di prodotto o di servizio si tratta?**

- Strumenti del nodo o del client
- Gestione delle chiavi
- Staking come servizio (SaaS)
- Pool di staking

Attualmente elenchiamo solo prodotti o servizi in queste categorie.

### Criteri per l'inclusione {#criteria-for-inclusion}

Le proposte di prodotti o servizi di staking saranno valutate secondo i seguenti criteri:

**Quando è stato lanciato il progetto o il servizio?**

- Vi sono prove di quando il prodotto o il servizio è diventato disponibile al pubblico?
- Questo serve a determinare il punteggio di "test di battaglia" dei prodotti.

**Il progetto viene mantenuto attivamente?**

- C'è un team attivo che sta sviluppando il progetto? Chi è coinvolto?
- Solo i prodotti mantenuti attivamente saranno considerati.

**Il prodotto o servizio è libero da intermediari fidati/umani?**

- Quali passaggi nel percorso degli utenti richiedono di affidarsi a esseri umani per detenere le chiavi dei loro fondi o distribuire adeguatamente le ricompense?
- Questo viene utilizzato per determinare il punteggio "senza fiducia" del prodotto o dei servizi.

**Quali piattaforme sono supportate?**

- ossia Linux, macOS, Windows, iOS, Android

#### Software e contratti intelligenti {#software-and-smart-contracts}

Per qualsiasi software personalizzato o contratto intelligente coinvolto:

**È tutto open source?**

- I progetti open source dovrebbero avere un repository di codice sorgente accessibile al pubblico
- Questo serve a determinare il punteggio "open source" dei prodotti.

**Lo sviluppo in _beta_ del prodotto è terminato?**

- Dove si trova il prodotto nel suo ciclo di sviluppo?
- I prodotti nella fase beta non sono presi in considerazione per l'inclusione su ethereum.org

**Il software è stato sottoposto a un controllo di sicurezza esterno?**

- In caso contrario, vi è in programma di realizzarne uno?
- Questo serve a determinare il punteggio "verificato" dei prodotti.

**Il progetto ha un programma di ricompense per la ricerca di bug?**

- Altrimenti, ci sono piani per creare un programma di ricompense per la ricerca dei bug di sicurezza?
- Questo serve a determinare il punteggio di "caccia ai bug" dei prodotti.

#### Strumenti del nodo o del client {#node-or-client-tooling}

Per i prodotti del software correlati alla configurazione del nodo o del client, alla gestione o alla migrazione:

**Quali client del livello del consenso (ad es. Lighthouse, Teku, Nimbus, Prysm) sono supportati?**

- Quali client sono supportati? L'utente può scegliere?
- Questo serve a determinare il punteggio "multi-client" dei prodotti.

#### Staking come servizio {#staking-as-a-service}

Per gli [elenchi di staking come servizio](/staking/saas/) (es. operazione del nodo delegata):

**Quali sono le commissioni associate all'uso del servizio?**

- Qual è la struttura tariffaria, ad esempio vi è un canone mensile per il servizio?
- Ulteriori requisiti per lo staking?

**Gli utenti sono tenuti a registrarsi per un account?**

- Qualcuno può usare il servizio senza permessi o KYC?
- Questo serve a determinare il punteggio "senza permessi" dei prodotti.

**Chi detiene le chiavi di firma e le chiavi di prelievo?**

- Su quali chiavi l'utente mantiene l'accesso? A quali chiavi il servizio ottiene accesso?
- Questo serve a determinare il punteggio "senza fiducia" dei prodotti.

**Qual è la diversità del client dei nodi operati?**

- Che percentuale di chiavi del validatore è eseguita da un client del livello del consenso di maggiornaza (CL)?
- A partire dall'ultima modifica, Prysm è il client di livello di consenso gestito da una maggioranza di operatori di nodi, il che è pericoloso per la rete. Se un client CL è usato attualmente da oltre il 33% della rete, richiediamo i dati correlati al suo utilizzo.
- Questo serve a determinare il punteggio dei "client diversi" dei prodotti.

#### Pool di staking {#staking-pool}

Per i [servizi di staking in pool](/staking/pools/):

**Qual è il livello minimo di ETH richiesto per la partecipazione?**

- es. 0,01 ETH

**Quali sono le commissioni o i requisiti di staking coinvolti?**

- Quale percentuale di ricompense viene rimossa come commissione?
- Ulteriori requisiti per lo staking?

**Esiste un token di liquidità?**

- Quali sono i token coinvolti? Come funzionano? Quali sono gli indirizzi del contratto?
- Questo serve a determinare il punteggio "token di liquidità" dei prodotti.

**Gli utenti possono partecipare come operatore di nodi?**

- Cosa serve per eseguire i client di convalida usando i fondi in pool?
- Ciò richiede l'autorizzazione da un individuo, una società o una DAO?
- Questo viene utilizzato per determinare il punteggio dei prodotti dei "nodi senza autorizzazione".

**Qual è la diversità del client degli operatori del nodo in pool?**

- Quale percentuale di operatori dei nodi esegue un client del livello di consenso di maggioranza (CL)?
- Dall'ultima modifica, Prysm è il client del livello di consenso gestito da una maggioranza di operatori di nodi, il che è pericoloso per la rete. Se un client CL è utilizzato attualmente da oltre il 33% della rete, richiediamo i dati correlati al suo utilizzo.
- Questo viene utilizzato per determinare il punteggio dei prodotti con "client diversi".

### Altri criteri: gli aspetti preferibili {#other-criteria}

**Quali interfacce utente sono supportate?**

- ossia App browser, app desktop, app mobili, CLI

**Per la strumentazione del nodo, il software fornisce un modo semplice per passare da un client all'altro?**

- L'utente può modificare facilmente e in sicurezza i client usando lo strumento?

**Per SaaS, quanti validatori sono attualmente gestiti dal servizio?**

- Questo ci da un'idea del raggio d'azione del tuo servizio finora.

## Come mostriamo i risultati {#product-ordering}

I [criteri di inclusione](#criteria-for-inclusion) di cui sopra vengono utilizzati per calcolare un punteggio cumulativo per ciascun prodotto o servizio. Questo viene utilizzato come mezzo per selezionare e mostrare prodotti che soddisfano determinati criteri oggettivi. Più criteri sono disponibili con le relative prove, più il prodotto sarà in cima all'elenco, mentre i pareggi saranno randomizzati al caricamento.

La logica del codice e le ponderazioni per questi criteri sono attualmente contenute in [questo componente JavaScript](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) nel nostro repo.

## Aggiungi il tuo prodotto o servizio {#add-product}

Se desideri aggiungere un prodotto o servizio di staking su ethereum.org, crea un ticket su GitHub.

<ButtonLink to="https://github.com/ethereum/ethereum-org-website/issues/new?&template=suggest_staking_product.md">
  Crea un ticket
</ButtonLink>
