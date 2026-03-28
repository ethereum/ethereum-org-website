---
title: "Analisi dettagliata del contratto Uniswap-v2"
description: "Come funziona il contratto Uniswap-v2? Perché è scritto in questo modo?"
author: Ori Pomerantz
tags: ["Solidity", "dApp"]
skill: intermediate
breadcrumb: Analisi dettagliata di Uniswap v2
published: 2021-05-01
lang: it
---
## Introduzione {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) può creare un mercato di scambio tra due token ERC-20 qualsiasi. In questo articolo esamineremo il codice sorgente dei contratti che implementano questo protocollo e vedremo perché sono scritti in questo modo.

### Cosa fa Uniswap? {#what-does-uniswap-do}

Fondamentalmente, ci sono due tipi di utenti: i fornitori di liquidità e i trader.

I _fornitori di liquidità_ forniscono alla pool i due token che possono essere scambiati (li chiameremo **Token0** e **Token1**). In cambio, ricevono un terzo token che rappresenta la proprietà parziale della pool, chiamato _token di liquidità_.

I _trader_ inviano un tipo di token alla pool e ricevono l'altro (ad esempio, inviano **Token0** e ricevono **Token1**) dalla pool fornita dai fornitori di liquidità. Il tasso di cambio è determinato dal numero relativo di **Token0** e **Token1** che la pool possiede. Inoltre, la pool trattiene una piccola percentuale come ricompensa per la pool di liquidità.

Quando i fornitori di liquidità vogliono indietro i propri asset, possono bruciare i token della pool e ricevere indietro i propri token, inclusa la loro quota di ricompense.

[Clicca qui per una descrizione più completa](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Perché la v2? Perché non la v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) è un aggiornamento molto più complicato rispetto alla v2. È più facile imparare prima la v2 e poi passare alla v3.

### Contratti principali (Core) vs Contratti periferici (Periphery) {#contract-types}

Uniswap v2 è diviso in due componenti, un nucleo (core) e una periferia (periphery). Questa divisione consente ai contratti principali, che detengono gli asset e quindi _devono_ essere sicuri, di essere più semplici e facili da verificare (audit). Tutte le funzionalità extra richieste dai trader possono quindi essere fornite dai contratti periferici.

## Flussi di dati e di controllo {#flows}

Questo è il flusso di dati e di controllo che si verifica quando si eseguono le tre azioni principali di Uniswap:

1. Scambio tra token diversi
2. Aggiungere liquidità al mercato ed essere ricompensati con token di liquidità ERC-20 dello scambio di coppie
3. Bruciare i token di liquidità ERC-20 e riottenere i token ERC-20 che lo scambio di coppie consente ai trader di scambiare

### Scambio {#swap-flow}

Questo è il flusso più comune, utilizzato dai trader:

#### Chiamante {#caller}

1. Fornire all'account periferico un'autorizzazione per l'importo da scambiare.
2. Chiamare una delle tante funzioni di scambio del contratto periferico (quale dipende dal fatto che sia coinvolto o meno ETH, se il trader specifica la quantità di token da depositare o la quantità di token da riottenere, ecc.).
   Ogni funzione di scambio accetta un `path`, un array di scambi da attraversare.

#### Nel contratto periferico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identificare gli importi che devono essere negoziati su ogni scambio lungo il percorso.
4. Itera sul percorso. Per ogni scambio lungo il tragitto invia il token di input e poi chiama la funzione `swap` dello scambio.
   Nella maggior parte dei casi l'indirizzo di destinazione per i token è il successivo scambio di coppie nel percorso. Nello scambio finale è l'indirizzo fornito dal trader.

#### Nel contratto principale (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Verificare che il contratto principale non venga ingannato e possa mantenere una liquidità sufficiente dopo lo scambio.
6. Vedere quanti token extra abbiamo in aggiunta alle riserve note. Quell'importo è il numero di token di input che abbiamo ricevuto da scambiare.
7. Inviare i token di output alla destinazione.
8. Chiamare `_update` per aggiornare gli importi della riserva

#### Di nuovo nel contratto periferico (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Eseguire qualsiasi pulizia necessaria (ad esempio, bruciare i token WETH per riottenere ETH da inviare al trader)

### Aggiungere liquidità {#add-liquidity-flow}

#### Chiamante {#caller-2}

1. Fornire all'account periferico un'autorizzazione per gli importi da aggiungere alla pool di liquidità.
2. Chiamare una delle funzioni `addLiquidity` del contratto periferico.

#### Nel contratto periferico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Creare un nuovo scambio di coppie se necessario
4. Se esiste già uno scambio di coppie, calcolare la quantità di token da aggiungere. Si suppone che questo sia un valore identico per entrambi i token, quindi lo stesso rapporto tra i nuovi token e i token esistenti.
5. Controllare se gli importi sono accettabili (i chiamanti possono specificare un importo minimo al di sotto del quale preferirebbero non aggiungere liquidità)
6. Chiamare il contratto principale.

#### Nel contratto principale (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Coniare i token di liquidità e inviarli al chiamante
8. Chiamare `_update` per aggiornare gli importi della riserva

### Rimuovere liquidità {#remove-liquidity-flow}

#### Chiamante {#caller-3}

1. Fornire all'account periferico un'autorizzazione di token di liquidità da bruciare in cambio dei token sottostanti.
2. Chiamare una delle funzioni `removeLiquidity` del contratto periferico.

#### Nel contratto periferico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Inviare i token di liquidità allo scambio di coppie

#### Nel contratto principale (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Inviare all'indirizzo di destinazione i token sottostanti in proporzione ai token bruciati. Ad esempio, se ci sono 1000 token A nella pool, 500 token B e 90 token di liquidità, e riceviamo 9 token da bruciare, stiamo bruciando il 10% dei token di liquidità, quindi restituiamo all'utente 100 token A e 50 token B.
5. Bruciare i token di liquidità
6. Chiamare `_update` per aggiornare gli importi della riserva

## I contratti principali {#core-contracts}

Questi sono i contratti sicuri che detengono la liquidità.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Questo contratto](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementa la vera e propria pool che scambia i token. È la funzionalità principale di Uniswap.

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

Queste sono tutte le interfacce che il contratto deve conoscere, sia perché il contratto le implementa (`IUniswapV2Pair` e `UniswapV2ERC20`) sia perché chiama contratti che le implementano.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Questo contratto eredita da `UniswapV2ERC20`, che fornisce le funzioni ERC-20 per i token di liquidità.

```solidity
    using SafeMath  for uint;
```

La [libreria SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) è utilizzata per evitare overflow e underflow. Questo è importante perché altrimenti potremmo ritrovarci in una situazione in cui un valore dovrebbe essere `-1`, ma è invece `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Molti calcoli nel contratto della pool richiedono frazioni. Tuttavia, le frazioni non sono supportate dalla EVM.
La soluzione trovata da Uniswap è utilizzare valori a 224 bit, con 112 bit per la parte intera e 112 bit per la frazione. Quindi `1.0` è rappresentato come `2^112`, `1.5` è rappresentato come `2^112 + 2^111`, ecc.

Maggiori dettagli su questa libreria sono disponibili [più avanti nel documento](#FixedPoint).

#### Variabili {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Per evitare casi di divisione per zero, esiste un numero minimo di token di liquidità che esistono sempre (ma sono posseduti dall'account zero). Quel numero è **MINIMUM_LIQUIDITY**, mille.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Questo è il selettore ABI per la funzione di trasferimento ERC-20. È utilizzato per trasferire i token ERC-20 nei due account dei token.

```solidity
    address public factory;
```

Questo è il contratto factory che ha creato questa pool. Ogni pool è uno scambio tra due token ERC-20, la factory è un punto centrale che collega tutte queste pool.

```solidity
    address public token0;
    address public token1;
```

Ci sono gli indirizzi dei contratti per i due tipi di token ERC-20 che possono essere scambiati da questa pool.

```solidity
    uint112 private reserve0; // utilizza un singolo slot di archiviazione, accessibile tramite getReserves
    uint112 private reserve1; // utilizza un singolo slot di archiviazione, accessibile tramite getReserves
```

Le riserve che la pool ha per ogni tipo di token. Presumiamo che i due rappresentino la stessa quantità di valore, e quindi ogni token0 vale reserve1/reserve0 token1.

```solidity
    uint32  private blockTimestampLast; // utilizza un singolo slot di archiviazione, accessibile tramite getReserves
```

Il timestamp per l'ultimo blocco in cui si è verificato uno scambio, utilizzato per tracciare i tassi di cambio nel tempo.

Una delle maggiori spese di gas dei contratti Ethereum è l'archiviazione (storage), che persiste da una chiamata del contratto alla successiva. Ogni cella di archiviazione è lunga 256 bit. Quindi tre variabili, `reserve0`, `reserve1` e `blockTimestampLast`, sono allocate in modo tale che un singolo valore di archiviazione possa includerle tutte e tre (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Queste variabili contengono i costi cumulativi per ogni token (ciascuno in termini dell'altro). Possono essere utilizzate per calcolare il tasso di cambio medio in un periodo di tempo.

```solidity
    uint public kLast; // reserve0 * reserve1, immediatamente dopo il più recente evento di liquidità
```

Il modo in cui lo scambio della coppia decide il tasso di cambio tra token0 e token1 è mantenere costante il multiplo delle due riserve durante le negoziazioni. `kLast` è questo valore. Cambia quando un fornitore di liquidità deposita o preleva token, e aumenta leggermente a causa della commissione di mercato dello 0,3%.

Ecco un semplice esempio. Nota che per semplicità la tabella ha solo tre cifre dopo la virgola decimale, e ignoriamo la commissione di negoziazione dello 0,3% quindi i numeri non sono precisi.

| Evento | reserve0 | reserve1 | reserve0 \* reserve1 | Tasso di cambio medio (token1 / token0) |
| ------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------- |
| Configurazione iniziale | 1,000.000 | 1,000.000 | 1,000,000 | |
| Il trader A scambia 50 token0 per 47.619 token1 | 1,050.000 | 952.381 | 1,000,000 | 0.952 |
| Il trader B scambia 10 token0 per 8.984 token1 | 1,060.000 | 943.396 | 1,000,000 | 0.898 |
| Il trader C scambia 40 token0 per 34.305 token1 | 1,100.000 | 909.090 | 1,000,000 | 0.858 |
| Il trader D scambia 100 token1 per 109.01 token0 | 990.990 | 1,009.090 | 1,000,000 | 0.917 |
| Il trader E scambia 10 token0 per 10.079 token1 | 1,000.990 | 999.010 | 1,000,000 | 1.008 |

Man mano che i trader forniscono più token0, il valore relativo del token1 aumenta, e viceversa, in base alla domanda e all'offerta.

#### Blocco (Lock) {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Esiste una classe di vulnerabilità di sicurezza basata sull'[abuso di rientranza (reentrancy)](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap deve trasferire token ERC-20 arbitrari, il che significa chiamare contratti ERC-20 che potrebbero tentare di abusare del mercato Uniswap che li chiama.
Avendo una variabile `unlocked` come parte del contratto, possiamo impedire che le funzioni vengano chiamate mentre sono in esecuzione (all'interno della stessa transazione).

```solidity
    modifier lock() {
```

Questa funzione è un [modificatore](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), una funzione che avvolge una funzione normale per cambiarne il comportamento in qualche modo.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Se `unlocked` è uguale a uno, impostalo a zero. Se è già zero, annulla (revert) la chiamata, facendola fallire.

```solidity
        _;
```

In un modificatore `_;` è la chiamata alla funzione originale (con tutti i parametri). Qui significa che la chiamata alla funzione avviene solo se `unlocked` era uno quando è stata chiamata, e mentre è in esecuzione il valore di `unlocked` è zero.

```solidity
        unlocked = 1;
    }
```

Dopo che la funzione principale restituisce il risultato, rilascia il blocco.

#### Funzioni varie {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Questa funzione fornisce ai chiamanti lo stato attuale dello scambio. Nota che le funzioni Solidity [possono restituire valori multipli](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Questa funzione interna trasferisce una quantità di token ERC-20 dallo scambio a qualcun altro. `SELECTOR` specifica che la funzione che stiamo chiamando è `transfer(address,uint)` (vedi definizione sopra).

Per evitare di dover importare un'interfaccia per la funzione del token, creiamo "manualmente" la chiamata utilizzando una delle [funzioni ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Ci sono due modi in cui una chiamata di trasferimento ERC-20 può segnalare un fallimento:

1. Annullamento (Revert). Se una chiamata a un contratto esterno viene annullata, il valore booleano restituito è `false`
2. Terminare normalmente ma segnalare un fallimento. In quel caso il buffer del valore restituito ha una lunghezza diversa da zero, e quando decodificato come valore booleano è `false`

Se si verifica una di queste condizioni, annulla (revert).

#### Eventi {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Questi due eventi vengono emessi quando un fornitore di liquidità deposita liquidità (`Mint`) o la preleva (`Burn`). In entrambi i casi, le quantità di token0 e token1 che vengono depositate o prelevate fanno parte dell'evento, così come l'identità dell'account che ci ha chiamato (`sender`). Nel caso di un prelievo, l'evento include anche la destinazione che ha ricevuto i token (`to`), che potrebbe non essere la stessa del mittente.

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

Questo evento viene emesso quando un trader scambia un token con l'altro. Anche in questo caso, il mittente e la destinazione potrebbero non essere gli stessi.
Ogni token può essere inviato allo scambio o ricevuto da esso.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Infine, `Sync` viene emesso ogni volta che i token vengono aggiunti o prelevati, indipendentemente dal motivo, per fornire le ultime informazioni sulle riserve (e quindi sul tasso di cambio).

#### Funzioni di configurazione {#pair-setup}

Queste funzioni dovrebbero essere chiamate una volta quando viene configurato il nuovo scambio di coppia.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Il costruttore si assicura che terremo traccia dell'indirizzo della factory che ha creato la coppia. Questa informazione è necessaria per `initialize` e per la commissione della factory (se ne esiste una).

```solidity
    // chiamato una volta dalla factory al momento della distribuzione
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // controllo sufficiente
        token0 = _token0;
        token1 = _token1;
    }
```

Questa funzione consente alla factory (e solo alla factory) di specificare i due token ERC-20 che questa coppia scambierà.

#### Funzioni di aggiornamento interne {#pair-update-internal}

##### \_update

```solidity
    // aggiorna le riserve e, alla prima chiamata per blocco, gli accumulatori di prezzo
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Questa funzione viene chiamata ogni volta che i token vengono depositati o prelevati.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Se balance0 o balance1 (uint256) è superiore a uint112(-1) (=2^112-1) (quindi va in overflow e torna a 0 quando convertito in uint112) rifiuta di continuare l'\_update per prevenire gli overflow. Con un token normale che può essere suddiviso in 10^18 unità, questo significa che ogni scambio è limitato a circa 5.1\*10^15 di ciascun token. Finora questo non è stato un problema.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // l'overflow è desiderato
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Se il tempo trascorso non è zero, significa che siamo la prima transazione di scambio su questo blocco. In tal caso, dobbiamo aggiornare gli accumulatori di costo.

```solidity
            // * non va mai in overflow, e l'overflow di + è desiderato
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Ogni accumulatore di costo viene aggiornato con l'ultimo costo (riserva dell'altro token/riserva di questo token) moltiplicato per il tempo trascorso in secondi. Per ottenere un prezzo medio, si legge il prezzo cumulativo in due momenti nel tempo e si divide per la differenza di tempo tra di essi. Ad esempio, supponiamo questa sequenza di eventi:

| Evento | reserve0 | reserve1 | timestamp | Tasso di cambio marginale (reserve1 / reserve0) | price0CumulativeLast |
| -------------------------------------------------------- | --------: | --------: | --------- | -------------------------------------------: | -------------------------: |
| Configurazione iniziale | 1,000.000 | 1,000.000 | 5,000 | 1.000 | 0 |
| Il trader A deposita 50 token0 e ottiene 47.619 token1 indietro | 1,050.000 | 952.381 | 5,020 | 0.907 | 20 |
| Il trader B deposita 10 token0 e ottiene 8.984 token1 indietro | 1,060.000 | 943.396 | 5,030 | 0.890 | 20+10\*0.907 = 29.07 |
| Il trader C deposita 40 token0 e ottiene 34.305 token1 indietro | 1,100.000 | 909.090 | 5,100 | 0.826 | 29.07+70\*0.890 = 91.37 |
| Il trader D deposita 100 token1 e ottiene 109.01 token0 indietro | 990.990 | 1,009.090 | 5,110 | 1.018 | 91.37+10\*0.826 = 99.63 |
| Il trader E deposita 10 token0 e ottiene 10.079 token1 indietro | 1,000.990 | 999.010 | 5,150 | 0.998 | 99.63+40\*1.1018 = 143.702 |

Supponiamo di voler calcolare il prezzo medio del **Token0** tra i timestamp 5.030 e 5.150. La differenza nel valore di `price0Cumulative` è 143.702-29.07=114.632. Questa è la media su due minuti (120 secondi). Quindi il prezzo medio è 114.632/120 = 0.955.

Questo calcolo del prezzo è il motivo per cui abbiamo bisogno di conoscere le vecchie dimensioni delle riserve.

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
    // se la commissione è attiva, coniare liquidità equivalente a 1/6 della crescita in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

In Uniswap 2.0 i trader pagano una commissione dello 0,30% per utilizzare il mercato. La maggior parte di tale commissione (lo 0,25% dello scambio) va sempre ai fornitori di liquidità. Il restante 0,05% può andare ai fornitori di liquidità o a un indirizzo specificato dalla factory come commissione del protocollo, che paga Uniswap per il loro sforzo di sviluppo.

Per ridurre i calcoli (e quindi i costi del gas), questa commissione viene calcolata solo quando la liquidità viene aggiunta o rimossa dalla pool, piuttosto che ad ogni transazione.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Leggi la destinazione della commissione della factory. Se è zero, non c'è alcuna commissione del protocollo e non è necessario calcolarla.

```solidity
        uint _kLast = kLast; // risparmio di gas
```

La variabile di stato `kLast` si trova nell'archiviazione (storage), quindi avrà un valore tra le diverse chiamate al contratto.
L'accesso all'archiviazione è molto più costoso dell'accesso alla memoria volatile che viene rilasciata quando termina la chiamata alla funzione del contratto, quindi utilizziamo una variabile interna per risparmiare sul gas.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

I fornitori di liquidità ottengono la loro parte semplicemente dall'apprezzamento dei loro token di liquidità. Ma la commissione del protocollo richiede che nuovi token di liquidità vengano coniati e forniti all'indirizzo `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Se c'è nuova liquidità su cui riscuotere una commissione del protocollo. Puoi vedere la funzione della radice quadrata [più avanti in questo articolo](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Questo complicato calcolo delle commissioni è spiegato nel [whitepaper](https://app.uniswap.org/whitepaper.pdf) a pagina 5. Sappiamo che tra il momento in cui `kLast` è stato calcolato e il presente non è stata aggiunta o rimossa alcuna liquidità (perché eseguiamo questo calcolo ogni volta che la liquidità viene aggiunta o rimossa, prima che cambi effettivamente), quindi qualsiasi cambiamento in `reserve0 * reserve1` deve derivare dalle commissioni di transazione (senza di esse manterremmo `reserve0 * reserve1` costante).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Usa la funzione `UniswapV2ERC20._mint` per creare effettivamente i token di liquidità aggiuntivi e assegnarli a `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Se non c'è alcuna commissione, imposta `kLast` a zero (se non lo è già). Quando questo contratto è stato scritto c'era una [funzionalità di rimborso del gas](https://eips.ethereum.org/EIPS/eip-3298) che incoraggiava i contratti a ridurre la dimensione complessiva dello stato di Ethereum azzerando l'archiviazione di cui non avevano bisogno.
Questo codice ottiene quel rimborso quando possibile.

#### Funzioni accessibili esternamente {#pair-external}

Nota che mentre qualsiasi transazione o contratto _può_ chiamare queste funzioni, esse sono progettate per essere chiamate dal contratto periferico. Se le chiami direttamente non sarai in grado di ingannare lo scambio di coppia, ma potresti perdere valore a causa di un errore.

##### mint

```solidity
    // questa funzione di basso livello dovrebbe essere chiamata da un contratto che esegue importanti controlli di sicurezza
    function mint(address to) external lock returns (uint liquidity) {
```

Questa funzione viene chiamata quando un fornitore di liquidità aggiunge liquidità alla pool. Conia token di liquidità aggiuntivi come ricompensa. Dovrebbe essere chiamata da [un contratto periferico](#UniswapV2Router02) che la chiama dopo aver aggiunto la liquidità nella stessa transazione (in modo che nessun altro sia in grado di inviare una transazione che rivendichi la nuova liquidità prima del legittimo proprietario).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // risparmio di gas
```

Questo è il modo per leggere i risultati di una funzione Solidity che restituisce valori multipli. Scartiamo l'ultimo valore restituito, il timestamp del blocco, perché non ne abbiamo bisogno.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Ottieni i saldi attuali e vedi quanto è stato aggiunto di ogni tipo di token.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Calcola le commissioni del protocollo da riscuotere, se presenti, e conia i token di liquidità di conseguenza. Poiché i parametri per `_mintFee` sono i vecchi valori di riserva, la commissione viene calcolata accuratamente basandosi solo sulle modifiche della pool dovute alle commissioni.

```solidity
        uint _totalSupply = totalSupply; // risparmio di gas, deve essere definito qui poiché totalSupply può aggiornarsi in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // blocca permanentemente i primi token MINIMUM_LIQUIDITY
```

Se questo è il primo deposito, crea i token `MINIMUM_LIQUIDITY` e inviali all'indirizzo zero per bloccarli. Non potranno mai essere riscattati, il che significa che la pool non verrà mai svuotata completamente (questo ci salva dalla divisione per zero in alcuni punti). Il valore di `MINIMUM_LIQUIDITY` è mille, che considerando che la maggior parte degli ERC-20 sono suddivisi in unità di 10^-18 di un token, come l'ETH è diviso in wei, è 10^-15 rispetto al valore di un singolo token. Non un costo elevato.

Al momento del primo deposito non conosciamo il valore relativo dei due token, quindi moltiplichiamo semplicemente gli importi e calcoliamo una radice quadrata, presumendo che il deposito ci fornisca un valore uguale in entrambi i token.

Possiamo fidarci di questo perché è nell'interesse del depositante fornire un valore uguale, per evitare di perdere valore a causa dell'arbitraggio.
Supponiamo che il valore dei due token sia identico, ma il nostro depositante ha depositato quattro volte più **Token1** rispetto a **Token0**. Un trader può sfruttare il fatto che lo scambio di coppia pensa che il **Token0** sia più prezioso per estrarne valore.

| Evento | reserve0 | reserve1 | reserve0 \* reserve1 | Valore della pool (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | --------------------------------------: |
| Configurazione iniziale | 8 | 32 | 256 | 40 |
| Il trader deposita 8 token **Token0**, ottiene indietro 16 **Token1** | 16 | 16 | 256 | 32 |

Come puoi vedere, il trader ha guadagnato 8 token extra, che derivano da una riduzione del valore della pool, danneggiando il depositante che la possiede.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Con ogni deposito successivo conosciamo già il tasso di cambio tra i due asset, e ci aspettiamo che i fornitori di liquidità forniscano un valore uguale in entrambi. Se non lo fanno, diamo loro token di liquidità basati sul valore minore che hanno fornito come punizione.

Che si tratti del deposito iniziale o di uno successivo, il numero di token di liquidità che forniamo è uguale alla radice quadrata della variazione in `reserve0*reserve1` e il valore del token di liquidità non cambia (a meno che non riceviamo un deposito che non ha valori uguali di entrambi i tipi, nel qual caso la "multa" viene distribuita). Ecco un altro esempio con due token che hanno lo stesso valore, con tre depositi buoni e uno cattivo (deposito di un solo tipo di token, quindi non produce alcun token di liquidità).

| Evento | reserve0 | reserve1 | reserve0 \* reserve1 | Valore della pool (reserve0 + reserve1) | Token di liquidità coniati per questo deposito | Token di liquidità totali | Valore di ogni token di liquidità |
| ------------------------- | -------: | -------: | -------------------: | -------------------------------: | ---------------------------------------: | ---------------------: | ----------------------------: |
| Configurazione iniziale | 8.000 | 8.000 | 64 | 16.000 | 8 | 8 | 2.000 |
| Deposito di quattro di ogni tipo | 12.000 | 12.000 | 144 | 24.000 | 4 | 12 | 2.000 |
| Deposito di due di ogni tipo | 14.000 | 14.000 | 196 | 28.000 | 2 | 14 | 2.000 |
| Deposito di valore disuguale | 18.000 | 14.000 | 252 | 32.000 | 0 | 14 | ~2.286 |
| Dopo l'arbitraggio | ~15.874 | ~15.874 | 252 | ~31.748 | 0 | 14 | ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Usa la funzione `UniswapV2ERC20._mint` per creare effettivamente i token di liquidità aggiuntivi e darli all'account corretto.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 e reserve1 sono aggiornati
        emit Mint(msg.sender, amount0, amount1);
    }
```

Aggiorna le variabili di stato (`reserve0`, `reserve1` e, se necessario, `kLast`) ed emetti l'evento appropriato.

##### burn

```solidity
    // questa funzione di basso livello dovrebbe essere chiamata da un contratto che esegue importanti controlli di sicurezza
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Questa funzione viene chiamata quando la liquidità viene prelevata e i relativi token di liquidità devono essere bruciati.
Dovrebbe anche essere chiamata [da un account periferico](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // risparmio di gas
        address _token0 = token0; // risparmio di gas
        address _token1 = token1; // risparmio di gas
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Il contratto periferico ha trasferito la liquidità da bruciare a questo contratto prima della chiamata. In questo modo sappiamo quanta liquidità bruciare e possiamo assicurarci che venga bruciata.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // risparmio di gas, deve essere definito qui poiché totalSupply può aggiornarsi in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // l'utilizzo dei saldi garantisce una distribuzione pro-rata
        amount1 = liquidity.mul(balance1) / _totalSupply; // l'utilizzo dei saldi garantisce una distribuzione pro-rata
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Il fornitore di liquidità riceve un valore uguale di entrambi i token. In questo modo non cambiamo il tasso di cambio.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 e reserve1 sono aggiornati
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Il resto della funzione `burn` è l'immagine speculare della funzione `mint` sopra.

##### swap

```solidity
    // questa funzione di basso livello dovrebbe essere chiamata da un contratto che esegue importanti controlli di sicurezza
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Anche questa funzione dovrebbe essere chiamata da [un contratto periferico](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // risparmio di gas
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // ambito per _token{0,1}, evita errori di stack troppo profondo
```

Le variabili locali possono essere archiviate in memoria o, se non sono troppe, direttamente nello stack.
Se riusciamo a limitarne il numero in modo da utilizzare lo stack, usiamo meno gas. Per maggiori dettagli vedi [lo yellow paper, le specifiche formali di Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), p. 26, equazione 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // trasferisce i token in modo ottimistico
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // trasferisce i token in modo ottimistico
```

Questo trasferimento è ottimistico, perché trasferiamo prima di essere sicuri che tutte le condizioni siano soddisfatte. Questo va bene in Ethereum perché se le condizioni non vengono soddisfatte più avanti nella chiamata, annulliamo (revert) l'operazione e qualsiasi modifica che ha creato.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informa il destinatario dello scambio se richiesto.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Ottieni i saldi attuali. Il contratto periferico ci invia i token prima di chiamarci per lo scambio. Questo rende facile per il contratto verificare di non essere ingannato, un controllo che _deve_ avvenire nel contratto principale (perché possiamo essere chiamati da entità diverse dal nostro contratto periferico).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // ambito per reserve{0,1}Adjusted, evita errori di stack troppo profondo
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Questo è un controllo di integrità per assicurarci di non perdere dallo scambio. Non c'è alcuna circostanza in cui uno scambio dovrebbe ridurre `reserve0*reserve1`. È anche qui che ci assicuriamo che venga inviata una commissione dello 0,3% sullo scambio; prima di controllare l'integrità del valore di K, moltiplichiamo entrambi i saldi per 1000 sottratti dagli importi moltiplicati per 3, questo significa che lo 0,3% (3/1000 = 0,003 = 0,3%) viene dedotto dal saldo prima di confrontare il suo valore K con il valore K delle riserve attuali.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Aggiorna `reserve0` e `reserve1` e, se necessario, gli accumulatori di prezzo e il timestamp ed emetti un evento.

##### Sync o Skim

È possibile che i saldi reali non siano più sincronizzati con le riserve che lo scambio di coppia pensa di avere.
Non c'è modo di prelevare token senza il consenso del contratto, ma i depositi sono un'altra questione. Un account può trasferire token allo scambio senza chiamare né `mint` né `swap`.

In quel caso ci sono due soluzioni:

- `sync`, aggiorna le riserve ai saldi attuali
- `skim`, preleva l'importo extra. Nota che a qualsiasi account è consentito chiamare `skim` perché non sappiamo chi ha depositato i token. Questa informazione viene emessa in un evento, ma gli eventi non sono accessibili dalla blockchain.

```solidity
    // forza i saldi a corrispondere alle riserve
    function skim(address to) external lock {
        address _token0 = token0; // risparmio di gas
        address _token1 = token1; // risparmio di gas
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // forza le riserve a corrispondere ai saldi
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Questo contratto](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) crea gli scambi di coppia.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Queste variabili di stato sono necessarie per implementare la commissione del protocollo (vedi [il whitepaper](https://app.uniswap.org/whitepaper.pdf), p. 5).
L'indirizzo `feeTo` accumula i token di liquidità per la commissione del protocollo, e `feeToSetter` è l'indirizzo autorizzato a cambiare `feeTo` in un indirizzo diverso.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Queste variabili tengono traccia delle coppie, gli scambi tra due tipi di token.

La prima, `getPair`, è una mappatura che identifica un contratto di scambio di coppia basato sui due token ERC-20 che scambia. I token ERC-20 sono identificati dagli indirizzi dei contratti che li implementano, quindi le chiavi e il valore sono tutti indirizzi. Per ottenere l'indirizzo dello scambio di coppia che ti consente di convertire da `tokenA` a `tokenB`, usi `getPair[<indirizzo tokenA>][<indirizzo tokenB>]` (o viceversa).

La seconda variabile, `allPairs`, è un array che include tutti gli indirizzi degli scambi di coppia creati da questa factory. In Ethereum non puoi iterare sul contenuto di una mappatura, o ottenere un elenco di tutte le chiavi, quindi questa variabile è l'unico modo per sapere quali scambi gestisce questa factory.

Nota: Il motivo per cui non puoi iterare su tutte le chiavi di una mappatura è che l'archiviazione dei dati del contratto è _costosa_, quindi meno ne usiamo meglio è, e meno spesso la cambiamo meglio è. Puoi creare [mappature che supportano l'iterazione](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), ma richiedono un'archiviazione extra per un elenco di chiavi. Nella maggior parte delle applicazioni non ne hai bisogno.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Questo evento viene emesso quando viene creato un nuovo scambio di coppia. Include gli indirizzi dei token, l'indirizzo dello scambio di coppia e il numero totale di scambi gestiti dalla factory.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

L'unica cosa che fa il costruttore è specificare il `feeToSetter`. Le factory iniziano senza una commissione, e solo `feeSetter` può cambiarlo.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Questa funzione restituisce il numero di coppie di scambio.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Questa è la funzione principale della factory, per creare uno scambio di coppia tra due token ERC-20. Nota che chiunque può chiamare questa funzione. Non hai bisogno del permesso di Uniswap per creare un nuovo scambio di coppia.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Vogliamo che l'indirizzo del nuovo scambio sia deterministico, in modo che possa essere calcolato in anticipo fuori catena (questo può essere utile per le [transazioni di livello 2](/developers/docs/scaling/)).
Per fare questo dobbiamo avere un ordine coerente degli indirizzi dei token, indipendentemente dall'ordine in cui li abbiamo ricevuti, quindi li ordiniamo qui.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // un singolo controllo è sufficiente
```

Le grandi pool di liquidità sono migliori di quelle piccole, perché hanno prezzi più stabili. Non vogliamo avere più di una singola pool di liquidità per coppia di token. Se c'è già uno scambio, non c'è bisogno di crearne un altro per la stessa coppia.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Per creare un nuovo contratto abbiamo bisogno del codice che lo crea (sia la funzione costruttore sia il codice che scrive in memoria il bytecode EVM del contratto effettivo). Normalmente in Solidity usiamo semplicemente `addr = new <nome del contratto>(<parametri del costruttore>)` e il compilatore si occupa di tutto per noi, ma per avere un indirizzo del contratto deterministico dobbiamo usare [l'opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Quando questo codice è stato scritto quell'opcode non era ancora supportato da Solidity, quindi era necessario ottenere manualmente il codice. Questo non è più un problema, perché [Solidity ora supporta CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Quando un opcode non è ancora supportato da Solidity possiamo chiamarlo utilizzando l'[assembly inline](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Chiama la funzione `initialize` per dire al nuovo scambio quali due token scambia.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // popola la mappatura nella direzione inversa
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Salva le informazioni della nuova coppia nelle variabili di stato ed emetti un evento per informare il mondo del nuovo scambio di coppia.

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

Queste due funzioni consentono a `feeSetter` di controllare il destinatario della commissione (se presente) e di cambiare `feeSetter` in un nuovo indirizzo.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Questo contratto](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementa il token di liquidità ERC-20. È simile al [contratto ERC-20 di OpenZeppelin](/developers/tutorials/erc20-annotated-code), quindi spiegherò solo la parte che è diversa, la funzionalità `permit`.

Le transazioni su Ethereum costano ether (ETH), che è equivalente a denaro reale. Se hai token ERC-20 ma non ETH, non puoi inviare transazioni, quindi non puoi farci nulla. Una soluzione per evitare questo problema sono le [meta-transazioni](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Il proprietario dei token firma una transazione che consente a qualcun altro di prelevare token fuori catena e la invia tramite Internet al destinatario. Il destinatario, che ha ETH, invia quindi il permesso per conto del proprietario.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Questo hash è l'[identificatore per il tipo di transazione](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). L'unico che supportiamo qui è `Permit` con questi parametri.

```solidity
    mapping(address => uint) public nonces;
```

Non è fattibile per un destinatario falsificare una firma digitale. Tuttavia, è banale inviare la stessa transazione due volte (questa è una forma di [attacco replay](https://wikipedia.org/wiki/Replay_attack)). Per prevenire questo, utilizziamo un [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Se il nonce di un nuovo `Permit` non è uno in più rispetto all'ultimo utilizzato, presumiamo che non sia valido.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Questo è il codice per recuperare l'[identificatore della catena](https://chainid.network/). Utilizza un dialetto assembly EVM chiamato [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Nota che nella versione attuale di Yul devi usare `chainid()`, non `chainid`.

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

Questa è la funzione che implementa i permessi. Riceve come parametri i campi rilevanti e i tre valori scalari per [la firma](https://yos.io/2018/11/16/ethereum-signatures/) (v, r e s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Non accettare transazioni dopo la scadenza.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` è il messaggio che ci aspettiamo di ricevere. Sappiamo quale dovrebbe essere il nonce, quindi non c'è bisogno di ottenerlo come parametro.

L'algoritmo di firma di Ethereum si aspetta di ricevere 256 bit da firmare, quindi utilizziamo la funzione di hash `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Dal digest e dalla firma possiamo ottenere l'indirizzo che l'ha firmato utilizzando [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Se tutto è OK, trattalo come [un'approvazione ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## I contratti periferici {#periphery-contracts}

I contratti periferici sono l'API (interfaccia di programmazione delle applicazioni) per Uniswap. Sono disponibili per chiamate esterne, sia da altri contratti che da applicazioni decentralizzate. Potresti chiamare direttamente i contratti principali, ma è più complicato e potresti perdere valore se commetti un errore. I contratti principali contengono solo test per assicurarsi di non essere ingannati, non controlli di validità per nessun altro. Questi ultimi si trovano nella periferia, in modo da poter essere aggiornati secondo necessità.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Questo contratto](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) ha dei problemi e [non dovrebbe più essere utilizzato](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Fortunatamente, i contratti periferici sono senza stato e non detengono alcun asset, quindi è facile deprecarlo e suggerire alle persone di utilizzare il sostituto, `UniswapV2Router02`.

### UniswapV2Router02.sol {#UniswapV2Router02}

Nella maggior parte dei casi utilizzeresti Uniswap tramite [questo contratto](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Puoi vedere come utilizzarlo [qui](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

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

La maggior parte di questi li abbiamo già incontrati o sono abbastanza ovvi. L'unica eccezione è `IWETH.sol`. Uniswap v2 consente scambi per qualsiasi coppia di token ERC-20, ma l'ether (ETH) stesso non è un token ERC-20. Precede lo standard e viene trasferito tramite meccanismi unici. Per consentire l'uso di ETH nei contratti che si applicano ai token ERC-20, è stato ideato il contratto dell'[ether avvolto (WETH)](https://weth.tkn.eth.limo/). Invii ETH a questo contratto e ti conia un importo equivalente di WETH. Oppure puoi bruciare WETH e riavere indietro ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Il router deve sapere quale factory utilizzare e, per le transazioni che richiedono WETH, quale contratto WETH utilizzare. Questi valori sono [immutabili](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), il che significa che possono essere impostati solo nel costruttore. Ciò dà agli utenti la sicurezza che nessuno sarebbe in grado di modificarli per puntare a contratti meno onesti.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Questo modificatore si assicura che le transazioni limitate nel tempo ("fai X prima del tempo Y se puoi") non avvengano dopo il loro limite di tempo.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Il costruttore imposta semplicemente le variabili di stato immutabili.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // accetta ETH solo tramite fallback dal contratto WETH
    }
```

Questa funzione viene chiamata quando riscattiamo i token dal contratto WETH per farli tornare in ETH. Solo il contratto WETH che utilizziamo è autorizzato a farlo.

#### Aggiungere liquidità {#add-liquidity}

Queste funzioni aggiungono token all'exchange della coppia, il che aumenta il pool di liquidità.

```solidity

    // **** AGGIUNGI LIQUIDITÀ ****
    function _addLiquidity(
```

Questa funzione viene utilizzata per calcolare la quantità di token A e B che dovrebbero essere depositati nell'exchange della coppia.

```solidity
        address tokenA,
        address tokenB,
```

Questi sono gli indirizzi dei contratti dei token ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Questi sono gli importi che il fornitore di liquidità desidera depositare. Sono anche gli importi massimi di A e B da depositare.

```solidity
        uint amountAMin,
        uint amountBMin
```

Questi sono gli importi minimi accettabili da depositare. Se la transazione non può aver luogo con questi importi o superiori, viene annullata. Se non desideri questa funzionalità, specifica semplicemente zero.

I fornitori di liquidità specificano un minimo, in genere, perché vogliono limitare la transazione a un tasso di cambio vicino a quello attuale. Se il tasso di cambio fluttua troppo, potrebbe significare notizie che cambiano i valori sottostanti e vogliono decidere manualmente cosa fare.

Ad esempio, immagina un caso in cui il tasso di cambio è uno a uno e il fornitore di liquidità specifica questi valori:

| Parametro      | Valore |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Finché il tasso di cambio rimane tra 0,9 e 1,25, la transazione ha luogo. Se il tasso di cambio esce da tale intervallo, la transazione viene annullata.

Il motivo di questa precauzione è che le transazioni non sono immediate, le invii e alla fine un validatore le includerà in un blocco (a meno che il tuo prezzo del gas non sia molto basso, nel qual caso dovrai inviare un'altra transazione con lo stesso nonce e un prezzo del gas più alto per sovrascriverla). Non puoi controllare cosa succede durante l'intervallo tra l'invio e l'inclusione.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

La funzione restituisce gli importi che il fornitore di liquidità dovrebbe depositare per avere un rapporto uguale al rapporto attuale tra le riserve.

```solidity
        // crea la coppia se non esiste ancora
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Se non c'è ancora un exchange per questa coppia di token, crealo.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Ottieni le riserve attuali nella coppia.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Se le riserve attuali sono vuote, allora questo è un nuovo exchange di coppia. Gli importi da depositare dovrebbero essere esattamente gli stessi che il fornitore di liquidità desidera fornire.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Se abbiamo bisogno di vedere quali saranno gli importi, otteniamo l'importo ottimale utilizzando [questa funzione](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Vogliamo lo stesso rapporto delle riserve attuali.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Se `amountBOptimal` è inferiore all'importo che il fornitore di liquidità desidera depositare, significa che il token B è attualmente più prezioso di quanto pensi il depositante di liquidità, quindi è richiesto un importo inferiore.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Se l'importo ottimale di B è superiore all'importo desiderato di B, significa che i token B sono attualmente meno preziosi di quanto pensi il depositante di liquidità, quindi è richiesto un importo maggiore. Tuttavia, l'importo desiderato è un massimo, quindi non possiamo farlo. Calcoliamo invece il numero ottimale di token A per l'importo desiderato di token B.

Mettendo tutto insieme otteniamo questo grafico. Supponiamo che tu stia cercando di depositare mille token A (linea blu) e mille token B (linea rossa). L'asse x è il tasso di cambio, A/B. Se x=1, hanno lo stesso valore e ne depositi mille per ciascuno. Se x=2, A vale il doppio di B (ottieni due token B per ogni token A), quindi depositi mille token B, ma solo 500 token A. Se x=0,5, la situazione è invertita, mille token A e cinquecento token B.

![Grafico](liquidityProviderDeposit.png)

Potresti depositare liquidità direttamente nel contratto principale (utilizzando [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), ma il contratto principale controlla solo di non essere ingannato a sua volta, quindi corri il rischio di perdere valore se il tasso di cambio cambia tra il momento in cui invii la tua transazione e il momento in cui viene eseguita. Se utilizzi il contratto periferico, calcola l'importo che dovresti depositare e lo deposita immediatamente, in modo che il tasso di cambio non cambi e tu non perda nulla.

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

Questa funzione può essere chiamata da una transazione per depositare liquidità. La maggior parte dei parametri è la stessa di `_addLiquidity` sopra, con due eccezioni:

. `to` è l'indirizzo che ottiene i nuovi token di liquidità coniati per mostrare la porzione del pool del fornitore di liquidità
. `deadline` è un limite di tempo per la transazione

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Calcoliamo gli importi da depositare effettivamente e poi troviamo l'indirizzo del pool di liquidità. Per risparmiare gas non lo facciamo chiedendo alla factory, ma utilizzando la funzione di libreria `pairFor` (vedi sotto nelle librerie)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Trasferisci gli importi corretti di token dall'utente all'exchange della coppia.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

In cambio, dai all'indirizzo `to` i token di liquidità per la proprietà parziale del pool. La funzione `mint` del contratto principale vede quanti token extra ha (rispetto a quelli che aveva l'ultima volta che la liquidità è cambiata) e conia liquidità di conseguenza.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Quando un fornitore di liquidità desidera fornire liquidità a un exchange di coppia Token/ETH, ci sono alcune differenze. Il contratto gestisce l'avvolgimento dell'ETH per il fornitore di liquidità. Non è necessario specificare quanti ETH l'utente desidera depositare, perché l'utente li invia semplicemente con la transazione (l'importo è disponibile in `msg.value`).

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

Per depositare l'ETH, il contratto prima lo avvolge in WETH e poi trasferisce il WETH nella coppia. Nota che il trasferimento è avvolto in un `assert`. Ciò significa che se il trasferimento fallisce, anche questa chiamata al contratto fallisce e, pertanto, l'avvolgimento non avviene realmente.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // rimborsa la polvere di eth, se presente
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

L'utente ci ha già inviato l'ETH, quindi se c'è un extra rimasto (perché l'altro token è meno prezioso di quanto l'utente pensasse), dobbiamo emettere un rimborso.

#### Rimuovere liquidità {#remove-liquidity}

Queste funzioni rimuoveranno la liquidità e rimborseranno il fornitore di liquidità.

```solidity
    // **** RIMUOVI LIQUIDITÀ ****
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

Il caso più semplice di rimozione della liquidità. C'è un importo minimo di ogni token che il fornitore di liquidità accetta di ricevere e deve avvenire prima della scadenza.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // invia liquidità alla coppia
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

La funzione `burn` del contratto principale gestisce il rimborso dei token all'utente.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Quando una funzione restituisce più valori, ma siamo interessati solo ad alcuni di essi, questo è il modo in cui otteniamo solo quei valori. È in qualche modo più economico in termini di gas rispetto alla lettura di un valore e al suo mancato utilizzo.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Traduci gli importi dal modo in cui il contratto principale li restituisce (prima il token con l'indirizzo più basso) al modo in cui l'utente se li aspetta (corrispondenti a `tokenA` e `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Va bene eseguire prima il trasferimento e poi verificarne la legittimità, perché se non lo è annulleremo tutte le modifiche di stato.

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

Rimuovere la liquidità per ETH è quasi lo stesso, tranne per il fatto che riceviamo i token WETH e poi li riscattiamo per ETH da restituire al fornitore di liquidità.

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

Queste funzioni trasmettono meta-transazioni per consentire agli utenti senza ether di prelevare dal pool, utilizzando [il meccanismo di permesso](#UniswapV2ERC20).

```solidity

    // **** RIMUOVI LIQUIDITÀ (supporto per token con commissione sul trasferimento) ****
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

Questa funzione può essere utilizzata per i token che hanno commissioni di trasferimento o di archiviazione. Quando un token ha tali commissioni, non possiamo fare affidamento sulla funzione `removeLiquidity` per dirci quanto del token otteniamo indietro, quindi dobbiamo prima prelevare e poi ottenere il saldo.

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

#### Scambiare {#trade}

```solidity
    // **** SCAMBIO ****
    // richiede che l'importo iniziale sia già stato inviato alla prima coppia
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Questa funzione esegue l'elaborazione interna necessaria per le funzioni esposte ai trader.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Mentre scrivo questo ci sono [388.160 token ERC-20](https://eth.blockscout.com/tokens). Se ci fosse un exchange di coppia per ogni coppia di token, ci sarebbero oltre 150 miliardi di exchange di coppie. L'intera catena, al momento, [ha solo lo 0,1% di quel numero di account](https://eth.blockscout.com/stats/accountsGrowth). Invece, le funzioni di scambio supportano il concetto di percorso. Un trader può scambiare A per B, B per C e C per D, quindi non c'è bisogno di un exchange di coppia diretto A-D.

I prezzi su questi mercati tendono a essere sincronizzati, perché quando non lo sono si crea un'opportunità di arbitraggio. Immagina, ad esempio, tre token, A, B e C. Ci sono tre exchange di coppie, uno per ogni coppia.

1. La situazione iniziale
2. Un trader vende 24,695 token A e ottiene 25,305 token B.
3. Il trader vende 24,695 token B per 25,305 token C, mantenendo circa 0,61 token B come profitto.
4. Quindi il trader vende 24,695 token C per 25,305 token A, mantenendo circa 0,61 token C come profitto. Il trader ha anche 0,61 token A extra (i 25,305 con cui il trader finisce, meno l'investimento originale di 24,695).

| Passo | Exchange A-B                | Exchange B-C                | Exchange A-C                |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1    | A:1000 B:1050 A/B=1.05      | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 2    | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 3    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Ottieni la coppia che stiamo attualmente gestendo, ordinala (per l'uso con la coppia) e ottieni l'importo di output previsto.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Ottieni gli importi in uscita previsti, ordinati nel modo in cui l'exchange della coppia si aspetta che siano.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

È questo l'ultimo exchange? In tal caso, invia i token ricevuti per lo scambio alla destinazione. In caso contrario, inviali al prossimo exchange di coppia.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Chiama effettivamente l'exchange della coppia per scambiare i token. Non abbiamo bisogno di un callback per essere informati dello scambio, quindi non inviamo alcun byte in quel campo.

```solidity
    function swapExactTokensForTokens(
```

Questa funzione viene utilizzata direttamente dai trader per scambiare un token con un altro.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Questo parametro contiene gli indirizzi dei contratti ERC-20. Come spiegato sopra, questo è un array perché potresti dover passare attraverso diversi exchange di coppie per passare dall'asset che hai all'asset che desideri.

Un parametro di funzione in Solidity può essere archiviato in `memory` o in `calldata`. Se la funzione è un punto di ingresso al contratto, chiamata direttamente da un utente (utilizzando una transazione) o da un contratto diverso, il valore del parametro può essere preso direttamente dai dati della chiamata. Se la funzione viene chiamata internamente, come `_swap` sopra, i parametri devono essere archiviati in `memory`. Dal punto di vista del contratto chiamato, `calldata` è di sola lettura.

Con tipi scalari come `uint` o `address`, il compilatore gestisce la scelta dell'archiviazione per noi, ma con gli array, che sono più lunghi e costosi, specifichiamo il tipo di archiviazione da utilizzare.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

I valori di ritorno vengono sempre restituiti in memoria.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Calcola l'importo da acquistare in ogni scambio. Se il risultato è inferiore al minimo che il trader è disposto ad accettare, annulla la transazione.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Infine, trasferisci il token ERC-20 iniziale all'account per il primo exchange di coppia e chiama `_swap`. Tutto questo avviene nella stessa transazione, quindi l'exchange della coppia sa che eventuali token imprevisti fanno parte di questo trasferimento.

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

La funzione precedente, `swapTokensForTokens`, consente a un trader di specificare un numero esatto di token in ingresso che è disposto a dare e il numero minimo di token in uscita che è disposto a ricevere in cambio. Questa funzione esegue lo scambio inverso, consente a un trader di specificare il numero di token in uscita che desidera e il numero massimo di token in ingresso che è disposto a pagare per essi.

In entrambi i casi, il trader deve prima dare a questo contratto periferico un'autorizzazione per consentirgli di trasferirli.

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
        // rimborsa la polvere di eth, se presente
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Queste quattro varianti comportano tutte il trading tra ETH e token. L'unica differenza è che o riceviamo ETH dal trader e lo usiamo per coniare WETH, oppure riceviamo WETH dall'ultimo exchange nel percorso e lo bruciamo, restituendo al trader l'ETH risultante.

```solidity
    // **** SCAMBIO (supporto per token con commissione sul trasferimento) ****
    // richiede che l'importo iniziale sia già stato inviato alla prima coppia
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Questa è la funzione interna per scambiare token che hanno commissioni di trasferimento o di archiviazione per risolvere ([questo problema](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // ambito per evitare errori di stack troppo profondo
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

A causa delle commissioni di trasferimento, non possiamo fare affidamento sulla funzione `getAmountsOut` per dirci quanto otteniamo da ogni trasferimento (come facciamo prima di chiamare lo `_swap` originale). Dobbiamo invece trasferire prima e poi vedere quanti token abbiamo ottenuto indietro.

Nota: in teoria potremmo semplicemente usare questa funzione invece di `_swap`, ma in certi casi (ad esempio, se il trasferimento finisce per essere annullato perché non c'è abbastanza alla fine per soddisfare il minimo richiesto) ciò finirebbe per costare più gas. I token con commissioni di trasferimento sono piuttosto rari, quindi, sebbene dobbiamo accoglierli, non c'è bisogno che tutti gli scambi presumano di passare attraverso almeno uno di essi.

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

Queste sono le stesse varianti utilizzate per i token normali, ma chiamano invece `_swapSupportingFeeOnTransferTokens`.

```solidity
    // **** FUNZIONI DI LIBRERIA ****
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

Queste funzioni sono solo proxy che chiamano le [funzioni di UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Questo contratto è stato utilizzato per migrare gli exchange dalla vecchia v1 alla v2. Ora che sono stati migrati, non è più rilevante.

## Le librerie {#libraries}

La [libreria SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) è ben documentata, quindi non c'è bisogno di documentarla qui.

### Math {#Math}

Questa libreria contiene alcune funzioni matematiche che normalmente non sono necessarie nel codice Solidity, quindi non fanno parte del linguaggio.

```solidity
pragma solidity =0.5.16;

// una libreria per eseguire varie operazioni matematiche

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // metodo babilonese (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Inizia con x come stima superiore alla radice quadrata (questo è il motivo per cui dobbiamo trattare 1-3 come casi speciali).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Ottieni una stima più vicina, la media della stima precedente e del numero di cui stiamo cercando di trovare la radice quadrata diviso per la stima precedente. Ripeti finché la nuova stima non è inferiore a quella esistente. Per maggiori dettagli, [vedi qui](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Non dovremmo mai aver bisogno della radice quadrata di zero. Le radici quadrate di uno, due e tre sono all'incirca uno (usiamo numeri interi, quindi ignoriamo la frazione).

```solidity
        }
    }
}
```

### Frazioni a virgola fissa (UQ112x112) {#FixedPoint}

Questa libreria gestisce le frazioni, che normalmente non fanno parte dell'aritmetica di Ethereum. Lo fa codificando il numero _x_ come _x\*2^112_. Questo ci permette di usare gli opcode originali di addizione e sottrazione senza modifiche.

```solidity
pragma solidity =0.5.16;

// una libreria per gestire i numeri in virgola fissa binari (https://wikipedia.org/wiki/Q_(number_format))

// intervallo: [0, 2**112 - 1]
// risoluzione: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` è la codifica per uno.

```solidity
    // codifica un uint112 come un UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // non va mai in overflow
    }
```

Poiché y è `uint112`, il massimo che può essere è 2^112-1. Quel numero può ancora essere codificato come un `UQ112x112`.

```solidity
    // divide un UQ112x112 per un uint112, restituendo un UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Se dividiamo due valori `UQ112x112`, il risultato non è più moltiplicato per 2^112. Quindi, invece, prendiamo un numero intero per il denominatore. Avremmo dovuto usare un trucco simile per fare la moltiplicazione, ma non abbiamo bisogno di fare la moltiplicazione di valori `UQ112x112`.

### UniswapV2Library {#uniswapV2library}

Questa libreria è usata solo dai contratti periferici

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // restituisce gli indirizzi dei token ordinati, utilizzato per gestire i valori di ritorno dalle coppie ordinate in questo ordine
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Ordina i due token per indirizzo, così saremo in grado di ottenere l'indirizzo dell'exchange della coppia per loro. Questo è necessario perché altrimenti avremmo due possibilità, una per i parametri A,B e un'altra per i parametri B,A, portando a due exchange invece di uno.

```solidity
    // calcola l'indirizzo CREATE2 per una coppia senza effettuare alcuna chiamata esterna
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // hash del codice di inizializzazione
            ))));
    }
```

Questa funzione calcola l'indirizzo dell'exchange della coppia per i due token. Questo contratto è creato usando [l'opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014), quindi possiamo calcolare l'indirizzo usando lo stesso algoritmo se conosciamo i parametri che usa. Questo è molto più economico che chiederlo alla factory, e

```solidity
    // recupera e ordina le riserve per una coppia
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Questa funzione restituisce le riserve dei due token che l'exchange della coppia possiede. Nota che può ricevere i token in qualsiasi ordine, e li ordina per uso interno.

```solidity
    // dato un certo importo di un asset e le riserve della coppia, restituisce un importo equivalente dell'altro asset
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Questa funzione ti dà la quantità di token B che otterrai in cambio del token A se non ci sono commissioni coinvolte. Questo calcolo tiene conto del fatto che il trasferimento cambia il tasso di cambio.

```solidity
    // dato un importo di input di un asset e le riserve della coppia, restituisce l'importo massimo di output dell'altro asset
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

La funzione `quote` qui sopra funziona benissimo se non ci sono commissioni per usare l'exchange della coppia. Tuttavia, se c'è una commissione di scambio dello 0,3%, l'importo che ottieni effettivamente è inferiore. Questa funzione calcola l'importo dopo la commissione di scambio.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity non gestisce le frazioni nativamente, quindi non possiamo semplicemente moltiplicare l'importo per 0,997. Invece, moltiplichiamo il numeratore per 997 e il denominatore per 1000, ottenendo lo stesso effetto.

```solidity
    // dato un importo di output di un asset e le riserve della coppia, restituisce un importo di input richiesto dell'altro asset
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Questa funzione fa all'incirca la stessa cosa, ma ottiene l'importo di output e fornisce l'input.

```solidity

    // esegue calcoli getAmountOut concatenati su un numero qualsiasi di coppie
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // esegue calcoli getAmountIn concatenati su un numero qualsiasi di coppie
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

Queste due funzioni gestiscono l'identificazione dei valori quando è necessario passare attraverso diversi exchange di coppie.

### Transfer Helper {#transfer-helper}

[Questa libreria](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) aggiunge controlli di successo attorno ai trasferimenti ERC-20 ed Ethereum per trattare un revert e un valore di ritorno `false` allo stesso modo.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// metodi di supporto per interagire con i token ERC20 e inviare ETH che non restituiscono coerentemente true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Possiamo chiamare un contratto diverso in uno dei due modi seguenti:

- Usare una definizione di interfaccia per creare una chiamata di funzione
- Usare l'[interfaccia binaria dell'applicazione (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) "manualmente" per creare la chiamata. Questo è ciò che l'autore del codice ha deciso di fare.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Per motivi di retrocompatibilità con i token creati prima dello standard ERC-20, una chiamata ERC-20 può fallire sia tramite revert (nel qual caso `success` è `false`) sia avendo successo e restituendo un valore `false` (nel qual caso ci sono dati di output, e se li decodifichi come booleani ottieni `false`).

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

Questa funzione implementa [la funzionalità di trasferimento di ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), che consente a un account di spendere l'allowance fornita da un account diverso.

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

Questa funzione implementa [la funzionalità transferFrom di ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), che consente a un account di spendere l'allowance fornita da un account diverso.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Questa funzione trasferisce ether a un account. Qualsiasi chiamata a un contratto diverso può tentare di inviare ether. Poiché non abbiamo bisogno di chiamare effettivamente alcuna funzione, non inviamo alcun dato con la chiamata.

## Conclusione {#conclusion}

Questo è un lungo articolo di circa 50 pagine. Se sei arrivato fin qui, congratulazioni! Speriamo che a questo punto tu abbia compreso le considerazioni da fare quando si scrive un'applicazione reale (al contrario di brevi programmi di esempio) e che tu sia più preparato per scrivere contratti per i tuoi casi d'uso.

Ora vai, scrivi qualcosa di utile e stupiscici.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).