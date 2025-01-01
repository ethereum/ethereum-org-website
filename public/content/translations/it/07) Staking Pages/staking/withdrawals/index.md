---
title: Prelievi di staking
description: Pagina di riepilogo su cosa sono i prelievi push di staking, come funzionano e cosa devono fare gli staker per ottenere le proprie ricompense
lang: it
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie il rinoceronte con le sue ricompense di staking
sidebarDepth: 2
summaryPoints:
  - L'aggiornamento di Shanghai/Capella ha reso possibili i prelievi di staking su Ethereum
  - Gli operatori del validatore devono fornire un indirizzo di prelievo per consentirli
  - Le ricompense sono distribuite automaticamente a intervalli di pochi giorni
  - I validatori che escono interamente dallo staking riceveranno il saldo rimanente
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
I prelievi di staking sono stati resi possibili con l'aggiornamento di Shanghai/Capella, verificatosi il 12 aprile 2023.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Ulteriori informazioni su Shanghai/Capella</a>
</UpgradeStatus>

I **prelievi di staking** si riferiscono ai trasferimenti di ETH dal conto di un validatore sul livello di consenso di Ethereum (la Beacon Chain) al livello d'esecuzione in cui possono essere spostati.

I **pagamenti di ricompense dei saldi in eccesso** rispetto ai 32 ETH saranno inviati automaticamente e regolarmente a un indirizzo di prelievo collegato a ogni validatore, una volta fornito dall'utente. Gli utenti, inoltre, possono **uscire interamente dallo staking**, sbloccando il proprio intero saldo del validatore.

## Ricompense di staking {#staking-rewards}

I pagamenti delle ricompense sono elaborati automaticamente per i conti dei validatori attivi con un saldo effettivo massimizzato di 32 ETH.

Qualsiasi saldo superiore a 32 ETH guadagnato tramite le ricompense non contribuisce effettivamente al capitale, né aumenta il peso di tale validatore sulla rete, pertanto è prelevato automaticamente come pagamento di una ricompensa a intervalli di pochi giorni. A parte fornire un indirizzo di prelievo una tantum, queste ricompense non richiedono alcuna azione da parte dell'operatore del validatore. Tutto questo è avviato sul livello di consenso, dunque non è necessario alcun carburante (commissione di transazione) in nessun passaggio.

### Come siamo arrivati qui? {#how-did-we-get-here}

Negli ultimi anni, Ethereum ha subito diversi aggiornamenti della rete, passando a una rete protetta dagli stessi ETH invece che dall'elevato consumo derivato dal mining, com'era in passato. La partecipazione al consenso su Ethereum è nota come "staking", poiché i partecipanti bloccano volontariamente gli ETH, mettendoli "a disposizione" ("at stake", in inglese) per poter partecipare alla rete. Gli utenti che seguono le regole saranno ricompensati, mentre i tentativi di barare saranno penalizzati.

Dal lancio del contratto di deposito di staking a novembre 2020, alcuni coraggiosi pionieri di Ethereum hanno volontariamente bloccato i propri fondi per attivare i "validatori", conti speciali aventi il diritto di attestare formalmente e proporre blocchi, seguendo le regole della rete.

Prima dell'aggiornamento di Shanghai/Capella, non era possibile utilizzare i propri ETH in staking o accedervi. Ma ora, puoi optare per ricevere automaticamente le tue ricompense in un determinato conto e, inoltre, puoi prelevare i tuoi ETH in staking quando preferisci.

### Come mi preparo? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Avvisi importanti {#important-notices}

Fornire un indirizzo di prelievo è un passaggio necessario per qualsiasi conto del validatore affinché sia idoneo per il prelievo di ETH dal suo saldo.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Ogni account validatore è assegnabile esclusivamente a un singolo indirizzo di prelievo, una sola volta.</strong> Una volta che un indirizzo è scelto e inviato al livello del consenso, ciò non è annullabile o nuovamente modificabile. Ricontrolla la proprietà e l'accuratezza dell'indirizzo fornito prima di inviarlo.
</InfoBanner>

<strong>Nel mentre, non esiste alcuna minaccia ai tuoi fondi</strong> per non averlo fornito, supponendo che la tua frase mnemonica/di seed sia rimasta al sicuro offline e non sia stata compromessa in alcun modo. La mancata aggiunta delle credenziali di prelievo lascerà semplicemente gli ETH bloccati nel conto del validatore finché non sarà fornito un indirizzo di prelievo.

## Uscire interamente dallo staking {#exiting-staking-entirely}

Fornire un indirizzo di prelievo è necessario prima che _qualsiasi_ fondo possa esser trasferito all'esterno del saldo di un conto del validatore.

Gli utenti che desiderano uscire interamente dallo staking, prelevando il proprio intero saldo, devono inoltre firmare e trasmettere un messaggio di "uscita volontaria" con le chiavi del validatore, avviando così il procedimento di uscita dallo staking. Ciò avviene con il tuo client validatore inviato al tuo nodo del consenso e non richiede gas.

Il processo di uscita di un validatore dallo staking richiede periodi di tempo variabili, a seconda di quanti altri stanno uscendo contemporaneamente. Una volta completato, questo conto non sarà più responsabile dell'esecuzione dei doveri della rete dei validatori e non sarà più idoneo per ricevere ricompense, né avrà i propri ETH "in staking". A questo punto, il conto sarà contrassegnato come interamente "prelevabile".

Una volta che un conto è contrassegnato come "prelevabile", e le credenziali sono state fornite, un utente non deve fare altro che aspettare. I conti sono ripuliti automaticamente e continuamente dai propositori di blocchi per verificare la presenza di fondi in uscita idonei e il saldo del tuo conto sarà trasferito interamente (anche noto come "prelievo completo") durante la successiva <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>pulizia</a>.

## Quando saranno abilitati i prelievi di staking? {#when}

I prelievi di staking sono già operativi! La funzionalità di prelievo è stata abilitata come parte dell'aggiornamento di Shanghai/Capella, verificatosi il 12 aprile 2023.

L'aggiornamento di Shanghai/Capella ha consentito di rivendicare gli ETH precedentemente messi in staking, in conti regolari di Ethereum. Ciò ha chiuso il ciclo della liquidità di staking e ha portato Ethereum un passo più avanti nel suo percorso per la costruzione di un ecosistema decentralizzato sostenibile, scalabile e sicuro.

- [Maggiori informazioni sulla storia di Ethereum](/history/)
- [Maggiori informazioni sulla tabella di marcia di Ethereum](/roadmap/)

## Come funzionano i pagamenti dei prelievi? {#how-do-withdrawals-work}

Che un dato validatore sia o meno idoneo per un prelievo è determinato dallo stato del conto del validatore stesso. Nessun input dell'utente, in alcun dato momento, è necessario per determinare se un conto dovrebbe avviare o meno un prelievo; l'intero processo è effettuato automaticamente dal livello di consenso in un ciclo continuo.

### Preferisci un approccio visivo all'apprendimento? {#visual-learner}

Dai un'occhiata a questa spiegazione dei prelievi di staking di Ethereum, di Finematics:

<YouTube id="RwwU3P9n3uo" />

### "Pulizia" dei validatori {#validator-sweeping}

Quando è pianificato che un validatore proponga il prossimo blocco, è necessario costruire una coda di prelievo, composta da un massimo di 16 prelievi idonei. Ciò avviene iniziando originariamente dall'indice 0 del validatore, determinando se esista un prelievo idoneo per questo conto secondo le regole del protocollo e, in tal caso, aggiungendolo alla coda. Il validatore impostato per proporre il blocco successivo riprenderà da dove si è fermato il precedente, procedendo indefinitamente in ordine.

<InfoBanner emoji="🕛">
Pensa a un orologio analogico. La lancetta dell'orologio indica l'ora, si muove in una direzione, non salta alcuna ora e, infine, torna nuovamente all'inizio, dopo aver raggiunto l'ultimo numero.<br/><br/>
Ora, invece che da 1 a 12, immagina che l'orologio vada da 0 a N <em>(il numero totale di account validatore registrati sul livello del consenso, oltre 500.000 a gennaio 2023).</em><br/><br/>
La lancetta dell'orologio punta al validatore successivo, che dev'essere controllato per verificare la presenza di prelievi idonei. Inizia a 0 e procede controllando tutti i conti, senza saltarne nessuno. Quando viene raggiunto l'ultimo validatore, il ciclo continua ricominciando dall'inizio.
</InfoBanner>

#### Verificare un conto per i prelievi {#checking-an-account-for-withdrawals}

Mentre un propositore controlla i validatori per i possibili prelievi, ogni validatore verificato è valutato rispetto a una breve serie di domande per determinare se dovrebbe essere innescato un prelievo e, in tal caso, quanti ETH dovrebbero essere prelevati.

1. **È stato fornito un indirizzo di prelievo?** Se non è stato fornito alcun indirizzo di prelievo, il conto viene saltato e non viene avviato alcun prelievo.
2. **Il validatore è uscito ed è idoneo al prelievo?** Se il validatore è uscito interamente e abbiamo ricevuto l'epoca in cui tale conto è considerato come "prelevabile", sarà elaborato un prelievo completo. Questo, trasferirà l'intero saldo rimanente all'indirizzo di prelievo.
3. **Il saldo effettivo è massimizzato a 32?** Se il conto ha le credenziali di prelievo, non è interamente uscito e ha ricompense superiori a 32 in attesa, sarà elaborato un prelievo parziale, che trasferirà esclusivamente le ricompense superiori a 32 all'indirizzo di prelievo dell'utente.

Esistono solo due azioni intraprese dagli operatori del validatore durante il ciclo di vita di un validatore che influenzano direttamente tale flusso:

- Fornire le credenziali di prelievo per consentire qualsiasi forma di prelievo
- Uscire dalla rete, innescando un prelievo completo

### Zero carburante {#gas-free}

Questo approccio ai prelievi di staking evita di richiedere agli staker di inviare manualmente una transazione richiedendo un importo particolare di ETH da prelevare. Ciò significa che **non è necessario alcun carburante (commissione di transazione)** e che il prelievo non compete per lo spazio del blocco del livello d'esecuzione esistente.

### Con quale frequenza riceverò le mie ricompense di staking? {#how-soon}

In un unico blocco può essere elaborato un massimo di 16 prelievi. A tale frequenza, possono essere elaborati 115.200 validatori al giorno (supponendo che non vi sia alcuno slot mancante). Come indicato in precedenza, i validatori privi di prelievi idonei saranno saltati, riducendo il tempo necessario per terminare la pulizia.

Espandendo tale calcolo, possiamo stimare il tempo necessario a elaborare un dato numero di prelievi:

<TableContainer>

| Numero di prelievi | Tempo di completamento |
| :-------------------: | :--------------: |
|        400.000        |     3,5 giorni     |
|        500.000        |     4,3 giorni     |
|        600.000        |     5,2 giorni     |
|        700.000        |     6,1 giorni     |
|        800.000        |     7,0 giorni     |

</TableContainer>

Come vedi, la frequenza rallenta con l'aumento dei validatori sulla rete. Un aumento degli slot mancanti potrebbe rallentarla proporzionalmente, ma questo rappresenta generalmente il lato più lento dei possibili risultati.

## Domande frequenti {#faq}

<ExpandableCard
title="Una volta fornito un indirizzo di prelievo, posso modificarlo con un altro indirizzo di prelievo?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
No, il processo per fornire le credenziali di prelievo è una tantum e queste non sono modificabili una volta inviate.
</ExpandableCard>

<ExpandableCard
title="Perché un indirizzo di prelievo è impostabile solo una volta?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Impostando un indirizzo di prelievo del livello d'esecuzione, le credenziali di prelievo per quel validatore sono state cambiate permanentemente. Ciò significa che le vecchie credenziali non funzioneranno più e che le nuove credenziali dirigono a un conto del livello d'esecuzione.

Gli indirizzi di prelievo possono essere un contratto intelligente (controllato dal suo codice) o un conto posseduto esternamente (EOA, controllato dalla sua chiave privata). Attualmente questi conti non hanno alcun modo di comunicare un messaggio al livello di consenso che segnali una modifica delle credenziali del validatore, e aggiungere questa funzionalità aggiungerebbe una complessità non necessaria al protocollo.

Come alternativa alla modifica dell'indirizzo di prelievo per un dato validatore, gli utenti potrebbero scegliere di impostare un contratto intelligente come proprio indirizzo di prelievo che potrebbe gestirebbe la rotazione delle chiavi, come Safe. Gli utenti che impostano i propri fondi al proprio EOA possono eseguire un'uscita completa per prelevare tutti i propri fondi in staking, per poi rimetterli in staking utilizzando nuove credenziali.
</ExpandableCard>

<ExpandableCard
title="Cosa succede se partecipo token di staking o a staking in pool"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Se fai parte di un <a href="/staking/pools/">pool di staking</a> o detieni token di staking, dovresti chiedere al tuo fornitore ulteriori dettagli su come vengono gestiti i prelievi dallo staking, poiché ogni servizio opera in modo diverso.

In generale, gli utenti dovrebbero essere liberi di rivendicare i propri ETH in staking sottostanti, o di modificare il fornitore di staking che utilizzano. Se un pool in particolare sta diventando troppo grande, è possibile uscire, riscattare i fondi e rimetterli in staking con un <a href="https://rated.network/">fornitore di dimensioni minori</a>. O, se hai accumulato abbastanza ETH, potresti <a href="/staking/solo/">fare staking da casa</a>.

</ExpandableCard>

<ExpandableCard
title="I pagamenti delle ricompense (prelievi parziali) si verificano automaticamente?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Sì, a condizione che il tuo validatore abbia fornito un indirizzo di prelievo. Questo deve essere fornito una volta per abilitare inizialmente qualsiasi prelievo, poi i pagamenti delle ricompense saranno innescati automaticamente a intervalli di pochi giorni, a ogni pulizia del validatore.
</ExpandableCard>

<ExpandableCard
title="I prelievi completi si verificano automaticamente?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

No, se il tuo validatore è ancora attivo sulla rete, un prelievo completo non si verificherà automaticamente. Questo richiede l'avvio manuale di un'uscita volontaria.

Una volta che un validatore ha completato il procedimento di uscita e supponendo che il conto abbia le credenziali di prelievo, il saldo rimanente sarà <em>then</em> prelevato durante la successiva<a href="#validator-sweeping">pulizia del validatore</a>.

</ExpandableCard>

<ExpandableCard title="Posso prelevare un importo personalizzato?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
I prelievi sono progettati per avvenire automaticamente, trasferendo qualsiasi ETH che non sta contribuendo attivamente allo staking. Ciò include i saldi completi dei conti che hanno completato il procedimento di uscita.

Non è possibile richiedere manualmente importi specifici di ETH da prelevare.
</ExpandableCard>

<ExpandableCard
title="Gestisco un validatore. Dove posso trovare ulteriori informazione sull'abilitazione dei prelievi?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Gli operatori del validatore dovrebbero visitare la pagina dei <a href="https://launchpad.ethereum.org/withdrawals/">Prelievi del Launchpad di Staking</a>, dove troveranno ulteriori dettagli su come preparare il proprio validatore ai prelievi, le tempistiche degli eventi e ulteriori dettagli sul funzionamento dei prelievi.

Per testare la tua configurazione su una rete di prova, visita il <a href="https://holesky.launchpad.ethereum.org">Launchpad di Staking della rete di prova di Holesky</a> per iniziare.

</ExpandableCard>

<ExpandableCard
title="Posso riattivare il mio validatore dopo esser uscito, depositando altri ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
No. Una volta che un validatore è uscito e che il suo intero saldo è stato prelevato, qualsiasi fondo aggiuntivo depositato a quel validatore sarà automaticamente trasferito all'indirizzo di prelievo durante la pulizia successiva del validatore. Per rimettere gli ETH in staking, deve essere abilitato un nuovo validatore.
</ExpandableCard>

## Letture consigliate {#further-reading}

- [Prelievi del Launchpad di Staking](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: La Beacon Chain spinge i prelievi come operazioni](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Cat Herders - Shanghai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Prelievo di ETH in staking (testing) con Potuz e Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Prelievi push della Beacon Chain come operazioni, con Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Informazioni sul saldo effettivo del validatore](https://www.attestant.io/posts/understanding-validator-effective-balance/)
