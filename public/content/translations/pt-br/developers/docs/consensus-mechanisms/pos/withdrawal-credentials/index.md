---
title: Credenciais de saque
description: "Uma explicação sobre os tipos de credenciais de saque de validador (0x00, 0x01, 0x02) e suas implicações para os stakers do Ethereum."
lang: pt-br
---

Todo validador tem uma **credencial de saque** que determina como e onde o seu ETH em stake e as recompensas podem ser sacados. O tipo de credencial é indicado pelo primeiro byte: `0x00`, `0x01` ou `0x02`. Entender esses tipos é importante para os validadores que gerenciam o seu stake.

## 0x00: Credenciais pré-Shapella {#0x00-credentials}

O tipo `0x00` é o formato original de credencial de saque de antes da atualização Shapella (abril de 2023). Validadores com esse tipo de credencial não têm um endereço de saque da camada de execução definido, o que significa que seus fundos permanecem bloqueados na camada de consenso. Se você ainda tem credenciais `0x00`, você deve atualizar para `0x01` ou `0x02` antes de poder receber quaisquer saques.

## 0x01: Credenciais de saque legadas {#0x01-credentials}

O tipo `0x01` foi introduzido com a atualização Shapella e se tornou o padrão para validadores que queriam definir um endereço de saque da camada de execução. Com credenciais `0x01`:

- Qualquer saldo acima de 32 ETH é **varrido automaticamente** para o seu endereço de saque
- Saídas completas passam pela fila de saída padrão
- Recompensas acima de 32 ETH não podem ser compostas — elas são varridas periodicamente

**Por que alguns validadores ainda usam 0x01:** É mais simples e familiar. Muitos validadores depositaram após a Shapella e já têm esse tipo, e funciona bem para aqueles que querem saques automáticos do saldo excedente.

**Por que não é recomendado:** Com `0x01`, você perde a capacidade de compor recompensas acima de 32 ETH. Cada parte do excedente é varrida automaticamente, o que limita o potencial de ganho do seu validador e exige o gerenciamento dos fundos sacados separadamente.

## 0x02: Credenciais de saque compostas {#0x02-credentials}

O tipo `0x02` foi introduzido com a atualização Pectra e é a **escolha recomendada** para validadores hoje. Validadores com credenciais `0x02` às vezes são chamados de "validadores compostos".

Com credenciais `0x02`:

- Recompensas acima de 32 ETH **são compostas** em incrementos de 1 ETH até um saldo efetivo máximo de 2048 ETH
- Saques parciais devem ser solicitados manualmente (varreduras automáticas só ocorrem acima do limite de 2048 ETH)
- Validadores podem consolidar múltiplos validadores de 32 ETH em um único validador de saldo maior
- Saídas completas ainda são suportadas através da fila de saída padrão

Tanto os saques parciais quanto as consolidações podem ser realizados através das [Ações de Validador do Launchpad](https://launchpad.ethereum.org/en/validator-actions).

**Por que os validadores devem preferir 0x02:** Oferece melhor eficiência de capital através da composição, mais controle sobre quando os saques acontecem e suporta a consolidação de validadores. Para stakers solo que acumulam recompensas ao longo do tempo, isso significa que seu saldo efetivo — e, portanto, suas recompensas — pode crescer além de 32 ETH sem intervenção manual.

**Importante:** Uma vez que você converte de `0x01` para `0x02`, você não pode reverter.

Para um guia detalhado sobre a conversão para credenciais do Tipo 2 e o recurso MaxEB, consulte a [página explicativa do MaxEB](/roadmap/pectra/maxeb/).

## O que devo escolher? {#what-should-i-pick}

- **Novos validadores:** Escolha `0x02`. É o padrão moderno com melhor composição e flexibilidade.
- **Validadores 0x01 existentes:** Considere converter para `0x02` se você quiser que as recompensas sejam compostas acima de 32 ETH ou se planeja consolidar validadores.
- **Validadores 0x00 existentes:** Atualize imediatamente — você não pode sacar sem atualizar suas credenciais. Você deve primeiro converter para `0x01`, e então poderá converter para `0x02`.

## Ferramentas para gerenciar credenciais de saque {#withdrawal-credential-tools}

Várias ferramentas suportam a escolha ou conversão entre tipos de credenciais:

- **[Ethereum Staking Launchpad](https://launchpad.ethereum.org/en/validator-actions)** - A ferramenta oficial para depósitos e gerenciamento de validadores, incluindo conversões de credenciais e consolidações
- **[Pectra Staking Manager](https://pectrastaking.com)** - Interface web com suporte a conexão de carteira para conversões e consolidação
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)** - Ferramenta de linha de comando para conversões em lote
- **[Ethereal](https://github.com/wealdtech/ethereal)** - Ferramenta CLI para operações no Ethereum, incluindo gerenciamento de validadores

Para uma lista completa de ferramentas de consolidação e instruções detalhadas de conversão, consulte as [ferramentas de consolidação do MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Leitura adicional {#further-reading}

- [Chaves no Ethereum de Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/keys/) - Aprenda sobre chaves de validador e como elas se relacionam com as credenciais de saque
- [MaxEB](/roadmap/pectra/maxeb/) - Guia detalhado sobre a atualização Pectra e o recurso de saldo efetivo máximo