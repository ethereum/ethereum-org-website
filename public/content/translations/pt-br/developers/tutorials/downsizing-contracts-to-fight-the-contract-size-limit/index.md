---
title: "Reduzindo contratos para combater o limite de tamanho do contrato"
description: "O que você pode fazer para evitar que seus contratos inteligentes fiquem muito grandes?"
author: Markus Waas
lang: pt-br
tags: ["Solidity", "contratos inteligentes", "armazenamento"]
skill: intermediate
breadcrumb: Reduzindo contratos
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## Por que existe um limite? {#why-is-there-a-limit}

Em [22 de novembro de 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon), a bifurcação (hard fork) Spurious Dragon introduziu a [EIP-170](https://eips.ethereum.org/EIPS/eip-170), que adicionou um limite de tamanho de contrato inteligente de 24,576 kb. Para você, como desenvolvedor Solidity, isso significa que, ao adicionar cada vez mais funcionalidades ao seu contrato, em algum momento você atingirá o limite e, ao implantar, verá o erro:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Esse limite foi introduzido para evitar ataques de negação de serviço (DOS). Qualquer chamada a um contrato é relativamente barata em termos de gás. No entanto, o impacto de uma chamada de contrato para os nós da Ethereum aumenta desproporcionalmente dependendo do tamanho do código do contrato chamado (leitura do código do disco, pré-processamento do código, adição de dados à prova de Merkle). Sempre que você tem uma situação em que o invasor exige poucos recursos para causar muito trabalho para os outros, você tem o potencial para ataques DOS.

Originalmente, isso era menos problemático porque um limite natural de tamanho de contrato é o limite de gas do bloco. Obviamente, um contrato deve ser implantado dentro de uma transação que contenha todo o bytecode do contrato. Se você incluir apenas essa transação em um bloco, poderá usar todo esse gás, mas ele não é infinito. Desde a [Atualização London](/ethereum-forks/#london), o limite de gas do bloco pode variar entre 15M e 30M de unidades, dependendo da demanda da rede.

A seguir, veremos alguns métodos ordenados por seu impacto potencial. Pense nisso em termos de perda de peso. A melhor estratégia para alguém atingir seu peso ideal (no nosso caso, 24kb) é focar primeiro nos métodos de grande impacto. Na maioria dos casos, apenas consertar sua dieta o levará até lá, mas às vezes você precisa de um pouco mais. Então você pode adicionar alguns exercícios (médio impacto) ou até mesmo suplementos (pequeno impacto).

## Grande impacto {#big-impact}

### Separe seus contratos {#separate-your-contracts}

Esta deve ser sempre a sua primeira abordagem. Como você pode separar o contrato em vários menores? Geralmente, isso força você a criar uma boa arquitetura para seus contratos. Contratos menores são sempre preferidos do ponto de vista da legibilidade do código. Para dividir contratos, pergunte a si mesmo:

- Quais funções pertencem umas às outras? Cada conjunto de funções pode ser melhor em seu próprio contrato.
- Quais funções não exigem a leitura do estado do contrato ou apenas um subconjunto específico do estado?
- Você pode dividir o armazenamento e a funcionalidade?

### Bibliotecas {#libraries}

Uma maneira simples de afastar o código de funcionalidade do armazenamento é usar uma [biblioteca](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). Não declare as funções da biblioteca como internas, pois elas serão [adicionadas ao contrato](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) diretamente durante a compilação. Mas se você usar funções públicas, elas estarão, de fato, em um contrato de biblioteca separado. Considere [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) para tornar o uso de bibliotecas mais conveniente.

### Proxies {#proxies}

Uma estratégia mais avançada seria um sistema de proxy. As bibliotecas usam `DELEGATECALL` nos bastidores, o que simplesmente executa a função de outro contrato com o estado do contrato chamador. Confira [esta postagem do blog](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) para saber mais sobre sistemas de proxy. Eles oferecem mais funcionalidades, por exemplo, permitem a capacidade de atualização, mas também adicionam muita complexidade. Eu não os adicionaria apenas para reduzir o tamanho dos contratos, a menos que seja sua única opção por qualquer motivo.

## Médio impacto {#medium-impact}

### Remova funções {#remove-functions}

Isso deve ser óbvio. As funções aumentam bastante o tamanho de um contrato.

- **Externas**: Muitas vezes adicionamos muitas funções de visualização (view) por motivos de conveniência. Isso é perfeitamente aceitável até você atingir o limite de tamanho. Então, você pode querer realmente pensar em remover todas, exceto as absolutamente essenciais.
- **Internas**: Você também pode remover funções internas/privadas e simplesmente colocar o código em linha (inline), desde que a função seja chamada apenas uma vez.

### Evite variáveis adicionais {#avoid-additional-variables}

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

Uma mudança simples como essa faz uma diferença de **0,28kb**. É provável que você encontre muitas situações semelhantes em seus contratos e elas podem realmente se somar a quantias significativas.

### Encurte a mensagem de erro {#shorten-error-message}

Mensagens de reversão longas e, em particular, muitas mensagens de reversão diferentes podem inchar o contrato. Em vez disso, use códigos de erro curtos e decodifique-os em seu contrato. Uma mensagem longa pode se tornar muito mais curta:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Use erros personalizados em vez de mensagens de erro {#use-custom-errors-instead-of-error-messages}

Erros personalizados foram introduzidos no [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Eles são uma ótima maneira de reduzir o tamanho de seus contratos, porque são codificados em ABI como seletores (assim como as funções).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Considere um valor de execução baixo no otimizador {#consider-a-low-run-value-in-the-optimizer}

Você também pode alterar as configurações do otimizador. O valor padrão de 200 significa que ele está tentando otimizar o bytecode como se uma função fosse chamada 200 vezes. Se você alterá-lo para 1, basicamente dirá ao otimizador para otimizar para o caso de executar cada função apenas uma vez. Uma função otimizada para ser executada apenas uma vez significa que ela é otimizada para a própria implantação. Esteja ciente de que **isso aumenta os [custos de gás](/developers/docs/gas/) para executar as funções**, então você pode não querer fazer isso.

## Pequeno impacto {#small-impact}

### Evite passar structs para funções {#avoid-passing-structs-to-functions}

Se você estiver usando o [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), pode ajudar não passar structs para uma função. Em vez de passar o parâmetro como um struct, passe os parâmetros necessários diretamente. Neste exemplo, economizamos mais **0,1kb**.

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

### Declare a visibilidade correta para funções e variáveis {#declare-correct-visibility-for-functions-and-variables}

- Funções ou variáveis que são chamadas apenas de fora? Declare-as como `external` em vez de `public`.
- Funções ou variáveis chamadas apenas de dentro do contrato? Declare-as como `private` ou `internal` em vez de `public`.

### Remova modificadores {#remove-modifiers}

Modificadores, especialmente quando usados intensamente, podem ter um impacto significativo no tamanho do contrato. Considere removê-los e, em vez disso, use funções.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Essas dicas devem ajudá-lo a reduzir significativamente o tamanho do contrato. Mais uma vez, não posso enfatizar o suficiente, sempre foque em dividir contratos, se possível, para obter o maior impacto.