---
title: Lista de verificação de segurança de contratos inteligentes
description: Um fluxo de trabalho sugerido para escrever contratos inteligentes seguros
author: "Trailofbits"
tags: ["contratos inteligentes", "segurança", "solidity"]
skill: intermediate
breadcrumb: Lista de verificação de segurança
lang: pt-br
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Lista de verificação de desenvolvimento de contratos inteligentes {#smart-contract-development-checklist}

Aqui está um processo de alto nível que recomendamos seguir enquanto você escreve seus contratos inteligentes.

Verifique se há problemas de segurança conhecidos:

- Revise seus contratos com o [Slither](https://github.com/crytic/slither). Ele tem mais de 40 detectores integrados para vulnerabilidades comuns. Execute-o em cada check-in com código novo e garanta que ele obtenha um relatório limpo (ou use o modo de triagem para silenciar certos problemas).
- Revise seus contratos com o [Crytic](https://crytic.io/). Ele verifica 50 problemas que o Slither não verifica. O Crytic também pode ajudar sua equipe a se manter alinhada, revelando facilmente problemas de segurança em Pull Requests no GitHub.

Considere os recursos especiais do seu contrato:

- Seus contratos são atualizáveis? Revise seu código de capacidade de atualização em busca de falhas com [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) ou [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Documentamos 17 maneiras pelas quais as atualizações podem dar errado.
- Seus contratos pretendem estar em conformidade com os ERCs? Verifique-os com [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Esta ferramenta identifica instantaneamente desvios de seis especificações comuns.
- Você se integra a tokens de terceiros? Revise nossa [lista de verificação de integração de tokens](/developers/tutorials/token-integration-checklist/) antes de confiar em contratos externos.

Inspecione visualmente os recursos críticos de segurança do seu código:

- Revise o impressor [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) do Slither. Evite sombreamento inadvertido e problemas de linearização C3.
- Revise o impressor [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) do Slither. Ele relata a visibilidade da função e os controles de acesso.
- Revise o impressor [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) do Slither. Ele relata controles de acesso em variáveis de estado.

Documente propriedades críticas de segurança e use geradores de testes automatizados para avaliá-las:

- Aprenda a [documentar propriedades de segurança para o seu código](/developers/tutorials/guide-to-smart-contract-security-tools/). É difícil no começo, mas é a atividade mais importante para alcançar um bom resultado. Também é um pré-requisito para usar qualquer uma das técnicas avançadas neste tutorial.
- Defina propriedades de segurança em Solidity, para uso com o [Echidna](https://github.com/crytic/echidna) e o [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Concentre-se em sua máquina de estado, controles de acesso, operações aritméticas, interações externas e conformidade com padrões.
- Defina propriedades de segurança com a [API Python do Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Concentre-se em herança, dependências de variáveis, controles de acesso e outros problemas estruturais.
- Execute seus testes de propriedade em cada commit com o [Crytic](https://crytic.io). O Crytic pode consumir e avaliar testes de propriedades de segurança para que todos na sua equipe possam ver facilmente que eles passam no GitHub. Testes com falha podem bloquear commits.

Por fim, esteja atento a problemas que ferramentas automatizadas não conseguem encontrar facilmente:

- Falta de privacidade: todos os outros podem ver suas transações enquanto elas estão na fila do pool
- Transações de front-running
- Operações criptográficas
- Interações arriscadas com componentes externos de finanças descentralizadas (DeFi)

## Peça ajuda {#ask-for-help}

O [horário de atendimento do Ethereum](https://calendly.com/dan-trailofbits/office-hours) ocorre todas as terças-feiras à tarde. Essas sessões individuais de 1 hora são uma oportunidade para nos fazer qualquer pergunta que você tenha sobre segurança, solucionar problemas usando nossas ferramentas e obter feedback de especialistas sobre sua abordagem atual. Nós o ajudaremos a trabalhar com este guia.

Junte-se ao nosso Slack: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Estamos sempre disponíveis nos canais #crytic e #ethereum se você tiver alguma dúvida.