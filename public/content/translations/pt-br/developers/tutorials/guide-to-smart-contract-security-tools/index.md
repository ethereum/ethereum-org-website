---
title: "Um guia para ferramentas de segurança de contratos inteligentes"
description: "Uma visão geral de três técnicas diferentes de teste e análise de programas"
author: "Trailofbits"
lang: pt-br
tags: [ "solidez", "smart contracts", "segurança" ]
skill: intermediate
published: 2020-09-07
source: Construindo contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Usaremos três técnicas distintas de teste e análise de programas:

- **Análise estática com [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Todos os caminhos do programa são aproximados e analisados ao mesmo tempo, através de diferentes apresentações do programa (p. ex., gráfico de fluxo de controle)
- **Fuzzing com [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** O código é executado com uma geração pseudorrandômica de transações. O fuzzer tentará encontrar uma sequência de transações para violar uma determinada propriedade.
- **Execução simbólica com [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Uma técnica de verificação formal, que traduz cada caminho de execução para uma fórmula matemática, sobre a qual as restrições podem ser verificadas.

Cada técnica tem vantagens e desvantagens e será útil em [casos específicos](#determining-security-properties):

| Técnica            | Ferramenta | Uso                                | Velocidade | Bugs não detectados | Alarmes Falsos |
| ------------------ | ---------- | ---------------------------------- | ---------- | ------------------- | -------------- |
| Análise Estática   | Slither    | CLI e scripts                      | segundos   | moderado            | baixo          |
| Fuzzing            | Echidna    | Propriedades do Solidity           | minutos    | baixo               | nenhum         |
| Execução Simbólica | Manticore  | Propriedades do Solidity e scripts | horas      | nenhum\*            | nenhum         |

\* se todos os caminhos forem explorados sem tempo limite

**O Slither** analisa contratos em segundos, no entanto, a análise estática pode levar a alarmes falsos e será menos adequada para verificações complexas (p. ex., verificações aritméticas). Execute o Slither pela API para ter acesso fácil aos detectores integrados ou pela API para verificações definidas pelo usuário.

**O Echidna** precisa ser executado por vários minutos e só produzirá verdadeiros positivos. O Echidna verifica as propriedades de segurança fornecidas pelo usuário, escritas em Solidity. Ele pode não encontrar bugs, pois se baseia em exploração aleatória.

**O Manticore** realiza a análise "mais pesada". Assim como o Echidna, o Manticore verifica as propriedades fornecidas pelo usuário. Ele precisará de mais tempo para ser executado, mas pode provar a validade de uma propriedade e não relatará alarmes falsos.

## Fluxo de trabalho sugerido {#suggested-workflow}

Comece com os detectores integrados do Slither para garantir que nenhum bug simples esteja presente ou seja introduzido mais tarde. Use o Slither para verificar propriedades relacionadas à herança, dependências de variáveis e problemas estruturais. À medida que a base de código cresce, use o Echidna para testar propriedades mais complexas da máquina de estado. Revisite o Slither para desenvolver verificações personalizadas para proteções indisponíveis no Solidity, como a proteção contra a sobrescrita de uma função. Finalmente, use o Manticore para realizar a verificação direcionada de propriedades de segurança críticas, p. ex., operações aritméticas.

- Use a CLI do Slither para detectar problemas comuns
- Use o Echidna para testar as propriedades de segurança de alto nível do seu contrato
- Use o Slither para escrever verificações estáticas personalizadas
- Use o Manticore quando quiser uma garantia aprofundada de propriedades de segurança críticas

**Uma nota sobre testes de unidade**. Testes de unidade são necessários para criar software de alta qualidade. No entanto, essas técnicas não são as mais adequadas para encontrar falhas de segurança. Eles são normalmente usados para testar comportamentos positivos do código (ou seja, o código funciona como esperado em um contexto normal), enquanto as falhas de segurança tendem a residir em casos extremos que os desenvolvedores não consideraram. Em nosso estudo de dezenas de revisões de segurança de contratos inteligentes, a [cobertura de testes de unidade não teve efeito sobre o número ou a gravidade das falhas de segurança](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) que encontramos no código de nossos clientes.

## Determinação de propriedades de segurança {#determining-security-properties}

Para testar e verificar seu código de forma eficaz, você deve identificar as áreas que precisam de atenção. Como seus recursos gastos em segurança são limitados, definir o escopo das partes fracas ou de alto valor de sua base de código é importante para otimizar seu esforço. A modelagem de ameaças pode ajudar. Considere analisar:

- [Rapid Risk Assessments](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (nossa abordagem preferida quando o tempo é curto)
- [Guide to Data-Centric System Threat Modeling](https://csrc.nist.gov/pubs/sp/800/154/ipd) (também conhecido como NIST 800-154)
- [Shostack threat modeling](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Use of Assertions](https://blog.regehr.org/archives/1091)

### Componentes {#components}

Saber o que você quer verificar também o ajudará a selecionar a ferramenta certa.

As áreas gerais que são frequentemente relevantes para contratos inteligentes incluem:

- **Máquina de estado.** A maioria dos contratos pode ser representada como uma máquina de estado. Considere verificar se (1) nenhum estado inválido pode ser alcançado, (2) se um estado é válido, ele pode ser alcançado e (3) nenhum estado prende o contrato.

  - Echidna e Manticore são as ferramentas a serem favorecidas para testar especificações de máquinas de estado.

- **Controles de acesso.** Se seu sistema tiver usuários privilegiados (p. ex., um proprietário, controladores, ...) você deve garantir que (1) cada usuário só possa realizar as ações autorizadas e (2) nenhum usuário possa bloquear ações de um usuário mais privilegiado.

  - Slither, Echidna e Manticore podem verificar os controles de acesso corretos. Por exemplo, o Slither pode verificar que apenas as funções da lista de permissões não possuem o modificador onlyOwner. Echidna e Manticore são úteis para um controle de acesso mais complexo, como uma permissão concedida apenas se o contrato atingir um determinado estado.

- **Operações aritméticas.** Verificar a solidez das operações aritméticas é fundamental. Usar o `SafeMath` em todos os lugares é um bom passo para evitar overflow/underflow, no entanto, você ainda deve considerar outras falhas aritméticas, incluindo problemas de arredondamento e falhas que prendem o contrato.

  - O Manticore é a melhor escolha aqui. O Echidna pode ser usado se a aritmética estiver fora do escopo do solucionador SMT.

- **Correção da herança.** Contratos em Solidity dependem muito de herança múltipla. Erros como uma função de sombreamento sem uma chamada `super` e uma ordem de linearização c3 mal interpretada podem ser facilmente introduzidos.

  - O Slither é a ferramenta para garantir a detecção desses problemas.

- **Interações externas.** Os contratos interagem entre si, e alguns contratos externos não devem ser confiáveis. Por exemplo, se seu contrato depende de oráculos externos, ele permanecerá seguro se metade dos oráculos disponíveis for comprometida?

  - Manticore e Echidna são a melhor escolha para testar interações externas com seus contratos. O Manticore tem um mecanismo integrado para criar stubs de contratos externos.

- **Conformidade com padrões.** Os padrões da Ethereum (p. ex., ERC20) têm um histórico de falhas em seu design. Esteja ciente das limitações do padrão sobre o qual você está construindo.
  - Slither, Echidna e Manticore ajudarão você a detectar desvios de um determinado padrão.

### Guia rápido de seleção de ferramentas {#tool-selection-cheatsheet}

| Componente               | Ferramentas                 | Exemplos                                                                                                                                                                                                                                                                      |
| ------------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Máquina de estado        | Echidna, Manticore          |                                                                                                                                                                                                                                                                               |
| Controle de acesso       | Slither, Echidna, Manticore | [Slither exercise 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Echidna exercise 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Operações aritméticas    | Manticore, Echidna          | [Echidna exercise 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Manticore exercises 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)     |
| Correção da herança      | Slither                     | [Slither exercise 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                         |
| Interações externas      | Manticore, Echidna          |                                                                                                                                                                                                                                                                               |
| Conformidade com padrões | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                                       |

Outras áreas precisarão ser verificadas dependendo de seus objetivos, mas essas áreas de foco gerais são um bom começo para qualquer sistema de contrato inteligente.

Nossas auditorias públicas contêm exemplos de propriedades verificadas ou testadas. Considere ler as seções de `Teste e Verificação Automatizados` dos relatórios a seguir para analisar as propriedades de segurança do mundo real:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
