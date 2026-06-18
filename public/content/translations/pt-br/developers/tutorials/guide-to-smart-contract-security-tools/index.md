---
title: Um guia para ferramentas de segurança de contratos inteligentes
description: Uma visão geral de três diferentes técnicas de teste e análise de programas
author: "Trailofbits"
lang: pt-br
tags: ["solidity", "contratos inteligentes", "segurança"]
skill: intermediate
breadcrumb: Ferramentas de segurança
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Vamos usar três técnicas distintas de teste e análise de programas:

- **Análise estática com o [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Todos os caminhos do programa são aproximados e analisados ao mesmo tempo, por meio de diferentes apresentações do programa (por exemplo, grafo de fluxo de controle).
- **Fuzzing com o [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** O código é executado com uma geração pseudoaleatória de transações. O fuzzer tentará encontrar uma sequência de transações que viole uma determinada propriedade.
- **Execução simbólica com o [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Uma técnica de verificação formal que traduz cada caminho de execução em uma fórmula matemática, sobre a qual restrições podem ser verificadas.

Cada técnica tem vantagens e armadilhas, e será útil em [casos específicos](#determining-security-properties):

| Técnica | Ferramenta | Uso | Velocidade | Bugs não detectados | Falsos alarmes |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| Análise Estática | Slither | CLI e scripts | segundos | moderado | baixo |
| Fuzzing | Echidna | Propriedades em Solidity | minutos | baixo | nenhum |
| Execução Simbólica | Manticore | Propriedades em Solidity e scripts | horas | nenhum\* | nenhum |

\* se todos os caminhos forem explorados sem tempo limite (timeout)

O **Slither** analisa contratos em segundos, no entanto, a análise estática pode levar a falsos alarmes e será menos adequada para verificações complexas (por exemplo, verificações aritméticas). Execute o Slither por meio da API para acesso rápido a detectores integrados ou por meio da API para verificações definidas pelo usuário.

O **Echidna** precisa ser executado por vários minutos e produzirá apenas verdadeiros positivos. O Echidna verifica propriedades de segurança fornecidas pelo usuário, escritas em Solidity. Ele pode não detectar bugs, pois é baseado em exploração aleatória.

O **Manticore** realiza a análise mais "pesada". Assim como o Echidna, o Manticore verifica propriedades fornecidas pelo usuário. Ele precisará de mais tempo para ser executado, mas pode provar a validade de uma propriedade e não relatará falsos alarmes.

## Fluxo de trabalho sugerido {#suggested-workflow}

Comece com os detectores integrados do Slither para garantir que nenhum bug simples esteja presente agora ou seja introduzido posteriormente. Use o Slither para verificar propriedades relacionadas à herança, dependências de variáveis e problemas estruturais. À medida que a base de código cresce, use o Echidna para testar propriedades mais complexas da máquina de estado. Volte ao Slither para desenvolver verificações personalizadas para proteções indisponíveis no Solidity, como proteção contra a substituição (override) de uma função. Por fim, use o Manticore para realizar a verificação direcionada de propriedades críticas de segurança, por exemplo, operações aritméticas.

- Use a CLI do Slither para detectar problemas comuns
- Use o Echidna para testar propriedades de segurança de alto nível do seu contrato
- Use o Slither para escrever verificações estáticas personalizadas
- Use o Manticore quando quiser uma garantia aprofundada de propriedades críticas de segurança

**Uma observação sobre testes unitários**. Testes unitários são necessários para construir software de alta qualidade. No entanto, essas técnicas não são as mais adequadas para encontrar falhas de segurança. Eles são normalmente usados para testar comportamentos positivos do código (ou seja, o código funciona conforme o esperado no contexto normal), enquanto as falhas de segurança tendem a residir em casos extremos que os desenvolvedores não consideraram. Em nosso estudo de dezenas de revisões de segurança de contratos inteligentes, [a cobertura de testes unitários não teve efeito sobre o número ou a gravidade das falhas de segurança](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) que encontramos no código de nossos clientes.

## Determinando propriedades de segurança {#determining-security-properties}

Para testar e verificar seu código de forma eficaz, você deve identificar as áreas que precisam de atenção. Como os recursos gastos em segurança são limitados, definir o escopo das partes fracas ou de alto valor da sua base de código é importante para otimizar seu esforço. A modelagem de ameaças pode ajudar. Considere revisar:

- [Avaliações Rápidas de Risco](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (nossa abordagem preferida quando o tempo é curto)
- [Guia para Modelagem de Ameaças de Sistemas Centrados em Dados](https://csrc.nist.gov/pubs/sp/800/154/ipd) (também conhecido como NIST 800-154)
- [Modelagem de ameaças de Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Uso de asserções](https://blog.regehr.org/archives/1091)

### Componentes {#components}

Saber o que você deseja verificar também ajudará a selecionar a ferramenta certa.

As áreas amplas que são frequentemente relevantes para contratos inteligentes incluem:

- **Máquina de estado.** A maioria dos contratos pode ser representada como uma máquina de estado. Considere verificar se (1) nenhum estado inválido pode ser alcançado, (2) se um estado for válido, ele pode ser alcançado e (3) nenhum estado prende o contrato.

  - O Echidna e o Manticore são as ferramentas preferidas para testar especificações de máquina de estado.

- **Controles de acesso.** Se o seu sistema tiver usuários privilegiados (por exemplo, um proprietário, controladores, ...), você deve garantir que (1) cada usuário possa executar apenas as ações autorizadas e (2) nenhum usuário possa bloquear ações de um usuário com mais privilégios.

  - O Slither, o Echidna e o Manticore podem verificar se há controles de acesso corretos. Por exemplo, o Slither pode verificar se apenas funções na lista de permissões não possuem o modificador onlyOwner. O Echidna e o Manticore são úteis para controles de acesso mais complexos, como uma permissão concedida apenas se o contrato atingir um determinado estado.

- **Operações aritméticas.** Verificar a solidez das operações aritméticas é fundamental. Usar `SafeMath` em todos os lugares é um bom passo para evitar overflow/underflow, no entanto, você ainda deve considerar outras falhas aritméticas, incluindo problemas de arredondamento e falhas que prendem o contrato.

  - O Manticore é a melhor escolha aqui. O Echidna pode ser usado se a aritmética estiver fora do escopo do solucionador SMT.

- **Correção de herança.** Os contratos em Solidity dependem fortemente de herança múltipla. Erros como uma função de sombreamento (shadowing) sem uma chamada `super` e ordem de linearização c3 mal interpretada podem ser facilmente introduzidos.

  - O Slither é a ferramenta para garantir a detecção desses problemas.

- **Interações externas.** Os contratos interagem entre si, e alguns contratos externos não devem ser confiáveis. Por exemplo, se o seu contrato depende de oráculos externos, ele permanecerá seguro se metade dos oráculos disponíveis for comprometida?

  - O Manticore e o Echidna são a melhor escolha para testar interações externas com seus contratos. O Manticore possui um mecanismo integrado para criar stubs de contratos externos.

- **Conformidade com padrões.** Os padrões do Ethereum (por exemplo, ERC-20) têm um histórico de falhas em seu design. Esteja ciente das limitações do padrão no qual você está construindo.
  - O Slither, o Echidna e o Manticore ajudarão você a detectar desvios de um determinado padrão.

### Folha de dicas para seleção de ferramentas {#tool-selection-cheatsheet}

| Componente | Ferramentas | Exemplos |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Máquina de estado | Echidna, Manticore |
| Controle de acesso | Slither, Echidna, Manticore | [Exercício 2 do Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Exercício 2 do Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Operações aritméticas | Manticore, Echidna | [Exercício 1 do Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Exercícios 1 a 3 do Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Correção de herança | Slither | [Exercício 1 do Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| Interações externas | Manticore, Echidna |
| Conformidade com padrões | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

Outras áreas precisarão ser verificadas dependendo de seus objetivos, mas essas áreas de foco mais amplas são um bom começo para qualquer sistema de contratos inteligentes.

Nossas auditorias públicas contêm exemplos de propriedades verificadas ou testadas. Considere ler as seções `Automated Testing and Verification` dos seguintes relatórios para revisar propriedades de segurança do mundo real:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)