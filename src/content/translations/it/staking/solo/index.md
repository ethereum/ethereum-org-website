---
title: Metti i tuoi ETH in staking in solo
description: Una panoramica di come iniziare a mettere in staking in solo i tuoi ETH
lang: it
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-solo.png
alt: Leslie il rinoceronte sul suo chip informatico.
sidebarDepth: 2
summaryPoints:
  - Ricevi ricompense massime direttamente dal protocollo (incluse le commissioni non bruciate dopo La Fusione) per mantenere il tuo validatore propriamente funzionante e online
  - Opera hardware domestico e aggiungi personalmente alla sicurezza e decentralizzazione della rete di Ethereum
  - Rimuovi la fiducia e non lasciar mai perdere il controllo delle chiavi dei tuoi fondi
---

## Cos'è lo staking in solo? {#what-is-solo-staking}

Lo staking in solo è l'atto di [operare un nodo di Ethereum](/run-a-node/) connesso a Internet e depositare 32 ETH per attivare un [validatore](#faq), dandoti l'abilità di partecipare direttamente nel consenso della rete.

Un nodo di Ethereum consiste sia nel client del livello di esecuzione (EL), che di un client del livello di consenso (CL). Questi client sono software che cooperano, insieme a una valida serie di chiavi di firma, per verificare le transazioni e i blocchi, attestare al capo corretto della catena, aggregare le attestazioni e proporre i blocchi.

Gli staker in solo sono responsabili di operare l'hardware necessario a eseguire questi client. Si consiglia vivamente di usare una macchina dedicata per questo, che operi da casa, il che è estremamente vantaggioso per l'integrità della rete.

Uno staker in solo riceve ricompense direttamente dal protocollo per mantenere il proprio validatore propriamente funzionante e online.

## Perché mettere in staking in solitaria? {#why-stake-solo}

Lo staking in solo include maggiore responsabilità, ma ti fornisce il massimo controllo sui tuoi fondi e la tua configurazione di staking.

<CardGrid>
  <Card title="Ottieni nuovi ETH" emoji="💸">
    Ottieni ricompense denominate in ETH direttamente dal protocollo quando il tuo validatore è online, senza alcun mediatore che prenda parti.
  </Card>
  <Card title="Controllo completo" emoji="🎛️">
    Mantieni le tue chiavi. Scegli la combinazione di client e hardware che ti consente di minimizzare i tuoi rischi e meglio contribuire alla salute e integrità della rete. I servizi di staking di terze parti prendono per te queste decisioni e non fanno sempre le scelte più sicure.
  </Card>
  <Card title="Sicurezza della rete" emoji="🔐">
    Lo staking in solo è il metodo più d'impatto per fare staking. Operando un validatore sul tuo hardware domestico, rafforzi la robustezza, decentralizzazione e sicurezza del protocollo di Ethereum.
  </Card>
</CardGrid>

## Considerazioni prima dello staking in solo {#considerations-before-staking-solo}

Per quanto vorremmo che lo staking in solo fosse accessibile e privo di rischi per tutti, questa non è la realtà. Esistono alcune serie considerazioni pratiche da tenere a mente prima di scegliere di mettere i tuoi ETH in staking in solo.

<InfoGrid>
  <ExpandableCard title="Lettura necessaria" eventCategory="SoloStaking" eventName="clicked required reading">
    Quando utilizzi il tuo nodo, dovresti dedicare del tempo a imparare come usare il software che hai scelto. Questo include la lettura della documentazione pertinente e seguire i canali di comunicazione di tali team di sviluppo.
    Più comprendi il software che stai operando e il funzionamento del proof-of-stake, meno rischioso sarà come staker e più sarà facile risolvere qualsiasi problema che potrebbe sorgere lungo il percorso da operatore del nodo. 
  </ExpandableCard>
  <ExpandableCard title="Dimestichezza con il computer" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
    La configurazione del nodo richiede un livello di dimestichezza ragionevole con il computer, sebbene nuovi strumenti stiano semplificando le procedure con il tempo. La comprensione dell'interfaccia della riga di comando è utile, ma non più rigorosamente richiesta.
    Richiede anche una configurazione hardware molto basilare e una minima comprensione delle specifiche consigliate minime.
  </ExpandableCard>
  <ExpandableCard title="Gestione sicura delle chiavi" eventCategory="SoloStaking" eventName="clicked secure key management">
    Proprio come le chiavi private proteggono il tuo indirizzo di Ethereum, dovrai generare chiavi specificamente per il tuo validatore. Devi comprendere come mantenere al sicuro qualsiasi frase di seed o chiave privata.
    <p style={{marginTop: "1rem"}}><a href="/security">Sicurezza di Ethereum e prevenzione delle truffe</a></p>
  </ExpandableCard>
  <ExpandableCard title="Nessun prelievo (per ora)" eventCategory="SoloStaking" eventName="clicked no withdrawing">
    Il prelievo degli ETH in staking o delle ricompense dal saldo di un validatore non è ancora supportato. Il supporto per i prelievi è pianificato per l'aggiornamento Shanghai, consecutivo alla Fusione. Dovresti anticipare che i tuoi ETH resteranno bloccati per almeno uno o due anni. Dopo l'aggiornamento Shanghai potrai prelevare liberamente porzioni o tutto il tuo stake se lo desideri.
  </ExpandableCard>
  <ExpandableCard title="Manutenzione" eventCategory="SoloStaking" eventName="clicked maintenance">
    L'hardware, talvolta, si guasta, le connessioni di rete generano errori e il software del client a volte necessita di aggiornamenti. La manutenzione del nodo è inevitabile e richiederà occasionalmente la tua attenzione. Vorrai assicurarti di esser consapevole di qualsiasi aggiornamento di rete anticipato o di altri aggiornamenti critici del client.
  </ExpandableCard>
  <ExpandableCard title="Operatività affidabile" eventCategory="SoloStaking" eventName="clicked reliable uptime">
    Le tue ricompense sono proporzionali al tempo in cui il tuo validatore è online e sta attestando propriamente. Le interruzioni comportano sanzioni proporzionali a quanti altri validatori sono offline nello stesso momento, ma <a href="#faq">non risultano in tagli</a>. Anche la larghezza di banda conta, poiché le ricompense sono ridotte per le attestazioni che non sono ricevute in tempo. I requisiti varieranno, ma si consiglia un minimo di 10 Mb/s in upload e download.
  </ExpandableCard>
  <ExpandableCard title="Rischio di taglio" eventCategory="SoloStaking" eventName="clicked slashing risk">
    Differente dalle sanzioni di inattività per esser offline, il <em>taglio</em> è una sanzione molto più seria, riservata alle infrazioni malevole. Operando un client di minoranza con le tue chiavi caricate su una sola macchina per volta, il tuo rischio di esser tagliato è minimizzato. Detto ciò, tutti gli staker devono esser consapevoli dei rischi di taglio.
    
    <p><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">Ulteriori informazioni sul taglio e il ciclo di vita del validatore</a></p>
  </ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Come funziona {#how-it-works}

<StakingHowSoloWorks />

Se lo desideri, puoi smettere di essere un validatore; in questo modo viene meno il requisito di essere online e si interrompe qualsiasi ulteriore ricompensa. Ricorda che fino all'aggiornamento Shanghai pianificato, il _prelievo_ di questi fondi non sarà possibile.

Dopo Shanghai, gli utenti potranno prelevare le proprie ricompense nonché il proprio stake, se lo desiderano.

## Inizia con il Launchpad di Staking {#get-started-on-the-staking-launchpad}

Il Launchpad di Staking è un'applicazione open source che ti aiuterà a diventare uno staker. Ti guiderà per la scelta dei tuoi client, la generazione delle tue chiavi e il deposito dei tuoi ETH al contratto di deposito di staking. Una lista di controllo è fornita per assicurarsi che tu abbia coperto tutto per configurare in sicurezza il tuo validatore.

<StakingLaunchpadWidget />

<InfoBanner emoji=":panda:" isWarning>
<strong>Nota per gli staker esistenti:</strong> La Fusione si avvicina, il che porta qualche modifica rispetto al lancio dello staking. Assicurati di conoscere bene con la <a href="https://launchpad.ethereum.org/en/merge-readiness">Lista di controllo di preparazione alla Fusione</a> sul Launchpad di Staking.
</InfoBanner>

## Cosa considerare con il nodo e gli strumenti di configurazione del client {#node-tool-considerations}

Esistono sempre più strumenti e servizi per aiutarti a mettere i tuoi ETH in staking in solo, ma ognuno presenta diversi rischi e benefici.

Gli indicatori di attributo sono usati di seguito per segnalare punti di forza e debolezze notevoli che uno strumento di staking elencato potrebbe avere. Usa questa sezione come un riferimento per come definire questi attributi mentre stai scegliendo quali strumenti usare per guidarti per il tuo percorso di staking.

<StakingConsiderations page="solo" />

## Esplora gli strumenti del nodo e di configurazione del client {#node-and-client-tools}

Esistono una varietà di opzioni disponibili per aiutarti con la tua configurazione. Gli indicatori di cui sopra ti guideranno per gli strumenti seguenti.

<InfoBanner emoji="⚠️" isWarning>
Ricorda l'importanza di scegliere un <a href="/developers/docs/nodes-and-clients/client-diversity/">client di minoranza</a>, poiché migliora la sicurezza della rete e limita i tuoi rischi. Gli strumenti che ti consentono di configurare il client di minoranza sono denotati come <em style="text-transform: uppercase;">"multi-client."</em>
</InfoBanner>

#### Strumenti del nodo

<StakingProductsCardGrid category="nodeTools" />

#### Generatori di chiavi

Questi strumenti sono utilizzabili come un'alternativa alla [CLI di Deposito di Staking](https://github.com/ethereum/staking-deposit-cli/) per contribuire alla generazione delle chiavi.

<StakingProductsCardGrid category="keyGen" />

Hai un suggerimento per uno strumento di staking che abbiamo dimenticato? Dai un'occhiata alla nostra [politica di elenco dei prodotti](/contributing/adding-staking-products/) per vedere se sarebbe adatto e sottoporcelo.

## Esplora le guide di staking in solo {#staking-guides}

<StakingGuides />

## Domande frequenti {#faq}

Esistono alcune domande molto comuni sullo staking che meritano di essere affrontate.

<ExpandableCard title="Cos'è un validatore?">
Un <em>validatore</em> è un'entità virtuale che risiede sulla Beacon Chain e partecipa al consenso del protocollo di Ethereum. I validatori sono rappresentati da un saldo, una chiave pubblica e altre proprietà. Un <em>client del validatore</em> è il software che agisce per conto del validatore detenendone e usandone la chiave privata. Un singolo client del validatore può detenere molte coppie di chiavi, controllando molti validatori.
</ExpandableCard>

<ExpandableCard title="Posso depositare più di 32 ETH?">
Ogni coppia di chiavi associata ad un validatore richiede esattamente 32 ETH per esser attivata. Maggiori ETH depositati in una singola serie di chiavi non aumentano le potenziali ricompense, poiché ogni validatore è limitato a un <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo effettivo</a> di 32 ETH. Questo significa che lo staking è effettuato in incrementi di 32 ETH, ognuno con la propria serie di chiavi e il proprio saldo.

Non depositare più di 32 ETH per un singolo validatore. Non aumenterà le tue ricompense e sarà bloccato fino all'aggiornamento Shanghai pianificato.

Se lo staking in solo sembra troppo impegnativo per te, considera di usare un fornitore di <a href="/staking/saas/">staking come servizio</a>, o se stai operando con meno di 32 ETH, dai un'occhiata ai <a href="/staking/pools/">pool di staking</a>.
</ExpandableCard>

<ExpandableCard title="Sarà tagliato se resto offline? (tldr: No.)">
Andare offline quando la rete sta finalizzando correttamente NON comporterà alcun taglio. Vengono applicate piccole <em>sanzioni di inattività</em> se il tuo validatore non è disponibile ad attestare per una data epoca (ciascuna lunga 6,4 minuti), ma queste sono molto differenti dal <em>taglio</em>. Queste sanzioni sono lievemente inferiori alla ricompensa che avresti ottenuto se il validatore fosse stato disponibile ad attestare e le perdite possono esser riguadagnate approssimativamente nello stesso periodo di tempo online.

Nota che le sanzioni per inattività sono proporzionali a quanti validatori sono offline contemporaneamente. Nei casi in cui una grande porzione della rete è offline in una volta sola, le sanzioni per ciascuno di questi validatori saranno maggiori rispetto a quando non è disponibile un singolo validatore.

In casi estremi, se la rete interrompe la finalizzazione a causa del fatto che più di un terzo dei validatori è offline, questi utenti subiranno quella che è nota come una <em>fuga d'inattività quadratica</em>, una perdita esponenziale di ETH dai conti del validatore offline. Questo consente alla rete, eventualmente, di auto-curarsi bruciando gli ETH dei validatori inattivi finché il loro saldo non raggiunge i 16 ETH, e a quel punto saranno automaticamente espulsi dal pool del validatore. I validatori online rimanenti alla fine comprenderanno ancora oltre i 2/3 della rete, soddisfacendo la super maggioranza necessaria per finalizzare nuovamente la catena.
</ExpandableCard>

<ExpandableCard title="Come mi assicuro di non esser tagliato?">
In breve, non esiste una garanzia assoluta in questo senso, ma se agisci in buona fede, operi un client di maggioranza e mantieni le tue chiavi di firma solo su una macchina per volta, il rischio di esser tagliato è quasi pari a zero.

Esistono solo alcuni modi specifici che possono risultare nel taglio e nell'espulsione di un validatore dalla rete. Al momento della scrittura, i tagli che si sono verificati sono stati esclusivamente un prodotto di configurazioni hardware ridondanti in cui le chiavi di firma erano memorizzate contemporaneamente su due macchine separate. Questo può risultare inavvertitamente in un <em>voto doppio</em> dalle tue chiavi, il che è un'infrazione tagliabile.

Operare un client di super maggioranza (ogni client usato da oltre 2/3 della rete), preclude anch'esso un rischio di taglio potenziale nel caso in cui il client presenti un bug che risulti in una biforcazione della catena. Questo può risultare in una biforcazione difettosa che viene finalizzata. Correggere alla catena intesa richiederebbe l'invio di un <em>voto di contorno</em>, provando ad annullare un blocco finalizzato. Anche questa è un'infrazione tagliabile e può esser evitata semplicemente eseguendo invece un client di minoranza.

I bug equivalenti in un <em>client di minoranza non sarebbero mai finalizzati</em> e, ciò risulterebbe in un voto di contorno, con la semplice conseguenza di sanzioni d'inattività, <em>non tagli</em>.

<p><a href="https://hackernoon.com/ethereums-client-diversity-problem">Scopri di più sull'importanza di operare un client di minoranza.</a></p>
<p><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Scopri di più sulla prevenzione dei tagli</a></p>
</ExpandableCard>

<ExpandableCard title="Quale client è il migliore?">
I client individuali potrebbero variare lievemente in termini di prestazioni e interfaccia utente, poiché ognuno è sviluppato da team differenti che usano diversi linguaggi di programmazione. Detto ciò, nessuno di essi è il "migliore." Tutti i client di produzione sono eccellenti pezzi di software, che eseguono tutti le stesse funzioni fondamentali per sincronizzarsi e interagire con la blockchain.

Poiché tutti i client di produzione forniscono la stessa funzionalità di base, è davvero molto importante che tu scelga un <strong>client di minoranza</strong>, vale a dire qualsiasi client che NON sia attualmente in uso da una maggioranza di validatori sulla rete. Questo potrebbe sembrare controintuitivo, ma operare un client di maggioranza o di super maggioranza espone maggiormente al rischio di tagli nel caso di un bug in quel client. Operare un client di minoranza riduce drasticamente tali rischi.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Scopri di più sul perché la diversità dei client è fondamentale</a>
</ExpandableCard>

<ExpandableCard title="Posso semplicemente usare un VPS (server privato virtuale)?">
Sebbene un server privato virtuale (VPS) possa essere usato come sostitutivo dell'hardware domestico, l'accesso e la posizione fisici del client del validatore <em>sono importanti</em>. Le soluzioni centralizzate su cloud come Amazon Web Services o Digital Ocean offrono la convenienza di non dover ottenere e operare l'hardware, a spese della centralizzazione della rete.

Più client del validatore operano su una soluzione d'archiviazione su cloud centralizzata singola, più diventa pericoloso per questi utenti. Ogni evento che porta questi fornitori offline, che sia un attacco, domande regolatorie o solo guasti energetici o a Internet, manderanno offline al contempo ogni client del validatore che si basi su tale server.

Le sanzioni offline sono proporzionali a quanti altri sono offline contemporaneamente. Usare un VPS aumenta notevolmente il rischio che le sanzioni offline saranno più severe e aumenta il rischio di fughe quadratiche o tagli nel caso in cui il guasto sia abbastanza grande. Per minimizzare i tuoi rischi e i rischi alla rete, gli utenti sono vivamente incoraggiati a procurarsi e utilizzare il proprio hardware.

<a href="https://consensys.net/blog/codefi/rewards-and-penalties-on-ethereum-20-phase-0/">Ulteriori informazioni su ricompense e sanzioni</a>
</ExpandableCard>

<ExpandableCard title="Devo fare qualcosa prima della Fusione?">
Gli staker che operano correntemente sul client del livello di consenso (Beacon Chain) dovranno anche eseguire un client del livello di esecuzione dopo La Fusione. La nuova API di Engine sarà usata per interfacciarsi tra i due livelli, richiedendo un codice segreto JWT. Se attualmente utilizzi una Beacon Chain senza un client del livello di esecuzione, dovrai sincronizzare il livello di esecuzione prima della Fusione per restare sincronizzato con la rete.

La Fusione porterà anche le commissioni di transazione non bruciate ai validatori. Queste commissioni non si accumulano nel saldo associato alle chiavi del validatore ma possono essere dirette a un regolare indirizzo di Ethereum di tua scelta. Per ricevere le tue mance (commissioni prioritarie) dai blocchi proposti, dovresti aggiornare le impostazioni del tuo client con l'indirizzo verso cui desideri siano inviate.

I collegamenti alla documentazione del singolo client e le informazioni aggiuntive si possono trovare sulla lista di controllo di preparazione alla Fusione sul Launchpad.

<ButtonLink to="https://launchpad.ethereum.org/merge-readiness/">
Lista di controllo di preparazione alla Fusione
</ButtonLink>
</ExpandableCard>

## Approfondimenti {#further-reading}

- [Problema di diversità dei client di Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Aiutare la diversità dei client](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [La diversità del client sul livello di consenso di Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [How to: acquistare l'hardware del validatore di Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Passo dopo Passo: come unirsi alla Testnet di Ethereum 2.0](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) - _Butta_
- [Suggerimenti per la prevenzione dei tagli di Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_
- [Ricompense e sanzioni su Ethereum 2.0](https://consensys.net/blog/codefi/rewards-and-penalties-on-ethereum-20-phase-0/) - _James BeckMarch 2020_
