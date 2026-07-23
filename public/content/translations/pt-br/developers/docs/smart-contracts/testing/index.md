---
title: Testando contratos inteligentes
description: "Uma visão geral das técnicas e considerações para testar contratos inteligentes no Ethereum."
lang: pt-br
---

Blockchains públicas como o Ethereum são imutáveis, o que torna difícil alterar o código de um contrato inteligente após a implantação. Existem [padrões de atualização de contrato](/developers/docs/smart-contracts/upgrading/) para realizar "atualizações virtuais", mas eles são difíceis de implementar e exigem consenso social. Além disso, uma atualização só pode corrigir um erro _depois_ que ele é descoberto — se um invasor descobrir a vulnerabilidade primeiro, seu contrato inteligente corre o risco de ser explorado.

Por essas razões, testar contratos inteligentes antes de [implantar](/developers/docs/smart-contracts/deploying/) na Mainnet é um requisito mínimo de [segurança](/developers/docs/smart-contracts/security/). Existem muitas técnicas para testar contratos e avaliar a correção do código; o que você escolhe depende das suas necessidades. No entanto, um conjunto de testes composto por diferentes ferramentas e abordagens é ideal para detectar falhas de segurança, tanto menores quanto maiores, no código do contrato.

## Pré-requisitos {#prerequisites}

Esta página explica como testar contratos inteligentes antes de implantar na rede Ethereum. Ela pressupõe que você esteja familiarizado com [contratos inteligentes](/developers/docs/smart-contracts/).

## O que é o teste de contratos inteligentes? {#what-is-smart-contract-testing}

O teste de contratos inteligentes é o processo de verificar se o código de um contrato inteligente funciona conforme o esperado. Os testes são úteis para verificar se um determinado contrato inteligente atende aos requisitos de confiabilidade, usabilidade e segurança.

Embora as abordagens variem, a maioria dos métodos de teste exige a execução de um contrato inteligente com uma pequena amostra dos dados que ele deve manipular. Se o contrato produzir resultados corretos para os dados de amostra, presume-se que ele esteja funcionando corretamente. A maioria das ferramentas de teste fornece recursos para escrever e executar [casos de teste](https://en.m.wikipedia.org/wiki/Test_case) para verificar se a execução de um contrato corresponde aos resultados esperados.

### Por que é importante testar contratos inteligentes? {#importance-of-testing-smart-contracts}

Como os contratos inteligentes frequentemente gerenciam ativos financeiros de alto valor, pequenos erros de programação podem e frequentemente levam a [perdas massivas para os usuários](https://rekt.news/leaderboard/). Testes rigorosos podem, no entanto, ajudar você a descobrir defeitos e problemas no código de um contrato inteligente precocemente e corrigi-los antes do lançamento na Mainnet.

Embora seja possível atualizar um contrato se um bug for descoberto, as atualizações são complexas e podem [resultar em erros](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) se tratadas de forma inadequada. Atualizar um contrato também nega o princípio da imutabilidade e sobrecarrega os usuários com premissas de confiança adicionais. Por outro lado, um plano abrangente para testar seu contrato mitiga os riscos de segurança do contrato inteligente e reduz a necessidade de realizar atualizações lógicas complexas após a implantação.

## Métodos para testar contratos inteligentes {#methods-for-testing-smart-contracts}

Os métodos para testar contratos inteligentes no Ethereum se enquadram em duas categorias amplas: **testes automatizados** e **testes manuais**. Testes automatizados e testes manuais oferecem benefícios e compensações únicos, mas você pode combinar ambos para criar um plano robusto para analisar seus contratos.

### Testes automatizados {#automated-testing}

Os testes automatizados usam ferramentas que verificam automaticamente o código de um contrato inteligente em busca de erros na execução. O benefício dos testes automatizados vem do uso de [scripts](https://www.techtarget.com/whatis/definition/script?amp=1) para orientar a avaliação das funcionalidades do contrato. Testes baseados em scripts podem ser programados para serem executados repetidamente com o mínimo de intervenção humana, tornando os testes automatizados mais eficientes do que as abordagens manuais de teste.

Os testes automatizados são particularmente úteis quando os testes são repetitivos e demorados; difíceis de realizar manualmente; suscetíveis a erros humanos; ou envolvem a avaliação de funções críticas do contrato. Mas as ferramentas de teste automatizado podem ter desvantagens — elas podem deixar passar certos bugs e produzir muitos [falsos positivos](https://www.contrastsecurity.com/glossary/false-positive). Portanto, combinar testes automatizados com testes manuais para contratos inteligentes é o ideal.

### Testes manuais {#manual-testing}

O teste manual é auxiliado por humanos e envolve a execução de cada caso de teste em seu conjunto de testes, um após o outro, ao analisar a correção de um contrato inteligente. Isso é diferente dos testes automatizados, onde você pode executar simultaneamente vários testes isolados em um contrato e obter um relatório mostrando todos os testes que falharam e passaram.

O teste manual pode ser realizado por um único indivíduo seguindo um plano de teste escrito que abrange diferentes cenários de teste. Você também pode ter vários indivíduos ou grupos interagindo com um contrato inteligente durante um período especificado como parte do teste manual. Os testadores compararão o comportamento real do contrato com o comportamento esperado, sinalizando qualquer diferença como um bug.

Testes manuais eficazes exigem recursos consideráveis (habilidade, tempo, dinheiro e esforço), e é possível — devido a erro humano — deixar passar certos erros durante a execução dos testes. Mas os testes manuais também podem ser benéficos — por exemplo, um testador humano (por exemplo, um auditor) pode usar a intuição para detectar casos extremos que uma ferramenta de teste automatizado deixaria passar.

## Testes automatizados para contratos inteligentes {#automated-testing-for-smart-contracts}

### Teste de unidade {#unit-testing-for-smart-contracts}

O teste de unidade avalia as funções do contrato separadamente e verifica se cada componente funciona corretamente. Bons testes de unidade devem ser simples, rápidos de executar e fornecer uma ideia clara do que deu errado se os testes falharem.

Os testes de unidade são úteis para verificar se as funções retornam os valores esperados e se o armazenamento do contrato é atualizado adequadamente após a execução da função. Além disso, executar testes de unidade após fazer alterações na base de código de um contrato garante que a adição de nova lógica não introduza erros. Abaixo estão algumas diretrizes para executar testes de unidade eficazes:

#### Diretrizes para testes de unidade de contratos inteligentes {#unit-testing-guidelines}

##### 1. Entenda a lógica de negócios e o fluxo de trabalho do seu contrato

Antes de escrever testes de unidade, é útil saber quais funcionalidades um contrato inteligente oferece e como os usuários acessarão e usarão essas funções. Isso é particularmente útil para executar [testes de caminho feliz (happy path)](https://en.m.wikipedia.org/wiki/Happy_path) que determinam se as funções em um contrato retornam a saída correta para entradas de usuário válidas. Explicaremos esse conceito usando este exemplo (resumido) de [um contrato de leilão](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

Este é um contrato de leilão simples projetado para receber lances durante o período de lances. Se o `highestBid` aumentar, o licitante com o lance mais alto anterior recebe seu dinheiro de volta; assim que o período de lances terminar, o `beneficiary` chama o contrato para receber seu dinheiro.

Os testes de unidade para um contrato como este cobririam diferentes funções que um usuário pode chamar ao interagir com o contrato. Um exemplo seria um teste de unidade que verifica se um usuário pode dar um lance enquanto o leilão está em andamento (ou seja, as chamadas para `bid()` são bem-sucedidas) ou um que verifica se um usuário pode dar um lance maior do que o `highestBid` atual.

Entender o fluxo de trabalho operacional de um contrato também ajuda a escrever testes de unidade que verificam se a execução atende aos requisitos. Por exemplo, o contrato de leilão especifica que os usuários não podem dar lances quando o leilão terminar (ou seja, quando `auctionEndTime` for menor que `block.timestamp`). Assim, um desenvolvedor pode executar um teste de unidade que verifica se as chamadas para a função `bid()` são bem-sucedidas ou falham quando o leilão termina (ou seja, quando `auctionEndTime` > `block.timestamp`).

##### 2. Avalie todas as premissas relacionadas à execução do contrato

É importante documentar quaisquer premissas sobre a execução de um contrato e escrever testes de unidade para verificar a validade dessas premissas. Além de oferecer proteção contra execuções inesperadas, testar asserções força você a pensar em operações que poderiam quebrar o modelo de segurança de um contrato inteligente. Uma dica útil é ir além dos "testes de usuário feliz" e escrever testes negativos que verificam se uma função falha para as entradas erradas.

Muitas estruturas de teste de unidade permitem que você crie asserções — declarações simples que afirmam o que um contrato pode e não pode fazer — e execute testes para ver se essas asserções se mantêm durante a execução. Um desenvolvedor trabalhando no contrato de leilão descrito anteriormente poderia fazer as seguintes asserções sobre seu comportamento antes de executar testes negativos:

- Os usuários não podem dar lances quando o leilão terminar ou ainda não tiver começado.

- O contrato de leilão é revertido se um lance estiver abaixo do limite aceitável.

- Os usuários que não ganham o lance recebem seus fundos de volta.

**Nota**: Outra maneira de testar premissas é escrever testes que acionam [modificadores de função](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) em um contrato, especialmente as instruções `require`, `assert` e `if…else`.

##### 3. Meça a cobertura de código

A [cobertura de código](https://en.m.wikipedia.org/wiki/Code_coverage) é uma métrica de teste que rastreia o número de ramificações, linhas e instruções em seu código executadas durante os testes. Os testes devem ter uma boa cobertura de código para minimizar o risco de vulnerabilidades não testadas. Sem cobertura suficiente, você pode presumir falsamente que seu contrato é seguro porque todos os testes passam, enquanto as vulnerabilidades ainda existem em caminhos de código não testados. Registrar uma alta cobertura de código, no entanto, dá a garantia de que todas as instruções/funções em um contrato inteligente foram suficientemente testadas quanto à correção.

##### 4. Use estruturas de teste bem desenvolvidas

A qualidade das ferramentas usadas na execução de testes de unidade para seus contratos inteligentes é crucial. Uma estrutura de teste ideal é aquela que é mantida regularmente; fornece recursos úteis (por exemplo, recursos de registro e relatórios); e deve ter sido amplamente usada e avaliada por outros desenvolvedores.

As estruturas de teste de unidade para contratos inteligentes em Solidity vêm em diferentes linguagens (principalmente JavaScript, Python e Rust). Veja alguns dos guias abaixo para obter informações sobre como começar a executar testes de unidade com diferentes estruturas de teste:

- **[Executando testes de unidade com Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Executando testes de unidade com Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Executando testes de unidade com Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Executando testes de unidade com Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Executando testes de unidade com Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Executando testes de unidade com Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Executando testes de unidade com Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Teste de integração {#integration-testing-for-smart-contracts}

Enquanto o teste de unidade depura as funções do contrato isoladamente, os testes de integração avaliam os componentes de um contrato inteligente como um todo. O teste de integração pode detectar problemas decorrentes de chamadas entre contratos ou interações entre diferentes funções no mesmo contrato inteligente. Por exemplo, os testes de integração podem ajudar a verificar se coisas como [herança](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) e injeção de dependência funcionam corretamente.

O teste de integração é útil se o seu contrato adotar uma arquitetura modular ou fizer interface com outros contratos onchain durante a execução. Uma maneira de executar testes de integração é fazer uma [bifurcação da blockchain](/glossary/#fork) em uma altura específica (usando uma ferramenta como [Forge](https://book.getfoundry.sh/forge/fork-testing) ou [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) e simular interações entre o seu contrato e os contratos implantados.

A blockchain bifurcada se comportará de forma semelhante à Mainnet e terá contas com estados e saldos associados. Mas ela atua apenas como um ambiente de desenvolvimento local em sandbox, o que significa que você não precisará de ETH real para transações, por exemplo, nem suas alterações afetarão o protocolo Ethereum real.

### Teste baseado em propriedades {#property-based-testing-for-smart-contracts}

O teste baseado em propriedades é o processo de verificar se um contrato inteligente satisfaz alguma propriedade definida. As propriedades afirmam fatos sobre o comportamento de um contrato que se espera que permaneçam verdadeiros em diferentes cenários — um exemplo de propriedade de contrato inteligente poderia ser "As operações aritméticas no contrato nunca sofrem overflow ou underflow".

A **análise estática** e a **análise dinâmica** são duas técnicas comuns para executar testes baseados em propriedades, e ambas podem verificar se o código de um programa (um contrato inteligente, neste caso) satisfaz alguma propriedade predefinida. Algumas ferramentas de teste baseadas em propriedades vêm com regras predefinidas sobre as propriedades esperadas do contrato e verificam o código em relação a essas regras, enquanto outras permitem que você crie propriedades personalizadas para um contrato inteligente.

#### Análise estática {#static-analysis}

Um analisador estático recebe como entrada o código-fonte de um contrato inteligente e gera resultados declarando se um contrato satisfaz uma propriedade ou não. Ao contrário da análise dinâmica, a análise estática não envolve a execução de um contrato para analisá-lo quanto à correção. Em vez disso, a análise estática raciocina sobre todos os caminhos possíveis que um contrato inteligente poderia seguir durante a execução (ou seja, examinando a estrutura do código-fonte para determinar o que isso significaria para a operação do contrato em tempo de execução).

[Linting](https://www.perforce.com/blog/qac/what-is-linting) e [testes estáticos](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) são métodos comuns para executar análises estáticas em contratos. Ambos exigem a análise de representações de baixo nível da execução de um contrato, como [árvores de sintaxe abstrata](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) e [grafos de fluxo de controle](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) gerados pelo compilador.

Na maioria dos casos, a análise estática é útil para detectar problemas de segurança, como o uso de construções inseguras, erros de sintaxe ou violações de padrões de codificação no código de um contrato. No entanto, sabe-se que os analisadores estáticos geralmente não são confiáveis para detectar vulnerabilidades mais profundas e podem produzir falsos positivos excessivos.

#### Análise dinâmica {#dynamic-analysis}

A análise dinâmica gera entradas simbólicas (por exemplo, na [execução simbólica](https://en.m.wikipedia.org/wiki/Symbolic_execution)) ou entradas concretas (por exemplo, no [fuzzing](https://owasp.org/www-community/Fuzzing)) para as funções de um contrato inteligente para ver se algum traço de execução viola propriedades específicas. Essa forma de teste baseado em propriedades difere dos testes de unidade porque os casos de teste cobrem vários cenários e um programa lida com a geração de casos de teste.

O [fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) é um exemplo de técnica de análise dinâmica para verificar propriedades arbitrárias em contratos inteligentes. Um fuzzer invoca funções em um contrato de destino com variações aleatórias ou malformadas de um valor de entrada definido. Se o contrato inteligente entrar em um estado de erro (por exemplo, um em que uma asserção falha), o problema é sinalizado e as entradas que direcionam a execução para o caminho vulnerável são produzidas em um relatório.

O fuzzing é útil para avaliar o mecanismo de validação de entrada de um contrato inteligente, pois o manuseio inadequado de entradas inesperadas pode resultar em execução não intencional e produzir efeitos perigosos. Essa forma de teste baseado em propriedades pode ser ideal por muitos motivos:

1. **Escrever casos de teste para cobrir muitos cenários é difícil.** Um teste de propriedade exige apenas que você defina um comportamento e um intervalo de dados para testar o comportamento — o programa gera automaticamente casos de teste com base na propriedade definida.

2. **Seu conjunto de testes pode não cobrir suficientemente todos os caminhos possíveis dentro do programa.** Mesmo com 100% de cobertura, é possível deixar passar casos extremos.

3. **Os testes de unidade provam que um contrato é executado corretamente para dados de amostra, mas se o contrato é executado corretamente para entradas fora da amostra permanece desconhecido.** Os testes de propriedade executam um contrato de destino com várias variações de um determinado valor de entrada para encontrar traços de execução que causam falhas de asserção. Assim, um teste de propriedade fornece mais garantias de que um contrato é executado corretamente para uma ampla classe de dados de entrada.

### Diretrizes para executar testes baseados em propriedades para contratos inteligentes {#running-property-based-tests}

A execução de testes baseados em propriedades geralmente começa com a definição de uma propriedade (por exemplo, ausência de [overflows de inteiros](https://github.com/ConsenSysDiligence/mythril/wiki/Integer-Overflow)) ou coleção de propriedades que você deseja verificar em um contrato inteligente. Você também pode precisar definir um intervalo de valores dentro do qual o programa pode gerar dados para entradas de transação ao escrever testes de propriedade.

Uma vez configurada corretamente, a ferramenta de teste de propriedade executará as funções do seu contrato inteligente com entradas geradas aleatoriamente. Se houver alguma violação de asserção, você deverá obter um relatório com dados de entrada concretos que violam a propriedade em avaliação. Veja alguns dos guias abaixo para começar a executar testes baseados em propriedades com diferentes ferramentas:

- **[Análise estática de contratos inteligentes com Slither](https://github.com/crytic/slither)**
- **[Análise estática de contratos inteligentes com Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Teste baseado em propriedades com Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing de contratos com Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing de contratos com Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing de contratos com Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Execução simbólica de contratos inteligentes com Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Execução simbólica de contratos inteligentes com Mythril](https://github.com/ConsenSysDiligence/mythril/blob/develop/docs/source/tutorial.rst)**

## Testes manuais para contratos inteligentes {#manual-testing-for-smart-contracts}

O teste manual de contratos inteligentes geralmente ocorre mais tarde no ciclo de desenvolvimento, após a execução de testes automatizados. Essa forma de teste avalia o contrato inteligente como um produto totalmente integrado para ver se ele funciona conforme especificado nos requisitos técnicos.

### Testando contratos em uma blockchain local {#testing-on-local-blockchain}

Embora os testes automatizados realizados em um ambiente de desenvolvimento local possam fornecer informações úteis de depuração, você vai querer saber como seu contrato inteligente se comporta em um ambiente de produção. No entanto, a implantação na cadeia principal do Ethereum incorre em taxas de gas — sem mencionar que você ou seus usuários podem perder dinheiro real se o seu contrato inteligente ainda tiver bugs.

Testar seu contrato em uma blockchain local (também conhecida como [rede de desenvolvimento](/developers/docs/development-networks/)) é uma alternativa recomendada ao teste na Mainnet. Uma blockchain local é uma cópia da blockchain do Ethereum rodando localmente no seu computador que simula o comportamento da camada de execução do Ethereum. Como tal, você pode programar transações para interagir com um contrato sem incorrer em sobrecarga significativa.

Executar contratos em uma blockchain local pode ser útil como uma forma de teste de integração manual. [Contratos inteligentes são altamente compuníveis](/developers/docs/smart-contracts/composability/), permitindo que você se integre a protocolos existentes — mas você ainda precisará garantir que essas interações onchain complexas produzam os resultados corretos.

[Mais sobre redes de desenvolvimento.](/developers/docs/development-networks/)

### Testando contratos em redes de teste {#testing-contracts-on-testnets}

Uma rede de teste (testnet) funciona exatamente como a Rede Principal do Ethereum (Mainnet), exceto que usa ether (ETH) sem valor no mundo real. Implantar seu contrato em uma [rede de teste](/developers/docs/networks/#ethereum-testnets) significa que qualquer pessoa pode interagir com ele (por exemplo, por meio do frontend do dapp) sem colocar fundos em risco.

Essa forma de teste manual é útil para avaliar o fluxo de ponta a ponta do seu aplicativo do ponto de vista do usuário. Aqui, os testadores beta também podem realizar execuções de teste e relatar quaisquer problemas com a lógica de negócios e a funcionalidade geral do contrato.

Implantar em uma rede de teste após testar em uma blockchain local é o ideal, pois a primeira está mais próxima do comportamento da Máquina Virtual Ethereum (EVM). Portanto, é comum que muitos projetos nativos do Ethereum implantem dapps em redes de teste para avaliar a operação de um contrato inteligente sob condições do mundo real.

[Mais sobre as redes de teste do Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Testes vs. verificação formal {#testing-vs-formal-verification}

Embora os testes ajudem a confirmar que um contrato retorna os resultados esperados para algumas entradas de dados, eles não podem provar conclusivamente o mesmo para entradas não usadas durante os testes. Testar um contrato inteligente, portanto, não pode garantir a "correção funcional" (ou seja, não pode mostrar que um programa se comporta conforme exigido para _todos_ os conjuntos de valores de entrada).

A verificação formal é uma abordagem para avaliar a correção do software, verificando se um modelo formal do programa corresponde à especificação formal. Um modelo formal é uma representação matemática abstrata de um programa, enquanto uma especificação formal define as propriedades de um programa (ou seja, asserções lógicas sobre a execução do programa).

Como as propriedades são escritas em termos matemáticos, torna-se possível verificar se um modelo formal (matemático) do sistema satisfaz uma especificação usando regras lógicas de inferência. Assim, diz-se que as ferramentas de verificação formal produzem uma 'prova matemática' da correção de um sistema.

Ao contrário dos testes, a verificação formal pode ser usada para verificar se a execução de um contrato inteligente satisfaz uma especificação formal para _todas_ as execuções (ou seja, não tem bugs) sem precisar executá-lo com dados de amostra. Isso não apenas reduz o tempo gasto na execução de dezenas de testes de unidade, mas também é mais eficaz na detecção de vulnerabilidades ocultas. Dito isso, as técnicas de verificação formal estão em um espectro dependendo de sua dificuldade de implementação e utilidade.

[Mais sobre verificação formal para contratos inteligentes.](/developers/docs/smart-contracts/formal-verification)

## Testes vs. auditorias e recompensas por bugs (bug bounties) {#testing-vs-audits-bug-bounties}

Como mencionado, testes rigorosos raramente podem garantir a ausência de bugs em um contrato; as abordagens de verificação formal podem fornecer garantias mais fortes de correção, mas atualmente são difíceis de usar e incorrem em custos consideráveis.

Ainda assim, você pode aumentar ainda mais a possibilidade de detectar vulnerabilidades no contrato obtendo uma revisão de código independente. [Auditorias de contratos inteligentes](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) e [recompensas por bugs (bug bounties)](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) são duas maneiras de fazer com que outras pessoas analisem seus contratos.

As auditorias são realizadas por auditores experientes em encontrar casos de falhas de segurança e más práticas de desenvolvimento em contratos inteligentes. Uma auditoria geralmente incluirá testes (e possivelmente verificação formal), bem como uma revisão manual de toda a base de código.

Por outro lado, um programa de recompensa por bugs geralmente envolve oferecer uma recompensa financeira a um indivíduo (comumente descrito como [hackers whitehat](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>)) que descobre uma vulnerabilidade em um contrato inteligente e a divulga aos desenvolvedores. As recompensas por bugs são semelhantes às auditorias, pois envolvem pedir a outras pessoas que ajudem a encontrar defeitos em contratos inteligentes.

A principal diferença é que os programas de recompensa por bugs são abertos à comunidade mais ampla de desenvolvedores/hackers e atraem uma ampla classe de hackers éticos e profissionais de segurança independentes com habilidades e experiências únicas. Isso pode ser uma vantagem sobre as auditorias de contratos inteligentes que dependem principalmente de equipes que podem possuir conhecimentos limitados ou restritos.

## Ferramentas e bibliotecas de teste {#testing-tools-and-libraries}

### Ferramentas de teste de unidade {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Ferramenta de cobertura de código para contratos inteligentes escritos em Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Estrutura para desenvolvimento e teste avançados de contratos inteligentes (baseada em Ethers.js)._

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Ferramenta para testar contratos inteligentes em Solidity. Funciona sob o plugin "Solidity Unit Testing" do Remix IDE, que é usado para escrever e executar casos de teste para um contrato._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Biblioteca de asserção para testes de contratos inteligentes no Ethereum. Certifique-se de que seus contratos se comportem conforme o esperado!_

- **[Estrutura de teste de unidade Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _O Brownie utiliza o Pytest, uma estrutura de teste rica em recursos que permite escrever pequenos testes com o mínimo de código, é bem dimensionável para grandes projetos e é altamente extensível._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _O Foundry oferece o Forge, uma estrutura de teste do Ethereum rápida e flexível, capaz de executar testes de unidade simples, verificações de otimização de gas e fuzzing de contratos._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Estrutura para testar contratos inteligentes baseada em Ethers.js, Mocha e Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Estrutura de desenvolvimento e teste baseada em Python para contratos inteligentes direcionados à Máquina Virtual Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Estrutura baseada em Python para testes de unidade e fuzzing com fortes recursos de depuração e suporte a testes cross-chain, utilizando pytest e Anvil para a melhor experiência do usuário e desempenho._

### Ferramentas de teste baseadas em propriedades {#property-based-testing-tools}

#### Ferramentas de análise estática {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Estrutura de análise estática de Solidity baseada em Python para encontrar vulnerabilidades, aprimorar a compreensão do código e escrever análises personalizadas para contratos inteligentes._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter para impor as melhores práticas de estilo e segurança para a linguagem de programação de contratos inteligentes Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Analisador estático baseado em Rust projetado especificamente para segurança e desenvolvimento de contratos inteligentes na Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Estrutura de análise estática baseada em Python com detectores de vulnerabilidade e qualidade de código, impressores para extrair informações úteis do código e suporte para escrever submódulos personalizados._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Um linter simples e poderoso para Solidity._

#### Ferramentas de análise dinâmica {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Fuzzer de contrato rápido para detectar vulnerabilidades em contratos inteligentes por meio de testes baseados em propriedades._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Ferramenta de fuzzing automatizada útil para detectar violações de propriedades no código de contratos inteligentes._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Estrutura de execução simbólica dinâmica para analisar o bytecode da EVM._

- **[Mythril](https://github.com/ConsenSysDiligence/mythril)** - _Ferramenta de avaliação de bytecode da EVM para detectar vulnerabilidades de contrato usando análise de taint, análise concólica e verificação de fluxo de controle._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _O Scribble é uma linguagem de especificação e ferramenta de verificação em tempo de execução que permite anotar contratos inteligentes com propriedades que permitem testar automaticamente os contratos com ferramentas como Diligence Fuzzing ou MythX._

## Tutoriais relacionados {#related-tutorials}

- [Uma visão geral e comparação de diferentes produtos de teste](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Como usar o Echidna para testar contratos inteligentes](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Como usar o Manticore para encontrar bugs em contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Como usar o Slither para encontrar bugs em contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Como simular (mock) contratos em Solidity para testes](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Como executar testes de unidade em Solidity usando o Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Leitura adicional {#further-reading}

- [Um guia detalhado para testar contratos inteligentes no Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Como testar contratos inteligentes no Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Guia de testes de unidade da MolochDAO para desenvolvedores](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Como testar contratos inteligentes como um rockstar](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## Tutoriais: Teste de contratos inteligentes no Ethereum {#tutorials}

- [Como desenvolver e testar um dApp em uma rede de teste local com vários clientes](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– Passo a passo da implantação de um contrato inteligente em uma rede de teste local e execução de testes._
- [Como simular (mock) contratos inteligentes em Solidity para testes](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– Tutorial intermediário sobre como usar dados simulados e implementar testes de unidade._
- [Como usar o Echidna para testar contratos inteligentes](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– Abordagem avançada para fuzzing e teste de contratos inteligentes._
