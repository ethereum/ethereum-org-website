---
title: Linha do tempo de todas as bifurcações do Ethereum (2014 até o presente)
description: Uma história da blockchain Ethereum, incluindo marcos importantes, versões e bifurcações.
lang: pt-br
sidebarDepth: 1
---

# Linha do tempo de todas as bifurcações do Ethereum (2014 até o presente) {#the-history-of-ethereum}

Uma linha do tempo dos principais marcos, bifurcações e atualizações da blockchain Ethereum.

<ExpandableCard title="O que são bifurcações?" contentPreview="Alterações nas regras do protocolo Ethereum que geralmente incluem atualizações técnicas planejadas.">

Bifurcações ocorrem quando grandes atualizações ou alterações técnicas precisam ser feitas na rede, que geralmente são decorrentes de [Propostas de Melhoria do Ethereum (EIPs)] (/ eips /) e alteram as "regras" do protocolo.

Quando é necessário atualizar um software tradicional, com controle centralizado, a empresa apenas publica uma nova versão para o usuário final. Blockchains funcionam de maneira diferente porque não há propriedade centralizada. [Clientes Ethereum](/developers/docs/nodes-and-clients/) devem atualizar seu software para implementar as novas regras da bifurcação. Além disso, os criadores de bloco (mineradores em um mundo com prova de trabalho, validadores em um mundo com prova de participação) e nós devem criar blocos e validá-los conforme as novas regras. [Mais sobre mecanismos de consenso](/developers/docs/consensus-mechanisms/)

Essas mudanças nas regras podem criar uma divisão temporária na rede. Novos blocos podem ser produzidos conforme as novas regras ou as antigas. Geralmente, as bifurcações são acordadas antes do tempo, para que os clientes adotem as mudanças de uníssono e para que a bifurcação com as melhorias se torne a cadeia principal. No entanto, em casos raros, desacordos sobre as bifurcações podem causar uma divisão permanente na rede. A mais notável é a criação do Ethereum Classic com a <a href="#dao-fork">bifurcação DAO</a>.

</ExpandableCard>

<ExpandableCard title="Por que algumas atualizações têm vários nomes?" contentPreview="Os nomes das atualizações seguem um padrão">

O software subjacente ao Ethereum é composto de duas metades, conhecidas como [camada de execução](/glossary/#execution-layer) e [camada de consenso](/glossary/#consensus-layer).

**Nomenclatura da melhoria de execução**

Desde 2021, as melhorias na **camada de execução** são nomeadas de acordo com os nomes das cidades das [localidades anteriores da Devcon](https://devcon.org/en/past-events/) em ordem cronológica:

| Nome da Melhoria | Ano da Devcon | Número da Devcon | Data da Melhoria    |
| ---------------- | ------------- | ---------------- | ------------------- |
| Berlin           | 2014          | 0                | 15 de abril de 2021 |
| London           | 2015          | I                | 5 de agosto de 2021 |
| Shanghai         | 2016          | II               | 12 de abril de 2023 |
| Cancun           | 2017          | III              | 13 de março de 2024 |
| **Praga**        | 2018          | IV               | A definir - Próximo |
| _Osaka_          | 2019          | V                | A definir           |
| _Bogotá_         | 2022          | VI               | A definir           |
| _Bangkok_        | 2024          | VII              | A definir           |

**Nomenclatura da melhoria de consenso**

Desde o lançamento da [Beacon Chain](/glossary/#beacon-chain), as melhorias na **camada de consenso** recebem o nome de estrelas que começam com letras em ordem alfabética:

| Nome da Melhoria                                              | Data da Melhoria      |
| ------------------------------------------------------------- | --------------------- |
| Origem da Beacon Chain                                        | 1 de dezembro de 2020 |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | 27 de outubro de 2021 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | 6 de setembro de 2022 |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | 12 de abril de 2023   |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | 13 de março de 2024   |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | A definir - Próximo   |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | A definir             |

**Nomenclatura combinada**

As melhorias de execução e de consenso foram inicialmente lançadas em momentos diferentes, mas após [A Fusão](/roadmap/merge/) em 2022, elas foram implantadas simultaneamente. Como tal, surgiram termos coloquiais para simplificar as referências a estas melhorias usando um único termo conjunto. Isso começou com a atualização _Shanghai-Capella_, comumente chamada de "**Shapella**", e continuou com as atualizações _Cancun-Deneb_ (**Dencun**) e _Prague-Electra_ (**Pectra**).

| Melhoria de Execução | Melhoria de Consenso | Nome Abreviado |
| -------------------- | -------------------- | -------------- |
| Shanghai             | Capella              | "Shapella"     |
| Cancun               | Deneb                | "Dencun"       |
| Praga                | Electra              | "Pectra"       |
| Osaka                | Fulu                 | "Fusaka"       |

</ExpandableCard>

Pule direto para as informações sobre algumas das melhorias anteriores particularmente importantes: [Beacon Chain](/roadmap/beacon-chain/); [A Fusão](/roadmap/merge/); e [EIP-1559](#london)

Procurando por futuras melhorias de protocolo? [Saiba mais sobre as próximas melhorias no planejamento do Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Mais sobre Fusaka](/roadmap/fusaka/)

### Praga-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

A melhoria Prague-Electra ("Pectra") inclui diversas melhorias no protocolo do Ethereum, visando melhorar a experiência de todos os usuários, redes da layer 2, stakers e operadores de nós.

O staking recebeu uma melhoria com contas de validadores compostas e controle melhorado sobre os ativos em stake utilizando a execução do endereço de saque. EIP-7251 aumentou o saldo máximo efetivo de um único validador para 2048, melhorando a eficiência de capital para stakers. EIP-7002 possibilitou que uma conta de execução consiga executar ações de validadores de uma forma segura, incluindo saídas ou saques parciais dos fundos, melhorando a experiência para stakers de ETH e auxiliando no fortalecimento e a responsabilidade de operadores de nós.

Outras partes da atualização focaram em melhorar a experiência para usuários normais. A EIP-7702 trouxe a capacidade de uma conta regular que não seja um contrato inteligente ([EOA](/glossary/#eoa)) executar um código semelhante a um contrato inteligente. Isto desbloqueou diversas funcionalidades novas para contas tradicionais do Ethereum, como transações em massa, patrocínio de gás, autenticações alternativas, controle de gastos programáveis, mecanismos para recuperação de contas e mais.

<ExpandableCard title="EIPs da Pectra" contentPreview="Melhorias oficiais incluídas nesta atualização.">

Melhor experiência do usuário:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Definir o código de conta EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Aumento da taxa de transferência de blobs</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Aumentar o custo do calldata</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Adicionar agendamento de blobs aos arquivos de configuração EL</em></li>
</ul>

Melhor experiência de staking:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Aumentar o <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Saídas acionáveis ​​pela camada de execução</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Solicitações de camada de execução de propósito geral</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Depósitos de validadores registrados on-chain</em></li>
</ul>

Melhorias eficiência e segurança do protocolo:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Pré-compilado para operações na curva BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Armazenar hashes de blocos históricos no estado</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Mover índice do committee para fora da Atestação</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Como a Pectra melhorará a experiência de staking](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Leia as especificações da melhoria Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [Perguntas frequentes (FAQ) sobre Praga-Electra ("Pectra")](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Resumo da Cancun {#cancun-summary}

A melhoria Cancun contém um conjunto de aprimoramentos para a _execução_ do Ethereum, com o objetivo de melhorar a escalabilidade, em conjunto com as melhorias de consenso da Deneb.

Isso inclui, notavelmente, a EIP-4844, conhecida como **Proto-Danksharding**, que diminui significativamente o custo de armazenamento de dados para os rollups da camada 2. Isto é conseguido por meio da introdução de "blobs" de dados que permitem que os rollups publiquem dados na rede principal por um curto período de tempo. Isso resulta em taxas de transação significativamente mais baixas para usuários de rollups da camada 2.

<ExpandableCard title="EIPs da Cancun" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Opcodes de armazenamento transitório</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Raiz do bloco beacon no EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-484</a>-<em>Transações de blob de fragmentos (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a>-<em></code>MCOPY</code>Instrução de cópia de memória</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-678</a>-<em><code>AUTODESTRUIÇÃO</code>apenas na mesma transação</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> opcode</em></li>
</ul>

</ExpandableCard>

- [Rollups da camada 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Leia a especificação da melhoria Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Resumo da Deneb {#deneb-summary}

A melhoria Deneb contém um conjunto de aprimoramentos no _consenso_ do Ethereum, com o objetivo de melhorar a escalabilidade. Esta melhoria vem em conjunto com as melhorias Cancún na camada de execução para habilitar o Proto-Danksharding (EIP-4844), juntamente com outras melhorias para a Beacon Chain.

Mensagens de saída voluntária pré-geradas e assinadas não expiram mais, proporcionando assim mais controle aos usuários que estão colocando seus fundos em stake com um operador de nó terceirizado. Com esta mensagem de saída assinada, os participantes podem delegar a operação do nó, mantendo a capacidade de sair com segurança e retirar seus fundos a qualquer momento, sem precisar pedir permissão a ninguém.

EIP-7514 impõe uma limitação na emissão de ETH ao restringir a taxa de 'churn', permitindo que apenas oito (8) validadores possam entrar na rede por época. Como a emissão de ETH é proporcional ao total de ETH em stake, limitar o número de validadores que entram limita a _taxa de crescimento_ de novos ETH emitidos, ao mesmo tempo que reduz os requisitos de hardware para operadores de nós, ajudando na descentralização.

<ExpandableCard title="EIPs da Deneb" contentPreview="Melhorias oficiais incluídas nesta atualização">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Raiz do bloco beacon no EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transações de blob de fragmentos</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Saídas voluntárias assinadas perpetuamente válidas</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Aumentar o slot máximo de inclusão de atestação</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Adicionar limite máximo de churn por época</em></li>
</ul>

</ExpandableCard>

- [Leia as especificações da melhoria Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Perguntas frequentes (FAQ) sobre Cancun-Deneb ("Dencun")](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Resumo de Shanghai {#shanghai-summary}

A atualização Shanghai trouxe saques de stake para a camada de execução. Em conjunto com a atualização Capella, isso permitiu que os blocos aceitassem operações de saque, o que permite que os stakers saquem seu ETH da Beacon Chain para a camada de execução.

<ExpandableCard title="EIPs da Shanghai" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Começa o endereço <code>COINBASE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Nova instrução <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Limitar e medir o initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>A beacon chain envia retiradas como operações</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Descontinuar <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Leia a especificação da melhoria Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Resumo da Capella {#capella-summary}

A atualização Capella foi a terceira maior atualização para a camada de consenso (Beacon Chain) e permitiu saques de stake. Capella ocorreu em sincronia com a atualização da camada de execução, Shanghai, e ativou a funcionalidade de saque de stake.

Essa atualização da camada de consenso trouxe a capacidade para os stakers que não forneceram credenciais de saque com seu depósito inicial de fazê-lo, permitindo assim os saques.

A atualização também forneceu a funcionalidade de varredura automática de contas, que processa continuamente as contas do validador para todos os pagamentos de recompensas disponíveis ou saques totais.

- [Mais sobre saques de staking](/staking/withdrawals/).
- [Leia as especificações da melhoria Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (A Fusão) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Resumo {#paris-summary}

A melhoria Paris foi acionada pela blockchain de prova de trabalho que ultrapassou uma [dificuldade total terminal](/glossary/#terminal-total-difficulty) de 58750000000000000000000. Isso aconteceu no bloco 15537393, em 15 de setembro de 2022, iniciando a atualização Paris para o próximo bloco. Paris foi a transição para [A Fusão](/roadmap/merge/) - sua principal característica foi desligar o algoritmo de mineração da [prova de trabalho](/developers/docs/consensus-mechanisms/pow) e a lógica de consenso associada, ligando a [prova de participação](/developers/docs/consensus-mechanisms/pos) em seu lugar. A própria Paris foi uma melhoria para os [clientes de execução](/developers/docs/nodes-and-clients/#execution-clients) (equivalente a Bellatrix na camada de consenso) que permitiu que eles recebessem instruções de seus [clientes de consenso](/developers/docs/nodes-and-clients/#consensus-clients) conectados. Isso exigiu a ativação de um novo conjunto de métodos de API internos, conhecidos coletivamente como a [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Esta foi, indiscutivelmente, a melhoria mais significativa na história do Ethereum desde a [Homestead](#homestead)!

- [Leia a especificação da melhoria Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIPs da Paris" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Consenso da melhoria para a prova de participação</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Substituir o opcode DIFFICULTY por PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Resumo {#bellatrix-summary}

A melhoria Bellatrix foi a segunda melhoria programada para a [Beacon Chain](/roadmap/beacon-chain), preparando a cadeia para [A Fusão](/roadmap/merge/). Ela traz penalidades ao validador para seus valores totais por inatividade e ofensas sancionáveis. Bellatrix também inclui uma atualização nas regras de escolha de bifurcações para preparar a cadeia para o The Merge e a transição do último bloco de prova de trabalho para o primeiro bloco de prova de participação. Isso inclui tornar os clientes de consenso cientes da [dificuldade total terminal](/glossary/#terminal-total-difficulty) de 58750000000000000000000.

- [Leia a especificação da melhoria Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Resumo {#gray-glacier-summary}

A melhoria de rede Gray Glacier adiou a [bomba de dificuldade](/glossary/#difficulty-bomb) por três meses. Esta é a única alteração introduzida nesta melhoria e é de natureza semelhante às melhorias [Arrow Glacier](#arrow-glacier) e [Muir Glacier](#muir-glacier). Alterações semelhantes foram realizadas nas melhorias de rede [Bizâncio](#byzantium), [Constantinopla](#constantinople) e [Londres](#london).

- [Blog da EF - Anúncio da Melhoria Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="EIPs da Gray Glacier" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>atrasa a bomba de dificuldade até setembro de 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Resumo {#arrow-glacier-summary}

A melhoria de rede Arrow Glacier adiou a [bomba de dificuldade](/glossary/#difficulty-bomb) por vários meses. Esta é a única alteração introduzida nesta melhoria e é de natureza semelhante à melhoria [Muir Glacier](#muir-glacier). Alterações semelhantes foram realizadas nas melhorias de rede [Bizâncio](#byzantium), [Constantinopla](#constantinople) e [Londres](#london).

- [Blog da EF - Anúncio da Melhoria Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Melhoria Arrow Glacier do Ethereum](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIPs da Arrow Glacier" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>atrasa a bomba de dificuldade até junho de 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Resumo {#altair-summary}

A melhoria Altair foi a primeira melhoria agendada para a [Beacon Chain](/roadmap/beacon-chain). Foi adicionado suporte para “comitês de sincronização”, permitindo clientes leves, aumentando a inatividade do validador e removendo penalidades à medida que o desenvolvimento avançava para o The Merge.

- [Leia a especificação da melhoria Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Curiosidade! {#altair-fun-fact}

Altair foi a primeira grande atualização de rede que teve um tempo exato de implantação. Todas as atualizações anteriores eram baseadas em um número de bloco declarado na cadeia de prova de trabalho, na qual o tempo de mineração de cada bloco varia. A Beacon Chain não requer resolver a prova de trabalho, em vez disso, ela funciona segundo um sistema de tempo em épocas, composto de 32 “intervalos” de 12 segundos cada, durante os quais os validadores podem propor blocos. É por isso que sabíamos exatamente quando atingiríamos a época 74.240 e a data de lançamento da Altair!

- [Tempo de bloco](/developers/docs/blocks/#block-time)

---

### Londres {#london}

<NetworkUpgradeSummary name="london" />

#### Resumo {#london-summary}

A melhoria Londres introduziu a [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), que reformou o mercado de taxas de transação, juntamente com alterações na forma como os reembolsos de gás são tratados e o cronograma da [Era do Gelo](/glossary/#ice-age).

#### O que foi a melhoria London / EIP-1559? {#eip-1559}

Antes da melhoria London, o Ethereum tinha blocos de tamanho fixo. Em momentos de alta demanda de rede, esses blocos operaram em capacidade máxima. Como resultado, os usuários muitas vezes tiveram que esperar a redução da demanda para serem incluídos em um bloco, o que levou a uma má experiência do usuário. A atualização London introduziu blocos de tamanho variável ao Ethereum.

A forma como as taxas de transação na rede Ethereum eram calculadas mudou com a [Melhoria Londres](/ethereum-forks/#london) de agosto de 2021. Antes da melhoria Londres, as taxas eram calculadas sem separar as taxas `base` e de `prioridade`, da seguinte forma:

Digamos que Alice tenha que pagar a Roberto 1 ETH. Na transação, o limite de gás é de 21.000 unidades e o preço do gás é de 200 gwei.

A taxa total teria sido: `Unidades de gás (limite) * Preço do gás por unidade` ou seja, `21.000 * 200 = 4.200.000 gwei` ou 0,0042 ETH

A implementação da [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) na Melhoria Londres tornou o mecanismo de taxa de transação mais complexo, mas tornou as taxas de gás mais previsíveis, resultando em um mercado de taxas de transação mais eficiente. Os usuários podem enviar transações com um `maxFeePerGas` correspondente ao quanto estão dispostos a pagar para que a transação seja executada, sabendo que não pagarão mais do que o preço de mercado pelo gás (`baseFeePerGas`), e receberão qualquer valor extra, menos a gorjeta, de volta.

Este vídeo explica a EIP-1559 e os benefícios que ela traz: [EIP-1559 Explicada](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Você é um desenvolvedor de dapp? [Certifique-se de atualizar suas bibliotecas e ferramentas.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Leia a explicação dos Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIPs da London" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>melhora o mercado de taxas de transação</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>retorna o <code>BASEFEE</code> de um bloco</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>reduz reembolsos de gás para operações EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>impede a implantação de contratos que começam com <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>atrasa a Era Glacial até dezembro de 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlim {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Resumo {#berlin-summary}

A atualização Berlim otimizou o custo de gás para certas ações de EVM e aumenta o suporte para vários tipos de transação.

- [Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Leia a explicação dos Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIPs da Berlin" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>diminui o custo de gás de ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>permite suporte mais fácil para vários tipos de transações</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>aumenta o custo de gás para opcodes de acesso ao estado</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>adiciona listas de acesso opcionais</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Gênese da Beacon Chain {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Resumo {#beacon-chain-genesis-summary}

A [Beacon Chain](/roadmap/beacon-chain/) precisava de 16.384 depósitos de 32 ETH em stake para ser lançada com segurança. Isso aconteceu em 27 de novembro, e a Beacon Chain começou a produzir blocos em 1º de dezembro de 2020.

[Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  A Beacon Chain
</DocLink>

---

### Contrato de depósito de staking implantado {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Resumo {#deposit-contract-summary}

O contrato de depósito de staking introduziu o [staking](/glossary/#staking) no ecossistema Ethereum. Embora seja um contrato da [Rede Principal](/glossary/#mainnet), ele teve um impacto direto na linha do tempo para o lançamento da [Beacon Chain](/roadmap/beacon-chain/), uma importante [melhoria do Ethereum](/roadmap/).

[Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Resumo {#muir-glacier-summary}

A bifurcação Muir Glacier introduziu um atraso na [bomba de dificuldade](/glossary/#difficulty-bomb). Aumentos na dificuldade do bloco do mecanismo de consenso de [prova de trabalho](/developers/docs/consensus-mechanisms/pow/) ameaçaram degradar a usabilidade do Ethereum, aumentando os tempos de espera para o envio de transações e o uso de dapps.

- [Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Leia a explicação dos Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIPs da Muir Glacier" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>atrasa a bomba de dificuldade por mais 4.000,000 blocos, ou cerca de 611 dias.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istambul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Resumo {#istanbul-summary}

O fork (bifurcação) Istanbul:

- Otimizou o custo de [gás](/glossary/#gas) de certas ações na [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Melhoria na resiliência a ataques de negação de serviço.
- Tornou as soluções de [escalabilidade da camada 2](/developers/docs/scaling/#layer-2-scaling) baseadas em SNARKs e STARKs mais eficientes.
- Interoperação entre Ethereum e Zcash habilitada.
- Contratos permitidos para introduzir funções mais criativas.

[Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIPs da Istanbul" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>permite que o Ethereum funcione com moedas que preservam a privacidade, como Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> - <em>criptografia mais barata para melhorar os [gás](/glossary/#gas) custos.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> - <em>protege a rede Ethereum contra ataques que repetem transações ao adicionar <code>CHAINID</code> [opcode] (/developers/docs/ethereum-stack/#ethereum-virtual-machine).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>otimizando os preços de gás dos opcodes com base no consumo.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> - <em>reduz o custo de CallData para mais dados em blocos - bom para [Camada 2 de scaling] (/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>outras alterações de preço de gás de opcodes.</em></li>
</ul>

</ExpandableCard>

---

### Constantinopla {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Resumo {#constantinople-summary}

O fork (bifurcação) Constantinople:

- Reduziu as recompensas de [mineração](/developers/docs/consensus-mechanisms/pow/mining/) de bloco de 3 para 2 ETH.
- Garantiu que a blockchain não congelasse antes da [implementação da prova de participação](#beacon-chain-genesis).
- Otimizou o custo de [gás](/glossary/#gas) de certas ações na [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Agora apresenta a capacidade de interagir com endereços que ainda não foram criados.

[Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIPs da Constantinople" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>otimiza o custo de certas ações onchain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>permite que você interaja com endereços que ainda não foram criados.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>introduz a instrução <code>EXTCODEHASH</code> para obter o hash do código de outro contrato.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>garante que a blockchain não trave antes da prova de participação e reduz a recompensa pela mineração de blocos de 3 para 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Bizâncio {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Resumo {#byzantium-summary}

O fork (bifurcação) Byzantium:

- Reduziu as recompensas de [mineração](/developers/docs/consensus-mechanisms/pow/mining/) de blocos de 5 para 3 ETH.
- Adiou a [bomba de dificuldade](/glossary/#difficulty-bomb) por um ano.
- Adicionada a capacidade de fazer chamadas sem alteração de estado para outros contratos.
- Adicionou certos métodos de criptografia para permitir a [escalabilidade da camada 2](/developers/docs/scaling/#layer-2-scaling).

[Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIPs da Byzantium" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>adiciona o opcode <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>campo de status adicionado aos recibos de transação para indicar sucesso ou falha.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> - <em>adiciona curva elíptica e multiplicação escalar para permitir [ZK-Snarks] (/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>adiciona curva elíptica e multiplicação escalar para permitir [ZK-Snarks] (/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>ativa a verificação de assinatura RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>adiciona suporte para valores de retorno de tamanho variável.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>adiciona o opcode <code>STATICCALL</code>, permitindo não alterar o estado de chamadas para outros contratos.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>altera a fórmula de ajuste de dificuldade.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>atrasos [bomba de dificuldade] (/glossary/#difficulty-bomb) por 1 ano e reduz a recompensa do bloco de 5 para 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Resumo {#spurious-dragon-summary}

O fork (bifurcação) Spurious Dragon foi a segunda resposta aos ataques de negação de serviço (DoS) na rede (setembro / outubro de 2016), incluindo:

- ajustar preços do código de operação para evitar ataques futuros à rede.
- permitindo "desinchar" do estado da cadeia de blocos.
- adicionando proteção contra ataques de repetição.

[Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIPs do Spurious Dragon" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>impede que transações de uma cadeia Ethereum sejam retransmitidas em uma cadeia alternativa, por exemplo, uma transação da rede de testes sendo reproduzida na cadeia principal do Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>ajusta os preços do opcode <code>EXP</code> – torna mais difícil para desacelerar a rede por meio de operações de contrato computacionalmente caras.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>permite a remoção de contas vazias adicionadas por meio de ataques DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>muda o tamanho máximo do código que um contrato na blockchain pode ter – para 24576 bytes.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Resumo {#tangerine-whistle-summary}

O fork (bifurcação) Whistle Tangerine foi a primeira resposta aos ataques de negação de serviço (DoS) na rede (setembro / outubro de 2016), incluindo:

- resolução de problemas urgentes de integridade da rede relacionados a códigos de operação com preços reduzidos.

[Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIPs do Tangerine Whistle" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>aumenta os custos de gás de opcodes que podem ser usados em ataques de spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>reduz o tamanho do estado removendo um grande número de contas vazias que foram colocadas no estado, a um custo muito baixo devido a falhas nas versões anteriores do protocolo Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### Bifurcação da DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Resumo {#dao-fork-summary}

A bifurcação da DAO foi uma resposta ao [ataque à DAO de 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), no qual um contrato inseguro de uma [DAO](/glossary/#dao) foi esvaziado em mais de 3,6 milhões de ETH em um hack. A bifurcação moveu os fundos do contrato defeituoso para um [novo contrato](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) com uma única função: saque. Qualquer pessoa que tenha perdido fundos poderia sacar 1 ETH para cada 100 tokens DAO em suas carteiras.

Esse curso de ação foi votado pela comunidade Ethereum. Qualquer detentor de ETH podia votar por meio de uma transação em [uma plataforma de votação](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). A decisão de fazer a bifurcação ultrapassou 85% dos votos.

Alguns mineradores recusaram a bifurcação porque o incidente da DAO não era um defeito do protocolo. Eles passaram a formar o [Ethereum Classic](https://ethereumclassic.org/).

[Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Resumo {#homestead-summary}

O fork (bifurcação) Homestead que olhou para o futuro. Incluiu várias alterações no protocolo e uma alteração na rede que deu ao Ethereum a capacidade de fazer mais atualizações na rede.

[Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIPs da Homestead" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>faz edições no processo de criação do contrato.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>adiciona novo opcode: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>apresenta os requisitos de compatibilidade futura do devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Descongelamento da Frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Resumo {#frontier-thawing-summary}

A bifurcação de descongelamento da Frontier removeu o limite de 5.000 de [gás](/glossary/#gas) por [bloco](/glossary/#block) e definiu o preço padrão do gás como 51 [gwei](/glossary/#gwei). Isso é permitido para transações – as transações requerem 21.000 em gás. A [bomba de dificuldade](/glossary/#difficulty-bomb) foi introduzida para garantir um futuro hard-fork para a [prova de participação](/glossary/#pos).

- [Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Leia a Atualização 1 do Protocolo Ethereum](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Resumo {#frontier-summary}

Frontier era a implementação mais simples do projeto Ethereum. Ela veio após a fase de testes bem-sucedida da Olympic. Ela era destinada a usuários técnicos, especificamente a desenvolvedores. Os [blocos](/glossary/#block) tinham um limite de [gás](/glossary/#gas) de 5.000. Esse período de “escavação” permitiu que os mineradores iniciassem as suas operações e que os primeiros adotantes instalassem os seus clientes sem “pressa”.

[Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Venda de Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

O Ether permaneceu à venda oficialmente por 42 dias. Era possível comprá-lo com BTC.

[Leia o anúncio da Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Lançamento do Yellowpaper {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

O Yellow Paper, de autoria do Dr. Gavin Wood, é uma definição técnica do protocolo Ethereum.

[Ver o Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Lançamento do Whitepaper {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Este artigo introdutório foi originalmente publicado em 2013 por Vitalik Buterin, fundador da Ethereum, antes do lançamento do projeto em 2015.

<DocLink href="/whitepaper/">
  Whitepaper
</DocLink>
