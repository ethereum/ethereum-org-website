---
title: Um guia para ferramentas de segurança de contratos inteligentes
description: Uma visão geral de três diferentes técnicas de análise de testes e programas
author: "Trailofbits"
lang: pt-br
tags:
  - "solidez"
  - "smart contracts"
  - "segurança"
skill: intermediate
published: 2020-09-07
source: Construindo contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

We are going to use three distinctive testing and program analysis techniques:

- **Análise estática com [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Todos os caminhos do programa são aproximados e analisados ao mesmo tempo, por meio de diferentes apresentações de programa (por exemplo, um control-flow-graph)
- **Fuzzing com [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** O código é executado com uma geração pseudo-aleatória de transações. O fuzzer tentará encontrar uma sequência de transações para violar uma determinada propriedade.
- **A execução simbólica com a [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Uma técnica de verificação formal, que traduz cada caminho de execução para uma fórmula matemática, na qual as restrições de cima podem ser verificadas.

Cada técnica tem vantagens e armadilhas, e será útil em [casos específicos](#determining-security-properties):

| Técnica            | Ferramenta | Uso                                  | Velocidade | Erros perdidos | Alarmes falso |
| ------------------ | ---------- | ------------------------------------ | ---------- | -------------- | ------------- |
| Análise estática   | Slither    | CLI & scripts                        | segundos   | moderado       | baixo         |
| Fuzzing            | Echidna    | Propriedades da Solidity             | minutos    | baixo          | nenhum        |
| Execução simbólica | Manticore  | Propriedades & scripts & da Solidity | horas      | nenhum\*     | nenhum        |

\* se todos os caminhos forem explorados sem tempo limite

**Slither** analisa contratos em poucos segundos, no entanto análise estática pode levar a alarmes falsos e será menos adequada para verificações complexas (e.. verificações aritméticas). Execute o Slither por meio da API para acesso com botão de comando para detectores internos ou por meio da API para verificações definidas pelo usuário.

O **Echidna** precisa ser executado por vários minutos e só produzirá verdadeiros positivos. O Echidna verifica as propriedades de segurança fornecidas pelo usuário escritas em Solidity. Ele pode perder erros, pois é baseado em exploração aleatória.

O **Manticore** executa a análise com maior peso. Como o Echidna, o Manticore verifica as propriedades fornecidas pelo usuário. Será necessário mais tempo de execução, mas isso poderá comprovar a validade de uma propriedade e não relatará alarmes falsos.

## Fluxo de trabalho sugerido {#suggested-workflow}

Comece com os detectores internos do Slither para garantir que nenhum bug simples esteja presente agora ou seja introduzido mais tarde. Use o Slither para verificar propriedades relacionadas a herança, dependências de variáveis e questões estruturais. À medida que a base de código cresce, use o Echidna para testar propriedades mais complexas da máquina de estado. Revisite o Slither para desenvolver verificações personalizadas de proteções indisponíveis na Solidity, como proteger contra uma função que está sendo substituída. Finalmente, use o Manticore para realizar a verificação direcionada de propriedades de segurança críticas, por exemplo, operações aritméticas.

- Use a CLI do Slither para capturar problemas comuns
- Use o Echidna para testar as propriedades de segurança de alto nível do seu contrato
- Use o Slither para escrever verificações estáticas personalizadas
- Use o Manticore quando quiser uma garantia aprofundada de propriedades de segurança críticas

**Uma nota sobre testes de unidade**. Testes de unidade são necessários para construir softwares de alta qualidade. No entanto, estas técnicas não são as mais adequadas para encontrar falhas de segurança. Normalmente, eles são usados para testar comportamentos positivos de código (ou seja, o código funciona conforme o esperado no contexto normal), enquanto as falhas de segurança tendem a residir em casos de risco que os desenvolvedores não consideraram. No nosso estudo sobre dezenas de revisões inteligentes de segurança do contrato, a [cobertura do teste de unidade não teve efeito sobre o número ou gravidade das falhas de segurança](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) que encontramos no código do nosso cliente.

## Determinando propriedades de segurança {#determining-security-properties}

Para testar e verificar efetivamente seu código, você deve identificar as áreas que precisam de atenção. Como seus recursos gastos com a segurança são limitados, é importante otimizar seus esforços para determinar o escopo das partes fracas ou de grande valor da sua base de código. A modelagem de ameaças pode ajudar nisso. Considere revisar:

- [Avaliação de risco rápida](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (nossa abordagem preferida quando o tempo é curto)
- [Guia de modelagem de ameaças do sistema centralizado de dados](https://csrc.nist.gov/publications/detail/sp/800-154/draft) (também conhecido como NIST 800-154)
- [Modelagem de ameaças Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_(security)) / [DREAD](https://wikipedia.org/wiki/DREAD_(risk_assessment_model))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Uso de asserções](https://blog.regehr.org/archives/1091)

### Componentes {#components}

Saber o que você deseja verificar também ajudará a escolher a ferramenta certa.

As vastas áreas que são frequentemente relevantes para os contratos inteligentes incluem:

- **Máquina de estado.** A maioria dos contratos pode ser representada como uma máquina de estado. Recomendamos verificar que: (1) nenhum estado inválido pode ser alcançado, (2) se um estado é válido, que ele seja alcançável e (3) nenhum estado bloqueia o contrato.

  - Echidna e Manticore são as ferramentas para testar as especificações da máquina.

- **Controles de acesso.** Se o seu sistema tiver usuários privilegiados (por exemplo, um proprietário, controladores, …), você deve garantir que (1) cada usuário pode executar apenas as ações autorizadas e (2) nenhum usuário pode bloquear ações de um usuário com mais privilégios.

  - Slither, Echidna e Manticore podem verificar se há controles de acesso corretos. Por exemplo, o Slither pode verificar que apenas as funções da lista de permissões não possuem o modificador onlyOwner. O Echidna e a Manticore são úteis para um controle de acesso mais complexo, como uma autorização dada apenas se o contrato atingir um determinado estado.

- **Operações aritméticas.** É essencial verificar a solidez das operações aritméticas. Usar o `SafeMath` em todo lugar é um bom passo para evitar overflow/underflow, no entanto, ainda é importante considerar outras falhas aritméticas, incluindo problemas de arredondamento e falhas que atrapalham o contrato.

  - A Manticore é a melhor escolha aqui. O Echidna pode ser utilizado se a aritmética estiver fora do escopo da solução SMT.

- **Exatidão da herança.** Os contratos do Solidity dependem fortemente de várias heranças. Erros como uma função de sombreamento faltando uma chamada `super` e uma ordem de linearização c3 interpretada erradamente podem ser facilmente introduzidos.

  - O Slither é a ferramenta que garante a detecção desses problemas.

- **Interações externas.** Os contratos interagem entre si, e não se deve confiar em alguns contratos externos. Por exemplo, se o seu contrato depende de oráculos externos, ele permanecerá seguro se metade dos oráculos disponíveis estiverem comprometidos?

  - A Manticore e o Echidna são a melhor escolha para testar as interações externas com seus contratos. A Manticore possui um mecanismo integrado para o stub de contratos externos.

- **Conformidade padrão.** As normas do Ethereum (por exemplo, ERC20) têm um histórico de falhas em seu design. Esteja ciente das limitações da norma no qual você está construindo.
  - Slither, Echidna e Manticore vão ajudar você a detectar desvios de uma determinada norma.

### Folha de dicas de ferramentas {#tool-selection-cheatsheet}

| Componentes           | Ferramentas                 | Exemplos                                                                                                                                                                                                                                                          |
| --------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Máquina de estado     | Echidna, Manticore          |                                                                                                                                                                                                                                                                   |
| Controle de acesso    | Slither, Echidna, Manticore | [Slither exercise 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise2.md), [Echidna exercício 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md)        |
| Operações aritméticas | Manticore, Echidna          | [Echidna exercício 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Manticore exercícios 1 a 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Exatidão da herança   | Slither                     | [Slither exercício 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise1.md)                                                                                                                                      |
| Interações externas   | Manticore, Echidna          |                                                                                                                                                                                                                                                                   |
| Conformidade padrão   | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                           |

Outras áreas terão de ser verificadas dependendo dos seus objetivos, mas essas áreas gerais são um bom começo para qualquer sistema de contrato inteligente.

Nossas auditorias públicas contêm exemplos de propriedades verificadas ou testadas. Considere a leitura das seções `Teste Automatizado e Verificação` dos seguintes relatórios para revisar as propriedades de segurança em situações reais:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balanceador](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
