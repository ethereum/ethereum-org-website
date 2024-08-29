---
title: "Reduzir contratos para combater o limite de tamanho do contrato"
description: O que você pode fazer para evitar que seus contratos inteligentes fiquem muito grandes?
author: Markus Waas
lang: pt-br
tags:
  - "solidez"
  - "smart contracts"
  - "armazenamento"
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Por que há um limite? {#why-is-there-a-limit}

Em [22 de novembro de 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/) o fork Spurius Dragon introduziu a [EIP-170](https://eips.ethereum.org/EIPS/eip-170) que adicionou um limite de tamanho do contrato inteligente de 24.576 kb. Para você como desenvolvedor de Solidity isso significa que quando você adiciona mais e mais funcionalidade ao seu contrato, em algum momento você alcançará o limite e quando implantado verá o erro:

`Aviso: O código do contrato excede 24576 bytes (um limite introduzido no Dragão Purioso). This contract may not be deployable on Mainnet. Considere habilitar o otimizador (com um valor baixo de "execução"!), desligar as strings de reverter ou usar bibliotecas.`

Este limite foi introduzido para impedir ataques de negação de serviço (DOS). Qualquer apelo a um contrato é relativamente barato. No entanto, o impacto de uma chamada de contrato para os nós da Ethereum aumenta de forma desproporcionada, dependendo do tamanho do código do contrato chamado (lendo o código do disco, pré-processando o código, adicionando dados à prova de Merkle). Sempre que você tiver uma situação em que o agressor requer poucos recursos para causar muito trabalho para os outros, você tem o potencial para ataques DOS.

Originalmente, tratava-se de um problema menor, porque um limite de tamanho natural do contrato é o limite de gas por bloco. Obviamente, um contrato precisa ser implementado dentro de uma transação que tenha todo o bytecode do contrato. Se você incluir apenas essa transação em um bloco, você pode usar todo esse gas, mas não é infinito. Desde a [London Upgrade](/history/#london), o limite de gas de bloco tem sido capaz de variar entre 15M e 30M de unidades, de acordo com a demanda da rede.

A seguir, analisaremos alguns métodos ordenados pelo seu potencial impacto. Pense nisso em termos de perda de peso. A melhor estratégia para alguém atingir o seu peso alvo (no nosso caso 24kb) é concentrar-se primeiro nos grandes métodos de impacto. Na maioria dos casos, só de ajustar a sua dieta já ajudará, mas às vezes é necessário de um pouco mais. Então você pode adicionar algum exercício (impacto médio) ou até suplementos (impacto pequeno).

## Grande impacto {#big-impact}

### Separe os seus contratos {#separate-your-contracts}

Esta deve ser sempre sua primeira abordagem. Como você pode separar o contrato em vários contratos menores? Geralmente isso te força a criar uma boa arquitetura para seus contratos. Os contratos menores são sempre preferidos por uma perspectiva de legibilidade de código. Para dividir contratos, pergunte a si mesmo:

- Quais as funções que devem estar juntas? Cada conjunto de funções pode ser o melhor em seu próprio contrato.
- Que funções não requerem leitura do estado do contrato ou apenas um subconjunto específico do estado?
- Você pode dividir o armazenamento e a funcionalidade?

### Bibliotecas {#libraries}

Uma maneira simples de mover o código de funcionalidade para longe do armazenamento é usando [uma biblioteca](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Não declarar as funções da biblioteca como internas, como essas, serão [adicionadas ao contrato](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) diretamente durante a compilação. Mas se usarmos funções públicas, elas estarão então de fato, num contrato separado de biblioteca. Considere [o uso de](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) para fazer o uso de bibliotecas mais convenientes.

### Proxies {#proxies}

Uma estratégia mais avançada seria um sistema de procuração. As bibliotecas usam `DELEGATECALL` na parte traseira, que simplesmente executa a função de outro contrato com o estado do contrato de chamada. Confira [esta postagem no blog](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) para saber mais sobre sistemas de proxy. Eles lhe dão mais funcionalidade, por exemplo, permitem a atualização, mas também adicionam muita complexidade. Eu não adicionaria aquelas apenas para reduzir os tamanhos dos contratos, a menos que fosse a sua única opção por qualquer motivo.

## Médio impacto {#medium-impact}

### Remover funções {#remove-functions}

Este deveria ser óbvio. Funções aumentam um pouco o tamanho de um contrato.

- **Externo**: Frequentemente adicionamos muitas funções de exibição por motivos de conveniência. Está perfeitamente tudo bem até que você atinja o limite de tamanho. Então talvez queiram realmente pensar na eliminação de todos que não os absolutamente essenciais.
- **Interno**: Você também pode remover funções internas/privadas e simplesmente inserir o código, desde que a função seja chamada apenas uma vez.

### Evitar variáveis adicionais {#avoid-additional-variables}

Uma mudança simples assim:

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

faz diferença de **0.28kb**. Você pode encontrar muitas situações semelhantes nos seus contratos e isso pode realmente somar quantias significativas.

### Encurtar mensagem de erro {#shorten-error-message}

Mensagens de reversão longa e, em particular, muitas mensagens de reversão diferentes podem bloquear o contrato. Em vez disso, use códigos de erro curtos e decodifique-os no contrato. Uma mensagem longa poderia ser muito mais curta:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");

```

```solidity
require(msg.sender == owner, "OW1");
```

### Use erros personalizados ao invés de mensagens de erro

Erros personalizados foram introduzidos no [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Eles são uma ótima maneira de reduzir o tamanho de seus contratos, porque são codificados por ABI como seletores (assim como as funções são).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Considere um valor de baixa execução no otimizador {#consider-a-low-run-value-in-the-optimizer}

Você também pode alterar as configurações do otimizador. O valor padrão de 200 significa que está tentando otimizar o bytecode como se uma função fosse chamada 200 vezes. Se você alterá-lo para 1, basicamente diga ao otimizador para otimizar em caso de executar cada função apenas uma vez. Uma função otimizada para rodar apenas uma vez significa que ela é otimizada para a própria implantação. Esteja ciente de que **isso aumenta o custo do [gás](/developers/docs/gas/) por executar as funções**, então você pode querer não otimizá-la.

## Pequeno impacto {#small-impact}

### Evite passar instruções para funções {#avoid-passing-structs-to-functions}

Se você estiver usando o [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), ele pode ajudar a não passar de structs para uma função. Em vez de passar o parâmetro como uma estrutura...

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

... passe os parâmetros necessários diretamente. Neste exemplo, salvamos outro **0.1kb**.

### Declarar a visibilidade correta para funções e variáveis {#declare-correct-visibility-for-functions-and-variables}

- Funções ou variáveis que são chamadas apenas do lado de fora? Declará-las como `externas` em vez de `públicas`.
- Funções ou variáveis apenas chamadas dentro do contrato? Declará-las como `private` ou `internal` em vez de `public`.

### Remover modificadores {#remove-modifiers}

Os modificadores, especialmente quando usados intencionalmente, podem ter um impacto significativo no tamanho do contrato. Considere removê-los e, em vez disso, usar funções.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Essas dicas devem ajudá-lo a reduzir significativamente o tamanho do contrato. Mais uma vez, nunca é demais salientar que se foca sempre na divisão dos contratos, se possível para o maior impacto.
