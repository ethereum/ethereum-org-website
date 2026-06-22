---
title: "Passo a passo do contrato Uniswap-v2"
description: Como o contrato Uniswap-v2 funciona? Por que ele é escrito dessa forma?
author: Ori Pomerantz
tags: ["solidity", "dapps"]
skill: intermediate
breadcrumb: Passo a passo do Uniswap v2
published: 2021-05-01
lang: pt-br
---
## Introdução {#introduction}

[O Uniswap v2](https://app.uniswap.org/whitepaper.pdf) pode criar um mercado de troca entre quaisquer dois tokens ERC-20. Neste artigo, analisaremos o código-fonte dos contratos que implementam este protocolo e veremos por que eles são escritos dessa forma.

### O que o Uniswap faz? {#what-does-uniswap-do}

Basicamente, existem dois tipos de usuários: provedores de liquidez e traders.

Os _provedores de liquidez_ fornecem ao pool os dois tokens que podem ser trocados (vamos chamá-los de **Token0** e **Token1**). Em troca, eles recebem um terceiro token que representa a propriedade parcial do pool, chamado de _token de liquidez_.

Os _traders_ enviam um tipo de token para o pool e recebem o outro (por exemplo, enviam o **Token0** e recebem o **Token1**) do pool fornecido pelos provedores de liquidez. A taxa de câmbio é determinada pelo número relativo de **Token0**s e **Token1**s que o pool possui. Além disso, o pool cobra uma pequena porcentagem como recompensa para o pool de liquidez.

Quando os provedores de liquidez querem seus ativos de volta, eles podem queimar os tokens do pool e receber de volta seus tokens, incluindo sua parte das recompensas.

[Clique aqui para uma descrição mais completa](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Por que v2? Por que não v3? {#why-v2}

[O Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) é uma atualização muito mais complicada do que a v2. É mais fácil aprender primeiro a v2 e depois passar para a v3.

### Contratos principais vs Contratos periféricos {#contract-types}

O Uniswap v2 é dividido em dois componentes, um principal (core) e um periférico (periphery). Essa divisão permite que os contratos principais, que mantêm os ativos e, portanto, _têm_ que ser seguros, sejam mais simples e fáceis de auditar. Toda a funcionalidade extra exigida pelos traders pode então ser fornecida por contratos periféricos.

## Fluxos de dados e controle {#flows}

Este é o fluxo de dados e controle que ocorre quando você executa as três principais ações do Uniswap:

1. Trocar entre diferentes tokens
2. Adicionar liquidez ao mercado e ser recompensado com tokens de liquidez ERC-20 do par de troca
3. Queimar tokens de liquidez ERC-20 e receber de volta os tokens ERC-20 que o par de troca permite que os traders troquem

### Troca {#swap-flow}

Este é o fluxo mais comum, usado por traders:

#### Chamador {#caller}

1. Fornecer à conta periférica uma permissão no valor a ser trocado.
2. Chamar uma das muitas funções de troca do contrato periférico (qual delas depende se o ETH está envolvido ou não, se o trader especifica a quantidade de tokens a depositar ou a quantidade de tokens a receber de volta, etc).
   Cada função de troca aceita um `path`, um array de exchanges pelas quais passar.

#### No contrato periférico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identificar os valores que precisam ser negociados em cada exchange ao longo do caminho.
4. Itera sobre o caminho. Para cada exchange ao longo do caminho, ele envia o token de entrada e, em seguida, chama a função `swap` da exchange.
   Na maioria dos casos, o endereço de destino para os tokens é o próximo par de troca no caminho. Na exchange final, é o endereço fornecido pelo trader.

#### No contrato principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Verificar se o contrato principal não está sendo enganado e se pode manter liquidez suficiente após a troca.
6. Ver quantos tokens extras temos além das reservas conhecidas. Esse valor é o número de tokens de entrada que recebemos para trocar.
7. Enviar os tokens de saída para o destino.
8. Chamar `_update` para atualizar os valores de reserva

#### De volta ao contrato periférico (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Realizar qualquer limpeza necessária (por exemplo, queimar tokens de ether empacotado (WETH) para receber de volta ETH para enviar ao trader)

### Adicionar liquidez {#add-liquidity-flow}

#### Chamador {#caller-2}

1. Fornecer à conta periférica uma permissão nos valores a serem adicionados ao pool de liquidez.
2. Chamar uma das funções `addLiquidity` do contrato periférico.

#### No contrato periférico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Criar um novo par de troca, se necessário
4. Se houver um par de troca existente, calcular a quantidade de tokens a adicionar. Supõe-se que seja um valor idêntico para ambos os tokens, portanto, a mesma proporção de novos tokens para tokens existentes.
5. Verificar se os valores são aceitáveis (os chamadores podem especificar um valor mínimo abaixo do qual preferem não adicionar liquidez)
6. Chamar o contrato principal.

#### No contrato principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2-2}

7. Cunhar tokens de liquidez e enviá-los ao chamador
8. Chamar `_update` para atualizar os valores de reserva

### Remover liquidez {#remove-liquidity-flow}

#### Chamador {#caller-3}

1. Fornecer à conta periférica uma permissão de tokens de liquidez a serem queimados em troca dos tokens subjacentes.
2. Chamar uma das funções `removeLiquidity` do contrato periférico.

#### No contrato periférico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Enviar os tokens de liquidez para o par de troca

#### No contrato principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Enviar ao endereço de destino os tokens subjacentes em proporção aos tokens queimados. Por exemplo, se houver 1000 tokens A no pool, 500 tokens B e 90 tokens de liquidez, e recebermos 9 tokens para queimar, estamos queimando 10% dos tokens de liquidez, então enviamos de volta ao usuário 100 tokens A e 50 tokens B.
5. Queimar os tokens de liquidez
6. Chamar `_update` para atualizar os valores de reserva

## Os Contratos Principais {#core-contracts}

Estes são os contratos seguros que mantêm a liquidez.

### UniswapV2Pair.sol {#uniswapv2pair}

[Este contrato](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementa o pool real que troca tokens. É a funcionalidade principal do Uniswap.

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

Estas são todas as interfaces que o contrato precisa conhecer, seja porque o contrato as implementa (`IUniswapV2Pair` e `UniswapV2ERC20`) ou porque chama contratos que as implementam.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Este contrato herda de `UniswapV2ERC20`, que fornece as funções ERC-20 para os tokens de liquidez.

```solidity
    using SafeMath  for uint;
```

A [biblioteca SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) é usada para evitar overflows e underflows. Isso é importante porque, de outra forma, poderíamos acabar com uma situação em que um valor deveria ser `-1`, mas em vez disso é `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Muitos cálculos no contrato do pool exigem frações. No entanto, frações não são suportadas pela EVM.
A solução que o Uniswap encontrou é usar valores de 224 bits, com 112 bits para a parte inteira e 112 bits para a fração. Portanto, `1.0` é representado como `2^112`, `1.5` é representado como `2^112 + 2^111`, etc.

Mais detalhes sobre esta biblioteca estão disponíveis [mais adiante no documento](#fixedpoint).

#### Variáveis {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Para evitar casos de divisão por zero, há um número mínimo de tokens de liquidez que sempre existem (mas são de propriedade da conta zero). Esse número é **MINIMUM_LIQUIDITY**, mil.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Este é o seletor da ABI para a função de transferência ERC-20. Ele é usado para transferir tokens ERC-20 nas duas contas de token.

```solidity
    address public factory;
```

Este é o contrato de fábrica que criou este pool. Todo pool é uma troca entre dois tokens ERC-20, a fábrica é um ponto central que conecta todos esses pools.

```solidity
    address public token0;
    address public token1;
```

Existem os endereços dos contratos para os dois tipos de tokens ERC-20 que podem ser trocados por este pool.

```solidity
    uint112 private reserve0;           // usa um único slot de armazenamento, acessível via getReserves
    uint112 private reserve1;           // usa um único slot de armazenamento, acessível via getReserves
```

As reservas que o pool tem para cada tipo de token. Assumimos que os dois representam a mesma quantidade de valor e, portanto, cada token0 vale reserve1/reserve0 token1's.

```solidity
    uint32  private blockTimestampLast; // usa um único slot de armazenamento, acessível via getReserves
```

O carimbo de data/hora (timestamp) para o último bloco no qual ocorreu uma troca, usado para rastrear as taxas de câmbio ao longo do tempo.

Uma das maiores despesas de gás dos contratos Ethereum é o armazenamento, que persiste de uma chamada do contrato para a próxima. Cada célula de armazenamento tem 256 bits de comprimento. Portanto, três variáveis, `reserve0`, `reserve1` e `blockTimestampLast`, são alocadas de tal forma que um único valor de armazenamento pode incluir todas as três (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Essas variáveis mantêm os custos cumulativos para cada token (cada um em termos do outro). Elas podem ser usadas para calcular a taxa de câmbio média durante um período de tempo.

```solidity
    uint public kLast; // reserve0 * reserve1, imediatamente após o evento de liquidez mais recente
```

A maneira como a troca de pares decide sobre a taxa de câmbio entre token0 e token1 é manter o múltiplo das duas reservas constante durante as negociações. `kLast` é esse valor. Ele muda quando um provedor de liquidez deposita ou saca tokens, e aumenta ligeiramente devido à taxa de mercado de 0,3%.

Aqui está um exemplo simples. Observe que, por uma questão de simplicidade, a tabela tem apenas três dígitos após o ponto decimal e ignoramos a taxa de negociação de 0,3%, portanto, os números não são exatos.

| Evento                                      |  reserve0 |  reserve1 | reserve0 \* reserve1 | Taxa de câmbio média (token1 / token0) |
| ------------------------------------------- | --------: | --------: | -------------------: | -------------------------------------- |
| Configuração inicial                        | 1,000.000 | 1,000.000 |            1,000,000 |                                        |
| Trader A troca 50 token0 por 47.619 token1  | 1,050.000 |   952.381 |            1,000,000 | 0.952                                  |
| Trader B troca 10 token0 por 8.984 token1   | 1,060.000 |   943.396 |            1,000,000 | 0.898                                  |
| Trader C troca 40 token0 por 34.305 token1  | 1,100.000 |   909.090 |            1,000,000 | 0.858                                  |
| Trader D troca 100 token1 por 109.01 token0 |   990.990 | 1,009.090 |            1,000,000 | 0.917                                  |
| Trader E troca 10 token0 por 10.079 token1  | 1,000.990 |   999.010 |            1,000,000 | 1.008                                  |

À medida que os traders fornecem mais token0, o valor relativo do token1 aumenta e vice-versa, com base na oferta e na demanda.

#### Bloqueio {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Existe uma classe de vulnerabilidades de segurança que se baseia no [abuso de reentrada](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). O Uniswap precisa transferir tokens ERC-20 arbitrários, o que significa chamar contratos ERC-20 que podem tentar abusar do mercado Uniswap que os chama.
Ao ter uma variável `unlocked` como parte do contrato, podemos evitar que funções sejam chamadas enquanto estão em execução (dentro da mesma transação).

```solidity
    modifier lock() {
```

Esta função é um [modificador](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), uma função que envolve uma função normal para alterar seu comportamento de alguma forma.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Se `unlocked` for igual a um, defina-o como zero. Se já for zero, reverta a chamada, faça-a falhar.

```solidity
        _;
```

Em um modificador, `_;` é a chamada de função original (com todos os parâmetros). Aqui significa que a chamada de função só acontece se `unlocked` era um quando foi chamada, e enquanto está em execução o valor de `unlocked` é zero.

```solidity
        unlocked = 1;
    }
```

Após o retorno da função principal, libere o bloqueio.

#### Funções diversas {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Esta função fornece aos chamadores o estado atual da troca. Observe que as funções Solidity [podem retornar vários valores](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Esta função interna transfere uma quantidade de tokens ERC-20 da troca para outra pessoa. `SELECTOR` especifica que a função que estamos chamando é `transfer(address,uint)` (veja a definição acima).

Para evitar ter que importar uma interface para a função de token, criamos "manualmente" a chamada usando uma das [funções da ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Existem duas maneiras pelas quais uma chamada de transferência ERC-20 pode relatar falha:

1. Reverter. Se uma chamada para um contrato externo reverter, o valor de retorno booleano será `false`
2. Terminar normalmente, mas relatar uma falha. Nesse caso, o buffer do valor de retorno tem um comprimento diferente de zero e, quando decodificado como um valor booleano, é `false`

Se qualquer uma dessas condições acontecer, reverta.

#### Eventos {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Esses dois eventos são emitidos quando um provedor de liquidez deposita liquidez (`Mint`) ou a saca (`Burn`). Em ambos os casos, as quantidades de token0 e token1 que são depositadas ou sacadas fazem parte do evento, bem como a identidade da conta que nos chamou (`sender`). No caso de um saque, o evento também inclui o alvo que recebeu os tokens (`to`), que pode não ser o mesmo que o remetente.

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

Este evento é emitido quando um trader troca um token pelo outro. Novamente, o remetente e o destino podem não ser os mesmos.
Cada token pode ser enviado para a troca ou recebido dela.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Finalmente, `Sync` é emitido toda vez que tokens são adicionados ou sacados, independentemente do motivo, para fornecer as informações de reserva mais recentes (e, portanto, a taxa de câmbio).

#### Funções de Configuração {#pair-setup}

Essas funções devem ser chamadas uma vez quando a nova troca de pares for configurada.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

O construtor garante que manteremos o controle do endereço da fábrica que criou o par. Esta informação é necessária para `initialize` e para a taxa da fábrica (se houver)

```solidity
    // chamado uma vez pela factory no momento da implantação
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // verificação suficiente
        token0 = _token0;
        token1 = _token1;
    }
```

Esta função permite que a fábrica (e apenas a fábrica) especifique os dois tokens ERC-20 que este par trocará.

#### Funções de Atualização Internas {#pair-update-internal}

##### \_update {#pair-external}

```solidity
    // atualiza as reservas e, na primeira chamada por bloco, os acumuladores de preço
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Esta função é chamada toda vez que tokens são depositados ou sacados.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Se balance0 ou balance1 (uint256) for maior que uint112(-1) (=2^112-1) (então ele transborda e volta para 0 quando convertido para uint112), recuse-se a continuar o \_update para evitar overflows. Com um token normal que pode ser subdividido em 10^18 unidades, isso significa que cada troca é limitada a cerca de 5.1\*10^15 de cada token. Até agora, isso não tem sido um problema.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // o overflow é desejado
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Se o tempo decorrido não for zero, significa que somos a primeira transação de troca neste bloco. Nesse caso, precisamos atualizar os acumuladores de custo.

```solidity
            // * nunca sofre overflow, e o overflow de + é desejado
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Cada acumulador de custo é atualizado com o custo mais recente (reserva do outro token/reserva deste token) vezes o tempo decorrido em segundos. Para obter um preço médio, você lê o preço cumulativo em dois pontos no tempo e divide pela diferença de tempo entre eles. Por exemplo, suponha esta sequência de eventos:

| Evento                                                   |  reserve0 |  reserve1 | timestamp | Taxa de câmbio marginal (reserve1 / reserve0) |       price0CumulativeLast |
| -------------------------------------------------------- | --------: | --------: | --------- | --------------------------------------------: | -------------------------: |
| Configuração inicial                                     | 1,000.000 | 1,000.000 | 5,000     |                                         1.000 |                          0 |
| Trader A deposita 50 token0 e recebe 47.619 token1 de volta | 1,050.000 |   952.381 | 5,020     |                                         0.907 |                         20 |
| Trader B deposita 10 token0 e recebe 8.984 token1 de volta  | 1,060.000 |   943.396 | 5,030     |                                         0.890 |       20+10\*0.907 = 29.07 |
| Trader C deposita 40 token0 e recebe 34.305 token1 de volta | 1,100.000 |   909.090 | 5,100     |                                         0.826 |    29.07+70\*0.890 = 91.37 |
| Trader D deposita 100 token1 e recebe 109.01 token0 de volta |   990.990 | 1,009.090 | 5,110     |                                         1.018 |    91.37+10\*0.826 = 99.63 |
| Trader E deposita 10 token0 e recebe 10.079 token1 de volta | 1,000.990 |   999.010 | 5,150     |                                         0.998 | 99.63+40\*1.1018 = 143.702 |

Digamos que queremos calcular o preço médio do **Token0** entre os timestamps 5.030 e 5.150. A diferença no valor de `price0Cumulative` é 143.702-29.07=114.632. Esta é a média em dois minutos (120 segundos). Portanto, o preço médio é 114.632/120 = 0.955.

Este cálculo de preço é a razão pela qual precisamos saber os tamanhos antigos das reservas.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Finalmente, atualize as variáveis globais e emita um evento `Sync`.

##### \_mintFee {#uniswapv2factory}

```solidity
    // se a taxa estiver ativada, cunhar liquidez equivalente a 1/6 do crescimento em sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

No Uniswap 2.0, os traders pagam uma taxa de 0,30% para usar o mercado. A maior parte dessa taxa (0,25% da negociação) sempre vai para os provedores de liquidez. Os 0,05% restantes podem ir para os provedores de liquidez ou para um endereço especificado pela fábrica como uma taxa de protocolo, que paga o Uniswap por seu esforço de desenvolvimento.

Para reduzir os cálculos (e, portanto, os custos de gás), essa taxa é calculada apenas quando a liquidez é adicionada ou removida do pool, em vez de a cada transação.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Leia o destino da taxa da fábrica. Se for zero, não há taxa de protocolo e não há necessidade de calcular essa taxa.

```solidity
        uint _kLast = kLast; // economia de gás
```

A variável de estado `kLast` está localizada no armazenamento, portanto, terá um valor entre diferentes chamadas ao contrato.
O acesso ao armazenamento é muito mais caro do que o acesso à memória volátil que é liberada quando a chamada de função para o contrato termina, então usamos uma variável interna para economizar gás.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Os provedores de liquidez recebem sua parte simplesmente pela valorização de seus tokens de liquidez. Mas a taxa de protocolo exige que novos tokens de liquidez sejam cunhados e fornecidos ao endereço `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Se houver nova liquidez sobre a qual cobrar uma taxa de protocolo. Você pode ver a função de raiz quadrada [mais adiante neste artigo](#math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Este cálculo complicado de taxas é explicado no [whitepaper](https://app.uniswap.org/whitepaper.pdf) na página 5. Sabemos que entre o momento em que `kLast` foi calculado e o presente, nenhuma liquidez foi adicionada ou removida (porque executamos esse cálculo toda vez que a liquidez é adicionada ou removida, antes que ela realmente mude), portanto, qualquer alteração em `reserve0 * reserve1` deve vir de taxas de transação (sem elas, manteríamos `reserve0 * reserve1` constante).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Use a função `UniswapV2ERC20._mint` para realmente criar os tokens de liquidez adicionais e atribuí-los a `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Se não houver taxa, defina `kLast` como zero (se já não for). Quando este contrato foi escrito, havia um [recurso de reembolso de gás](https://eips.ethereum.org/EIPS/eip-3298) que incentivava os contratos a reduzir o tamanho geral do estado do Ethereum zerando o armazenamento de que não precisavam.
Este código obtém esse reembolso quando possível.

#### Funções Acessíveis Externamente {#uniswapv2erc20}

Observe que, embora qualquer transação ou contrato _possa_ chamar essas funções, elas são projetadas para serem chamadas a partir do contrato de periferia. Se você chamá-las diretamente, não conseguirá enganar a troca de pares, mas poderá perder valor por meio de um erro.

##### mint {#periphery-contracts}

```solidity
    // esta função de baixo nível deve ser chamada por um contrato que realiza verificações de segurança importantes
    function mint(address to) external lock returns (uint liquidity) {
```

Esta função é chamada quando um provedor de liquidez adiciona liquidez ao pool. Ela cunha tokens de liquidez adicionais como recompensa. Ela deve ser chamada de [um contrato de periferia](#uniswapv2router02) que a chama após adicionar a liquidez na mesma transação (para que ninguém mais possa enviar uma transação que reivindique a nova liquidez antes do proprietário legítimo).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // economia de gás
```

Esta é a maneira de ler os resultados de uma função Solidity que retorna vários valores. Descartamos os últimos valores retornados, o timestamp do bloco, porque não precisamos dele.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Obtenha os saldos atuais e veja quanto foi adicionado de cada tipo de token.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Calcule as taxas de protocolo a serem cobradas, se houver, e cunhe tokens de liquidez de acordo. Como os parâmetros para `_mintFee` são os valores de reserva antigos, a taxa é calculada com precisão com base apenas nas alterações do pool devido a taxas.

```solidity
        uint _totalSupply = totalSupply; // economia de gás, deve ser definido aqui já que totalSupply pode ser atualizado em _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // bloquear permanentemente os primeiros MINIMUM_LIQUIDITY tokens
```

Se este for o primeiro depósito, crie `MINIMUM_LIQUIDITY` tokens e envie-os para o endereço zero para bloqueá-los. Eles nunca podem ser resgatados, o que significa que o pool nunca será esvaziado completamente (isso nos salva da divisão por zero em alguns lugares). O valor de `MINIMUM_LIQUIDITY` é mil, o que, considerando que a maioria dos ERC-20 são subdivididos em unidades de 10^-18 de um token, assim como o ETH é dividido em Wei, é 10^-15 do valor de um único token. Não é um custo alto.

No momento do primeiro depósito, não sabemos o valor relativo dos dois tokens, então apenas multiplicamos os valores e extraímos a raiz quadrada, assumindo que o depósito nos fornece valor igual em ambos os tokens.

Podemos confiar nisso porque é do interesse do depositante fornecer valor igual, para evitar perder valor para a arbitragem.
Digamos que o valor dos dois tokens seja idêntico, mas nosso depositante depositou quatro vezes mais **Token1** do que **Token0**. Um trader pode usar o fato de que a troca de pares acha que o **Token0** é mais valioso para extrair valor dele.

| Evento                                                       | reserve0 | reserve1 | reserve0 \* reserve1 | Valor do pool (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | --------------------------------------: |
| Configuração inicial                                         |        8 |       32 |                  256 |                                      40 |
| Trader deposita 8 tokens **Token0**, recebe de volta 16 **Token1** |       16 |       16 |                  256 |                                      32 |

Como você pode ver, o trader ganhou 8 tokens extras, que vêm de uma redução no valor do pool, prejudicando o depositante que o possui.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

A cada depósito subsequente, já sabemos a taxa de câmbio entre os dois ativos e esperamos que os provedores de liquidez forneçam valor igual em ambos. Se não o fizerem, damos a eles tokens de liquidez com base no menor valor que forneceram como punição.

Seja o depósito inicial ou um subsequente, o número de tokens de liquidez que fornecemos é igual à raiz quadrada da alteração em `reserve0*reserve1` e o valor do token de liquidez não muda (a menos que recebamos um depósito que não tenha valores iguais de ambos os tipos, caso em que a "multa" é distribuída). Aqui está outro exemplo com dois tokens que têm o mesmo valor, com três depósitos bons e um ruim (depósito de apenas um tipo de token, portanto, não produz nenhum token de liquidez).

| Evento                    | reserve0 | reserve1 | reserve0 \* reserve1 | Valor do pool (reserve0 + reserve1) | Tokens de liquidez cunhados para este depósito | Total de tokens de liquidez | valor de cada token de liquidez |
| ------------------------- | -------: | -------: | -------------------: | -------------------------------: | ---------------------------------------: | ---------------------: | ----------------------------: |
| Configuração inicial      |    8.000 |    8.000 |                   64 |                           16.000 |                                        8 |                      8 |                         2.000 |
| Depósito de quatro de cada tipo |   12.000 |   12.000 |                  144 |                           24.000 |                                        4 |                     12 |                         2.000 |
| Depósito de dois de cada tipo |   14.000 |   14.000 |                  196 |                           28.000 |                                        2 |                     14 |                         2.000 |
| Depósito de valor desigual |   18.000 |   14.000 |                  252 |                           32.000 |                                        0 |                     14 |                        ~2.286 |
| Após arbitragem           |  ~15.874 |  ~15.874 |                  252 |                          ~31.748 |                                        0 |                     14 |                        ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Use a função `UniswapV2ERC20._mint` para realmente criar os tokens de liquidez adicionais e entregá-los à conta correta.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 e reserve1 estão atualizados
        emit Mint(msg.sender, amount0, amount1);
    }
```

Atualize as variáveis de estado (`reserve0`, `reserve1` e, se necessário, `kLast`) e emita o evento apropriado.

##### burn {#uniswapv2router01}

```solidity
    // esta função de baixo nível deve ser chamada por um contrato que realiza verificações de segurança importantes
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Esta função é chamada quando a liquidez é sacada e os tokens de liquidez apropriados precisam ser queimados.
Ela também deve ser chamada [de uma conta de periferia](#uniswapv2router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // economia de gás
        address _token0 = token0;                                // economia de gás
        address _token1 = token1;                                // economia de gás
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

O contrato de periferia transferiu a liquidez a ser queimada para este contrato antes da chamada. Dessa forma, sabemos quanta liquidez queimar e podemos garantir que ela seja queimada.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // economia de gás, deve ser definido aqui já que totalSupply pode ser atualizado em _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // usar saldos garante distribuição pro-rata
        amount1 = liquidity.mul(balance1) / _totalSupply; // usar saldos garante distribuição pro-rata
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

O provedor de liquidez recebe valor igual de ambos os tokens. Dessa forma, não alteramos a taxa de câmbio.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 e reserve1 estão atualizados
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

O restante da função `burn` é a imagem espelhada da função `mint` acima.

##### swap {#uniswapv2router02}

```solidity
    // esta função de baixo nível deve ser chamada por um contrato que realiza verificações de segurança importantes
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Esta função também deve ser chamada de [um contrato de periferia](#uniswapv2router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // economia de gás
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // escopo para _token{0,1}, evita erros de stack too deep
```

Variáveis locais podem ser armazenadas na memória ou, se não houver muitas delas, diretamente na pilha (stack).
Se pudermos limitar o número para usarmos a pilha, usaremos menos gás. Para mais detalhes, consulte [o yellow paper, as especificações formais do Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), p. 26, equação 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // transferir tokens de forma otimista
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // transferir tokens de forma otimista
```

Esta transferência é otimista, porque transferimos antes de termos certeza de que todas as condições foram atendidas. Isso é aceitável no Ethereum porque, se as condições não forem atendidas mais tarde na chamada, nós a revertemos e quaisquer alterações que ela tenha criado.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informe o receptor sobre a troca, se solicitado.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Obtenha os saldos atuais. O contrato de periferia nos envia os tokens antes de nos chamar para a troca. Isso torna mais fácil para o contrato verificar se não está sendo enganado, uma verificação que _tem_ que acontecer no contrato principal (porque podemos ser chamados por outras entidades além do nosso contrato de periferia).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // escopo para reserve{0,1}Adjusted, evita erros de stack too deep
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Esta é uma verificação de sanidade para garantir que não percamos com a troca. Não há circunstância em que uma troca deva reduzir `reserve0*reserve1`. É também aqui que garantimos que uma taxa de 0,3% está sendo enviada na troca; antes de verificar a sanidade do valor de K, multiplicamos ambos os saldos por 1000 subtraídos pelos valores multiplicados por 3, isso significa que 0,3% (3/1000 = 0,003 = 0,3%) está sendo deduzido do saldo antes de comparar seu valor K com o valor K das reservas atuais.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Atualize `reserve0` e `reserve1` e, se necessário, os acumuladores de preço e o timestamp e emita um evento.

##### Sync ou Skim {#add-liquidity}

É possível que os saldos reais fiquem fora de sincronização com as reservas que a troca de pares acha que tem.
Não há como sacar tokens sem o consentimento do contrato, mas os depósitos são uma questão diferente. Uma conta pode transferir tokens para a troca sem chamar `mint` ou `swap`.

Nesse caso, existem duas soluções:

- `sync`, atualize as reservas para os saldos atuais
- `skim`, saque o valor extra. Observe que qualquer conta tem permissão para chamar `skim` porque não sabemos quem depositou os tokens. Esta informação é emitida em um evento, mas os eventos não são acessíveis a partir da blockchain.

```solidity
    // forçar os saldos a corresponderem às reservas
    function skim(address to) external lock {
        address _token0 = token0; // economia de gás
        address _token1 = token1; // economia de gás
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // forçar as reservas a corresponderem aos saldos
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#remove-liquidity}

[Este contrato](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) cria as trocas de pares.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Essas variáveis de estado são necessárias para implementar a taxa de protocolo (consulte o [whitepaper](https://app.uniswap.org/whitepaper.pdf), p. 5).
O endereço `feeTo` acumula os tokens de liquidez para a taxa de protocolo, e `feeToSetter` é o endereço com permissão para alterar `feeTo` para um endereço diferente.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Essas variáveis mantêm o controle dos pares, as trocas entre dois tipos de token.

A primeira, `getPair`, é um mapeamento que identifica um contrato de troca de pares com base nos dois tokens ERC-20 que ele troca. Os tokens ERC-20 são identificados pelos endereços dos contratos que os implementam, portanto, as chaves e o valor são todos endereços. Para obter o endereço da troca de pares que permite converter de `tokenA` para `tokenB`, você usa `getPair[<tokenA address>][<tokenB address>]` (ou vice-versa).

A segunda variável, `allPairs`, é um array que inclui todos os endereços de trocas de pares criadas por esta fábrica. No Ethereum, você não pode iterar sobre o conteúdo de um mapeamento ou obter uma lista de todas as chaves, portanto, essa variável é a única maneira de saber quais trocas essa fábrica gerencia.

Nota: O motivo pelo qual você não pode iterar sobre todas as chaves de um mapeamento é que o armazenamento de dados do contrato é _caro_, portanto, quanto menos o usarmos, melhor, e quanto menos o alterarmos, melhor. Você pode criar [mapeamentos que suportam iteração](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), mas eles exigem armazenamento extra para uma lista de chaves. Na maioria das aplicações, você não precisa disso.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Este evento é emitido quando uma nova troca de pares é criada. Ele inclui os endereços dos tokens, o endereço da troca de pares e o número total de trocas gerenciadas pela fábrica.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

A única coisa que o construtor faz é especificar o `feeToSetter`. As fábricas começam sem uma taxa, e apenas `feeSetter` pode mudar isso.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Esta função retorna o número de pares de troca.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Esta é a função principal da fábrica, para criar uma troca de pares entre dois tokens ERC-20. Observe que qualquer pessoa pode chamar esta função. Você não precisa de permissão do Uniswap para criar uma nova troca de pares.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Queremos que o endereço da nova troca seja determinístico, para que possa ser calculado antecipadamente offchain (isso pode ser útil para [transações da camada 2 (l2)](/developers/docs/scaling/)).
Para fazer isso, precisamos ter uma ordem consistente dos endereços de token, independentemente da ordem em que os recebemos, então os classificamos aqui.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // uma única verificação é suficiente
```

Grandes pools de liquidez são melhores do que os pequenos, porque têm preços mais estáveis. Não queremos ter mais de um único pool de liquidez por par de tokens. Se já existe uma troca, não há necessidade de criar outra para o mesmo par.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Para criar um novo contrato, precisamos do código que o cria (tanto a função do construtor quanto o código que grava na memória o bytecode da EVM do contrato real). Normalmente, no Solidity, usamos apenas `addr = new <name of contract>(<constructor parameters>)` e o compilador cuida de tudo para nós, mas para ter um endereço de contrato determinístico, precisamos usar [o código de operação CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Quando este código foi escrito, esse código de operação ainda não era suportado pelo Solidity, então foi necessário obter o código manualmente. Isso não é mais um problema, porque [o Solidity agora suporta CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Quando um código de operação ainda não é suportado pelo Solidity, podemos chamá-lo usando [assembly inline](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Chame a função `initialize` para informar à nova troca quais dois tokens ela troca.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // preencher o mapeamento na direção reversa
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Salve as informações do novo par nas variáveis de estado e emita um evento para informar o mundo sobre a nova troca de pares.

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

Essas duas funções permitem que `feeSetter` controle o destinatário da taxa (se houver) e altere `feeSetter` para um novo endereço.

### UniswapV2ERC20.sol {#trade}

[Este contrato](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementa o token de liquidez ERC-20. Ele é semelhante ao [contrato ERC-20 do OpenZeppelin](/developers/tutorials/erc20-annotated-code), então explicarei apenas a parte que é diferente, a funcionalidade `permit`.

As transações no Ethereum custam ether (ETH), que é equivalente a dinheiro real. Se você tem tokens ERC-20, mas não tem ETH, não pode enviar transações, então não pode fazer nada com eles. Uma solução para evitar esse problema são as [meta-transações](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
O proprietário dos tokens assina uma transação que permite que outra pessoa saque tokens offchain e a envia pela Internet para o destinatário. O destinatário, que possui ETH, envia a permissão em nome do proprietário.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Este hash é o [identificador para o tipo de transação](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). O único que suportamos aqui é `Permit` com esses parâmetros.

```solidity
    mapping(address => uint) public nonces;
```

Não é viável para um destinatário falsificar uma assinatura digital. No entanto, é trivial enviar a mesma transação duas vezes (esta é uma forma de [ataque de repetição](https://wikipedia.org/wiki/Replay_attack)). Para evitar isso, usamos um [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Se o nonce de um novo `Permit` não for um a mais do que o último usado, assumimos que é inválido.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Este é o código para recuperar o [identificador da cadeia](https://chainid.network/). Ele usa um dialeto de assembly da EVM chamado [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Observe que na versão atual do Yul você deve usar `chainid()`, não `chainid`.

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

Calcule o [separador de domínio](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) para o EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Esta é a função que implementa as permissões. Ela recebe como parâmetros os campos relevantes e os três valores escalares para [a assinatura](https://yos.io/2018/11/16/ethereum-signatures/) (v, r e s).

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

`abi.encodePacked(...)` é a mensagem que esperamos receber. Sabemos qual deve ser o nonce, então não há necessidade de obtê-lo como parâmetro.

O algoritmo de assinatura do Ethereum espera obter 256 bits para assinar, então usamos a função de hash `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

A partir do digest e da assinatura, podemos obter o endereço que o assinou usando [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Se tudo estiver OK, trate isso como [um aprovar ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Os Contratos Periféricos {#uniswapv2migrator}

Os contratos periféricos são a API (Interface de Programação de Aplicações) para o Uniswap. Eles estão disponíveis para chamadas externas, seja de outros contratos ou de aplicações descentralizadas (dapps). Você poderia chamar os contratos principais diretamente, mas isso é mais complicado e você pode perder valor se cometer um erro. Os contratos principais contêm apenas testes para garantir que não sejam enganados, e não verificações de sanidade para mais ninguém. Essas verificações estão na periferia para que possam ser atualizadas conforme necessário.

### UniswapV2Router01.sol {#libraries}

[Este contrato](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) tem problemas e [não deve mais ser usado](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Felizmente, os contratos periféricos não mantêm estado e não retêm nenhum ativo, então é fácil descontinuá-lo e sugerir que as pessoas usem o substituto, `UniswapV2Router02`, em vez disso.

### UniswapV2Router02.sol {#math}

Na maioria dos casos, você usaria o Uniswap por meio [deste contrato](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Você pode ver como usá-lo [aqui](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

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

A maioria destes nós já encontramos antes, ou são bastante óbvios. A única exceção é `IWETH.sol`. O Uniswap v2 permite trocas para qualquer par de tokens ERC-20, mas o próprio ether (ETH) não é um token ERC-20. Ele antecede o padrão e é transferido por mecanismos únicos. Para permitir o uso de ETH em contratos que se aplicam a tokens ERC-20, as pessoas criaram o contrato de [ether empacotado (weth)](https://weth.tkn.eth.limo/). Você envia ETH para este contrato, e ele cunha uma quantidade equivalente de WETH para você. Ou você pode queimar WETH e receber ETH de volta.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

O roteador precisa saber qual fábrica usar e, para transações que exigem WETH, qual contrato WETH usar. Esses valores são [imutáveis](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), o que significa que só podem ser definidos no construtor. Isso dá aos usuários a confiança de que ninguém seria capaz de alterá-los para apontar para contratos menos honestos.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Este modificador garante que transações com limite de tempo ("faça X antes do tempo Y, se puder") não ocorram após o seu limite de tempo.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

O construtor apenas define as variáveis de estado imutáveis.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // aceitar ETH apenas via fallback do contrato WETH
    }
```

Esta função é chamada quando resgatamos tokens do contrato WETH de volta para ETH. Apenas o contrato WETH que usamos está autorizado a fazer isso.

#### Adicionar Liquidez {#fixedpoint}

Essas funções adicionam tokens à troca do par, o que aumenta o pool de liquidez.

```solidity

    // **** ADICIONAR LIQUIDEZ ****
    function _addLiquidity(
```

Esta função é usada para calcular a quantidade de tokens A e B que devem ser depositados na troca do par.

```solidity
        address tokenA,
        address tokenB,
```

Estes são os endereços dos contratos de token ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Estas são as quantias que o provedor de liquidez deseja depositar. Elas também são as quantias máximas de A e B a serem depositadas.

```solidity
        uint amountAMin,
        uint amountBMin
```

Estas são as quantias mínimas aceitáveis para depósito. Se a transação não puder ocorrer com essas quantias ou mais, reverta-a. Se você não quiser esse recurso, basta especificar zero.

Os provedores de liquidez especificam um mínimo, normalmente, porque desejam limitar a transação a uma taxa de câmbio próxima à atual. Se a taxa de câmbio flutuar muito, pode significar notícias que alteram os valores subjacentes, e eles querem decidir manualmente o que fazer.

Por exemplo, imagine um caso em que a taxa de câmbio é de um para um e o provedor de liquidez especifica estes valores:

| Parâmetro      | Valor |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Enquanto a taxa de câmbio permanecer entre 0,9 e 1,25, a transação ocorre. Se a taxa de câmbio sair dessa faixa, a transação é cancelada.

O motivo dessa precaução é que as transações não são imediatas, você as envia e, eventualmente, um validador as incluirá em um bloco (a menos que o preço do gás seja muito baixo, caso em que você precisará enviar outra transação com o mesmo nonce e um preço do gás mais alto para substituí-la). Você não pode controlar o que acontece durante o intervalo entre o envio e a inclusão.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

A função retorna as quantias que o provedor de liquidez deve depositar para ter uma proporção igual à proporção atual entre as reservas.

```solidity
        // criar o par se ele ainda não existir
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Se ainda não houver uma troca para este par de tokens, crie-a.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Obtenha as reservas atuais no par.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Se as reservas atuais estiverem vazias, então esta é uma nova troca de par. As quantias a serem depositadas devem ser exatamente as mesmas que o provedor de liquidez deseja fornecer.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Se precisarmos ver quais serão as quantias, obtemos a quantia ideal usando [esta função](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Queremos a mesma proporção que as reservas atuais.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Se `amountBOptimal` for menor que a quantia que o provedor de liquidez deseja depositar, significa que o token B é mais valioso atualmente do que o depositante de liquidez pensa, portanto, uma quantia menor é necessária.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Se a quantia ideal de B for maior que a quantia desejada de B, significa que os tokens B são menos valiosos atualmente do que o depositante de liquidez pensa, portanto, uma quantia maior é necessária. No entanto, a quantia desejada é um máximo, então não podemos fazer isso. Em vez disso, calculamos o número ideal de tokens A para a quantia desejada de tokens B.

Juntando tudo, obtemos este gráfico. Suponha que você esteja tentando depositar mil tokens A (linha azul) e mil tokens B (linha vermelha). O eixo x é a taxa de câmbio, A/B. Se x=1, eles têm valor igual e você deposita mil de cada. Se x=2, A tem o dobro do valor de B (você recebe dois tokens B para cada token A), então você deposita mil tokens B, mas apenas 500 tokens A. Se x=0,5, a situação se inverte, mil tokens A e quinhentos tokens B.

![Graph](liquidityProviderDeposit.png)

Você poderia depositar liquidez diretamente no contrato principal (usando [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), mas o contrato principal apenas verifica se ele próprio não está sendo enganado, então você corre o risco de perder valor se a taxa de câmbio mudar entre o momento em que você envia sua transação e o momento em que ela é executada. Se você usar o contrato periférico, ele calcula a quantia que você deve depositar e a deposita imediatamente, para que a taxa de câmbio não mude e você não perca nada.

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

Esta função pode ser chamada por uma transação para depositar liquidez. A maioria dos parâmetros é a mesma de `_addLiquidity` acima, com duas exceções:

. `to` é o endereço que recebe os novos tokens de liquidez cunhados para mostrar a parte do provedor de liquidez no pool
. `deadline` é um limite de tempo para a transação

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Calculamos as quantias a serem realmente depositadas e, em seguida, encontramos o endereço do pool de liquidez. Para economizar gás, não fazemos isso perguntando à fábrica, mas usando a função da biblioteca `pairFor` (veja abaixo em bibliotecas)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Transfira as quantias corretas de tokens do usuário para a troca do par.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

Em troca, dê ao endereço `to` tokens de liquidez pela propriedade parcial do pool. A função `mint` do contrato principal vê quantos tokens extras ele tem (em comparação com o que tinha na última vez que a liquidez mudou) e cunha liquidez de acordo.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Quando um provedor de liquidez deseja fornecer liquidez a uma troca de par Token/ETH, existem algumas diferenças. O contrato lida com o empacotamento do ETH para o provedor de liquidez. Não há necessidade de especificar quantos ETH o usuário deseja depositar, porque o usuário simplesmente os envia com a transação (a quantia está disponível em `msg.value`).

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

Para depositar o ETH, o contrato primeiro o empacota em WETH e depois transfere o WETH para o par. Observe que a transferência está envolvida em um `assert`. Isso significa que, se a transferência falhar, a chamada deste contrato também falhará e, portanto, o empacotamento não acontecerá de fato.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // reembolsar o dust de eth, se houver
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

O usuário já nos enviou o ETH, então se sobrar algum extra (porque o outro token é menos valioso do que o usuário pensava), precisamos emitir um reembolso.

#### Remover Liquidez {#uniswapv2library}

Essas funções removerão a liquidez e pagarão de volta ao provedor de liquidez.

```solidity
    // **** REMOVER LIQUIDEZ ****
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

O caso mais simples de remoção de liquidez. Há uma quantia mínima de cada token que o provedor de liquidez concorda em aceitar, e isso deve acontecer antes do prazo.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // enviar liquidez para o par
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

A função `burn` do contrato principal lida com o pagamento dos tokens de volta ao usuário.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Quando uma função retorna vários valores, mas estamos interessados apenas em alguns deles, é assim que obtemos apenas esses valores. É um pouco mais barato em termos de gás do que ler um valor e nunca usá-lo.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Traduza as quantias da forma como o contrato principal as retorna (token de endereço mais baixo primeiro) para a forma como o usuário as espera (correspondendo a `tokenA` e `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Não há problema em fazer a transferência primeiro e depois verificar se é legítima, porque se não for, reverteremos todas as mudanças de estado.

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

Remover liquidez para ETH é quase o mesmo, exceto que recebemos os tokens WETH e depois os resgatamos por ETH para devolver ao provedor de liquidez.

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

Essas funções retransmitem metatransações para permitir que usuários sem ether saquem do pool, usando [o mecanismo de permissão](#uniswapv2erc20).

```solidity

    // **** REMOVER LIQUIDEZ (suportando tokens com taxa na transferência) ****
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

Esta função pode ser usada para tokens que possuem taxas de transferência ou armazenamento. Quando um token tem tais taxas, não podemos confiar na função `removeLiquidity` para nos dizer quanto do token recebemos de volta, então precisamos sacar primeiro e depois obter o saldo.

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

A função final combina taxas de armazenamento com metatransações.

#### Negociação {#transfer-helper}

```solidity
    // **** SWAP ****
    // exige que o valor inicial já tenha sido enviado para o primeiro par
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Esta função realiza o processamento interno necessário para as funções que são expostas aos negociadores.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Enquanto escrevo isso, existem [388.160 tokens ERC-20](https://eth.blockscout.com/tokens). Se houvesse uma troca de par para cada par de tokens, seriam mais de 150 bilhões de trocas de pares. Toda a cadeia, no momento, [tem apenas 0,1% desse número de contas](https://eth.blockscout.com/stats/accountsGrowth). Em vez disso, as funções de troca suportam o conceito de um caminho. Um negociador pode trocar A por B, B por C e C por D, portanto, não há necessidade de uma troca direta de par A-D.

Os preços nesses mercados tendem a ser sincronizados, porque quando estão fora de sincronia, cria-se uma oportunidade de arbitragem. Imagine, por exemplo, três tokens, A, B e C. Existem três trocas de pares, uma para cada par.

1. A situação inicial
2. Um negociador vende 24,695 tokens A e recebe 25,305 tokens B.
3. O negociador vende 24,695 tokens B por 25,305 tokens C, mantendo aproximadamente 0,61 tokens B como lucro.
4. Em seguida, o negociador vende 24,695 tokens C por 25,305 tokens A, mantendo aproximadamente 0,61 tokens C como lucro. O negociador também tem 0,61 tokens A extras (os 25,305 com os quais o negociador termina, menos o investimento original de 24,695).

| Passo | Troca A-B                   | Troca B-C                   | Troca A-C                   |
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

Obtenha o par que estamos manipulando no momento, classifique-o (para uso com o par) e obtenha a quantia de saída esperada.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Obtenha as quantias de saída esperadas, classificadas da forma como a troca do par espera que sejam.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Esta é a última troca? Se sim, envie os tokens recebidos pela negociação para o destino. Se não, envie-os para a próxima troca de par.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Na verdade, chame a troca do par para trocar os tokens. Não precisamos de um retorno de chamada (callback) para sermos informados sobre a troca, então não enviamos nenhum byte nesse campo.

```solidity
    function swapExactTokensForTokens(
```

Esta função é usada diretamente pelos negociadores para trocar um token por outro.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Este parâmetro contém os endereços dos contratos ERC-20. Como explicado acima, este é um array porque você pode precisar passar por várias trocas de pares para ir do ativo que você tem para o ativo que você deseja.

Um parâmetro de função em Solidity pode ser armazenado em `memory` ou em `calldata`. Se a função for um ponto de entrada para o contrato, chamada diretamente por um usuário (usando uma transação) ou de um contrato diferente, o valor do parâmetro pode ser obtido diretamente dos dados de chamada. Se a função for chamada internamente, como `_swap` acima, os parâmetros devem ser armazenados em `memory`. Da perspectiva do contrato chamado, `calldata` é somente leitura.

Com tipos escalares como `uint` ou `address`, o compilador lida com a escolha de armazenamento para nós, mas com arrays, que são mais longos e mais caros, nós especificamos o tipo de armazenamento a ser usado.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Os valores de retorno são sempre retornados na memória.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Calcule a quantia a ser comprada em cada troca. Se o resultado for menor que o mínimo que o negociador está disposto a aceitar, reverta a transação.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Por fim, transfira o token ERC-20 inicial para a conta da primeira troca de par e chame `_swap`. Tudo isso está acontecendo na mesma transação, então a troca do par sabe que quaisquer tokens inesperados fazem parte desta transferência.

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

A função anterior, `swapTokensForTokens`, permite que um negociador especifique um número exato de tokens de entrada que ele está disposto a dar e o número mínimo de tokens de saída que ele está disposto a receber em troca. Esta função faz a troca inversa, ela permite que um negociador especifique o número de tokens de saída que ele deseja e o número máximo de tokens de entrada que ele está disposto a pagar por eles.

Em ambos os casos, o negociador deve primeiro dar a este contrato periférico uma permissão para permitir que ele os transfira.

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
        // reembolsar o dust de eth, se houver
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Todas essas quatro variantes envolvem negociação entre ETH e tokens. A única diferença é que ou recebemos ETH do negociador e o usamos para cunhar WETH, ou recebemos WETH da última troca no caminho e o queimamos, enviando de volta ao negociador o ETH resultante.

```solidity
    // **** SWAP (suportando tokens com taxa na transferência) ****
    // exige que o valor inicial já tenha sido enviado para o primeiro par
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Esta é a função interna para trocar tokens que possuem taxas de transferência ou armazenamento para resolver ([este problema](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // escopo para evitar erros de stack too deep
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Devido às taxas de transferência, não podemos confiar na função `getAmountsOut` para nos dizer quanto obtemos de cada transferência (da forma como fazemos antes de chamar a `_swap` original). Em vez disso, temos que transferir primeiro e depois ver quantos tokens recebemos de volta.

Nota: Em teoria, poderíamos apenas usar esta função em vez de `_swap`, mas em certos casos (por exemplo, se a transferência acabar sendo revertida porque não há o suficiente no final para atingir o mínimo exigido) isso acabaria custando mais gás. Tokens com taxa de transferência são bastante raros, então, embora precisemos acomodá-los, não há necessidade de todas as trocas assumirem que passam por pelo menos um deles.

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

Estas são as mesmas variantes usadas para tokens normais, mas elas chamam `_swapSupportingFeeOnTransferTokens` em vez disso.

```solidity
    // **** FUNÇÕES DA BIBLIOTECA ****
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

Essas funções são apenas proxies que chamam as [funções da UniswapV2Library](#uniswapv2library).

### UniswapV2Migrator.sol {#conclusion}

Este contrato foi usado para migrar trocas da antiga v1 para a v2. Agora que elas foram migradas, ele não é mais relevante.

## As bibliotecas

A [biblioteca SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) está bem documentada, então não há necessidade de documentá-la aqui.

### Math

Esta biblioteca contém algumas funções matemáticas que normalmente não são necessárias no código Solidity, por isso não fazem parte da linguagem.

```solidity
pragma solidity =0.5.16;

// uma biblioteca para realizar várias operações matemáticas

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // método babilônico (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Comece com x como uma estimativa que é maior que a raiz quadrada (essa é a razão pela qual precisamos tratar 1-3 como casos especiais).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Obtenha uma estimativa mais próxima, a média da estimativa anterior e o número cuja raiz quadrada estamos tentando encontrar dividido pela estimativa anterior. Repita até que a nova estimativa não seja menor que a existente. Para mais detalhes, [veja aqui](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Nunca deveríamos precisar da raiz quadrada de zero. As raízes quadradas de um, dois e três são aproximadamente um (usamos números inteiros, então ignoramos a fração).

```solidity
        }
    }
}
```

### Frações de ponto fixo (UQ112x112)

Esta biblioteca lida com frações, que normalmente não fazem parte da aritmética do Ethereum. Ela faz isso codificando o número _x_ como _x\*2^112_. Isso nos permite usar os códigos de operação originais de adição e subtração sem alterações.

```solidity
pragma solidity =0.5.16;

// uma biblioteca para lidar com números de ponto fixo binário (https://wikipedia.org/wiki/Q_(number_format))

// intervalo: [0, 2**112 - 1]
// resolução: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` é a codificação para um.

```solidity
    // codificar um uint112 como um UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // nunca sofre overflow
    }
```

Como y é `uint112`, o máximo que pode ser é 2^112-1. Esse número ainda pode ser codificado como um `UQ112x112`.

```solidity
    // divide um UQ112x112 por um uint112, retornando um UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Se dividirmos dois valores `UQ112x112`, o resultado não é mais multiplicado por 2^112. Então, em vez disso, pegamos um número inteiro para o denominador. Teríamos precisado usar um truque semelhante para fazer a multiplicação, mas não precisamos fazer a multiplicação de valores `UQ112x112`.

### UniswapV2Library

Esta biblioteca é usada apenas pelos contratos de periferia

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // retorna endereços de tokens ordenados, usado para lidar com valores de retorno de pares ordenados nesta ordem
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Classifique os dois tokens por endereço, para que possamos obter o endereço da troca de pares para eles. Isso é necessário porque, de outra forma, teríamos duas possibilidades, uma para os parâmetros A,B e outra para os parâmetros B,A, levando a duas trocas em vez de uma.

```solidity
    // calcula o endereço CREATE2 para um par sem fazer nenhuma chamada externa
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // hash do código de inicialização
            ))));
    }
```

Esta função calcula o endereço da troca de pares para os dois tokens. Este contrato é criado usando [o código de operação CREATE2](https://eips.ethereum.org/EIPS/eip-1014), então podemos calcular o endereço usando o mesmo algoritmo se soubermos os parâmetros que ele usa. Isso é muito mais barato do que perguntar à fábrica, e

```solidity
    // busca e ordena as reservas para um par
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Esta função retorna as reservas dos dois tokens que a troca de pares possui. Observe que ela pode receber os tokens em qualquer ordem e os classifica para uso interno.

```solidity
    // dado um valor de um ativo e as reservas do par, retorna um valor equivalente do outro ativo
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Esta função fornece a quantidade do token B que você receberá em troca do token A se não houver taxa envolvida. Este cálculo leva em consideração que a transferência altera a taxa de câmbio.

```solidity
    // dado um valor de entrada de um ativo e as reservas do par, retorna o valor máximo de saída do outro ativo
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

A função `quote` acima funciona muito bem se não houver taxa para usar a troca de pares. No entanto, se houver uma taxa de câmbio de 0,3%, o valor que você realmente recebe é menor. Esta função calcula o valor após a taxa de câmbio.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

O Solidity não lida com frações nativamente, então não podemos simplesmente multiplicar o valor por 0,997. Em vez disso, multiplicamos o numerador por 997 e o denominador por 1000, alcançando o mesmo efeito.

```solidity
    // dado um valor de saída de um ativo e as reservas do par, retorna um valor de entrada necessário do outro ativo
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Esta função faz aproximadamente a mesma coisa, mas obtém o valor de saída e fornece a entrada.

```solidity

    // realiza cálculos encadeados de getAmountOut em qualquer número de pares
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // realiza cálculos encadeados de getAmountIn em qualquer número de pares
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

Essas duas funções lidam com a identificação dos valores quando é necessário passar por várias trocas de pares.

### Transfer Helper

[Esta biblioteca](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) adiciona verificações de sucesso em torno de transferências ERC-20 e Ethereum para tratar uma reversão e um retorno de valor `false` da mesma maneira.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// métodos auxiliares para interagir com tokens ERC-20 e enviar ETH que não retornam consistentemente true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Podemos chamar um contrato diferente de duas maneiras:

- Usar uma definição de interface para criar uma chamada de função
- Usar a [interface binária de aplicação (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) "manualmente" para criar a chamada. Foi isso que o autor do código decidiu fazer.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Por uma questão de compatibilidade com versões anteriores de tokens que foram criados antes do padrão ERC-20, uma chamada ERC-20 pode falhar ao reverter (nesse caso, `success` é `false`) ou sendo bem-sucedida e retornando um valor `false` (nesse caso, há dados de saída e, se você os decodificar como um booleano, obterá `false`).

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

Esta função implementa a [funcionalidade de transferência do ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), que permite que uma conta gaste a permissão fornecida por uma conta diferente.

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

Esta função implementa a [funcionalidade transferFrom do ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), que permite que uma conta gaste a permissão fornecida por uma conta diferente.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Esta função transfere ether para uma conta. Qualquer chamada para um contrato diferente pode tentar enviar ether. Como não precisamos realmente chamar nenhuma função, não enviamos nenhum dado com a chamada.

## Conclusão

Este é um artigo longo de cerca de 50 páginas. Se você chegou até aqui, parabéns! Espero que agora você tenha entendido as considerações ao escrever um aplicativo da vida real (em oposição a programas de exemplo curtos) e esteja mais apto a escrever contratos para seus próprios casos de uso.

Agora vá e escreva algo útil e nos surpreenda.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).