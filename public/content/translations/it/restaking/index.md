---
title: Restaking
metaTitle: "Cos'è il restaking? | Vantaggi e utilizzo del restaking"
description: Usa gli ETH in stake per proteggere altri servizi decentralizzati e guadagnare ricompense extra.
lang: it
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: Una rappresentazione visiva del restaking su Ethereum.
sidebarDepth: 2
summaryPoint1: Usa gli ETH in stake per proteggere altri servizi decentralizzati e guadagnare ricompense extra.
buttons:
  - content: Cos'è il restaking?
    toId: what-is-restaking
  - content: Come funziona?
    toId: how-does-restaking-work
    isSecondary: false
---

La rete Ethereum protegge miliardi di dollari di valore 24/7, 365 giorni all'anno. Come?

Persone in tutto il mondo bloccano (o "mettono in stake") [ether (ETH)](/eth/) in contratti intelligenti per eseguire il software che elabora le transazioni di Ethereum e protegge la rete Ethereum. In cambio, vengono ricompensati con altri ETH.

Il restaking è una tecnologia creata per gli [staker](/staking/) per estendere questa sicurezza ad altri servizi, applicazioni o reti. In cambio, guadagnano ricompense di restaking aggiuntive. Tuttavia, espongono anche i loro ETH in stake a un rischio maggiore.

**Il restaking spiegato in 18 minuti**

<YouTube id="rOJo7VwPh7I" />

## Cos'è il restaking? {#what-is-restaking}

Il restaking si verifica quando gli staker usano i loro ETH già in stake per proteggere altri servizi decentralizzati. In cambio, i restaker possono ottenere ricompense aggiuntive da quegli altri servizi in aggiunta alle loro normali ricompense di staking di ETH.

I servizi decentralizzati protetti dal restaking sono noti come "Actively Validated Services" (AVS).
Allo stesso modo in cui molti staker di ETH eseguono software di validazione di Ethereum, molti restaker eseguono software AVS specializzato.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Buono a sapersi</strong></p>
  <p className="mt-2">Anche se "Actively Validated Services" (AVS) è il termine più comune, diverse piattaforme di restaking possono usare altri nomi per i servizi decentralizzati che aiutano a proteggere, come "Autonomously Validated Services", "Distributed Secure Services" o "Networks".</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking e restaking a confronto {#staking-vs-restaking}

| Staking                                 | Restaking                                                     |
| --------------------------------------- | ------------------------------------------------------------- |
| Guadagna ricompense in ETH              | Guadagna ricompense in ETH + ricompense AVS                   |
| Protegge la rete Ethereum               | Protegge la rete Ethereum + AVS                               |
| Nessun ETH minimo                       | Nessun ETH minimo                                             |
| Basso livello di rischio                | Livello di rischio da basso ad alto                           |
| Il tempo di prelievo dipende dalla coda | Il tempo di prelievo dipende dalla coda + periodo di svincolo |

## Perché abbiamo bisogno del restaking? {#why-do-we-need-restaking}

Immagina due mondi: uno con il restaking e uno senza.

 <TabbedSection />

In questo mondo con il restaking, sia l'AVS che lo staker traggono vantaggio dal potersi trovare e scambiare sicurezza per ricompense extra.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Vantaggio aggiuntivo del restaking</strong></p>
  <p className="mt-2">Gli AVS possono riversare tutte le loro risorse nella creazione e nel marketing dei loro servizi, invece di essere distratti dalla decentralizzazione e dalla sicurezza.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Come funziona il restaking? {#how-does-restaking-work}

Ci sono diverse entità coinvolte nel restaking, ognuna delle quali svolge un ruolo importante.

| **Termine**                  | **Descrizione**                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Piattaforme di restaking** | Una piattaforma di restaking è un servizio che collega AVS, staker di ETH e operatori. Sviluppano applicazioni decentralizzate per consentire agli staker di effettuare il restake dei loro ETH e marketplace in cui staker, AVS e operatori possono trovarsi.                                                                                                                                                                  |
| **Restaker nativi**          | Le persone che mettono in stake i propri ETH gestendo i propri validatori Ethereum possono collegare i loro ETH in stake a una piattaforma di restaking, tra cui EigenLayer e altre, per guadagnare ricompense di restaking in aggiunta alle ricompense del validatore di ETH.                                                                                                                                                                  |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Restaker liquidi**         | Le persone che mettono in stake i propri ETH tramite un fornitore di liquid staking di terze parti, come Lido o Rocket Pool, ottengono dei Liquid Staking Token (LST) che rappresentano i loro ETH in stake. Possono effettuare il restake di questi LST per guadagnare ricompense di restaking, mantenendo i loro ETH originali in stake.                                                                   |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Operatori**                | Gli operatori eseguono il software di restaking degli AVS, eseguendo le attività di validazione richieste da ciascun AVS. Gli operatori sono solitamente fornitori di servizi professionali che garantiscono elementi come l'uptime e le prestazioni. Come i restaker non operatori, gli operatori usano gli ETH in stake per proteggere gli AVS, ma ricevono anche ricompense extra in cambio del loro lavoro. |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **AVS**                      | Questi sono i servizi decentralizzati, come oracoli dei prezzi, ponti di token e sistemi di dati, che ricevono sicurezza dai restaker e offrono ricompense in token in cambio.                                                                                                                                                                                                                                                                  |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Buono a sapersi</strong></p>
  <p className="mt-2">I restaker nativi e liquidi spesso delegano i loro ETH in stake a un operatore, invece di eseguire da soli il software per proteggere gli AVS.</p>
  <p className="mt-2">In questo modo non devono preoccuparsi dei complessi requisiti tecnici degli AVS, anche se ricevono un tasso di ricompensa inferiore rispetto agli operatori.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Quali sono alcuni esempi di restaking? {#what-are-some-examples-of-restaking}

Sebbene sia un'idea nuova, sono emersi alcuni progetti per esplorare le possibilità del restaking.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Attenzione all'uso improprio del termine</strong></p>
  <p className="mt-2">Alcuni confondono il "restaking" con il prestito e l'assunzione di prestiti di LST nella DeFi. Entrambi mettono al lavoro gli ETH in stake, ma il restaking significa proteggere gli AVS, non solo guadagnare un rendimento sugli LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Quanto posso guadagnare con il restaking? {#how-much-can-i-make-from-restaking}

Mentre gli AVS offrono tassi diversi, i Liquid Restaking Token (LRT) come eETH ti danno un'idea di quanto puoi guadagnare. Allo stesso modo in cui ottieni LST come stETH per lo staking dei tuoi ETH, puoi ottenere LRT come eETH per il restake di stETH. Questi token guadagnano ricompense di staking di ETH e di restaking.

**È importante riconoscere i rischi del restaking. Le potenziali ricompense possono essere interessanti, ma non sono prive di rischi.**

## Quali sono i rischi del restaking? {#what-are-the-risks-of-restaking}

| **Rischi**                                     | **Descrizione**                                                                                                                                                                                                                     |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Penalità (o "slashing")** | Come per lo staking di ETH, se i restaker/operatori vanno offline, censurano messaggi o tentano di corrompere la rete, il loro stake può essere decurtato (bruciato) parzialmente o interamente. |
| **Centralizzazione**                           | Se pochi operatori dominano la maggior parte del restaking, potrebbero avere una grande influenza sui restaker, sugli AVS e persino sulle piattaforme di restaking.                                                 |
| **Reazioni a catena**                          | Se un restaker subisce uno slashing mentre protegge più AVS, questo potrebbe ridurre la sicurezza per gli altri AVS, rendendoli vulnerabili.                                                                        |
| **Accesso immediato ai fondi**                 | C'è un tempo di attesa (o "periodo di svincolo") per prelevare gli ETH in restake, quindi potresti non avere sempre un accesso immediato.                                                        |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Il co-fondatore di Ethereum sta scrivendo...</strong></p>
  <p className="mt-2">
    Vitalik, il co-fondatore di Ethereum, ha messo in guardia sui potenziali rischi del restaking in un post del blog del 2021 intitolato <a href = "https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus</a>. </a>  
</p>
</AlertDescription>
</AlertContent>
</Alert>

## Come iniziare con il restaking? {#how-to-get-started-with-restaking}

| 🫡 Principianti                                                                                                       | 🤓 Utenti esperti                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Metti in stake ETH su piattaforme come Lido o Rocket Pool per ottenere LST. | 1. Metti in stake i tuoi ETH come validatore su Ethereum.                                      |
| 2. Usa quegli LST per iniziare il restaking su un servizio di restaking.       | 2. Confronta i servizi di restaking come EigenLayer, Symbiotic e altri.                        |
|                                                                                                                       | 3. Segui le istruzioni per collegare il tuo validatore al contratto intelligente di restaking. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Staking di Ethereum:</strong> come funziona?</p>
  <ButtonLink href="/staking/">
    Scopri di più
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Avanzato {#advanced}

<YouTube id="-V-fG4J1N_M" />

## Letture consigliate {#further-reading}

1. [ethereum.org - guida allo staking di ETH](https://ethereum.org/en/staking/)
2. [Ledger Academy - Cos'è il restaking di Ethereum?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer: il protocollo di restaking decentralizzato di Ethereum spiegato](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Don't overload Ethereum's consensus](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - Cos'è EigenLayer? Spiegazione del protocollo di restaking di Ethereum](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Permissionless Feature Addition to Ethereum with Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer spiegato: Cos'è il restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Restaking Data Dash](https://www.theblock.co/data/decentralized-finance/restaking)
