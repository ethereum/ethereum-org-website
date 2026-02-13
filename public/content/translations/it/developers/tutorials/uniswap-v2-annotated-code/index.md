---
title: "Guida dettagliata al contratto Uniswap-v2"
description: "Come funziona il contratto Uniswap-v2? Perché è scritto così?"
author: Ori Pomerantz
tags: [ "Solidity" ]
skill: intermediate
published: 2021-05-01
lang: it
---

## Introduzione {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) può creare un mercato di scambio tra due token ERC-20 qualsiasi. In questo articolo analizzeremo il codice sorgente dei contratti che implementano questo protocollo e vedremo perché sono scritti in questo modo.

### Cosa fa Uniswap? {#what-does-uniswap-do}

Fondamentalmente, esistono due tipi di utenti: fornitori di liquidità e trader.

I _fornitori di liquidità_ forniscono al gruppo i due token che possono essere scambiati (li chiameremo **Token0** e **Token1**). In cambio, ricevono un terzo token che rappresenta la proprietà parziale del gruppo, detto _token di liquidità_.

I _trader_ inviano un tipo di token al gruppo e ricevono l'altro (ad esempio, inviano **Token0** e ricevono **Token1**) dal gruppo fornito dai fornitori di liquidità. Il tasso di cambio è determinato dal numero relativo di **Token0** e **Token1** che il gruppo possiede. Inoltre, il gruppo prende una piccola percentuale come ricompensa per il gruppo di liquidità.

Quando i fornitori di liquidità desiderano riavere indietro i propri asset, possono bruciare i token del gruppo e ricevere indietro i loro token, inclusa la loro quota di ricompense.

[Fai clic qui per una descrizione più completa](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Perché v2? Perché non v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) è un aggiornamento molto più complicato della v2. È più facile imparare prima la v2 e poi passare alla v3.

### Contratti principali e contratti periferici {#contract-types}

Uniswap v2 è diviso in due componenti, una principale e una periferica. Questa divisione consente ai contratti principali, che detengono gli asset e quindi _devono_ essere sicuri, di essere più semplici e facili da sottoporre ad audit. Tutte le funzionalità aggiuntive richieste dai trader possono quindi essere fornite da contratti periferici.

## Flussi di dati e di controllo {#flows}

Questo è il flusso di dati e di controllo che si verifica quando si eseguono le tre azioni principali di Uniswap:

1. Scambio tra token diversi
2. Aggiunta di liquidità al mercato e ricompensa con token di liquidità ERC-20 dello scambio in pari
3. Bruciatura di token di liquidità ERC-20 e recupero dei token ERC-20 che lo scambio in pari consente ai trader di scambiare

### Scambio {#swap-flow}

Questo è il flusso più comune, usato dai trader:

#### Chiamante {#caller}

1. Fornisce al conto periferico un'indennità nell'importo da scambiare.
2. Chiama una delle tante funzioni di scambio del contratto periferico (la scelta dipende dal fatto che ETH sia o meno coinvolto, se il trader specifica l'importo di token da depositare o l'importo di token da riprendere, ecc.).
   Ogni funzione di scambio accetta un `path`, ovvero un array di scambi da attraversare.

#### Nel contratto periferico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identifica gli importi che devono essere scambiati su ogni piattaforma di scambio lungo il percorso.
4. Itera sul percorso. Per ogni piattaforma di scambio lungo il percorso, invia il token di input e poi chiama la funzione di `swap` della piattaforma di scambio.
   Nella maggior parte dei casi, l'indirizzo di destinazione per i token è la piattaforma di scambio di coppia successiva nel percorso. Nella piattaforma di scambio finale è l'indirizzo fornito dal trader.

#### Nel contratto principale (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}5. Verifica che il contratto principale non venga ingannato e che possa mantenere una liquidità sufficiente dopo lo scambio.

6. Vede quanti token aggiuntivi abbiamo, oltre alle riserve note. Quell'importo è il numero di token di input ricevuti da scambiare.
7. Invia i token d'output alla destinazione.
8. Chiama `_update` per aggiornare gli importi di riserva

#### Di nuovo nel contratto periferico (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Esegue ogni pulizia necessaria (ad esempio, brucia i token WETH per riottenere ETH da inviare al trader)

### Aggiungere Liquidità {#add-liquidity-flow}

#### Chiamante {#caller-2}

1. Fornisce al conto periferico un'indennità per gli importi da aggiungere al gruppo di liquidità.
2. Chiama una delle funzioni `addLiquidity` del contratto periferico.

#### Nel contratto periferico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Crea una nuova piattaforma di scambio di coppia, se necessario
4. Se esiste una piattaforma di scambio di coppia, calcola l'importo di token da aggiungere. Questo dovrebbe essere un valore identico per entrambi i token, quindi lo stesso rapporto tra token nuovi e token esistenti.
5. Controlla se gli importi sono accettabili (i chiamanti possono specificare un importo minimo al di sotto del quale preferiscono non aggiungere liquidità)
6. Chiama il contratto principale.

#### Nel contratto principale (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Conia i token di liquidità e li invia al chiamante
8. Chiama `_update` per aggiornare gli importi di riserva

### Rimuovere Liquidità {#remove-liquidity-flow}

#### Chiamante {#caller-3}

1. Fornisce al conto periferico un'indennità di token di liquidità da bruciare in cambio dei token sottostanti.
2. Chiama una delle funzioni `removeLiquidity` del contratto periferico.

#### Nel contratto periferico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Invia i token di liquidità allo scambio in pari

#### Nel contratto principale (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Invia all'indirizzo di destinazione i token sottostanti in proporzione ai token bruciati. Ad esempio, se ci sono 1000 token A nel gruppo, 500 token B e 90 token di liquidità e riceviamo 9 token da bruciare, stiamo bruciando il 10% dei token di liquidità, quindi restituiamo all'utente 100 token A e 50 token B.
5. Brucia i token di liquidità
6. Chiama `_update` per aggiornare gli importi di riserva

## I Contratti Principali {#core-contracts}

Questi sono i contratti sicuri che detengono la liquidità.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Questo contratto](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementa il gruppo effettivo che scambia i token. È la funzionalità principale di Uniswap.

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

Queste sono tutte le interfacce che il contratto deve conoscere, perché il contratto le implementa (`IUniswapV2Pair` e `UniswapV2ERC20`) o perché chiama dei contratti per implementarle.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Questo contratto eredita da `UniswapV2ERC20`, che fornisce le funzioni ERC-20 per i token di liquidità.

```solidity
    using SafeMath  for uint;
```

La [libreria SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) viene utilizzata per evitare sovraflussi e sottoflussi. Questo è importante perché altrimenti potremmo finire in una situazione in cui il valore dovrebbe essere `-1`, ma è invece `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Molti calcoli nel contratto di gruppo richiedono frazioni. Tuttavia, le frazioni non sono supportate dall'EVM.
La soluzione che Uniswap ha trovato è usare valori da 224 bit, con 112 bit per la parte intera e 112 bit per la frazione. Quindi `1.0` è rappresentato come `2^112`, `1.5` è rappresentato come `2^112 + 2^111`, ecc.

Maggiori dettagli su questa libreria sono disponibili [più avanti nel documento](#FixedPoint).

#### Variabili {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Per evitare i casi di divisione per zero, esiste un numero minimo di token di liquidità sempre esistenti (ma posseduti dal conto zero). Quel numero è **MINIMUM_LIQUIDITY**, mille.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Questo è il selettore ABI per la funzione di trasferimento ERC-20. È usato per trasferire i token ERC-20 nei due conti di token.

```solidity
    address public factory;
```

Questo è il contratto factory che ha creato questo gruppo. Ogni gruppo è uno scambio tra due token ERC-20; la factory è un punto centrale che connette tutti questi gruppi.

```solidity
    address public token0;
    address public token1;
```

Sono gli indirizzi dei contratti per i due tipi di token ERC-20 che possono essere scambiati da questo gruppo.

```solidity
    uint112 private reserve0;           // usa un singolo slot di archiviazione, accessibile tramite getReserves
    uint112 private reserve1;           // usa un singolo slot di archiviazione, accessibile tramite getReserves
```

Le riserve che il gruppo ha per ogni tipo di token. Assumiamo che i due rappresentino la stessa quantità di valore e che, dunque, ogni token0 valga reserve1/reserve0 token1.

```solidity
    uint32  private blockTimestampLast; // usa un singolo slot di archiviazione, accessibile tramite getReserves
```

La marca temporale dell'ultimo blocco in cui si è verificato uno scambio, usata per tracciare i tassi di cambio nel tempo.

Una delle maggiori spese di gas dei contratti di Ethereum è l'archiviazione, che persiste da una chiamata del contratto alla successiva. Ogni cella di archiviazione è lunga 256 bit. Quindi tre variabili, `reserve0`, `reserve1` e `blockTimestampLast`, sono allocate in modo che un singolo valore di archiviazione possa includerle tutte e tre (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Queste variabili contengono i costi cumulativi per ogni token (ognuna in termini dell'altra). Possono essere utilizzate per calcolare il tasso di cambio medio su un dato periodo di tempo.

```solidity
    uint public kLast; // reserve0 * reserve1, immediatamente dopo l'evento di liquidità più recente
```

Il modo in cui la piattaforma di scambio di coppia decide il tasso di cambio tra token0 e token1 è mantenere il multiplo delle due riserve costante durante gli scambi. `kLast` è questo valore. Cambia quando un fornitore di liquidità deposita o preleva token e aumenta leggermente a causa della commissione di mercato dello 0,3%.

Ecco un semplice esempio. Nota che, per semplicità, la tabella contiene solo tre cifre dopo il punto decimale e ignoriamo la commissione di trading dello 0,3%, quindi i numeri non sono esatti.

| Evento                                        |                  reserve0 |                  reserve1 |                      reserve0 \* reserve1 | Tasso di cambio medio (token1 / token0) |
| --------------------------------------------- | ------------------------: | ------------------------: | ----------------------------------------: | ---------------------------------------------------------- |
| Configurazione iniziale                       | 1.000,000 | 1.000,000 | 1.000.000 |                                                            |
| Trader A scambia 50 token0 per 47,619 token1  | 1.050,000 |                   952,381 | 1.000.000 | 0,952                                                      |
| Trader B scambia 10 token0 per 8,984 token1   | 1.060,000 |                   943,396 | 1.000.000 | 0,898                                                      |
| Trader C scambia 40 token0 per 34,305 token1  | 1.100,000 |                   909,090 | 1.000.000 | 0,858                                                      |
| Trader D scambia 100 token1 per 109,01 token0 |                   990,990 | 1.009,090 | 1.000.000 | 0,917                                                      |
| Trader E scambia 10 token0 per 10,079 token1  | 1.000,990 |                   999,010 | 1.000.000 | 1,008                                                      |

Man mano che i trader forniscono più token0, il valore relativo di token1 aumenta, e viceversa, in base all'offerta e alla domanda.

#### Blocco {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Esiste una classe di vulnerabilità di sicurezza basate sull'[abuso di rientranza](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap deve trasferire token ERC-20 arbitrari, ovvero chiamare i contratti ERC-20 che potrebbero tentare di abusare del mercato di Uniswap che li chiama.
Avendo una variabile `unlocked` come parte del contratto, possiamo impedire che le funzioni vengano chiamate mentre sono in esecuzione (all'interno della stessa transazione).

```solidity
    modifier lock() {
```

Questa funzione è un [modificatore](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), una funzione che si avvolge attorno a una funzione normale per cambiarne il comportamento in qualche modo.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Se `unlocked` è pari a uno, impostalo su zero. Se è già zero, annulla la chiamata, facendola fallire.

```solidity
        _;
```

In un modificatore `_;` è la chiamata alla funzione originale (con tutti i parametri). Questo significa che la chiamata alla funzione si verifica solo se `unlocked` era pari a uno al momento della chiamata, e mentre è in esecuzione il valore di `unlocked` è zero.

```solidity
        unlocked = 1;
    }
```

Dopo che la funzione principale restituisce, rilascia il blocco.

#### Varie funzioni {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Questa funzione fornisce ai chiamanti lo stato corrente della piattaforma di scambio. Si noti che le funzioni di Solidity [possono restituire valori multipli](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Questa funzione interna trasferisce un importo di token ERC-20 dalla piattaforma di scambio a qualcun altro. `SELECTOR` specifica che la funzione che stiamo chiamando è `transfer(address,uint)` (vedere la definizione sopra).

Per evitare di dover importare un'interfaccia per la funzione del token, creiamo "manualmente" la chiamata usando una delle [funzioni ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Ci sono due modi in cui una chiamata di trasferimento ERC-20 può segnalare un fallimento:

1. Annullamento. Se una chiamata a un contratto esterno viene annullata, il valore booleano restituito è `false`
2. Termina normalmente ma segnala un fallimento. In quel caso, il buffer del valore restituito ha una lunghezza diversa da zero e, quando decodificato come valore booleano, è `false`

Se una di queste condizioni si verifica, annulla.

#### Eventi {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Questi due eventi vengono emessi quando un fornitore di liquidità deposita (`Mint`) o preleva (`Burn`) liquidità. In entrambi i casi, gli importi di token0 e token1 depositati o prelevati fanno parte dell'evento, così come l'identità del conto che ci ha chiamato (`sender`). Nel caso di un prelievo, l'evento include anche la destinazione che ha ricevuto i token (`to`), che potrebbe non essere la stessa del mittente.

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

Questo evento viene emesso quando un trader scambia un token con un altro. Anche in questo caso, il mittente e la destinazione potrebbero non essere gli stessi.
Ogni token può essere inviato alla piattaforma di scambio o ricevuto da essa.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Infine, `Sync` viene emesso ogni volta che i token vengono aggiunti o prelevati, indipendentemente dal motivo, per fornire le ultime informazioni sulla riserva (e quindi il tasso di cambio).

#### Funzioni di Configurazione {#pair-setup}

Queste funzioni dovrebbero essere chiamate una volta quando viene configurata la nuova piattaforma di scambio di coppia.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Il costruttore si assicura che terremo traccia dell'indirizzo della factory che ha creato la coppia. Questa informazione è richiesta per `initialize` e per la commissione della factory (se esiste)

```solidity
    // chiamata una volta dalla factory al momento della distribuzione
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // controllo sufficiente
        token0 = _token0;
        token1 = _token1;
    }
```

Questa funzione permette alla factory (e solo alla factory) di specificare i due token ERC-20 che questa coppia scambierà.

#### Funzioni di Aggiornamento Interne {#pair-update-internal}

##### \_update

```solidity
    // aggiorna le riserve e, alla prima chiamata per blocco, gli accumulatori di prezzo
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Questa funzione viene chiamata ogni volta che i token vengono depositati o prelevati.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Se balance0 o balance1 (uint256) è superiore a uint112(-1) (=2^112-1) (quindi va in overflow e torna a 0 quando convertito in uint112), si rifiuta di continuare lo \_update per impedire overflow. Con un token normale che può essere suddiviso in 10^18 unità, ciò significa che ogni piattaforma di scambio è limitata a circa 5,1\*10^15 di ogni token. Finora questo non è stato un problema.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // l'overflow è desiderato
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Se il tempo trascorso è diverso da zero, significa che siamo la prima transazione di scambio su questo blocco. In tal caso, dobbiamo aggiornare gli accumulatori di costo.

```solidity
            // * non va mai in overflow, e + l'overflow è desiderato
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Ogni accumulatore di costo viene aggiornato con l'ultimo costo (riserva dell'altro token/riserva di questo token) moltiplicato per il tempo trascorso in secondi. Per ottenere un prezzo medio, si legge il prezzo cumulativo in due punti nel tempo e si divide per la differenza di tempo tra di essi. Ad esempio, si supponga questa sequenza di eventi:

| Evento                                                            |                  reserve0 |                  reserve1 | marca temporale       | Tasso di cambio marginale (reserve1 / reserve0) |       price0CumulativeLast |
| ----------------------------------------------------------------- | ------------------------: | ------------------------: | --------------------- | -----------------------------------------------------------------: | -------------------------: |
| Configurazione iniziale                                           | 1.000,000 | 1.000,000 | 5.000 |                                                              1,000 |                          0 |
| Il trader A deposita 50 token0 e ottiene in cambio 47,619 token1  | 1.050,000 |                   952,381 | 5.020 |                                                              0,907 |                         20 |
| Il trader B deposita 10 token0 e ottiene in cambio 8,984 token1   | 1.060,000 |                   943,396 | 5.030 |                                                              0,890 |       20+10\*0,907 = 29,07 |
| Il trader C deposita 40 token0 e ottiene in cambio 34,305 token1  | 1.100,000 |                   909,090 | 5.100 |                                                              0,826 |    29,07+70\*0,890 = 91,37 |
| Il trader D deposita 100 token1 e ottiene in cambio 109,01 token0 |                   990,990 | 1.009,090 | 5.110 |                                                              1,018 |    91,37+10\*0,826 = 99,63 |
| Il trader E deposita 10 token0 e ottiene in cambio 10,079 token1  | 1.000,990 |                   999,010 | 5.150 |                                                              0,998 | 99,63+40\*1,1018 = 143,702 |

Diciamo di voler calcolare il prezzo medio di **Token0** tra le marche temporali 5.030 e 5.150. La differenza nel valore di `price0Cumulative` è 143,702-29,07=114,632. Questa è la media su due minuti (120 secondi). Quindi il prezzo medio è 114,632/120 = 0,955.

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
    // se la commissione è attiva, conia una liquidità equivalente a 1/6 della crescita in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

In Uniswap 2.0 i trader pagano una commissione dello 0,30% per usare il mercato. La maggior parte di questa commissione (0,25% dello scambio) va sempre ai fornitori di liquidità. Il rimanente 0,05% può andare ai fornitori di liquidità o a un indirizzo specificato dalla factory come commissione di protocollo, che paga Uniswap per i suoi sforzi di sviluppo.

Per ridurre i calcoli (e dunque i costi del gas), questa commissione è calcolata solo quando la liquidità è aggiunta o rimossa dal gruppo, piuttosto che a ogni transazione.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Leggi la destinazione della commissione della factory. Se è zero, allora non vi è alcuna commissione di protocollo e non serve calcolare tale commissione.

```solidity
        uint _kLast = kLast; // risparmio di gas
```

La variabile di stato `kLast` si trova nell'archiviazione, quindi avrà un valore diverso tra le varie chiamate al contratto.
L'accesso all'archiviazione è molto più costoso dell'accesso alla memoria volatile, che viene rilasciata al termine della chiamata di funzione al contratto, quindi utilizziamo una variabile interna per risparmiare sul gas.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

I fornitori di liquidità ottengono la loro parte semplicemente attraverso l'apprezzamento dei loro token di liquidità. Ma la commissione di protocollo richiede di coniare e fornire nuovi token di liquidità all'indirizzo `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Se c'è nuova liquidità su cui riscuotere una commissione di protocollo. Puoi vedere la funzione della radice quadrata [più avanti in questo articolo](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Questo complicato calcolo delle commissioni è spiegato nel [whitepaper](https://app.uniswap.org/whitepaper.pdf) a pagina 5. Sappiamo che tra il momento del calcolo di `kLast` e il presente non è stata aggiunta o rimossa alcuna liquidità (perché eseguiamo questo calcolo ogni volta che la liquidità viene aggiunta o rimossa, prima che cambi effettivamente), quindi qualsiasi variazione in `reserve0 * reserve1` deve provenire dalle commissioni di transazione (senza di esse manterremmo `reserve0 * reserve1` costante).

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

Se non c'è alcuna commissione, imposta `kLast` a zero (se non lo è già). Alla stesura di questo contratto, era presente una [funzionalità di rimborso del gas](https://eips.ethereum.org/EIPS/eip-3298), che incoraggiava i contratti a ridurre le dimensioni complessive dello stato di Ethereum, azzerando l'archiviazione non necessaria.
Questo codice ottiene tale rimborso, quando possibile.

#### Funzioni Accessibili Esternamente {#pair-external}

Si noti che, sebbene qualsiasi transazione o contratto _possa_ chiamare queste funzioni, esse sono progettate per essere chiamate dal contratto periferico. Se li chiami direttamente non potrai ingannare la piattaforma di scambio di coppia, ma potresti perdere valore a causa di un errore.

##### conio

```solidity
    // questa funzione di basso livello dovrebbe essere chiamata da un contratto che esegue importanti controlli di sicurezza
    function mint(address to) external lock returns (uint liquidity) {
```

Questa funzione viene chiamata quando un fornitore di liquidità aggiunge liquidità al gruppo. Conia token di liquidità aggiuntivi come ricompensa. Dovrebbe essere chiamata da [un contratto periferico](#UniswapV2Router02) che la chiami dopo aver aggiunto la liquidità nella stessa transazione (in modo che nessun altro possa inviare una transazione che rivendichi la nuova liquidità prima del legittimo proprietario).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // risparmio di gas
```

Questo è il modo per leggere i risultati di una funzione Solidity che restituisce valori multipli. Scartiamo gli ultimi valori restituiti, la marca temporale del blocco, perché non ne abbiamo bisogno.

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

Calcola le commissioni di protocollo da riscuotere, se presenti, e conia i token di liquidità di conseguenza. Poiché i parametri di `_mintFee` sono i vecchi valori di riserva, la commissione è calcolata accuratamente basandosi solo sulle variazioni del gruppo dovute alle commissioni.

```solidity
        uint _totalSupply = totalSupply; // risparmio di gas, deve essere definito qui poiché totalSupply può essere aggiornato in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // blocca permanentemente i primi token MINIMUM_LIQUIDITY
```

Se questo è il primo deposito, crea `MINIMUM_LIQUIDITY` token e li invia all'indirizzo zero per bloccarli. Non possono mai essere riscattati, il che significa che il gruppo non sarà mai svuotato completamente (questo ci salva dalla divisione per zero in alcuni punti). Il valore di `MINIMUM_LIQUIDITY` è mille che, considerando che la maggior parte degli ERC-20 è suddivisa in unità di 10^-18 di un token, così come ETH è diviso in wei, equivale a 10^-15 del valore di un singolo token. Non è un costo elevato.

Al momento del primo deposito non conosciamo il valore relativo dei due token, quindi moltiplichiamo semplicemente gli importi e ne calcoliamo la radice quadrata, supponendo che il deposito ci fornisca un valore uguale in entrambi i token.

Possiamo fidarci di questo perché è nell'interesse del depositante fornire un valore uguale, per evitare di perdere valore a causa dell'arbitraggio.
Diciamo che il valore dei due token è identico, ma il nostro depositante ha depositato una quantità di **Token1** quattro volte superiore a quella di **Token0**. Un trader può sfruttare il fatto che la piattaforma di scambio di coppia ritenga che **Token0** abbia più valore per estrarne valore.

| Evento                                                                 | reserve0 | reserve1 | reserve0 \* reserve1 | Valore del gruppo (reserve0 + reserve1) |
| ---------------------------------------------------------------------- | -------: | -------: | -------------------: | ---------------------------------------------------------: |
| Configurazione iniziale                                                |        8 |       32 |                  256 |                                                         40 |
| Il trader deposita 8 token **Token0**, ottiene in cambio 16 **Token1** |       16 |       16 |                  256 |                                                         32 |

Come si può vedere, il trader ha guadagnato 8 token extra, che provengono da una riduzione del valore del gruppo, danneggiando il depositante che lo possiede.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Ad ogni deposito successivo conosciamo già il tasso di cambio tra i due asset, e ci aspettiamo che i fornitori di liquidità forniscano un valore uguale in entrambi. In caso contrario, diamo loro token di liquidità in base al valore inferiore che hanno fornito, a titolo di punizione.

Che si tratti del deposito iniziale o di uno successivo, il numero di token di liquidità che forniamo è uguale alla radice quadrata della variazione di `reserve0*reserve1` e il valore del token di liquidità non cambia (a meno che non riceviamo un deposito che non ha valori uguali di entrambi i tipi, nel qual caso la "multa" viene distribuita). Ecco un altro esempio con due token che hanno lo stesso valore, con tre depositi validi e uno non valido (deposito di un solo tipo di token, quindi non produce alcun token di liquidità).

| Evento                        |                reserve0 |                reserve1 | reserve0 \* reserve1 | Valore del gruppo (reserve0 + reserve1) | Token di liquidità coniati per questo deposito | Token di liquidità totali | valore di ciascun token di liquidità |
| ----------------------------- | ----------------------: | ----------------------: | -------------------: | ---------------------------------------------------------: | ---------------------------------------------: | ------------------------: | -----------------------------------: |
| Configurazione iniziale       |                   8,000 |                   8,000 |                   64 |                                                     16,000 |                                              8 |                         8 |                                2,000 |
| Deposita quattro di ogni tipo |                  12,000 |                  12,000 |                  144 |                                                     24,000 |                                              4 |                        12 |                                2,000 |
| Deposita due di ogni tipo     |                  14,000 |                  14,000 |                  196 |                                                     28,000 |                                              2 |                        14 |                                2,000 |
| Deposito di valore non uguale |                  18,000 |                  14,000 |                  252 |                                                     32,000 |                                              0 |                        14 |               ~2,286 |
| Dopo l'arbitraggio            | ~15,874 | ~15,874 |                  252 |                                    ~31,748 |                                              0 |                        14 |               ~2,267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Usa la funzione `UniswapV2ERC20._mint` per creare effettivamente i token di liquidità aggiuntivi e darli al conto corretto.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 e reserve1 sono aggiornati
        emit Mint(msg.sender, amount0, amount1);
    }
```

Aggiorna le variabili di stato (`reserve0`, `reserve1` e, se necessario, `kLast`) ed emetti l'evento appropriato.

##### bruciare

```solidity
    // questa funzione di basso livello dovrebbe essere chiamata da un contratto che esegue importanti controlli di sicurezza
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Questa funzione viene chiamata quando la liquidità viene prelevata e i token di liquidità appropriati devono essere bruciati.
Dovrebbe essere chiamata anche [da un conto periferico](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // risparmio di gas
        address _token0 = token0;                                // risparmio di gas
        address _token1 = token1;                                // risparmio di gas
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Il contratto periferico ha trasferito la liquidità da bruciare a questo contratto prima della chiamata. In questo modo sappiamo quanta liquidità bruciare e possiamo assicurarci che venga bruciata.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // risparmio di gas, deve essere definito qui poiché totalSupply può essere aggiornato in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // l'uso dei saldi garantisce una distribuzione pro-rata
        amount1 = liquidity.mul(balance1) / _totalSupply; // l'uso dei saldi garantisce una distribuzione pro-rata
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Il fornitore di liquidità riceve un valore uguale di entrambi i token. In questo modo non modifichiamo il tasso di cambio.

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

Le variabili locali possono essere archiviate sia in memoria sia, se non sono troppe, direttamente nello stack.
Se possiamo limitarne il numero in modo da utilizzare lo stack, usiamo meno gas. Per maggiori dettagli, vedere [lo yellow paper, le specifiche formali di Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), p. 26, equazione 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // trasferisce i token in modo ottimistico
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // trasferisce i token in modo ottimistico
```

Questo trasferimento è ottimistico, perché trasferiamo prima di essere sicuri che tutte le condizioni siano soddisfatte. Questo è accettabile in Ethereum perché se le condizioni non vengono soddisfatte più avanti nella chiamata, annulliamo la chiamata e tutte le modifiche che ha creato.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informa il destinatario dello scambio, se richiesto.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Ottenere i saldi correnti. Il contratto periferico ci invia i token prima di chiamarci per lo scambio. Questo rende facile per il contratto verificare che non venga ingannato, un controllo che _deve_ avvenire nel contratto principale (perché possiamo essere chiamati da altre entità oltre al nostro contratto periferico).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // ambito per reserve{0,1}Adjusted, evita errori di stack troppo profondo
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Questo è un controllo di integrità per assicurarsi di non perdere dallo scambio. Non esiste alcuna circostanza in cui uno scambio dovrebbe ridurre `reserve0*reserve1`. Qui è anche dove ci assicuriamo che una commissione dello 0,3% venga inviata durante lo scambio; prima di controllare il valore di K, moltiplichiamo entrambi i saldi per 1000 e sottraiamo gli importi moltiplicati per 3. Ciò significa che lo 0,3% (3/1000 = 0,003 = 0,3%) viene detratto dal saldo prima di confrontare il suo valore K con il valore K delle riserve attuali.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Aggiorna `reserve0` e `reserve1` e, se necessario, gli accumulatori di prezzo e la marca temporale, ed emetti un evento.

##### Sincronizzazione o Prelievo

È possibile che i saldi reali si desincronizzino con le riserve che la piattaforma di scambio di coppia crede di avere.
Non c'è modo di prelevare i token senza il consenso del contratto, ma i depositi sono una questione diversa. Un conto può trasferire token alla piattaforma di scambio senza chiamare né `mint` né `swap`.

In tal caso ci sono due soluzioni:

- `sync`, aggiorna le riserve ai saldi correnti
- `skim`, preleva l'importo extra. Si noti che qualsiasi conto è autorizzato a chiamare `skim` perché non sappiamo chi ha depositato i token. Questa informazione viene emessa in un evento, ma gli eventi non sono accessibili dalla blockchain.

```solidity
    // forza la corrispondenza dei saldi con le riserve
    function skim(address to) external lock {
        address _token0 = token0; // risparmio di gas
        address _token1 = token1; // risparmio di gas
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // forza la corrispondenza delle riserve con i saldi
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Questo contratto](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) crea le piattaforme di scambio di coppia.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Queste variabili di stato sono necessarie per implementare la commissione di protocollo (vedere [il whitepaper](https://app.uniswap.org/whitepaper.pdf), p. 5).
L'indirizzo `feeTo` accumula i token di liquidità per la commissione di protocollo, e `feeToSetter` è l'indirizzo autorizzato a modificare `feeTo` in un indirizzo differente.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Queste variabili tengono traccia delle coppie, ovvero degli scambi tra due tipi di token.

La prima, `getPair`, è una mappatura che identifica un contratto di scambio di coppia basato sui due token ERC-20 che scambia. I token ERC-20 sono identificati dagli indirizzi dei contratti che li implementano, quindi le chiavi e il valore sono tutti indirizzi. Per ottenere l'indirizzo della piattaforma di scambio di coppia che consente di convertire da `tokenA` a `tokenB`, si usa `getPair[<indirizzo tokenA>][<indirizzo tokenB>]` (o viceversa).

La seconda variabile, `allPairs`, è un array che include tutti gli indirizzi delle piattaforme di scambio di coppia create da questa factory. In Ethereum non è possibile iterare sul contenuto di una mappatura o ottenere un elenco di tutte le chiavi, quindi questa variabile è l'unico modo per sapere quali piattaforme di scambio questa factory gestisce.

Nota: il motivo per cui non è possibile iterare su tutte le chiavi di una mappatura è che l'archiviazione dei dati del contratto è _costosa_, quindi meno se ne usa, meglio è, e meno spesso la si
modifica, meglio è. È possibile creare [mappature che supportano l'iterazione](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), ma richiedono un'archiviazione aggiuntiva per un elenco di chiavi. Nella maggior parte delle applicazioni, non ne hai bisogno.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Questo evento viene emesso quando viene creata una nuova piattaforma di scambio di coppia. Include gli indirizzi dei token, l'indirizzo della piattaforma di scambio di coppia e il numero totale di piattaforme di scambio gestite dalla factory.

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

Questa è la funzione principale della factory: creare una piattaforma di scambio di coppia tra due token ERC-20. Notare che chiunque può chiamare questa funzione. Non è necessaria l'autorizzazione di Uniswap per creare una nuova piattaforma di scambio di coppia.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Vogliamo che l'indirizzo della nuova piattaforma di scambio sia deterministico, in modo che possa essere calcolato in anticipo off-chain (questo può essere utile per le [transazioni di livello 2](/developers/docs/scaling/)).
Per fare ciò, dobbiamo avere un ordine coerente degli indirizzi dei token, indipendentemente dall'ordine in cui li abbiamo ricevuti, quindi li ordiniamo qui.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // un singolo controllo è sufficiente
```

I gruppi di liquidità grandi sono migliori di quelli piccoli, perché hanno prezzi più stabili. Non vogliamo avere più di un singolo gruppo di liquidità per coppia di token. Se esiste già una piattaforma di scambio, non è necessario crearne un'altra per la stessa coppia.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Per creare un nuovo contratto, abbiamo bisogno del codice che lo crea (sia la funzione del costruttore sia il codice che scrive in memoria il bytecode EVM del contratto effettivo). Normalmente in Solidity usiamo semplicemente `addr = new <nome del contratto>(<parametri del costruttore>)` e il compilatore si occupa di tutto per noi, ma per avere un indirizzo di contratto deterministico dobbiamo usare [l'opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Quando questo codice è stato scritto, tale opcode non era ancora supportato da Solidity, quindi era necessario ottenere manualmente il codice. Questo non è più un problema, perché [Solidity ora supporta CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Quando un opcode non è ancora supportato da Solidity, possiamo chiamarlo usando [assembly inline](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Chiama la funzione `initialize` per dire alla nuova piattaforma di scambio quali due token scambia.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // popola la mappatura nella direzione inversa
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
```

Salva le informazioni della nuova coppia nelle variabili di stato ed emetti un evento per informare il mondo della nuova piattaforma di scambio di coppia.

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

Queste due funzioni consentono a `feeSetter` di controllare il destinatario della commissione (se presente) e di modificare `feeSetter` in un nuovo indirizzo.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Questo contratto](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementa il token di liquidità ERC-20. È simile al [contratto ERC-20 di OpenZeppelin](/developers/tutorials/erc20-annotated-code), quindi spiegherò solo la parte differente, la funzionalità `permit`.

Le transazioni su Ethereum costano ether (ETH), che è l'equivalente di denaro reale. Se si possiedono token ERC-20 ma non ETH, non è possibile inviare transazioni, quindi non si può fare nulla con essi. Una soluzione per evitare questo problema sono le [meta-transazioni](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Il proprietario dei token firma una transazione che permette a qualcun altro di prelevare token off-chain e la invia al destinatario tramite Internet. Il destinatario, che possiede ETH, invia quindi il permesso per conto del proprietario.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Questo hash è l'[identificatore per il tipo di transazione](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). L'unico che supportiamo qui è `Permit` con questi parametri.

```solidity
    mapping(address => uint) public nonces;
```

Non è fattibile per un destinatario falsificare una firma digitale. Tuttavia, è banale inviare la stessa transazione due volte (questa è una forma di [attacco di replay](https://wikipedia.org/wiki/Replay_attack)). Per evitare questo, usiamo un [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Se il nonce di un nuovo `Permit` non è uno in più dell'ultimo usato, lo consideriamo non valido.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Questo è il codice per recuperare l'[identificatore della catena](https://chainid.network/). Usa un dialetto di assembly EVM chiamato [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Nota che nella versione corrente di Yul si deve usare `chainid()`, non `chainid`.

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

`abi.encodePacked(...)` è il messaggio che ci aspettiamo di ricevere. Sappiamo quale dovrebbe essere il nonce, quindi non è necessario ottenerlo come parametro.

L'algoritmo di firma di Ethereum si aspetta di ricevere 256 bit da firmare, quindi usiamo la funzione di hash `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Dal digest e dalla firma possiamo ottenere l'indirizzo che l'ha firmata usando [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Se tutto è a posto, trattalo come un'[approvazione ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## I Contratti Periferici {#periphery-contracts}

I contratti periferici sono l'API (application program interface) per Uniswap. Sono disponibili per chiamate esterne, da altri contratti o applicazioni decentralizzate. Si potrebbero chiamare i contratti principali direttamente, ma è più complicato e si potrebbe perdere valore in caso di errore. I contratti principali contengono solo test per assicurarsi che non vengano ingannati, non controlli di integrità per chiunque altro. Questi sono nella periferia in modo da poter essere aggiornati secondo necessità.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Questo contratto](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) ha problemi e [non dovrebbe più essere usato](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Fortunatamente, i contratti periferici sono stateless e non detengono alcun asset, quindi è facile deprecarli e suggerire alle persone di usare invece il sostituto, `UniswapV2Router02`.

### UniswapV2Router02.sol {#UniswapV2Router02}

Nella maggior parte dei casi si userebbe Uniswap attraverso [questo contratto](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Puoi vedere come usarlo [qui](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

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

La maggior parte di questi li abbiamo già incontrati o sono abbastanza ovvi. L'unica eccezione è `IWETH.sol`. Uniswap v2 consente scambi per qualsiasi coppia di token ERC-20, ma l'ether (ETH) stesso non è un token ERC-20. È precedente allo standard e viene trasferito con meccanismi unici. Per consentire l'uso di ETH nei contratti che si applicano ai token ERC-20, è stato ideato il contratto [wrapped ether (WETH)](https://weth.tkn.eth.limo/). Si invia a questo contratto ETH, e esso conia un importo equivalente di WETH. Oppure si può bruciare WETH e riottenere ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Il router deve sapere quale factory usare e, per le transazioni che richiedono WETH, quale contratto WETH usare. Questi valori sono [immutabili](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), il che significa che possono essere impostati solo nel costruttore. Questo dà agli utenti la sicurezza che nessuno potrà modificarli per farli puntare a contratti meno onesti.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Questo modificatore assicura che le transazioni a tempo limitato ("fai X prima del tempo Y se puoi") non avvengano dopo il loro limite di tempo.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Il costruttore si limita a impostare le variabili di stato immutabili.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // accetta ETH solo tramite fallback dal contratto WETH
    }
```

Questa funzione viene chiamata quando riscattiamo i token dal contratto WETH in ETH. Solo il contratto WETH che usiamo è autorizzato a farlo.

#### Aggiungere Liquidità {#add-liquidity}

Queste funzioni aggiungono token alla piattaforma di scambio di coppia, il che aumenta il gruppo di liquidità.

```solidity

    // **** AGGIUNGERE LIQUIDITÀ ****
    function _addLiquidity(
```

Questa funzione è usata per calcolare l'importo dei token A e B che dovrebbero essere depositati nella piattaforma di scambio di coppia.

```solidity
        address tokenA,
        address tokenB,
```

Questi sono gli indirizzi dei contratti dei token ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Questi sono gli importi che il fornitore di liquidità vuole depositare. Sono anche gli importi massimi di A e B da depositare.

```solidity
        uint amountAMin,
        uint amountBMin
```

Questi sono gli importi minimi accettabili da depositare. Se la transazione non può avvenire con questi importi o superiori, viene annullata. Se non si desidera questa funzione, basta specificare zero.

I fornitori di liquidità specificano un minimo, tipicamente, perché vogliono limitare la transazione a un tasso di cambio che sia vicino a quello corrente. Se il tasso di cambio fluttua troppo, potrebbe significare notizie che cambiano i valori sottostanti, e vogliono decidere manualmente cosa fare.

Ad esempio, si immagini un caso in cui il tasso di cambio è uno a uno e il fornitore di liquidità specifica questi valori:

| Parametro      | Valore |
| -------------- | -----: |
| amountADesired |   1000 |
| amountBDesired |   1000 |
| amountAMin     |    900 |
| amountBMin     |    800 |

Finché il tasso di cambio rimane tra 0,9 e 1,25, la transazione ha luogo. Se il tasso di cambio esce da quell'intervallo, la transazione viene annullata.

Il motivo di questa precauzione è che le transazioni non sono immediate; le si invia e alla fine un validatore le includerà in un blocco (a meno che il prezzo del gas non sia molto basso, nel qual caso sarà necessario inviare un'altra transazione con lo stesso nonce e un prezzo del gas più alto per sovrascriverla). Non si può controllare cosa succede nell'intervallo tra l'invio e l'inclusione.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

La funzione restituisce gli importi che il fornitore di liquidità dovrebbe depositare per avere un rapporto uguale al rapporto corrente tra le riserve.

```solidity
        // crea la coppia se non esiste ancora
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Se non esiste ancora una piattaforma di scambio per questa coppia di token, creala.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Ottenere le riserve correnti nella coppia.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Se le riserve correnti sono vuote, allora questa è una nuova piattaforma di scambio di coppia. Gli importi da depositare dovrebbero essere esattamente gli stessi di quelli che il fornitore di liquidità vuole fornire.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Se dobbiamo vedere quali saranno gli importi, otteniamo l'importo ottimale usando [questa funzione](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Vogliamo lo stesso rapporto delle riserve correnti.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Se `amountBOptimal` è più piccolo dell'importo che il fornitore di liquidità vuole depositare, significa che il token B ha attualmente più valore di quanto pensi il depositante di liquidità, quindi è richiesto un importo minore.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Se l'importo B ottimale è maggiore dell'importo B desiderato, significa che i token B hanno attualmente meno valore di quanto pensi il depositante di liquidità, quindi è richiesto un importo maggiore. Tuttavia, l'importo desiderato è un massimo, quindi non possiamo farlo. Calcoliamo invece il numero ottimale di token A per l'importo desiderato di token B.

Mettendo tutto insieme, otteniamo questo grafico. Si supponga di provare a depositare mille token A (linea blu) e mille token B (linea rossa). L'asse x è il tasso di cambio, A/B. Se x=1, hanno lo stesso valore e se ne depositano mille di ciascuno. Se x=2, A ha il doppio del valore di B (si ottengono due token B per ogni token A) quindi si depositano mille token B, ma solo 500 token A. Se x=0,5, la situazione è invertita: mille token A e cinquecento token B.

![Grafico](liquidityProviderDeposit.png)

Si potrebbe depositare liquidità direttamente nel contratto principale (usando [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), ma il contratto principale controlla solo di non essere ingannato esso stesso, quindi si corre il rischio di perdere valore se il tasso di cambio cambia tra il momento in cui si invia la transazione e il momento in cui viene eseguita. Se si usa il contratto periferico, esso calcola l'importo da depositare e lo deposita immediatamente, così il tasso di cambio non cambia e non si perde nulla.

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

. `to` è l'indirizzo che riceve i nuovi token di liquidità coniati per mostrare la porzione del gruppo del fornitore di liquidità
. `deadline` è un limite di tempo per la transazione

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Calcoliamo gli importi da depositare effettivamente e poi troviamo l'indirizzo del gruppo di liquidità. Per risparmiare gas, non lo facciamo chiedendo alla factory, ma usando la funzione di libreria `pairFor` (vedere più avanti nelle librerie)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Trasferisce gli importi corretti di token dall'utente alla piattaforma di scambio di coppia.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

In cambio, dà all'indirizzo `to` i token di liquidità per la proprietà parziale del gruppo. La funzione `mint` del contratto principale vede quanti token extra ha (rispetto a quanti ne aveva l'ultima volta che la liquidità è cambiata) e conia liquidità di conseguenza.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Quando un fornitore di liquidità vuole fornire liquidità a una piattaforma di scambio di coppia Token/ETH, ci sono alcune differenze. Il contratto gestisce il wrapping dell'ETH per il fornitore di liquidità. Non è necessario specificare quanti ETH l'utente vuole depositare, perché l'utente li invia semplicemente con la transazione (l'importo è disponibile in `msg.value`).

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

Per depositare l'ETH, il contratto lo wrappa prima in WETH e poi trasferisce il WETH nella coppia. Si noti che il trasferimento è wrappato in un `assert`. Questo significa che se il trasferimento fallisce, anche questa chiamata di contratto fallisce, e quindi il wrapping non avviene realmente.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // rimborsa gli eth in eccesso, se presenti
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

L'utente ci ha già inviato l'ETH, quindi se c'è un eccesso (perché l'altro token ha meno valore di quanto l'utente pensasse), dobbiamo emettere un rimborso.

#### Rimuovere Liquidità {#remove-liquidity}

Queste funzioni rimuoveranno la liquidità e rimborseranno il fornitore di liquidità.

```solidity
    // **** RIMUOVERE LIQUIDITÀ ****
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

Il caso più semplice di rimozione della liquidità. C'è un importo minimo di ogni token che il fornitore di liquidità accetta di ricevere, e deve avvenire prima della scadenza.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // invia liquidità alla coppia
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

La funzione `burn` del contratto principale gestisce il rimborso dei token all'utente.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Quando una funzione restituisce valori multipli, ma siamo interessati solo ad alcuni di essi, questo è il modo per ottenere solo quei valori. È leggermente più economico in termini di gas rispetto alla lettura di un valore e al suo non utilizzo.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Traduce gli importi dal modo in cui il contratto principale li restituisce (prima il token con l'indirizzo più basso) al modo in cui l'utente se li aspetta (corrispondenti a `tokenA` e `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

È corretto eseguire prima il trasferimento e poi verificare che sia legittimo, perché se non lo è, annulleremo tutte le modifiche di stato.

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

Rimuovere liquidità per ETH è quasi la stessa cosa, tranne per il fatto che riceviamo i token WETH e poi li riscattiamo in ETH per restituirli al fornitore di liquidità.

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

Queste funzioni inoltrano le meta-transazioni per consentire agli utenti senza ether di prelevare dal gruppo, usando [il meccanismo di permesso](#UniswapV2ERC20).

```solidity

    // **** RIMUOVERE LIQUIDITÀ (supportando i token con commissione sul trasferimento) ****
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

Questa funzione può essere utilizzata per i token che hanno commissioni di trasferimento o di archiviazione. Quando un token ha tali commissioni, non possiamo fare affidamento sulla funzione `removeLiquidity` per sapere quanto del token riceviamo indietro, quindi dobbiamo prima prelevare e poi ottenere il saldo.

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
    // **** SCAMBIO ****
    // richiede che l'importo iniziale sia già stato inviato alla prima coppia
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Questa funzione esegue l'elaborazione interna necessaria per le funzioni esposte ai trader.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Mentre scrivo, ci sono [388.160 token ERC-20](https://eth.blockscout.com/tokens). Se ci fosse uno scambio di coppia per ogni coppia di token, ci sarebbero oltre 150 miliardi di scambi di coppia. L'intera catena, al momento, [ha solo lo 0,1% di quel numero di account](https://eth.blockscout.com/stats/accountsGrowth). Invece, le funzioni di scambio supportano il concetto di percorso. Un trader può scambiare A per B, B per C e C per D, quindi non serve uno scambio di coppia A-D diretto.

I prezzi su questi mercati tendono a essere sincronizzati, perché quando non sono sincronizzati, si crea un'opportunità d'arbitraggio. Immagina, ad esempio, tre token, A, B e C. Esistono tre scambi di coppia, uno per ogni coppia.

1. La situazione iniziale
2. Un trader vende 24,695 token A e riceve 25,305 token B.
3. Il trader vende 24,695 token B per 25,305 token C, mantenendo circa 0,61 token B come profitto.
4. Poi il trader vende 24,695 token C per 25,305 token A, mantenendo circa 0,61 token C come profitto. Il trader ha anche 0,61 token A in più (i 25,305 con cui il trader termina, meno l'investimento originale di 24,695).

| Passaggio | Scambio A-B                                                 | Scambio B-C                                                 | Scambio A-C                                                 |
| --------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| 1         | A:1000 B:1050 A/B=1,05      | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 2         | A:1024,695 B:1024,695 A/B=1 | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 3         | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1050 C:1000 C/A=1,05      |
| 4         | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1024,695 C:1024,695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Ottieni la coppia che stiamo gestendo, ordinala (per usarla con la coppia) e ottieni l'importo di output previsto.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Ottieni gli importi in uscita previsti, ordinati nel modo in cui lo scambio di coppia si aspetta che siano.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Questo è l'ultimo scambio? Se sì, invia i token ricevuti per lo scambio alla destinazione. Altrimenti, invialo al prossimo scambio di coppia.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Chiama effettivamente lo scambio di coppia per scambiare i token. Non abbiamo bisogno di un callback che ci informi dello scambio, quindi non inviamo alcun byte in quel campo.

```solidity
    function swapExactTokensForTokens(
```

Questa funzione è usata direttamente dai trader per scambiare un token con un altro.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Questo parametro contiene gli indirizzi dei contratti ERC-20. Come spiegato sopra, questo è un array perché potresti dover passare attraverso diversi scambi di coppia per passare dall'asset che hai a quello che desideri.

Un parametro di una funzione in Solidity può essere memorizzato in `memory` o `calldata`. Se la funzione è un punto di ingresso del contratto, chiamata direttamente da un utente (tramite una transazione) o da un contratto diverso, il valore del parametro può essere preso direttamente dai dati della chiamata. Se la funzione è chiamata internamente, come `_swap` sopra, allora i parametri devono essere memorizzati in `memory`. Dal punto di vista del contratto chiamato, `calldata` è di sola lettura.

Con i tipi scalari come `uint` o `address` il compilatore gestisce per noi la scelta della memorizzazione, ma con gli array, che sono più lunghi e costosi, specifichiamo il tipo di memorizzazione da utilizzare.

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

Calcola l'importo da acquistare in ogni scambio. Se il risultato è inferiore al minimo che il trader è disposto ad accettare, annulla la transazione.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Infine, trasferisci il token ERC-20 iniziale all'account del primo scambio di coppia e chiama `_swap`. Tutto questo avviene nella stessa transazione, quindi lo scambio di coppia sa che eventuali token inattesi fanno parte di questo trasferimento.

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

La funzione precedente, `swapTokensForTokens`, consente a un trader di specificare un numero esatto di token di input che è disposto a dare e il numero minimo di token di output che è disposto a ricevere in cambio. Questa funzione esegue lo scambio inverso: permette a un trader di specificare il numero di token di output che vuole e il numero massimo di token di input che è disposto a pagare per essi.

In entrambi i casi, il trader deve prima concedere a questo contratto di periferia un'autorizzazione (allowance) per consentirgli di trasferirli.

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
        // rimborsa gli ETH residui, se presenti
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Queste quattro varianti comportano tutte lo scambio tra ETH e token. L'unica differenza è che riceviamo ETH dal trader e li usiamo per coniare WETH, o riceviamo WETH dall'ultimo scambio nel percorso e li bruciamo, reinviando al trader gli ETH risultanti.

```solidity
    // **** SCAMBIO (supporto per i token con commissione sul trasferimento) ****
    // richiede che l'importo iniziale sia già stato inviato alla prima coppia
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Questa è la funzione interna per scambiare i token che hanno commissioni di trasferimento o di archiviazione per risolvere ([questo problema](https://github.com/Uniswap/uniswap-interface/issues/835)).

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

A causa delle commissioni di trasferimento non possiamo fare affidamento sulla funzione `getAmountsOut` per sapere quanto otteniamo da ogni trasferimento (come facciamo prima di chiamare l'originale `_swap`). Dobbiamo invece prima trasferire e poi vedere quanti token riceviamo indietro.

Nota: In teoria, potremmo semplicemente usare questa funzione invece di `_swap`, ma in certi casi (ad esempio, se il trasferimento viene annullato perché l'importo finale non è sufficiente a soddisfare il minimo richiesto) finirebbe per costare più gas. I token con commissione di trasferimento sono piuttosto rari, quindi, sebbene sia necessario gestirli, non è necessario che tutti gli scambi presuppongano di passare attraverso almeno uno di essi.

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

Queste sono le stesse varianti usate per i token normali, ma chiamano invece `_swapSupportingFeeOnTransferTokens`.

```solidity
    // **** FUNZIONI DELLA LIBRERIA ****
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

Queste funzioni sono solo dei proxy che chiamano le [funzioni di UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Questo contratto è stato usato per migrare gli scambi dalla vecchia v1 alla v2. Ora che sono stati migrati, non è più rilevante.

## Le librerie {#libraries}

La [libreria SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) è ben documentata, quindi non è necessario documentarla qui.

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

Ottieni una stima più vicina, la media della stima precedente e il numero di cui stiamo cercando di trovare la radice quadrata diviso per la stima precedente. Ripeti finché la nuova stima non è inferiore a quella esistente. Per maggiori dettagli, [vedi qui](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Non dovremmo mai aver bisogno della radice quadrata di zero. Le radici quadrate di uno, due e tre sono circa uno (usiamo numeri interi, quindi ignoriamo la frazione).

```solidity
        }
    }
}
```

### Frazioni a punto fisso (UQ112x112) {#FixedPoint}

Questa libreria gestisce le frazioni, che normalmente non fanno parte dell'aritmetica di Ethereum. Lo fa codificando il numero _x_ come _x\*2^112_. Questo ci permette di usare i codici operativi (opcode) di addizione e sottrazione originali senza alcuna modifica.

```solidity
pragma solidity =0.5.16;

// una libreria per la gestione di numeri binari a virgola fissa (https://wikipedia.org/wiki/Q_(number_format))

// intervallo: [0, 2**112 - 1]
// risoluzione: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` è la codifica per uno.

```solidity
    // codifica un uint112 come UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // non va mai in overflow
    }
```

Poiché y è `uint112`, il suo valore massimo può essere 2^112-1. Quel numero può ancora essere codificato come `UQ112x112`.

```solidity
    // divide un UQ112x112 per un uint112, restituendo un UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Se dividiamo due valori `UQ112x112`, il risultato non è più moltiplicato per 2^112. Quindi, invece, usiamo un intero per il denominatore. Avremmo dovuto usare un trucco simile per fare la moltiplicazione, ma non abbiamo bisogno di fare la moltiplicazione di valori `UQ112x112`.

### UniswapV2Library {#uniswapV2library}

Questa libreria è utilizzata solo dai contratti di periferia

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // restituisce gli indirizzi dei token ordinati, usati per gestire i valori di ritorno dalle coppie ordinate in questo modo
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Ordina i due token per indirizzo, in modo da poter ottenere l'indirizzo dello scambio di coppia per essi. Questo è necessario perché altrimenti avremmo due possibilità, una per i parametri A,B e un'altra per i parametri B,A, portando a due scambi invece di uno.

```solidity
    // calcola l'indirizzo CREATE2 per una coppia senza effettuare chiamate esterne
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

Questa funzione calcola l'indirizzo dello scambio di coppia per i due token. Questo contratto è creato usando [il codice operativo (opcode) CREATE2](https://eips.ethereum.org/EIPS/eip-1014), quindi possiamo calcolare l'indirizzo usando lo stesso algoritmo se conosciamo i parametri che usa. Questo è molto più economico che chiederlo alla factory, e

```solidity
    // recupera e ordina le riserve per una coppia
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Questa funzione restituisce le riserve dei due token che lo scambio di coppia ha. Nota che può ricevere i token in qualsiasi ordine e ordinarli per l'uso interno.

```solidity
    // dato un certo importo di un asset e le riserve della coppia, restituisce un importo equivalente dell'altro asset
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Questa funzione ti da l'importo di token B che riceverai in cambio del token A se non vengono applicate commissioni. Questo calcolo tiene conto che il trasferimento modifica il tasso di cambio.

```solidity
    // dato un importo in entrata di una risorsa e riserve della coppia, restituisce l'importo risultante massimo dell'altra risorsa
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

La funzione `quote` di cui sopra funziona molto bene se non c'è alcuna commissione per utilizzare lo scambio di coppia. Tuttavia, se esiste una commissione di cambio dello 0,3%, l'importo che ottieni è in realtà inferiore. Questa funzione calcola l'importo al netto della commissione di scambio.

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
    // dato un importo in uscita di una risorsa e le riserve di coppia, restituisce l'importo in entrata richiesto dell'altra risorsa
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

    // esegue calcoli concatenati di getAmountOut su un numero qualsiasi di coppie
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // esegue calcoli concatenati di getAmountIn su un numero qualsiasi di coppie
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

Queste due funzioni gestiscono l'identificazione dei valori quando è necessario passare per diversi scambi di coppia.

### Helper di trasferimento {#transfer-helper}

[Questa libreria](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) aggiunge controlli di successo ai trasferimenti ERC-20 e Ethereum per trattare un revert e un valore di ritorno `false` allo stesso modo.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// metodi di supporto per interagire con i token ERC20 e inviare ETH che non restituiscono in modo coerente true/false
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
- Usare l'[interfaccia binaria dell'applicazione (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) "manualmente" per creare la chiamata. Questo è ciò che l'autore del codice ha deciso di fare.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Per motivi di retrocompatibilità con i token creati prima dello standard ERC-20, una chiamata ERC-20 può fallire o annullandosi (nel qual caso `success` è `false`) o concludendosi con successo e restituendo un valore `false` (nel qual caso vi sono dati di output e, se decodificati come booleani, restituiscono `false`).

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

Questa funzione implementa la [funzionalità di trasferimento di ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), che consente a un account di spendere l'autorizzazione fornita da un altro account.

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

Questa funzione implementa la [funzionalità transferFrom di ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), che consente a un account di spendere l'autorizzazione fornita da un altro account.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Questa funzione trasferisce ether a un account. Qualsiasi chiamata a un contratto diverso può tentare di inviare ether. Poiché non dobbiamo realmente chiamare alcuna funzione, non inviamo alcun dato con la chiamata.

## Conclusione {#conclusion}

Questo è un articolo lungo di circa 50 pagine. Se sei arrivato fin qui, congratulazioni! Speriamo di aver esposto chiaramente alcuni aspetti relativi alla scrittura di un'applicazione reale (e non brevi programmi campione) e che ora tu sia in grado di scrivere contratti per le tue esigenze.

Ora vai a scrivere qualcosa di utile e facci sognare.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).
