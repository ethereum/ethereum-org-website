---
title: Prelievi dello staking
description: Pagina che riassume cosa sono i prelievi push dello staking, come funzionano e cosa devono fare gli staker per ottenere le loro ricompense
lang: it
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Il rinoceronte Leslie con le sue ricompense di staking
sidebarDepth: 2
summaryPoints:
  - L'aggiornamento Shanghai/Capella ha abilitato i prelievi dello staking su Ethereum
  - Gli operatori dei validatori devono fornire un indirizzo di prelievo per abilitarli
  - Le ricompense vengono distribuite automaticamente ogni pochi giorni
  - I validatori che escono completamente dallo staking riceveranno il loro saldo rimanente
---

I **prelievi dello staking** si riferiscono ai trasferimenti di ETH da un account del validatore sul livello di consenso di Ethereum (la beacon chain), al livello di esecuzione dove possono essere transati.

I **pagamenti delle ricompense del saldo in eccesso** oltre i 32 ETH verranno inviati automaticamente e regolarmente a un indirizzo di prelievo collegato a ciascun validatore, una volta fornito dall'utente. Gli utenti possono anche **uscire completamente dallo staking**, sbloccando l'intero saldo del loro validatore.

## Ricompense dello staking {#staking-rewards}

I pagamenti delle ricompense vengono elaborati automaticamente per gli account dei validatori attivi con un saldo effettivo massimo di 32 ETH.

Qualsiasi saldo superiore a 32 ETH guadagnato tramite le ricompense non contribuisce in realtà al capitale, né aumenta il peso di questo validatore sulla rete, ed è quindi prelevato automaticamente come pagamento della ricompensa ogni pochi giorni. A parte fornire un indirizzo di prelievo una volta, queste ricompense non richiedono alcuna azione da parte dell'operatore del validatore. Tutto questo viene avviato sul livello di consenso, quindi non è richiesto alcun gas (commissione della transazione) in nessuna fase.

### Come siamo arrivati fin qui? {#how-did-we-get-here}

Negli ultimi anni [Ethereum](/) ha subito diversi aggiornamenti di rete passando a una rete protetta dall'ETH stesso, invece che dal mining ad alta intensità energetica come era una volta. La partecipazione al consenso su Ethereum è ora nota come "staking", poiché i partecipanti hanno bloccato volontariamente i propri ETH, mettendoli "in stake" per la possibilità di partecipare alla rete. Gli utenti che seguono le regole verranno ricompensati, mentre i tentativi di imbrogliare possono essere penalizzati.

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
  <strong>A ogni account del validatore può essere assegnato un solo indirizzo di prelievo, una sola volta.</strong> Una volta scelto e inviato un indirizzo al livello di consenso, questo non può essere annullato o modificato di nuovo. Ricontrolla la proprietà e l'accuratezza dell'indirizzo fornito prima di inviarlo.
</AlertDescription>
</AlertContent>
</Alert>

Nel frattempo <strong>non c'è alcuna minaccia per i tuoi fondi</strong> se non lo fornisci, supponendo che la tua frase mnemonica/frase di recupero sia rimasta al sicuro offline e non sia stata compromessa in alcun modo. La mancata aggiunta delle credenziali di prelievo lascerà semplicemente gli ETH bloccati nell'account del validatore come è stato finché non viene fornito un indirizzo di prelievo.

## Uscire completamente dallo staking {#exiting-staking-entirely}

È necessario fornire un indirizzo di prelievo prima che _qualsiasi_ fondo possa essere trasferito fuori dal saldo di un account del validatore.

Gli utenti che desiderano uscire completamente dallo staking e prelevare l'intero saldo devono anche firmare e trasmettere un messaggio di "uscita volontaria" con le chiavi del validatore che avvierà il processo di uscita dallo staking. Questo viene fatto con il tuo client del validatore e inviato al tuo nodo di consenso, e non richiede gas.

Il processo di uscita di un validatore dallo staking richiede una quantità di tempo variabile, a seconda di quanti altri stanno uscendo contemporaneamente. Una volta completato, questo account non sarà più responsabile dell'esecuzione dei compiti di rete del validatore, non sarà più idoneo per le ricompense e non avrà più i propri ETH "in stake". A questo punto l'account verrà contrassegnato come completamente "prelevabile".

Una volta che un account è contrassegnato come "prelevabile" e sono state fornite le credenziali di prelievo, non c'è nient'altro che un utente debba fare a parte aspettare. Gli account vengono automaticamente e continuamente spazzati (swept) dai proponenti del blocco per i fondi usciti idonei, e il saldo del tuo account verrà trasferito per intero (noto anche come "prelievo completo") durante il prossimo <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>sweep</a>.

## Quando sono stati abilitati i prelievi dello staking? {#when}

La funzionalità di prelievo è stata abilitata come parte dell'aggiornamento Shanghai/Capella avvenuto il **12 aprile 2023**.

L'aggiornamento Shanghai/Capella ha consentito di recuperare gli ETH precedentemente in staking in normali account Ethereum. Questo ha chiuso il cerchio sulla liquidità dello staking e ha portato Ethereum un passo più vicino nel suo viaggio verso la costruzione di un ecosistema decentralizzato sostenibile, scalabile e sicuro.

- [Maggiori informazioni sulla storia di Ethereum](/ethereum-forks/)
- [Maggiori informazioni sul piano d'azione di Ethereum](/roadmap/)

## Come funzionano i pagamenti dei prelievi? {#how-do-withdrawals-work}

Se un determinato validatore è idoneo o meno per un prelievo è determinato dallo stato dell'account del validatore stesso. Non è necessario alcun input da parte dell'utente in nessun momento per determinare se un account debba avere un prelievo avviato o meno: l'intero processo viene eseguito automaticamente dal livello di consenso in un ciclo continuo.

### Preferisci imparare visivamente? {#visual-learner}

Dai un'occhiata a questa spiegazione sui prelievi dello staking di Ethereum di Finematics:

<YouTube id="RwwU3P9n3uo" />

### Lo "sweep" dei validatori {#validator-sweeping}

Quando un validatore è programmato per proporre il blocco successivo, è tenuto a creare una coda di prelievo, fino a 16 prelievi idonei. Questo viene fatto partendo originariamente dall'indice del validatore 0, determinando se c'è un prelievo idoneo per questo account secondo le regole del protocollo, e aggiungendolo alla coda se c'è. Il validatore impostato per proporre il blocco successivo riprenderà da dove si era interrotto l'ultimo, procedendo in ordine indefinitamente.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Pensa a un orologio analogico. La lancetta dell'orologio indica l'ora, avanza in una direzione, non salta nessuna ora e alla fine torna all'inizio dopo aver raggiunto l'ultimo numero.<br/><br/>
Ora, invece che da 1 a 12, immagina che l'orologio abbia da 0 a N <em>(il numero totale di account dei validatori che sono mai stati registrati sul livello di consenso, oltre 500.000 a gennaio 2023).</em><br/><br/>
La lancetta dell'orologio indica il validatore successivo che deve essere controllato per i prelievi idonei. Inizia da 0 e procede per tutto il giro senza saltare alcun account. Quando viene raggiunto l'ultimo validatore, il ciclo ricomincia dall'inizio.
</AlertDescription>
</AlertContent>
</Alert>

#### Controllo di un account per i prelievi {#checking-an-account-for-withdrawals}

Mentre un proponente sta eseguendo lo sweep tra i validatori per possibili prelievi, ogni validatore controllato viene valutato in base a una breve serie di domande per determinare se debba essere attivato un prelievo e, in tal caso, quanti ETH debbano essere prelevati.

1. **È stato fornito un indirizzo di prelievo?** Se non è stato fornito alcun indirizzo di prelievo, l'account viene saltato e non viene avviato alcun prelievo.
2. **Il validatore è uscito ed è prelevabile?** Se il validatore è uscito completamente e abbiamo raggiunto l'epoca in cui il suo account è considerato "prelevabile", verrà elaborato un prelievo completo. Questo trasferirà l'intero saldo rimanente all'indirizzo di prelievo.
3. **Il saldo effettivo ha raggiunto il massimo di 32?** Se l'account ha le credenziali di prelievo, non è uscito completamente e ha ricompense superiori a 32 in attesa, verrà elaborato un prelievo parziale che trasferisce solo le ricompense superiori a 32 all'indirizzo di prelievo dell'utente.

Ci sono solo due azioni intraprese dagli operatori dei validatori nel corso del ciclo di vita di un validatore che influenzano direttamente questo flusso:

- Fornire le credenziali di prelievo per abilitare qualsiasi forma di prelievo
- Uscire dalla rete, il che attiverà un prelievo completo

### Senza gas {#gas-free}

Questo approccio ai prelievi dello staking evita di richiedere agli staker di inviare manualmente una transazione che richiede il prelievo di una determinata quantità di ETH. Ciò significa che **non è richiesto alcun gas (commissione della transazione)** e i prelievi non competono per lo spazio dei blocchi del livello di esecuzione esistente.

### Con quale frequenza riceverò le mie ricompense di staking? {#how-soon}

In un singolo blocco possono essere elaborati al massimo 16 prelievi. A questo ritmo, possono essere elaborati 115.200 prelievi di validatori al giorno (supponendo che non ci siano slot persi). Come notato sopra, i validatori senza prelievi idonei verranno saltati, riducendo il tempo per completare lo sweep.

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
title="Perché un indirizzo di prelievo può essere impostato solo una volta?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Impostando un indirizzo di prelievo del livello di esecuzione, le credenziali di prelievo per quel validatore sono state modificate in modo permanente. Ciò significa che le vecchie credenziali non funzioneranno più e le nuove credenziali indirizzano a un account del livello di esecuzione.

Gli indirizzi di prelievo possono essere un contratto intelligente (controllato dal suo codice) o un account controllato esternamente (EOA, controllato dalla sua chiave privata). Attualmente questi account non hanno modo di comunicare un messaggio al livello di consenso che segnalerebbe un cambio delle credenziali del validatore, e l'aggiunta di questa funzionalità aggiungerebbe un'inutile complessità al protocollo.

In alternativa alla modifica dell'indirizzo di prelievo per un particolare validatore, gli utenti possono scegliere di impostare un contratto intelligente come indirizzo di prelievo che potrebbe gestire la rotazione delle chiavi, come un Safe. Gli utenti che impostano i propri fondi sul proprio EOA possono eseguire un'uscita completa per prelevare tutti i propri fondi in staking, e quindi rimetterli in staking utilizzando nuove credenziali.
</ExpandableCard>

<ExpandableCard
title="Cosa succede se uso token di staking o un pool di staking?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Se fai parte di un [pool di staking](/staking/pools/) o detieni token di staking, dovresti verificare con il tuo fornitore per maggiori dettagli su come vengono gestiti i prelievi dello staking, poiché ogni servizio opera in modo diverso.

In generale, gli utenti dovrebbero essere liberi di reclamare i propri ETH sottostanti in staking o di cambiare il fornitore di staking che utilizzano. Se un particolare pool sta diventando troppo grande, i fondi possono essere ritirati, riscattati e rimessi in staking con un <a href="https://rated.network/">fornitore più piccolo</a>. Oppure, se hai accumulato abbastanza ETH potresti fare [staking da casa](/staking/solo/).
</ExpandableCard>

<ExpandableCard
title="I pagamenti delle ricompense (prelievi parziali) avvengono automaticamente?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Sì, a patto che il tuo validatore abbia fornito un indirizzo di prelievo. Questo deve essere fornito una volta per abilitare inizialmente qualsiasi prelievo, dopodiché i pagamenti delle ricompense verranno attivati automaticamente ogni pochi giorni con ogni sweep del validatore.
</ExpandableCard>

<ExpandableCard
title="I prelievi completi avvengono automaticamente?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

No, se il tuo validatore è ancora attivo sulla rete, un prelievo completo non avverrà automaticamente. Questo richiede l'avvio manuale di un'uscita volontaria.

Una volta che un validatore ha completato il processo di uscita, e supponendo che l'account abbia le credenziali di prelievo, il saldo rimanente verrà <em>quindi</em> prelevato durante il prossimo <a href="#validator-sweeping">sweep del validatore</a>.
</ExpandableCard>

<ExpandableCard title="Posso prelevare un importo personalizzato?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
I prelievi sono progettati per essere inviati (pushed) automaticamente, trasferendo qualsiasi ETH che non contribuisce attivamente allo stake. Questo include i saldi completi per gli account che hanno completato il processo di uscita.

Non è possibile richiedere manualmente il prelievo di importi specifici di ETH.
</ExpandableCard>

<ExpandableCard
title="Gestisco un validatore. Dove posso trovare maggiori informazioni sull'abilitazione dei prelievi?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Si consiglia agli operatori dei validatori di visitare la pagina <a href="https://launchpad.ethereum.org/withdrawals/">Staking Launchpad Withdrawals</a> dove troverai maggiori dettagli su come preparare il tuo validatore per i prelievi, le tempistiche degli eventi e maggiori dettagli su come funzionano i prelievi.

Per provare prima la tua configurazione su una rete di test, visita l'<a href="https://hoodi.launchpad.ethereum.org">Hoodi Testnet Staking Launchpad</a> per iniziare.
</ExpandableCard>

<ExpandableCard
title="Posso riattivare il mio validatore dopo essere uscito depositando altri ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
No. Una volta che un validatore è uscito e il suo intero saldo è stato prelevato, eventuali fondi aggiuntivi depositati su quel validatore verranno automaticamente trasferiti all'indirizzo di prelievo durante il prossimo sweep del validatore. Per rimettere in staking gli ETH, deve essere attivato un nuovo validatore.
</ExpandableCard>

## Letture consigliate {#further-reading}

- [Staking Launchpad Withdrawals](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: Beacon chain push withdrawals as operations](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Staked ETH Withdrawal (Testing) with Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Beacon chain push withdrawals as operations with Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Understanding Validator Effective Balance](https://www.attestant.io/posts/understanding-validator-effective-balance/)