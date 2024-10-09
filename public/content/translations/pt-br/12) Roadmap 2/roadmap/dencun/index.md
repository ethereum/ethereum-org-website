---
title: Cancun-Deneb (Dencun) FAQ
description: Questões mais frequentes sobre a atualização de rede Cancun-Deneb (Dencun)
lang: pt-br
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) é uma atualização na rede Ethereum, que ativa o **Proto-Danksharding (EIP-4844)**, introduzindo blobs de dados temporários para armazenamento mais barato em rollups de [camada 2 (L2)](/glossary/#layer-2).

Um novo tipo de transação que permite fornecedores de rollup armazenarem dados de uma maneira mais eficiente em relação ao custo, o que é conhecido como "bolhas." As bolhas ficam disponíveis para a rede em torno de 18 dias (mais precisamente, 4096 [épocas](/glossary/#epoch)). Depois desse período as bolhas são removidas da rede, mas as aplicações ainda podem verificar a validade dos dados delas usando provas.

Isso reduz significativamente o custo dos rollups, limita o crescimento da cadeia e ajuda a aguentar mais usuários enquanto mantém a segurança e um conjunto descentralizado de nós operadores.

## Quando nós esperamos que rollups tenham taxas menores devido ao Proto-Danksharding? {#when}

- Essa atualização foi ativada na época 269568, em **13-Mar-24 às 13:55PM (UTC)**
- Todos os provedores de rollup mais conhecidos, como Arbitrum ou Optimism, sinalizaram que bolhas serão suportadas imediatamente após a atualização
- O prazo para suporte ao rollup individual pode variar, pois cada provedor atualiza seus sistemas para tirar vantagem do novo espaço de bolha

## Como ETH pode ser convertido depois do hard fork? {#scam-alert}

- **Nenhuma ação será necessária para seu ETH**: Depois da atualização Dencun na Ethereum não há necessidade de converter or atualizar seu ETH. Seu saldo de conta irá permanecer o mesmo e o ETH que você tem atualmente continuará acessível na sua forma existente depois do hard fork.
- **Atenção aos Golpes!**<Emoji text="⚠️" /> **qualquer pessoa que te instrua a "atualizar" seu ETH está tentando aplicar um golpe em você.** Você não precisa fazer nada em relação a essa atualização. Seus ativos não serão afetados de forma nenhuma. Lembre, estar informado(a) é a melhor defesa contra golpes.

[Mais sobre como reconhecer e evitar golpes](/segurança/)

## Qual problema a atualização de rede Dencun está resolvendo? {#network-impact}

Dencun primeiro soluciona a questão da **escalabilidade** (lidar com mais usuários e mais transações) com **taxas acessíveis** enquanto **mantém a descentralização** da rede.

A comunidade Ethereum está optando por uma abordagem "centrada em rollup" para o seu crescimento, essa abordagem coloca rollups de camada 2 como a principal forma de lidar com mais usuários de forma segura.

Redes rollup gerenciam o _processamento_ (ou "execução") das transações separadamente da Mainnet e então publicam uma prova criptográfica e/ou os dados comprimidos dos resultados das transações de volta para a Mainnet para que sejam gravados. Armazenar essas provas tem um custo (na forma de [gas](/glossary/#gas)), o qual, antes do Proto-Danksharding, tinha de ser armazenado de forma permanente por todos os operadores de nós da rede, sendo essa uma tarefa de custo elevado.

A introdução do Proto-Danksharding na atualização Dencun adiciona um armazenamento de dados mais barato para essas provas por somente requisitar aos operadores de nó que armazenem esses dados por aproximadamente 18 dias, depois dos quais esses dados podem ser removidos de forma segura para prevenir o aumento dos requisitos de hardware.  Como os rollups têm tipicamente um período para saque de 7 dias, seus modelos de segurança continuam sem modificações enquanto as bolhas estiverem disponíveis na L1 durante esse período. A janela de remoção de 18 dias cria um divisor importante para esse período.

[Mais sobre escalonando a Ethereum](/roadmap/scaling/)

## Como os dados antigos da bolha são acessados? {#historical-access}

Enquanto os nós regulares da Ethereum sempre irão armazenar o _estado atual_ da rede, dados históricos da bolha podem ser descartados em aproximadamente 18 dias após sua introdução. Antes de descartar esses dados a Ethereum assegura que eles estejam disponíveis para todos os participantes da rede, permitindo tempo para:

- As partes interessadas possam fazer o download e armazenar os dados.
- Conclusão de todos os períodos de desafio do rollup.
- Finalização das transações do rollup.

Dados _históricos_ da bolha podem ser desejados por diversos motivos e podem ser armazenados e acessados usando vários protocolos descentralizados:

- **Protocolos de indexação de terceiros**, como o The Graph, armazenam esses dados através de uma rede descentralizada de operadores de nó incentivada por mecanismos criptoeconômicos.
- **BitTorrent** é um protocolo descentralizado onde voluntários(as) podem armazenar e distribuir esses dados para outras pessoas.
- **[Rede portal da Ethereum](/developers/docs/networking-layer/portal-network/)** tem o objetivo de prover acesso a todos os dados da Ethereum através de uma rede descentralizada de operadores de nó distribuindo dados entre os(as) participantes de forma semelhante ao BitTorrent.
- **Usuários individuais** sempre são livres para armazenar suas próprias cópias de quaisquer dados que desejarem para referência histórica.
- **Provedores de rollup** são incentivados a armazenar esses dados para trazer melhorias para a experiência do usuário do rollup.
- **Exploradores de bloco** tipicamente executam nós de arquivo que indexam e armazenam toda essa informação para facilitar a referência histórica, acessível para usuários via uma interface Web.

É importante lembrar que a recuperação de estados do passado opera em um \***modelo de confiança 1-de-N**. Isso significa que você precisa somente de _uma única fonte confiável_ para verificar a validade desses dados usando o estado atual da rede.

## Como essa atualização contribui para o plano de ação mais amplo da Ethereum? {#roadmap-impact}

O Proto-Danksharding prepara o caminho para a total implementação do [Danksharding](/roadmap/danksharding/). O Danksharding é feito para distribuir o armazenamento dos dados de rollup através dos operadores de nó, para que cada operador gerencie somente uma pequena parte do total desses dados. Essa distribuição aumentará o número de bolhas de dados por bloco, o que é essencial no escalonamento da Ethereum para gerenciar mais usuários e transações.

Essa escalonabilidade é crucial para [suportar bilhões de usuários na Ethereum](/roadmap/scaling/) com taxas acessíveis e aplicações mais avançadas, enquanto se mantém uma rede descentralizada. Sem essas mudanças, as demandas de hardware para os operadores de nó iriam se agravar, levando à necessidade de uso de um equipamento cada vez mais caro. Isso poderia excluir pequenos operadores pelo fator preço, resultando em uma concentração do controle de rede entre alguns grandes operadores, o que iria contra o princípio da descentralização.

## Essa atualização atinge todos os clientes nos mecanismos de consenso e clientes validadores da Ethereum? {#client-impact}

Sim, o Proto-Danksharding (EIP-4844) requer atualizações tanto para os clientes de execução quanto para os clientes de consenso. Todos os clientes da Ethereum têm versões lançadas que são comportam a atualização. Para manter a sincronização com a rede Ethereum após a atualização, os operadores de nó precisam assegurar que eles estão executando uma versão habilitada do cliente. Perceba que a informação sobre os lançamentos de clientes é sensível no tempo, e os usuários deveriam usar como referência as últimas atualizações para os detalhes mais atuais. [Veja detalhes sobre lançamentos de clientes habilitados](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Os clientes de consenso gerenciam o software _validador_, o qual teve tudo atualizado para acomodar a atualização.

## Como a Cancun-Deneb (Dencun) afeta a Goerli ou outras redes de teste da Ethereum? {#testnet-impact}

- Devnets, Goerli, Sepolia e Holesky, todas passaram pela atualização Dencun e têm o Proto-Danksharding em funcionamento total
- Desenvolvedores(as) de rollup podem usar essas redes para testar o EIP-4844
- A maioria dos usuários irá continuar sem ser afetada por essa mudança em cada rede de teste

## Todas as transações nas camadas L2 agora irão utilizar o espaço bolha temporário ou você poderá escolher? {#calldata-vs-blobs}

Transações rollup na Camada 2 (L2) da Ethereum têm a opção de usar dois tipos de armazenamento de dados: espaço bolha temporário ou calldata permanente para contratos inteligentes. O espaço bolha é uma escolha econômica, fornecendo um armazenamento temporário com um custo menor. Ele garante a disponibilidade dos dados para todos os períodos de desafio necessários. Por sua vez, o calldata do contrato inteligente oferece um armazenamento permanente, mas tem um custo maior.

A decisão de utilizar o espaço bolha ou calldata é feita principalmente pelos provedores de rollup. Eles baseiam essa decisão pela demanda atual por espaço bolha. Se o espaço bolha está com alta demanda, rollups podem optar por calldata para assegurar que os dados são publicados de maneira oportuna.

Enquanto é teoricamente possível para os usuários escolherem seu tipo de armazenamento preferido, geralmente são os provedores de rollup que gerenciam essa escolha. Oferecer essa opção para os usuários iria adicionar complexidade, particularmente em transações envolvendo rentabilidade. Para detalhes específicos sobre essa escolha, usuários devem se referir a documentação fornecida por cada provedor de rollup.

## O 4844 irá reduzir o gas na L1? {#l1-fee-impact}

Não muito. Um novo mercado de gas foi introduzido exclusivamente para o espaço bolha, para uso pelos provedores de rollup. _Apesar das taxas na L1 poderem ser reduzidas pela redução da carga dos dados do rollup para as bolhas, essa atualização foca na redução das taxas na L2. Redução das taxas na L1 (Mainnet) podem ocorrer como um efeito de segunda ordem com menor alcance._

- A redução do gas na L1 será proporcional à adoção/uso dos dados de bolha pelos provedores de rollup
- O gas na L1 provavelmente irá se manter competitivo para atividades não relacionadas a rollup
- Rollups que adotarem o uso do espaço bolha utilizarão menos gas na L1, ajudando a abaixar as taxas de gas para baixo em um curto período
- O espaço bolha ainda é limitado, então se as bolhas contidas em um bloco estiverem saturadas/cheias os rollups podem solicitar a publicação dos seus dados como dados permanentes durante esse período, o que iria aumentar os preços de gas na L1 e L2

## Isso irá reduzir as taxas em outras blockchains da camada 1 da EVM? {#alt-l1-fee-impact}

Não. Os benefícios do Proto-Danksharding são específicos para os rollups da camada 2 da Ethereum que armazenem suas provas na camada 1 (Mainnet).

Ser compatível com a Máquina Virtual Ethereum (EVM) não significa que uma rede terá qualquer benefício dessa atualização. Redes que operam de forma independente da Ethereum (sejam ou não compatíveis com a EVM) não armazenam seus dados na Ethereum e não terão nenhum benefício dessa atualização.

[Mais sobre rollups da camada 2](/layer-2/)

## Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Desvendando o Escalonamento da Ethereum, EIP-4844 -- Finematics _

<YouTube id="dFjyUY3e53Q" />

_Espaço bolha 101 com Domothy -- Bankless_

## Leitura adicional {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Transações bolha fragmentadas (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Anúncio da Mainnet Dencun](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog da Fundação Ethereum_
- [O guia Hitchhiker's para a Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Proto-Danksharding FAQ](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Uma explicação em profundidade do EIP-4844: O núcleo da atualização Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [AllCoreDevs Atualização 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_
