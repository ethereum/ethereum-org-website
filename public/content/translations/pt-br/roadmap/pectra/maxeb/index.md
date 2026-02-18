---
title: Pectra MaxEB
description: Saiba mais sobre o MaxEB no comunicado da Pectra
lang: pt-br
---

# MaxEB {#maxeb}

_tl;dr:_ O hard fork do Pectra permite que os validadores do Ethereum optem por um saldo máximo efetivo maior e composição por meio da conversão de credenciais de saque do **Tipo 1** para o **Tipo 2**. A ferramenta oficial para fazer isso é o Launchpad. Esta operação não pode ser revertida.

## Visão geral {#overview}

### Quem é afetado? {#who-is-affected}

Qualquer pessoa que executa um validador — provavelmente é alguém que conhece o índice (por exemplo, [Validador #12345](https://beaconcha.in/validator/12345)) de um validador que controla. Se você usar um protocolo para executar um validador (por exemplo, Lido CSM ou Rocket Pool), terá que verificar com eles para ver se e quando eles suportam o maxEB.

Se você faz stake usando um token de staking líquido (por exemplo, rETH ou stETH), nenhuma ação é necessária ou recomendada.

### O que é "maxEB"? {#what-is-maxeb}

maxEB = Saldo Efetivo MÁXimo de um validador. Até o hard fork do Pectra, cada validador ganha em um máximo de 32 ETH. Após o Pectra, os validadores têm a opção de ganhar em qualquer saldo entre 32 e 2048 ETH, em incrementos de 1 ETH, ao optar pela alteração.

### Como um validador opta por participar? {#how-does-a-validator-opt-in}

Um validador opta pela alteração do maxEB convertendo credenciais de saque de **Tipo 1** para **Tipo 2**. Isso pode ser feito no [Launchpad (Ações do Validador)](https://launchpad.ethereum.org/validator-actions) depois que a hard fork Pectra for ativada. Assim como acontece com **Tipo 0** → **Tipo 1**, a conversão de **Tipo 1** → **Tipo 2** é um processo irreversível.

### O que é uma credencial de saque? {#whats-a-withdrawal-credential}

Ao executar um validador, você tem um conjunto de credenciais de saque. Eles podem ser encontrados nos seus dados de depósito json ou você pode visualizá-los no beaconcha.in [aba de depósito](https://beaconcha.in/validator/12345#deposits) do seu validador.

1. Credenciais de saque do **Tipo 0**: Se as credenciais de saque do seu validador começarem com `0x00...`, você depositou antes do hard fork do Shapella e ainda não tem um endereço de retirada definido.

![Credencial de retirada tipo 0](./0x00-wd.png)

2. Credenciais de retirada do **Tipo 1**: Se as credenciais de retirada do seu validador começarem com `0x01...`, você depositou após o hard fork do Shapella ou já converteu seus registros do **Tipo 0** para credenciais do **Tipo 1**.

![Credencial de retirada tipo 1](./0x01-wd.png)

3. Credenciais de saque do **Tipo 2**: Este novo tipo de credencial de retirada começará com `0x02...` e será habilitado após o Pectra. Os validadores com credenciais de retirada do **Tipo 2** são às vezes chamados de "**validadores compostos**"

| **Permitido**     | **Não permitido** |
| ----------------- | ----------------- |
| ✅ Tipo 0 → Tipo 1 | ❌ Tipo 0 → Tipo 2 |
| ✅ Tipo 1 → Tipo 2 | ❌ Tipo 1 → Tipo 0 |
|                   | ❌ Tipo 2 → Tipo 1 |
|                   | ❌ Tipo 2 → Tipo 0 |

### Riscos {#risks}

O MaxEB permite que um validador envie todo o seu saldo para outro validador. Os usuários que enviam uma solicitação de consolidação devem verificar a origem e o conteúdo da transação que estão assinando. A ferramenta oficial para aproveitar os recursos do maxEB é o Launchpad. Se você decidir usar uma ferramenta de terceiros, verifique se:

- A chave pública e o endereço de saque do validador de origem correspondem ao validador que eles controlam
- A chave pública do validador de destino está correta e pertence a ele
- A solicitação é uma conversão, não uma consolidação, se eles não pretendem enviar fundos para outro validador
- A transação está sendo assinada pelo endereço de saque correto

**Recomendamos fortemente** que você discuta qualquer ferramenta de terceiros que planeja usar com a [comunidade EthStaker](https://ethstaker.org/about). É um lugar útil para verificar sua abordagem e evitar erros. Se você usar uma ferramenta maliciosa ou mal configurada, **todo o saldo do seu validador poderá ser enviado para um validador que você não controla**, sem nenhuma maneira de recuperá-lo.

## Detalhes técnicos {#technical-details}

### O fluxo {#the-flow}

Haverá dois usos da operação `ConsolidationRequest`:

1. Convertendo um validador existente de **Tipo 1** para um validador **Tipo 2**
2. Consolidando outros validadores em um validador **Tipo 2** existente

Em uma conversão de um validador **Tipo 1** para um validador **Tipo 2**, tanto a _origem_ quanto o _destino_ serão o validador que você está convertendo. A operação custará gás e ficará atrás de outros pedidos de consolidação. Esta fila é **separada** da fila de depósitos, não é afetada por novos depósitos de validadores e pode ser visualizada em [pectrified.com](https://pectrified.com/).

Para consolidar validadores, você deve ter um _validador destinatário_ que tenha uma credencial de saque **Tipo 2**. Este é o destino de quaisquer saldos de validadores que estão sendo consolidados e o índice que está sendo preservado.

### Requisitos para conversão para o Tipo 2 {#requirements-for-converting-to-type-2}

Isso será necessário para o primeiro validador que você converter para **Tipo 2**. O índice deste validador é preservado e ativo. Para uma conversão, o _validador de origem_ == o _validador de destino._

O validador deve...

- ser ativo
- ter credenciais de saque do **Tipo 1**
- não estar em um estado de saída (ou "slashed")
- não ter saques pendentes acionadas manualmente (não se aplica a varreduras)

![ilustração de conversão](./conversion.png)

### Requisitos para consolidação {#requirements-for-consolidating}

Esta é a _mesma operação_ da conversão, mas ocorre quando o _validador de origem_ é diferente do _validador de destino_. O índice do validador de destino é preservado e aceita o saldo do validador de origem. O índice do validador de origem é colocado em um estado `EXITED`.

Neste caso, o validador de origem tem todos os mesmos requisitos acima, além de:

- está ativo há pelo menos ~27,3 horas (um `SHARD_COMMITTEE_PERIOD`)

O validador de destino deve

- ter credenciais de saque do **Tipo 2**
- não estar em um estado de saída.

![ilustração de consolidação](./consolidation.png)

### A solicitação de consolidação {#the-consolidation-request}

A solicitação de consolidação será assinada pelo endereço de saque associado ao validador de origem e terá:

1. Endereço do validador de origem (por exemplo, `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Chave pública do validador de origem (por exemplo, `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Chave pública desse validador de destino

Em uma conversão, 2 e 3 serão iguais. Esta operação pode ser feita no [Launchpad](https://launchpad.ethereum.org/).

### Requisitos de assinatura {#signing-requirements}

Para enviar uma `ConsolidationRequest`, o **endereço de saque do validador de origem** deve assinar a solicitação. Isso demonstra o controle sobre os fundos do validador.

### O que é assinado? {#what-is-signed}

É utilizado o [signing root] com separação de domínio do objeto(https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root) 'ConsolidationRequest'.

- **Domínio:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Campos do signing root:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

A **assinatura BLS** obtida é submetida em conjunto com a requisição.

Nota: A assinatura é realizada pelo endereço de saque, não pela chave do validador.

### Retiradas parciais {#partial-withdrawals}

Os validadores com credenciais **Tipo 1** recebem varreduras automáticas, sem custo de gás, do saldo excedente (acima de 32 ETH) para o seu endereço de saque. Como o **Tipo 2** permite que um validador acumule saldos em incrementos de 1 ETH, não haverá varredura automática até que o saldo atinja 2048 ETH. Saques parciais em validadores do Tipo 2 devem ser acionados manualmente e implicam custo de gas.

## Ferramentas de consolidação {#consolidation-tooling}

Há várias ferramentas disponíveis para gerenciar consolidações. A ferramenta oficial, criada pela Ethereum Foundation, é o [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Tem também ferramentas de terceiros criadas por entidades da comunidade de staking que podem oferecer recursos não fornecidos pelo Launchpad. Embora as ferramentas aqui não sejam auditadas nem endossadas pela Ethereum Foundation, as seguintes são ferramentas de código aberto criadas por membros reconhecidos da comunidade.

| Ferramenta                             | Website                                                                                                   | Código aberto                   | Criador                                        | Auditado                                                                                                                                                | Interface                                                                                 | Características notáveis                                                                      |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Gerenciador de Staking Pectra          | pectrastaking.com                                                                         | Sim, Apache 2.0 | [Pier Two](https://piertwo.com/)               | Não                                                                                                                                                     | Usuário web                                                                               | WalletConnect, funciona com SAF                                                               |
| Ferramenta CLI da Pectra Validator Ops | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract)                                              | Sim, MIT                        | [Luganodes](https://www.luganodes.com/)        | Sim, Quantstamp [maio de 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Linha de comando                                                                          | Processamento em lote, para muitos validadores de uma vez                                     |
| Ethereal                               | [GitHub](https://github.com/wealdtech/ethereal)                                                           | Sim, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Não                                                                                                                                                     | Linha de comando                                                                          | Conjunto completo de recursos para gerenciamento de validadores e nós                         |
| Siren                                  | [GitHub](https://github.com/sigp/siren)                                                                   | Sim, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/)          | Não                                                                                                                                                     | Algumas linhas de comando, mas principalmente interface web                               | Só funciona se você estiver usando o cliente de consenso Lighthouse                           |
| Consolideth.app        | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Sim, licenças MIT               | [Stakely](https://stakely.io/)                 | Não                                                                                                                                                     | UI da web, hospedada pela Stakely e pronta para auto-hospedagem gratuita. | Suporta as principais conexões de carteira, incluindo Safe com WalletConnect. |

## FAQ {#faq}

### Optar por participar altera minha sorte ou recompensas na proposta? {#change-luck-or-rewards}

Não. Optar por participar não diminui sua mudança de proposta - suas funções e seleção de propostas permanecem as mesmas. Por exemplo, se você tiver dois validadores de 32 ETH vs um validador de 64 ETH, você terá as mesmas chances totais de ser selecionado para propor um bloco e ganhar recompensas.

### Ao optar por participar, meu risco de slashing muda? {#change-slashing-risk}

Para operadores menores ou não profissionais, a resposta curta é não. De forma mais completa, para operadores profissionais que executam vários validadores por nó com sistema de alertas rápido, consolidar esses validadores em menos unidades pode dificultar a reação a slashing e a prevenção de efeitos em cascata. A _penalidade_ inicial de slashing para todos os validadores foi drasticamente reduzida de 1 ETH (por 32 ETH) para 0,0078125 ETH (por 32 ETH) para compensar esse risco.

### Preciso sair do meu validador para converter? {#exit-validator}

Não. Você pode converter no local sem sair.

### Quanto tempo levará para converter / consolidar? {#how-long}

Um mínimo de 27,3 horas, mas as consolidações também estão sujeitas a uma fila. Esta fila é independente das filas de depósito e retirada e não é afetada por elas.

### Posso manter meu índice de validador? {#keep-validator-index}

Sim. A conversão no local mantém o mesmo índice do validador. Se você consolidar vários validadores, só poderá manter o índice do _validador de destino_.

### Vou perder as atestações? {#miss-attestations}

Durante uma consolidação em outro validador, o validador de origem é encerrado e há um período de espera de ~27 horas antes que o saldo fique ativo no validador de destino. Este período **não afeta as métricas de desempenho**.

### Serei penalizado? {#incur-penalties}

Não. Enquanto seu validador estiver online, você não incorrerá em penalidades.

### Os endereços de saque dos validadores que estão sendo consolidados precisam ser iguais? {#withdrawal-addresses-match}

Não. Mas a _fonte_ deve autorizar a solicitação a partir de seu próprio endereço.

### Minhas recompensas serão compostos após a conversão? {#rewards-compound}

Sim. Com credenciais do **Tipo 2**, recompensas acima de 32 ETH são automaticamente recolocadas, mas não instantaneamente. Devido a um pequeno buffer (chamado [_histerese_](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)) seu saldo precisa atingir **cerca de 1,25 ETH a mais** antes que o extra seja recolocado. Então, em vez de ser composto em 33,0 ETH, ele acontece em 33,25 (saldo efetivo = 33 ETH), depois em 34,25 (saldo efetivo = 34 ETH) e assim por diante.

### Ainda posso ser alvo de "auto sweeps" após a conversão? {#automatic-sweep}

Varreduras automáticas só ocorrerão com saldos excedentes acima de 2048. Para todos os outros saques parciais, você precisará acioná-los manualmente.

### Posso mudar de ideia e voltar do Tipo 2 para o Tipo 1? {#go-back-to-type1}

Não. A conversão para o **Tipo 2** é irreversível.

### Se eu quiser consolidar vários validadores, preciso converter cada um para o Tipo 2 primeiro? {#consolidate-multiple-validators}

Não! Converta um validador para o Tipo 2 e use-o como alvo. Todos os outros validadores consolidados nesse alvo Tipo 2 podem ser Tipo 1 ou Tipo 2

### Meu validador está offline ou abaixo de 32 ETH, ainda posso convertê-lo? {#offline-or-below-32eth}

Sim. Desde que esteja ativo (não encerrado) e você possa assinar com seu endereço de saque, você pode convertê-lo.

## Documentos {#resources}

- [Especificações de consenso do Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md): Esta é a versão "mais verdadeira" na qual você deve confiar. Em caso de dúvida, leia as especificações
- Nem todo mundo se sente confortável navegando pelo código, então [este maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) pode ajudar a interpretar as especificações. _Aviso: As especificações, não a IA, devem ser consideradas verdadeiras, pois a IA pode interpretar mal as informações ou ter alucinações nas respostas_
- [pectrified.com](https://pectrified.com/): Veja o estado das consolidações, depósitos e tempos de espera na fila
- [Ethereal](https://github.com/wealdtech/ethereal): Ferramenta CLI criada pela comunidade para gerenciar tarefas comuns de validadores
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Contrato criado pela comunidade que permite que vários validadores Ethereum sejam depositados em uma única transação
