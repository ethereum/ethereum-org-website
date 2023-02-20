---
title: Exploradores de bloco
description: Uma introdução aos exploradores de bloco, seu portal no mundo dos dados da cadeia de blocos, onde você pode consultar informações sobre transações, contas, contratos e mais.
lang: pt-br
sidebarDepth: 3
---

Exploradores de blocos são o seu portal para os dados do Ethereum. Você pode usá-los para ver dados em tempo real sobre blocos, transações, mineradores, contas e outras atividades em cadeia.

## Pré-requisitos {#prerequisites}

Você deve entender os conceitos básicos do Ethereum; para que você possa entender o sentido dos dados que um explorador de blocos lhe dá. Comece com [uma introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## Serviços {#services}

- [Etherscan](https://etherscan.io/) –_Também disponível em chinês, coreano, russo e japonês_
- [Etherchain](https://www.etherchain.org/)
- [Ethplorer](https://ethplorer.io/) –_ Também disponível em chinês, espanhol, francês, turco, russo, coreano e vietnamita_
- [Blockchair](https://blockchair.com/ethereum) –_ Também disponível em espanhol, francês, italiano, holandês, português, russo, chinês e farsi_
- [Blockscout](https://blockscout.com/)
- [OKLink](https://www.oklink.com/eth)

## Dados {#data}

O Ethereum é transparente por design, então tudo é verificável. Os exploradores de bloco fornecem uma interface para obter essas informações. E isso é tanto para a rede principal Ethereum; quanto para as redes de teste, caso você precise desse dado.

Aqui está um resumo dos tipos de dados que você pode obter de um explorador de blocos.

### Blocos {#blocks}

Novos blocos são adicionados ao Ethereum a cada ~12 segundos (isso pode flutuar) de modo que há um fluxo quase constante de dados, que é adicionado aos exploradores de bloco. Os blocos contêm muitos dados importantes que você pode achar úteis:

**Dados padrões**

- Altura do bloco – O número do bloco e o comprimento da cadeia de blocos (em blocos) na criação do bloco atual.
- Carimbo de tempo – A hora em que um mineiro minerou o bloco.
- Transações – O número de transações incluídas dentro do bloco.
- Mineiro – O endereço do mineiro que minou o bloco.
- Recompensa – O valor do ETH concedido à mineradora para a adição do bloco (recompensa padrão 2ETH + quaisquer taxas de transação incluídas no bloco).
- Dificuldade – A dificuldade associada à mineração do bloco.
- Tamanho – O tamanho dos dados dentro do bloco (medido em bytes).
- Gás utilizado – O total de unidades de gás utilizadas pelas transações no bloco.
- Limite de gás – Os limites totais de gás estabelecidos pelas transações no bloco.
- Dados extras – Quaisquer dados extras que o minerador tenha incluído no bloco.

**Dados avançados**

- Hash – O hash criptográfico que representa o cabeçalho do bloco (o identificador exclusivo do bloco).
- Hash pai – O hash do bloco que veio antes do bloco atual.
- Sha3Uncles – O hash combinado de todos os tios para um determinado pai.
- StateRoot - O hash raiz da árvore de Merkle, que armazena todo o estado do sistema.
- Nonce – Um valor usado para demonstrar a prova de trabalho de um bloco pelo mineiro.

**Blocos tio**

Blocos tio são criados quando dois mineiros criam blocos ao mesmo tempo – apenas um bloco pode ser validado através dos nós. Eles não são incluídos, mas ainda recebem uma recompensa pelo trabalho.

Os exploradores de bloco fornecem informações sobre blocos tio como:

- Um número de bloco tio.
- Uma altura em que ocorreram.
- A altura do bloco em que foram criados.
- Quem o minerou.
- A recompensa ETH.

### Gás {#gas}

Os exploradores de blocos não apenas fornecerão dados sobre o uso de gás em transações e bloqueios, mas alguns fornecerão informações sobre os preços atuais do gás na rede. Isso ajudará você a entender o uso da rede, enviar transações seguras e não gastar muito com gás. Procure APIs que podem ajudá-lo a inserir essas informações na interface do seu produto. Os dados específicos do gás cobrem:

- Unidades estimadas de gás necessárias para uma transação segura, mas lenta (+ preço e duração estimados).
- Unidades estimadas de gás necessárias para uma transação média (+ preço e duração estimados).
- Unidades estimadas de gás necessárias para uma transação rápida (+ preço e duração estimados).
- Tempo médio de confirmação com base no preço do gás.
- Contratos que consomem gás - em outras palavras, produtos populares que estão sendo muito usados na rede.
- Contas que estão gastando gás - em outras palavras, usuários frequentes da rede.

### Transações {#transactions}

Os exploradores de blocos se tornaram um lugar comum para as pessoas acompanharem o andamento de suas transações. Isso ocorre porque o nível de detalhe que você pode obter fornece uma certeza extra. Os dados de transação incluem:

**Dados padrão**

- Hash da transação - um hash gerado quando a transação é enviada.
- Status - Uma indicação se a transação está pendente, falhou ou foi bem-sucedida.
- Bloco – O bloco em que a transação foi incluída.
- Carimbo de Tempo – A hora em que o mineiro minerou a transação.
- De – O endereço da conta que enviou a transação.
- Para – O endereço do destinatário ou o contrato inteligente com que a transação interagem.
- Tokens transferidos - uma lista de tokens que foram transferidos como parte da transação.
- Valor - O valor total de ETH que está sendo transferido.
- Taxa de transação - O valor pago ao minerador para processar a transação (calculado pelo preço do gás \ \* gás usado).

**Dados avançados**

- Limite de gás - o número máximo de unidades de gás que esta transação pode consumir.
- Gás usado – A quantidade real de unidades de gás que a transação consumiu.
- Preço do gás – O preço estabelecido por unidade de gás.
- Nonce - O número da transação para o `do endereço` (tenha em mente que isso começa em 0, então um nonce de `100` seria na verdade a 101 transação enviada por esta conta.
- Dados de entrada – Quaisquer informações extras necessárias pela transação.

### Contas {#accounts}

Há muitos dados que você pode acessar sobre uma conta. É por isso que muitas vezes é recomendado usar várias contas para que seus ativos e valor não possam ser facilmente rastreados. Existem também algumas soluções que estão a ser desenvolvidas para tornar as transacções e as actividades de contabilidade mais privadas. Mas aqui estão os dados que estão disponíveis para contas:

**Contas de usuários**

- Endereço da conta – O endereço público para o qual você pode usar para enviar fundos.
- Saldo ETH – A quantidade de ETH associada a essa conta.
- Valor total de ETH – O valor do ETH.
- Tokens - os tokens associados à conta e seu valor.
- Histórico de transações - uma lista de todas as transações em que esta conta foi o remetente ou o destinatário.

**Contratos Inteligentes**

As contas de contrato inteligentes possuem todos os dados que uma conta de usuário terá, mas alguns exploradores de blocos também exibirão algumas informações de código. Os exemplos incluem:

- Criador de contrato – O endereço que implantou o contrato na rede principal.
- Transação de criação – A transação que incluiu a implantação para a conta principal.
- Código Fonte – A solidez ou código vyper do contrato inteligente.
- Contrato ABI – Interface Binária do contrato da aplicação – as chamadas são feitas e os dados recebidos.
- Código de criação do contrato – O bytecode compilado do contrato inteligente – criado quando você compila um contrato inteligente escrito em Solidity ou Vyper, etc.
- Eventos de contrato – Um histórico dos métodos chamados no contrato inteligente. Basicamente, uma forma de ver como o contrato está a ser utilizado e quantas vezes.

### Tokens {#tokens}

Tokens são um tipo de contrato, então eles terão dados semelhantes a um contrato inteligente. Mas como eles têm valor e podem ser trocados, eles têm pontos de dados adicionais:

- Tipo – se eles são um padrão ERC-20, ERC-721 ou outro padrão de token.
- Preço – se eles forem um ERC-20, terão um valor de mercado atual.
- Capitalização de mercado – se forem ERC-20, terão uma capitalização de mercado (calculada por preço\*oferta total).
- Oferta total – O número de tokens em circulação.
- Titulares – O número de endereços que possuem o token.
- Transferências – O número de vezes que o token foi transferido entre contas.
- Histórico de transações – Um histórico de todas as transações, incluindo o token.
- Endereço do contrato – O endereço do token que foi implantado na rede principal.
- Números decimais – tokens ERC-20 são divisíveis e têm casas decimais.

### Rede {#network}

É claro que existem alguns dados que se referem a saúde da rede. Estes são bastante específicos do mecanismo de consenso de prova de trabalho da Ethereum. Quando Ethereum mudar para prova de participação alguns desses dados serão redundantes

- Dificuldade – A atual dificuldade de mineração.
- Taxa de hash – Uma estimativa de quantas hashes estão sendo geradas pelos mineradores da Ethereum tentando resolver o bloco Ethereum atual ou qualquer bloco.
- Total de transações – O número de transações desde a criação da Ethereum.
- Transações por segundo – O número de transações processáveis em um segundo.
- Preço ETH – As avaliações atuais de 1 ETTH.
- Fornecimento ETH total – Número de ETH em circulação – lembre-se de que o novo ETH é criado com a criação de cada bloco sob a forma de recompensas por bloco.
- Capitalização de mercado - Cálculo do preço \ \* oferta.

## Dados de camada de consenso {#consensus-layer-data}

As melhorias de escalabilidade ainda estão em desenvolvimento, mas vale a pena falar sobre alguns dos pontos de dados que os exploradores poderão lhe fornecer. Na verdade, todos estes dados estão disponíveis para as redes de teste.

Se você não está familiarizado com o roteiro, confira [nossa visão geral das melhorias no Ethereum](/upgrades/).

### Época {#epoch}

A Beacon Chain vai criar comitês de validação que são randomizados ao fim de cada época (cada 6,4 minutos) por razões de segurança. Os dados de época incluem:

- Número de época.
- Status finalizado – Se o período foi finalizado (Sim/Não).
- Tempo – O tempo em que a época terminou.
- Atestados - O número de atestados na época (votos para blocos dentro de espaços).
- Depósitos – O número de depósitos de ETH incluídos na época (os validadores devem fazer participações de ETH para se tornarem validadores).
- Remoções - Número de penalidades dadas aos proponentes de blocos ou atestores.
- Participação na votação – A quantidade de participações de ETH usadas para atestar blocos.
- Validadores – Número de validadores ativos para a época.
- Saldo médio de validador – Saldo médio para validadores ativos.
- Espaços – Número de espaços incluídos na época (espaços incluem um bloco válido).

### Espaço {#slot}

Espaços são oportunidades para criação de blocos, os dados disponíveis para cada espaço incluem:

- Época – A época em que o espaço é válido.
- Número do espaço.
- Status – O status do espaço (Proposto/perdido).
- Tempo - o carimbo de data/hora do espaço.
- Proponente – O validador que propôs o bloco para o espaço.
- Raiz do bloco - A raiz da árvore de hash do BeaconBlock.
- Raiz principal – O hash do bloco que veio antes.
- Raiz do estado - A raiz da árvore de hash do BeaconState.
- Assinatura.
- Randao revelado.
- Graffiti – Um proponente de blocos pode incluir uma mensagem de 32 bytes em sua proposta de bloco.
- Dados de execução.
  - Hash do bloco.
  - Contagem de depósitos.
  - Raiz de depósito.
- Atestações – Número de atestações para o bloco neste espaço.
- Depósitos – O número de depósitos durante este espaço.
- Saídas voluntárias - O número de validadores que saiu durante o espaço.
- Número de penalidades dadas aos proponentes de blocos ou atestores.
- Votos – Os validadores que votaram no bloco neste espaço.

### Blocos {#blocks-1}

Os blocos de camada de consenso funcionam de forma diferente porque os mineradores são substituídos por validadores e o Beacon Chain introduz espaços e épocas para Ethereum. Isso significa novos dados!

- Propositor – O validador que foi escolhido algoritmicamente para propor o novo bloco.
- Época – A época em que o bloco foi proposto.
- Espaço – O espaço em que o bloco foi proposto.
- Atestações - o número de atestações incluídas no espaço. Atestações são como votos que indicam que o bloco está pronto para ir a Beacon Chain.

### Validadores {#validators}

Os validadores são responsáveis por propor blocos e atestá-los dentro dos espaços.

- Número do validador - número exclusivo que representa o validador.
- Saldo atual - O saldo do validador incluindo recompensas.
- Saldo efetivo - O saldo do validador que é usado para participar.
- Receita - As recompensas ou penalidades recebidas pelo validador.
- Status - se o validador está on-line e ativo ou não.
- Eficácia da atestação - O tempo médio necessário para que as atestações do validador sejam incluídas na cadeia.
- Elegibilidade para ativação - Data (e época) em que o validador se tornou disponível para validar.
- Ativo desde - Data (e época) em que o validador se tornou ativo.
- Blocos propostos - O bloco que o validador propôs.
- Atestados - os atestados que o validador forneceu.
- Depósitos - O endereço de origem, hash da transação, número do bloco, data e hora, valor e status do depósito de aposta feito pelo validador.

### Atestações {#attestations}

As atestações são votos a favor da inclusão de blocos na cadeia. Seus dados estão relacionados a um registro de atestação e dos validadores que atestaram

- Espaço - O espaço em que a atestação ocorreu.
- Índice do comitê – O índice do comitê num determinado espaço.
- Bits de agregação – Representa o certificado agregado de todos os validadores participantes na atestação.
- Validadores – Os validadores que forneceram as atestações.
- Base do Bloco Beacon – Aponta para o bloco que os validadores estão atestando.
- Fonte – Pontos para a última época justificada.
- Alvo – Pontos para o último limite de época.
- Assinatura.

### Rede {#network-1}

Os dados de nível superior da camada consensual incluem os seguintes:

- Época Atual.
- Espaço atual.
- Validadores ativos – Número de validadores ativos.
- Validadores pendentes – Número de validadores à espera de serem ativados.
- Participação de ETH – Valor da participação de ETH na rede.
- Saldo médio – Saldo médio de ETH de validadores.

## Exploradores de bloco {#block-explorers}

- [Etherscan](https://etherscan.io/) - um explorador de blocos que pode usar para buscar dados para a rede principal Ethereum, rede de testes Ropsten, rede de testes Kovan, rede de testes Rinkeby e rede de testes Goerli.
- [Blockscout](https://blockscout.com/) – focado nas seguintes redes:
  - xDai – uma combinação inteligente da moeda estável DAI da MakerDAO e da tecnologia sidechain e tokenbridge do POA.
  - POA – Uma sidechain e rede autônoma protegida por um grupo de validadores confiáveis. Todos os validadores na rede são notários dos Estados Unidos, e suas informações estão publicamente disponíveis.
  - Rede de testes POA Sokol.
  - ARTIS – uma cadeia de blocos compatível com Ethereum.
  - [LUKSO L14](https://blockscout.com/lukso/l14) - O L14 funciona como a primeira rede de testes, para permitir que a comunidade LUKSO crie e teste em uma infraestrutura comum.
  - qDai.
- [Etherchain](https://www.etherchain.org/) - um explorador de blocos para a rede principal Ethereum.
- [Ethplorer](https://ethplorer.io/) - um explorador de blocos com foco nos tokens da rede principal Ethereum e rede de testes Kovan.
- [Blockchair](https://blockchair.com/ethereum) - o explorador Ethereum mais privado. Também para classificação e filtragem de dados (mempool).

## Exploradores de blocos Beacon chain (camada de consenso) {#beacon-chain-block-explorers}

- [https://beaconcha.in/](https://beaconcha.in/)
- [https://beaconscan.com/](https://beaconscan.com/)
- [https://ethscan.org/](https://ethscan.org/) (bifurcação do beaconcha.in)

## Leitura adicional {#further-reading}

_Conhece um recurso da comunidade que te ajudou? Edite esta página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Mineração](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transações](/developers/docs/transactions/)
- [Contas](/developers/docs/accounts/)
- [Redes](/developers/docs/networks/)
