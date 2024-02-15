---
title: Checklist de integração do token
description: Uma lista de coisas a considerar ao interagir com tokens
author: "Trailofbits"
lang: pt-br
tags:
  - "solidity"
  - "contratos inteligentes"
  - "segurança"
  - "tokens"
skill: intermediate
published: 2020-08-13
source: Construindo contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Siga este checklist ao interagir com tokens arbitrários. Certifique-se de que você entende os riscos associados a cada item e justifique qualquer exceção a essas regras.

Por conveniência, todos os [utilitários](https://github.com/crytic/slither#tools) do Slither podem ser executados diretamente em um endereço de token, como:

[Usando Tutorial do Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Para seguir esta lista de verificação, você vai querer ter essa saída do Slither para o token:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # requer configuração, e uso de Echidna e Manticore
```

## Considerações gerais {#general-considerations}

- **O contrato tem uma revisão de segurança.** Evite interagir com contratos que não tenham uma revisão de segurança. Verifique a duração da avaliação (também conhecida como "nível de esforço"), a reputação da empresa de segurança e o número e a gravidade das descobertas.
- **Você entrou em contato com os desenvolvedores.** Talvez você precise alertar sua equipe para um incidente. Procure por contatos apropriados em [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Eles têm uma lista de e-mails de segurança para anúncios críticos.** Sua equipe deve aconselhar usuários (como você!) quando são encontrados problemas críticos ou quando ocorrem atualizações.

## Conformidade do ERC {#erc-conformity}

O Slither inclui um utilitário, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), que analisa a conformidade de um token com vários padrões de ERC relacionados. Use slither-check-erc para revisar que:

- **Transfer e transferFrom retornam um booleano.** Vários tokens não retornam um booleano nessas funções. Como resultado, suas chamadas no contrato podem falhar.
- **As funções "name", "decimals" e "symbol" estão presentes se usados.** Essas funções são opcionais no padrão do ERC20 e podem não estar presentes.
- **"Decimals" retorna um uint8.** Vários tokens retornam uma uint256 incorretamente. Se este for o caso, certifique-se de que o valor retornado é inferior a 255.
- **O token mitiga a conhecida condição de corrida do [ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** O padrão ERC20 possui uma condição de corrida conhecida do ERC20 que deve ser mitigada para evitar que invasores roubem tokens.
- **O token não é um token ERC777 e não tem nenhuma chamada de função externa na "transfer" e "transferFrom".** Chamadas externas nas funções de transferência podem levar a reentradas.

O Slither inclui um utilitário, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), que gera testes unitários e propriedades de segurança que podem descobrir muitas falhas comuns do ERC. Use slither-check-erc para revisar que:

- **O contrato passa em todos os testes unitários e propriedades de segurança do slither-prop.** Execute os testes unitários gerados e então verifique as propriedades com [Echidna](https://github.com/crytic/echidna) e [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Por último, há certas características que são difíceis de identificar automaticamente. Revisão destas condições manualmente:

- **"Transfer" e "transferFrom" não devem cobrar taxas.** Os tokens deflacionários podem levar a um comportamento inesperado.
- **Os potenciais juros obtidos com os token são retirados da conta.** Alguns tokens distribuem juros para os titulares (holders) de tokens. Estes juros podem estar atados ao contrato caso não tenham sido retirados da conta.

## Composição do contrato {#contract-composition}

- **O contrato evita a complexidade desnecessária.** O token deve ser um contrato simples; um token com código complexo requer um padrão de revisão mais alto. Use o [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) do Slither para identificar um código complexo.
- **O contrato usa SafeMath.** Contratos que não usam SafeMath requerem um padrão de revisão mais elevado. Inspecione o contrato manualmente para uso de SafeMath.
- **O contrato tem apenas algumas funções "non–token-related".** Funções "non–token-related" aumentam a probabilidade de ocorrência de problemas no contrato. Use o [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) do Slither para revisar amplamente o código usado no contrato.
- **O token tem apenas um endereço.** Tokens com vários pontos de entrada para atualizações de saldo podem quebrar a contabilidade interna com base no endereço (Ex.: `balances[token_address][msg.sender]` pode não refletir o saldo atual).

## Privilégios do proprietário {#owner-privileges}

- **O token não é atualizável.** Contratos atualizáveis podem mudar suas regras ao longo do tempo. Use a impressora de [resumo-humano do Slither](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) para identificar um código complexo.
- **O proprietário tem capacidades limitadas de cunhagem.** Os proprietários maliciosos ou comprometidos podem abusar das capacidades de cunhagem. Use a impressora [de resumo humano do Sliter](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) para revisar as capacidades de cunhagem e considere revisar manualmente o código.
- **O token não é pausável.** Os proprietários maliciosos ou comprometidos podem capturar contratos que dependem de tokens pausáveis. Identifique o código pauseável à mão.
- **O proprietário não pode bloquear o contrato.** Donos maliciosos ou comprometidos podem prender contratos dependendo de tokens com uma lista negra. Identifique os recursos da lista negra à mão.
- **A equipe por trás do token é conhecida e pode ser considerada responsável por abusos.** Contratos com equipes de desenvolvimento anônimas, ou que residam em abrigos legais devem exigir um padrão de revisão mais elevado.

## Escassez de token {#token-scarcity}

Revisões de problemas de escassez de tokens requerem revisão manual. Verifique estas condições:

- **Nenhum usuário é dono da maior parte do abastecimento.** Se alguns usuários possuem a maioria dos tokens, eles podem influenciar operações baseadas na repartição do token.
- **A oferta total é suficiente.** Tokens com uma oferta baixa podem ser facilmente manipulados.
- **Os tokens estão localizados em mais de algumas trocas.** Se todos os tokens estiverem em uma troca, um compromisso da troca pode comprometer o contrato que depende do token.
- **Os usuários entendem os riscos associados a grandes fundos ou flash loans.** Contratos que dependem do saldo do token devem levar cuidadosamente em consideração ataques com grandes fundos ou ataques por meio de flash loans.
- **O token não permite flash minting**. O "Flash minting" pode levar a oscilações substanciais na balança e no fornecimento total, o que exige verificações de overflow rigorosas e abrangentes na operação do token.
