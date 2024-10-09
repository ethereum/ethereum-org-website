---
title: Histórico e bifurcações do Ethereum
description: Uma história da blockchain Ethereum, incluindo marcos importantes, versões e bifurcações.
lang: pt-br
sidebarDepth: 1
---

# A história do Ethereum {#the-history-of-ethereum}

Uma linha do tempo dos principais marcos, bifurcações e atualizações da blockchain Ethereum.

<ExpandableCard title="O que são bifurcações?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Bifurcações ocorrem quando grandes atualizações ou alterações técnicas precisam ser feitas na rede, que geralmente são decorrentes de [Propostas de Melhoria do Ethereum (EIPs)] (/ eips /) e alteram as "regras" do protocolo.

Quando é necessário atualizar um software tradicional, com controle centralizado, a empresa apenas publica uma nova versão para o usuário final. Blockchains funcionam de maneira diferente porque não há propriedade centralizada. <a href="/developers/docs/nodes-and-clients/">Os clientes da Ethereum</a> devem atualizar seu software para implementar as novas regras do fork. Além disso, os criadores de bloco (mineradores em um mundo com prova de trabalho, validadores em um mundo com prova de participação) e nós devem criar blocos e validá-los conforme as novas regras. <a href="/developers/docs/consensus-mechanisms/">Mais sobre mecanismo de consenso</a>

Essas mudanças nas regras podem criar uma divisão temporária na rede. Novos blocos podem ser produzidos conforme as novas regras ou as antigas. Geralmente, as bifurcações são acordadas antes do tempo, para que os clientes adotem as mudanças de uníssono e para que a bifurcação com as melhorias se torne a cadeia principal. No entanto, em casos raros, desacordos sobre as bifurcações podem causar uma divisão permanente na rede. A mais notável é a criação do Ethereum Classic com a <a href="#dao-fork">bifurcação DAO</a>.

</ExpandableCard>

<ExpandableCard title="Por que algumas melhorias têm vários nomes?" contentPreview="Upgrades names follow a pattern">

O software subjacente ao Ethereum é composto de duas metades, conhecidas como [camada de execução](/glossary/#execution-layer) e [camada de consenso](/glossary/#consensus-layer).

**Nomenclatura para a melhoria da camada de execução**

Desde 2021, as melhorias para a **camada de execução** são nomeadas de acordo com os nomes das cidades de [locais Devcon anteriores](https://devcon.org/en/past-events/) em ordem cronológica:

| Nome da melhoria | Ano Devcon | Número do Devcon | Data da melhoria |
| ------------ | ----------- | ------------- | ------------ |
| Berlim | 2015 | 0 | 15 de abril de 2021 |
| Londres | 2016 | Eu | 5 de agosto de 2021 |
| Xangai | 2017 | II | 12 de abril de 2023 |
| **Cancún** | 2018 | III | 13 de março de 2024 |
| _Praga_ | 2019 | IV | A definir |
| _Osaka_ | 2020 | V | A definir |
| _Bogotá_ | 2022 | VI | A definir |
| _Bangkok_ | 2024 | VII | A definir |

**Nomenclatura para a melhoria da camada de consenso**

Desde o lançamento da [Beacon Chain](/glossary/#beacon-chain), as melhorias para a **camada de consenso** são nomeadas em homenagem a estrelas celestiais começando com letras que seguem em ordem alfabética:

| Nome da melhoria                                                | Data da melhoria |
| ----------------------------------------------------------- | ------------ |
| Início da Beacon Chain                                          | 1 de dez. de 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)              | 27 de out. de 2021 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)        |6 de set. de 2022  |
| [Capella](https://en.wikipedia.org/wiki/Capella)            | 12 de abril de 2023 |
| [**Deneb**](https://en.wikipedia.org/wiki/Deneb)            | 13 de março de 2024 |
| [_Electra_](<https:>) |A definir |
**Nomenclatura combinada**

As melhorias nas camadas de execução ede  consenso foram inicialmente lançadas em momentos diferentes, mas depois de [A Fusão](/planejamento/fusão/) em 2022, elas foram implantadas simultaneamente. Como tal, surgiram termos coloquiais para simplificar as referências a estas melhorias usando um único termo conjunto. Isso começou com a melhoria _Shanghai-Capella_, comumente chamada de "**Capella"**, e continua com a melhoria _Cancun-Deneb_, que pode ser chamada de "**Dencun**."

| Melhoria na camada de execução | Melhoria na camadade consenso | Nome abreviado |
| ----------------- | ----------------- | ---------- |
| Xangai | Capella | "Shapella" |
| Cancún | Deneb | "Dencun" |

</ExpandableCard>

Vá direto para informações sobre algumas das atualizações anteriores particularmente importantes: [The Beacon Chain](/roadmap/beacon-chain/), [The Merge](/roadmap/merge/) e [EIP-1559](#london)

Procurando por futuras melhorias de protocolo? [Saiba mais sobre as próximas atualizações no roteiro do Ethereum](/roadmap/).

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Resumo da melhoria Cancún {#cancun-summary}

A melhoria contém um conjunto de aperfeiçoamentos na execução _ do Ethereum_ para melhorar o dimensionamento, em conjunto com as melhorias na camada de consenso (Denega).

Notavelmente, isso inclui o EIP-4844, conhecido como **Proto-Danksharding**, que diminui significativamente o custo de armazenamento de dados para rollups de camada 2. Isto é conseguido por meio da introdução de "blobs" de dados que permitem que os rollups publiquem dados na rede principal por um curto período de tempo. Isso resulta em taxas de transação significativamente mais baixas para usuários de rollups da camada 2.

<ExpandableCard title="EIPs de Cancún" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Opcodes de armazenamento transitório</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Raiz do bloco beacon no EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-484</a>-<em>Transações de blob de fragmentos (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a>-<em></code>MCOPY</code>Instrução de cópia de memória</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-678</a>-<em><code>AUTODESTRUIÇÃO</code>apenas na mesma transação</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> opcode</em></li>
</ul>

</ExpandableCard>

- [Rollups de camada 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Leia a especificação da melhoria Cancún](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Resumo da melhoria Deneb {#deneb-summary}

A melhoria Deneb contém aperfeiçoamentos no _consenso_ que visa alcançar melhor dimensionamento. Esta melhoria vem em conjunto com as melhorias Cancún na camada de execução para habilitar o Proto-Danksharding (EIP-4844), juntamente com outras melhorias para a Beacon Chain.

Mensagens de saída voluntária pré-geradas e assinadas não expiram mais, proporcionando assim mais controle aos usuários que estão colocando seus fundos em stake com um operador de nó terceirizado. Com essa mensagem de saída assinada, os investidores podem delegar o operador de nó enquanto ainda podem sacar seus fundos e sair com segurança em qualquer momento, sem ser necessário pedir permissão para alguém.

EIP-7514 impõe uma limitação na emissão de ETH ao restringir a taxa de 'churn', permitindo que apenas oito (8) validadores possam entrar na rede por época. Como a emissão de ETH é proporcional ao total de ETH em stake, limitar o número de validadores que ingressam restringe a _taxa de crescimento_ do ETH recém-emitido, enquanto também reduz os requisitos de hardware para os operadores de nós, promovendo a descentralização.

<ExpandableCard title="EIPs Deneb" contentPreview="Official improvements included in this upgrade">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Raiz do bloco beacon no EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transações de blob de fragmentos</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Saídas voluntárias assinadas perpetuamente válidas</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Aumentar o slot máximo de inclusão de atestação</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Adicionar limite máximo de churn por época</em></li>
</ul>

</ExpandableCard>

- [Leia as especificações da melhoria Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Cancun-Deneb ("Dencun"): perguntas frequentes](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Resumo da melhoria Shanghai {#shanghai-summary}

A atualização Shanghai trouxe saques de stake para a camada de execução. Em conjunto com a atualização Capella, isso permitiu que os blocos aceitassem operações de saque, o que permite que os stakers saquem seu ETH da Beacon Chain para a camada de execução.

<ExpandableCard title="EIPs da Shanghai" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Começa o endereço <code>COINBASE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Nova instrução <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Limitar e medir o initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>A beacon chain envia retiradas como operações</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Descontinuar <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Leia a especificação de atualização Shangai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Resumo da melhoria Capella {#capella-summary}

A atualização Capella foi a terceira maior atualização para a camada de consenso (Beacon Chain) e permitiu saques de stake. Capella ocorreu em sincronia com a atualização da camada de execução, Shanghai, e ativou a funcionalidade de saque de stake.

Essa atualização da camada de consenso trouxe a capacidade para os stakers que não forneceram credenciais de saque com seu depósito inicial de fazê-lo, permitindo assim os saques.

A atualização também forneceu a funcionalidade de varredura automática de contas, que processa continuamente as contas do validador para todos os pagamentos de recompensas disponíveis ou saques totais.

- [Mais sobre saques de staking](/staking/withdrawals/).
- [Leia a especificação da atualização Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (A Fusão) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Resumo {#paris-summary}

A atualização Paris foi desencadeada pela cadeia de blocos de prova de trabalho com uma [dificuldade total final](/glossary/#terminal-total-difficulty) de 58750000000000000000000. Isso aconteceu no bloco 15537393, em 15 de setembro de 2022, iniciando a atualização Paris para o próximo bloco. Paris foi a transição para o [The Merge](/roadmap/merge/) — seu maior recurso era desativar o algoritmo de mineração da [prova de trabalho](/developers/docs/consensus-mechanisms/pow) e a lógica de consenso associada e ativar a [prova de participação](/developers/docs/consensus-mechanisms/pos) no lugar dela. Paris em si foi uma atualização para os [clientes de execução](/developers/docs/nodes-and-clients/#execution-clients) (equivalente à Bellatrix na camada de consenso) que permitiu que eles recebessem instruções de seus [clientes de consenso](/developers/docs/nodes-and-clients/#consensus-clients) conectados. Isso exigiu um novo conjunto de métodos internos da API, coletivamente conhecido como [API do mecanismo](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), a ser ativado. Esta foi, indiscutivelmente, a atualização mais significativa na história do Ethereum desde o [Homestead](#homestead)!

- [Leia a especificação de atualização Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIPs da Paris" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Consenso da melhoria para a prova de participação</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Substituir o opcode DIFFICULTY por PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Resumo {#bellatrix-summary}

A atualização Bellatrix foi a segunda atualização agendada para a [Beacon Chain](/roadmap/beacon-chain), preparando a cadeia para o [The Merge](/roadmap/merge/). Ela traz penalidades ao validador para seus valores totais por inatividade e ofensas sancionáveis. Bellatrix também inclui uma atualização nas regras de escolha de bifurcações para preparar a cadeia para o The Merge e a transição do último bloco de prova de trabalho para o primeiro bloco de prova de participação. Isso inclui informar os clientes de consenso sobre a [dificuldade total do terminal](/glossary/#terminal-total-difficulty) de 58750000000000000000000.

- [Leia a especificação da atualização Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Resumo {#gray-glacier-summary}

A atualização Gray Glacier atrasou a [bomba de dificuldade](/glossary/#difficulty-bomb) por 3 meses. Esta é a única mudança introduzida nessa atualização, e é parecida com a natureza das atualizações [Arrow Glacier](#arrow-glacier) e [Muir Glacier](#muir-glacier). Mudanças semelhantes foram realizadas nas atualizações de rede [Byzantium](#byzantium), [Constantinople](#constantinople) e [London](#london).

- [Blog da EF – Comunicado da atualização Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="EIPs da Gray Glacier" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>atrasa a bomba de dificuldade até setembro de 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Resumo {#arrow-glacier-summary}

A implementação de rede Arrow Glacier atrasou a [bomba de dificuldade](/glossary/#difficulty-bomb) por vários meses. Essa é a única mudança introduzida nesta implementação, e é de natureza similar à atualização [Muir Glacier](#muir-glacier). Mudanças semelhantes foram realizadas nas implementações de rede [Byzantium](#byzantium), [Constantinople](#constantinople) e [London](#london).

- [Blog da EF – Comunicado da atualização Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders – Atualização Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIPs da Arrow Glacier" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>atrasa a bomba de dificuldade até junho de 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Resumo {#altair-summary}

A Altair foi a primeira implementação programada para a [Beacon Chain](/roadmap/beacon-chain). Foi adicionado suporte para “comitês de sincronização”, permitindo clientes leves, aumentando a inatividade do validador e removendo penalidades à medida que o desenvolvimento avançava para o The Merge.

- [Leia a especificação de melhoria da Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <emoji text=":tada:" size={1} me="0.5rem" />Fato engraçado! {#altair-fun-fact}

Altair foi a primeira grande atualização de rede que teve um tempo exato de implantação. Todas as atualizações anteriores eram baseadas em um número de bloco declarado na cadeia de prova de trabalho, na qual o tempo de mineração de cada bloco varia. A Beacon Chain não requer resolver a prova de trabalho, em vez disso, ela funciona segundo um sistema de tempo em épocas, composto de 32 “intervalos” de 12 segundos cada, durante os quais os validadores podem propor blocos. É por isso que sabíamos exatamente quando atingiríamos a época 74.240 e a data de lançamento da Altair!

- [Tempo do bloco](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Resumo {#london-summary}

A atualização London introduziu a [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), que reformou o mercado de taxas de transação, além de implementar mudanças na forma como os reembolsos de gás são realizados e no cronograma da [Ice Age](/glossary/#ice-age).

#### O que foi a melhoria London / EIP-1559? {#eip-1559}

Antes da melhoria London, o Ethereum tinha blocos de tamanho fixo. Em momentos de alta demanda de rede, esses blocos operaram em capacidade máxima. Como resultado, os usuários muitas vezes tiveram que esperar a redução da demanda para serem incluídos em um bloco, o que levou a uma má experiência do usuário. A atualização London introduziu blocos de tamanho variável ao Ethereum.

A forma como as taxas de transação na rede Ethereum são calculadas foram alteradas com a [melhoria London](/history/#london) de agosto de 2021. Antes da melhoria London, as taxas eram calculadas sem separar as taxas `base` e `priority`, como segue:

Digamos que Alice tenha que pagar a Roberto 1 ETH. Na transação, o limite de gás é de 21.000 unidades e o preço do gás é de 200 gwei.

A taxa total teria sido: `Unidades de gás (limite) * Preço do gás por unidade` ou seja, `21.000 * 200 = 4.200.000 gwei` ou 0,0042 ETH

A implementação da [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) na melhoria London tornou o mecanismo de taxa de transação mais complexo, mas deixou as taxas de gás mais previsíveis, resultando em um mercado de taxas de transação mais eficiente. Os usuários podem enviar transações com um `maxFeePerGas` correspondente ao quanto estão dispostos a pagar para a transação ser executada, sabendo que não pagarão mais do que o preço de mercado do gás (`baseFeePerGas`), e não receberão nenhum extra, exceto a gorjeta, de reembolso.

Este vídeo explica o EIP-1559 e os benefícios que oferece: [EIP-1559 Explicado](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Você é um desenvolvedor de dapp? Certifique-se de atualizar suas bibliotecas e ferramentas.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Leia a explicação do Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIPs da London" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>melhora o mercado de taxas de transação</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>retorna o <code>BASEFEE</code> de um bloco</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>reduz reembolsos de gás para operações EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>impede a implantação de contratos que começam com <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>atrasa a Era Glacial até dezembro de 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Resumo {#berlin-summary}

A atualização Berlim otimizou o custo de gás para certas ações de EVM e aumenta o suporte para vários tipos de transação.

- [Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Leia a explicação do Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIPs da Berlim" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>diminui o custo de gás de ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>permite suporte mais fácil para vários tipos de transações</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>aumenta o custo de gás para opcodes de acesso ao estado</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>adiciona listas de acesso opcionais</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Origem da Beacon Chain {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Resumo {#beacon-chain-genesis-summary}

A [Beacon Chain](/roadmap/beacon-chain/) precisava de 16.384 depósitos de 32 ETH em stake (participação) para ser transferida com segurança. Isso aconteceu em 27 de novembro, ou seja, a Beacon Chain começou a produzir blocos em 1 de dezembro de 2020. Este é um primeiro passo importante para alcançar a [Visão Ethereum](/roadmap/vision/).

[Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  A Beacon Chain
</DocLink>

---

### Contrato de depósito de participação implantado {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Resumo {#deposit-contract-summary}

O contrato de depósito fixo introduziu [staking](/glossary/#staking) (participação) no ecossistema Ethereum. Embora fosse um contrato da [Mainnet](/glossary/#mainnet), ela teve um impacto direto na linha do tempo para o lançamento da [Beacon Chain](/roadmap/beacon-chain/), uma importante [atualização do Ethereum](/roadmap/).

[Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Participação
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Resumo {#muir-glacier-summary}

O fork (bifurcação) Muir Glacier introduziu um atraso na [bomba de dificuldade](/glossary/#difficulty-bomb). O aumento da dificuldade dos blocos do mecanismo de consenso da [prova de trabalho](/developers/docs/consensus-mechanisms/pow/) ameaçava degradar a usabilidade do Ethereum, aumentando os tempos de espera para o envio de transações e usando dapps.

- [Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Leia a explicação do Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier" contentPreview="Official improvements included in this fork.">

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

- Otimizado o custo de [gás](/glossary/#gas) de certas ações no [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Melhoria na resiliência a ataques de negação de serviço.
- Criou soluções de [escalonamento da Camada 2](/developers/docs/scaling/#layer-2-scaling)com soluções baseadas em SNARKs e STARKs de melhor desempenho.
- Interoperação entre Ethereum e Zcash habilitada.
- Contratos permitidos para introduzir funções mais criativas.

[Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIPs da Istanbul" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>permite que o Ethereum funcione com moedas que preservam a privacidade, como Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>criptografia mais barata para melhorar <a href="/glossary/#gas">custos</a> de gás.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>protege o Ethereum contra ataques de replay ao adicionar o opcode<code>CHAINID</code> <a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine"></a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>otimizando os preços de gás dos opcodes com base no consumo.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>reduz o custo do CallData para permitir mais dados nos blocos – bom para <a href="/developers/docs/scaling/#layer-2-scaling">dimensionamento da Camada 2</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>outras alterações de preço de gás de opcodes.</em></li>
</ul>

</ExpandableCard>

---

### Constantinopla {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Resumo {#constantinople-summary}

O fork (bifurcação) Constantinople:

- Redução das recompensas de [mineração](/developers/docs/consensus-mechanisms/pow/mining/) de blocos de 3 para 2 ETH.
- Assegurou que a blockchain não se bloqueasse antes de que a [prova de participação fosse implementada](#beacon-chain-genesis).
- Otimizado o custo de [gás](/glossary/#gas) de certas ações no [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Agora apresenta a capacidade de interagir com endereços que ainda não foram criados.

[Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIPs da Constantinople" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>otimiza o custo de certas ações on-chain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>permite que você interaja com endereços que ainda não foram criados.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>otimiza o custo de certas ações on-chain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>garante que a blockchain não trave antes da prova de participação e reduz a recompensa pela mineração de blocos de 3 para 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Resumo {#byzantium-summary}

O fork (bifurcação) Byzantium:

- Reduziu as recompensas de [mineração](/developers/docs/consensus-mechanisms/pow/mining/) de bloco de 5 para 3 ETH.
- A [bomba de dificuldade](/glossary/#difficulty-bomb) foi atrasada por um ano.
- Adicionada a capacidade de fazer chamadas sem alteração de estado para outros contratos.
- Adicionados alguns métodos de criptografia para permitir o [escalonamento da Camada 2](/developers/docs/scaling/#layer-2-scaling).

[Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIPs da Byzantium" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>adiciona o opcode <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>campo de status adicionado aos recibos de transação para indicar sucesso ou falha.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>adiciona curva elíptica e multiplicação escalar para permitir <a href="/developers/ docs/scaling/zk-rollups/">ZK-Snarks</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>adiciona curva elíptica e multiplicação escalar para permitir <a href="/developers/ docs/scaling/zk-rollups/">ZK-Snarks</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>ativa a verificação de assinatura RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>adiciona suporte para valores de retorno de tamanho variável.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>adiciona o opcode <code>STATICCALL</code>, permitindo não alterar o estado de chamadas para outros contratos.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>altera a fórmula de ajuste de dificuldade.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>atrasa a <a href="/glossary/#difficulty-bomb">bomba de dificuldade </a> em 1 ano e reduz a recompensa do bloco de 5 para 3 ETH.</em></li>
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

[Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIPs da Spurious Dragon" contentPreview="Official improvements included in this fork.">

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

[Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIPs da Tangerine Whistle" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>aumenta os custos de gás de opcodes que podem ser usados em ataques de spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>reduz o tamanho do estado removendo um grande número de contas vazias que foram colocadas no estado, a um custo muito baixo devido a falhas nas versões anteriores do protocolo Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### Bifurcação DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Resumo {#dao-fork-summary}

O fork (bifurcação) DAO foi em resposta ao [ataque DAO de 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), duranto o qual um contrato inseguro de [DAO](/glossary/#dao) foi esvaziado em mais de 3 milhões de ETH durante um hackeio. O fork (bifurcação) moveu os fundos do contrato defeituoso para um [novo contrato](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) com uma única função: fazer saque. Qualquer pessoa que tenha perdido fundos poderia sacar 1 ETH para cada 100 tokens DAO em suas carteiras.

Esse curso de ação foi votado pela comunidade Ethereum. Qualquer titular de ETH pôde votar por meio de uma transação em [uma plataforma de votação](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). A decisão de fazer a bifurcação ultrapassou 85% dos votos.

Alguns mineradores recusaram a bifurcação porque o incidente da DAO não era um defeito do protocolo. Eles começaram a formar a [Ethereum Classic](https://ethereumclassic.org/).

[Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Resumo {#homestead-summary}

O fork (bifurcação) Homestead que olhou para o futuro. Incluiu várias alterações no protocolo e uma alteração na rede que deu ao Ethereum a capacidade de fazer mais atualizações na rede.

[Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIPs do Homestead" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>faz edições no processo de criação do contrato.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>adiciona novo opcode: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>apresenta os requisitos de compatibilidade futura do devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Resumo {#frontier-thawing-summary}

O fork (bifurcação) Frontier Thawing aumentou o limite de [gás](/glossary/#gas) de 5.000 por [bloco](/glossary/#block) e definiu o preço padrão do gás para 51 [gwei](/glossary/#gwei). Isso é permitido para transações – as transações requerem 21.000 em gás. A bomba de dificuldade [](/glossary/#difficulty-bomb) foi introduzida para garantir uma futura bifurcação fixa para a [prova de participação](/glossary/#pos).

- [Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Leia a atualização do protocolo Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Resumo {#frontier-summary}

Frontier era a implementação mais simples do projeto Ethereum. Ela veio após a fase de testes bem-sucedida da Olympic. Ela era destinada a usuários técnicos, especificamente a desenvolvedores. [Blocos](/glossary/#block) tiveram um limite de [gás](/glossary/#gas) de 5.000. Esse período de “escavação” permitiu que os mineradores iniciassem as suas operações e que os primeiros adotantes instalassem os seus clientes sem “pressa”.

[Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Venda de Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

O Ether permaneceu à venda oficialmente por 42 dias. Era possível comprá-lo com BTC.

[Leia o comunicado da Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Lançamento do Yellow Paper {#yellowpaper}

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
