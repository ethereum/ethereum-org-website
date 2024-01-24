---
title: Exploradores de bloco
description: Uma introdução aos exploradores de bloco, seu portal no mundo dos dados da blockchain, onde você pode consultar informações sobre transações, contas, contratos e mais.
lang: pt-br
sidebarDepth: 3
---

Exploradores de blocos são o seu portal para os dados do Ethereum. Você pode usá-los para ver dados em tempo real sobre blocos, transações, mineradores, contas e outras atividades em cadeia.

## Pré-requisitos {#prerequisites}

Você deve entender os conceitos básicos do Ethereum; para que você possa entender o sentido dos dados que um explorador de blocos lhe dá. Comece com [uma introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## Serviços {#services}

- [Etherscan](https://etherscan.io/) -_Também disponível em chinês, coreano, russo e japonês_
- [Beaconcha.in](https://beaconcha.in/)
- [Blockchair](https://blockchair.com/ethereum) -_ Também disponível em espanhol, francês, italiano, holandês, português, russo, chinês e persa_
- [Blockscout](https://blockscout.com/)
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/) -_ Também disponível em chinês, espanhol, francês, turco, russo, coreano e vietnamita_
- [OKLink](https://www.oklink.com/eth)
- [Otterscan](https://otterscan.io/)
- [Sirato](https://www.web3labs.com/sirato)
- [EthVM](https://www.ethvm.com/)

## Dados {#data}

Ethereum é transparente por concepção, então tudo é verificável. Os exploradores de bloco fornecem uma interface para obter essas informações. E isso é tanto para a rede principal Ethereum; quanto para as redes de teste, caso você precise desse dado. Os dados são divididos em dados de execução e dados de consenso. Os dados de execução referem-se às transações executadas em um bloco específico. Os dados de consenso referem-se aos blocos em si e aos validadores que os propuseram.

Aqui está um resumo dos tipos de dados que você pode obter de um explorador de blocos.

### Dados de execução {#execution-data}

Novos blocos são adicionados à Ethereum a cada 12 segundos (a menos que um proponente de bloco perca a sua vez), então um fluxo quase constante de dados é adicionado aos exploradores de blocos. Os blocos contêm muitos dados importantes que você pode achar úteis:

**Dados padrões**

- Altura do bloco - O número do bloco e o comprimento da blockchain (em blocos) na criação do bloco atual
- Timestamp - A hora em que um bloco foi proposto
- Transações - O número de transações incluídas no bloco
- Destinatário da taxa - O endereço que recebeu gorjetas de taxas de gás das transações
- Recompensa do bloco - A quantidade de ETH concedida ao validador que propôs o bloco
- Tamanho - O tamanho dos dados dentro do bloco (medido em bytes)
- Gás utilizado - O total de unidades de gás utilizadas pelas transações no bloco
- Limite de Gás - Os limites totais de gás definidos pelas transações no bloco
- Taxa base por gás - O multiplicador mínimo necessário para que uma transação seja incluída em um bloco
- Taxas queimadas - Quanto ETH é queimado no bloco
- Dados extras - Quaisquer dados extras que o minerador incluiu no bloco

**Dados avançados**

- Hash - O hash criptográfico que representa o cabeçalho do bloco (o identificador único do bloco)
- Hash pai - O hash do bloco que veio antes do bloco atual
- StateRoot - O hash raiz da árvore de Merkle, que armazena todo o estado do sistema

### Gás {#gas}

Os exploradores de blocos não apenas fornecerão dados sobre o uso de gás em transações e bloqueios, mas alguns fornecerão informações sobre os preços atuais do gás na rede. Isso ajudará você a entender o uso da rede, enviar transações seguras e não gastar muito com gás. Procure APIs que podem ajudá-lo a inserir essas informações na interface do seu produto. Os dados específicos do gás cobrem:

- Unidades estimadas de gás necessárias para uma transação segura, mas lenta (+ preço e duração estimados)
- Unidades estimadas de gás necessárias para uma transação média (+ preço e duração estimados)
- Unidades estimadas de gás necessárias para uma transação rápida (+ preço e duração estimados)
- Tempo médio de confirmação com base no preço do gás
- Contratos que consomem gás - em outras palavras, produtos populares que estão sendo muito usados na rede
- Contas que estão gastando gás - em outras palavras, usuários frequentes da rede

### Transações {#transactions}

Os exploradores de blocos se tornaram um lugar comum para as pessoas acompanharem o andamento de suas transações. Isso ocorre porque o nível de detalhe que você pode obter fornece uma certeza extra. Os dados de transação incluem:

**Dados padrão**

- Hash da transação - Um hash gerado quando a transação é enviada
- Status - Uma indicação de se a transação está pendente, falhou ou foi concluída
- Bloco - O bloco em que a transação foi incluída
- Carimbo de tempo - A hora em que o mineiro minerou a transação
- De - O endereço da conta que enviou a transação
- Para - O endereço do destinatário ou o contrato inteligente com que a transação interagem
- Tokens transferidos - Uma lista de tokens que foram transferidos como parte da transação
- Valor - O valor total de ETH que está sendo transferido
- Taxa de transação - O valor pago ao minerador para processar a transação (calculado pelo preço do gás\*gás usado)

**Dados avançados**

- Limite de gás - O número máximo de unidades de gás que esta transação pode consumir
- Gás usado - A quantidade real de unidades de gás que a transação consumiu
- Preço do gás - O preço estabelecido por unidade de gás
- Nonce - O número da transação para o endereço `de` (tenha em mente que isso começa em 0, então um nonce de `100` seria na verdade a 101 transação enviada por esta conta
- Dados de entrada - Quaisquer informações extras necessárias pela transação

### Contas {#accounts}

Há muitos dados que você pode acessar sobre uma conta. É por isso que muitas vezes é recomendado usar várias contas para que seus ativos e valor não possam ser facilmente rastreados. Existem também algumas soluções que estão a ser desenvolvidas para tornar as transações e as atividades de contabilidade mais privadas. Mas aqui estão os dados que estão disponíveis para contas:

**Contas de usuários**

- Endereço da conta - O endereço público para o qual você pode usar para enviar fundos
- Saldo ETH - A quantidade de ETH associada a essa conta
- Valor total de ETH - O valor do ETH
- Tokens - Os tokens associados à conta e seu valor
- Histórico de transações - Uma lista de todas as transações em que esta conta foi o remetente ou o destinatário

**Contratos inteligentes**

As contas de contrato inteligentes possuem todos os dados que uma conta de usuário terá, mas alguns exploradores de blocos também exibirão algumas informações de código. Os exemplos incluem:

- Criador de contrato - O endereço que implantou o contrato na rede principal
- Transação de criação - A transação que incluiu a implantação para a conta principal
- Código fonte - O código Solidity ou Vyper do contrato inteligente
- Contrato ABI - Interface Binária do contrato da aplicação, as chamadas são feitas e os dados recebidos
- Código de criação do contrato - O bytecode compilado do contrato inteligente, criado quando você compila um contrato inteligente escrito em Solidity ou Vyper etc.
- Eventos de contrato - Um histórico dos métodos chamados no contrato inteligente, basicamente uma maneira de ver como o contrato está sendo usado e com que frequência

### Tokens {#tokens}

Tokens são um tipo de contrato, então eles terão dados semelhantes a um contrato inteligente. Mas como eles têm valor e podem ser trocados, eles têm pontos de dados adicionais:

- Tipo - Se eles forem um padrão ERC-20, ERC-721 ou outro padrão de token
- Preço - Se eles forem um ERC-20, terão um valor de mercado atual
- Capitalização de mercado - Se forem ERC-20, terão uma capitalização de mercado (calculada por preço\*oferta total)
- Oferta total - O número de tokens em circulação
- Holders - O número de endereços que possuem o token
- Transferências - O número de vezes que o token foi transferido entre contas
- Histórico de transações - Um histórico de todas as transações, incluindo o token
- Endereço do contrato - O endereço do token que foi implantado na rede principal
- Números decimais - tokens ERC-20 são divisíveis e têm casas decimais

### Rede {#network}

Alguns dados do bloco estão preocupados com a funcionalidade da Ethereum de forma mais holística.

- Total de transações - O número de transações desde a criação da Ethereum
- Transações por segundo - O número de transações processáveis em um segundo
- Preço ETH - As avaliações atuais de 1 ETTH
- Fornecimento total de ETH – Número de ETH em circulação – lembre-se de que o novo ETH é criado com a criação de cada bloco sob a forma de recompensas por bloco
- Capitalização de mercado - Cálculo do preço \ \* oferta

## Dados de camada de consenso {#consensus-layer-data}

### Época {#epoch}

Por razões de segurança, comitês aleatórios de validadores são criados no final de cada período (a cada 6,4 minutos). Os dados de época incluem:

- Número de época
- Status finalizado – Se o período foi finalizado (Sim/Não)
- Tempo – O tempo em que a época terminou
- Atestações - O número de atestações na época (votos para blocos dentro de espaços)
- Depósitos – O número de depósitos de ETH incluídos na época (os validadores devem fazer participações de ETH para se tornarem validadores)
- Remoções - Número de penalidades dadas aos proponentes de blocos ou atestadores
- Participação na votação – A quantidade de participações de ETH usadas para atestar blocos
- Validadores – Número de validadores ativos para a época
- Saldo médio de validador – Saldo médio para validadores ativos
- Espaços – Número de espaços incluídos na época (espaços incluem um bloco válido)

### Espaço {#slot}

Espaços são oportunidades para criação de blocos, os dados disponíveis para cada espaço incluem:

- Época – A época em que o espaço é válido
- Número do espaço
- Status – O status do espaço (proposto/perdido)
- Tempo - o carimbo de data/hora do espaço
- Proponente – O validador que propôs o bloco para o espaço
- Raiz do bloco - A raiz da árvore de hash do BeaconBlock
- Raiz principal – O hash do bloco que veio antes
- Raiz do estado - A raiz da árvore de hash do BeaconState
- Assinatura
- Randao revelado
- Graffiti - Um proponente de blocos pode incluir uma mensagem de 32 bytes em sua proposta de bloco
- Dados de execução
  - Hash do bloco
  - Contagem de depósitos
  - Raiz de depósito
- Atestações - Número de atestações para o bloco neste espaço
- Depósitos - O número de depósitos durante este espaço
- Saídas voluntárias - O número de validadores que saiu durante o espaço
- Remoções - Número de penalidades dadas aos proponentes de blocos ou atestores
- Votos - Os validadores que votaram no bloco neste espaço

### Blocos {#blocks-1}

Proof-of-stake divide o tempo em slots e épocas. Isso significa novos dados!

- Proponente - O validador que foi escolhido algoritmicamente para propor o novo bloco
- Época - A época em que o bloco foi proposto
- Espaço - O espaço em que o bloco foi proposto
- Atestações - O número de atestado incluído no espaço — atestações são como votos que indicam que o bloco está pronto para ir para a Beacon Chain

### Validadores {#validators}

Os validadores são responsáveis por propor blocos e atestá-los dentro dos espaços.

- Número do validador - Número único que representa o validador
- Saldo atual - O saldo do validador incluindo recompensas
- Saldo efetivo - O saldo do validador que é usado para staking
- Receita - As recompensas ou penalidades recebidas pelo validador
- Status - se o validador está on-line e ativo ou não
- Atestação de eficácia - O tempo médio necessário para que as atestações do validador sejam incluídas na cadeia
- Elegibilidade para ativação - Data (e época) em que o validador se tornou disponível para validar
- Ativo desde - Data (e época) em que o validador se tornou ativo
- Blocos propostos - O bloco que o validador propôs
- Atestações - as atestações que o validador forneceu
- Depósitos - O endereço de origem, hash da transação, número do bloco, data e hora, valor e status do depósito de aposta feito pelo validador

### Atestações {#attestations}

As atestações são votos a favor da inclusão de blocos na cadeia. Seus dados estão relacionados a um registro de atestação e dos validadores que atestaram

- Espaço - O espaço em que a atestação ocorreu
- Índice do comitê - O índice do comitê em determinado espaço
- Bits de agregação - Representa o certificado agregado de todos os validadores participantes na atestação
- Validadores - Os validadores que forneceram as atestações
- Raíz do bloco Beacon - Aponta para o bloco que os validadores estão atestando
- Fonte - Pontos para a última época justificada
- Alvo - Pontos para o último limite de época
- Assinatura

### Rede {#network-1}

Os dados de nível superior da camada consensual incluem os seguintes:

- Época atual
- Espaço atual
- Validadores ativos - Número de validadores ativos
- Validadores pendentes - Número de validadores à espera de serem ativados
- Participação de ETH - Valor da participação de ETH na rede
- Saldo médio - Saldo médio de ETH de validadores

## Exploradores de bloco {#block-explorers}

- [Etherscan](https://etherscan.io/) - um explorador de bloco que você pode usar para buscar dados da rede principal Ethereum e rede de testes Goerli
- [Beaconcha.in](https://beaconcha.in/) - um explorador de bloco de código aberto para Ethereum Mainnet e Goerli Testnet
- [Blockchair](https://blockchair.com/ethereum) - o explorador Ethereum mais privado. Também para classificação e filtragem de dados (mempool)
- [Etherchain](https://www.etherchain.org/) - um explorador de blocos para a rede principal Ethereum
- [Ethplorer](https://ethplorer.io/) - um explorador de blocos com foco nos tokens da rede principal Ethereum e rede de testes Kovan

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que ajudou você? Edite esta página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Transações](/developers/docs/transactions/)
- [Contas](/developers/docs/accounts/)
- [Redes](/developers/docs/networks/)
