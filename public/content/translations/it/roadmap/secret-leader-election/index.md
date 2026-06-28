---
title: Elezione segreta del leader
description: Spiegazione di come l'elezione segreta del leader possa aiutare a proteggere i validatori dagli attacchi
lang: it
summaryPoints:
  - L'indirizzo IP dei proponenti del blocco può essere noto in anticipo, rendendoli vulnerabili agli attacchi
  - L'elezione segreta del leader nasconde l'identità dei validatori in modo che non siano conoscibili in anticipo
  - Un'estensione di questa idea è rendere casuale la selezione dei validatori in ogni slot.
---

Nell'odierno meccanismo di consenso basato sulla [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos), l'elenco dei futuri proponenti del blocco è pubblico ed è possibile mappare i loro indirizzi IP. Ciò significa che gli aggressori potrebbero identificare quali validatori devono proporre un blocco e prenderli di mira con un attacco denial-of-service (DOS) che li renda incapaci di proporre il loro blocco in tempo.

Questo potrebbe creare opportunità di profitto per un aggressore. Ad esempio, un proponente del blocco selezionato per lo slot `n+1` potrebbe colpire con un DOS il proponente nello slot `n` in modo che perda l'opportunità di proporre un blocco. Ciò consentirebbe al proponente del blocco attaccante di estrarre il MEV di entrambi gli slot, o di accaparrarsi tutte le transazioni che avrebbero dovuto essere suddivise in due blocchi e includerle invece tutte in uno solo, ottenendo tutte le commissioni associate. È probabile che questo colpisca i validatori domestici più dei sofisticati validatori istituzionali, i quali possono utilizzare metodi più avanzati per proteggersi dagli attacchi DOS, e potrebbe quindi rappresentare una forza centralizzante.

Esistono diverse soluzioni a questo problema. Una è la [tecnologia dei validatori distribuiti (DVT)](https://github.com/ethereum/distributed-validator-specs), che mira a distribuire i vari compiti relativi all'esecuzione di un validatore su più macchine, con ridondanza, in modo che sia molto più difficile per un aggressore impedire che un blocco venga proposto in un particolare slot. Tuttavia, la soluzione più robusta è la **Single Secret Leader Election (SSLE)**.

## Elezione segreta del leader singolo {#secret-leader-election}

Nella SSLE, viene utilizzata una crittografia intelligente per garantire che solo il validatore selezionato sappia di essere stato scelto. Questo funziona facendo in modo che ogni validatore invii un commitment a un segreto che tutti condividono. I commitment vengono mescolati e riconfigurati in modo che nessuno possa mappare i commitment ai validatori, ma ogni validatore sa quale commitment gli appartiene. Quindi, un commitment viene scelto a caso. Se un validatore rileva che il proprio commitment è stato scelto, sa che è il suo turno di proporre un blocco.

L'implementazione principale di questa idea si chiama [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Funziona nel modo seguente:

1. I validatori si vincolano (commit) a un segreto condiviso. Lo schema di commitment è progettato in modo tale da poter essere legato all'identità di un validatore, ma anche randomizzato in modo che nessuna terza parte possa decodificare il legame e collegare un commitment specifico a un validatore specifico.
2. All'inizio di un'epoca, viene scelto un insieme casuale di validatori per campionare i commitment da 16.384 validatori, utilizzando RANDAO.
3. Per i successivi 8182 slot (1 giorno), i proponenti del blocco mescolano e randomizzano un sottoinsieme dei commitment utilizzando la propria entropia privata.
4. Al termine del mescolamento, RANDAO viene utilizzato per creare un elenco ordinato dei commitment. Questo elenco viene mappato sugli slot di Ethereum.
5. I validatori vedono che il loro commitment è associato a uno slot specifico e, quando arriva quello slot, propongono un blocco.
6. Questi passaggi vengono ripetuti in modo che l'assegnazione dei commitment agli slot sia sempre molto in anticipo rispetto allo slot corrente.

Questo impedisce agli aggressori di sapere in anticipo quale validatore specifico proporrà il blocco successivo, prevenendo la possibilità di attacchi DOS.

## Elezione segreta del leader non singolo (SnSLE) {#secret-non-single-leader-election}

Esiste anche una proposta separata che mira a creare uno scenario in cui i validatori abbiano ciascuno una probabilità casuale di proporre un blocco in ogni slot, in modo simile a come veniva decisa la proposta del blocco con la Prova di lavoro (PoW), nota come **elezione segreta del leader non singolo (SnSLE)**. Un modo semplice per farlo è utilizzare la funzione RANDAO impiegata per selezionare casualmente i validatori nel protocollo odierno. L'idea alla base di RANDAO è che un numero sufficientemente casuale venga generato mescolando gli hash inviati da molti validatori indipendenti. Nella SnSLE, questi hash potrebbero essere utilizzati per scegliere il successivo proponente del blocco, ad esempio scegliendo l'hash con il valore più basso. L'intervallo di hash validi potrebbe essere limitato per regolare la probabilità che i singoli validatori vengano selezionati in ogni slot. Affermando che l'hash deve essere inferiore a `2^256 * 5 / N` dove `N` = numero di validatori attivi, la probabilità che un singolo validatore venga selezionato in ogni slot sarebbe `5/N`. In questo esempio, ci sarebbe una probabilità del 99,3% che almeno un proponente generi un hash valido in ogni slot.

## Progressi attuali {#current-progress}

Sia la SSLE che la SnSLE sono nella fase di ricerca. Non esiste ancora una specifica finalizzata per nessuna delle due idee. La SSLE e la SnSLE sono proposte in competizione che non potrebbero essere implementate entrambe. Prima del rilascio necessitano di ulteriore ricerca e sviluppo, prototipazione e implementazione su testnet pubbliche.

## Letture di approfondimento {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)