---
title: Testes de contratos inteligentes
description: Uma visão geral das técnicas e considerações para testar contratos inteligentes Ethereum
lang: pt-br
---

Testar [contratos inteligentes](/developers/docs/smart-contracts/) é uma das mais importantes medidas para melhorar a [segurança do contrato inteligente](/developers/docs/smart-contracts/security/). Ao contrário do software tradicional, os contratos inteligentes normalmente não podem ser atualizados após o lançamento, tornando imperativo testar rigorosamente antes de implantar contratos na rede Ethereum.

## O que é teste de contrato inteligente? {#what-is-smart-contract-testing}

Teste de contrato inteligente significa realizar uma análise e avaliação detalhada de um contrato inteligente para avaliar a qualidade de seu código-fonte durante o ciclo de desenvolvimento. Testar um contrato inteligente facilita a identificação de bugs e vulnerabilidades, e reduz a possibilidade de erros de software que podem levar a onerosas explorações.

O teste de contrato inteligente assume muitas formas, com diferentes métodos oferecendo benefícios. As estratégias para testar contratos inteligentes da Ethereum podem ser classificadas em duas grandes categorias: **teste automatizado** e **teste manual**.

### Teste automatizado {#automated-testing}

O teste automatizado envolve o uso de ferramentas automatizadas para realizar testes com script de contratos inteligentes. Essa técnica depende de software automatizado que pode executar testes repetidos para encontrar defeitos em contratos inteligentes.

O teste automatizado é eficiente, usa menos recursos e promete níveis mais altos de cobertura do que a análise manual. As ferramentas de teste automatizadas também podem ser configuradas com dados de teste, permitindo-lhes comparar comportamentos previstos com resultados reais.

### Teste manual {#manual-testing}

O teste manual é auxiliado por humanos e envolve um indivíduo que executa as etapas de teste manualmente. As auditorias de código, em que desenvolvedores e/ou auditores examinam cada linha de código do contrato, é um exemplo de teste manual para contratos inteligentes.

O teste manual de contratos inteligentes requer habilidade considerável e um investimento considerável de tempo, dinheiro e esforço. Além disso, o teste manual às vezes pode ser suscetível a problemas de erro humano.

Entretanto, aplicar testes manuais a contratos inteligentes também pode ser benéfico. As auditorias de código aproveitam a inteligência humana para encontrar defeitos no código do contrato que podem não ser detectados durante os testes automatizados.

O teste manual de seus contratos inteligentes também pode revelar vulnerabilidades que existem fora do código, mas ainda podem afetá-lo. Por exemplo, uma auditoria de contrato inteligente pode descobrir vulnerabilidades decorrentes da interação inadequada com componentes off-chain.

## Por que é importante testar contratos inteligentes? {#benefits-of-smart-contract-testing}

Testar contratos inteligentes é importante pelos seguintes motivos:

### 1. Contratos inteligentes são aplicativos de alto valor {#smart-contracts-are-high-value-applications}

Contratos inteligentes geralmente lidam com ativos financeiros de alto valor, especialmente em setores como [finanças descentralizadas (DeFi)](/defi/) e itens valiosos, como [tokens não fungíveis (NFTs)](/nft/). Como tal, pequenas vulnerabilidades em contratos inteligentes podem e geralmente levam a perdas maciças e irrecuperáveis para os usuários. Testes abrangentes podem, no entanto, expor erros no código do contrato inteligente e reduzir os riscos de segurança antes da implantação.

### 2. Contratos inteligentes são imutáveis {#smart-contracts-are-immutable}

Os contratos inteligentes implantados na [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) são imutáveis por padrão. Enquanto os desenvolvedores tradicionais podem ser usados para corrigir bugs de software após o lançamento, o desenvolvimento da Ethereum deixa pouco espaço para corrigir falhas de segurança uma vez que um contrato inteligente está ativo na blockchain.

Embora existam mecanismos de atualização para contratos inteligentes, como padrões de proxy, estes podem ser difíceis de implementar. Além de reduzir a imutabilidade e introduzir complexidade, as atualizações geralmente exigem processos de governança complexos.

Na maioria das vezes, as atualizações devem ser consideradas o último recurso e evitadas, a menos que sejam necessárias. A detecção de potenciais vulnerabilidades e falhas em seu contrato inteligente durante a fase de pré-lançamento reduz a necessidade de uma atualização lógica.

## Teste automatizado para contratos inteligentes {#automated-testing-for-smart-contracts}

### 1. Teste funcional {#functional-testing}

Testes funcionais verifica a funcionalidade de um contrato inteligente e fornece garantia de que cada função no código funciona conforme o esperado. Teste funcional requer entender como seu contrato inteligente deve se comportar em determinadas condições. Em seguida, você pode testar cada função executando cálculos com valores selecionados e comparando a saída retornada com a saída esperada.

Testes funcionais abrange três métodos: **teste unitário**, **teste de integração**, e **teste de sistema**.

#### Teste unitário

Teste unitário envolve testar componentes individuais em um contrato inteligente para correção. Um teste unitário é simples, rápido de executar e fornece uma ideia clara do que deu errado se o teste falhar.

Testes unitário são cruciais para o desenvolvimento de contratos inteligentes, especialmente se você precisar adicionar uma nova lógica ao código. Você pode verificar o comportamento de cada função e confirmar que ela é executada como esperado.

Executar um teste unitário muitas vezes requer criar _asserções_— simples e informais instruções especificando requisitos para um contrato inteligente. Testes unitários podem então ser usados para testar cada asserção e ver se ela se mantém verdadeira sob execução.

Exemplos de asserções relacionadas a contratos incluem:

i. Somente o administrador pode pausar o contrato

ii. "Não administradores não podem cunhar novos tokens"

iii. "O contrato reverte em erros"

#### Teste de Integração

O teste de integração é um nível superior ao dos testes unitários na hierarquia de testes. Em testes de integração, os componentes individuais do contrato inteligente são testados juntos.

Esta abordagem detecta erros decorrentes de interações entre diferentes componentes de um contrato ou em vários contratos. Você deve usar este método se você tiver um contrato complexo com várias funções ou um que interfaces com outros contratos.

Testes de integração podem ser úteis para garantir que coisas como a [herança](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) e a injeção de dependência funcionem corretamente.

#### Teste de sistema

Os testes do sistema são a fase final dos testes funcionais de contratos inteligentes. Um sistema avalia o contrato inteligente como um produto totalmente integrado para ver se ele executa conforme especificado nos requisitos técnicos.

Você pode pensar neste estágio como verificar o fluxo de ponta a ponta do seu contrato inteligente do ponto de vista do usuário. Uma boa maneira de realizar testes de sistema em um contrato inteligente é implementá-lo em um ambiente semelhante a produção, como uma [testnet](/developers/docs/networks/#ethereum-testnets) ou uma [rede de desenvolvimento](/developers/docs/development-networks/).

Aqui, os usuários finais podem realizar o teste são executados e relatar quaisquer problemas com a lógica de negócios do contrato e a funcionalidade no geral. O teste do sistema é importante porque você não pode alterar o código uma vez que o contrato é implantado no ambiente EVM principal.

### 2. Análise estática/dinâmica {#static-dynamic-analysis}

Análise estática e análise dinâmica são dois métodos automatizados de teste para avaliar as qualidades de segurança dos contratos inteligentes. No entanto, ambas as técnicas utilizam diferentes abordagens para encontrar defeitos no código de contratos.

#### Análise estática

Análise estática examina o código-fonte ou bytecode de um contrato inteligente antes da execução. Isso significa que você pode depurar código de contrato sem na verdade executar o programa. Os analistas estáticos podem detectar vulnerabilidades comuns nos contratos inteligentes da Ethereum e ajudar na conformidade com as melhores práticas.

#### Análise dinâmica

Técnicas de análise dinâmicas requerem a execução do contrato inteligente em um ambiente de tempo de execução para identificar problemas no seu código. Analisadores de código dinâmicos observam os comportamentos dos contratos durante a execução e geram um relatório detalhado de vulnerabilidades identificadas e violações de propriedades.

A difusão é um exemplo de uma técnica de análise dinâmica para testar os contratos. Durante os testes de difusão, um difusor alimenta seu contrato inteligente com dados incorretos e inválidos e monitora como o contrato responde a essas entradas.

Como qualquer programa, os contratos inteligentes dependem de entradas fornecidas pelos usuários para executar funções. E, enquanto assumimos que os usuários fornecerão entradas corretas, nem sempre esse é o caso.

Em alguns casos, enviar valores de entrada incorretos para um contrato inteligente pode causar vazamentos de recursos, falhas ou piores, levar à execução de código não pretendida. Campanhas difusas identificam tais problemas previamente, permitindo que você elimine a vulnerabilidade.

## Testes manuais para contratos inteligentes {#manual-testing-for-smart-contracts}

### 1. Auditorias de código {#code-audits}

Uma auditoria de código é uma avaliação detalhada do código-fonte de um contrato inteligente para descobrir possíveis falhas de pontos, falhas de segurança e práticas de desenvolvimento ruins. Embora as auditorias de código possam ser automatizadas, nos referimos à análise de código com ajuda humana.

Auditorias de código requerem uma mentalidade de invasor para mapear possíveis vetores de ataque em contratos inteligentes. Mesmo se você executar auditorias automatizadas, analisar cada linha de código-fonte é um requisito mínimo para escrever contratos inteligentes seguros.

Você também pode encomendar uma auditoria de segurança para dar aos usuários maiores garantias de segurança dos contratos inteligentes. Auditorias se beneficiam de uma análise extensiva realizada por profissionais de cibersegurança e detectam possíveis vulnerabilidades ou bugs que possam comprometer a funcionalidade do contrato inteligente.

### 2. Recompensa por bugs {#bug-bounties}

A recompensa por bugs é uma reconhecimento financeiro dado a um indivíduo que descobre uma vulnerabilidade ou bug no código de um programa e reporta aos desenvolvedores. As recompensas por bugs são semelhantes às auditorias, uma vez que envolve pedir que outras pessoas ajudem a encontrar defeitos em contratos inteligentes. A principal diferença é que os programas de recompensas por bugs estão abertos para uma comunidade mais ampla de desenvolvedores/hacker.

Programas de recompensa por bugs frequentemente atraem uma ampla classe de hackers éticos e profissionais de segurança independentes com habilidades e experiência exclusivas. Isso pode ser uma vantagem em relação às auditorias de contratos inteligentes, que dependem principalmente de equipes que podem possuir conhecimentos especializados limitados ou estreitos.

## Testes vs. Verificação formal {#testing-vs-formal-verification}

Ao passo que testar ajuda a confirmar se um contrato retorna os resultados esperados para algumas entradas de dados, isso não pode comprovar de forma conclusiva o mesmo para entradas não utilizadas durante os testes. Testar um contrato inteligente não pode garantir "correção funcional", o que significa que não pode mostrar que um programa se comporta conforme necessário para _todos os_ conjuntos de valores e condições de entrada.

Como tal, os desenvolvedores são incentivados a incorporar **verificação formal** em sua abordagem para avaliar a exatidão dos contratos inteligentes. A verificação formal usa [métodos formais](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/)— técnicas matematicamente rigorosas para especificar e verificar softwares.

A verificação formal é considerada importante para contratos inteligentes, porque ajuda os desenvolvedores a testar formalmente suposições relacionadas a contratos inteligentes. Isso é feito criando especificações formais que descrevem as propriedades de um contrato inteligente e verificam que um modelo formal do contrato inteligente corresponde à especificação. Esta abordagem aumenta a confiança de que um contrato inteligente executará funções apenas como definido na lógica de negócios e nada mais.

[Saiba mais sobre verificação formal de contratos inteligentes](/developers/docs/smart-contracts/formal-verification)

## Testando ferramentas e bibliotecas {#testing-tools-and-libraries}

### Ferramentas de testes unitários {#unit-testing-tools}

**Solidity-Coverage** - _Ferramenta de cobertura de código em Solidity útil para testar contratos inteligentes._

- [GitHub](https://github.com/sc-forks/solidity-coverage)

**Waffle** - _Um framework para desenvolvimento avançado de contratos inteligentes e testes (baseado em ethers.js)_.

- [Documentação](https://ethereum-waffle.readthedocs.io/en/latest/)
- [GitHub](https://github.com/TrueFiEng/Waffle)
- [Site](https://getwaffle.io/)

**Remix Tests** - _Ferramenta para testar contratos inteligentes em Solidity. Funciona abaixo do plugin Remix IDE "Solidity Unit Testing" usado para escrever e executar casos de teste para um contrato._

- [Documentação](https://remix-ide.readthedocs.io/en/latest/unittesting.html)
- [GitHub](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)

**OpenZeppelin Test Environment -** _ Biblioteca de asserções para teste de contrato inteligente Ethereum. Certifique-se de que seus contratos se comportam como esperado!_

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-test-helpers)
- [Documentação](https://docs.openzeppelin.com/test-helpers)

**Framework para teste de contrato inteligente Truffle** - _Framework de testes automatizado para tornar os testes de seus contratos mais simples._

- [Documentação](https://trufflesuite.com/docs/truffle/testing/testing-your-contracts/)
- [Site](https://trufflesuite.com/)

**Framework para testes unitário Brownie** - _Brownie utiliza Pytest, um framework de testes rico em recursos que permite que você escreva pequenos testes com código mínimo, dimensiona bem para projetos grandes e é altamente extensível._

- [Documentação](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)
- [GitHub](https://github.com/eth-brownie/brownie)

**Foundry testes** - _Foundry oferece o Forge, um framework de testes da Ethereum rápido e flexível capaz de executar testes unitários simples, verificações de otimização de gás e fusão de contratos._

- [GitHub](https://github.com/foundry-rs/foundry/tree/master/forge)
- [Documentação](https://book.getfoundry.sh/forge/)

**Etheno** - _Ferramenta de teste de Ethereum All-in-one compreendendo um multiplexador de RPC JSON, ferramenta de ferramentas de análise e ferramenta de integração de teste. Etheno elimina a complexidade da criação de ferramentas de análise como Manticore e Echidna em grandes projetos multicontratos._

- [GitHub](https://github.com/crytic/etheno)

**Estrutura de testes e desenvolvimento Woke** — _Scripts de teste e implantação com dicas, fuzzer, suporte para depuração, cobertura de código e teste cross-chain em Python._

- [Documentação](https://ackeeblockchain.com/woke/docs/latest/testing-framework/overview/)
- [Github](https://github.com/Ackee-Blockchain/woke)

### Ferramentas de análise estática {#static-analysis-tools}

**Mythril** — _Ferramenta de avaliação de bytecode de EVM para detectar vulnerabilidades de contrato usando análise concolic e análise de fluxo de controle._

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Documentação](https://mythril-classic.readthedocs.io/en/master/about.html)

**Slither** — _Estrutura de análise estática do Solidity baseado em Python para encontrar vulnerabilidades, aprimorando a compreensão de código e escrevendo análises personalizadas para contratos inteligentes._

- [GitHub](https://github.com/crytic/slither)

**Rattle** — _Estrutura de análise estática de bytecode de EVM concebido para trabalhar em contratos inteligentes implementados._

- [GitHub](https://github.com/crytic/rattle)

### Ferramentas de análise dinâmica {#dynamic-analysis-tools}

**Echidna** — _Difusor de contrato rápido para detectar vulnerabilidades em contratos inteligentes por meio de testes baseados em propriedades._

- [Github](https://github.com/crytic/echidna/)

**Harvey** — _Ferramenta automatizada de difusão útil para detectar violações de propriedades em código de contrato inteligente._

- [Website](https://consensys.net/diligence/fuzzing/)

**Mantícora** — _Estrutura de execução simbólica dinâmica para analisar o bytecode de EVM._

- [Github](https://github.com/trailofbits/manticore)
- [Documentação](https://github.com/trailofbits/manticore/wiki)

### Serviços de auditoria de contrato inteligente {#smart-contract-auditing-services}

**ConsenSys Diligence** — _Serviço de auditoria inteligente de contratos que ajuda projetos no ecossistema da blockchain e garante que seus protocolos estejam prontos para serem lançados e criados para proteger os usuários._

- [Site](https://consensys.net/diligence/)

**CertiK** — _Empresa de segurança de blockchain pioneira no uso de tecnologia de verificação formal de ponta em contratos inteligentes e redes blockchain._

- [Site](https://www.certik.com/)

**Trail of Bits** — _Empresa de segurança virtual que combina pesquisa de segurança com uma mentalidade de invasores para reduzir riscos e fortalecer o código._

- [Site](https://www.trailofbits.com/)

**PeckShield** — _Empresa de segurança de blockchain que oferece produtos e serviços para a segurança, privacidade e usabilidade de todo o ecossistema blockchain._

- [Site](https://peckshield.com/)

**QuantStamp** — _Serviço de auditoria que facilita a adoção geral da tecnologia blockchain por meio de serviços de segurança e avaliação de riscos._

- [Site](https://quantstamp.com/)

**OpenZeppelin** — _Empresa de segurança de contrato inteligente, que fornece auditorias de segurança para sistemas distribuídos._

- [Site](https://www.openzeppelin.com/security-audits)

**Nethermind** — _Serviços de auditoria Solidity e Cairo, que garantem a integridade de contratos inteligentes e a segurança dos usuários pelo Ethereum e Starknet._

- [Site](https://nethermind.io/smart-contracts-audits)

### Plataformas de recompensa por bugs {#bug-bounty-platforms}

**Immunefi** — _Plataforma de recompensa por bugs para contratos inteligentes e projetos DeFi, na qual pesquisadores de segurança revisam o código, divulgam vulnerabilidades, são pagos e tornam as criptomoedas mais seguras._

- [Website](https://immunefi.com/)

**HackerOne** — _Coordenação de vulnerabilidades e plataforma de recompensas por bug que conecta empresas com testadores de infiltração e pesquisadores de cibersegurança._

- [Website](https://www.hackerone.com/)

## Tutoriais relacionados {#related-tutorials}

- [Configuração de integração contínua do Solidity e Truffle](/developers/tutorials/solidity-and-truffle-continuous-integration-setup/) _ – Como configurar Travis ou Circle CI para testes de Truffle juntamente com plugins úteis._
- [Visão geral de testes de produtos](/developers/tutorials/guide-to-smart-contract-security-tools/) _ – Uma visão geral e comparação de diferentes produtos de teste_
- [Como usar o Echidna para testar contratos inteligentes](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Como usar o Manticore para encontrar bugs em contratos inteligentes](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Como utilizar o Slither para encontrar bugs nos contratos inteligentes](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [Como simular contratos do Solidity para teste](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Como migrar do Truffle Tests para o ambiente de teste OpenZeppelin](https://docs.openzeppelin.com/test-environment/0.1/migrating-from-truffle)
- [Como testar os contratos depois que eles foram implantados em uma rede](https://fulldecent.blogspot.com/2019/04/testing-deployed-ethereum-contracts.html)
- [Aprenda sobre desenvolvimento de Blockchain, Solidity e Web3 de pilha completa com JavaScript no YouTube](https://www.youtube.com/watch?v=gyMwXuJrbJQ)
- [Curso de Contrato Inteligente, Solidity e Blockchain no YouTube](https://www.youtube.com/watch?v=M576WGiDBdQ)

## Leitura adicional {#further-reading}

- [Um guia completo para testar contratos inteligentes do Ethereum](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297) — _Ben Hauser_
- [Como testar os contratos inteligentes do Ethereum](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d) — _Alex Roan_
