---
title: Restaking
metaTitle: "Cos'è il restaking? | Vantaggi e utilizzo del restaking"
description: Usa gli ETH in staking per proteggere altri servizi decentralizzati e guadagnare ricompense extra.
lang: it
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: Una rappresentazione visiva del restaking su Ethereum.
sidebarDepth: 2
summaryPoint1: Usa gli ETH in staking per proteggere altri servizi decentralizzati e guadagnare ricompense extra.
buttons:
  - content: Cos'è il restaking?
    toId: what-is-restaking
  - content: Come funziona?
    toId: how-does-restaking-work
    isSecondary: false
---

La rete di Ethereum protegge miliardi di dollari di valore 24 ore su 24, 7 giorni su 7, 365 giorni all'anno. Come?

Persone in tutto il mondo bloccano (o mettono in "stake") [ether (ETH)](/what-is-ether/) nei contratti intelligenti per eseguire il software che elabora le transazioni di Ethereum e protegge la rete di Ethereum. In cambio, vengono ricompensate con altri ETH.

Il restaking è una tecnologia creata per gli [staker](/staking/) per estendere questa sicurezza ad altri servizi, applicazioni o reti. In cambio, guadagnano ulteriori ricompense di restaking. Tuttavia, mettono anche i loro ETH in staking a un rischio maggiore.

**Il restaking spiegato in 18 minuti**

<YouTube id="rOJo7VwPh7I" />

## Cos'è il restaking? {#what-is-restaking}

Il restaking avviene quando gli staker usano i loro ETH già in staking per proteggere altri servizi decentralizzati. In cambio, i restaker possono ottenere ricompense aggiuntive da quegli altri servizi oltre alle loro normali ricompense di staking di ETH.

I servizi decentralizzati protetti dal restaking sono noti come "Actively Validated Services" (AVS).
Allo stesso modo in cui molti staker di ETH eseguono il software di validazione di Ethereum, molti restaker eseguono software AVS specializzati.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Buono a sapersi</strong></p>
  <p className="mt-2">Sebbene "Actively Validated Services" (AVS) sia il più comune, diverse piattaforme di restaking potrebbero usare altri nomi per i servizi decentralizzati che aiutano a proteggere, come "Autonomously Validated Services", "Distributed Secure Services" o "Networks".</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs restaking {#staking-vs-restaking}

| Staking                        | Restaking                                         |
| ------------------------------ | ------------------------------------------------- |
| Guadagna ricompense in ETH               | Guadagna ricompense in ETH + ricompense AVS                    |
| Protegge la rete di Ethereum   | Protegge la rete di Ethereum + gli AVS               |
| Nessun minimo di ETH                 | Nessun minimo di ETH                                    |
| Livello di rischio basso                 | Livello di rischio da basso ad alto                            |
| Il tempo di prelievo dipende dalla coda | Il tempo di prelievo dipende dalla coda + periodo di svincolo |

## Perché abbiamo bisogno del restaking? {#why-do-we-need-restaking}

Immagina due mondi; uno con il restaking e uno senza.

 <TabbedSection />

In questo mondo con il restaking, sia l'AVS che lo staker traggono vantaggio dal potersi trovare a vicenda e scambiare sicurezza per ricompense extra.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Vantaggio aggiuntivo del restaking</strong></p>
  <p className="mt-2">Gli AVS possono riversare tutte le loro risorse nella costruzione e nel marketing dei loro servizi, invece di distrarsi con la decentralizzazione e la sicurezza.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Come funziona il restaking? {#how-does-restaking-work}

Ci sono diverse entità coinvolte nel restaking — ognuna di esse svolge una parte importante.

| **Termine**                | **Descrizione**                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Piattaforme di restaking** | Una piattaforma di restaking è un servizio che connette AVS, staker di ETH e operatori. Costruiscono applicazioni decentralizzate per consentire agli staker di fare restaking dei loro ETH, e mercati in cui staker, AVS e operatori possono trovarsi a vicenda.                                                                                                                |
| **Restaker nativi**    | Le persone che mettono in stake i loro ETH eseguendo i propri validatori di Ethereum possono connettere i loro ETH in staking a una piattaforma di restaking, tra cui EigenLayer e altre, per guadagnare ricompense di restaking oltre alle ricompense del validatore di ETH.                                                                                                                             |
| **Restaker liquidi**    | Le persone che mettono in stake i loro ETH tramite un fornitore di liquid staking di terze parti, come Lido o Rocket Pool, ottengono Liquid Staking Token (LST) che rappresentano i loro ETH in staking. Possono fare restaking di questi LST per guadagnare ricompense di restaking mantenendo in stake i loro ETH originali.                                                                                  |
| **Operatori**           | Gli operatori eseguono il software di restaking degli AVS, svolgendo le attività di validazione richieste da ciascun AVS. Gli operatori sono solitamente fornitori di servizi professionali che garantiscono aspetti come il tempo di attività e le prestazioni. Come i restaker non operatori, gli operatori usano gli ETH in staking per proteggere gli AVS, ma ricevono anche ricompense extra in cambio del loro lavoro. |
| **AVS**                | Questi sono i servizi decentralizzati — come oracoli di prezzo, ponti di token e sistemi di dati — che ricevono sicurezza dai restaker e offrono ricompense in token in cambio.                                                                                                                                                                              |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Buono a sapersi</strong></p>
  <p className="mt-2">I restaker nativi e liquidi spesso delegano i loro ETH in staking a un operatore, invece di eseguire loro stessi il software per proteggere gli AVS.</p>
  <p className="mt-2">In questo modo non devono preoccuparsi dei complicati requisiti tecnici degli AVS, sebbene ricevano un tasso di ricompensa inferiore rispetto agli operatori.</p>
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
  <p className="mt-2">Alcune persone confondono il "restaking" con il prestito e l'assunzione in prestito di LST nella DeFi. Entrambi mettono al lavoro gli ETH in staking, ma restaking significa proteggere gli AVS, non solo guadagnare un rendimento sugli LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Quanto posso guadagnare dal restaking? {#how-much-can-i-make-from-restaking}

Sebbene gli AVS offrano tassi diversi, i Liquid Restaking Token (LRT) come eETH ti danno un'idea di quanto puoi guadagnare. Allo stesso modo in cui ottieni LST come stETH per lo staking dei tuoi ETH, puoi ottenere LRT come eETH per il restaking di stETH. Questi token guadagnano ricompense di staking e restaking di ETH.

**È importante riconoscere i rischi del restaking. Le potenziali ricompense possono essere allettanti, ma non sono prive di rischi.**

## Quali sono i rischi del restaking? {#what-are-the-risks-of-restaking}

| **Rischi**                     | **Descrizione**                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Penalità (o "punire")** | Come nello staking di ETH, se i restaker/operatori vanno offline, censurano messaggi o cercano di corrompere la rete, il loro stake può essere punito (bruciato) parzialmente o interamente. |
| **Centralizzazione**            | Se pochi operatori dominano la maggior parte del restaking, potrebbero avere una grande influenza sui restaker, sugli AVS e persino sulle piattaforme di restaking.                             |
| **Reazioni a catena**           | Se un restaker viene punito mentre protegge più AVS, ciò potrebbe ridurre la sicurezza per gli altri AVS, rendendoli vulnerabili.                             |
| **Accesso immediato ai fondi** | C'è un tempo di attesa (o "periodo di svincolo") per prelevare gli ETH in restaking, quindi potresti non avere sempre accesso immediato.                                       |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Il co-fondatore di Ethereum sta scrivendo…</strong></p>
  <p className="mt-2">
    Vitalik, il co-fondatore di Ethereum, ha avvertito dei potenziali rischi del restaking in un post sul blog del 2021 intitolato <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus.</a>
  </p>
</AlertDescription>
</AlertContent>
</Alert>

## Come iniziare con il restaking? {#how-to-get-started-with-restaking}

| 🫡 Principianti                                                    | 🤓 Utenti avanzati                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Metti in stake ETH su piattaforme come Lido o Rocket Pool per ottenere LST. | 1. Metti in stake i tuoi ETH come validatore su Ethereum.                                         |
| 2. Usa quegli LST per iniziare il restaking su un servizio di restaking.    | 2. Confronta i servizi di restaking come EigenLayer, Symbiotic e altri.                  |
|                                                                 | 3. Segui le istruzioni per connettere il tuo validatore al contratto intelligente di restaking. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Staking di Ethereum:</strong> Come funziona?</p>
  <ButtonLink href="/staking/">
    Scopri di più
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Avanzato {#advanced}

<YouTube id="-V-fG4J1N_M" />

## Letture di approfondimento {#further-reading}

1. [ethereum.org - Guida allo staking di ETH](/staking/)
2. [Ledger Academy - Cos'è il restaking di Ethereum?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer: Spiegazione del protocollo di restaking decentralizzato di Ethereum](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Don't overload Ethereum's consensus](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - Cos'è EigenLayer? Spiegazione del protocollo di restaking di Ethereum](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Aggiunta di funzionalità senza permessi a Ethereum con Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer spiegato: Cos'è il restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Dashboard dei dati sul restaking](https://www.theblock.co/data/decentralized-finance/restaking)