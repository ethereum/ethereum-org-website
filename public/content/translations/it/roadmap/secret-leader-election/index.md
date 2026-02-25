---
title: Elezioni segrete del leader
description: Spiegazione di come l'elezione segreta di un capo possa aiutare a proteggere i validatori dagli attacchi
lang: it
summaryPoints:
  - L'indirizzo IP dei propositori di blocchi può essere noto in anticipo, rendendoli vulnerabili agli attacchi
  - L'elezione segreta del capo nasconde l'identità dei validatori, così che non possano essere conosciuti in anticipo
  - Un'estensione di quest'idea è rendere casuale la selezione del validatore, per ogni spazio.
---

# Elezione segreta di un singolo leader {#single-secret-leader-election}

Nel meccanismo di consenso odierno basato sul [proof-of-stake](/developers/docs/consensus-mechanisms/pos), l'elenco di propositori di blocchi in entrata è pubblico ed è possibile mapparne gli indirizzi IP. Ciò significa che gli utenti malevoli potrebbero identificare quali valori dovrebbero proporre a un blocco e li prendono di mira con un attacco di negazione del servizio (DOS), che li lascia incapaci di proporre il proprio blocco in tempo.

Questo potrebbe creare opportunità di profitto per un utente malevolo. Ad esempio, un propositore di blocchi selezionato per lo slot `n+1` potrebbe lanciare un attacco DoS al propositore nello slot `n`, facendogli perdere l'opportunità di proporre un blocco. Questo consentirebbe al propositore di blocchi che attacca di estrarre il MEV da entrambi gli slot, o di prendere tutte le transazioni che dovrebbero essere divise tra i due blocchi e invece includerli tutti in una volta, ottenendo tutte le commissioni associate. Questo potrebbe influenzare i validatori domestici più di quelli istituzionali sofisticati, che possono utilizzare metodi più avanzati per proteggersi dagli attacchi DOS e, dunque, potrebbero essere una forza centralizzante.

Esistono svariate soluzioni a questo problema. Una è la [Tecnologia dei Validatori Distribuiti](https://github.com/ethereum/distributed-validator-specs), che mira a distribuire i vari compiti relativi all'esecuzione di un validatore su più macchine, con ridondanza, in modo che sia molto più difficile per un utente malintenzionato impedire che un blocco venga proposto in un particolare slot. Tuttavia, la soluzione più robusta è l'**Elezione Segreta di un Singolo Leader (SSLE)**.

## Elezione segreta di un singolo leader {#secret-leader-election}

Nella SSLE, si utilizza una crittografia intelligente per assicurarsi che soltanto il validatore selezionato sappia di esser stato selezionato. Ciò funziona facendo inviare a ogni validatore un impegno a una frase segreta condivisa. Gli impegni sono mescolati e riconfigurati così che nessuno possa mapparli ai validatori, ma che ogni validatore sa quale gli appartiene. Poi, si sceglie un impegno a caso. Se un validatore rileva che è stato scelto il proprio impegno, sa che è il suo turno di proporre un blocco.

L'implementazione principale di questa idea si chiama [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Che funziona come segue:

1. I validatori si impegnano a una frase segreta condivisa. Lo schema di impegno è progettato così che possa essere vincolato all'identità di un validatore, nonché casualizzato, così che nessuna terza parte possa decodificarlo e collegare un impegno specifico a un validatore specifico.
2. All'inizio di un'epoca, una serie casuale di validatori è scelta per campionare gli impegni da 16.384 validatori, utilizzando RANDAO.
3. Per i prossimi 8182 spazi (1 giorno), i propositori di blocchi mescolano e randomizzano un sottoinsieme di impegni, utilizzando la propria entropia privata.
4. Dopo il termine del rimescolamento, RANDAO è utilizzato per creare un elenco ordinato di impegni. Questo elenco è mappato agli spazi di Ethereum.
5. I validatori vedono che il proprio impegno è collegato a uno spazio specifico e, quando quello spazio arriva, propongono un blocco.
6. Questi passaggi si ripetono così che l'assegnazione degli impegni agli spazi sia sempre di molto in avanti rispetto allo spazio corrente.

Questo impedisce agli utenti malevolo di sapere in anticipo quale validatore nello specifico proporrà il prossimo blocco, impedendo l'abilità di compiere attacchi DOS.

## Elezione segreta di leader non singolo (SnSLE) {#secret-non-single-leader-election}

Esiste anche una proposta separata che mira a creare uno scenario in cui ogni validatore ha una possibilità casuale di proporre un blocco in ogni slot, in modo simile a come la proposta del blocco veniva decisa con il proof-of-work, nota come **elezione segreta di leader non singolo (SnSLE)**. Un metodo semplice per compierla è utilizzare la funzione RANDAO per selezionare casualmente i validatori nel protocollo di oggi. L'idea con RANDAO è che un numero sufficientemente casuale è generato, mischiando gli hash inviati da molti validatori indipendenti. Nella SnSLE, questi hash potrebbero essere utilizzati per scegliere il propositore di blocchi successivo, ad esempio, scegliendo l'hash dal valore più basso. L'intervallo di hash validi potrebbe essere limitato, per sintonizzarsi alla probabilità che siano selezionati dei validatori singoli in ogni spazio. Affermando che l'hash deve essere inferiore a `2^256 * 5 / N` dove N = numero di validatori attivi, la possibilità che un singolo validatore venga selezionato in ogni slot sarebbe di `5/N`. In qusto esempio, esisterebbe una probabilità del 99,3% che almeno un propositore generi un hash valido in ogni spazio.

## Progressi attuali {#current-progress}

SSLE e SnSLE sono entrambi in fase di ricerca. Ancora non esiste una specifica finalizzata per alcuna delle due idee. SSLE e SnSLE sono proposte concorrenti che potrebbero entrambe non essere implementate. Prima di distribuirle, necessitano di ulteriore ricerca e sviluppo, prototipazione e implementazione sulle reti di prova pubbliche.

## Letture consigliate {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
