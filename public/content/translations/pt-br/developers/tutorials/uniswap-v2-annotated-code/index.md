---
title: "Demostração de contratos Uniswap-v2"
description: Como funciona o contrato Uniswap-v2? Por que ele é escrito assim?
author: Ori Pomerantz
tags:
  - "solidity"
skill: intermediate
published: 2021-05-01
lang: pt-br
---

## Introdução {#introduction}

[Uniswap v2](https://uniswap.org/whitepaper.pdf) pode criar um mercado de câmbio entre quaisquer dos dois tokens ERC-20. Neste artigo, analisaremos o código-fonte dos contratos que implementam este protocolo e entederemos porque eles foram escritos dessa forma.

### O que a Uniswap faz? {#what-does-uniswap-do}

Basicamente, existem dois tipos de usuários: fornecedores de liquidez e traders.

Os _provedores de liquidez_ fornecem um pool com o par de tokens que podem ser trocados (vamos chamá-los de **Token0** e **Token1**). Em troca, eles recebem um terceiro token que representa a propriedade parcial do pool, chamado de _token de liquidez_.

_Os traders_ enviam um dos tipos de token para o pool e recebem outro em troca (por exemplo, enviam o **Token0** e recebem o **Token1**) do pool criado pelos provedores de liquidez. A taxa de câmbio é determinada pelo número relativo de **Token0** e **Token1** que o pool possui. Além disso, o pool recolhe uma pequena porcentagem como recompença por prover liquidez.

Quando provedores de liquidez querem seus ativos de volta, eles podem queimar os tokens do pool e receber seus tokens originais, incluindo sua parcela das recompensas.

[Clique aqui para acessar a explicação completa](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Por que v2? Por que não v3? {#why-v2}

[Uniswap v3](https://uniswap.org/whitepaper-v3.pdf) é uma atualização muito mais complicada do que a v2. Portanto, é mais fácil aprender primeiro a v2 e depois ir para a v3.

### Contratos Principais vs Contratos Periféricos {#contract-types}

O Uniswap v2 é dividido em dois componentes, um principal e um periférico. Essa divisão permite os contratos principais, que mantêm os ativos e, portanto _precisam_ ser seguros, para serem simples e fáceis de auditar. Toda a funcionalidade extra exigida pelos traders é assegurada pelos contratos periféricos.

## Dados e Fluxos de Controle {#flows}

Este é o fluxo de dados e controle que ocorre quando você executa as três principais ações da Uniswap:

1. Troca entre diferentes tokens
2. Adicionar liquidez ao mercado e obter recompensas trocando seus tokens pelo token de liquidez ERC-20
3. Queimar tokens de liquidez ERC-20 e receber de volta os tokens ERC-20 que o par de troca permite aos traders trocar

### Câmbio {#swap-flow}

Este é o fluxo mais comum usado pelos traders:

#### Usuário {#caller}

1. Fornecer à conta periférica uma provisão correspondente ao valor a ser trocado.
2. Chamar uma das várias funções de troca contidas nos contratos periféricos (cada uma depende se há ETH envolvido ou não, se o trader especifica a quantidade de tokens depositados ou a quantidade de tokens a receber, etc.). Toda função de troca aceita uma `rota`, uma matriz de câmbios que devem ser executadas para chegar ao token final.

#### No contrato periférico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identifica os valores que precisam ser negociados em cada câmbio ao longo da rota.
4. Itera sobre a rota. Para cada câmbio ao longo da rota, o contrato envia o token de entrada e chama a função `swap`. Na maioria dos casos, o endereço de destino dos tokens é o próximo par de troca na rota. Ao final do câmbio, é o endereço fornecido pelo trader.

#### No contrato principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Verifique se o contrato principal não está sendo trapaceado e pode manter liquidez suficiente após a troca.
6. Veja quantos tokens extras existem além das reservas conhecidas. Essa quantidade é o número de tokens de entrada que recebemos para câmbio.
7. Enviar os tokens de saída para o destino.
8. Chamar a função `_update` para atualizar os valores da reserva

#### De volta ao contrato periférico (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Executar qualquer limpeza necessária (por exemplo, queimar tokens WETH para recuperar o ETH e enviar ao negociante)

### Adicionar liquidez {#add-liquidity-flow}

#### Usuário {#caller-2}

1. Permita que a conta periférica acesse a quantidade de tokens que serão adicionados ao pool de liquidez.
2. Chamar em um dos contratos periféricos a função `addLiquidity`.

#### No contrato satélite (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Criar um par de troca, caso necessário
4. Caso exista um par de troca, calcule a quantidade de tokens que será adicionada. Supõe-se que esse valor seja idêntico para ambos os tokens, ou seja, a mesma proporção de novos tokens em relação aos tokens existentes.
5. Verifique se os valores são aceitáveis (os provedores de liquidez podem especificar um valor mínimo, abaixo disso é melhor eles não adicionarem liquidez)
6. Chame o contrato principal.

#### No contrato satélite (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Minerar tokens de liquidez e enviar para o usuário
8. Chame a função `_update` para atualizar os valores da reserva

### Remover liquidez {#remove-liquidity-flow}

#### Usuário {#caller-3}

1. Permita que a conta periférica queime o par de tokens de liquidez em troca dos tokens inicialmente fornecidos.
2. Chame em um dos contratos periféricos a função `removeLiquidity`.

#### No contrato satélite (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Enviar os tokens de liquidez para o par de troca

#### No contrato principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Enviar ao endereço de destino os tokens inicialmente fornecidos em proporção aos tokens queimados. Por exemplo, se existem 1.000 tokens A no pool, 500 tokens B e 90 tokens de liquidez, e nós recebemos 9 tokens para queimar, então, vamos queimar 10% dos tokens de liquidez e enviaremos de volta para o usuário 100 tokens A e 50 tokens B.
5. Queima os tokens de liquidez
6. Chamar a função `_update` para atualizar os valores da reserva

## Os contratos principais {#core-contracts}

Esses são os contratos seguros que detêm a liquidez.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Esse contrato](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementa o pool real que troca os tokens. É a funcionalidade principal do Uniswap.

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

Estas são todas as interfaces que o contrato precisa conhecer, ou porque o contrato os implementa (`IUniswapV2Pair` e `UniswapV2ERC20`) ou porque eles chamam contratos que os implementam.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Este contrato herda do `UniswapV2ERC20`, que fornece as funções do ERC-20 para os tokens de liquidez.

```solidity
    using SafeMath  for uint;
```

A [biblioteca SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) é usada para evitar excesso de fluxo e fluxo insuficiente. Isso é importante porque, caso contrário, podemos acabar em uma situação em que um valor deve ser `-1`, mas em vez disso é `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Muitos dos cálculos do contrato do pool requerem frações. Contudo, as frações não são suportadas pelo EVM. A solução encontrada pelo Uniswap é usar valores de 224 bits, com 112 bits para a parte inteira, e 112 bits para a fração. Então `1.0` é representado como `2^112`, `1.5` é representado como `2^112 + 2^111`, etc.

Mais detalhes sobre essa biblioteca estão disponíveis [ no final do documento](#FixedPoint).

#### Variáveis {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Para evitar casos de divisão por zero, existe um número minímo de tokens de liquidez que sempre existirão (mas são de propriedade da conta zero). Esse número é **MINIMUM_LIQUIDITY**, mil.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Esse é o seletor ABI para a função de transferência ERC-20. É usado para transferir tokens ERC-20 nas duas contas de token.

```solidity
    address public factory;
```

Este é o contrato fábrica que criou este pool. Todo pool é um câmbio entre dois tokens ERC-20, a fábrica é o ponto central que conecta todos esses pools.

```solidity
    address public token0;
    address public token1;
```

Existem os endereços dos contratos para os dois tipos de tokens ERC-20 que podem ser trocados por esse pool.

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
```

A reserva que o pool tem para cada tipo de token. Assumimos que os dois representam a mesma quantidade em valor e, portanto, cada token0 vale o token1 de reserve1/reserve0.

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves
```

O carimbo de data/hora para o último bloco em que ocorreu uma troca, usada para acompanhar as taxas de câmbio ao longo do tempo.

Um dos maiores gastos de gás nos contratos Ethereum é o armazenamento, que persiste de um chamado do contrato para o próximo. Cada célula de armazenamento tem 256 bits de comprimento. Então três variáveis, `reserve0`, `reserve1` e `blockTimestampLast`, são alocados de forma que uma única célula de armazenamento inclua todas as três juntas (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Essas variáveis possuem os custos cumulativos para cada token (um em relação aos outros). Elas podem ser usadas para calcular a taxa de câmbio médio ao longo de um período de tempo.

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event
```

A forma como o par de troca decide sobre a taxa de câmbio entre o token0 e o token1 é mantendo o múltiplo das reservas constantes durante as negociações. `kLast` é esse valor. Ela muda quando um provedor de liquidez deposita ou retira tokens, e aumenta ligeiramente devido à taxa de mercado de 0,3%.

Veja um exemplo. Note que para manter a simplicidade a tabela mostra apenas três dígitos após a vírgula decimal e ignoramos a taxa de negociação de 0,3%, portanto os números não são precisos.

| Evento                                      |  reserve0 |  reserve1 | reserve0 \* reserve1 | Taxa de câmbio média (token1 / token0) |
| ------------------------------------------- | ---------:| ---------:| ----------------------:| -------------------------------------- |
| Configuração Inicial                        | 1.000,000 | 1.000,000 |              1.000.000 |                                        |
| Trader A troca 50 token0 por 47,619 token1  | 1.050,000 |   952,381 |              1.000.000 | 0,952                                  |
| Trader B troca 10 token0 por 8,984 token1   | 1.060,000 |   943,396 |              1.000.000 | 0,898                                  |
| Trader C troca 40 token0 por 34,305 token1  | 1.100,000 |   909,090 |              1.000.000 | 0,858                                  |
| Trader D troca 100 token1 por 109,01 token0 |   990,990 | 1.009,090 |              1.000.000 | 0,917                                  |
| Trader E troca 10 token0 por 10,079 token1  | 1.000,990 |   999,010 |              1.000.000 | 1,008                                  |

À medida que os traders fornecem mais token0, o valor relativo do token1 aumenta, e vice-versa, baseado na oferta e na demanda.

#### Bloqueio {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Há uma classe de vulnerabilidades de segurança baseadas no [abuso de reentrância](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). O Uniswap precisa transferir tokens ERC-20 arbitrários, o que significa chamar o contrato ERC-20, que pode tentar abusar do mercado do Uniswap que os chama. Tendo uma variável `unlocked` como parte do contrato, podemos impedir que funções sejam chamadas enquanto elas estão sendo executadas (dentro de uma mesma transação).

```solidity
    modifier lock() {
```

Essa função é um [modificador](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), uma função que envolve uma função normal e muda seu comportamento de alguma forma.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Se `unlocked` é igual a um, defina-a como zero. Se ela já for zero, reverta a chamada e faça-a falhar.

```solidity
        _;
```

Em um modificador, `_;` é a chamada original da função (com todos os parâmetros). Aqui, isso significa que a execução da função só acontece se `unlocked` era um quando a função foi chamada, e enquanto ela estiver sendo executada, o valor de `unlocked` é zero.

```solidity
        unlocked = 1;
    }
```

Após o retorno da função principal, libere o bloqueio.

#### Outras funções {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Esta função fornece aos chamadores o estado atual do câmbio. Observe que as funções do Solidity [podem retornar multiplos valores](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Essa função interna transfere uma quantidade de tokens ERC20 do câmbio para outra pessoa. `SELECTOR` especifica que a função que estamos chamando é `transfer(address,uint)` (veja a definição acima).

Para evitar ter que importar uma interface para a função do token, nós "manualmente" criamos o chamado usando uma das [funções ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Uma chamada de transferência ERC-20 pode reportar uma falha de duas maneiras:

1. Reverter. Se a execução em um contrato externo for revertida, o valor de retorno booleano será `false`
2. Finaliza normalmente, mas reporta uma falha. Nesse caso, o buffer de valor de retorno tem um comprimento diferente de zero e quando decodificado como um valor booleano, ele é `false`

Se alguma dessas condições ocorrer, reverta a execução.

#### Eventos {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Esses dois eventos são emitidos quando um provedor de liquidez deposita liquidez (`Mint`) ou a retira (`Burn`). Em ambos casos, a quantidade de token0 e token1 que são depositados ou sacados são parte do evento, bem como a identidade da conta que os chamou (`sender`). No caso de um saque, o evento também inclui o endereço que recebe os tokens (`to`), que pode não ser o mesmo do remetente.

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

Esse evento é emitido quando o negociante troca um token pelo outro. Mais uma vez, o remetente e o destinatário podem ser diferentes. Cada token pode ser enviado para o câmbio ou é recebido dele.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Por fim, `Sync` é emitido toda vez que os tokens são adicionados ou sacados, independentemente do motivo, para fornecer as informações mais recentes das reservas dos tokens (e, portanto, a taxa de câmbio).

#### Funções de Configuração {#pair-setup}

Essa função deve ser executada uma única vez, quando um novo par de troca é criado.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

O construtor certifica-se de que manteremos a rastreabilidade do endereço do contrato da fábrica que criou o par. Essa informação é necessária para a função `initialize` e para a taxa de fábrica (se existir uma)

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

Essa função permite que a fábrica (e apenas a fábrica) especifique os dois tokens ERC-20 que esse par irá trocar.

#### Funções de atualização interna {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Essa função é chamada toda vez que os tokens são depositados ou sacados.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Se balance0 ou balance1 (uint256) for maior que uint112(-1) (=2^112-1) (então, ele excede o fluxo e retornará para 0 quando for convertido em uint112), recuse a continuar a \_update para evitar excesso de fluxo. Com um token normal que pode ser subdividido em 10^18 unidades, isso significa que cada câmbio está limitado a cerca de 5,1\*10^15 de cada token. Até o momento, isso não tem sido um problema.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Se o tempo decorrido não for zero, isso significa que somos a primeira transação de câmbio nesse bloco. Nesse caso, precisamos atualizar os acumuladores de custo.

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Cada acumulador de custo é atualizado com o último custo (reserva do outro token/reserva desse token) vezes o tempo decorrido em segundos. Para obter um preço médio, tome o preço acumulado em dois pontos no tempo e divida-o pela diferença de tempo entre eles. Por exemplo, suponha esta sequência de eventos:

| Evento                                                |  reserva0 |  reserva1 | carimbo de data/hora | Taxa de câmbio marginal (reserve1 / reserve0) |         price0CumulativeLast |
| ----------------------------------------------------- | ---------:| ---------:| -------------------- | ---------------------------------------------:| ----------------------------:|
| Configuração Inicial                                  | 1.000,000 | 1.000,000 | 5.000                |                                         1.000 |                            0 |
| Trader A deposita 50 token0 e recebe 47,619 token1    | 1.050,000 |   952,381 | 5.020                |                                         0,907 |                           20 |
| Trader B deposita 10 token0 e recebe 8,984 token1     | 1.060,000 |   943,396 | 5.030                |                                         0,890 |       20+10\*0,907 = 29,07 |
| Trader C deposita 40 token0 e recebe 34,305 token1    | 1.100,000 |   909,090 | 5.100                |                                         0,826 |    29,07+70\*0,890 = 91,37 |
| Trader D deposita 100 token1 e recupera 109,01 token0 |   990,990 | 1.009,090 | 5.110                |                                         1.018 |    91,37+10\*0,826 = 99,63 |
| Trader E deposita 10 token0 e recupera 10,079 token1  | 1.000,990 |   999,010 | 5.150                |                                         0,998 | 99,63+40\*1,1018 = 143,702 |

Digamos que queremos calcular o preço médio de **Token0** entre os carimbos de data/hora 5,030 e 5,150. A diferença no valor de `price0Cumulative` é de 143,702-29,07=114,632. Essa é a média em dois minutos (120 segundos). Portanto, o preço médio é 114,632/120 = 0,955.

Esse cálculo de preço é a razão pela qual precisamos conhecer os tamanhos de reserva antigos.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Por fim, atualize as variáveis globais e emita um evento `Sync`.

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

No Uniswap 2.0, os traders pagam uma taxa de 0,30% para usar o mercado. A maior parte da taxa (0,25% da operação) sempre vai para os provedores de liquidez. O restante 0,05% pode ir tanto para o provedor de liquidez quanto para o endereço especificado pela fábrica como a taxa de protocolo, que paga a Uniswap pelo seu esfoço de desenvolvimento.

Para redução de cálculos (e, portanto, custos de gás), essa taxa é calculada apenas quando liquidez é adicionada ou removida do pool, em vez de ser calculada a cada transação.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Leia o destino de taxa da fábrica. Se for zero, não haverá nehuma taxa de protocolo e, portanto, não há necessidade de calculá-la.

```solidity
        uint _kLast = kLast; // gas savings
```

A variável `kLast` do estado está localizada no armazenamento, portanto, ela terá um valor entre chamadas diferentes para o contrato. Acessar o armazenamento é muito mais caro do que acessar a memória volátil, que é liberada quando a chamada de função para o contrato termina. Por isso, usamos uma variável interna para economizar gás.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Os provedores de liquidez recebem sua parte simplesmente pela valorização de seus tokens de liquidez. No entanto, a taxa do protoclo requer que novos tokens de liquidez sejam cunhados e fornecidos ao endereço `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Se houver uma nova liquidez para coletar a taxa de protocolo. Você pode ver a função raiz quadrada [mais tarde neste artigo](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Este cálculo complicado das taxas é explicado no [whitepaper](https://uniswap.org/whitepaper.pdf) na página 5. Sabemos que entre o tempo `kLast` calculado e o presente, não foi adicionada ou removida liquidez (porque executamos esse cálculo toda vez que a liquidez é adicionada ou removida, antes que ele realmente mude), por isso, qualquer mudança em `reserve0 * reserve1` tem que vir de taxas de transação (sem elas, manteríamos `reserve0 * reserve1` constante).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Use a função `UniswapV2ERC20._mint` para criar os tokens de liquidez adicionais e atribuí-los a `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Se não houver nenhuma taxa, defina `kLast` como zero (caso ainda não esteja definido). Quando esse contrato foi escrito, havia um recurso de [reembolso de gás](https://eips.ethereum.org/EIPS/eip-3298) que incentivava os contratos a reduzir o tamanho geral do estado Ethereum, zerando o armazenamento que não era necessário. Esse código recebe o reembolso quando possível.

#### Funções acessíveis externamente {#pair-external}

Observe que, embora qualquer transação ou contrato _possa_ chamar essas funções, elas foram concebidas para serem chamadas a partir do contrato periférico. Se você as chamar diretamente, não conseguirá trapacear com o par de troca, mas poderá perder o valor por meio de um erro.

##### cunhar

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
```

Essa função é chamada quando um provedor de liquidez adiciona liquidez ao pool. Ele cunha tokens de liquidez adicionais como recompensa. Ela deverá ser chamada de [contrato periférico](#UniswapV2Router02), que a chama após adicionar a liquidez na mesma transação (por isso, ninguém poderia enviar uma transação que revindica a nova liquidez antes do dono legítimo).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
```

Essa é a maneira de ler os resultados de uma função Solidity que retorna múltiplos valores. Descartamos os últimos valores retornados, o carimbo de data-hoira do bloco, por que não precisamos deles.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Obtenha os saldos atuais e veja o quanto foi adicionado de cada tipo de token.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Calcule as taxas de protocolo a serem coletadas, se houver, e crie os respectivos tokens de liquidez. Como os parâmetros para `_mintFee` são os valores de reserva antigos, a taxa é calculada com precisão com base unicamente nas alterações do pool decorrentes das taxas.

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
```

Se este for o primeiro depósito, crie tokens `MINIMUM_LIQUIDITY` e envie-os para o endereço zero para bloqueá-los. Eles nunca podem ser resgatados, o que significa que o pool nunca ficará completamente vazio (o que nos salva da divisão por zero em alguns casos). O valor de `MINIMUM_LIQUIDITY` é mil, considerando que a maioria dos ERC-20 são subdivididos em unidades de 10^-18'th de um token, visto que o ETH é dividido em wei e equivale a 10^-15 do valor de um único token. Não é um custo alto.

No momento do primeiro depósito, não sabemos o valor relativo dos dois tokens, por isso, multiplicamos as quantidades e aplicamos a raiz quadrada, supondo que o depósito nos fornece o mesmo valor em ambos os tokens.

Podemos confiar nisso, pois é do interesse do depositante oferecer o mesmo valor para evitar perda de valor por arbitragem. Digamos que o valor dos dois tokens é idêntico, mas nosso depositante depositou quatro vezes mais o **Token1** do que o **Token0**. Um trader pode usar o fato de que o par de troca pensa que o **Token0** é mais valioso para extrair valor dessa situação.

| Evento                                                         | reserva0 | reserva1 | reserva0 \* reserva1 | Valor do pool (reserve0 + reserve1) |
| -------------------------------------------------------------- | --------:| --------:| ----------------------:| -----------------------------------:|
| Configuração Inicial                                           |        8 |       32 |                    256 |                                  40 |
| O trader deposita 8 tokens **Token0** e recupera 16 **Token1** |       16 |       16 |                    256 |                                  32 |

Como você pode ver, o trader ganhou 8 tokens extra, que vêm de uma redução do valor do pool, prejudicando o depositante que a possui.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Em todos os depósitos subsequentes, já conhecemos a taxa de câmbio entre os dois ativos e esperamos que os provedores de liquidez forneçam um valor igual em ambos. Caso contrário, daremos a eles tokens de liquidez com base no menor valor que eles forneceram como punição.

Seja um depósito inicial, seja um depósito subsequente, o número de tokens de liquidez que fornecemos é igual à raiz quadradada da alteração em `reserve0*reserve1` e o valor do token de liquidez não muda (a menos que obtenhamos um depósito com valores diferentes nos dois tipos, então, neste caso, a "multa" é distribuída). Aqui está outro exemplo com dois tokens que têm o mesmo valor, com três depósitos bons e um ruim (depósito de apenas um tipo de token, portanto, ele não produz nenhum token de liquidez).

| Evento                          | reserva0 | reserva1 | reserva0 \* reserva1 | Valor do Pool (reserve0 + reserve1) | Tokens de liquidez cunhados para este depósito | Total de tokens de liquidez | valor de cada token de liquidez |
| ------------------------------- | --------:| --------:| ----------------------:| -----------------------------------:| ----------------------------------------------:| ---------------------------:| -------------------------------:|
| Configuração Inicial            |    8,000 |    8,000 |                     64 |                              16,000 |                                              8 |                           8 |                           2,000 |
| Depósito de quatro de cada tipo |   12,000 |   12,000 |                    144 |                              24,000 |                                              4 |                          12 |                           2,000 |
| Depósito de dois de cada tipo   |   14,000 |   14,000 |                    196 |                              28,000 |                                              2 |                          14 |                           2,000 |
| Depósito de valores desiguais   |   18,000 |   14,000 |                    252 |                              32,000 |                                              0 |                          14 |                          ~2,286 |
| Após a arbitragem               |  ~15,874 |  ~15,874 |                    252 |                             ~31,748 |                                              0 |                          14 |                          ~2,267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Use a função `UniswapV2ERC20._mint` para criar os tokens de liquidez adicionais e fornecê-los para a conta correta.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

Atualize as variáveis de estado (`reserve0`, `reserve1`, e se necessário `kLast`) e emita o evento apropriado.

##### queimar

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Essa função é chamada quando a liquidez é retirada e os tokens de liquidez apropriados precisam ser queimados. Ela também deve ser chamada [a partir de uma conta periférica](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

O contrato periférico transferiu a liquidez que será queimada para este contrato antes da chamada. Dessa forma, sabemos quanta liquidez queimar, e podemos garantir que ela seja queimada.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

O provedor de liquidez recebe um valor igual de ambos os tokens. Dessa forma, não mudamos a taxa de câmbio.

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

O resto da função `burn` é o espelho da função `mint` acima.

##### troca

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Essa função também deve ser chamada no [contrato periférico](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
```

Variáveis locais podem ser armazenadas na memória ou, se não houver muitas delas, diretamente na pilha. Se pudermos limitar o número em que usamos a pilha, gastaremos menos gás. Para mais detalhes, confira [o yellow paper, as especificações formais do Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), p. 26, equação 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
```

Essa transferência é optimista, porque transferimos antes de termos certeza de que todas as condições estão preenchidas. Isso é aceitável no Ethereum porque, se as condições não forem atendidas mais tarde na chamada, anularemos a função e todas as alterações criadas.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informe o destinatário sobre a troca, se solicitado.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Obtenha os saldos atuais. O contrato periférico envia-nos os tokens antes de nos chamar para a troca. Isso facilita para o contrato verificar se não está sendo trapaceado, uma verificação que _tem_ que acontecer no contrato principal (porque podemos ser chamados por outras entidades além do nosso contrato periférico).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Esta é uma verificação de integridade para garantir que não haja perdas durante a troca. Em nenhuma circunstância, a troca deverá reduzir `reserve0*reserve1`. É também aqui que asseguramos que uma taxa igual a 0,3% está sendo efetuada na troca; antes da verificação de integridade do valor de K, multiplicamos os dois saldos por 1.000 e subtraímos do montante multiplicado por 3, ou seja, 0,3% (3/1000 = 0,003 = 0,3%) está sendo deduzido do saldo antes de comparar seu valor K com o valor atual das reservas K.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Atualize `reserve0`, `reserve1` e, se necessário, os acumuladores de preço, o carimbo de data-hora e emita um evento.

##### Sincronizar ou Examinar

É possível que os saldos reais fiquem dessincronizados com as reservas que o par de troca pensa que tem. Não há nenhuma forma de retirar os tokens sem o consentimento do contrato, mas os depósitos são uma questão diferente. Uma conta pode transferir tokens para a corretora sem chamar `mint` ou `swap`.

Nesse caso, há duas soluções:

- `sync`, atualizar as reservas para os saldos atuais
- `skim`, sacar o valor extra. Observe que qualquer conta tem permissão para chamar `skim` porque não sabemos quem depositou os tokens. Essa informação é emitida em um evento, mas os eventos não são acessíveis na blockchain.

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

[Este contrato](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) cria o par de troca.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Essas variáveis de estado são necessárias para implementar a taxa do protocolo (consulte [o whitepaper](https://uniswap.org/whitepaper.pdf), p. 5). O endereço `taxa` acumula os tokens de liquidez pela taxa do protocolo, e `feeToSetter` é o endereço autorizado a mudar `taxaPara` para um endereço diferente.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Essas variáveis rastreiam os pares e as trocas entre os dois tipos de token.

O primeiro, `getPair`, é um mapeamento que identifica um contrato de par de troca baseado nos dois tokens ERC-20 que ele troca. Tokens ERC-20 são identificados pelo endereço dos contratos que os implementam, então as chaves e os valores são todos endereços. Para obter o endereço do par de troca que permite a troca do `tokenA` para o `tokenB`, você utiliza `getPair[<tokenA address>][<tokenB address>]` (ou o contrário).

A segunda variável, `allPairs`, é uma matriz que inclui todos os endereços dos pares de troca criados por essa fábrica. No Ethereum, você não pode iterar sobre o conteúdo de um mapeamento ou obter uma lista de todas as chaves, então, essa variável é a única maneira de saber qual troca esta fábrica gerencia.

Observação: a razão pela qual você não pode iterar sobre todas as chaves de um mapeamento é que os dados do contrato de armazenamento são _caros_, portanto, quanto menos os usarmos e os mudarmos, melhor. Você pode criar [mapeamentos que suportam iteração](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), mas eles requerem armazenamento extra para uma lista de chaves. Na maioria das aplicações, você não precisa disso.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Esse evento é emitido quando um novo par de troca é criado. Ele inclui os endereços dos tokens, o endereço do par de troca e o número total de trocas gerenciadas pela fábrica.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

A única coisa que o construtor faz é especificar o `feeToSetter`. As fábricas começam sem taxa, e somente `feeSetter` pode mudar isso.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Essa função retorna o número de pares de troca.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Essa é a função principal da fábrica, para criar um par de troca entre dois tokens ERC-20. Note que qualquer um pode chamar esta função. Você não precisa de permissão do Uniswap para criar um novo par de troca.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Queremos que o endereço da nova troca seja determinante, para poder ser calculado antecipadamente fora da cadeia (isso pode ser útil para [transações com camada 2](/developers/docs/scaling/)). Para isso, precisamos ter uma ordem consistente dos endereços dos tokens, independente da ordem na qual nós os recebemos, então os classificamos aqui.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
```

Os grandes pools de liquidez são melhores do que os pequenos, porque têm preços mais estáveis. Não queremos ter mais do que um único pool de liquidez por par de tokens. Se já existe uma troca, não há necessidade de criar outra para o mesmo par de troca.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Para criar um novo contrato, precisamos do código que o cria (tanto do construtor quanto o código que escreve para a memória do bytecode EVM do contrato atual). Normalmente, no Solidity, só usamos`addr = new <name of contract>(<constructor parameters>)` e o compilador cuida de tudo para nós, mas para termos um endereço de contrato determinístico, precisamos usar [o opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014). Quando este código foi escrito, esse opcode ainda não era suportado pelo Solidity, então foi necessário obter manualmente o código. Isso não é mais um problema, porque [Solidity agora suporta CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Quando um opcode não é suportado pelo Solidity, ainda podemos chamá-lo usando o [assembly embutido](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Chame a função `inicialize` para dizer à nova troca quais são os dois tokens que serão trocados.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Salve as novas informações sobre pares nas variáveis de estado e emita um evento para informar o mundo do novo par de troca.

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

Essas duas funções permitem `feeSetter` controlar o destinatário da taxa (se houver), e alterar `feeSetter` para um novo endereço.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Este contrato](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementa o token ERC-20 de liquidez. É semelhante ao contrato do [contrato OpenZeppelin ERC-20](/developers/tutorials/erc20-annotated-code), então vou apenas explicar a parte que é diferente, a funcionalidade `permit`.

As transações no Ethereum custam ether (ETH), que é equivalente a dinheiro real. Se você tem tokens ERC-20, mas não tem ETH, você não pode fazer transações, então você não pode fazer nada com eles. Uma solução para evitar esse problema são as[meta-transações](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions). O proprietário dos tokens assina uma transação que permite outra pessoa retirar os tokens da cadeia e enviá-los usando a Internet para o destinatário. O destinatário, que efetivamente possui ETH, envia depois a autorização em nome do proprietário.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Este hash é o identificador [para o tipo de transação](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). O único que suportamos aqui é `Permit` com esses parâmetros.

```solidity
    mapping(address => uint) public nonces;
```

Não é viável que um destinatário falsifique uma assinatura digital. No entanto, é comum enviar a mesma transação duas vezes (esta é uma forma de [ataque de repetição](https://wikipedia.org/wiki/Replay_attack)). Para evitar isso, usamos [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Se o nonce de uma nova `Permit` não é uma unidade maior do que o último usado, presumimos que ele seja inválido.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Este é o código para recuperar o [identificador da cadeia](https://chainid.network/). Ele usa uma linguagem em assembly do EVM chamado [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Observe que, na versão atual do Yul, você tem que usar `chainid()`, e não `chainid`.

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

Calcule o [separador de domínio](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) para EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Esta é a função que implementa as permissões. Ela recebe como parâmetros os campos relevantes, e os três valores escalares para a [assinatura](https://yos.io/2018/11/16/ethereum-signatures/) (v, r, e s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Não aceite transações após o prazo.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` é a mensagem que esperamos receber. Nós sabemos qual deve ser o nonce, então não há necessidade de obtê-lo como um parâmetro.

O algoritmo de assinatura Ethereum espera obter 256 bits para assinar, então usamos a função hash `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Do digest e da assinatura, podemos obter o endereço que o assinou usando [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Se tudo estiver OK, trate isso como [uma aprovação ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Os Contratos Periféricos {#periphery-contracts}

Os contratos periféricos são a API (interface de programa do aplicativo) do Uniswap. Eles estão disponíveis para chamadas externas, seja de outros contratos ou aplicações descentralizadas. Você poderia chamar os contratos principais diretamente, mas isso é mais complicado e pode perder valor se cometer um erro. Os contratos principais contêm apenas testes para garantir que eles não estejam vulneráveis, e não faz testes de integridade para mais ninguém. Eles se encontram nos periféricos para que possam ser atualizados se necessário.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Este contrato](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) tem vulnerabilidades e [não deve mais ser usado](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Felizmente, os contratos periféricos não têm estado e não possuem nenhum ativo, então é fácil descontinuá-los e sugerir que os usuários usem seu substituo, o `UniswapV2Router02`.

### UniswapV2Router01.sol {#UniswapV2Router02}

Na maioria dos casos, você usará o Uniswap através [deste contrato](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol). Você pode ver como usá-lo [aqui](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

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

A maioria deles já discutimos antes ou são bastante óbvios. A única exceção é `IWETH.sol`. O Uniswap v2 permite trocas por qualquer par de tokens ERC-20, mas o ether (ETH) em si não é um token ERC-20. Ele é anterior ao padrão e é transferido por meio de mecanismos únicos. Para permitir o uso de ETH em contratos que se aplicam a tokens ERC-20, foi criado o contrato [wrapped ether (WETH)](https://weth.tkn.eth.limo/). Você envia ETH a esse contrato, e ele cunha um valor equivalente de WETH para você. Você também pode queimar WETH e recuperar ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

O roteador precisa saber qual fábrica usar, e para transações que exigem WETH, saber qual contrato WETH usar. Estes valores são [imutáveis](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), o que significa que eles só podem ser definidos no construtor. Isso dá aos usuários a confiança de que ninguém conseguirá mudá-los para indicar contratos menos honestos.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Este modificador certifica-se de que as transações limitadas por tempo ("Faça X antes do tempo Y, se puder") não ocorram depois do seu limite de tempo.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

O construtor apenas define as variáveis de estado imutáveis.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
    }
```

Esta função é chamada quando resgatamos tokens do contrato WETH de volta para ETH. Apenas o contrato WETH que usamos está autorizado a fazer isso.

#### Adicionar Liquidez {#add-liquidity}

Essas funções adicionam tokens ao par de troca, o que aumenta o pool de liquidez.

```solidity

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
```

Esta função é usada para calcular a quantidade de tokens A e B que devem ser depositados ao par de troca.

```solidity
        address tokenA,
        address tokenB,
```

Estes são os endereços dos contratos do token ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Estas são as quantidades que o provedor de liquidez quer depositar. Elas também são as quantidades máximas de A e B a serem depositadas.

```solidity
        uint amountAMin,
        uint amountBMin
```

Estas são as quantidades mínimas aceitáveis para o depósito. Se a transação não puder ser feita com esses valores ou mais, cancele-a. Se você não quiser esse recurso, basta especificar zero.

Provedores de liquidez especificam um mínimo, geralmente porque querem limitar a transação a uma taxa de câmbio próxima da atual. Se a taxa de câmbio flutuar demais, pode ser devido a novidades que alteram os valores, e ele querem decidir manualmente o que fazer.

Por exemplo, imagine um caso em que a taxa de câmbio é de um para um, e o provedor de liquidez especifica esses valores:

| Parâmetro      | Valor |
| -------------- | -----:|
| amountADesired | 1.000 |
| amountBDesired | 1.000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Enquanto a taxa de câmbio permanecer entre 0,9 e 1,25, a transação será realizada. Se a taxa de câmbio sair desse intervalo, a transação será cancelada.

A razão dessa precaução é que as transações não são imediatas, você as envia e um validador vai incluí-las em um bloco (a menos que seu preço de gás seja muito baixo, nesse caso você precisará enviar outra transação com o mesmo nonce e um preço de gás mais alto para substituí-la). Você não pode controlar o que acontece durante o intervalo entre o envio e a inclusão.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

A função retorna os valores que o provedor de liquidez deve depositar para ter uma proporção igual à atual entre as reservas.

```solidity
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Se ainda não houver par de troca para esses tokens, crie-o.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Recupere as reservas atuais no par.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Se as reservas atuais estão vazias, então isso não é um par de troca. Os valores a serem depositados devem ser exatamente iguais àqueles que o provedor de liquidez quer fornecer.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Se precisarmos ver quais valores serão, obteremos o valor ideal usando [esta função](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Queremos a mesma proporção das reservas atuais.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Se `amountBOptimal` é menor que a quantidade que o provedor de liquidez quer depositar significa que o token B é mais valioso atualmente do que o depositante de liquidez pensa, portanto, é necessário um valor menor.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Se o valor B ideal for maior do que o valor B desejado, isso significa que os tokens B são menos valiosos atualmente do que o depositante de liquidez pensa, portanto, é necessário um valor maior. No entanto, a quantidade desejada é um valor máximo, então não podemos fazer isso. Em vez disso, calculamos o número ideal de tokens A para a quantidade desejada de tokens B.

Colocando tudo isso junto, obtemos este gráfico. Suponha que você esteja tentando depositar mil tokens A (linha azul) e mil tokens B (linha vermelha). O eixo x é a taxa de câmbio, A/B. Se x=1, eles são iguais em valor e você deposita mil de cada um. Se x=2, A é o dobro do valor de B (você ganha dois tokens B para cada token A), então você deposita mil tokens B, mas apenas 500 tokens A. Se x=0,5, a situação é invertida, mil tokens A e quinhentos tokens B.

![Grafo](liquidityProviderDeposit.png)

Você pode depositar liquidez diretamente no contrato principal (usando[UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)). No entanto, o contrato principal somente verifica se não está sendo enganado, para que você não corra o risco de perder valor se a taxa de câmbio mudar entre o momento em que envia sua transação e o momento em que ela é executada. Se você usa o contrato periférico, ele calcula o montante que você deve depositar e deposita imediatamente, então a taxa de câmbio não muda e você não perde nada.

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

Esta função pode ser chamada por uma transação para depositar liquidez. A maioria dos parâmetros são os mesmos do `_addLiquidity` acima, com duas exceções:

. `to` é o endereço que obtém os novos tokens de liquidez cunhados para mostrar a parte do pool que o provedor de liquidez detém. `deadline` é o limite de tempo da transação

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Nós calculamos os valores que realmente depositamos e depois encontramos o endereço do pool de liquidez. Para economizar gás, não fazemos isso perguntando à fábrica, mas usando a função `pairFor` (veja abaixo nas bibliotecas)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Transfira as quantidades corretas de tokens do usuário para o par de troca.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

Em retorno, dê liquidez ao endereço `to` para a propriedade parcial do pool. A função `mint` do contrato central vê quantos tokens extras ele tem (comparado com o que ele tinha na última vez que a liquidez mudou) e cunha liquidez por consequência.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Quando um provedor de liquidez quer fornecer liquidez a uma troca Token/ETH, existem algumas diferenças. O contrato trata do encapsulamento do ETH para o provedor de liquidez. Não há necessidade de especificar quantos ETH o usuário quer depositar, porque o usuário só os envia com a transação (o valor está disponível em `msg.value`).

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

Para depositar o ETH, o contrato primeiro converte em WETH e depois transfere o WETH para o par. Observe que a transferência é envolvida em um `assert`. Isso significa que se a transferência falhar, essa chamada de contrato também irá falhar, e o encapsulamento do Eth não ocorre.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

O usuário já nos enviou o ETH, então, se houver alguma quantidade restante (porque o outro token é menos valioso do que o usuário pensava), precisamos emitir um reembolso.

#### Remover Liquidez {#remove-liquidity}

Essas funções removerão liquidez e pagarão ao provedor de liquidez.

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

O caso mais simples de remover liquidez. Há uma quantidade mínima de cada token que o provedor de liquidez concorda em receber, e isso deve acontecer antes do prazo.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

A função `burn` do contrato principal lida com o pagamento dos tokens de volta ao usuário.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Quando uma função retorna vários valores, mas só estamos interessados em alguns deles, é assim que obtemos apenas esses valores. É um pouco mais barato em termos de gás do que ler um valor e nunca o utilizar.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Traduza os valores do jeito que o contrato principal os retorna (token de endereço inferior primeiro) da maneira esperada pelo usuário (correspondente a `tokenA` e `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

É OK fazer a transferência primeiro e depois verificar que ela é legítima, porque se não for, reverteremos todas as alterações de estado.

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

Remover liquidez para ETH é quase a mesma coisa, exceto o fato de recebermos os tokens WETH e, em seguida, resgatá-los para ETH e devolver ao provedor de liquidez.

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

Essas funções retransmitem meta-transações para permitir que usuários sem ether se retirem do pool, usando o [mecanismo de permissão](#UniswapV2ERC20).

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

Esta função pode ser usada para tokens que têm taxas de transferência ou de armazenamento. Quando um token tem tais taxas, não podemos confiar na função `removeLiquidity` para nos dizer quanto do token nós recuperaremos. Por isso, primeiro temos que sacar e depois obter o saldo.

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

A função final combina taxas de armazenamento com meta-transações.

#### Negociação {#trade}

```solidity
    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Essa função executa um processamento interno, necessário às funções expostas aos traders.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Enquanto estou escrevendo isso, existem [388.160 tokens ERC-20](https://etherscan.io/tokens). Se houvesse um par de troca para cada par de tokens, existiriam mais de 150 bilhões de pares de troca. A cadeia inteira, no momento, [tem apenas 0,1% desse número de contas](https://etherscan.io/chart/address). Em vez disso, as funções de troca suportam o conceito de caminho. Um trader pode trocar A por B, B por C e C por D, portanto, não há necessidade de uma troca direta do par A-D.

Os preços nesses mercados tendem a estar sincronizados, porque quando eles estão dessincronizados, cria-se uma oportunidade de arbitragem. Imagine, por exemplo, três tokens, A, B e C. Existem três pares de troca, um para cada par.

1. A situação inicial
2. Um trader vende 24,695 tokens A e recebe 25,305 tokens B.
3. O trader vende 24,695 tokens B para 25,305 tokens C, obtendo aproximadamente 0,61 tokens B de lucro.
4. Em seguida, o trader vende 24,695 tokens B por 25,305 tokens C, obtendo aproximadamente 0,61 tokens B de lucro. O trader também tem tokens adicionais de 0,61 A (os 25,305 obtidos pelo trader, menos o investimento original de 24,695).

| Etapa | Troca A-B                     | Troca B-C                        | Troca A-C                        |
| ----- | ----------------------------- | -------------------------------- | -------------------------------- |
| 1     | A:1.000 B:1.050 A/B=1,05      | B:1.000 C:1.050 B/C=1,05         | B:1.050 C:1.000 B/C=1,05         |
| 2     | A:1.024,695 B:1.024,695 A/B=1 | B:1.000 C:1.050 B/C=1,05         | B:1.050 C:1.000 B/C=1,05         |
| 3     | A:1.024,695 B:1.024,695 A/B=1 | B:1.024,695 C:1.024,695 B/C=1,05 | B:1.050 C:1.000 B/C=1,05         |
| 4     | A:1.024,695 B:1.024,695 A/B=1 | B:1.024,695 C:1.024,695 B/C=1,05 | B:1.024,695 C:1.024,695 B/C=1,05 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Obtenha o par que estamos tratando no momento, classifique-o (para uso com o par) e obtenha o valor de saída esperado.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Obtenha os valores esperados, classificados da maneira desejada para o par de troca.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Esta é a última troca? Em caso afirmativo, envie os tokens recebidos para troca para o destino. Caso contrário, envie para o próximo par de troca.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Na verdade, chame a troca de par para trocar os tokens. Não precisamos de um retorno de chamada para ser informado sobre a troca, por isso, não enviamos nenhum byte para esse campo.

```solidity
    function swapExactTokensForTokens(
```

Essa função é usada diretamente pelos negociantes para trocar um token pelo outro.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Este parâmetro contém os endereços dos contratos ERC-20. Como explicado acima, isso é uma matriz porque você poderá precisar passar por vários pares de troca para obter o ativo que deseja.

Um parâmetro de função no Solidity pode ser armazenado tanto em `memory` quanto em `calldata`. Se a função for um ponto de entrada do contrato, chamado diretamente de um usuário (usando uma transação) ou por um contrato diferente, o valor do parâmetro poderá ser retirado diretamente dos dados de chamada. Se a função for chamada internamente, como no `_swap` acima, os parâmetros deverão ser armazenados em `memory`. Do ponto de vista do contrato chamado, `calldata` é somente leitura.

Com tipos escalares como `uint` ou `address`, o compilador lida com a escolha do armazenamento para nós, mas com as matrizes, que são mais longas e mais caras, nós especificamos o tipo de armazenamento a ser usado.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Valores de retorno são sempre retornados na memória.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Calcula a quantidade a ser comprada em cada troca. Se o resultado for menor do que o mínimo que o trader está disposto a aceitar, reverta a transação.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Por fim, transfira o token ERC-21 inicial para a conta do primeiro par de troca e chame `_swap`. Tudo isso está acontecendo na mesma transação, então, o par de troca sabe que quaisquer tokens inesperados fazem parte dessa transferência.

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

A função anterior, `swapTokensForTokens`, permite que um trader especifique o número exato de tokens de entrada que ele está disposto a dar e o número mínimo de tokens de saída que ele está disposto a receber em troca. Esta função faz a troca inversa, permite que um trader especifique o número de tokens de saída que ele quer, e o número máximo de tokens de entrada que ele está disposto a pagar por eles.

Em ambos os casos, o trader tem que primeiro conceder ao contrato periférico um subsídio que lhe permita transferi-los.

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

Essas quatro variantes envolvem negociação entre ETH e tokens. A única diferença é que recebemos ETH do trader e usamos para cunhar WETH, ou recebemos WETH da última troca no caminho e o queimamos, devolvendo ao trader o ETH resultante.

```solidity
    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Esta é a função interna para trocar tokens que têm taxas de transferência ou armazenamento para resolver ([esse problema](https://github.com/Uniswap/uniswap-interface/issues/835)).

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

Devido às taxas de transferência, não podemos confiar na função `getAmountsOut` para nos informar quanto recebemos de cada transferência (a forma como fazemos antes de chamar o `_swap`). Em vez disso, primeiro precisamos transferir e ver quantos tokens recebemos de volta.

Observação: em teoria, poderíamos simplesmente usar essa função em vez de `_swap`, mas em certos casos (por exemplo, se a transferência acabar sendo cancelada porque não há quantidade suficiente no final para atender ao mínimo necessário) que acabaria custando mais gás. Os tokens de taxa de transferência são bastante raros, portanto, embora precisemos acomodá-los, não há necessidade de todas as trocas assumirem que eles passam por pelo menos uma delas.

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

Essas são as mesmas variantes usadas para tokens normais, mas chamam `_swapSupportingFeeOnTransferTokens`.

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

Estas funções são apenas proxies que chamam as [funções UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Este contrato foi usado para migrar trocas da antiga v1 para v2. Agora que eles foram migrados, isso já não é mais relevante.

## As bibliotecas {#libraries}

A [biblioteca SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) está bem documentada, então não há necessidade de documentá-la aqui.

### Matemática {#Math}

Esta biblioteca contém algumas funções matemáticas que normalmente não são necessárias no código do Solidity, portanto, elas não fazem parte da linguagem.

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

Comece com x como uma estimativa maior do que a raiz quadrada (razão pela qual precisamos tratar 1 – 3 como casos especiais).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Faça uma estimativa mais próxima, a média da estimativa anterior e o número da raiz quadrada a qual estamos tentando encontrar dividida pela estimativa anterior. Repita até a nova estimativa não ser menor do que a existente. Para mais detalhes, [veja aqui](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Nunca devemos precisar da raiz quadrada de zero. As raízes quadradas de um, dois e três são aproximadamente um (usamos inteiros, portanto ignoramos a fração).

```solidity
        }
    }
}
```

### Frações de Ponto Fixo (UQ112x112) {#FixedPoint}

Essa biblioteca lida com frações, que normalmente não fazem parte da aritmética do Ethereum. Ele faz isso codificando o número _x_ como _x\*2^112_. Isso nos permite usar os opcodes originais de adição e subtração sem alterações.

```solidity
pragma solidity =0.5.16;

// a library for handling binary fixed point numbers (https://wikipedia.org/wiki/Q_(number_format))

// range: [0, 2**112 - 1]
// resolution: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` é a codificação para um.

```solidity
    // encode a uint112 as a UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // never overflows
    }
```

Porque y é `uint112`, o máximo pode ser 2^112-1. Esse número ainda pode ser codificado como um `UQ112x112`.

```solidity
    // divide a UQ112x112 by a uint112, returning a UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Se dividirmos dois valores `UQ112x112`, o resultado não será mais multiplicado por 2^112. Então, em vez disso, pegamos um inteiro como denominador. Teríamos que usar um truque semelhante para fazer a multiplicação, mas não precisamos fazer a multiplicação dos valores `UQ112x112`.

### UniswapV2Library {#uniswapV2library}

Esta biblioteca é usada somente pelos contratos periféricos

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

Ordene os dois tokens por endereço, a fim de obter o endereço do par de troca para eles. Isso é necessário porque, caso contrário, teríamos duas possibilidades, uma para os parâmetros A,B e outro para os parâmetros B,A, levando a duas trocas em vez de uma.

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

Essa função calcula o endereço do par de troca para os dois tokens. Este contrato é criado usando [o opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014), para que possamos calcular o endereço usando o mesmo algoritmo se soubermos os parâmetros que ele usa. Isso é muito mais barato do que pedir à fábrica, e

```solidity
    // fetches and sorts the reserves for a pair
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Essa função retorna as reservas dos dois tokens que o par de troca tem. Observe que ele pode receber os tokens em qualquer uma das ordens e classificá-los para uso interno.

```solidity
    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Esta função fornece a quantidade de tokens B que você receberá em retorno pelo token A se não houver taxas envolvidas. Este cálculo considera que a transferência altera a taxa de câmbio.

```solidity
    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

A função `quote` acima funciona muito bem se não houver nenhuma taxa para usar o par de troca. No entanto, se houver uma taxa de câmbio de 0,3%, a quantidade que você realmente receberá é menor. Essa função calcula o valor após a taxa de câmbio.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

O Solidity não lida com funções nativamente, por isso, não podemos multiplicar a quantia por 0,997. Em vez disso, multiplicamos o numerador por 997 e o denominador por 1.000, atingindo o mesmo efeito.

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

Essa função faz aproximadamente a mesma coisa, mas obtém o valor de saída e fornece a entrada.

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

Essas duas funções lidam com a identificação dos valores quando é necessário passar por vários pares de troca.

### Auxiliar de Transferência {#transfer-helper}

[Esta biblioteca](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) adiciona verificações de sucesso em torno das transferências ERC-20 e Ethereum para tratar uma reversão e um valor de retorno `false` da mesma maneira.

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

Podemos chamar um contrato diferente de uma das duas maneiras:

- Use uma definição de interface para criar uma chamada de função
- Use a [aplicação de interface binária (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) "manualmente" para criar a chamada. Foi isso que o autor do código decidiu fazer.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Por uma questão de compatibilidade com versões anteriores dos tokens criados antes do padrão ERC-20, uma chamada ERC-20 pode falhar revertendo (nesse caso `sucess` é `false`) ou sendo bem-sucedido e retornando um valor `false` (nesse caso, há dados de saída e, se você decodificá-los como um booleano, obterá `false`).

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

Essa função implementa [a funcionalidade de transferência do ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), que permite que uma conta gaste o valor permitido por uma conta diferente.

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

Essa função implementa [a funcionalidade de transferência do ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), que permite que uma conta gaste o valor permitido por uma conta diferente.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Essa função transfere ether para uma conta. Qualquer chamada a um contrato diferente pode tentar enviar ether. Como nós não precisamos chamar nenhuma função, nós não enviamos nenhum dado com a chamada.

## Conclusão {#conclusion}

Este é um longo artigo de cerca de 50 páginas. Se você chegou até aqui, parabéns! Esperamos que agora você tenha entendido as considerações a ter em mente ao escrever um aplicativo real (em oposição aos curtos programas de exemplo) e consiga melhor escrever contratos para seus próprios casos de uso.

Agora vá escrever algo interessante e nos surpreenda.
