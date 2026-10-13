---
title: "Il prossimo grande portafoglio sarà privato"
description: "Il tuo portafoglio vede ogni indirizzo che possiedi, ogni dapp a cui ti connetti e ogni richiesta che fai. Quella stessa posizione gli permette di proteggere tutto questo. Uno sguardo pratico agli strumenti per la privacy, alle impostazioni predefinite e alle idee non ancora rilasciate che definiranno la prossima generazione di portafogli Ethereum."
author: "Elliott Alexander"
team: ""
tags:
  - "privacy"
  - "portafogli"
  - "prove a conoscenza zero"
published: 2026-07-02
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Il prossimo grande portafoglio"
lang: it
---

Scatta un'istantanea di due minuti che trascorri sul tuo portafoglio. Apri l'app, dai un'occhiata al tuo saldo, ti connetti a un'applicazione decentralizzata (dapp) che avevi intenzione di provare, approvi la transazione che ti presenta e invii a un amico gli ETH che gli devi per il pranzo.

Niente di tutto ciò sembra essere osservato. Nessuno ha chiesto il tuo nome. Chiudi l'app e continui con la tua giornata.

Ora contiamo cosa è effettivamente trapelato. All'avvio, prima ancora che tu facessi qualsiasi cosa, una serie di servizi di analisi ha appreso il tuo indirizzo IP e che usi questo portafoglio. Il server attraverso cui il tuo portafoglio legge la catena ha visto ogni indirizzo che possiedi, interrogato da un singolo IP: il tuo intero portfolio, raggruppato ordinatamente per chiunque conservi i log. La dapp ha ottenuto il tuo indirizzo attivo, che è tutto ciò di cui chiunque ha bisogno per cercare la sua intera cronologia. E il pagamento al tuo amico è un registro pubblico permanente che unisce il tuo portafoglio al suo.

Ognuna di queste fughe di dati è passata attraverso lo stesso software. Il portafoglio ha caricato le analisi, ha scelto quel server, ha consegnato l'indirizzo, ha costruito la transazione. Ma la stessa posizione è un'arma a doppio taglio: il livello che vede tutto è anche il livello che può proteggere tutto.

Molti portafogli hanno modelli di business basati sulla raccolta di queste informazioni, ma ci sono modi per farlo senza mettere a rischio gli utenti. Parte di ciò che serve è già pronto all'uso, funzionante e ignorato. Un'altra parte non è ancora stata compresa da nessuno. Entrambe le metà rappresentano un'opportunità, e chiunque se ne faccia carico sta costruendo il prossimo grande portafoglio.

## Cosa rivela il tuo portafoglio onchain {#what-your-wallet-gives-away-onchain}

Inizia onchain, con ciò che è pubblico indipendentemente dal portafoglio che usi. Un indirizzo non porta alcun nome, e questo singolo fatto è molto rassicurante. Ma ogni pagamento che hai ricevuto, ogni contratto che hai toccato, l'entità del tuo saldo in questo momento e l'elenco completo di tutti coloro con cui hai mai effettuato una transazione sono alla luce del sole, liberi di essere consultati da chiunque. Pseudonimato significa solo che è archiviato sotto un segnaposto invece che col tuo nome.

La difesa standard consiste nel distribuire la propria attività su più indirizzi, e la maggior parte degli utenti esperti lo fa. Aiuta meno di quanto possa sembrare. Finanzia due indirizzi dalla stessa fonte, o lascia che si paghino a vicenda una volta, e per chiunque esegua un'analisi dei cluster collasseranno in un'unica entità.

Già nel 2020, [uno studio](https://fc20.ifca.ai/preproceedings/31.pdf) sui primi quattro anni di Ethereum poteva già raggruppare il 17,9% di tutti gli account di proprietà esterna attivi, facendo emergere più di 340.000 entità che controllavano più indirizzi. Questo accadeva sei anni e un boom dell'IA fa. La tua attenta separazione è a pochi passi dall'essere annullata.

Prima o poi, il cluster viene collegato a una persona reale. Registra un nome ENS che richiama il tuo handle social, effettua un prelievo una volta da un exchange che conserva la scansione del tuo passaporto, o vieni pagato da qualcuno che tiene indirizzi etichettati in un foglio di calcolo, e il cluster smette di essere astratto.

Anche le violazioni dei dati fanno la loro parte: un'e-mail trapelata insieme a un indirizzo di casa, abbinata a un nome ENS che assomiglia all'e-mail. Niente di tutto questo richiede più un mandato di comparizione o uno specialista. L'IA ha trasformato il setacciare milioni di record per una buona corrispondenza in un lavoro che viene eseguito durante la notte, e il costo è in costante declino.

## Cosa rivela il tuo portafoglio prima di effettuare una transazione {#what-your-wallet-gives-away-before-you-transact}

La traccia onchain richiedeva almeno di effettuare una transazione. Quella offchain inizia prima. All'inizio del 2026, un ricercatore [ha analizzato tredici portafogli popolari con uno sniffer di pacchetti](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) su un dispositivo pulito e ha registrato cosa faceva ciascuno al primo avvio, prima che esistesse alcun account. Il portafoglio medio ha contattato circa quattordici domini. Il peggiore ha contattato 26 domini su 41 indirizzi IP, incluse chiamate all'infrastruttura del saldo a tre provider separati, per un utente che non aveva ancora creato un portafoglio. Un altro portafoglio nel test includeva un servizio di fingerprinting del dispositivo insieme a otto sottodomini di attribuzione marketing.

Tutto questo è un pilastro ordinario delle app di consumo (analisi, segnalazione degli arresti anomali, attribuzione marketing), ma questo non è Candy Crush, è un'app la cui promessa è l'auto-sovranità. Lo stesso test ha trovato [un portafoglio](https://cakewallet.com/) che non ha inviato assolutamente nulla al primo avvio: zero pacchetti, zero richieste DNS. Niente in un portafoglio richiede questo chiacchiericcio.

Poi c'è la falla che non si chiude mai. Il tuo portafoglio non conserva una copia della catena; ogni volta che legge un saldo o invia una transazione, interroga un server chiamato provider RPC (Remote Procedure Call). A meno che tu non gestisca il tuo nodo, ogni richiesta passa attraverso uno di questi, e il provider predefinito vede il tuo elenco completo di indirizzi, il tuo IP e le tempistiche di tutto ciò che fai. Abbinare quell'IP al nome di un abbonato è una richiesta di registri di routine per un governo.

Quando il provider predefinito di MetaMask [ha riconosciuto nel 2022](https://www.coindesk.com/business/2022/12/06/consensys-to-update-metamask-crypto-wallet-in-response-to-privacy-backlash) di aver registrato gli IP insieme agli indirizzi dei portafogli, la reazione negativa lo ha spinto a [ridurre la conservazione a sette giorni](https://consensys.io/blog/consensys-data-retention-update). Diamo a Cesare quel che è di Cesare, ma quel rimedio è una policy, e l'architettura sottostante è invariata: un server riceve ancora ogni richiesta che fai. E un log del genere non deve essere richiesto per fare danni; deve solo esistere. I database vengono violati, venduti e uniti silenziosamente ad altri, e un log che da solo non significava nulla può essere collegato a te anni dopo essere stato scritto.

La cosa da notare di tutto questo livello è che l'utente non ne vede mai nulla. Inviare denaro ti mette almeno davanti a una schermata di conferma; i metadati non hanno alcuna schermata. Nessuno approva che il proprio elenco di indirizzi viaggi con il proprio IP, e nessun prompt di firma copre le analisi.

Queste impostazioni predefinite provengono dal manuale standard delle app di consumo (infrastruttura solida, utili report sugli arresti anomali, metriche di crescita) applicate senza pensarci troppo a un'app che detiene il denaro delle persone. Il che è la parte incoraggiante: ogni fuga di dati menzionata in questa sezione risale a una decisione che un costruttore di portafogli può prendere.

## Chi sta guardando {#whos-looking}

Inizia con gli spettatori che meno vorresti. I criminali hanno capito che un registro pubblico funge anche da catalogo di persone i cui risparmi possono essere presi con la forza. Gli attacchi con la chiave inglese (rapine in cui la chiave viene estratta attraverso la violenza o la minaccia di essa) [sono aumentati del 75% nel 2025](https://www.coindesk.com/markets/2026/02/02/crypto-crime-is-getting-violent-wrench-attacks-jumped-75-in-2026), e le vittime hanno perso circa [101 milioni di dollari solo nei primi quattro mesi del 2026](https://cointelegraph.com/news/europe-crypto-wrench-attacks-losses-101m-certik-report). E il modello si è spostato verso ciò che gli investigatori chiamano targeting basato sui dati, in cui gli aggressori profilano le disponibilità onchain di una vittima prima ancora di bussare. In più della metà dei recenti incidenti hanno raggiunto un coniuge, un figlio o un genitore come leva. Un saldo del portafoglio che riconduce alla tua porta di casa è un invito permanente per i criminali.

Poi ci sono gli spettatori con i distintivi. Un registro trasparente è un sistema di sorveglianza che nessun governo deve costruire: un registro completo di chi ha pagato chi, quando e quanto, seduto in pubblico, a una query di distanza senza bisogno di mandato. Quanto questo dovrebbe preoccuparti dipende da chi ti governa, e per milioni di persone la risposta è un governo che punisce una donazione al partito di opposizione, un abbonamento VPN o risparmi detenuti in una valuta che lo stato non può stampare.

Per quegli utenti, l'esposizione finanziaria è il modello di minaccia, e le impostazioni predefinite del portafoglio decidono quanto sono esposti.

Entrambi i tipi di spettatori stanno ricevendo lo stesso aggiornamento. L'IA sta rendendo l'osservazione più economica ogni anno, e tutto ciò che è mai stato scritto sulla catena rimane scritto, disponibile per qualsiasi nuova tecnica di analisi che verrà. Niente di tutto questo è un atto d'accusa contro il registro pubblico; la trasparenza è ciò che permette a chiunque di verificare la catena. L'esposizione vive nella traccia che collega il registro a te: i modelli di finanziamento, gli indirizzi riutilizzati, i log del server.

I portafogli hanno lasciato quella traccia al suo posto finora perché lasciarla è il percorso di minor resistenza, per il software tanto quanto per l'utente. È anche esattamente la cosa che un portafoglio è posizionato per dissolvere.

## Perché il portafoglio è il luogo in cui si risolve la privacy {#why-the-wallet-is-where-privacy-gets-fixed}

È lecito chiedersi perché tutto questo sia compito del portafoglio. Ci sono [esplorazioni attive verso la privacy](https://ethresear.ch/t/ethereum-privacy-the-road-to-self-sovereignty/22115) al livello base di Ethereum, e il protocollo potrebbe alla fine farsi carico di parte di questo peso. Ma la catena si aggiorna attraverso hard fork, due all'anno nel migliore dei casi, e le modifiche rilevanti per la privacy si diffonderanno su molti di essi. È una tempistica misurata in anni e decisa da un processo che non dovrebbe essere affrettato.

Nel frattempo, gli individui stanno decidendo proprio ora se è sicuro essere pagati onchain, donare, mantenere i risparmi lì. Hanno bisogno di una privacy che arrivi più velocemente di quanto il processo di consenso sociale di Ethereum e il programma dei fork possano fornire.

Il livello dell'app ha la forma sbagliata per il problema. Anche se ogni dapp rilasciasse la propria funzionalità per la privacy, ciascuna potrebbe proteggere solo l'attività all'interno delle proprie mura, a modo suo, con le proprie peculiarità e segreti che l'utente deve gestire. Ciò che ti espone sono le connessioni che le attraversano tutte (gli indirizzi condivisi, le tracce di finanziamento, i collegamenti a te) e quelle connessioni vivono nello spazio tra le app. Risolvere la privacy app per app significa risolverla ovunque tranne dove si trova effettivamente il problema. Le dapp non sono il luogo in cui può vivere la vera soluzione.

Questo lascia il portafoglio. È l'unico software che vede ogni dapp a cui ti connetti, ogni indirizzo che controlli e ogni richiesta che fai. La stessa visibilità che rende un portafoglio con perdite così costoso è ciò che permette a uno attento di coordinare la privacy in tutto ciò che fai: scegliere quale indirizzo si interfaccia con quale app, instradare le letture in modo che nessun server ottenga il quadro completo, tenere la contabilità che i protocolli per la privacy richiedono.

E quei protocolli sono più avanti di quanto la maggior parte dei costruttori presuma. [Railgun](https://railgun.org/) ha elaborato più di [5 miliardi di dollari in volume cumulativo](https://dune.com/railgun_project/railgun) e detiene circa [80 milioni di dollari oggi](https://defillama.com/protocol/railgun), strumenti per indirizzi stealth come [Umbra](https://www.techflowpost.com/en-US/article/30477) hanno generato decine di migliaia di indirizzi monouso, e secondo [un conteggio](https://wublock.substack.com/p/ethereum-privacys-https-moment-from) più di 35 team stanno perseguendo oltre una dozzina di approcci distinti ai trasferimenti privati.

Niente di tutto questo è ancora mainstream, e mancano genuinamente dei pezzi. Ma i protocolli funzionano, denaro reale si muove attraverso di essi, e ciò che manca loro è un posto nel flusso principale dell'utente. È qui che entra in gioco un portafoglio lungimirante.

## Cosa fa effettivamente un portafoglio che preserva la privacy {#what-a-privacy-preserving-wallet-actually-does}

Togli il gergo e la maggior parte del lavoro sulla privacy è contabilità. Usa un nuovo indirizzo qui, instrada il deposito di là, custodisci questa nota, aspetta prima di effettuare un prelievo, non lasciare mai che quei due account si tocchino. È una disciplina in cui gli esseri umani sono pessimi e per cui il software è costruito, e oggi ricade quasi interamente sull'utente.

Un portafoglio che preserva la privacy è uno che fa la contabilità da solo invece di scaricarla sull'utente. L'utente decide cosa fare; il portafoglio si assicura che farlo non lasci alcuna traccia che riconduca a lui.

Inizia con ciò che è attivo. Le pool schermate funzionano oggi: Railgun mantiene un saldo privato accanto a quello pubblico, e una volta che i fondi sono all'interno, un pagamento in uscita non rivela nulla sulle tue altre disponibilità. I costi sono reali (commissioni più alte rispetto a un semplice trasferimento, generazione di prove misurata in secondi, una certa dipendenza dai relayer) ma il protocollo ha trasportato miliardi in volume anche con questi compromessi.

Abbina questo a un'abitudine per cui non è necessario alcun protocollo: un nuovo indirizzo per ogni controparte. Quando l'utente si connette a una nuova dapp, il portafoglio può offrire un indirizzo dedicato per essa, finanziato dal saldo schermato, in modo che l'app veda un account senza cronologia e senza fratelli. Gli indirizzi stealth ([ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)) estendono la stessa mossa alla ricezione dei pagamenti. I mixer come [Tornado Cash](https://tornadocash.eth.limo/) e [Privacy Pools](https://privacypools.com/) fanno un lavoro più semplice e ristretto: i fondi entrano da un indirizzo ed escono verso un altro, con il collegamento tra i due reciso. Questo è lo strumento per finanziare un nuovo indirizzo che nessuno può rintracciare fino a te, e il pezzo mancante è il portafoglio che produce tale indirizzo su richiesta invece di lasciare il rituale all'utente. Niente di tutto questo aspetta un hard fork o una sovvenzione di ricerca. Aspetta un portafoglio disposto a tenere la contabilità per conto degli utenti.

Il lato della rete è per lo più fatto di decisioni. Rilasciare con zero analisi di terze parti è una scelta, e almeno un portafoglio sul mercato l'ha già fatta. Sull'esposizione RPC, la maggior parte dei portafogli ti permette già di cambiare provider, quindi l'opzionalità esiste, nascosta in una pagina delle impostazioni che gli utenti esperti visitano e che tutti gli altri non trovano mai.

La mossa non ancora rilasciata è la separazione: assegnare provider diversi a indirizzi diversi in modo che nessun singolo server veda mai l'elenco completo, e mettere un proxy tra portafoglio e provider in modo che l'IP e gli indirizzi non viaggino mai insieme. Un client leggero come [Helios](https://github.com/a16z/helios) o [Colibri](https://github.com/corpus-core/colibri-stateless) permette al portafoglio di verificare le risposte che ottiene invece di prenderle per buone. Ognuna di queste cose costa qualcosa in infrastruttura, latenza o tempo di ingegnerizzazione, ma nessuna di esse richiede nuova crittografia.

Poi c'è la frontiera. Leggere i tuoi saldi oggi significa rivelare il tuo set di indirizzi a chiunque serva la query, e il lavoro per risolvere questo problema sta avvenendo proprio ora: Trusted Execution Environments abbinati a Oblivious RAM, recupero di informazioni private e client leggeri che si spingono verso letture completamente private. Niente di tutto ciò è ancora abbastanza consolidato da poter essere copiato da un'implementazione di riferimento, il che è esattamente ciò che lo rende un terreno che vale la pena rivendicare.

Il lato della scrittura ha la stessa forma: la trasmissione peer-to-peer e le mixnet impedirebbero a una transazione di trasportare il tuo IP a un server. I portafogli che implementeranno per primi questi pezzi sono quelli con cui si misurerà il resto del settore.

Ecco l'asticella, e nota che è un'asticella di esperienza utente piuttosto che di nuova crittografia. Prendi la sezione con cui si è aperto questo articolo (avvia, connetti, approva, paga) e mantienila riconoscibilmente come quella sessione. Ci saranno dei compromessi; una prova richiede secondi per essere generata, un trasferimento schermato costa di più, e un nuovo concetto o due potrebbero aver bisogno di un nome nell'interfaccia.

Quanto piccole sembreranno quelle differenze è l'arte dell'integrazione, e separerà i portafogli che fanno le cose per bene da quelli che lo offrono tecnicamente ma in modi che rendono la vita difficile agli utenti. Ciò che deve cambiare completamente: nessuna analisi si avvia al lancio, ogni nuova dapp incontra un indirizzo senza cronologia, e il pagamento a un amico non rivela nulla sugli account che ci stanno dietro.

La privacy che chiede all'utente di diventare una persona diversa non si diffonde mai. Quando arriva all'interno di un'esperienza che gli utenti già comprendono, è semplicemente un portafoglio migliore.

## Idee che vale la pena rubare {#ideas-worth-stealing}

Oltre i fondamenti si trova un livello di funzionalità che, per quanto ne so, nessuno ha ancora rilasciato. Solo alcune idee, ma ognuna è il tipo di cosa che potrebbe rendere un portafoglio la scelta ovvia.

Inizia con il tempismo. I set di anonimato hanno bisogno di tempo per crescere tra un passaggio e l'altro, e i tuoi timestamp rivelano silenziosamente più di quanto penseresti: quando sei sveglio, che fuso orario mantieni, in quali giorni effettui transazioni. Un portafoglio potrebbe mettere in coda tutto ciò che non è urgente e avviarlo a orari insoliti: il deposito di schermatura si stabilizza durante la notte, i fondi sono pronti per il mattino, e nessun ritmo della tua vita si forma mai onchain.

Poi il pulsante facile. Un utente che si presenta oggi è completamente esposto: una frase seme ben usata, anni di storia alle spalle. Lascia che la inserisca, e il portafoglio redige un piano di migrazione da approvare: questa quantità in Railgun, questa quantità in Privacy Pools, regola la divisione come preferisci. Più tardi, ogni volta che i fondi sono necessari allo scoperto, emergono pronti e non esposti: un nuovo indirizzo, un'ora insolita, un importo che non riecheggia ciò che è entrato. E spesso non c'è bisogno di alcuna via d'uscita. All'interno dell'ecosistema di Railgun un utente può trasferire e fare trading senza mai emergere, risparmiando peraltro le commissioni di uscita. Un utente che era un libro aperto il lunedì è illeggibile il venerdì, e tutto ciò che ha fatto è stato approvare un piano.

Un portafoglio potrebbe anche fare il linting per la privacy. Le euristiche di clustering nella prima metà di questo articolo sono pubbliche, quindi puntale sulla transazione in sospeso dell'utente e avvisa prima della firma: questo pagamento collegherà questi due account, questo prelievo corrisponde al tuo deposito al centesimo. I portafogli simulano già le transazioni per individuare i fondi prosciugati. Simulare ciò che impara uno spettatore è la stessa mossa mirata a un rischio diverso.

E mostra alle persone ciò che l'osservatore vede già. Una dashboard che esegue l'analisi dei cluster sugli account dell'utente trasforma una minaccia astratta in qualcosa su cui gli utenti sentono il bisogno di agire: questi cinque indirizzi sono un'unica entità per un osservatore, questo account è pulito, questo nome ENS collega i due. Dà anche alla funzione del pulsante facile menzionata sopra il suo prima e dopo.

## Passi d'azione {#action-steps}

### Per i costruttori {#for-builders}

Ogni sezione di questo articolo finisce nello stesso punto: una scelta che il portafoglio può fare.

Il modo per fare quelle scelte sono impostazioni predefinite sensate che l'utente può sovrascrivere, ognuna di esse. Imposta come predefinito il percorso privato, perché il predefinito è ciò con cui la maggior parte degli utenti conviverà. Ma lascialo aperto all'opzionalità guidata dall'utente, perché a un utente che non può puntare il proprio portafoglio a un server RPC diverso, o al proprio nodo, non è stata realmente consegnata la sovranità.

Non devi partire da zero. Il [Kohaku SDK](https://github.com/ethereum/kohaku) pacchettizza diverse delle primitive in questo articolo (saldi schermati, mixer, client leggeri) in modo che un portafoglio possa adottarle senza ricostruire ogni protocollo da zero. I pezzi sono pronti all'uso. Alcune cose contano molto prima che qualcuno le chieda. Nessuno ha visto masse fare petizioni per la crittografia end-to-end; è stata rilasciata come impostazione predefinita, miliardi di persone l'hanno ottenuta senza accorgersene o preoccuparsene, e ora un'app di messaggistica senza di essa sembra rotta e violante.

Il denaro che non può essere usato per trovarti, profilarti o prenderti di mira appartiene alla stessa categoria. Il portafoglio che lo tratta in questo modo sarà il prossimo grande portafoglio.

### Per gli utenti {#for-users}

Il portafoglio che usi è quello che stai promuovendo come norma. Scegli portafogli che prendono sul serio la tua privacy e sicurezza. Questo potrebbe significare sacrificare l'interfaccia più fluida per quella più sicura e privata. In questo momento questo probabilmente significa tenersi aggiornati con le ultime novità su [Walletbeat](https://www.walletbeat.fyi/), vedere quali portafogli stanno facendo un passo verso l'abilitazione della privacy degli utenti e prendersi il tempo per provarli.

## Per ulteriori esplorazioni {#for-further-exploration}

- [Scheda di valutazione della privacy dei portafogli](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) - Esposizione di rete al primo avvio di 13 portafogli
- [ERC-5564: Indirizzi stealth](https://eips.ethereum.org/EIPS/eip-5564)
- [Railgun](https://railgun.org/), [Privacy Pools](https://privacypools.com/) e [Tornado Cash](https://tornadocash.eth.limo/)
- Client leggeri [Helios](https://github.com/a16z/helios) e [Colibri](https://github.com/corpus-core/colibri-stateless)
- [Kohaku](https://github.com/ethereum/kohaku) - SDK per la privacy per i costruttori di portafogli
- [Walletbeat](https://www.walletbeat.fyi/) - Come si misurano i portafogli esistenti