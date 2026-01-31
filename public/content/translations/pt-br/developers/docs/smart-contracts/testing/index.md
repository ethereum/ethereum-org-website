---
title: Testes de contratos inteligentes
description: "Uma visão geral das técnicas e considerações para testar contratos inteligentes Ethereum."
lang: pt-br
---

Blockchains públicas como Ethereum são imutáveis, dificultando alterações de código de contratos inteligentes após sua implementação. Existem [padrões de atualização de contrato](/developers/docs/smart-contracts/upgrading/) para realizar "atualizações virtuais", mas são difíceis de implementar e exigem consenso social. Além disso, uma atualização só pode corrigir um erro _após_ sua descoberta — se um invasor descobrir a vulnerabilidade primeiro, seu contrato inteligente corre o risco de um exploit.

Por esses motivos, testar contratos inteligentes antes de [implantá-los](/developers/docs/smart-contracts/deploying/) na Mainnet é um requisito mínimo para a [segurança](/developers/docs/smart-contracts/security/). Existem muitas técnicas para testar contratos e avaliar a corretude de código; qual escolher depende de suas necessidades. No entanto, um conjunto de testes feito a partir de diferentes ferramentas e abordagens é ideal para pegar pequenas e grandes falhas de segurança no código do contrato.

## Pré-requisitos {#prerequisites}

Esta página explica como testar contratos inteligentes antes de implantar na rede Ethereum. Pressupõe-se que você esteja familiarizado com [contratos inteligentes](/developers/docs/smart-contracts/).

## O que é teste de contrato inteligente? O que é o teste de contrato inteligente?{#what-is-smart-contract-testing}

O teste de contrato inteligente é o processo de verificação de que o código de um contrato inteligente funciona conforme o esperado. Testar é útil para verificar se um contrato inteligente específico atende aos requisitos de confiabilidade, usabilidade e segurança.

Embora as abordagens variem, a maioria dos métodos de teste exige a execução de um contrato inteligente com uma pequena amostra dos dados que se espera manipular. Se o contrato produzir resultados corretos para dados da amostra, presume-se que esteja funcionando corretamente. A maioria das ferramentas de teste fornece recursos para escrever e executar [casos de teste](https://en.m.wikipedia.org/wiki/Test_case) para verificar se a execução de um contrato corresponde aos resultados esperados.

### Por que é importante testar contratos inteligentes? Importância de testar contratos inteligentes{#importance-of-testing-smart-contracts}

Como os contratos inteligentes geralmente gerenciam ativos financeiros de alto valor, pequenos erros de programação podem levar, e frequentemente levam, a [perdas massivas para os usuários](https://rekt.news/leaderboard/). Testes rigorosos podem, no entanto, ajudar a descobrir de maneira antecipada erros e problemas no código de um contrato inteligente e corrigi-los antes do lançamento na rede principal.

Embora seja possível atualizar um contrato se um bug for descoberto, as atualizações são complexas e podem [resultar em erros](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/) se tratadas de forma inadequada. A atualização de um contrato vai contra o princípio da imutabilidade e sobrecarrega os usuários com suposições de confiança adicionais. Por outro lado, um plano abrangente para testar seu contrato reduz os riscos de segurança do contrato inteligente e reduz a necessidade de realizar atualizações lógicas complexas após a implantação.

## Métodos para testar contratos inteligentes {#methods-for-testing-smart-contracts}

Os métodos para testar contratos inteligentes do Ethereum se dividem em duas grandes categorias: **testes automatizados** e **testes manuais**. Testes automatizados e testes manuais tem seus prós e contras, mas você pode combinar ambos para criar um plano robusto para analisar seus contratos.

### Teste automatizado {#automated-testing}

O teste automatizado usa ferramentas que verificam automaticamente um código de contratos inteligentes em busca de erros na execução. O benefício do teste automatizado vem do uso de [scripts](https://www.techtarget.com/whatis/definition/script?amp=1) para orientar a avaliação das funcionalidades do contrato. Os scripts de testes podem ser programados para serem executados repetidamente com o mínimo de intervenção humana, tornando o teste automatizado mais eficiente do que as abordagens manuais de teste.

O teste automatizado é particularmente útil quando os testes são repetitivos e demorados; difícil de realizar manualmente; suscetíveis a erro humano; ou envolvem a avaliação de funções contratuais críticas. Mas as ferramentas de teste automatizadas podem ter desvantagens: elas podem não detectar certos bugs e produzir muitos [falsos positivos](https://www.contrastsecurity.com/glossary/false-positive). Portanto, combinar testes automatizados com testes manuais para contratos inteligentes é ideal.

### Teste manual {#manual-testing}

O teste manual é auxiliado por humanos e envolve a execução de cada caso de teste em seu conjunto de testes, um após o outro, ao analisar a corretude de um contrato inteligente. Isso é diferente do teste automatizado, no qual você pode executar simultaneamente vários testes isolados em um contrato e obter um relatório mostrando todos os testes que falharam e os que foram aprovados.

O teste manual pode ser realizado por um único indivíduo seguindo um plano de teste escrito que cobre diferentes cenários de teste. Você também pode ter vários indivíduos ou grupos interagindo com um contrato inteligente durante um período especificado como parte do teste manual. Os testadores compararão o comportamento real do contrato com o comportamento esperado, sinalizando qualquer diferença como um bug.

Um teste manual eficaz requer recursos consideráveis ​​(habilidade, tempo, dinheiro e esforço) e é possível, devido a erro humano, perder certos erros durante a execução dos testes. Mas o teste manual também pode ser benéfico - por exemplo, um testador humano (por exemplo, um auditor) pode usar a intuição para detectar casos extremos que uma ferramenta de teste automatizada perderia.

## Teste automatizado para contratos inteligentes {#automated-testing-for-smart-contracts}

### Teste de unidade {#unit-testing-for-smart-contracts}

O teste unitário avalia as funções do contrato separadamente e verifica se cada componente funciona corretamente. Testes unitários bons devem ser simples, rápidos de executar e fornecer uma ideia clara do que deu errado se os testes falharem.

Os testes unitários são úteis para verificar se as funções retornam os valores esperados e se o armazenamento do contrato é atualizado corretamente após a execução da função. Além disso, a execução de testes unitários após fazer alterações em uma base de código de contratos garante que a adição de nova lógica não introduza erros. Abaixo estão algumas diretrizes para executar testes unitários eficazes:

#### Diretrizes para testes de unidade de contratos inteligentes {#unit-testing-guidelines}

##### 1. Entenda a lógica de negócios e o fluxo de trabalho de seus contratos

Antes de escrever testes unitários, é bom saber quais funcionalidades um contrato inteligente oferece e como os usuários acessarão e usarão essas funções. Isso é particularmente útil para executar [testes de caminho feliz](https://en.m.wikipedia.org/wiki/Happy_path) que determinam se as funções em um contrato retornam o resultado correto para entradas de usuário válidas. Explicaremos esse conceito usando este exemplo (resumido) de [um contrato de leilão](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)

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

Este é um contrato de leilão simples projetado para receber lances durante o período de submissão de ofertas. Se o `highestBid` aumentar, o licitante com o lance mais alto anterior recebe seu dinheiro de volta; quando o período de lances terminar, o `beneficiary` chama o contrato para receber seu dinheiro.

Testes unitários para um contrato como este cobriria diferentes funções que um usuário poderia chamar quando interagindo com o contrato. Um exemplo seria um teste de unidade que verifica se um usuário pode fazer um lance enquanto o leilão está em andamento (ou seja, as chamadas para `bid()` são bem-sucedidas) ou um que verifica se um usuário pode fazer um lance maior que o `highestBid` atual.

Entendendo o fluxo operacional do contrato também ajuda a escrever testes unitários que checam se a execução atende os requisitos. Por exemplo, o contrato de leilão especifica que os usuários não podem fazer lances quando o leilão termina (ou seja, quando `auctionEndTime` é menor que `block.timestamp`). Assim, um desenvolvedor pode executar um teste de unidade que verifica se as chamadas para a função `bid()` são bem-sucedidas ou falham quando o leilão termina (ou seja, quando `auctionEndTime` > `block.timestamp`).

##### 2. Avalie todas as suposições relacionadas à execução do contrato

É importante documentar quaisquer suposições sobre a execução do contrato e escrever testes unitários para verificar a validade destas suposições. Além de oferecer proteção contra execução inesperada, testar afirmações força você a pensar sobre operações que poderiam quebrar o modelo de segurança do contrato inteligente. Uma dica útil é ir além dos "testes do usuário feliz" e escrever testes negativos que checam se a função falha com as entradas erradas.

Muitos frameworks de teste unitário permitem você criar afirmações - simples declarações que declaram o que um contrato pode e não pode fazer - e rodar testes para ver se estas afirmações funcionam durante a execução. Um desenvolvedor trabalhando no contrato de leilão descrito anteriormente poderia fazer as seguintes afirmações sobre o seu comportamento antes de rodar testes negativos:

- Usuários não podem colocar ordens quando o leilão acabou ou não começou.

- O contrato de leilão reverte se a ordem é abaixo do limite aceitável.

- Usuários que falham em vencer o leilão são creditados com seus fundos

**Observação**: outra maneira de testar suposições é escrever testes que acionem [modificadores de função](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers) em um contrato, especialmente as instruções `require`, `assert` e `if…else`.

##### 3. Medida de cobertura do código

A [cobertura de código](https://en.m.wikipedia.org/wiki/Code_coverage) é uma métrica de teste que rastreia o número de ramificações, linhas e instruções em seu código executadas durante os testes. Os testes devem contar com uma boa cobertura de código para minimizar o risco de vulnerabilidades não testadas. Sem cobertura suficiente, você pode presumir erroneamente que seu contrato é seguro porque todos os testes foram aprovados, embora ainda existam vulnerabilidades em caminhos de código não testados. Obtendo alta cobertura de código, entretanto, dá a segurança que todos os comandos/funções em um contrato inteligente foram suficientemente testados por exatidão.

##### 4. Use frameworks de teste bem desenvolvidos

A qualidade das ferramentas usada para rodar testes unitários para o seu contrato inteligente é crucial. Um framework de teste ideal é aquele que é regularmente mantido; fornece recursos úteis (por exemplo, capacidades de log e relatórios); e tem de ter sido extensivamente usado por outros desenvolvedores.

Frameworks de teste unitário para contratos inteligentes em Solidity vêm em diferentes linguagens (geralmente JavaScript, Python e Rust). Veja alguns dos guias abaixo para informações sobre como começar a rodar testes unitários com diferentes frameworks de teste:

- **[Executando testes de unidade com o Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Executando testes de unidade com o Foundry](https://book.getfoundry.sh/forge/writing-tests)**
- **[Executando testes de unidade com o Waffle](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Executando testes de unidade com o Remix](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Executando testes de unidade com Ape](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Executando testes de unidade com o Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Executando testes de unidade com Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### Teste de integração {#integration-testing-for-smart-contracts}

Enquanto o teste unitário depura funções de contrato isoladamente, testes integrados avaliam os componentes de um contrato inteligente como um todo. Teste de integração pode detectar defeitos vindos de chamadas entre contratos ou interações entre diferentes funções no mesmo contrato inteligente. Por exemplo, os testes de integração podem ajudar a verificar se itens como [herança](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) e injeção de dependência funcionam corretamente.

Os testes de integração são úteis se o seu contrato adota uma arquitetura modular ou interfaces com outros contratos on-chain durante a execução. Uma maneira de executar testes de integração é [bifurcar a cadeia de blocos](/glossary/#fork) em uma altura específica (usando uma ferramenta como [Forge](https://book.getfoundry.sh/forge/fork-testing) ou [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)) e simular interações entre seu contrato e contratos implantados.

O blockchain que sofreu fork irá se comportar similarmente à Mainnet e ter contas com estados e saldos associados. Mas ele age somente como um ambiente de área local de desenvolvimento restrita, significando que você não precisará de ETH real para transações, por exemplo, nem suas modificações irão afetar o protocolo Ethereum real.

### Teste baseado em propriedade {#property-based-testing-for-smart-contracts}

Teste baseado em propriedade é o processo de checar que um contrato inteligente satisfaz algumas propriedades definidas. Propriedades afirmam fatos sobre o comportamento de um contrato esperado continuar verdadeiro em diferentes cenários - um exemplo de propriedade de contrato inteligente poderia ser "Operações aritméticas no contrato nunca sofrem overflow ou underflow."

**Análise estática** e **análise dinâmica** são duas técnicas comuns para executar testes baseados em propriedades, e ambas podem verificar que o código de um programa (um contrato inteligente, neste caso) satisfaz alguma propriedade predefinida. Algumas ferramentas de teste baseadas em propriedade vem com regras pré-definidas sobre propriedades esperadas de contratos e checam o código contra estas regras, enquanto outras permitem você criar propriedades customizadas para um contrato inteligente.

#### Análise estática {#static-analysis}

Um analisador estático pega como entrada o código-fonte de um contrato inteligente e retorna resultados declarando se o contrato satisfaz a propriedade ou não. Diferente da análise dinâmica, análise estática não envolve executar um contrato para analisá-lo por exatidão. Análise estática gera razões alternativas sobre todos os caminhos possíveis que um contrato inteligente poderia tomar durante a execução (ou seja, examinando a estrutura do código-fonte para determinar o que significaria para a operação do contrato em tempo de execução).

[Linting](https://www.perforce.com/blog/qac/what-is-linting) e [testes estáticos](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis) são métodos comuns para executar análises estáticas em contratos. Ambos exigem a análise de representações de baixo nível da execução de um contrato, como [árvores de sintaxe abstrata](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) e [gráficos de fluxo de controle](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/) gerados pelo compilador.

Na maioria dos casos, análise estática é útil para detectar problemas de segurança como uso de construtores inseguros, erros de sintaxe, ou violações de padrões de código no código de contratos. Entretanto, analisadores estáticos são conhecidos por geralmente serem instáveis em detectar vulnerabilidades mais profundas, e podem produzir excessivos falsos positivos.

#### Análise dinâmica {#dynamic-analysis}

A análise dinâmica gera entradas simbólicas (por exemplo, em [execução simbólica](https://en.m.wikipedia.org/wiki/Symbolic_execution)) ou entradas concretas (por exemplo, em [fuzzing](https://owasp.org/www-community/Fuzzing)) para as funções de um contrato inteligente para ver se algum traço de execução viola propriedades específicas. Esta forma de teste baseado em propriedades difere dos testes unitários no tocante a casos de teste cobrem múltiplos cenários e um programa manipula a geração de casos de teste.

[Fuzzing](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing) é um exemplo de uma técnica de análise dinâmica para verificar propriedades arbitrárias em contratos inteligentes. Um fuzzer invoca funções em um contrato alvo com variações randômicas ou mal formadas de um valor de entrada definido. Se um contrato inteligente entra em estado de erro (por exemplo, uma afirmação 'where' falha), o problema é indicado e as entradas que geraram esta execução para o caminho da vulnerabilidade são produzidas em um relatório.

Fuzzing é útil para avaliação de um mecanismo de validação de entrada de contratos inteligentes, já que manipulação imprópria de entradas inesperadas pode resultar em execução não pretendida e produzir efeitos perigosos. Esta forma de teste baseado em propriedade pode ser ideal por muitas razões:

1. **Escrever casos de teste para cobrir muitos cenários é difícil.** Um teste de propriedade exige apenas que você defina um comportamento e um intervalo de dados para testar o comportamento — o programa gera automaticamente casos de teste com base na propriedade definida.

2. **Seu conjunto de testes pode não cobrir suficientemente todos os caminhos possíveis dentro do programa.** Mesmo com 100% de cobertura, é possível deixar passar casos extremos.

3. **Testes de unidade provam que um contrato é executado corretamente para dados de amostra, mas se o contrato é executado corretamente para entradas fora da amostra permanece desconhecido.** Os testes de propriedade executam um contrato de destino com várias variações de um determinado valor de entrada para encontrar traços de execução que causam falhas de asserção. Por isso, um teste proprietário fornece mais garantias que um contrato execute corretamente para uma larga classe de dados de entrada.

### Diretrizes para executar testes baseados em propriedade para contratos inteligentes {#running-property-based-tests}

A execução de testes baseados em propriedade geralmente começa com a definição de uma propriedade (por exemplo, ausência de [estouros de inteiros](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)) ou uma coleção de propriedades que você deseja verificar em um contrato inteligente. Você pode também precisar definir uma faixa de valores dentro da qual o programa pode gerar dados para entradas de transação quando escrevendo os testes de propriedade.

Uma vez configurado propriamente, a ferramenta de teste de propriedade irá executar as suas funções do contrato inteligente com entradas aleatoriamente geradas. Se houver quaisquer violações de afirmações, você deve receber um relatório com os dados de entrada concretos que violaram a propriedade sendo avaliada. Veja alguns dos guias abaixo para começar com testes baseados em propriedade com diferentes ferramentas:

- **[Análise estática de contratos inteligentes com Slither](https://github.com/crytic/slither)**
- **[Análise estática de contratos inteligentes com o Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Teste baseado em propriedade com o Brownie](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Fuzzing de contratos com Foundry](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Fuzzing de contratos com Echidna](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Fuzzing de contratos com Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Execução simbólica de contratos inteligentes com Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Execução simbólica de contratos inteligentes com Mythril](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## Teste manual para contratos inteligentes {#manual-testing-for-smart-contracts}

Teste manual de contratos inteligentes frequentemente vêm mais tarde no ciclo de desenvolvimento, após rodar testes automatizados. Essa forma de teste avalia o contrato inteligente como um produto totalmente integrado para ver se ele executa conforme especificado nos requisitos técnicos.

### Testando contratos em uma cadeia de blocos local {#testing-on-local-blockchain}

Enquanto testes automatizados realizados em um ambiente local de desenvolvimento podem fornecer informações úteis de depuração, você irá querer saber como seus contrato inteligente se comporta em um ambiente de produção. Entretanto, implantar na cadeia principal do Ethereum incorre em taxas de gas - sem mencionar que você ou seus usuários podem perder dinheiro real se o seu contrato inteligente ainda tem falhas.

Testar seu contrato em uma cadeia de blocos local (também conhecida como uma [rede de desenvolvimento](/developers/docs/development-networks/)) é uma alternativa recomendada para testar na Mainnet. Um blockchain local é uma cópia do blockchain Ethereum rodando localmente no seu computador que simula o comportamento da camada de execução do Ethereum. Como tal, você pode programar transações para interagir com um contrato sem incorrer em custo significante.

Rodar contratos em blockchain local pode ser útil como forma de teste de integração manual. [Os contratos inteligentes são altamente combináveis](/developers/docs/smart-contracts/composability/), permitindo a integração com protocolos existentes — mas você ainda precisará garantir que interações on-chain tão complexas produzam os resultados corretos.

[Mais sobre redes de desenvolvimento.](/developers/docs/development-networks/)

### Testando contratos em redes de teste {#testing-contracts-on-testnets}

Uma rede de teste ou testnet funciona exatamente como o Ethereum Mainnet, exceto pelo fato de usar Ether (ETH) sem valor no mundo real. Implantar seu contrato em uma [rede de teste](/developers/docs/networks/#ethereum-testnets) significa que qualquer pessoa pode interagir com ele (por exemplo, por meio do frontend do dapp) sem colocar fundos em risco.

Esta forma de teste manual é útil para avaliação do fluxo fim-a-fim da sua aplicação do ponto de vista do usuário. Aqui, testadores beta podem também realizar execuções experimentais e reportar qualquer problema com a lógica de negócios do contrato e funcionalidade geral.

Implantar na testnet depois de testar no blockchain local é ideal desde que o primeiro é mais perto do comportamento da Máquina Virtual Ethereum. Portanto, é comum para muitos projetos nativos do Ethereum implantar dapps nas testnets para avaliar a operação dos contratos inteligentes em condições de vida real.

[Mais sobre as redes de teste do Ethereum.](/developers/docs/development-networks/#public-beacon-testchains)

## Teste vs. verificação formal {#testing-vs-formal-verification}

Ao passo que testar ajuda a confirmar se um contrato retorna os resultados esperados para algumas entradas de dados, isso não pode comprovar de forma conclusiva o mesmo para entradas não utilizadas durante os testes. Testar um contrato inteligente, portanto, não pode garantir a "exatidão funcional" (ou seja, não pode mostrar que um programa se comporta conforme o necessário para _todos_ os conjuntos de valores de entrada).

Verificação formal é uma abordagem para avaliação da correção do software checando se um modelo formal do programa bate com a especificação formal. Um modelo formal é uma representação matemática abstrata de um programa, enquanto uma especificação formal define as propriedades de um programa (por exemplo, afirmações lógicas sobre a execução do programa).

Pelo fato de propriedades serem escritas em termos matemáticos, é possível verificar que um modelo formal (matemático) do sistema satisfaz uma especificação usando regras lógicas de inferência. Por isso, ferramentas de verificação formal são ditas produzir 'provas matemáticas' da correção de um sistema.

Diferentemente dos testes, a verificação formal pode ser usada para verificar se a execução de um contrato inteligente satisfaz uma especificação formal para _todas_ as execuções (ou seja, não tem bugs) sem a necessidade de executá-lo com dados de amostra. Não apenas isto reduz tempo gasto em rodar dezenas de testes unitários, mas é também mais efetivo na caça por vulnerabilidades escondidas. Dito isto, técnicas de verificação formal se baseiam em um espectro dependendo da sua dificuldade de implementação e utilidade.

[Mais sobre verificação formal para contratos inteligentes.](/developers/docs/smart-contracts/formal-verification)

## Teste vs. auditorias e recompensas por bugs {#testing-vs-audits-bug-bounties}

Como mencionado, testes rigorosos raramente podem garantir a ausência de bugs em um contrato; abordagens de verificação formal podem fornecer garantias mais fortes da correção, mas atualmente são difíceis de usar e incorrem em custos consideráveis.

Ainda assim, você pode aumentar a possibilidade de encontrar vulnerabilidades de contrato pegando uma revisão independente de código. [Auditorias de contratos inteligentes](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/) e [programas de recompensa por bugs](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7) são duas maneiras de fazer com que outras pessoas analisem seus contratos.

Auditorias são realizadas por auditores experientes em encontrar casos de falhas de segurança e práticas pobres de desenvolvimento em contratos inteligentes. Uma auditoria irá geralmente incluir testes (e possivelmente verificação formal) assim como revisão manual de todo o código.

Por outro lado, um programa de recompensa por bugs geralmente envolve a oferta de uma recompensa financeira a um indivíduo (comumente descrito como [hackers whitehat](https://en.wikipedia.org/wiki/White_hat_\(computer_security\))) que descobre uma vulnerabilidade em um contrato inteligente e a divulga aos desenvolvedores. As recompensas por bugs são semelhantes às auditorias, uma vez que envolve pedir que outras pessoas ajudem a encontrar defeitos em contratos inteligentes.

A maior diferença é que programas de recompensa por bug são abertos a uma maior comunidade de desenvolvedores/hackers e atraem uma vasta classe de hackers éticos e profissionais de segurança independentes com habilidades únicas e experiência. Isso pode ser uma vantagem em relação às auditorias de contratos inteligentes, que dependem principalmente de equipes que podem possuir conhecimentos especializados limitados ou estreitos.

## Ferramentas e bibliotecas de teste {#testing-tools-and-libraries}

### Ferramentas de teste de unidade {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Ferramenta de cobertura de código para contratos inteligentes escritos em Solidity._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _Framework para desenvolvimento e teste avançados de contratos inteligentes (baseado em ethers.js)_.

- **[Testes Remix](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Ferramenta para testar contratos inteligentes em Solidity. Funciona abaixo do plugin Remix IDE "Solidity Unit Testing" usado para escrever e executar casos de teste para um contrato._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _Biblioteca de asserção para testes de contratos inteligentes do Ethereum. Certifique-se de que seus contratos se comportam como esperado!_

- **[Framework de teste de unidade do Brownie](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _O Brownie utiliza o Pytest, um framework de teste rico em recursos que permite escrever testes pequenos com código mínimo, é adequado para grandes projetos e é altamente extensível._

- **[Testes Foundry](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry oferece Forge, um framework de teste do Ethereum rápido e flexível, capaz de executar testes de unidade simples, verificações de otimização de gás e fuzzing de contratos._

- **[Testes do Hardhat](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Framework para testar contratos inteligentes com base em ethers.js, Mocha e Chai._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _Framework de desenvolvimento e teste baseado em Python para contratos inteligentes direcionados à Máquina Virtual Ethereum._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _Framework baseado em Python para testes de unidade e fuzzing com fortes recursos de depuração e suporte a testes entre cadeias, utilizando pytest e Anvil para a melhor experiência do usuário e desempenho._

### Ferramentas de teste baseadas em propriedades {#property-based-testing-tools}

#### Ferramentas de análise estática {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _Framework de análise estática de Solidity baseado em Python para encontrar vulnerabilidades, melhorar a compreensão do código e escrever análises personalizadas para contratos inteligentes._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Linter para aplicar as melhores práticas de estilo e segurança para a linguagem de programação de contrato inteligente Solidity._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Analisador estático baseado em Rust, projetado especificamente para a segurança e o desenvolvimento de contratos inteligentes da Web3._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _Framework de análise estática baseado em Python com detectores de vulnerabilidade e qualidade de código, impressores para extrair informações úteis do código e suporte para escrever submódulos personalizados._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Um linter simples e poderoso para Solidity._

#### Ferramentas de análise dinâmica {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _Fuzzer de contrato rápido para detectar vulnerabilidades em contratos inteligentes por meio de testes baseados em propriedades._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _Ferramenta de fuzzing automatizada útil para detectar violações de propriedade no código de contrato inteligente._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _Framework de execução simbólica dinâmica para analisar bytecode da EVM._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _Ferramenta de avaliação de bytecode da EVM para detectar vulnerabilidades de contratos usando análise de propagação de dados (taint analysis), análise concolica e verificação de fluxo de controle._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble é uma linguagem de especificação e uma ferramenta de verificação em tempo de execução que permite anotar contratos inteligentes com propriedades que permitem testar automaticamente os contratos com ferramentas como Diligence Fuzzing ou MythX._

## Tutoriais relacionados {#related-tutorials}

- [Uma visão geral e comparação de diferentes produtos de teste](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Como usar o Echidna para testar contratos inteligentes](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Como usar o Manticore para encontrar bugs em contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Como usar o Slither para encontrar bugs em contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Como simular contratos Solidity para teste](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Como executar testes de unidade em Solidity usando Foundry](https://www.rareskills.io/post/foundry-testing-solidity)

## Leitura adicional {#further-reading}

- [Um guia detalhado para testar contratos inteligentes do Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [Como testar contratos inteligentes do Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [Guia de teste de unidade do MolochDAO para desenvolvedores](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [Como testar contratos inteligentes como um rockstar](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
