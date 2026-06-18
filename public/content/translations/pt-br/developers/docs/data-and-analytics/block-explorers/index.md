---
title: Exploradores de blocos
description: Uma introdução aos exploradores de blocos, seu portal para o mundo dos dados da blockchain, onde você pode consultar informações sobre transações, contas, contratos e muito mais.
lang: pt-br
sidebarDepth: 3
---

Os exploradores de blocos são o seu portal para os dados do Ethereum. Você pode usá-los para ver dados em tempo real sobre blocos, transações, validadores, contas e outras atividades onchain.

## Pré-requisitos {#prerequisites}

Você deve entender os conceitos básicos do Ethereum para poder compreender os dados que um explorador de blocos fornece. Comece com [uma introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## Ferramentas de código aberto {#open-source-tools}

- [3xpl](https://3xpl.com/ethereum) - Um explorador do Ethereum sem anúncios que permite baixar seus conjuntos de dados (open-core: os módulos principais são de código aberto)
- [Beaconcha.in](https://beaconcha.in/)
- [Blockscout](https://eth.blockscout.com/)
- [lazy-etherscan](https://github.com/woxjro/lazy-etherscan)
- [Otterscan](https://otterscan.io/)

## Serviços {#services}

- [Blockchair](https://blockchair.com/ethereum) - Explorador privado do Ethereum. Também serve para classificar e filtrar dados (da mempool). Disponível em espanhol, francês, italiano, holandês, português, russo, chinês e farsi
- [Chainlens](https://www.chainlens.com/)
- [DexGuru Block Explorer](https://ethereum.dex.guru/)
- [Etherchain](https://www.etherchain.org/)
- [Etherscan](https://etherscan.io/) - Também disponível em chinês, coreano, russo e japonês
- [Ethplorer](https://ethplorer.io/) - Um explorador de blocos com foco em tokens. Também disponível em chinês, espanhol, francês, turco, russo, coreano e vietnamita
- [Ethseer](https://ethseer.io)
- [EthVM](https://www.ethvm.com/)
- [OKLink](https://www.oklink.com/eth)

## Dados {#data}

O Ethereum é transparente por design, então tudo é verificável. Os exploradores de blocos fornecem uma interface para obter essas informações. E isso vale tanto para a rede principal do Ethereum quanto para as redes de teste (testnets), caso você precise desses dados. Os dados são divididos em dados de execução e dados de consenso. Os dados de execução referem-se às transações que foram executadas em um bloco específico. Os dados de consenso referem-se aos próprios blocos e aos validadores que os propuseram.

Aqui está um resumo dos tipos de dados que você pode obter de um explorador de blocos.

### Dados de execução {#execution-data}

Novos blocos são adicionados ao Ethereum a cada 12 segundos (a menos que um propositor de bloco perca a sua vez), então um fluxo quase constante de dados é adicionado aos exploradores de blocos. Os blocos contêm muitos dados importantes que você pode achar úteis:

**Dados padrão**

- Altura do bloco - O número do bloco e o comprimento da blockchain (em blocos) na criação do bloco atual
- Timestamp (Carimbo de data/hora) - O momento em que um bloco foi proposto
- Transações - O número de transações incluídas no bloco
- Destinatário da taxa - O endereço que recebeu as gorjetas da taxa de gas das transações
- Recompensa de bloco - A quantidade de ETH concedida ao validador que propôs o bloco
- Tamanho - O tamanho dos dados dentro do bloco (medido em bytes)
- Gas usado - O total de unidades de gas usadas pelas transações no bloco
- Limite de gas - Os limites totais de gas definidos pelas transações no bloco
- Taxa básica por gas - O multiplicador mínimo necessário para que uma transação seja incluída em um bloco
- Taxas queimadas - Quanto ETH é queimado no bloco
- Dados extras - Quaisquer dados extras que o construtor tenha incluído no bloco

**Dados avançados**

- Hash - O hash criptográfico que representa o cabeçalho do bloco (o identificador exclusivo do bloco)
- Hash pai - O hash do bloco que veio antes do bloco atual
- StateRoot - O hash raiz da árvore de Merkle que armazena todo o estado do sistema

### Gas {#gas}

Os exploradores de blocos não apenas fornecerão dados sobre o uso de gas em transações e blocos, mas alguns também fornecerão informações sobre os preços do gás atuais da rede. Isso ajudará você a entender o uso da rede, enviar transações seguras e não gastar demais com gas. Fique atento às APIs que podem ajudá-lo a obter essas informações na interface do seu produto. Os dados específicos de gas abrangem:

- Unidades estimadas de gas necessárias para uma transação segura, mas lenta (+ preço e duração estimados)
- Unidades estimadas de gas necessárias para uma transação média (+ preço e duração estimados)
- Unidades estimadas de gas necessárias para uma transação rápida (+ preço e duração estimados)
- Tempo médio de confirmação com base no preço do gás
- Contratos que estão consumindo gas - em outras palavras, produtos populares que estão tendo muito uso na rede
- Contas que estão gastando gas - em outras palavras, usuários frequentes da rede

### Transações {#transactions}

Os exploradores de blocos se tornaram um lugar comum para as pessoas acompanharem o progresso de suas transações. Isso ocorre porque o nível de detalhes que você pode obter fornece uma certeza extra. Os dados da transação incluem:

**Dados padrão**

- Hash da transação - Um hash gerado quando a transação é enviada
- Status - Uma indicação de se a transação está pendente, falhou ou foi um sucesso
- Bloco - O bloco no qual a transação foi incluída
- Timestamp - O momento em que uma transação foi incluída em um bloco proposto por um validador
- De (From) - O endereço da conta que enviou a transação
- Para (To) - O endereço do destinatário ou contrato inteligente com o qual a transação interage
- Tokens transferidos - Uma lista de tokens que foram transferidos como parte da transação
- Valor - O valor total de ETH sendo transferido
- Taxa de transação - O valor pago ao validador para processar a transação (calculado pelo preço do gás \* gas usado)

**Dados avançados**

- Limite de gas - O número máximo de unidades de gas que esta transação pode consumir
- Gas usado - A quantidade real de unidades de gas que a transação consumiu
- Preço do gás - O preço definido por unidade de gas
- Nonce - O número da transação para o endereço `from` (tenha em mente que isso começa em 0, então um nonce de `100` seria, na verdade, a 101ª transação enviada por esta conta)
- Dados de entrada - Qualquer informação extra exigida pela transação

### Contas {#accounts}

Há muitos dados que você pode acessar sobre uma conta. É por isso que muitas vezes é recomendado usar várias contas para que seus ativos e valores não possam ser facilmente rastreados. Também existem algumas soluções sendo desenvolvidas para tornar as transações e a atividade da conta mais privadas. Mas aqui estão os dados disponíveis para as contas:

**Contas de usuário**

- Endereço da conta - O endereço público que você pode usar para enviar fundos
- Saldo de ETH - A quantidade de ETH associada a essa conta
- Valor total de ETH - O valor do ETH
- Tokens - Os tokens associados à conta e seu valor
- Histórico de transações - Uma lista de todas as transações em que esta conta foi o remetente ou o destinatário

**Contratos inteligentes**

As contas de contratos inteligentes têm todos os dados que uma conta de usuário terá, mas alguns exploradores de blocos exibirão até mesmo algumas informações de código. Exemplos incluem:

- Criador do contrato - O endereço que fez a implantação do contrato na Mainnet
- Transação de criação - A transação que incluiu a implantação na Mainnet
- Código-fonte - O código Solidity ou Vyper do contrato inteligente
- ABI do contrato - A Interface Binária de Aplicação (ABI) do contrato — as chamadas que o contrato faz e os dados recebidos
- Código de criação do contrato - O bytecode compilado do contrato inteligente — criado quando você compila um contrato inteligente escrito em Solidity ou Vyper, etc.
- Eventos do contrato - Um histórico dos métodos chamados no contrato inteligente — basicamente uma maneira de ver como o contrato está sendo usado e com que frequência

### Tokens {#tokens}

Os tokens são um tipo de contrato, portanto, terão dados semelhantes aos de um contrato inteligente. Mas, como eles têm valor e podem ser negociados, eles têm pontos de dados adicionais:

- Tipo - Se eles são um ERC-20, ERC-721 ou outro padrão de token
- Preço - Se eles forem um ERC-20, terão um valor de mercado atual
- Capitalização de mercado - Se eles forem um ERC-20, terão uma capitalização de mercado (calculada pelo preço \* fornecimento total)
- Fornecimento total - O número de tokens em circulação
- Detentores - O número de endereços que possuem o token
- Transferências - O número de vezes que o token foi transferido entre contas
- Histórico de transações - Um histórico de todas as transações, incluindo o token
- Endereço do contrato - O endereço do token que foi implantado na Mainnet
- Decimais - Os tokens ERC-20 são divisíveis e têm casas decimais

### Rede {#network}

Alguns dados de bloco estão preocupados com a saúde do Ethereum de forma mais holística.

- Total de transações - O número de transações desde que o Ethereum foi criado
- Transações por segundo - O número de transações processáveis em um segundo
- Preço do ETH - As avaliações atuais de 1 ETH
- Fornecimento total de ETH - Número de ETH em circulação — lembre-se de que novos ETH são criados com a criação de cada bloco na forma de recompensas de bloco
- Capitalização de mercado - Cálculo de preço \* fornecimento

## Dados da camada de consenso {#consensus-layer-data}

### Época {#epoch}

Por motivos de segurança, comitês aleatórios de validadores são criados no final de cada época (a cada 6,4 minutos). Os dados da época incluem:

- Número da época
- Status finalizado - Se a época foi finalizada (Sim/Não)
- Tempo - O momento em que a época terminou
- Atestações - O número de atestações na época (votos para blocos dentro de slots)
- Depósitos - O número de depósitos de ETH incluídos na época (os validadores devem fazer stake de ETH para se tornarem validadores)
- Slashings (Penalidades) - Número de penalidades dadas aos proponentes de blocos ou atestadores
- Participação na votação - A quantidade de ETH em stake usada para atestar blocos
- Validadores - Número de validadores ativos para a época
- Saldo médio do validador - Saldo médio para validadores ativos
- Slots - Número de slots incluídos na época (os slots incluem um bloco válido)

### Slot {#slot}

Os slots são oportunidades para a criação de blocos, os dados disponíveis para cada slot incluem:

- Época - A época na qual o slot é válido
- Número do slot
- Status - O status do slot (Proposto/Perdido)
- Tempo - O timestamp do slot
- Proponente - O validador que propôs o bloco para o slot
- Raiz do bloco - A raiz da árvore de hash (hash-tree-root) do bloco beacon
- Raiz pai - O hash do bloco que veio antes
- Raiz de estado - A raiz da árvore de hash do estado beacon
- Assinatura
- Revelação RANDAO
- Graffiti - Um propositor de bloco pode incluir uma mensagem de 32 bytes em sua proposta de bloco
- Dados de execução
  - Hash do bloco
  - Contagem de depósitos
  - Raiz de depósito
- Atestações - Número de atestações para o bloco neste slot
- Depósitos - O número de depósitos durante este slot
- Saídas voluntárias - O número de validadores que saíram durante o slot
- Slashings - Número de penalidades dadas aos proponentes de blocos ou atestadores
- Votos - Os validadores que votaram no bloco neste slot

### Blocos {#blocks-1}

A Prova de Participação (PoS) divide o tempo em slots e épocas. Então isso significa novos dados!

- Proponente - O validador que foi escolhido algoritmicamente para propor o novo bloco
- Época - A época na qual o bloco foi proposto
- Slot - O slot no qual o bloco foi proposto
- Atestações - O número de atestações incluídas no slot — as atestações são como votos que indicam que o bloco está pronto para ir para a Beacon Chain

### Validadores {#validators}

Os validadores são responsáveis por propor blocos e atestá-los dentro dos slots.

- Número do validador - Número exclusivo que representa o validador
- Saldo atual - O saldo do validador, incluindo recompensas
- Saldo efetivo - O saldo do validador que é usado para staking
- Renda - As recompensas ou penalidades recebidas pelo validador
- Status - Se o validador está atualmente online e ativo ou não
- Eficácia da atestação - O tempo médio que leva para as atestações do validador serem incluídas na cadeia
- Elegibilidade para ativação - Data (e época) em que o validador se tornou disponível para validar
- Ativo desde - Data (e época) em que o validador se tornou ativo
- Blocos propostos - O bloco que o validador propôs
- Atestações - As atestações que o validador forneceu
- Depósitos - O endereço de origem, hash da transação, número do bloco, timestamp, valor e status do depósito de staking feito pelo validador

### Atestações {#attestations}

As atestações são votos "sim" para incluir blocos na cadeia. Seus dados referem-se a um registro da atestação e aos validadores que atestaram

- Slot - O slot no qual a atestação ocorreu
- Índice do comitê - O índice do comitê no slot fornecido
- Bits de agregação - Representa a atestação agregada de todos os validadores participantes na atestação
- Validadores - Os validadores que forneceram atestações
- Raiz do bloco beacon - Aponta para o bloco ao qual os validadores estão atestando
- Origem - Aponta para a última época justificada
- Destino - Aponta para o limite da última época
- Assinatura

### Rede {#network-1}

Os dados de nível superior da camada de consenso incluem o seguinte:

- Época atual
- Slot atual
- Validadores ativos - Número de validadores ativos
- Validadores pendentes - Número de validadores aguardando para se tornarem ativos
- ETH em stake - Quantidade de ETH em stake na rede
- Saldo médio - Saldo médio de ETH dos validadores

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Transações](/developers/docs/transactions/)
- [Contas](/developers/docs/accounts/)
- [Redes](/developers/docs/networks/)