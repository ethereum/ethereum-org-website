---
title: Linha do tempo de todos os forks do Ethereum (2014 até o presente)
description: Um histórico da blockchain Ethereum, incluindo os principais marcos, lançamentos e forks.
lang: pt-br
sidebarDepth: 1
authors: ["Nixo"]
---

Uma linha do tempo de todos os principais marcos, forks e atualizações da blockchain [Ethereum](/).

<ExpandableCard title="O que são bifurcações?" contentPreview="Mudanças nas regras do protocolo Ethereum que frequentemente incluem atualizações técnicas planejadas.">

Forks ocorrem quando grandes atualizações técnicas ou mudanças precisam ser feitas na rede – eles normalmente derivam das [Propostas de Melhoria do Ethereum (EIPs)](/eips/) e mudam as "regras" do protocolo.

Quando atualizações são necessárias em softwares tradicionais e controlados centralmente, a empresa simplesmente publica uma nova versão para o usuário final. As blockchains funcionam de maneira diferente porque não há propriedade central. Os [clientes Ethereum](/developers/docs/nodes-and-clients/) devem atualizar seus softwares para implementar as novas regras do fork. Além disso, os criadores de blocos (mineradores em um mundo de Prova de Trabalho (PoW), validadores em um mundo de Prova de Participação (PoS)) e os nós devem criar blocos e validá-los de acordo com as novas regras. [Mais sobre mecanismos de consenso](/developers/docs/consensus-mechanisms/)

Essas mudanças de regras podem criar uma divisão temporária na rede. Novos blocos poderiam ser produzidos de acordo com as novas regras ou com as antigas. Os forks geralmente são acordados com antecedência para que os clientes adotem as mudanças em uníssono e o fork com as atualizações se torne a cadeia principal. No entanto, em casos raros, divergências sobre forks podem fazer com que a rede se divida permanentemente – mais notavelmente a criação do Ethereum Classic com o <a href="#dao-fork">fork do DAO</a>.

</ExpandableCard>

<ExpandableCard title="Por que algumas atualizações têm vários nomes?" contentPreview="Os nomes das atualizações seguem um padrão">

O software que serve de base para o Ethereum é composto por duas metades, conhecidas como [camada de execução](/glossary/#execution-layer) e [camada de consenso](/glossary/#consensus-layer).

**Nomenclatura das atualizações de execução**

Desde 2021, as atualizações da **camada de execução** são nomeadas de acordo com os nomes das cidades dos [locais anteriores da Devcon e Devconnect](https://devcon.org/en/past-events/) em ordem cronológica:

| Nome da atualização | Ano da Devcon(nect) | Número da Devcon | Data da atualização |
| ------------------- | ------------------- | ---------------- | ------------------- |
| Berlim              | 2014                | 0                | 15 de abr. de 2021  |
| Londres             | 2015                | I                | 5 de ago. de 2021   |
| Shanghai            | 2016                | II               | 12 de abr. de 2023  |
| Cancun              | 2017                | III              | 13 de mar. de 2024  |
| Praga               | 2018                | IV               | 7 de mai. de 2025   |
| Osaka               | 2019                | V                | 3 de dez. de 2025   |
| **Amsterdã**        | 2022                | Devconnect       | A definir - Próxima |
| _Bogotá_            | 2022                | VI               | A definir           |
| _Istambul_          | 2023                | Devconnect       | A definir           |
| _Bangkok_           | 2024                | VII              | A definir           |
| _Buenos Aires_      | 2025                | Devconnect       | A definir           |
| _Mumbai_            | 2026                | VIII             | A definir           |

**Nomenclatura das atualizações de consenso**

Desde o lançamento da [Beacon Chain](/glossary/#beacon-chain), as atualizações da **camada de consenso** recebem nomes de estrelas celestes começando com letras que seguem em ordem alfabética:

| Nome da atualização                                       | Data da atualização |
| --------------------------------------------------------- | ------------------- |
| Gênese da Beacon Chain                                    | 1º de dez. de 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)            | 27 de out. de 2021  |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)      | 6 de set. de 2022   |
| [Capella](https://en.wikipedia.org/wiki/Capella)          | 12 de abr. de 2023  |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)              | 13 de mar. de 2024  |
| [Electra](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7 de mai. de 2025   |
| [Fulu](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3 de dez. de 2025   |
| [**Gloas**](https://en.wikipedia.org/wiki/WASP-13)        | A definir - Próxima |
| [_Heze_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | A definir           |

**Nomenclatura combinada**

As atualizações de execução e consenso foram inicialmente lançadas em momentos diferentes, mas após o [The Merge](/roadmap/merge/) em 2022, elas passaram a ser implantadas simultaneamente. Sendo assim, termos coloquiais surgiram para simplificar as referências a essas atualizações usando um único termo conjunto. Isso começou com a atualização _Shanghai-Capella_, comumente chamada de "**Shapella**", e continua com as atualizações subsequentes.

| Atualização de execução | Atualização de consenso | Nome curto    |
| ----------------------- | ----------------------- | ------------- |
| Shanghai                | Capella                 | "Shapella"    |
| Cancun                  | Deneb                   | "Dencun"      |
| Praga                   | Electra                 | "Pectra"      |
| Osaka                   | Fulu                    | "Fusaka"      |
| Amsterdã                | Gloas                   | "Glamsterdam" |
| Bogotá                  | Heze                    | "Hegotá"      |

</ExpandableCard>

Pule direto para as informações sobre algumas das atualizações passadas particularmente importantes: [A Beacon Chain](/roadmap/beacon-chain/); [The Merge](/roadmap/merge/); e [EIP-1559](#london)

Procurando por futuras atualizações do protocolo? [Saiba mais sobre as próximas atualizações no roteiro do Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Mais sobre a Fusaka](/roadmap/fusaka/)

### Prague-Electra ("Pectra")
<NetworkUpgradeSummary name="pectra" />

A atualização Prague-Electra ("Pectra") incluiu várias melhorias no protocolo Ethereum com o objetivo de aprimorar a experiência para todos os usuários, redes da camada 2 (l2), stakers e operadores de nó.

O staking recebeu uma atualização com contas de validador com composição de rendimentos e melhor controle sobre os fundos em staking usando o endereço de saque de execução. A EIP-7251 aumentou o saldo efetivo máximo para um único validador para 2048, melhorando a eficiência de capital para os stakers. A EIP-7002 permitiu que uma conta de execução acionasse com segurança ações do validador, incluindo a saída ou o saque de partes dos fundos, melhorando a experiência para os stakers de ETH, ao mesmo tempo em que ajuda a fortalecer a responsabilidade dos operadores de nó.

Outras partes da atualização se concentraram em melhorar a experiência para usuários comuns. A EIP-7702 trouxe a capacidade para uma conta comum que não é de contrato inteligente ([EOA](/glossary/#eoa)) executar código semelhante a um contrato inteligente. Isso desbloqueou novas funcionalidades ilimitadas para contas tradicionais do Ethereum, como processamento em lote de transações, patrocínio de gás, autenticação alternativa, controles de gastos programáveis, mecanismos de recuperação de conta e muito mais.

<ExpandableCard title="EIPs de Pectra" contentPreview="Melhorias oficiais incluídas nesta atualização.">

Melhor experiência do usuário:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Definir código de conta EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Aumento da vazão de blob</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Aumentar o custo dos dados de chamada</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Adicionar cronograma de blob aos arquivos de configuração da EL</em></li>
</ul>

Melhor experiência de staking:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Aumentar o <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Saídas acionáveis pela camada de execução</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Solicitações de uso geral da camada de execução</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Fornecer depósitos de validador onchain</em></li>
</ul>

Melhorias na eficiência e segurança do protocolo:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Pré-compilado para operações de curva BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Salvar hashes de blocos históricos no estado</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Mover o índice do comitê para fora da Atestação</em></li>
</ul>

</ExpandableCard>

- [Como a Pectra aprimorará a experiência de staking](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Leia as especificações da atualização Electra](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [Perguntas frequentes sobre Prague-Electra ("Pectra")](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Resumo de Cancun {#cancun-summary}

A atualização Cancun contém um conjunto de melhorias para a _execução_ do Ethereum com o objetivo de melhorar a escalabilidade, em conjunto com as atualizações de consenso Deneb.

Notavelmente, isso inclui a EIP-4844, conhecida como **Proto-Danksharding**, que diminui significativamente o custo de armazenamento de dados para rollups da camada 2 (l2). Isso é alcançado através da introdução de "blobs" de dados, o que permite que os rollups publiquem dados na Mainnet por um curto período de tempo. Isso resulta em taxas de transação significativamente mais baixas para usuários de rollups da camada 2 (l2).

<ExpandableCard title="EIPs de Cancun" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Códigos de operação de armazenamento transitório</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Raiz do bloco beacon na EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transações de blob de fragmento (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Instrução de cópia de memória</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> apenas na mesma transação</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em>Código de operação <code>BLOBBASEFEE</code></em></li>
</ul>

</ExpandableCard>

- [Rollups da camada 2 (l2)](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Leia a especificação da atualização Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Resumo de Deneb {#deneb-summary}

A atualização Deneb contém um conjunto de melhorias para o _consenso_ do Ethereum com o objetivo de melhorar a escalabilidade. Esta atualização ocorre em conjunto com as atualizações de execução Cancun para habilitar o Proto-Danksharding (EIP-4844), juntamente com outras melhorias na Beacon Chain.

As "mensagens de saída voluntária" assinadas e pré-geradas não expiram mais, dando assim mais controle aos usuários que fazem staking de seus fundos com um operador de nó terceirizado. Com esta mensagem de saída assinada, os stakers podem delegar a operação do nó enquanto mantêm a capacidade de sair com segurança e sacar seus fundos a qualquer momento, sem precisar pedir permissão a ninguém.

A EIP-7514 traz um aperto na emissão de ETH ao limitar a taxa de "rotatividade" com que os validadores podem ingressar na rede para oito (8) por época. Como a emissão de ETH é proporcional ao total de ETH em staking, limitar o número de validadores ingressantes restringe a _taxa de crescimento_ de ETH recém-emitido, ao mesmo tempo em que reduz os requisitos de hardware para operadores de nó, ajudando na descentralização.

<ExpandableCard title="EIPs de Deneb" contentPreview="Melhorias oficiais incluídas nesta atualização">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Raiz do bloco beacon na EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transações de blob de fragmento</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Saídas voluntárias assinadas perpetuamente válidas</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Aumentar o slot máximo de inclusão de atestação</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Adicionar limite máximo de rotatividade por época</em></li>
</ul>

</ExpandableCard>

- [Leia as especificações da atualização Deneb](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [Perguntas frequentes sobre Cancun-Deneb ("Dencun")](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Resumo da Shanghai {#shanghai-summary}

A atualização Shanghai trouxe os saques de staking para a camada de execução. Em conjunto com a atualização Capella, isso permitiu que os blocos aceitassem operações de saque, o que permite que os stakers saquem seu ETH da Beacon Chain para a camada de execução.

<ExpandableCard title="EIPs de Shanghai" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Inicia o endereço <code>COINBASE</code> aquecido</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Nova instrução <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Limita e mede o initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Saques push da Beacon Chain como operações</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Descontinua o <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Leia a especificação da atualização Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Resumo da Capella {#capella-summary}

A atualização Capella foi a terceira grande atualização da camada de consenso (Beacon Chain) e habilitou os saques de staking. A Capella ocorreu de forma síncrona com a atualização da camada de execução, Shanghai, e habilitou a funcionalidade de saque de staking.

Esta atualização da camada de consenso trouxe a capacidade para os stakers que não forneceram credenciais de saque com seu depósito inicial de fazê-lo, habilitando assim os saques.

A atualização também forneceu a funcionalidade de varredura automática de contas, que processa continuamente as contas de validador em busca de quaisquer pagamentos de recompensas disponíveis ou saques totais.

- [Mais sobre saques de staking](/staking/withdrawals/).
- [Leia as especificações da atualização Capella](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (The Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Resumo {#paris-summary}

A atualização Paris foi acionada pela blockchain de Prova de Trabalho (PoW) ultrapassando uma [dificuldade total terminal](/glossary/#terminal-total-difficulty) de 58750000000000000000000. Isso aconteceu no bloco 15537393 em 15 de setembro de 2022, acionando a atualização Paris no bloco seguinte. Paris foi a transição [The Merge](/roadmap/merge/) - sua principal característica foi desligar o algoritmo de mineração de [Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow) e a lógica de consenso associada, ativando a [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos) em seu lugar. A própria Paris foi uma atualização para os [clientes de execução](/developers/docs/nodes-and-clients/#execution-clients) (equivalente à Bellatrix na camada de consenso) que permitiu que eles recebessem instruções de seus [clientes de consenso](/developers/docs/nodes-and-clients/#consensus-clients) conectados. Isso exigiu que um novo conjunto de métodos de API internos, conhecidos coletivamente como [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), fosse ativado. Esta foi indiscutivelmente a atualização mais significativa na história do Ethereum desde a [Homestead](#homestead)!

- [Leia a especificação da atualização Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIPs de Paris" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Atualizar o consenso para Prova de Participação (PoS)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Substituir o código de operação DIFFICULTY por PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Resumo {#bellatrix-summary}

A atualização Bellatrix foi a segunda atualização programada para a [Beacon Chain](/roadmap/beacon-chain), preparando a cadeia para o [The Merge](/roadmap/merge/). Ela traz as penalidades do validador para seus valores totais por inatividade e ofensas passíveis de penalização. A Bellatrix também inclui uma atualização nas regras de escolha de bifurcação para preparar a cadeia para o The Merge e a transição do último bloco de Prova de Trabalho (PoW) para o primeiro bloco de Prova de Participação (PoS). Isso inclui tornar os clientes de consenso cientes da [dificuldade total terminal](/glossary/#terminal-total-difficulty) de 58750000000000000000000.

- [Leia a especificação da atualização Bellatrix](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Resumo {#gray-glacier-summary}

A atualização da rede Gray Glacier adiou a [bomba de dificuldade](/glossary/#difficulty-bomb) em três meses. Esta é a única mudança introduzida nesta atualização e é de natureza semelhante às atualizações [Arrow Glacier](#arrow-glacier) e [Muir Glacier](#muir-glacier). Mudanças semelhantes foram realizadas nas atualizações da rede [Bizâncio](#byzantium), [Constantinopla](#constantinople) e [London](#london).

- [Blog da EF - Anúncio da atualização Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="EIPs de Gray Glacier" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>adia a bomba de dificuldade até setembro de 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Resumo {#arrow-glacier-summary}

A atualização da rede Arrow Glacier adiou a [bomba de dificuldade](/glossary/#difficulty-bomb) por vários meses. Esta é a única mudança introduzida nesta atualização e é de natureza semelhante à atualização [Muir Glacier](#muir-glacier). Mudanças semelhantes foram realizadas nas atualizações da rede [Bizâncio](#byzantium), [Constantinopla](#constantinople) e [Londres](#london).

- [Blog da EF - Anúncio da atualização Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders - Atualização Arrow Glacier do Ethereum](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIPs de Arrow Glacier" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>adia a bomba de dificuldade até junho de 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Resumo {#altair-summary}

A atualização Altair foi a primeira atualização programada para a [Beacon Chain](/roadmap/beacon-chain). Ela adicionou suporte para "comitês de sincronização" — permitindo clientes leves, e aumentou as penalidades por inatividade e penalização (slashing) de validadores à medida que o desenvolvimento progredia em direção ao The Merge.

- [Leia a especificação da atualização Altair](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> Curiosidade! {#altair-fun-fact}

Altair foi a primeira grande atualização da rede que teve um horário exato de lançamento. Todas as atualizações anteriores foram baseadas em um número de bloco declarado na cadeia de Prova de Trabalho (PoW), onde os tempos de bloco variam. A Beacon Chain não exige a resolução de Prova de Trabalho (PoW) e, em vez disso, funciona em um sistema de época baseado em tempo, consistindo em 32 "slots" de doze segundos onde os validadores podem propor blocos. É por isso que sabíamos exatamente quando atingiríamos a época 74.240 e a Altair entraria no ar!

- [Tempo de bloco](/developers/docs/blocks/#block-time)

---

### Londres {#london}

<NetworkUpgradeSummary name="london" />

#### Resumo {#london-summary}

A atualização Londres introduziu a [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), que reformulou o mercado de taxas de transação, juntamente com mudanças na forma como os reembolsos de gás são tratados e no cronograma da [Era do Gelo](/glossary/#ice-age).

#### O que foi a atualização Londres / EIP-1559? {#eip-1559}

Antes da atualização Londres, o Ethereum tinha blocos de tamanho fixo. Em tempos de alta demanda da rede, esses blocos operavam com capacidade total. Como resultado, os usuários frequentemente tinham que esperar a demanda diminuir para serem incluídos em um bloco, o que levava a uma experiência de usuário ruim. A atualização Londres introduziu blocos de tamanho variável no Ethereum.

A forma como as taxas de transação na rede Ethereum eram calculadas mudou com [a atualização Londres](/ethereum-forks/#london) de agosto de 2021. Antes da atualização Londres, as taxas eram calculadas sem separar as taxas `base` e `priority`, da seguinte forma:

Digamos que Alice tivesse que pagar a Bob 1 ETH. Na transação, o limite de gas é de 21.000 unidades e o preço do gás é de 200 gwei.

A taxa total teria sido: `Gas units (limit) * Gas price per unit` ou seja, `21,000 * 200 = 4,200,000 gwei` ou 0,0042 ETH

A implementação da [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) na atualização Londres tornou o mecanismo de taxa de transação mais complexo, mas tornou as taxas de gás mais previsíveis, resultando em um mercado de taxas de transação mais eficiente. Os usuários podem enviar transações com um `maxFeePerGas` correspondente a quanto estão dispostos a pagar para que a transação seja executada, sabendo que não pagarão mais do que o preço de mercado pelo gás (`baseFeePerGas`), e receberão qualquer valor extra, menos sua taxa de prioridade, reembolsado.

Este vídeo explica a EIP-1559 e os benefícios que ela traz: [EIP-1559 Explicada](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Você é um desenvolvedor de aplicativo descentralizado (dapp)? Certifique-se de atualizar suas bibliotecas e ferramentas.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Leia a explicação do Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIPs de Londres" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>melhora o mercado de taxas de transação</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>retorna a <code>BASEFEE</code> de um bloco</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>reduz os reembolsos de gás para operações da EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>impede a implantação de contratos que começam com <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>adia a Era do Gelo até dezembro de 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlim {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Resumo {#berlin-summary}

A atualização Berlim otimizou o custo de gás para certas ações da EVM e aumenta o suporte para vários tipos de transação.

- [Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Leia a explicação do Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIPs de Berlim" contentPreview="Melhorias oficiais incluídas nesta atualização.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>reduz o custo de gás da ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>permite um suporte mais fácil para vários tipos de transação</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>aumentos no custo de gás para códigos de operação (opcodes) de acesso ao estado</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>adiciona listas de acesso opcionais</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Gênese da Beacon Chain {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Resumo {#beacon-chain-genesis-summary}

A [Beacon Chain](/roadmap/beacon-chain/) precisou de 16.384 depósitos de 32 ETH em staking para ser lançada com segurança. Isso aconteceu em 27 de novembro, e a Beacon Chain começou a produzir blocos em 1º de dezembro de 2020.

[Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  A Beacon Chain
</DocLink>

---

### Implantação do contrato de depósito de staking {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Resumo {#deposit-contract-summary}

O contrato de depósito de staking introduziu o [staking](/glossary/#staking) no ecossistema Ethereum. Embora seja um contrato da [Mainnet](/glossary/#mainnet), ele teve um impacto direto no cronograma de lançamento da [Beacon Chain](/roadmap/beacon-chain/), uma importante [atualização do Ethereum](/roadmap/).

[Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Resumo {#muir-glacier-summary}

A bifurcação Muir Glacier introduziu um atraso na [bomba de dificuldade](/glossary/#difficulty-bomb). Os aumentos na dificuldade de bloco do mecanismo de consenso de [Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow/) ameaçavam degradar a usabilidade do Ethereum, aumentando os tempos de espera para o envio de transações e o uso de aplicativos descentralizados (dapps).

- [Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Leia a explicação dos Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIPs de Muir Glacier" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>atrasa a bomba de dificuldade por mais 4.000.000 de blocos, ou ~611 dias.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istambul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Resumo {#istanbul-summary}

O fork Istambul:

- Otimizou o custo de [gás](/glossary/#gas) de certas ações na [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Melhorou a resiliência contra ataques de negação de serviço.
- Tornou as soluções de [escalabilidade da camada 2](/developers/docs/scaling/#layer-2-scaling) baseadas em SNARKs e STARKs mais eficientes.
- Permitiu a interoperabilidade entre Ethereum e Zcash.
- Permitiu que os contratos introduzissem funções mais criativas.

[Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="EIPs de Istambul" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>permite que o Ethereum funcione com moedas que preservam a privacidade, como a Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>criptografia mais barata para melhorar os custos de [gás](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>protege o Ethereum contra ataques de repetição adicionando o [código de operação](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>otimização dos preços do gás do código de operação com base no consumo.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>reduz o custo dos dados de chamada (CallData) para permitir mais dados nos blocos – bom para a [escalabilidade da camada 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>outras alterações no preço do gás do código de operação.</em></li>
</ul>

</ExpandableCard>

---

### Constantinopla {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Resumo {#constantinople-summary}

O fork Constantinople:

- Reduziu as recompensas de [mineração](/developers/docs/consensus-mechanisms/pow/mining/) de bloco de 3 para 2 ETH.
- Garantiu que a blockchain não congelasse antes que a [Prova de Participação (PoS) fosse implementada](#beacon-chain-genesis).
- Otimizou o custo de [gás](/glossary/#gas) de certas ações na [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Adicionou a capacidade de interagir com endereços que ainda não foram criados.

[Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="EIPs de Constantinopla" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>otimiza o custo de certas ações onchain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>permite que você interaja com endereços que ainda não foram criados.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>introduz a instrução <code>EXTCODEHASH</code> para recuperar o hash do código de outro contrato.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>garante que a blockchain não congele antes da Prova de Participação (PoS) e reduz a recompensa de bloco de 3 para 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Resumo {#byzantium-summary}

O fork Byzantium:

- Reduziu as recompensas de [mineração](/developers/docs/consensus-mechanisms/pow/mining/) de bloco de 5 para 3 ETH.
- Atrasou a [bomba de dificuldade](/glossary/#difficulty-bomb) em um ano.
- Adicionou a capacidade de fazer chamadas que não alteram o estado para outros contratos.
- Adicionou certos métodos de criptografia para permitir o [escalonamento de camada 2](/developers/docs/scaling/#layer-2-scaling).

[Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="EIPs de Bizâncio" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>adiciona o código de operação <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>campo de status adicionado aos recibos de transação para indicar sucesso ou falha.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>adiciona curva elíptica e multiplicação escalar para permitir [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>adiciona curva elíptica e multiplicação escalar para permitir [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>habilita a verificação de assinatura RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>adiciona suporte para valores de retorno de comprimento variável.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>adiciona o código de operação <code>STATICCALL</code>, permitindo chamadas que não alteram o estado para outros contratos.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>altera a fórmula de ajuste de dificuldade.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>atrasa a [bomba de dificuldade](/glossary/#difficulty-bomb) em 1 ano e reduz a recompensa de bloco de 5 para 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Resumo {#spurious-dragon-summary}

O fork Spurious Dragon foi a segunda resposta aos ataques de negação de serviço (DoS) na rede (setembro/outubro de 2016), incluindo:

- ajuste na precificação dos códigos de operação para evitar ataques futuros na rede.
- ativação da "limpeza" (debloat) do estado da blockchain.
- adição de proteção contra ataques de repetição.

[Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="EIPs de Spurious Dragon" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>impede que transações de uma cadeia Ethereum sejam retransmitidas em uma cadeia alternativa, por exemplo, uma transação de rede de teste sendo repetida na cadeia principal do Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>ajusta os preços do código de operação <code>EXP</code> – torna mais difícil desacelerar a rede por meio de operações de contrato computacionalmente caras.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>permite a remoção de contas vazias adicionadas por meio dos ataques DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>altera o tamanho máximo de código que um contrato na blockchain pode ter – para 24576 bytes.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Resumo {#tangerine-whistle-summary}

O fork Tangerine Whistle foi a primeira resposta aos ataques de negação de serviço (DoS) na rede (setembro/outubro de 2016), incluindo:

- resolução de problemas urgentes de integridade da rede relacionados a códigos de operação subprecificados.

[Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="EIPs de Tangerine Whistle" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>aumenta os custos de gas de códigos de operação que podem ser usados em ataques de spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>reduz o tamanho do estado removendo um grande número de contas vazias que foram colocadas no estado a um custo muito baixo devido a falhas em versões anteriores do protocolo Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### Fork DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Resumo {#dao-fork-summary}

O fork DAO foi uma resposta ao [ataque à DAO em 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), onde um contrato inseguro da [DAO](/glossary/#dao) foi drenado em mais de 3,6 milhões de ETH em um hack. O fork moveu os fundos do contrato defeituoso para um [novo contrato](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) com uma única função: saque (withdraw). Qualquer pessoa que perdeu fundos poderia sacar 1 ETH para cada 100 tokens DAO em suas carteiras.

Esse curso de ação foi votado pela comunidade Ethereum. Qualquer detentor de ETH pôde votar por meio de uma transação em [uma plataforma de votação](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). A decisão de realizar o fork alcançou mais de 85% dos votos.

Alguns mineradores se recusaram a aderir ao fork porque o incidente da DAO não era um defeito no protocolo. Eles seguiram em frente para formar o [Ethereum Classic](https://ethereumclassic.org/).

[Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Resumo {#homestead-summary}

O fork Homestead olhou para o futuro. Ele incluiu várias mudanças de protocolo e uma mudança de rede que deu ao Ethereum a capacidade de fazer atualizações de rede adicionais.

[Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="EIPs de Homestead" contentPreview="Melhorias oficiais incluídas nesta bifurcação.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>faz edições no processo de criação de contratos.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>adiciona um novo código de operação: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>introduz requisitos de compatibilidade futura para o devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Descongelamento do Frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Resumo {#frontier-thawing-summary}

O fork de descongelamento do Frontier removeu o limite de 5.000 de [gás](/glossary/#gas) por [bloco](/glossary/#block) e definiu o preço do gás padrão para 51 [gwei](/glossary/#gwei). Isso permitiu transações – as transações exigem 21.000 de gás. A [bomba de dificuldade](/glossary/#difficulty-bomb) foi introduzida para garantir um futuro hard fork para [Prova de Participação (PoS)](/glossary/#pos).

- [Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [Leia a Atualização 1 do Protocolo Ethereum](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Resumo {#frontier-summary}

O Frontier foi uma implementação ativa, mas básica, do projeto Ethereum. Ele se seguiu à bem-sucedida fase de testes Olympic. Foi destinado a usuários técnicos, especificamente desenvolvedores. Os [blocos](/glossary/#block) tinham um limite de [gás](/glossary/#gas) de 5.000. Esse período de 'descongelamento' permitiu que os mineradores iniciassem suas operações e que os primeiros adeptos instalassem seus clientes sem ter que 'correr'.

[Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### Venda de ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

O ether foi oficialmente colocado à venda por 42 dias. Era possível comprá-lo com BTC.

[Leia o anúncio da Fundação Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### Lançamento do yellow paper {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

O yellow paper, de autoria do Dr. Gavin Wood, é uma definição técnica do protocolo Ethereum.

[Ver o yellow paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Whitepaper lançado {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

O documento introdutório, publicado em 2013 por Vitalik Buterin, o fundador do Ethereum, antes do lançamento do projeto em 2015.

<DocLink href="/whitepaper/">
  Whitepaper
</DocLink>
