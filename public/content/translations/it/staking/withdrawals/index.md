---
title: Prelievi dello staking
description: Pagina che riassume cosa sono i prelievi push dello staking, come funzionano e cosa devono fare gli staker per ottenere le loro ricompense
lang: it
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Il rinoceronte Leslie con le sue ricompense di staking
sidebarDepth: 2
summaryPoints:
  - Gli operatori dei validatori devono fornire un indirizzo di prelievo per abilitare i prelievi
  - I validatori legacy vedono il saldo in eccesso oltre i 32 ETH prelevato automaticamente ogni pochi giorni
  - I validatori composti (compounding) guadagnano ricompense sull'intero saldo fino a 2048 ETH
  - I validatori che escono completamente dallo staking riceveranno il loro saldo rimanente
---

I **prelievi dello staking** si riferiscono ai trasferimenti di ETH da un account del validatore sul livello di consenso di Ethereum (la Beacon Chain), al livello di esecuzione dove possono essere transati.

Il funzionamento dei prelievi dipende dal tipo di credenziali di prelievo del tuo validatore:

- **Validatori legacy (Tipo 1)**: Il saldo in eccesso oltre i 32 ETH viene inviato automaticamente e regolarmente all'indirizzo di prelievo collegato al validatore. Le ricompense superiori a 32 ETH non contribuiscono al peso del validatore sulla rete.
- **Validatori composti (Tipo 2)**: Le ricompense si compongono nel saldo effettivo del validatore fino a 2048 ETH, aumentando il peso del validatore e facendo guadagnare più ricompense. Solo il saldo che supera i 2048 ETH viene prelevato automaticamente.

Gli utenti possono anche **uscire completamente dallo staking**, sbloccando l'intero saldo del validatore.

## Ricompense dello staking {#staking-rewards}

Il modo in cui vengono gestite le ricompense dipende dal tipo di credenziali del validatore:

I **validatori legacy (Tipo 1)** hanno un saldo effettivo limitato a 32 ETH. Qualsiasi saldo superiore a 32 ETH guadagnato tramite le ricompense non contribuisce al capitale né aumenta il peso di questo validatore sulla rete, e viene prelevato automaticamente come pagamento della ricompensa ogni pochi giorni. A parte fornire un indirizzo di prelievo una volta, queste ricompense non richiedono alcuna azione da parte dell'operatore del validatore. Tutto questo viene avviato sul livello di consenso, quindi non è richiesto alcun gas (commissione della transazione) in nessuna fase.

I **validatori composti (Tipo 2)** possono avere un saldo effettivo compreso tra 32 e 2048 ETH. Le ricompense guadagnate da questi validatori si compongono nel loro saldo effettivo, aumentando il peso del validatore e le ricompense future. I prelievi automatici avvengono solo per il saldo che supera i 2048 ETH. Per prelevare le ricompense al di sotto della soglia di 2048 ETH, i validatori composti devono attivare manualmente un prelievo parziale dal livello di esecuzione, il che richiede gas.

### Come siamo arrivati fin qui? {#how-did-we-get-here}

Negli ultimi anni [Ethereum](/) ha subito diversi aggiornamenti di rete passando a una rete protetta dall'ETH stesso, invece che dal mining ad alta intensità energetica come era un tempo. La partecipazione al consenso su Ethereum è ora nota come "staking", poiché i partecipanti hanno bloccato volontariamente gli ETH, mettendoli "in stake" per la possibilità di partecipare alla rete. Gli utenti che seguono le regole saranno ricompensati, mentre i tentativi di imbrogliare possono essere penalizzati.

Dal lancio del contratto di deposito dello staking nel novembre 2020, alcuni coraggiosi pionieri di Ethereum hanno bloccato volontariamente i fondi per attivare i "validatori", account speciali che hanno il diritto di attestare formalmente e proporre blocchi, seguendo le regole della rete.

Prima dell'aggiornamento Shanghai/Capella, non potevi usare o accedere ai tuoi ETH in staking. Ma ora, puoi scegliere di ricevere automaticamente le tue ricompense in un account scelto, e puoi anche prelevare i tuoi ETH in staking quando vuoi.

### Come mi preparo? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Avvisi importanti {#important-notices}

Fornire un indirizzo di prelievo è un passaggio obbligatorio per qualsiasi account del validatore prima che sia idoneo a prelevare ETH dal suo saldo.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**A ogni account del validatore può essere assegnato un solo indirizzo di prelievo, una sola volta.** Una volta scelto e inviato un indirizzo al livello di consenso, questo non può essere annullato o modificato di nuovo. Ricontrolla la proprietà e l'accuratezza dell'indirizzo fornito prima di inviarlo.
</AlertDescription>
</AlertContent>
</Alert>

Nel frattempo **non c'è alcuna minaccia per i tuoi fondi** se non lo fornisci, supponendo che la tua frase mnemonica/frase di recupero sia rimasta al sicuro offline e non sia stata compromessa in alcun modo. La mancata aggiunta delle credenziali di prelievo lascerà semplicemente gli ETH bloccati nell'account del validatore come è stato finché non viene fornito un indirizzo di prelievo.

## Validatori composti {#compounding-validators}

I validatori possono optare per la **composizione** (compounding) convertendo le loro credenziali di prelievo dal Tipo 1 al Tipo 2. Questo aumenta il saldo effettivo massimo da 32 ETH a **2048 ETH**, consentendo alle ricompense di comporsi nel saldo effettivo del validatore invece di essere prelevate automaticamente.

Con la composizione abilitata:

- Le ricompense aumentano il saldo effettivo del validatore con incrementi di 1 ETH (soggetto a un piccolo [buffer di isteresi](https://www.attestant.io/posts/understanding-validator-effective-balance/)), facendo guadagnare più ricompense nel tempo
- I prelievi automatici avvengono solo per il saldo che supera i 2048 ETH
- I prelievi parziali al di sotto della soglia di 2048 ETH devono essere attivati manualmente dal livello di esecuzione (questo costa gas)
- Più validatori possono essere **consolidati** in un singolo validatore composto, riducendo il carico operativo

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**La conversione delle credenziali di prelievo dal Tipo 1 al Tipo 2 è irreversibile.** Usa lo [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) come strumento ufficiale per questa conversione. Per maggiori dettagli sul processo di conversione, sui rischi e sul consolidamento, consulta l'[approfondimento su MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Uscire completamente dallo staking {#exiting-staking-entirely}

È necessario fornire un indirizzo di prelievo prima che _qualsiasi_ fondo possa essere trasferito fuori dal saldo di un account del validatore.

Gli utenti che desiderano uscire completamente dallo staking e prelevare l'intero saldo devono avviare un'"uscita volontaria". Questo può essere fatto in due modi:

- **Usando le chiavi del validatore**: Firma e trasmetti un messaggio di uscita volontaria con il tuo client del validatore, inviato al tuo nodo di consenso. Questo non richiede gas.
- **Usando le credenziali di prelievo**: Attiva un'uscita dal livello di esecuzione usando il tuo indirizzo di prelievo, senza bisogno di accedere alla chiave di firma del validatore. Questo richiede una transazione e costa gas.

Il processo di uscita di un validatore dallo staking richiede una quantità di tempo variabile, a seconda di quanti altri stanno uscendo contemporaneamente. Una volta completato, questo account non sarà più responsabile dell'esecuzione dei compiti di rete del validatore, non sarà più idoneo per le ricompense e non avrà più i suoi ETH "in stake". A questo punto l'account sarà contrassegnato come completamente "prelevabile".

Una volta che un account è contrassegnato come "prelevabile" e sono state fornite le credenziali di prelievo, non c'è nient'altro che un utente debba fare a parte aspettare. Gli account vengono automaticamente e continuamente controllati dai proponenti del blocco per i fondi usciti idonei, e il saldo del tuo account verrà trasferito per intero (noto anche come "prelievo completo") durante il prossimo <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>controllo (sweep)</a>.

## Quando sono stati abilitati i prelievi dello staking? {#when}

La funzionalità di prelievo è stata originariamente abilitata come parte dell'aggiornamento Shanghai/Capella il **12 aprile 2023**. L'[aggiornamento Pectra](/roadmap/pectra/) (maggio 2025) ha successivamente introdotto i validatori composti con un saldo effettivo massimo più elevato di 2048 ETH, oltre alle uscite attivate dal livello di esecuzione e ai prelievi parziali.

L'aggiornamento Shanghai/Capella ha permesso di recuperare gli ETH precedentemente in staking in normali account Ethereum. Questo ha chiuso il cerchio sulla liquidità dello staking e ha portato Ethereum un passo più vicino nel suo viaggio verso la costruzione di un ecosistema decentralizzato sostenibile, scalabile e sicuro.

- [Maggiori informazioni sulla storia di Ethereum](/ethereum-forks/)
- [Maggiori informazioni sul piano d'azione di Ethereum](/roadmap/)

## Come funzionano i pagamenti dei prelievi? {#how-do-withdrawals-work}

L'idoneità o meno di un determinato validatore a un prelievo è determinata dallo stato dell'account del validatore stesso. Non è necessario alcun input da parte dell'utente in nessun momento per determinare se un account debba avere un prelievo avviato o meno: l'intero processo viene eseguito automaticamente dal livello di consenso in un ciclo continuo.

### Preferisci imparare visivamente? {#visual-learner}

Dai un'occhiata a questa spiegazione sui prelievi dello staking di Ethereum di Finematics:

<YouTube id="RwwU3P9n3uo" />

### "Controllo" (sweeping) dei validatori {#validator-sweeping}

Quando un validatore è programmato per proporre il blocco successivo, è tenuto a costruire una coda di prelievo, fino a 16 prelievi idonei. Questo viene fatto partendo originariamente dall'indice del validatore 0, determinando se c'è un prelievo idoneo per questo account secondo le regole del protocollo, e aggiungendolo alla coda se c'è. Il validatore impostato per proporre il blocco successivo riprenderà da dove si era interrotto l'ultimo, procedendo in ordine indefinitamente.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Pensa a un orologio analogico. La lancetta dell'orologio indica l'ora, avanza in una direzione, non salta nessuna ora e alla fine torna all'inizio dopo aver raggiunto l'ultimo numero.

Ora, invece che da 1 a 12, immagina che l'orologio vada da 0 a N _(il numero totale di account del validatore che sono mai stati registrati sul livello di consenso, oltre 500.000 a gennaio 2023)._

La lancetta dell'orologio indica il validatore successivo che deve essere controllato per i prelievi idonei. Inizia da 0 e procede per tutto il giro senza saltare alcun account. Quando viene raggiunto l'ultimo validatore, il ciclo ricomincia dall'inizio.
</AlertDescription>
</AlertContent>
</Alert>

#### Controllare un account per i prelievi {#checking-an-account-for-withdrawals}

Mentre un proponente sta controllando i validatori per possibili prelievi, ogni validatore controllato viene valutato in base a una breve serie di domande per determinare se debba essere attivato un prelievo e, in tal caso, quanti ETH debbano essere prelevati.

1. **È stato fornito un indirizzo di prelievo?** Se non è stato fornito alcun indirizzo di prelievo, l'account viene saltato e non viene avviato alcun prelievo.
2. **Il validatore è uscito ed è prelevabile?** Se il validatore è uscito completamente e abbiamo raggiunto l'epoca in cui il suo account è considerato "prelevabile", verrà elaborato un prelievo completo. Questo trasferirà l'intero saldo rimanente all'indirizzo di prelievo.
3. **Il saldo supera il saldo effettivo massimo?** Per i validatori legacy (Tipo 1), questa soglia è di 32 ETH. Per i validatori composti (Tipo 2), questa soglia è di 2048 ETH. Se l'account ha le credenziali di prelievo, non è uscito completamente e ha un saldo superiore alla sua soglia, verrà elaborato un prelievo parziale che trasferisce solo l'eccesso all'indirizzo di prelievo dell'utente.

Ci sono solo due azioni intraprese dagli operatori dei validatori nel corso del ciclo di vita di un validatore che influenzano direttamente questo flusso:

- Fornire le credenziali di prelievo per abilitare qualsiasi forma di prelievo
- Uscire dalla rete, il che attiverà un prelievo completo

### Senza gas {#gas-free}

I controlli automatici dei prelievi non richiedono agli staker di inviare manualmente una transazione. Ciò significa che **non è richiesto alcun gas (commissione della transazione)** per i controlli automatici e non competono per lo spazio dei blocchi esistente sul livello di esecuzione.

Nota che i [validatori composti](#compounding-validators) che desiderano attivare un prelievo parziale al di sotto della soglia di 2048 ETH devono farlo manualmente dal livello di esecuzione, il che richiede gas.

### Con quale frequenza riceverò le mie ricompense di staking? {#how-soon}

In un singolo blocco possono essere elaborati al massimo 16 prelievi. A questo ritmo, possono essere elaborati 115.200 prelievi di validatori al giorno (supponendo che non ci siano slot persi). Come notato sopra, i validatori senza prelievi idonei verranno saltati, diminuendo il tempo per completare il controllo.

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
eventAction="Una volta fornito un indirizzo di prelievo, posso cambiarlo con un indirizzo di prelievo alternativo?"
eventName="read more">
No, il processo per fornire le credenziali di prelievo è un processo una tantum e non può essere modificato una volta inviato.
</ExpandableCard>

<ExpandableCard
title="Perché un indirizzo di prelievo può essere impostato solo una volta?"
eventCategory="FAQ"
eventAction="Perché un indirizzo di prelievo può essere impostato solo una volta?"
eventName="read more">
Impostando un indirizzo di prelievo del livello di esecuzione, le credenziali di prelievo per quel validatore sono state modificate in modo permanente. Ciò significa che le vecchie credenziali non funzioneranno più e le nuove credenziali indirizzano a un account del livello di esecuzione.

Gli indirizzi di prelievo possono essere un contratto intelligente (controllato dal suo codice) o un account controllato esternamente (EOA, controllato dalla sua chiave privata). Attualmente questi account non hanno modo di comunicare un messaggio al livello di consenso che segnali un cambio delle credenziali del validatore, e l'aggiunta di questa funzionalità aggiungerebbe un'inutile complessità al protocollo.

In alternativa alla modifica dell'indirizzo di prelievo per un particolare validatore, gli utenti possono scegliere di impostare un contratto intelligente come indirizzo di prelievo che potrebbe gestire la rotazione delle chiavi, come un Safe. Gli utenti che impostano i propri fondi sul proprio EOA possono eseguire un'uscita completa per prelevare tutti i fondi in staking e quindi rimetterli in staking utilizzando nuove credenziali.
</ExpandableCard>

<ExpandableCard
title="E se partecipo ai token di staking o al pool di staking?"
eventCategory="FAQ"
eventAction="E se partecipo ai token di staking o al pool di staking?"
eventName="read more">

Se fai parte di un [pool di staking](/staking/pools/) o detieni token di staking, dovresti verificare con il tuo fornitore maggiori dettagli su come vengono gestiti i prelievi dello staking, poiché ogni servizio opera in modo diverso.

In generale, gli utenti dovrebbero essere liberi di recuperare i propri ETH sottostanti in staking o di cambiare il fornitore di staking che utilizzano. Se un particolare pool sta diventando troppo grande, i fondi possono essere ritirati, riscattati e rimessi in staking con un [fornitore più piccolo](https://rated.network/). Oppure, se hai accumulato abbastanza ETH, potresti fare [staking da casa](/staking/solo/).

In generale, gli utenti dovrebbero essere liberi di reclamare i propri ETH sottostanti in staking o di cambiare il fornitore di staking che utilizzano. Se un particolare pool sta diventando troppo grande, i fondi possono essere ritirati, riscattati e rimessi in staking con un <a href="https://rated.network/">fornitore più piccolo</a>. Oppure, se hai accumulato abbastanza ETH potresti fare [staking da casa](/staking/solo/).
</ExpandableCard>

<ExpandableCard
title="I pagamenti delle ricompense (prelievi parziali) avvengono automaticamente?"
eventCategory="FAQ"
eventAction="I pagamenti delle ricompense (prelievi parziali) avvengono automaticamente?"
eventName="read more">
Per i **validatori legacy (Tipo 1)**, sì, a patto che il tuo validatore abbia fornito un indirizzo di prelievo. Questo deve essere fornito una volta per abilitare inizialmente qualsiasi prelievo, dopodiché i pagamenti delle ricompense verranno attivati automaticamente ogni pochi giorni con ogni controllo del validatore.

Per i **validatori composti (Tipo 2)**, le ricompense si compongono nel saldo effettivo piuttosto che essere prelevate. I prelievi automatici avvengono solo per il saldo che supera i 2048 ETH. Per prelevare le ricompense al di sotto di questa soglia, devi attivare manualmente un prelievo parziale dal livello di esecuzione.
</ExpandableCard>

<ExpandableCard
title="I prelievi completi avvengono automaticamente?"
eventCategory="FAQ"
eventAction="I prelievi completi avvengono automaticamente?"
eventName="read more">

No, se il tuo validatore è ancora attivo sulla rete, un prelievo completo non avverrà automaticamente. Questo richiede l'avvio manuale di un'uscita volontaria.

Una volta che un validatore ha completato il processo di uscita, e supponendo che l'account abbia le credenziali di prelievo, il saldo rimanente verrà _quindi_ prelevato durante il prossimo <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "FAQ happen automatically (sweep)", eventName: "click" }}>controllo del validatore</a>.

Una volta che un validatore ha completato il processo di uscita, e supponendo che l'account abbia le credenziali di prelievo, il saldo rimanente verrà <em>quindi</em> prelevato durante il prossimo <a href="#validator-sweeping">sweep del validatore</a>.
</ExpandableCard>

<ExpandableCard title="Posso prelevare un importo personalizzato?"
eventCategory="FAQ"
eventAction="Posso prelevare un importo personalizzato?"
eventName="read more">
Per i **validatori legacy (Tipo 1)**, i prelievi vengono inviati automaticamente, trasferendo qualsiasi ETH che non contribuisce attivamente allo stake. Questo include i saldi completi per gli account che hanno completato il processo di uscita. Non è possibile richiedere manualmente il prelievo di importi specifici di ETH per i validatori di Tipo 1.

I **validatori composti (Tipo 2)** possono attivare prelievi parziali di un importo specifico dal livello di esecuzione, a condizione che il saldo rimanente rimanga pari o superiore a 32 ETH. Questo richiede una transazione e costa gas.
</ExpandableCard>

<ExpandableCard
title="Gestisco un validatore. Dove posso trovare maggiori informazioni sull'abilitazione dei prelievi?"
eventCategory="FAQ"
eventAction="Gestisco un validatore. Dove posso trovare maggiori informazioni sull'abilitazione dei prelievi?"
eventName="read more">

Si consiglia agli operatori dei validatori di visitare la pagina [Prelievi dello Staking Launchpad](https://launchpad.ethereum.org/withdrawals/) dove troveranno maggiori dettagli su come preparare il proprio validatore per i prelievi, le tempistiche degli eventi e maggiori dettagli su come funzionano i prelievi.

Per provare prima la tua configurazione su una rete di test, visita l'[Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org) per iniziare.

Per provare prima la tua configurazione su una rete di test, visita l'<a href="https://hoodi.launchpad.ethereum.org">Hoodi Testnet Staking Launchpad</a> per iniziare.
</ExpandableCard>

<ExpandableCard
title="Posso riattivare il mio validatore dopo essere uscito depositando altri ETH?"
eventCategory="FAQ"
eventAction="Posso riattivare il mio validatore dopo essere uscito depositando altri ETH?"
eventName="read more">
No. Una volta che un validatore è uscito e il suo intero saldo è stato prelevato, eventuali fondi aggiuntivi depositati su quel validatore verranno automaticamente trasferiti all'indirizzo di prelievo durante il successivo controllo del validatore. Per rimettere in staking gli ETH, deve essere attivato un nuovo validatore.
</ExpandableCard>

<ExpandableCard
title="Qual è la differenza tra i validatori legacy e quelli composti?"
eventCategory="FAQ"
eventAction="Qual è la differenza tra i validatori legacy e quelli composti?"
eventName="read more">
I validatori legacy usano le credenziali di prelievo di **Tipo 1** e hanno un saldo effettivo limitato a 32 ETH. Qualsiasi eccesso viene automaticamente prelevato all'indirizzo di prelievo ogni pochi giorni.

I validatori composti usano le credenziali di prelievo di **Tipo 2** e possono avere un saldo effettivo fino a 2048 ETH. Le ricompense si compongono nel loro saldo effettivo, aumentando il peso del validatore sulla rete e le ricompense future. I prelievi automatici avvengono solo per il saldo che supera i 2048 ETH. Per prelevare al di sotto di questa soglia, deve essere attivato un prelievo parziale manuale dal livello di esecuzione.

Per maggiori dettagli, consulta l'[approfondimento su MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="Come mi converto in un validatore composto?"
eventCategory="FAQ"
eventAction="Come mi converto in un validatore composto?"
eventName="read more">
Puoi convertire le credenziali di prelievo dal Tipo 1 al Tipo 2 usando lo [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Questa operazione è **irreversibile**: una volta convertito, non puoi tornare alle credenziali di Tipo 1.

Dopo la conversione, puoi anche **consolidare** più validatori in uno solo, combinando i loro saldi in un singolo validatore composto. Per una guida completa al processo di conversione, ai rischi e agli strumenti di consolidamento, consulta l'[approfondimento su MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

## Letture consigliate {#further-reading}

- [Prelievi dello Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Azioni del validatore dello Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Approfondimento su MaxEB: composizione e consolidamento](/roadmap/pectra/maxeb/)
- [EIP-4895: Prelievi push della Beacon chain come operazioni](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Prelievo di ETH in staking (Test) con Potuz e Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Prelievi push della Beacon chain come operazioni con Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Comprendere il saldo effettivo del validatore](https://www.attestant.io/posts/understanding-validator-effective-balance/)
