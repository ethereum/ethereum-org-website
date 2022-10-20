---
title: "Guida dettagliata al contratto Uniswap-v2"
description: Come funziona il contratto Uniswap-v2? Perché è scritto così?
author: Ori Pomerantz
tags:
  - "solidity"
  - "uniswap"
skill: intermediate
published: 2021-05-01
lang: it
---

## Introduzione {#introduction}

[Uniswap v2](https://uniswap.org/whitepaper.pdf) può creare un mercato di scambio tra due token ERC-20. In questo articolo analizzeremo il codice sorgente per i contratti che implementano questo protocollo e vedremo perché sono scritti in questo modo.

### Cosa fa Uniswap? {#what-does-uniswap-do}

Fondamentalmente, esistono due tipi di utenti: fornitori di liquidità e trader.

I _fornitori di liquidità_ forniscono al pool i due token scambiabili (li chiameremo **Token0** e **Token1**). In cambio, ricevono un terzo token che rappresenta la proprietà parziale del pool, detto _token di liquidità_.

I _trader_ inviano un tipo di token al pool e ricevono l'altro (ad esempio, invii **Token0** e ricevi **Token1**) dal pool fornito dai fornitori di liquidità. Il tasso di cambio è determinato dal numero relativo di **Token0** e **Token1** che il pool possiede. Inoltre, il pool prende una piccola percentuale come ricompensa per il pool di liquidità.

Quando i fornitori di liquidità rivogliono indietro le loro risorse, possono bruciare i token del pool e ricevere i token, compresa la quota di ricompense.

[Clicca qui per una descrizione completa](https://uniswap.org/docs/v2/core-concepts/swaps/).

### Perché v2? Perché non v3? {#why-v2}

Mentre scrivo il presente articolo, [Uniswap v3](https://uniswap.org/whitepaper-v3.pdf) è quasi pronto. Tuttavia, è un aggiornamento molto più complicato dell'originale. È più facile imparare prima la v2 e poi passare alla v3.

### Contratti principali e contratti periferici {#contract-types}

Uniswap v2 è diviso in due componenti, una principale e una periferica. Questa divisione consente ai contratti principali, che detengono le risorse e dunque _devono_ essere sicuri, di essere più semplici e facili da controllare. Tutte le funzionalità aggiuntive richieste dai trader possono essere fornite dai contratti periferici.

## Flussi di dati e di controllo {#flows}

Questo è il flusso di dati e controllo che si verifica quando esegui le tre azioni principali di Uniswap:

1. Scambi token diversi
2. Aggiungi liquidità al mercato e vieni ricompensato con token di liquidità ERC-20 di pari valore
3. Bruci token di liquidità di ERC-20 e ne ottieni altri, con uno scambio in pari che consente lo scambio ai trader

### Scambio {#swap-flow}

Questo è il flusso più comune, usato dai trader:

#### Chiamante {#caller}

1. Fornisce al conto perifierico un'allowance nell'importo da scambiare.
2. Chiama una delle tante funzioni di scambio del contratto periferico (la funzione chiamata dipende dal fatto che siano o meno coinvolti ETH, dal fatto che il trader specifichi l'importo di token da depositare o da prelevare, ecc.). Ogni funzione di scambio accetta un `path`, un insieme di scambi da attraversare.

#### Nel contratto periferico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identifica l'importo necessario da scambiare su ogni scambio lungo il percorso.
4. Itera sul percorso. Per ogni scambio lungo il percorso, invia il token di input e poi chiama la funzione di `swap` dello scambio. In gran parte dei casi, l'indirizzo di destinazione per i token è lo scambio in pari successivo nel percorso. Nello scambio finale è l'indirizzo fornito dal trader.

#### Nel contratto principale (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Verifica che il contratto principale non raggiri il sistema e possa mantenere liquidità sufficiente dopo lo scambio.
6. Vede quanti token aggiuntivi abbiamo, in aggiunta alle riserve note. Quell'importo è il numero di token di input ricevuti da scambiare.
7. Invia i token d'output alla destinazione.
8. Chiama `_update` per aggiornare gli importi della riserva

#### Di nuovo nel contratto periferico (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Esegue ogni pulizia necessaria (ad esempio, brucia i token di WET per riottenere ETH da inviare al trader)

### Aggiungere liquidità {#add-liquidity-flow}

#### Chiamante {#caller-2}

1. Fornisce al conto periferico un'allowance negli importi da aggiungere al pool di liquidità.
2. Chiama una delle funzioni addLiquidity del contratto periferico.

#### Nel contratto periferico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Crea un nuovo scambio in pari se necessario
4. Se c'è uno scambio in pari esistente, calcola l'importo di token da aggiungere. Questo dovrebbe essere un valore identico per entrambi i token, quindi lo stesso rapporto tra token nuovi ed esistenti.
5. Controlla se gli importi sono accettabili (i chiamanti possono specificare un importo minimo al di sotto del quale preferirebbero non aggiungere liquidità)
6. Chiama il contratto principale.

#### Nel contratto principale (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Conia token di liquditià e li invia al chiamante
8. Chiama `_update` per aggiornare gli importi della riserva

### Rimuovere la liquidità {#remove-liquidity-flow}

#### Chiamante {#caller-3}

1. Fornisce al conto periferico un'allowance di token di liquidità da bruciare in cambio dei token sottostanti.
2. Chiama una delle funzioni removeLiquidity del contratto periferico.

#### Nel contratto periferico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Invia i token di liquidità allo scambio in pari

#### Nel contratto principale (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Invia all'indirizzo di destinazione i token sottostanti in proporzione ai token bruciati. Ad esempio, se ci sono 1.000 token A nel pool, 500 token B e 90 token di liquidità e ne riceviamo 9 da bruciare, bruciamo il 10% dei token di liquidità, quindi reinviamo all'utente 100 token A e 50 token B.
5. Brucia i token di liquidità
6. Chiama `_update` per aggiornare gli importi della riserva

## I contratti principali {#core-contracts}

Questi sono i contratti sicuri che detengono la liquidità.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Questo contratto](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementa il pool reale che scambia i token. È la funzionalità principale di Uniswap.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

Queste sono tutte le interfacce di cui il contratto deve essere a conoscenza, perché le implementa (`IUniswapV2Pair` and `UniswapV2ERC20`) o perché chiama i contratti che le implementano.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Questo contratto eredita da `UniswapV2ERC20`, che fornisce le funzioni di ERC-20 per i token di liquidità.

```solidity
    using SafeMath  for uint;
```

La [libreria SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) è usata per evitare flussi eccessivi o insufficienti. È un aspetto importante perché altrimenti potremmo finire in una situazione in cui il valore dovrebbe essere `-1`, ma invece è `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Molti calcoli nel contratto di pool richiedono l'uso di frazioni. Tuttavia, le frazioni non sono supportate dall'EVM. La soluzione che Uniswap ha trovato è usare valori a 224 bit, con 112 bit per la parte intera e 112 bit per la frazione. Quindi `1.0` è rappresentato come `2^112`, `1.5` è rappresentato come `2^112 + 2^111`, ecc.

Ulteriori dettagli su questa libreria sono disponibili [più in avanti nel documento](#FixedPoint).

#### Variabili {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Per evitare casi di divisione per zero, esiste un numero minimo di token di liquidità che esiste sempre (ma è posseduto dal conto zero). Quel numero è **MINIMUM_LIQUIDITY**, mille.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Questo è il selettore dell'ABI per la funzione di trasferimento dell'ERC-20. È usato per trasferire i token ERC-20 nei due conti di token.

```solidity
    address public factory;
```

Questo è il contratto factory che ha creato questo pool. Ogni pool rappresenta uno scambio tra due token ERC-20, dove factory è un punto centrale che connette tutti questi pool.

```solidity
    address public token0;
    address public token1;
```

Sono gli indirizzi dei contratti per due tipi di token ERC-20, scambiabili da questo pool.

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
```

Le riserve che il pool ha per ogni tipo di token. Supponiamo che i due rappresentino la stessa quantità di valore e dunque che ogni token0 valga token1 di reserve1/reserve0.

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves
```

La marca oraria dall'ultimo blocco in cui si è verificato uno scambio, usata per tracciare i tassi di cambio nel tempo.

Una delle più grandi spese di gas dei contratti di Ethereum è la memoria, che persiste da una chiamata del contratto alla successiva. Ogni cella di memoria è lunga 256 bit. Tre variabili, reserve0, reserve1 e blockTimestampLast, sono quindi allocate in modo che un solo valore di memoria possa comprenderle tutte e tre (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Queste variabili contengono i costi cumulativi per ogni token (ognuna nel termine dell'altra). Sono utilizzabili per calcolare il tasso di cambio medio su un periodo di tempo.

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event
```

Il modo in cui lo scambio in pari decide sul tasso di cambio tra token0 e token1 consiste nel mantenere il multiplo delle due riserve costanti durante gli scambi. `kLast` è questo valore. Cambia quando un fornitore di liquidità deposita o preleva token e aumenta lievemente a causa della commissione di mercato dello 0,3%.

Ecco un semplice esempio. Nota che per semplicità la tabella ha solo tre cifre dopo la virgola decimale e che ignoriamo la commissione di gas dello 0,3%, quindi i numeri non sono accurati.

| Evento                                        |  reserve0 |  reserve1 | reserve0 \* reserve1 | Tasso di cambio medio (token1/token0) |
| --------------------------------------------- | --------: | --------: | -------------------: | ------------------------------------- |
| Configurazione iniziale                       | 1.000,000 | 1.000,000 |            1.000.000 |                                       |
| Trader A scambia 50 token0 per 47,619 token1  | 1.050,000 |   952,381 |            1.000.000 | 0,952                                 |
| Trader B scambia 10 token0 per 8,984 token1   | 1.060,000 |   943,396 |            1.000.000 | 0,898                                 |
| Trader C scambia 40 token0 per 34,305 token1  | 1.100,000 |   909,090 |            1.000.000 | 0,858                                 |
| Trader D scambia 100 token1 per 109,01 token0 |   990,990 | 1.009,090 |            1.000.000 | 0,917                                 |
| Trader E scambia 10 token0 per 10,079 token1  | 1.000,990 |   999,010 |            1.000.000 | 1,008                                 |

Man mano che i trader forniscono più token0, il valore relativo di token1 aumenta, e viceversa, in basel all'offerta e alla domanda.

#### Bloccare {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Esiste una classe di vulnerabilità di sicurezza basata sull'[abuso di rientrata](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap deve trasferire token ERC-20 arbitrari, ovvero chiamare i contratti ERC-20 che potrebbero tentare di abusare del mercato di Uniswap che li chiama. Avendo una variabile `unlocked` inserita nel contratto, possiamo evitare che le funzioni vengano chiamate mentre sono in esecuzione (nella stessa transazione).

```solidity
    modifier lock() {
```

Questa funzione è un [modificatore](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), una funzione che avvolge una funzione normale per cambiarne in qualche modo il comportamento.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Se `unlocked` è pari a uno, impostalo su zero. Se è già zero, ripristina la chiamata, facendola fallire.

```solidity
        _;
```

In un modificatore `_;` è la chiamata alla funzione originale (con tutti i parametri). Significa che la chiamata della funzione ha luogo solo se `unlocked` era su uno quando è stata chiamata e, mentre è in esecuzione, il valore di `unlocked` è zero.

```solidity
        unlocked = 1;
    }
```

Al ritorno della funzione principale, rilascia il blocco.

#### Funzioni varie {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Questa funzione fornisce ai chiamanti lo stato corrente dello scambio. Nota che le funzioni di Solidity [possono restituire valori multipli](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Questa funzione interna trasferisce un importo di token ERC20 dallo scambio a qualcun altro. `SELECTOR` specifica che la funzione che stiamo chiamando è `transfer(address,uint)` (vedi la definizione sopra).

Per evitare di dover importare un'interfaccia per la funzione del token, creiamo "manualmente" la chiamata usando una delle [funzioni dell'ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Esistono due modi in cui una chiamata di trasferimento ERC-20 può segnalare il fallimento:

1. Ripristina. Se una chiamata a un contratto esterno si annulla, allora il valore di restituzione booleano è `false`
2. Termina normalmente ma segnala un guasto. In quel caso il buffer del valore restituito ha una lunghezza diversa da zero e, quando viene codificato come valore booleano, è `false`

Se una di queste condizioni si verifica, ripristina.

#### Eventi {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Questi due eventi sono emessi quando un fornitore di liquidità deposita (`Mint`) o preleva (`Burn`) liquidità. In ogni caso, gli importi di token0 e token1 depositati o prelevati fanno parte dell'evento, così come l'identità del conto che ci ha chiamati (`sender`). Nel caso di un prelievo, l'evento include anche la destinazione che ha ricevuto i token (`to`), che potrebbe non essere pari al mittente.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

Questo evento è emesso quando un trader scambia un token per l'altro. Ancora, il mittente e la destinazione potrebbero non corrispondere. Ogni token potrebe essere inviato allo scambio o ricevuto da esso.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Infine, `Sync` viene emesso ogni volta che i token sono aggiunti o prelevati, indipendentemente dal motivo, per fornire le ultime informazioni sulla riserva (e dunque il tasso di cambio).

#### Funzioni di configurazione {#pair-setup}

Queste funzioni dovrebbero essere chiamate una volta che il nuovo scambio in pari è configurato.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Il costruttore si assicura che terremo traccia dell'indirizzo della factory che ha creato la coppia. Queste informazioni sono necessarie per `initialize` e per la commissione di factory (se presente)

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

Questa funzione consente alla factory (e solo a essa) di specificare i due token ERC-20 che questa coppia scambierà.

#### Funzioni di aggiornamento interno {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Questa funzione è chiamata ogni volta che i token vengono depositati o prelevati.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Se balance0 o balance1 (uint256) è maggiore di uint112(-1) (=2^112-1) (quindi va in overflow e torna a 0 quando viene convertita in uint112), rifiuta di continuare \_update per prevenire l'overflow. Con un token normale suddivisibile in 10^18 unità, questo significa che ogni scambio è limitato a circa 5,1\*10^15 di ogni token. Finora non è stato un problema.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Se il tempo trascorso è diverso da zero, significa che la nostra è la prima transazione di scambio su questo blocco. In tal caso, dobbiamo aggiornare gli accumulatori del costo.

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Ogni accumulatore del costo è aggiornato con l'ultimo costo (riserva dell'altro token/riserva di questo token) per il tempo trascorso in secondi. Per ottenere un prezzo medio leggi il prezzo cumulativo di due punti nel tempo e dividi per la differenza di tempo tra loro. Ad esempio, supponiamo questa sequenza di eventi:

| Evento                                               |  reserve0 |  reserve1 | marca oraria | Tasso di cambio marginale (reserve1/reserve0) |       price0CumulativeLast |
| ---------------------------------------------------- | --------: | --------: | ------------ | --------------------------------------------: | -------------------------: |
| Configurazione iniziale                              | 1.000,000 | 1.000,000 | 5.000        |                                         1,000 |                          0 |
| Trader A deposita 50 token0 e ottiene 47,619 token1  | 1.050,000 |   952,381 | 5.020        |                                         0,907 |                         20 |
| Trader B deposita 10 token0 e ottiene 8,984 token1   | 1.060,000 |   943,396 | 5.030        |                                         0,890 |       20+10\*0,907 = 29,07 |
| Trader C deposita 40 token0 e ottiene 34,305 token1  | 1.100,000 |   909,090 | 5.100        |                                         0,826 |    29,07+70\*0,890 = 91,37 |
| Trader D deposita 100 token0 e ottiene 109,01 token1 |   990,990 | 1.009,090 | 5.110        |                                         1,018 |    91,37+10\*0,826 = 99,63 |
| Trader E deposita 10 token0 e ottiene 10,079 token1  | 1.000,990 |   999,010 | 5.150        |                                         0,998 | 99,63+40\*1.1018 = 143,702 |

Diciamo che vogliamo calcolare il prezzo medio di **Token0** tra le marche orarie 5.030 e 5.150. La differenza nel valore di `price0Cumulative` è 143,702-29,07=114,632. Questa è la media in due minuti (120 secondi). Quindi il prezzo medio è 114,632/120 = 0,955.

Questo calcolo del prezzo è il motivo per cui dobbiamo conoscere le dimensioni della vecchia riserva.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Infine, aggiorna le variabili globali ed emetti un evento `Sync`.

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

In Uniswap 2.0 i trader pagano una commissione dello 0,30% per usare il mercato. Gran parte di tale commissione (0,25% della transazione) va sempre ai fornitori di liquidità. Il rimanente 0,05% può andare ai fornitori di liquidità o a un indirizzo specificato dalla factory come commissione di protocollo, che paga Uniswap per l'attività di sviluppo.

Per ridurre i calcoli (e dunque i costi del carburante), tale commissione è calcolata solo quando la liquidità viene aggiunta o rimossa dal pool, anziché ad ogni operazione.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Leggi la destinazione della commissione della factory. Se è zero, allora non esiste alcuna commissione di protocollo e non serve calcolarla.

```solidity
        uint _kLast = kLast; // gas savings
```

La variabile di stato `kLast` si trova in memoria, quindi avrà un valore tra diverse chiamate al contratto. L'accesso all'archiviazione è molto più costoso dell'accesso alla memoria volatile rilasciata quando termina la chiamata alla funzione al contratto, quindi usiamo una variabile interna per risparmiare sul carburante.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

I fornitori di liquidità ottengono la loro parte semplicemente mediante l'apprezzamento dei loro token di liquidità. Ma la commissione di protocollo richiede che i nuovi token di liquidità siano coniati e forniti all'indirizzo `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Se c'è nuova liquidità su cui raccogliere una commissione di protocollo. Puoi vedere la funzione della radice quadrata [più avanti in questo articolo](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Questo complicato calcolo delle commissioni è spiegato nel [whitepaper](https://uniswap.org/whitepaper.pdf) a pagina 5. Sappiamo che, tra il momento in cui `kLast` è stato calcolato e il presente, non è stata aggiunta o rimossa liquidità (perché eseguiamo questo calcolo ogni volta che la liquidità viene aggiunta o rimossa, prima che cambi effettivamente), quindi qualunque modifica a `reserve0 * reserve1` deve provenire dalle commissioni di transazione (senza di esse manterremmo `reserve0 * reserve1` costante).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Usa la funzione `UniswapV2ERC20._mint` per creare realmente i token aggiuntivi di liquidità e assegnali a `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Se non c'è alcuna commissione con `kLast` impostato a zero (se non è già così). Alla scrittura di questo contratto, esisteva una [funzionalità di rimborso del carburante](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-3298.md) che incoraggiava i contratti a ridurre la dimensione generale dello stato di Ethereum azzerando l'archiviazione non necessaria. Questo codice ottiene quel rimborso, se possibile.

#### Funzioni accessibili esternamente {#pair-external}

Nota che, anche se ogni transazione o contratto _può_ chiamare queste funzioni, esse sono progettate per essere chiamate dal contratto periferico. Se le chiami direttamente, non potrai barare sullo scambio in pari, ma potresti perdere valore a causa di un errore.

##### mint

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
```

Questa funzione viene chiamata quando un fornitore di liquidità aggiunge liquidità al pool. Essa conia token di liquidità aggiuntivi a titolo di ricompensa. Dovrebbe essere chiamata da [un contratto periferico](#UniswapV2Router02) che la chiama dopo aver aggiunto la liquidità alla stessa transazione (quindi nessun altro può inviare una transazione che rivendichi la nuova liquidità prima del proprietario legittimo).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
```

Questo è il modo per leggere i risultati di una funzione di Solidity che restituisce valori multipli. Scartiamo gli ultimi valori restituiti, la marca oraria del blocco, perché non ci servono più.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Ottiene i saldi correnti e vede quanto è stato aggiunto di ogni tipo di token.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Calcola le commissioni di protocollo da raccogliere, se presenti, e conia token di liquidità di conseguenza. Poiché i parametri relativi a `_mintFee` sono valori di riserva vecchi, la commissione viene calcolata accuratamente solo secondo le modifiche al pool causate dalle commissioni.

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
```

Se questo è il primo deposito, crea `MINIMUM_LIQUIDITY` token e inviali all'indirizzo zero per bloccarli. Non saranno mai riscattabili, il che significa che il pool non sarà mai svuotato completamente (questo ci salva dalla divisione per zero in alcuni punti). Il valore di `MINIMUM_LIQUIDITY` è mille e, considerando che gran parte dell'ERC-20 è suddivisa in unità di 10^-18 di un token, come ETH è diviso in wei, corrisponde a 10^-15 al valore di un singolo token. Non è quindi un costo elevato.

Al momento del primo deposito non conosciamo il valore relativo dei due token, quindi ci limitiamo a moltiplicare gli importi e calcoliamo la radice quadrata, supponendo che il deposito ci fornisca un valore pari in entrambi i token.

Possiamo fidarci perché è nell'interesse del depositante fornire un valore pari, così da evitare di perdere valore all'arbitraggio. Diciamo che il valore dei due token è identico, ma il nostro depositante ha depositato quattro volte tanto di **Token1** rispetto al **Token0**. Un trader può avvalersi del fatto che lo scambio in pari pensi che **Token0** sia più prezioso per ricavarne valore.

| Evento                                                        | reserve0 | reserve1 | reserve0 \* reserve1 | Valore del pool (reserve0 + reserve1) |
| ------------------------------------------------------------- | -------: | -------: | -------------------: | ------------------------------------: |
| Configurazione iniziale                                       |        8 |       32 |                  256 |                                    40 |
| Il trader deposita 8 token **Token0** e ottiene 16 **Token1** |       16 |       16 |                  256 |                                    32 |

Come puoi vedere, il trader ha guadagnato 8 token extra, che provengono da una riduzione nel valore del pool, danneggiando il depositante che li possiede.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Con ogni deposito successivo, conosciamo già il tasso di cambio tra i due attivi e prevediamo che i fornitori di liquidità forniranno pari valore per entrambe. Altrimenti, diamo loro token di liquidità in base al valore inferiore che hanno fornito, a titolo di punizione.

Che sia il deposito iniziale o uno successivo, il numero di token di liquidità che forniamo è pari alla radice quadrata del cambio in `reserve0*reserve1` e il valore del token di liquidità non cambia (salvo in presenza di un deposito che non abbia valori pari per entrambi i tipi, nel qual caso la "multa" viene distribuita). Ecco un altro esempio con due token dallo stesso valore, con tre depositi validi e uno inadeguato (deposito di un solo tipo di token, quindi non produce alcun token di liquidità).

| Evento                      | reserve0 | reserve1 | reserve0 \* reserve1 | Valore del pool (reserve0 + reserve1) | Token di liquidità coniati per questo deposito | Token di liquidità totali | Valore di ciascun token di liquidità |
| --------------------------- | -------: | -------: | -------------------: | ------------------------------------: | ---------------------------------------------: | ------------------------: | -----------------------------------: |
| Configurazione iniziale     |    8,000 |    8,000 |                   64 |                                16,000 |                                              8 |                         8 |                                2,000 |
| Deposita quattro per tipo   |   12,000 |   12,000 |                  144 |                                24,000 |                                              4 |                        12 |                                2,000 |
| Deposita due per tipo       |   14,000 |   14,000 |                  196 |                                28,000 |                                              2 |                        14 |                                2,000 |
| Deposito di valore non pari |   18,000 |   14,000 |                  252 |                                32,000 |                                              0 |                        14 |                               ~2,286 |
| Dopo l'arbitraggio          |  ~15,874 |  ~15,874 |                  252 |                               ~31,748 |                                              0 |                        14 |                               ~2,267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Usa la funzione `UniswapV2ERC20._mint` per creare realmente i token aggiuntivi di liquidità e dare loro l'importo corretto.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

Aggiorna le variabili di stato (`reserve0`, `reserve1` e, all'occorrenza, `kLast`) ed emetti l'evento appropriato.

##### burn

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Questa funzione viene chiamata quando la liquidità è prelevata e i token di liquidità appropriati devono essere bruciati. Dovrebbe essere chiamata anche [da un conto periferico](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Il contratto periferico ha trasferito la liquidità da bruciare a questo contratto prima della chiamata. Così sappiamo quanta liquidità bruciare e ci possiamo assicurare che sia bruciata.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Il fornitore della liquidità riceve pari valore di entrambi i token. In questo modo non modifichiamo il tasso di cambio.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Il resto della funzione `burn` è speculare alla funzione `mint` di cui sopra.

##### swap

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Anche questa funzione dovrebbe essere chiamata da [un contratto periferico](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
```

Le variabili locali sono memorizzabili in memoria o, se sono troppe, direttamente sullo stack. Se possiamo limitare il numero in modo da usare lo stack consumeremo meno carburante. Per ulteriori dettagli vedi [lo yellow paper, le specifiche formali di Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), p. 26, equazione 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
```

Questo trasferimento è ottimistico, perché trasferiamo prima di essere sicuri che tutte le condizioni siano soddisfatte. Su Ethereum possiamo farlo perché, se le condizioni non sono risultassero soddisfatte nella chiamata, potremo sempre ripristinare allo stato prima di essa e di eventuali modifiche.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informa il ricevente dello scambio, se richiesto.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Ottieni i saldi correnti. Il contratto periferico ci invia i token prima di chiamarci per lo scambio. In questo modo il contratto può verificare facilmente di non essere oggetto di truffe; tale controllo _deve_ verificarsi nel contratto principale (perché possiamo essere chiamati da altre entità oltre che dal nostro contratto periferico).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Questo è un controllo di sicurezza, per assicurarsi di non perdere in seguito allo scambio. Non esiste alcuna circostanza in cui uno scambio dovrebbe ridurre `reserve0*reserve1`. Questo è anche il punto in cui garantiamo che una commissione dello 0,3% è inviata allo scambio; prima di verificare lo stato di salute di K, moltiplichiamo entrambi i saldi per 1000 meno gli importi moltiplicati per 3, questo significa che lo 0,3% (3/1000 = 0,003 = 0,3%) viene dedotto dal saldo prima di confrontare il suo valore K con il valore K delle riserve correnti.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Aggiorna `reserve0` e `reserve1` e, se necessario, gli accumulatori di prezzo e la marca oraria ed emetti un evento.

##### Sincronizzazione o Skim {#sync-or-skim}

È possibile che i saldi reali si desincronizzino rispetto alle riserve considerate dallo scambio in pari. Non c'è modo di prelevare i token senza il consenso del contratto, ma i depositi sono una questione diversa. Un conto può trasferire i token allo scambio senza chiamare `mint` o `swap`.

In quel caso ci sono due soluzioni:

- `sync`, che aggiorna le riserve in base ai saldi correnti
- `skim`, che preleva l'importo aggiuntivo. Nota che ogni conto ha la facoltà di chiamare `skim` perché non sappiamo chi ha depositato i token. Queste informazioni sono emesse in un evento, ma gli eventi non sono accessibili dalla blockchain.

```solidity
    // force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // force reserves to match balances
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Questo contratto](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) crea gli scambi in pari.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Queste variabili di stato sono necessarie per implementare la commissione di protocollo (vedi [il whitepaper](https://uniswap.org/whitepaper.pdf), p. 5). L'indirizzo `feeTo` accumulata i token di liquidità per la commissione di protocollo e `feeToSetter` è l'indirizzo che può modificare `feeTo` con un indirizzo diverso.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Queste variabili tracciano le coppie, gli scambi tra due tipi di token.

Il primo, `getPair`, è una mappatura che identifica uno contratto di scambio in pari basato sui due token ERC-20 scambiati. I token ERC-20 sono identificati dagli indirizzi dei contratti che li implementano, quindi le chiavi e il valore sono tutti indirizzi. Per ottenere l'indirizzo dello scambio in pari che ti consente di convertire da `tokenA` a `tokenB`, usi `getPair[<tokenA address>][<tokenB address>]` (o viceversa).

La seconda variabile, `allPairs`, è un insieme che include tutti gli indirizzi di scambi in pari creati da questa factory. In Ethereum non puoi iterare sul contenuto di una mappatura od ottenere un elenco di tutte le chiavi, quindi questa variabile è l'unico modo per sapere quali scambi sono gestiti da questa factory.

Nota: Il motivo per cui non puoi iterare su tutte le chiavi di una mappatura è che l'archiviazione dei dati del contratto è _costosa_, quindi meno la modifichiamo, meglio è. Puoi creare delle [mappature che supportano l'iterazione](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), ma richiedono memoria aggiuntiva per un elenco di chiavi. In gran parte delle applicazioni, non ne hai bisogno.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Questo evento è emesso quando viene creato un nuovo scambio in pari. Include gli indirizzi dei token, l'indirizzo dello scambio in pari e il numero totale di scambi gestiti dalla factory.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

La sola cosa che fa il costruttore è specificare `feeToSetter`. Le factory iniziano senza una commissione e solo `feeSetter` può modificare questo punto.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Questa funzione restituisce il numero di scambi in pari.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Questa è la funzione principale della factory, per creare uno scambio in pari tra due token ERC-20. Nota che chiunque può chiamare questa funzione. Non occorre l'autorizzazione di Uniswap per creare un nuovo scambio in pari.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Vogliamo che l'indirizzo del nuovo scambio sia deterministico, così che sia calcolabile in anticipo al di fuori della catena (questo può essere utile per le [transazioni di livello 2](/developers/docs/layer-2-scaling/)). Per farlo dobbiamo avere un ordine coerente degli indirizzi del token, indipendentemente dall'ordine in cui le abbiamo ricevute, per cui le smistiamo qui.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
```

I pool di liquidità di grandi dimensioni sono meglio rispetto a quelli piccoli, in quanto hanno prezzi più stabili. Non vogliamo avere più di un solo pool di liquidità per coppia di token. Se esiste già uno scambio, non serve crearne un altro per la stessa coppia.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Per creare un nuovo contratto ci serve il codice che lo crea (sia la funzione del costruttore sia il codice che scrive sulla memoria il bytecode dell'EVM del contratto reale). Normalmente, in Solidity, è sufficiente usare `addr = new <name of contract>(<constructor parameters>)` e il compilatore pensa a tutto il resto, mentre per avere un indirizzo del contratto deterministico, dobbiamo usare [l'opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014). Quando questo codice è stato scritto, quell'opcode non era ancora supportato da Solidity, quindi occorreva ottenere manualmente il codice. Questo aspetto non è più un problema, perché ora [Solidity supporta CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Quando un opcode non è ancora supportato da Solidity, possiamo chiamarlo usando l'[assemblaggio in linea](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Chiama la funzione `initialize` per dire al nuovo scambio quale coppia di token scambiare.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Salva le informazioni della nuova copia nelle variabili di stato ed emetti un evento per informare tutti dello scambio della nuova coppia.

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

Queste due funzioni consentono a `feeSetter` di controllare il destinatario della commissione (se presente) e di modificare `feeSetter` impostando un nuovo indirizzo.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Questo contratto](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementa il token di liquidità ERC-20. È simile al [contratto ERC-20 di OpenWhisk](/developers/tutorials/erc20-annotated-code), quindi spiegherò solo la parte diversa, la funzionalità `permit`.

Le transazioni su Ethereum costano ether (ETH), equivalente al denaro reale. Se hai token ERC-20 ma non ETH, non puoi inviare transazioni, quindi non puoi farci nulla. Una soluzione per evitare questo problema sono le [meta-transazioni](https://docs.uniswap.org/protocol/V2/guides/smart-contract-integration/supporting-meta-transactions/). Il proprietario dei token firma una transazione che consenta ad altri di prelevare i token al di fuori della catena e la invia al destinatario usando Internet. Il destinatario, che ha ETH a disposizione, invia il permesso per conto del proprietario.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Questo hash è l'[identificativo per il tipo di transazione](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Il solo che supportiamo qui è `Permit` con questi parametri.

```solidity
    mapping(address => uint) public nonces;
```

Un destinatario non può falsificare una firma digitale. Tuttavia, un'azione piuttosto banale consiste nell'inviare la stessa transazione due volte (è una forma di [replay attack](https://wikipedia.org/wiki/Replay_attack)). Per impedirlo, usiamo un [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Se il nonce di un nuovo `Permit` non è uno in più dell'ultimo usato, supponiamo che non sia valido.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Questo è il codice per recuperare l'[identificativo della catena](https://chainid.network/). Esso utilizza un dialetto d'assemblaggio dell'EVM chiamato [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Nota che nella versione corrente di Yul devi usare `chainid()`, non `chainid`.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

Calcola il [separatore di dominio](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) per EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Questa è la funzione che implementa le autorizzazioni. Riceve come parametri i campi pertinenti e i tre valori scalari per [la firma](https://yos.io/2018/11/16/ethereum-signatures/) (v, r e s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Non accettare le transazioni dopo la scadenza.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` è il messaggio che ci aspettiamo di ricevere. Sappiamo quale dovrebbe essere il valore del nonce, quindi non serve ottenerlo come parametro.

L'algoritmo di firma di Ethereum prevede di ottenere 256 bit da firmare, quindi usiamo la funzione di hash `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Dal digest e la firma, possiamo ottenere l'indirizzo che lo ha firmato usando [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Se è tutto corretto, trattala come [un'approvazione di ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## I contratti periferici {#periphery-contracts}

I contratti periferici sono l'API (interfaccia del programma applicativo) per Uniswap. Sono disponibili per le chiamate esterne, da altri contratti o applicazioni decentralizzate. I contratti principali possono essere chiamati direttamente, ma è più complicato e si rischia di perdere valore in caso di errore. I contratti principali contengono solo test, al fine di evitare truffe, e non controlli di sicurezza per chiunque altro. Questi ultimi sono contenuti nei contratti periferici, in modo da essere aggiornabili all'occorrenza.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Questo contratto](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) è problematico e [non dovrebbe essere più usato](https://uniswap.org/docs/v2/smart-contracts/router01/). Fortunatamente, i contratti periferici sono privi di stato e non detengono alcuna risorsa, quindi è facile deprecarli e suggerire alle persone di usare una soluzione alternativa, ad esempio `UniswapV2Router02`.

### UniswapV2Router02.sol {#UniswapV2Router02}

In gran parte dei casi puoi usare Uniswap tramite [questo contratto](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol). Puoi vedere come usarlo [qui](https://uniswap.org/docs/v2/smart-contracts/router02/).

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

Gran parte di questi li abbiamo incontrati precedentemente oppure sono piuttosto ovvi. L'unica eccezione è `IWETH.sol`. Uniswap v2 consente scambi per ogni coppia di token ERC-20, ma l'ether (ETH) stesso non è un token ERC-20. Precede lo standard ed è trasferito da meccanismi unici. Per consentire l'uso di ETH nei contratti che applicano i token ERC-20, è stato escogitato il contratto [wrapped ether (WETH)](https://weth.io/). Inviando questo contratto ETH viene coniato un importo equivalente di WETH. Oppure è possibile bruciare WETH per riottenere ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Il router deve sapere quale factory usare e, per le transazioni che richiedono WETH, quale contratto WETH usare. Questi valori sono [immutabili](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), a significare che sono impostabili solo nel costruttore. Questo rassicura gli utenti circa il fatto che nessuno potrebbe modificarli in modo da farli diventare contratti meno onesti.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Questo modificatore si assicura che le transazioni a tempo limitato ("Se puoi, fai X prima di Y") non si verifichino dopo il tempo limite.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Il costruttore si limita a impostare le variabili di stato immutabili.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
    }
```

Questa funzione viene chiamata quando riscattiamo i token dal contratto WETH in ETH. Solo il contratto WETH che utilizziamo è autorizzato a farlo.

#### Aggiungere liquidità {#add-liquidity}

Queste funzioni aggiungono token allo scambio in pari, il che accresce il pool di liquidità.

```solidity

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
```

Questa funzione serve a calcolare l'importo di token A e B che dovrebbero essere depositati nello scambio in pari.

```solidity
        address tokenA,
        address tokenB,
```

Questi sono gli indirizzi dei contratti del token ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Questi sono gli importi che il fornitore di liquidità vuole depositare. Sono anche gli importi massimi da depositare di A e B.

```solidity
        uint amountAMin,
        uint amountBMin
```

Questi sono gli importi minimi accettabili da depositare. Se la transazione non può essere effettuata con questi importi o con importi superiori, ripristinala. Se non vuoi questa funzionalità, specifica semplicemente zero.

I fornitori di liquidità specificano un minimo, generalmente perché vogliono limitare la transazione al tasso di cambio vicino a quello corrente. Se il tasso di cambio fluttua troppo, ciò potrebbe essere dovuto a notizie che modificano i valori sottostanti, in tal caso i fornitori di liquidità vogliono poter decidere manualmente come agire.

Per esempio, immagina un caso in cui il tasso di cambio è uno a uno e il fornitore di liquidità specifica questi valori:

| Parametro      | Valore |
| -------------- | -----: |
| amountADesired |   1000 |
| amountBDesired |   1000 |
| amountAMin     |    900 |
| amountBMin     |    800 |

Finché il tasso di cambio resta tra 0,9 e 1,25, la transazione viene eseguita. Se il tasso di cambio esce dall'intervallo, la transazione viene annullata.

Il motivo per questa precauzione è che le transazioni non sono immediate. Dopo che le hai inviate, a un certo punto un miner le includerà in un blocco (a meno che il tuo prezzo del carburante non sia molto basso, nel qual caso dovrai inviare un'altra transazione con lo stesso nonce e un prezzo del carburante maggiore per sovrascriverla). Non puoi controllare ciò che succede durante l'intervallo tra l'invio e l'inclusione.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

La funzione restituisce gli importi che il fornitore di liquidità dovrebbe depositare per avere un rapporto pari al rapporto corrente tra le riserve.

```solidity
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Se non vi è ancora alcuno scambio per questa coppia di token, crealo.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Ottieni le riserve correnti nella coppia.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Se le riserve correnti sono vuote, significa che questo è un nuovo scambio in pari. Gli importi da depositare dovrebbero essere esattamente gli stessi che il fornitore di liquidità vuole fornire.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Se ci serve vedere quali importi saranno, otteniamo l'importo ottimale usando [questa funzione](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Vogliamo ottenere lo stesso rapporto delle riserve correnti.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Se `amountBOptimal` è inferiore all'importo che il fornitore di liquidità vuole depositare, significa che al momento il token B è più prezioso di quanto il depositante della liquidità pensi, quindi è richiesto un importo inferiore.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Se l'importo ottimale di B è superiore all'importo di B desiderato, significa che al momento i token sono meno preziosi di quanto il depositante della liquidità pensi, quindi è necessario un importo maggiore. Tuttavia, l'importo desiderato rappresenta un massimo, quindi non possiamo farlo. Calcoliamo invece il numero ottimale di token A per l'importo desiderato di token B.

Mettendo tutto insieme otteniamo questo grafico. Supponiamo che stai cercando di depositare mille token A (riga blu) e mille token B (linea rossa). L'asse delle x è il tasso di cambio, A/B. Se x=1, significa che hanno pari valore e depositi mille unità di ciascuno. Se x=2, A è il doppio del valore di B (ottieni due token B per ogni token A), quindi depositi mille token B, ma solo 500 token A. Se x=0,5, la situazione è invertita, mille token A e cinquecento token B.

![Grafico](liquidityProviderDeposit.png)

```solidity
            }
        }
    }
```

Potresti depositare la liquidità direttamente nel contratto principale (usando [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), ma il contratto principale verifica solo che non abbia luogo una truffa, quindi corri il rischio di perdere valore se il tasso di cambio cambia tra quando invii la transazione e quando viene eseguita. Con il contratto periferico verrà calcolato l'importo da depositare, che verrà depositato immediatamente. In questo modo il tasso di cambio non cambia e non perdi nulla.

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

Questa funione può essere chiamata da una transazione per depositare la liquidità. Gran parte dei parametri sono gli stessi di `_addLiquidity` sopra, con due eccezioni:

. `to` è l'indirizzo che ottiene la nuova liquidità coniata per mostrare la porzione del pool del fornitore di liquidità. `deadline` è un limite di tempo sulla transazione.

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Calcoliamo gli importi da depositare realmente e poi troviamo l'indirizzo del pool di liquidità. Per risparmiare sul gas, non ocorre chiedere alla factory, bensì bisogna utilizzare la funzione della libreria `pairFor` (vedi sotto nelle librerie)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Trasferisci gli importi corretti di token dall'utente nello scambio in pari.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

In cambio, dai i token di liquidità dell'indirizzo `to` per la proprietà parziale del pool. La funzione `mint` del contratto principale vede quanti token aggiuntivi ha (rispetto a ciò che aveva l'ultima volta che la liquidità è cambiata) e conia liquidità di conseguenza.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Quando un fornitore di liquidità vuole fornire liquidità a uno scambio in pari di Token/ETH, vi sono alcune differenze. Il contratto gestisce l'avvolgimento di ETH per il fornitore di liquidità. Non serve specificare quanti ETH l'utente vuole depositare, perché l'utente li invia insieme alla transazione (l'importo è disponibile in `msg.value`).

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

Per depositare l'ETH, il contratto lo avvolge prima in WETH e quindi trasferisce i WETH nella coppia. Nota che il trasferimento è avvolto in un `assert`. Ciò significa che se il trasferimento fallisce, anche la chiamata di questo contratto fallisce e, dunque, l'avvolgimento non si verifica effettivamente.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

L'utente ci ha già inviato l'ETH, quindi se esiste una rimanenza aggiuntiva (poiché l'altro token è meno prezioso di quanto l'utente pensasse), dobbiamo emettere un rimborso.

#### Rimuovere liquidità {#remove-liquidity}

Queste funzioni rimuoveranno la liquidità e ripagheranno il fornitore di liquidità.

```solidity
    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

Il caso più semplice di rimozione di liquidità. Esiste un importo minimo di ogni token che il fornitore di liquidità acconsente di accettare e deve verificarsi prima della scadenza.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

La funzione di `burn` del contratto principale gestisce il rimborso dei token all'utente.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Quando una funzione restituisce valori multipli, ma siamo interessati solo in alcuni di essi, questo è l'unico modo per ottenere quei valori. In una certa misura è più economico in termini di carburante rispetto a leggere un valore e non usarlo mai.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Traduci gli importi dal modo in cui il contratto principale li restituisce (prima il token dell'indirizzo inferiore) al modo atteso dall'utente (corrispondenti a `tokenA` e `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Va bene effettuare prima il trasferimento e quindi verificare che sia legittimo, perché in caso contrario ripristineremo tutti i cambiamenti di stato.

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

Rimuovere la liquidità per ETH è quasi la stessa cosa, con la differenza che riceviamo i token WETH e poi li riscattiamo per gli ETH da restituire al fornitore di liquidità.

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

Queste funzioni utilizzano le meta-transazioni per consentire agli utenti senza ether di prelevare dal pool, usando [il meccanismo di permesso](#UniswapV2ERC20).

```solidity

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

Questa funzione è utilizzabile per token aventi commissioni di trasferimento o archiviazione. Quando un token ha tali commissioni, non possiamo utilizzare la funzione `removeLiquidity` per capire quanti token otterremo indietro, quindi dobbiamo prima prelevare e ottenere il saldo.

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

La funzione finale combina le commissioni di archiviazione con le meta-transazioni.

#### Scambio {#trade}

```solidity
    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Questa funzione esegue le elaborazioni interne necessarie per le funzioni esposte ai trader.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Mentre scrivo il presente articolo, esistono [388.160 token ERC-20](https://etherscan.io/tokens). Se ci fosse stato uno scambio in pari per ogni coppia di token, avremmo oltre 150 miliardi di scambi in pari. L'intera catena, al momento, [ha solo lo 0,1% di quel numero di conti](https://etherscan.io/chart/address). Invece, le funzioni di scambio supportano il concetto di percorso. Il trader A può scambiare A per B, B per C e C per D. In tal modo non serve uno scambio in pari diretto A-D.

I prezzi su questi mercati tendono a essere sincronizzati, perché quando sono desincronizzati si creano opportunità per l'arbitraggio. Immagina, ad esempio, tre token: A, B e C. Ci sono tre scambi in pari, uno per coppia.

1. La situazione iniziale
2. Un trader vende 24,695 token A e riceve 23,305 token B.
3. Il trader vende 24,695 token B per 25,305 token C, mantenendo approssimativamente 0,61 token B come profitto.
4. A questo punto il trader vende 24,695 token C per 25,305 token A, mantenendo approssimativamente 0,61 token C come profitto. Il trader ha anche 0,61 token A in più (i 25,305 che finiscono in mano al trader, meno l'investimento originale di 24,695).

| Fase | Scambio A-B                 | Scambio B-C                 | Scambio A-C                 |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1    | A:1000 B:1050 A/B=1,05      | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 2    | A:1024,695 B:1024,695 A/B=1 | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 3    | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1050 C:1000 C/A=1,05      |
| 4    | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1024,695 C:1024,695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Ottieni la coppia che stiamo gestendo, ordinala (per usarla con la coppia) e ottieni l'importo di output previsto.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Ottieni gli importi di output previsti, ordinati nel modo previsto dallo scambio in pari.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Questo è l'ultimo scambio? Se sì, invia i token ricevuti per lo scambio alla destinazione. Altrimenti, inviali al prossimo scambio in pari.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

In realtà, chiami lo scambio in pari per scambiare i token. Non ci serve una richiamata sullo scambio, quindi non inviamo alcun byte in quel campo.

```solidity
    function swapExactTokensForTokens(
```

Questa funzione è usata direttamente dai trader per scambiare un token con un altro.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Questo parametro contiene gli indirizzi dei contratti ERC-20. Come spiegato sopra, questo è un array perché potresti avere bisogno di passare attraverso diversi scambi in pari per passare dalla risorsa che hai in mano a quella che desideri.

Un parametro della funzione in Solidity è memorizzabile in `memory` o in `calldata`. Se la funzione è un punto d'accesso al contratto, chiamato direttamente da un utente (usando una transazione) o da un contratto diverso, allora il valore del parametro può essere tratto direttamente dai dati della chiamata. Se la funzione è chiamata internamente, come `_swap` sopra, allora i parametri devono essere memorizzati in `memory`. Dalla prospettiva del contratto chiamato, `calldata` è in sola lettura.

Con tipi scalari come `uint` o `address`, il compilatore gestisce la scelta dell'archiviazione per noi, mentre con gli array, più lunghi e costosi, specifichiamo il tipo di memoria da usare.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

I valori di ritorno sono sempre restituiti in memoria.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Calcola l'importo da acquistare a ogni scambio. Se il risultato è inferiore al minimo che il trader è disposto ad accettare, ripristina la transazione.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Infine, trasferisci il token ERC-20 iniziale al conto per il primo scambio in pari e chiama `_swap`. Tutto questo accade nell'ambito della stessa transazione, quindi lo scambio in pari sa che ogni token imprevisto è parte di questo trasferimento.

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

La funzione precedente, `swapTokensForTokens`, consente a un trader di specificare il numero esatto di token di input che desidera dare e il numero minimo di token di output che vuole ricevere in cambio. Questa funzione effettua lo scambio inverso, consentendo al trader di specificare il numero di token in uscita che vuole ricevere e il numero massimo di token in entrata che è disposto a pagare.

In entrambi i casi, il trader deve dare innanzi tutto a questo contratto periferico un'allowance per consentirgli di effettuare il trasferimento.

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Queste quattro varianti comportano tutte lo scambio tra ETH e token. La sola differenza è che riceviamo ETH dal trader e lo usiamo per coniare WETH o ricviamo WETH dall'ultimo scambio nel percorso e li bruciamo, reinviando al trader l'ETH risultante.

```solidity
    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Questa è la funzione interna per scambiare token che hanno commissioni di trasferimento o archiviazione da risolvere ([questo problema](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // scope to avoid stack too deep errors
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

A causa delle commissioni di trasferimento, non possiamo fare affidamento sulla funzione `getAmountsOut` per capire quanto otteniamo da ogni trasferimento (come facciamo prima di chiamare lo `_swap` originale). Dobbiamo prima trasferire e poi vedere quanti token riceviamo indietro.

Nota: In teoria, potremmo semplicemente usare questa funzione al posto di `_swap`, ma in certi casi (ad esempio, se il trasferimento viene ripristinato perché al termine dell'operazione non vi è abbastanza per soddisfare il minimo richiesto) finiremmo per spendere più carburante. I token della commissione di trasferimento sono abbastanza rari; di conseguenza, benché sia necessario accomodarli, non serve effettuare tutti gli scambi per supporre che passimo attraverso almeno uno di essi.

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

Queste sono le stesse varianti usate per i token normali, che però chiamano `_swapSupportingFeeOnTransferTokens`.

```solidity
    // **** LIBRARY FUNCTIONS ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

Queste funzioni sono solo proxy che chiamano le [funzioni UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Questo contratto era usato per migare gli scambi dalla vecchia v1 alla v2. Ora che sono stati migrati, non è più rilevante.

## Le librerie {#libraries}

La [libreria SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) è ben documentata, quindi non serve documentarla qui.

### Math {#Math}

Questa libreria contiene alcune funzioni matematiche che normalmente non sono necessarie nel codice di Solidity e che quindi non fanno parte del linguaggio.

```solidity
pragma solidity =0.5.16;

// a library for performing various math operations

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babylonian method (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Inizia con x come una stima che è superiore alla radice quadrata (questo è il motivo per cui dobbiamo trattare 1-3 come casi speciali).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Ottieni una stima più vicina, la media della stima precedente e il numero la cui radice quadrata stiamo provando a trovare, diviso per la stima precedente. Ripeti finché la nuova stima non è inferiore a quella esistente. Per ulteriori dettagli, [vedi qui](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Non dovremmo mai avere bisogno della radice quadrata di zero. Le radici quadrate di uno, due e tre sono approssimativamente uno (usiamo gli interi, quindi ignoriamo la frazione).

```solidity
        }
    }
}
```

### Frazioni a punto fisso (UQ112x112) {#FixedPoint}

Questa libreria gestisce le frazioni, che normalmente non sono parte dell'aritmetica di Ethereum. Lo fa codificando il numero _x_ come _x\*2^112_. Questo ci permette di usare gli opcode di addizione e sottrazione originali senza alcuna modifica.

```solidity
pragma solidity =0.5.16;

// a library for handling binary fixed point numbers (https://wikipedia.org/wiki/Q_(number_format))

// range: [0, 2**112 - 1]
// resolution: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` è la codifica per uno.

```solidity
    // encode a uint112 as a UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // never overflows
    }
```

Poiché y è `uint112`, il suo valore massimo può essere 2^112-1. Quel numero è ancora codificabile come un `UQ112x112`.

```solidity
    // divide a UQ112x112 by a uint112, returning a UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Se dividiamo due valori `UQ112x112`, il risultato non è più moltiplicato per 2^112. Prendiamo invece un intero per il denominatore. Avremmo dovuto usare un trucco simile per la moltiplicazione, ma non dobbiamo eseguire la moltiplicazione dei valori `UQ112x112`.

### UniswapV2Library {#uniswapV2library}

Questa libreria è usata solo per i contratti periferici

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // returns sorted token addresses, used to handle return values from pairs sorted in this order
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Ordina i due token per indirizzo, in modo da ottenere l'indirizzo dello scambio in pari per gli stessi. Questo è necessario perché altrimenti avremmo due possibilità, una per i parametri A, B e l'altra per i parametri B, A, conducendo a due scambi invece di uno.

```solidity
    // calculates the CREATE2 address for a pair without making any external calls
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init code hash
            ))));
    }
```

Questa funzione calcola l'indirizzo dello scambio in pari per i due token. Questo contratto è creato usando [l'opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014); in questo modo possiamo calcolare l'indirizzo usando lo stesso algoritmo se conosciamo i parametri che utilizza. È molto più economico rispetto a chiedere alla fabbrica.

```solidity
    // fetches and sorts the reserves for a pair
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Questa funzione restituisce le riserve dei due token dello scambio in pari. Tieni presente che può ricevere i token in qualsiasi ordine e ordinarli per uso interno.

```solidity
    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Questa funzione ti da l'importo di token B che riceverai in cambio del token A se non vengono applicate commissioni. Questo calcolo tiene conto del fatto che il trasferimento modifica il tasso di cambio.

```solidity
    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

La funzione `quote` di cui sopra funziona molto bene se non c'è alcuna commissione per utilizzare lo scambio in pari. Tuttavia, se esiste una commissione di scambio dello 0,3%, l'importo effettivamente ottenuto è inferiore. Questa funzione calcola l'importo dopo la commissione di scambio.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity non gestisce nativamente le frazioni, quindi non possiamo semplicemente moltiplicare l'importo per 0,997. Invece, moltiplichiamo il numeratore per 997 e il denominatore per 1000, ottenendo lo stesso effetto.

```solidity
    // given an output amount of an asset and pair reserves, returns a required input amount of the other asset
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Questa funzione fa approssimativamente la stessa cosa, ma ottiene l'importo in uscita e fornisce l'input.

```solidity

    // performs chained getAmountOut calculations on any number of pairs
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // performs chained getAmountIn calculations on any number of pairs
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

Queste due funzioni gestiscono l'identificazione dei valori quando è necessario passare per diversi scambi in pari.

### Transfer Helper {#transfer-helper}

[Questa libreria](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) aggiunge controlli di successo intorno all'ERC-20 e i trasferimenti di Ethereum per trattare un ripristino e un valore restituito `false` allo stesso modo.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Esisono due modi per chiamare un contratto diverso:

- Usare una definizione d'interfaccia per creare la chiamata di una funzione.
- Usare l'[Interfaccia Binaria dell'Applicazione (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) "manualmente" per creare la chiamata. Questo è ciò che l'autore del codice ha deciso di fare.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Per motividi di retrocompatibilità con il token creato prima dello standard ERC-20, una chiamata all'ERC-20 può fallire ripristinando (nel caso in cui `success` è `false`) oppure andando a buon fine ma restituendo un valore `false` (nel qual caso esistono dati in uscita e se li decodifichi come booleano ottieni `false`).

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

Questa funzione implementa la [funzionalità di trasferimento dell'ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), che consente a un conto di spendere l'allowance fornita da un conto diverso.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

Questa funzione implementa la [funzionalità di transferFrom dell'ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), che consente a un conto di spendere l'allowance fornita da un altro conto.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Questa funzione trasferisce ether a un conto. Ogni chiamata a un contratto diverso può tentare di inviare ether. Poiché non abbiamo bisogno di chiamare concretamente alcuna funzione, non inviamo alcun dato con la chiamata.

## Conclusione {#conclusion}

Questo è un articolo lungo di circa 50 pagine. Se sei arrivato fin qui, congratulazioni! Ci auguriamo che tu abbia compreso le considerazioni connesse alla scrittura di un'applicazione reale (a differenza dei brevi programmi campione) e sia ora in grado di scrivere più efficacemente i contratti per i tuoi casi d'uso.

Ora vai a scrivere qualcosa di utile e facci sognare.
