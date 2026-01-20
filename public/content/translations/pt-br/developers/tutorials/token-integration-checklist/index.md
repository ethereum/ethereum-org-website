---
title: "Lista de verificação de integração de tokens"
description: "Uma lista de verificação de itens a serem considerados ao interagir com tokens"
author: "Trailofbits"
lang: pt-br
tags: [ "solidez", "smart contracts", "segurança", "tokens" ]
skill: intermediate
published: 2020-08-13
source: Construindo contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Siga esta lista de verificação ao interagir com tokens arbitrários. Certifique-se de que você entende os riscos associados a cada item e justifique quaisquer exceções a estas regras.

Para sua conveniência, todos os [utilitários](https://github.com/crytic/slither#tools) do Slither podem ser executados diretamente em um endereço de token, como:

[Tutorial de uso do Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Para seguir esta lista de verificação, você precisará ter este resultado do Slither para o token:

```bash
- slither-check-erc [target] [contractName] [opcional: --erc NÚMERO_ERC]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # requer configuração e uso de Echidna e Manticore
```

## Considerações gerais {#general-considerations}

- **O contrato tem uma revisão de segurança.** Evite interagir com contratos que não tenham uma revisão de segurança. Verifique a duração da avaliação (também conhecida como "nível de esforço"), a reputação da empresa de segurança, o número e a gravidade das descobertas.
- **Você entrou em contato com os desenvolvedores.** Talvez você precise alertar a equipe deles sobre um incidente. Procure por contatos apropriados em [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Eles têm uma lista de e-mails de segurança para anúncios críticos.** A equipe deles deve avisar os usuários (como você!) quando problemas críticos são encontrados ou quando ocorrem atualizações.

## Conformidade com o ERC {#erc-conformity}

O Slither inclui um utilitário, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), que analisa a conformidade de um token com vários padrões ERC relacionados. Use o slither-check-erc para verificar que:

- **As funções Transfer e transferFrom retornam um booleano.** Vários tokens não retornam um booleano nessas funções. Como resultado, as chamadas para elas no contrato podem falhar.
- **As funções "name", "decimals" e "symbol" estão presentes se utilizadas.** Essas funções são opcionais no padrão ERC20 e podem não estar presentes.
- **A função Decimals retorna um uint8.** Vários tokens retornam incorretamente um uint256. Nesse caso, certifique-se de que o valor retornado seja inferior a 255.
- **O token mitiga a conhecida [condição de corrida do ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** O padrão ERC20 tem uma condição de corrida conhecida que deve ser mitigada para impedir que invasores roubem tokens.
- **O token não é um token ERC777 e não possui chamadas de função externa em transfer e transferFrom.** Chamadas externas nas funções de transferência podem levar a reentrâncias.

O Slither inclui um utilitário, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), que gera testes de unidade e propriedades de segurança que podem descobrir muitas falhas comuns do ERC. Use o slither-prop para verificar que:

- **O contrato passa em todos os testes de unidade e propriedades de segurança do slither-prop.** Execute os testes de unidade gerados e, em seguida, verifique as propriedades com [Echidna](https://github.com/crytic/echidna) e [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Finalmente, existem certas características que são difíceis de identificar automaticamente. Verifique estas condições manualmente:

- **As funções transfer e transferFrom não devem cobrar uma taxa.** Tokens deflacionários podem levar a um comportamento inesperado.
- **Os juros potenciais ganhos com o token são levados em conta.** Alguns tokens distribuem juros aos detentores de tokens. Esses juros podem ficar presos no contrato se não forem levados em conta.

## Composição do contrato {#contract-composition}

- **O contrato evita complexidade desnecessária.** O token deve ser um contrato simples; um token com código complexo exige um padrão de revisão mais elevado. Use o [impressor de resumo para humanos](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) do Slither para identificar códigos complexos.
- **O contrato usa SafeMath.** Contratos que não usam SafeMath exigem um padrão de revisão mais elevado. Inspecione o contrato manualmente quanto ao uso do SafeMath.
- **O contrato tem apenas algumas funções não relacionadas a tokens.** Funções não relacionadas a tokens aumentam a probabilidade de um problema no contrato. Use o [impressor de resumo de contrato (contract-summary printer)](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) do Slither para analisar amplamente o código usado no contrato.
- **O token tem apenas um endereço.** Tokens com múltiplos pontos de entrada para atualizações de saldo podem quebrar a escrituração interna com base no endereço (por exemplo, `balances[token_address][msg.sender]` pode não refletir o saldo real).

## Privilégios do proprietário {#owner-privileges}

- **O token não é atualizável.** Contratos atualizáveis podem mudar suas regras ao longo do tempo. Use o [impressor de resumo para humanos](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) do Slither para determinar se o contrato é atualizável.
- **O proprietário tem capacidades de cunhagem (minting) limitadas.** Proprietários mal-intencionados ou comprometidos podem abusar das capacidades de cunhagem. Use o [impressor de resumo para humanos](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) do Slither para analisar as capacidades de cunhagem e considere revisar manualmente o código.
- **O token não é pausável.** Proprietários mal-intencionados ou comprometidos podem bloquear contratos que dependem de tokens pausáveis. Identifique manualmente o código pausável.
- **O proprietário não pode colocar o contrato em uma lista negra.** Proprietários mal-intencionados ou comprometidos podem bloquear contratos que dependem de tokens com uma lista negra. Identifique manualmente os recursos de lista negra.
- **A equipe por trás do token é conhecida e pode ser responsabilizada por abuso.** Contratos com equipes de desenvolvimento anônimas, ou que residem em abrigos legais, devem exigir um padrão de revisão mais elevado.

## Escassez de tokens {#token-scarcity}

A análise de problemas de escassez de tokens requer revisão manual. Verifique as seguintes condições:

- **Nenhum usuário detém a maior parte da oferta.** Se alguns poucos usuários detiverem a maioria dos tokens, eles podem influenciar as operações com base na distribuição do token.
- **A oferta total é suficiente.** Tokens com uma oferta total baixa podem ser facilmente manipulados.
- **Os tokens estão localizados em mais do que algumas corretoras.** Se todos os tokens estiverem em uma única corretora, um comprometimento da corretora pode comprometer o contrato que depende do token.
- **Os usuários entendem os riscos associados a grandes fundos ou flash loans.** Contratos que dependem do saldo do token devem considerar cuidadosamente os invasores com grandes fundos ou ataques por meio de flash loans.
- **O token não permite flash minting**. O flash minting pode levar a oscilações substanciais no saldo e na oferta total, o que necessita de verificações de overflow rigorosas e abrangentes na operação do token.
