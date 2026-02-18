---
title: "Checklist de segurança para smart contracts"
description: Um workflow sugerido para escrever smart contracts seguros
author: "Trailofbits"
tags: [ "smart contracts", "segurança", "solidity" ]
skill: intermediate
lang: pt-br
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Lista de verificação de desenvolvimento de contrato inteligente {#smart-contract-development-checklist}

Aqui temos um processo de alto nível que recomendamos seguir enquanto você escreve seus contratos inteligentes.

Verificar problemas de segurança conhecidos:

- Revise seus contratos com [Slither](https://github.com/crytic/slither). Tem mais de 40 detectores internos para vulnerabilidades comuns. Execute em cada check-in com um novo código e certifique-se de que ele recebe um relatório limpo (ou use o modo de triagem para silenciar certos problemas).
- Revise seus contratos com [Crytic](https://crytic.io/). Ele verifica 50 problemas que o Slither não tem. O Crytic também pode ajudar sua equipe a se manter atualizada, resolvendo problemas de segurança facilmente nas solicitações de pull no GitHub.

Considere as características especiais do seu contrato:

- Os seus contratos são atualizáveis? Revise seu código de capacidade de atualização em busca de falhas com [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) ou [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Documentamos 17 situações em que as atualizações podem correr mal.
- Seus contratos pretendem estar em conformidade com os ERCs? Verifique-os com [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Esta ferramenta identifica instantaneamente desvios de seis especificações comuns.
- Você faz integrações com tokens de outras empresas? Revise nossa [lista de verificação de integração de token](/developers/tutorials/token-integration-checklist/) antes de depender de contratos externos.

Visualmente inspecione recursos críticos de segurança com seu código:

- Revise o impressor [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) do Slither. Evite problemas de linearização de sombras e C3 involuntários.
- Revise o impressor [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) do Slither. Reporta a visibilidade da função e os controles de acesso.
- Revise o impressor [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) do Slither. Ele relata os controles de acesso às variáveis de estado.

Propriedades de segurança críticas do documento e use geradores de testes automatizados para avaliá-las:

- Aprenda a [documentar as propriedades de segurança para o seu código](/developers/tutorials/guide-to-smart-contract-security-tools/). É difícil no início, mas é a atividade mais importante para alcançar um bom resultado. Também é um pré-requisito para usar qualquer uma das técnicas avançadas neste tutorial.
- Defina as propriedades de segurança em Solidity para uso com [Echidna](https://github.com/crytic/echidna) e [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Concentre-se na sua máquina do estado, controles de acesso, operações aritméticas, interações externas e padrões de conformidade.
- Defina as propriedades de segurança com a [API Python do Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Concentre-se na herança, nas dependências variáveis, nos controles de acesso e em outras questões estruturais.
- Execute seus testes de propriedade em cada commit com [Crytic](https://crytic.io). Critica pode consumir e avaliar testes de propriedade de segurança para que todos na sua equipe possam facilmente ver que eles passam no GitHub. Os testes que falharam podem bloquear os commits.

Finalmente, esteja atento a questões que as ferramentas automatizadas não conseguem facilmente encontrar:

- Falta de privacidade: todos os outros podem ver suas transações enquanto são enfileiradas no pool
- Transações principais em execução
- Operações criptográficas
- Interações arriscadas com componentes externos de DeFi

## Peça ajuda {#ask-for-help}

Os [horários de expediente do Ethereum](https://calendly.com/dan-trailofbits/office-hours) acontecem toda terça-feira à tarde. Essas sessões presenciais de uma hora são uma oportunidade para você nos fazer quaisquer perguntas que sobre segurança, solucionar problemas usando nossas ferramentas e obter comentários de especialistas sobre sua abordagem atual. Vamos ajudá-lo a trabalhar neste guia.

Junte-se ao nosso Slack: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Sempre estaremos disponíveis nos canais #crytic e #ethereum caso tenha alguma dúvida.
