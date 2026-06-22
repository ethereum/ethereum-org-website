---
title: "Lista de verificação de integração de tokens"
description: "Uma lista de verificação de coisas a considerar ao interagir com tokens"
author: "Trailofbits"
lang: pt-br
tags: ["Solidity", "contratos inteligentes", "segurança", "tokens"]
skill: intermediate
breadcrumb: "Integração de tokens"
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Siga esta lista de verificação ao interagir com tokens arbitrários. Certifique-se de entender os riscos associados a cada item e justifique quaisquer exceções a essas regras.

Por conveniência, todos os [utilitários](https://github.com/crytic/slither#tools) do Slither podem ser executados diretamente em um endereço de token, como:

[Tutorial de uso do Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Para seguir esta lista de verificação, você vai querer ter esta saída do Slither para o token:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # exige configuração, e o uso do Echidna e do Manticore
```

## Considerações gerais {#general-considerations}

- **O contrato possui uma revisão de segurança.** Evite interagir com contratos que não tenham uma revisão de segurança. Verifique a duração da avaliação (também conhecida como “nível de esforço”), a reputação da empresa de segurança e o número e a gravidade das descobertas.
- **Você entrou em contato com os desenvolvedores.** Você pode precisar alertar a equipe deles sobre um incidente. Procure contatos apropriados em [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Eles têm uma lista de e-mails de segurança para anúncios críticos.** A equipe deles deve avisar os usuários (como você!) quando problemas críticos forem encontrados ou quando ocorrerem atualizações.

## Conformidade com ERC {#erc-conformity}

O Slither inclui um utilitário, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), que revisa a conformidade de um token com muitos padrões ERC relacionados. Use o slither-check-erc para revisar se:

- **Transfer e transferFrom retornam um booleano.** Vários tokens não retornam um booleano nessas funções. Como resultado, suas chamadas no contrato podem falhar.
- **As funções name, decimals e symbol estão presentes, se usadas.** Essas funções são opcionais no padrão ERC-20 e podem não estar presentes.
- **Decimals retorna um uint8.** Vários tokens retornam incorretamente um uint256. Se for esse o caso, certifique-se de que o valor retornado seja inferior a 255.
- **O token mitiga a conhecida [condição de corrida do ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** O padrão ERC-20 tem uma condição de corrida conhecida que deve ser mitigada para evitar que invasores roubem tokens.
- **O token não é um token ERC-777 e não tem chamada de função externa em transfer e transferFrom.** Chamadas externas nas funções de transferência podem levar a reentrâncias.

O Slither inclui um utilitário, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), que gera testes unitários e propriedades de segurança que podem descobrir muitas falhas comuns de ERC. Use o slither-prop para revisar se:

- **O contrato passa em todos os testes unitários e propriedades de segurança do slither-prop.** Execute os testes unitários gerados e, em seguida, verifique as propriedades com o [Echidna](https://github.com/crytic/echidna) e o [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Por fim, existem certas características que são difíceis de identificar automaticamente. Revise essas condições manualmente:

- **Transfer e transferFrom não devem cobrar uma taxa.** Tokens deflacionários podem levar a comportamentos inesperados.
- **Os juros potenciais ganhos com o token são levados em consideração.** Alguns tokens distribuem juros aos detentores de tokens. Esses juros podem ficar presos no contrato se não forem levados em consideração.

## Composição do contrato {#contract-composition}

- **O contrato evita complexidade desnecessária.** O token deve ser um contrato simples; um token com código complexo exige um padrão de revisão mais alto. Use o [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) do Slither para identificar códigos complexos.
- **O contrato usa SafeMath.** Contratos que não usam SafeMath exigem um padrão de revisão mais alto. Inspecione o contrato manualmente quanto ao uso do SafeMath.
- **O contrato tem apenas algumas funções não relacionadas a tokens.** Funções não relacionadas a tokens aumentam a probabilidade de um problema no contrato. Use o [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) do Slither para revisar amplamente o código usado no contrato.
- **O token tem apenas um endereço.** Tokens com vários pontos de entrada para atualizações de saldo podem quebrar a contabilidade interna baseada no endereço (por exemplo, `balances[token_address][msg.sender]` pode não refletir o saldo real).

## Privilégios do proprietário {#owner-privileges}

- **O token não é atualizável.** Contratos atualizáveis podem mudar suas regras ao longo do tempo. Use o [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) do Slither para determinar se o contrato é atualizável.
- **O proprietário tem capacidades limitadas de cunhagem.** Proprietários mal-intencionados ou comprometidos podem abusar das capacidades de cunhagem. Use o [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) do Slither para revisar as capacidades de cunhagem e considere revisar o código manualmente.
- **O token não é pausável.** Proprietários mal-intencionados ou comprometidos podem prender contratos que dependem de tokens pausáveis. Identifique códigos pausáveis manualmente.
- **O proprietário não pode colocar o contrato em uma lista de bloqueio (blacklist).** Proprietários mal-intencionados ou comprometidos podem prender contratos que dependem de tokens com uma lista de bloqueio. Identifique recursos de lista de bloqueio manualmente.
- **A equipe por trás do token é conhecida e pode ser responsabilizada por abusos.** Contratos com equipes de desenvolvimento anônimas ou que residem em paraísos fiscais devem exigir um padrão de revisão mais alto.

## Escassez de tokens {#token-scarcity}

As revisões de problemas de escassez de tokens exigem revisão manual. Verifique estas condições:

- **Nenhum usuário possui a maior parte do suprimento.** Se alguns usuários possuírem a maioria dos tokens, eles poderão influenciar as operações com base na repartição do token.
- **O suprimento total é suficiente.** Tokens com um suprimento total baixo podem ser facilmente manipulados.
- **Os tokens estão localizados em mais do que apenas algumas exchanges.** Se todos os tokens estiverem em uma exchange, o comprometimento da exchange pode comprometer o contrato que depende do token.
- **Os usuários entendem os riscos associados a grandes fundos ou empréstimos relâmpago (flash loans).** Contratos que dependem do saldo do token devem levar em consideração cuidadosamente invasores com grandes fundos ou ataques por meio de empréstimos relâmpago.
- **O token não permite cunhagem relâmpago (flash minting)**. A cunhagem relâmpago pode levar a oscilações substanciais no saldo e no suprimento total, o que exige verificações rigorosas e abrangentes de overflow na operação do token.