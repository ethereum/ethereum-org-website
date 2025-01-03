---
title: Checklist de segurança para smart contracts
description: Um workflow sugerido para escrever smart contracts seguros
author: "Trailofbits"
tags:
  - "contratos inteligentes"
  - "segurança"
  - "solidity"
skill: intermediate
lang: pt-br
published: 2020-09-07
source: Construindo contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Processo de desenvolvimento do contrato inteligente {#smart-contract-development-checklist}

Aqui temos um processo de alto nível que recomendamos seguir enquanto você escreve seus contratos inteligentes.

Verificar problemas de segurança conhecidos:

- Reveja seus contratos com o [Slither](https://github.com/crytic/slither). Tem mais de 40 detectores internos para vulnerabilidades comuns. Execute em cada check-in com um novo código e certifique-se de que ele recebe um relatório limpo (ou use o modo de triagem para silenciar certos problemas).
- Reveja seus contratos com o [Crytic](https://crytic.io/). Ele verifica 50 problemas que o Slither não tem. O Crytic também pode ajudar sua equipe a se manter atualizada, resolvendo problemas de segurança facilmente nas solicitações de pull no GitHub.

Considere as características especiais do seu contrato:

- Os seus contratos são atualizáveis? Verifique se há defeitos em seu código de capacidade de atualização com o [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) ou [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Documentamos 17 situações em que as atualizações podem correr mal.
- Seus contratos pretendem estar em conformidade com os ERCs? Verifique com [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Esta ferramenta identifica instantaneamente desvios de seis especificações comuns.
- Você faz integrações com tokens de outras empresas? Revise nossa [lista de verificação de integração de tokens](/developers/tutorials/token-integration-checklist/) antes de confiar em contratos externos.

Visualmente inspecione recursos críticos de segurança com seu código:

- Analise o printer [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) do Slither. Evite problemas de linearização de sombras e C3 involuntários.
- Analise o printer [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) do Slither. Reporta a visibilidade da função e os controles de acesso.
- Analise o printer [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) do Slither. Ele relata os controles de acesso às variáveis de estado.

Propriedades de segurança críticas do documento e use geradores de testes automatizados para avaliá-las:

- Aprenda com [as propriedades de segurança de documentos para o seu código](/developers/tutorials/guide-to-smart-contract-security-tools/). É difícil no início, mas é a atividade mais importante para alcançar um bom resultado. Também é um pré-requisito para usar qualquer uma das técnicas avançadas neste tutorial.
- Defina as propriedades de segurança no Solidity, para usar com [Echidna](https://github.com/crytic/echidna) e [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Concentre-se na sua máquina do estado, controles de acesso, operações aritméticas, interações externas e padrões de conformidade.
- Defina as propriedades de segurança com [API Python do Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Concentre-se na herança, nas dependências variáveis, nos controles de acesso e em outras questões estruturais.
- Execute seus testes de propriedade em cada commit com [Crytic](https://crytic.io). Critica pode consumir e avaliar testes de propriedade de segurança para que todos na sua equipe possam facilmente ver que eles passam no GitHub. Os testes que falharam podem bloquear os commits.

Finalmente, esteja atento a questões que as ferramentas automatizadas não conseguem facilmente encontrar:

- Falta de privacidade: todos os outros podem ver suas transações enquanto são enfileiradas no pool
- Transações principais em execução
- Operações criptográficas
- Interações arriscadas com componentes externos de DeFi

## Pedir ajuda {#ask-for-help}

[Horário de escritório Ethereum](https://calendly.com/dan-trailofbits/ethereum-office-hours) executa todas as terças da tarde. Essas sessões presenciais de uma hora são uma oportunidade para você nos fazer quaisquer perguntas que sobre segurança, solucionar problemas usando nossas ferramentas e obter comentários de especialistas sobre sua abordagem atual. Vamos ajudá-lo a trabalhar neste guia.

Junte-se ao nosso Slack: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Sempre estaremos disponíveis nos canais #crytic e #ethereum caso tenha alguma dúvida.
