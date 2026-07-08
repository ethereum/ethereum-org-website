---
title: MaxEB
metaTitle: Pectra MaxEB
description: Saiba mais sobre o MaxEB na atualização Pectra
lang: pt-br
authors: ["Nixo"]
---

*tl;dr:* A bifurcação rígida Pectra permite que os validadores do Ethereum optem por um saldo efetivo máximo maior e pela composição de rendimentos, convertendo as credenciais de saque do **Tipo 1** para o **Tipo 2**. A ferramenta oficial para fazer isso é o Launchpad. Esta operação não pode ser revertida.

## Visão geral {#overview}

### Quem é afetado? {#who-is-affected}

Qualquer pessoa que execute um validador - provavelmente alguém que conhece o índice (por exemplo, [Validador #12345](https://beaconcha.in/validator/12345)) de um validador que controla. Se você usa um protocolo para executar um validador (por exemplo, Lido CSM ou Rocket Pool), você terá que verificar com eles para ver se e quando eles suportarão o MaxEB.

Se você faz staking usando um token de staking líquido (LST) (por exemplo, rETH ou stETH), nenhuma ação é necessária ou recomendada.

### O que é "maxEB"? {#what-is-maxeb}

maxEB = o saldo efetivo máximo (MAXimum Effective Balance) de um validador. Até a bifurcação rígida Pectra, cada validador ganha rendimentos sobre um máximo de 32 ETH. Após a Pectra, os validadores têm a opção de ganhar sobre qualquer saldo entre 32 e 2048 ETH, em incrementos de 1 ETH, ao optar pela mudança.

### Como um validador adere à mudança? {#how-does-a-validator-opt-in}

Um validador adere à mudança do maxEB convertendo as credenciais de saque do **Tipo 1** para o **Tipo 2**. Isso pode ser feito no [Launchpad (Ações do Validador)](https://launchpad.ethereum.org/validator-actions) após a bifurcação rígida Pectra entrar no ar. Assim como no **Tipo 0** → **Tipo 1**, a conversão do **Tipo 1** → **Tipo 2** é um processo irreversível.

### O que é uma credencial de saque? {#whats-a-withdrawal-credential}

Quando você executa um validador, você tem um conjunto de credenciais de saque. Elas podem ser encontradas no seu JSON de dados de depósito ou você pode visualizá-las na [aba de depósito](https://beaconcha.in/validator/12345#deposits) do seu validador no beaconcha.in.

1. **Credenciais de saque do Tipo 0**: Se as credenciais de saque do seu validador começarem com `0x00...`, você depositou antes da bifurcação rígida Shapella e ainda não tem um endereço de saque configurado.

![Type 0 withdrawal credential](./0x00-wd.png)

2. **Credenciais de saque do Tipo 1**: Se as credenciais de saque do seu validador começarem com `0x01...`, você depositou após a bifurcação rígida Shapella ou já converteu suas credenciais do **Tipo 0** para credenciais do **Tipo 1**.

 ![Type 1 withdrawal credential](./0x01-wd.png)

3. **Credenciais de saque do Tipo 2**: Este novo tipo de credencial de saque começará com `0x02...` e será ativado após a Pectra. Validadores com credenciais de saque do **Tipo 2** às vezes são chamados de "**validadores de composição**"

| **Permitido** | **Não permitido** |
| --- | --- |
| ✅ Tipo 0 → Tipo 1 | ❌ Tipo 0 → Tipo 2 |
| ✅ Tipo 1 → Tipo 2 | ❌ Tipo 1 → Tipo 0 |
|  | ❌ Tipo 2 → Tipo 1 |
|  | ❌ Tipo 2 → Tipo 0 |

### Riscos {#risks}

O MaxEB permite que um validador envie todo o seu saldo para outro validador. Os usuários que enviam uma solicitação de consolidação devem verificar a origem e o conteúdo da transação que estão assinando. A ferramenta oficial para aproveitar os recursos do MaxEB é o Launchpad. Se você decidir usar uma ferramenta de terceiros, deve verificar se:

- A chave pública (pubkey) e o endereço de saque do validador de origem correspondem ao validador que controlam
- A chave pública do validador de destino está correta e pertence a eles
- A solicitação é uma conversão, não uma consolidação, se não tiverem a intenção de enviar fundos para outro validador
- A transação está sendo assinada pelo endereço de saque correto

Nós **recomendamos fortemente** discutir qualquer ferramenta de terceiros que você planeja usar com a [comunidade EthStaker](https://ethstaker.org/about). É um lugar útil para validar sua abordagem e evitar erros. Se você usar uma ferramenta maliciosa ou mal configurada, **todo o saldo do seu validador pode ser enviado para um validador que você não controla** — sem nenhuma maneira de recuperá-lo.

## Detalhes técnicos {#technical-details}

### O fluxo {#the-flow}

Haverá dois usos da operação `ConsolidationRequest`:

1. Converter um validador existente de um validador do **Tipo 1** para um do **Tipo 2**
2. Consolidar outros validadores em um validador existente do **Tipo 2**

Em uma conversão de um validador do **Tipo 1** para o **Tipo 2**, tanto a *origem* quanto o *destino* serão o validador que você está convertendo. A operação custará gás e será colocada na fila atrás de outras solicitações de consolidação. Esta fila é **separada** da fila de depósitos, não é afetada por novos depósitos de validadores e pode ser visualizada em [pectrified.com](https://pectrified.com/).

Para consolidar validadores, você deve ter um *validador de destino* que tenha uma credencial de saque do **Tipo 2**. Este é o destino de quaisquer saldos de validadores sendo consolidados, e o índice que será preservado.

### Requisitos para converter para o Tipo 2 {#requirements-for-converting-to-type-2}

Isso será necessário para o primeiro validador que você converter para o **Tipo 2**. O índice deste validador é preservado e permanece ativo. Para uma conversão, o *validador de origem* == o *validador de destino.*

O validador deve...

- estar ativo
- ter credenciais de saque do **Tipo 1**
- não estar em um estado de saída (ou ter sofrido penalização)
- não ter saques acionados manualmente pendentes (não se aplica a varreduras automáticas)

![conversion illustration](./conversion.png)

### Requisitos para consolidação {#requirements-for-consolidating}

Esta é a *mesma operação* da conversão, mas ocorre quando o *validador de origem* é diferente do *validador de destino*. O índice do validador de destino é preservado e aceita o saldo do validador de origem. O índice do validador de origem é colocado em um estado `EXITED`.

Neste caso, o validador de origem tem todos os mesmos requisitos acima, além de:

- estar ativo por pelo menos ~27,3 horas (uma `SHARD_COMMITTEE_PERIOD`)

O validador de destino deve

- ter credenciais de saque do **Tipo 2**
- não estar em um estado de saída.

![consolidation illustration](./consolidation.png)

### A solicitação de consolidação {#the-consolidation-request}

A solicitação de consolidação será assinada pelo endereço de saque associado ao validador de origem e conterá:

1. Endereço do validador de origem (por exemplo, `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Chave pública do validador de origem (por exemplo, `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Chave pública do validador de destino

Em uma conversão, 2 e 3 serão os mesmos. Esta operação pode ser feita no [Launchpad](https://launchpad.ethereum.org/).

### Requisitos de assinatura {#signing-requirements}

Para enviar uma `ConsolidationRequest`, o **endereço de saque do validador de origem** deve assinar a solicitação. Isso prova o controle sobre os fundos do validador.

### O que é assinado? {#what-is-signed}

Uma [raiz de assinatura](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root) com separação de domínio do objeto `ConsolidationRequest` é usada.

- **Domínio:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Campos da raiz de assinatura:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

A **assinatura BLS** resultante é enviada junto com a solicitação.

Nota: A assinatura é feita pelo endereço de saque, não pela chave do validador.

### Saques parciais {#partial-withdrawals}

Validadores com credenciais do **Tipo 1** recebem varreduras automáticas e sem custo de gás do seu saldo excedente (qualquer valor acima de 32 ETH) para o seu endereço de saque. Como o **Tipo 2** permite que um validador componha saldos em incrementos de 1 ETH, ele não fará a varredura automática dos saldos até atingir 2048 ETH. Saques parciais em validadores do **Tipo 2** devem ser acionados manualmente e custarão gás.

## Ferramentas de consolidação {#consolidation-tooling}

Existem várias ferramentas disponíveis para gerenciar consolidações. A ferramenta oficial, criada pela Fundação Ethereum, é o [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Também existem ferramentas de terceiros criadas por entidades da comunidade de staking que podem oferecer recursos não fornecidos pelo Launchpad. Embora as ferramentas aqui não sejam auditadas ou endossadas pela Fundação Ethereum, as seguintes são ferramentas de código aberto feitas por membros conhecidos da comunidade.

| Ferramenta | Site | Código aberto | Criador | Auditado | Interface | Recursos notáveis |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | Sim, Apache 2.0 | [Pier Two](https://piertwo.com/) | Não | Interface Web | WalletConnect, funciona com SAFE |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Sim, MIT | [Luganodes](https://www.luganodes.com/) | Sim, Quantstamp [Maio de 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Linha de comando | Processamento em lote, para muitos validadores de uma vez |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | Sim, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Não | Linha de comando | Conjunto completo de recursos para gerenciamento de validadores e nós |
| Siren | [GitHub](https://github.com/sigp/siren) | Sim, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/) | Não | Alguma linha de comando, mas principalmente interface Web | Funciona apenas se você estiver usando o cliente de consenso Lighthouse |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Sim, licenças MIT | [Stakely](https://stakely.io/) | Não | Interface Web, hospedada pela stakely e pronta para ser auto-hospedada livremente | Suporta as principais conexões de carteira, incluindo safe com WalletConnect |

## FAQ {#faq}

### Aderir à mudança altera minha sorte de proposta ou recompensas? {#change-luck-or-rewards}

Não. Aderir não diminui sua chance de proposta - suas funções e a seleção de propostas permanecem as mesmas. Por exemplo, se você tiver dois validadores de 32 ETH em vez de um validador de 64 ETH, terá as mesmas chances totais de ser selecionado para propor um bloco e ganhar recompensas.

### Aderir altera meu risco de penalização? {#change-slashing-risk}

Para operadores menores ou não profissionais, a resposta curta é não. A resposta mais longa é que, para operadores profissionais que executam muitos validadores por nó com alertas rápidos, a consolidação em menos validadores pode reduzir sua capacidade de reagir a uma penalização e evitar eventos em cascata. A *multa* inicial de penalização para todos os validadores foi drasticamente reduzida de 1 ETH (por 32 ETH) para 0,0078125 ETH (por 32 ETH) para compensar esse risco.

### Preciso sair do meu validador para converter? {#exit-validator}

Não. Você pode converter no local sem sair.

### Quanto tempo levará para converter / consolidar? {#how-long}

Um mínimo de 27,3 horas, mas as consolidações também estão sujeitas a uma fila. Esta fila é independente das filas de depósito e saque e não é afetada por elas.

### Posso manter meu índice de validador? {#keep-validator-index}

Sim. A conversão no local mantém o mesmo índice de validador. Se você consolidar vários validadores, só poderá manter o índice do *validador de destino*.

### Vou perder atestações? {#miss-attestations}

Durante uma consolidação em outro validador, o validador de origem sai e há um período de espera de ~27 horas antes que o saldo fique ativo no validador de destino. Este período **não afeta as métricas de desempenho**.

### Vou incorrer em penalidades? {#incur-penalties}

Não. Desde que seu validador esteja online, você não incorrerá em penalidades.

### Os endereços de saque dos validadores sendo consolidados precisam corresponder? {#withdrawal-addresses-match}

Não. Mas a *origem* deve autorizar a solicitação a partir do seu próprio endereço.

### Minhas recompensas serão compostas após a conversão? {#rewards-compound}

Sim. Com credenciais do **Tipo 2**, as recompensas acima de 32 ETH são automaticamente colocadas em restaking — mas não instantaneamente. Devido a um pequeno buffer (chamado de [*histerese*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), seu saldo precisa atingir **cerca de 1,25 ETH a mais** antes que o extra seja colocado em restaking. Portanto, em vez de compor em 33,0 ETH, isso acontece em 33,25 (saldo efetivo = 33 ETH), depois em 34,25 (saldo efetivo = 34 ETH) e assim por diante.

### Ainda posso receber varreduras automáticas após a conversão? {#automatic-sweep}

As varreduras automáticas só acontecerão com saldos excedentes acima de 2048. Para todos os outros saques parciais, você precisará acioná-los manualmente.

### Posso mudar de ideia e voltar do Tipo 2 para o Tipo 1? {#go-back-to-type1}

Não. A conversão para o **Tipo 2** é irreversível.

### Se eu quiser consolidar vários validadores, preciso converter cada um para o Tipo 2 primeiro? {#consolidate-multiple-validators}

Não! Converta um validador para o Tipo 2 e use-o como destino. Todos os outros validadores consolidados nesse destino do Tipo 2 podem ser do Tipo 1 ou do Tipo 2.

### Meu validador está offline ou abaixo de 32 ETH - ainda posso convertê-lo? {#offline-or-below-32eth}

Sim. Desde que esteja ativo (não tenha saído) e você possa assinar com o endereço de saque dele, você pode convertê-lo.

## Recursos {#resources}

- [Especificações de consenso Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md): Esta é a versão 'mais verdadeira' na qual você deve confiar. Em caso de dúvida, leia as especificações
- Nem todo mundo se sente confortável em analisar códigos, então [este maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) pode ajudar a interpretar as especificações. *Aviso legal: As especificações, não a IA, devem ser consideradas como verdade, pois a IA pode interpretar mal as informações ou alucinar respostas*
- [pectrified.com](https://pectrified.com/): Veja o estado das consolidações, depósitos e tempos de espera na fila
- [Ethereal](https://github.com/wealdtech/ethereal): Ferramenta CLI criada pela comunidade para gerenciar tarefas comuns de validadores
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Contrato criado pela comunidade que permite que vários validadores do Ethereum sejam depositados em uma única transação