---
title: Prelievi di staking
description: Pagina che riassume cosa sono i prelievi push di staking, come funzionano e cosa devono fare gli staker per ottenere le loro ricompense
lang: it
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Il rinoceronte Leslie con le sue ricompense di staking
sidebarDepth: 2
summaryPoints:
  - Gli operatori dei validatori devono fornire un indirizzo di prelievo per abilitare i prelievi
  - I validatori legacy vedono il saldo in eccesso oltre i 32 ETH prelevato automaticamente ogni pochi giorni
  - I validatori compounding guadagnano ricompense sull'intero saldo fino a 2048 ETH
  - I validatori che escono completamente dallo staking riceveranno il loro saldo rimanente
---

**I prelievi di staking** si riferiscono ai trasferimenti di ETH da un account del validatore sul livello di consenso di Ethereum (la Beacon Chain), al livello di esecuzione dove possono essere oggetto di transazione.

> Se fai parte di una [pool di staking](/staking/pools/) o detieni token di staking, dovresti verificare con il tuo fornitore per maggiori dettagli su come vengono gestiti i prelievi di staking, poiché ogni servizio opera in modo diverso.

Il funzionamento dei prelievi dipende dal tipo di credenziali di prelievo del tuo validatore:

- **Validatori legacy (Tipo 1)**: Il saldo in eccesso oltre i 32 ETH viene inviato automaticamente e regolarmente all'indirizzo di prelievo collegato al validatore. Le ricompense superiori a 32 ETH non contribuiscono al peso del validatore sulla rete.
- **Validatori compounding (Tipo 2)**: Le ricompense si accumulano nel saldo effettivo del validatore fino a 2048 ETH, aumentando il peso del validatore e facendo guadagnare più ricompense. Solo il saldo che supera i 2048 ETH viene prelevato automaticamente.

Gli utenti possono anche **uscire completamente dallo staking**, inviando una transazione per prelevare, attendendo i tempi di un'eventuale coda di prelievo (in base alla domanda della rete) e sbloccando l'intero saldo del validatore.

## Ricompense di staking {#staking-rewards}

Il modo in cui vengono gestite le ricompense dipende dal tipo di credenziali del validatore:

I **validatori legacy (Tipo 1)** hanno un saldo effettivo limitato a 32 ETH. Qualsiasi saldo superiore a 32 ETH ricevuto come ricompensa della rete non contribuisce al saldo effettivo né aumenta il peso di questo validatore sulla rete, e queste ricompense vengono prelevate automaticamente all'indirizzo di prelievo dedicato del validatore ogni pochi giorni. A parte fornire un indirizzo di prelievo una volta sola, richiedere queste ricompense non richiede alcuna azione da parte dell'operatore del validatore. Tutto questo viene avviato sul livello di consenso, quindi non è richiesto alcun gas (commissione di transazione) in nessuna fase.

I **validatori compounding (Tipo 2)** possono avere un saldo effettivo compreso tra 32 e 2048 ETH. Le ricompense della rete ricevute da questi validatori si accumulano nel loro saldo effettivo, aumentando il peso del validatore e il potenziale di ricevere ricompense future. I prelievi automatici avvengono solo per il saldo che supera i 2048 ETH. Per prelevare le ricompense al di sotto della soglia di 2048 ETH, i validatori compounding devono attivare manualmente un prelievo parziale dal livello di esecuzione, il che richiede gas.

### Come siamo arrivati fin qui? {#how-did-we-get-here}

Negli ultimi anni [Ethereum](/) ha subito diversi aggiornamenti della rete, passando a una rete protetta dall'ETH stesso, invece che dal minaggio ad alta intensità energetica come in passato. La partecipazione al consenso su Ethereum è ora nota come "staking", poiché i partecipanti hanno volontariamente bloccato degli ETH, mettendoli "in gioco" (at stake) per la possibilità di partecipare alla rete. Gli utenti che seguono le regole saranno ricompensati, mentre i tentativi di imbrogliare possono essere penalizzati.

Dal lancio del contratto di deposito di staking nel novembre 2020, alcuni coraggiosi pionieri di Ethereum hanno volontariamente bloccato dei fondi per attivare i "validatori", account speciali che hanno il diritto di attestare formalmente e proporre blocchi, seguendo le regole della rete.

Prima dell'aggiornamento Shanghai/Capella, non potevi usare o accedere ai tuoi ETH messi in staking. Ma ora, puoi scegliere di ricevere automaticamente le tue ricompense in un account scelto, e puoi anche prelevare i tuoi ETH in staking quando vuoi.

### Come mi preparo? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Avvisi importanti {#important-notices}

Agli account dei validatori è richiesto di fornire un indirizzo di prelievo prima di poter accedere e prelevare le ricompense di rete maturate, o elaborare un prelievo completo all'uscita dallo staking.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**A ogni account del validatore può essere assegnato un solo indirizzo di prelievo, una volta sola.** Una volta che un indirizzo viene scelto e inviato al livello di consenso, questo non può essere annullato o modificato di nuovo. Ricontrolla la proprietà e l'accuratezza dell'indirizzo fornito prima di inviarlo.
</AlertDescription>
</AlertContent>
</Alert>

Se non hai ancora fornito un indirizzo di prelievo per il tuo account del validatore, **non c'è alcuna minaccia per i tuoi fondi nel frattempo**, supponendo che la tua frase mnemonica/frase seme sia rimasta al sicuro offline e non sia stata compromessa in alcun modo. La mancata aggiunta delle credenziali di prelievo lascerà semplicemente gli ETH bloccati nell'account del validatore finché non verrà fornito un indirizzo di prelievo.

## Validatori compounding {#compounding-validators}

I validatori possono optare per il **compounding** (accumulo) convertendo le loro credenziali di prelievo dal Tipo 1 al Tipo 2. Questo innalza il saldo effettivo massimo da 32 ETH a **2048 ETH**, consentendo alle ricompense di accumularsi nel saldo effettivo del validatore invece di essere prelevate automaticamente.

Con il compounding abilitato:

- Le ricompense aumentano il saldo effettivo del validatore con incrementi di 1 ETH (soggetti a un piccolo [buffer di isteresi](https://www.attestant.io/posts/understanding-validator-effective-balance/)), facendo guadagnare più ricompense nel tempo
- I prelievi automatici avvengono solo per il saldo che supera i 2048 ETH
- I prelievi parziali al di sotto della soglia di 2048 ETH devono essere attivati manualmente dal livello di esecuzione (questo costa gas)
- Più validatori possono essere **consolidati** in un singolo validatore compounding, riducendo il carico operativo

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**La conversione delle credenziali di prelievo dal Tipo 1 al Tipo 2 è irreversibile.** Usa lo [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) come strumento ufficiale per questa conversione. Per maggiori dettagli sul processo di conversione, sui rischi e sul consolidamento, consulta l'[approfondimento su MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Uscire completamente dallo staking {#exiting-staking-entirely}

Fornire un indirizzo di prelievo è richiesto prima che _qualsiasi_ fondo possa essere trasferito fuori dal saldo di un account del validatore.

Gli utenti che desiderano uscire completamente dallo staking e prelevare l'intero saldo devono avviare un'"uscita volontaria". Questo può essere fatto in due modi:

- **Usando le chiavi del validatore**: Firma e trasmetti un messaggio di uscita volontaria con il tuo client del validatore, inviato al tuo nodo di consenso. Questo non richiede gas.
- **Usando le credenziali di prelievo**: Attiva un'uscita dal livello di esecuzione usando il tuo indirizzo di prelievo, senza aver bisogno di accedere alla chiave di firma del validatore. Questo richiede una transazione e costa gas.

Il processo di uscita di un validatore dallo staking richiede una quantità di tempo variabile, a seconda di quanti altri stanno uscendo contemporaneamente. Una volta completato, questo account non sarà più responsabile dell'esecuzione dei compiti di rete del validatore, non sarà più idoneo per le ricompense e non avrà più i suoi ETH "in staking". In questo momento l'account sarà contrassegnato come completamente "prelevabile" (withdrawable).

Una volta che un account è contrassegnato come "prelevabile" e sono state fornite le credenziali di prelievo, non c'è nient'altro che un utente debba fare a parte aspettare. Gli account vengono controllati automaticamente e continuamente dai proponenti dei blocchi per i fondi usciti idonei, e il saldo del tuo account verrà trasferito per intero (noto anche come "prelievo completo") durante il successivo <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>sweep</a> (controllo automatico).

## Come funzionano le ricompense automatiche (validatore di Tipo 1)? {#how-do-withdrawals-work}

Se un determinato validatore sia idoneo o meno per un prelievo è determinato dallo stato dell'account del validatore stesso. Non è necessario alcun input da parte dell'utente in nessun momento per determinare se un account debba avere un prelievo avviato o meno: l'intero processo viene eseguito automaticamente dal livello di consenso in un ciclo continuo.

### Preferisci imparare visivamente? {#visual-learner}

Dai un'occhiata a questa spiegazione sui prelievi di staking di Ethereum realizzata da Finematics:

<VideoWatch slug="ethereum-staking-withdrawals" />

### Lo "sweeping" dei validatori {#validator-sweeping}

Quando un validatore è programmato per proporre il blocco successivo, gli è richiesto di costruire una coda di prelievo, fino a un massimo di 16 prelievi idonei. Questo viene fatto partendo originariamente dall'indice del validatore 0, determinando se c'è un prelievo idoneo per questo account secondo le regole del protocollo, e aggiungendolo alla coda se c'è. Il validatore impostato per proporre il blocco seguente riprenderà da dove si era interrotto l'ultimo, procedendo in ordine indefinitamente.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Pensa a un orologio analogico. La lancetta dell'orologio punta all'ora, avanza in una direzione, non salta nessuna ora e alla fine ricomincia dall'inizio dopo aver raggiunto l'ultimo numero.

Ora, invece che da 1 a 12, immagina che l'orologio vada da 0 a N _(dove N è il numero totale di account dei validatori che sono mai stati registrati sul livello di consenso, oltre 1,2 milioni ad aprile 2026)._

La lancetta dell'orologio punta al validatore successivo che deve essere controllato per i prelievi idonei. Inizia da 0 e procede per tutto il giro senza saltare alcun account. Quando viene raggiunto l'ultimo validatore, il ciclo continua tornando all'inizio.
</AlertDescription>
</AlertContent>
</Alert>

#### Controllo di un account per i prelievi {#checking-an-account-for-withdrawals}

Mentre un proponente sta controllando i validatori per possibili prelievi, ogni validatore controllato viene valutato in base a una breve serie di domande per determinare se debba essere attivato un prelievo e, in tal caso, quanti ETH debbano essere prelevati.

1. **È stato fornito un indirizzo di prelievo?** Se non è stato fornito alcun indirizzo di prelievo, l'account viene saltato e non viene avviato alcun prelievo.
2. **Il validatore è uscito ed è prelevabile?** Se il validatore è uscito completamente e abbiamo raggiunto l'epoca in cui il suo account è considerato "prelevabile", allora verrà elaborato un prelievo completo. Questo trasferirà l'intero saldo rimanente all'indirizzo di prelievo.
3. **Il saldo supera il suo saldo effettivo massimo?** Per i validatori legacy (Tipo 1), questa soglia è di 32 ETH. Per i validatori compounding (Tipo 2), questa soglia è di 2048 ETH. Se l'account ha le credenziali di prelievo, non è uscito completamente, ha un saldo effettivo al massimo e ha un saldo superiore a questa soglia, allora verrà elaborato un prelievo parziale che trasferisce solo l'eccesso all'indirizzo di prelievo dell'utente.

Ci sono solo due azioni intraprese dagli operatori dei validatori nel corso del ciclo di vita di un validatore che influenzano direttamente questo flusso:

- Fornire le credenziali di prelievo per abilitare qualsiasi forma di prelievo
- Uscire dalla rete, il che attiverà un prelievo completo

### Senza gas {#gas-free}

I controlli automatici dei prelievi non richiedono agli staker di inviare manualmente una transazione. Questo significa che **non è richiesto alcun gas (commissione di transazione)** per i controlli automatici, e non competono per lo spazio dei blocchi esistente sul livello di esecuzione.

Nota che i [validatori compounding](#compounding-validators) che desiderano attivare un prelievo parziale al di sotto della soglia di 2048 ETH devono farlo manualmente dal livello di esecuzione, il che richiede gas.

### Con quale frequenza le mie ricompense di staking saranno sbloccate e disponibili nel mio portafoglio? {#how-soon}

In un singolo blocco possono essere elaborati al massimo 16 prelievi. A questo ritmo, possono essere elaborati 115.200 prelievi di validatori al giorno (supponendo che non ci siano slot persi). Come notato sopra, i validatori senza prelievi idonei verranno saltati, diminuendo il tempo per terminare il controllo.

Espandendo questo calcolo, possiamo stimare il tempo necessario per elaborare un determinato numero di prelievi:

<TableContainer>

| Numero di prelievi | Tempo di completamento |
| :-------------------: | :--------------: |
|        400.000        |     3,5 giorni     |
|        500.000        |     4,3 giorni     |
|        600.000        |     5,2 giorni     |
|        700.000        |     6,1 giorni     |
|        800.000        |     7,0 giorni     |

</TableContainer>

Come puoi vedere, questo rallenta man mano che ci sono più validatori sulla rete. Un aumento degli slot persi potrebbe rallentarlo proporzionalmente, ma questo rappresenterà generalmente il lato più lento dei possibili risultati.

## Domande frequenti {#faq}

<ExpandableCard
title="Una volta fornito un indirizzo di prelievo, posso cambiarlo con un indirizzo di prelievo alternativo?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
No, il processo per fornire le credenziali di prelievo è un processo una tantum e non può essere modificato una volta inviato.
</ExpandableCard>

<ExpandableCard
title="Perché l'indirizzo di prelievo di un validatore può essere impostato solo una volta?"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
L'impostazione dell'indirizzo di prelievo del livello di esecuzione di un validatore è una modifica permanente alle credenziali del validatore sul livello di consenso. Non c'è modo di aggiornare le credenziali del livello di consenso una volta registrate.

Le credenziali dell'indirizzo di prelievo di un validatore possono essere impostate per puntare a uno smart contract (controllato dal suo codice) o a un account di proprietà esterna (EOA, controllato dalla sua chiave privata). Attualmente, questi account non hanno modo di comunicare un messaggio al livello di consenso che segnali un cambiamento delle credenziali del validatore, e l'aggiunta di questa funzionalità aggiungerebbe un'inutile complessità al protocollo.

Gli utenti che cercano una gestione flessibile dei prelievi possono impostare un portafoglio smart contract in grado di ruotare le chiavi (come un [Safe](https://safe.global/)) come indirizzo di prelievo del validatore, consentendo di fatto l'aggiornamento dell'EOA destinatario finale. Se un utente ha già impostato un EOA come credenziale di prelievo, deve avviare un'uscita completa per recuperare i propri ETH in staking e poi usare quei fondi per attivare un nuovo validatore con credenziali diverse.
</ExpandableCard>

<ExpandableCard
title="Come prelevo dallo staking se faccio staking tramite un fornitore, una pool di staking o partecipo con token di staking liquido?"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
Se usi una pool di staking o detieni token di staking, contatta il tuo fornitore per sapere come gestisce i prelievi, poiché i processi variano a seconda del servizio. 

In generale, quando fai staking tramite un fornitore o una pool, dovresti essere libero di reclamare i tuoi ETH sottostanti in staking, o di prelevare e cambiare il fornitore di staking che utilizzi. Se una particolare pool sta diventando troppo grande, gli ETH in staking possono essere ritirati, riscattati e messi di nuovo in staking con un [fornitore più piccolo](https://rated.network/). Oppure, se hai accumulato abbastanza ETH, potresti [fare staking da casa](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="La richiesta delle ricompense di rete (prelievi parziali) avviene automaticamente?"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
Per i **validatori legacy (Tipo 1)**, sì, a patto che il tuo validatore abbia fornito un indirizzo di prelievo. Questo deve essere fornito una volta per abilitare qualsiasi prelievo, dopodiché la distribuzione delle ricompense di rete all'indirizzo di prelievo verrà attivata automaticamente ogni pochi giorni con ogni controllo dei validatori.

Per i **validatori compounding (Tipo 2)**, le ricompense si accumulano nel saldo effettivo del validatore (fino a 2048 ETH) piuttosto che essere prelevate all'indirizzo di prelievo. I prelievi automatici avvengono solo per i saldi che superano i 2048 ETH. Per prelevare le ricompense al di sotto di questa soglia, devi attivare manualmente un prelievo parziale dal livello di esecuzione.
</ExpandableCard>

<ExpandableCard title="Posso prelevare un importo personalizzato?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Per i **validatori legacy (Tipo 1)**, qualsiasi ricompensa di rete in ETH maturata oltre il saldo effettivo di 32 ETH del validatore viene inviata automaticamente all'indirizzo di prelievo. I validatori di Tipo 1 che hanno inviato una transazione di prelievo completo e completato il processo di uscita dallo staking vedono il loro intero saldo in ETH prelevato al loro indirizzo di prelievo. Non è possibile per un validatore di Tipo 1 richiedere manualmente il prelievo di importi specifici di ETH.

I **validatori compounding (Tipo 2)** possono attivare prelievi parziali di un importo specifico dal livello di esecuzione, a patto che il saldo rimanente del validatore rimanga pari o superiore a 32 ETH. Questo richiede l'invio di una transazione di prelievo parziale e costa gas.
</ExpandableCard>

<ExpandableCard
title="Gestisco un validatore. Dove posso trovare maggiori informazioni sulla gestione del processo di prelievo?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

Si raccomanda agli operatori dei validatori di visitare la pagina [Prelievi dello Staking Launchpad](https://launchpad.ethereum.org/withdrawals/) dove troverai maggiori dettagli su come preparare il tuo validatore per i prelievi, le tempistiche degli eventi e maggiori dettagli su come funzionano i prelievi.

Per provare prima la tua configurazione su una testnet, visita l'[Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org) per iniziare.

</ExpandableCard>

<ExpandableCard
title="Posso riattivare il mio validatore dopo l'uscita depositando più ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
No. Una volta che un validatore è uscito e il suo intero saldo è stato prelevato, qualsiasi ETH aggiuntivo depositato su quel validatore verrà automaticamente trasferito all'indirizzo di prelievo durante il successivo controllo dei validatori. Per ricominciare a fare staking usando quegli ETH, devi attivare un nuovo validatore.
</ExpandableCard>

<ExpandableCard
title="Qual è la differenza tra validatori legacy e compounding?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
I validatori legacy usano credenziali di prelievo di **Tipo 1** (l'indirizzo delle credenziali di prelievo inizia con 0x01) e hanno un saldo effettivo limitato a 32 ETH. Qualsiasi ETH in eccesso ricevuto come ricompensa di rete viene prelevato automaticamente all'indirizzo di prelievo ogni pochi giorni.

I validatori compounding usano credenziali di prelievo di **Tipo 2** (l'indirizzo delle credenziali di prelievo inizia con 0x02) e possono avere un saldo effettivo fino a 2048 ETH. Le ricompense si accumulano nel saldo effettivo del validatore, aumentando il peso del validatore sulla rete e il potenziale di ricevere ricompense future. I prelievi automatici avvengono solo per il saldo che supera i 2048 ETH. Per prelevare ETH al di sotto di questa soglia, deve essere attivato un prelievo parziale manuale dal livello di esecuzione.

Per maggiori dettagli, consulta l'[approfondimento su MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Come passare a un validatore compounding?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Puoi convertire le credenziali di prelievo dal Tipo 1 al Tipo 2 usando lo [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Questa operazione è **irreversibile**: una volta convertite, non puoi tornare alle credenziali di Tipo 1.

Dopo la conversione, puoi anche **consolidare** più validatori in uno solo, combinando i loro saldi in un singolo validatore compounding. Per una guida completa al processo di conversione, ai rischi e agli strumenti di consolidamento, consulta l'[approfondimento su MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Quando sono stati abilitati i prelievi dallo staking?"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
La funzionalità di prelievo è stata originariamente abilitata come parte dell'aggiornamento Shanghai/Capella il **12 aprile 2023**. L'[aggiornamento Pectra](/roadmap/pectra/) (maggio 2025) ha successivamente introdotto i validatori compounding con un saldo effettivo massimo più elevato di 2048 ETH, oltre alle uscite e ai prelievi parziali attivati dal livello di esecuzione.

L'aggiornamento Shanghai/Capella ha permesso di reclamare gli ETH precedentemente messi in staking in normali account Ethereum. Questo ha chiuso il cerchio sulla liquidità dello staking e ha portato Ethereum un passo più vicino nel suo viaggio verso la costruzione di un ecosistema decentralizzato sostenibile, scalabile e sicuro.

- [Maggiori informazioni sulla storia di Ethereum](/ethereum-forks/)
- [Maggiori informazioni sulla roadmap di Ethereum](/roadmap/)
</ExpandableCard>

## Letture consigliate {#further-reading}

- [Prelievi dello Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Azioni del validatore dello Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Approfondimento su MaxEB: compounding e consolidamento](/roadmap/pectra/maxeb/)
- [EIP-4895: Prelievi push della Beacon Chain come operazioni](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Prelievo di ETH in staking (Testing) con Potuz e Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Prelievi push della Beacon Chain come operazioni con Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Comprendere il saldo effettivo del validatore](https://www.attestant.io/posts/understanding-validator-effective-balance/)