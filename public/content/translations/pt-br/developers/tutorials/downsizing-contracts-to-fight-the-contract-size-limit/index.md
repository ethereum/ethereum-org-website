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

Em [22 de novembro de 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon), a bifurcação rígida Spurious Dragon introduziu a [EIP-170](https://eips.ethereum.org/EIPS/eip-170), que adicionou um limite de tamanho de contrato inteligente de 24.576 bytes (24 KiB). Para você, como desenvolvedor Solidity, isso significa que, ao adicionar cada vez mais funcionalidades ao seu contrato, em algum momento você atingirá o limite e o compilador o avisará:

`Warning: Contract code size is 25000 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Há um aviso semelhante para o código de implantação (initcode), que a [EIP-3860](https://eips.ethereum.org/EIPS/eip-3860) limitou a 49.152 bytes na atualização Shanghai.

O limite não é permanente. A [EIP-7954](https://eips.ethereum.org/EIPS/eip-7954) o eleva para 65.536 bytes (64 KiB), e o limite do initcode para 131.072 bytes, e está programada para a [atualização Glamsterdam](/roadmap/glamsterdam/). Até que essa atualização seja ativada na rede em que você faz deploy, 24.576 bytes é o limite lá, e mesmo depois disso, contratos menores continuam sendo mais baratos para implantar e mais fáceis de auditar.

Esse limite foi introduzido para evitar ataques de negação de serviço (DOS). Qualquer chamada a um contrato é relativamente barata em termos de gás. No entanto, o impacto de uma chamada de contrato para os nós da Ethereum aumenta desproporcionalmente dependendo do tamanho do código do contrato chamado (leitura do código do disco, pré-processamento do código, adição de dados à prova de Merkle). Sempre que você tem uma situação em que o invasor exige poucos recursos para causar muito trabalho para os outros, você tem o potencial para ataques DOS.

Originalmente, isso era menos problemático porque um limite natural de tamanho de contrato é o limite de gas do bloco. Obviamente, um contrato deve ser implantado dentro de uma transação que contenha todo o bytecode do contrato. Se você incluir apenas essa transação em um bloco, poderá usar todo esse gás, mas ele não é infinito. Hoje, o limite de gas do bloco é de dezenas de milhões de gás e foi aumentado várias vezes pelos validadores, portanto, por si só, permitiria contratos muito grandes. Desde a [atualização Fusaka](/roadmap/fusaka/), uma única transação também é limitada a 16.777.216 de gás ([EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)), mas isso ainda está bem acima do que custa implantar um contrato de 24 KiB, e é por isso que um limite de tamanho explícito é necessário.

A seguir, veremos alguns métodos ordenados por seu impacto potencial. Pense nisso em termos de perda de peso. A melhor estratégia para alguém atingir seu peso ideal (no nosso caso, 24kb) é focar primeiro nos métodos de grande impacto. Na maioria dos casos, apenas consertar sua dieta o levará lá, mas às vezes você precisa de um pouco mais. Então você pode adicionar alguns exercícios (médio impacto) ou até mesmo suplementos (pequeno impacto).

## Grande impacto {#big-impact}

### Separe seus contratos {#separate-your-contracts}

Esta deve ser sempre a sua primeira abordagem. Como você pode separar o contrato em vários menores? Geralmente, isso força você a criar uma boa arquitetura para seus contratos. Contratos menores são sempre preferidos do ponto de vista da legibilidade do código. Para dividir contratos, pergunte a si mesmo:

- Quais funções pertencem umas às outras? Cada conjunto de funções pode ser melhor em seu próprio contrato.
- Quais funções não exigem a leitura do estado do contrato ou apenas um subconjunto específico do estado?
- Você pode dividir o armazenamento e a funcionalidade?

### Bibliotecas {#libraries}

Uma maneira simples de afastar o código de funcionalidade do armazenamento é usar uma [biblioteca](https://docs.soliditylang.org/en/latest/contracts.html#libraries). Não declare as funções da biblioteca como internas, pois elas serão [adicionadas ao contrato](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) diretamente durante a compilação. Mas se você usar funções públicas, elas estarão, de fato, em um contrato de biblioteca separado. Considere [using for](https://docs.soliditylang.org/en/latest/contracts.html#using-for) para tornar o uso de bibliotecas mais conveniente.

### Proxies {#proxies}

Uma estratégia mais avançada seria um sistema de proxy. As bibliotecas usam `DELEGATECALL` nos bastidores, o que simplesmente executa a função de outro contrato com o estado do contrato chamador. Confira [atualização de contratos inteligentes](/developers/docs/smart-contracts/upgrading/) para saber mais sobre sistemas de proxy. Eles oferecem mais funcionalidades, por exemplo, permitem a capacidade de atualização, mas também adicionam muita complexidade. Eu não os adicionaria apenas para reduzir o tamanho dos contratos, a menos que seja sua única opção por qualquer motivo.

## Médio impacto {#medium-impact}

### Remova funções {#remove-functions}

Isso deve ser óbvio. As funções aumentam bastante o tamanho de um contrato.

- **Externas**: Muitas vezes adicionamos muitas funções de visualização (view) por motivos de conveniência. Isso é perfeitamente aceitável até você atingir o limite de tamanho. Então, você pode querer realmente pensar em remover todas, exceto as absolutamente essenciais.
- **Internas**: Você também pode remover funções internas/privadas e simplesmente colocar o código em linha (inline), desde que a função seja chamada apenas uma vez.

### Evite variáveis adicionais {#avoid-additional-variables}

```solidity
struct MyStruct {
    address addr1;
    address addr2;
}

mapping(uint => MyStruct) myStructs;

function get(uint id) public view returns (address, address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Uma mudança simples como essa fez uma diferença de **0,28kb** quando este artigo foi escrito. A economia exata depende da versão e das configurações do seu compilador (com o Solidity 0.8.37 é cerca de 0,1kb sem o otimizador e muito menos com ele), portanto, sempre meça. É provável que você encontre muitas situações semelhantes em seus contratos e elas podem realmente se somar a quantias significativas.

### Encurte a mensagem de erro {#shorten-error-message}

Mensagens de reversão longas e, em particular, muitas mensagens de reversão diferentes podem inchar o contrato. Em vez disso, use códigos de erro curtos e decodifique-os em seu contrato. Uma mensagem longa pode se tornar muito mais curta:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Use erros personalizados em vez de mensagens de erro {#use-custom-errors-instead-of-error-messages}

Erros personalizados foram introduzidos no [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Eles são uma ótima maneira de reduzir o tamanho de seus contratos, porque são codificados na ABI como seletores (assim como as funções).

```solidity
error Unauthorized();

function doSomething() public view {
    if (msg.sender != owner) {
        revert Unauthorized();
    }
}
```

### Considere um valor de execução baixo no otimizador {#consider-a-low-run-value-in-the-optimizer}

Você também pode alterar as configurações do otimizador. O valor padrão de 200 significa que ele está tentando otimizar o bytecode como se uma função fosse chamada 200 vezes. Se você alterá-lo para 1, basicamente dirá ao otimizador para otimizar para o caso de executar cada função apenas uma vez. Uma função otimizada para ser executada apenas uma vez significa que ela é otimizada para a própria implantação. Esteja ciente de que **isso aumenta os [custos de gás](/developers/docs/gas/) para executar as funções**, então você pode não querer fazer isso. Se você compilar com `viaIR` ativado, verifique o tamanho com e sem ele, pois o gerador de código baseado em IR pode produzir tamanhos de bytecode visivelmente diferentes. Consulte as [opções do otimizador](https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options) para obter detalhes.

## Pequeno impacto {#small-impact}

### Evite passar structs para funções {#avoid-passing-structs-to-functions}

Se você estiver usando o [codificador ABI v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma) (o padrão desde o Solidity 0.8.0), pode ajudar não passar structs para uma função. Em vez de passar o parâmetro como um struct, passe os parâmetros necessários diretamente. Neste exemplo, economizamos mais **0,1kb**.

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id]);
}

function _get(MyStruct memory myStruct) private pure returns (address, address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private pure returns (address, address) {
    return (addr1, addr2);
}
```

### Declare a visibilidade correta para funções e variáveis {#declare-correct-visibility-for-functions-and-variables}

- Funções ou variáveis que são chamadas apenas de fora? Declare-as como `external` em vez de `public`.
- Funções ou variáveis chamadas apenas de dentro do contrato? Declare-as como `private` ou `internal` em vez de `public`.

### Remova modificadores {#remove-modifiers}

Modificadores, especialmente quando usados intensamente, podem ter um impacto significativo no tamanho do contrato. Considere removê-los e, em vez disso, use funções.

```solidity
modifier checkStuff() {
    require(msg.sender == owner, "OW1");
    _;
}

function doSomething() public checkStuff {}
```

```solidity
function checkStuff() private view {
    require(msg.sender == owner, "OW1");
}

function doSomething() public view {
    checkStuff();
}
```

Essas dicas devem ajudá-lo a reduzir significativamente o tamanho do contrato. Mais uma vez, não posso enfatizar o suficiente: sempre foque em dividir os contratos, se possível, para obter o maior impacto.
