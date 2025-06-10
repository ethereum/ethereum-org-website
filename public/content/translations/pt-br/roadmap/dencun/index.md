---
title: "Cancun-Deneb (Dencun): perguntas frequentes"
description: Perguntas frequentes sobre a melhoria de rede Cancun-Deneb (Dencun)
lang: pt-br
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) é uma melhoria na rede Ethereum, que ativa o **Proto-Danksharding (EIP-4844)**, introduzindo blobs de dados temporários para armazenamento mais barato em rollups de [camada 2 (L2)](/glossary/#layer-2).

Um novo tipo de transação que permite fornecedores de rollup armazenarem dados de uma maneira mais eficiente em relação ao custo, o que é conhecido como "blobs." Os blobs ficam disponíveis para a rede em torno de 18 dias (mais precisamente, 4.096 [épocas](/glossary/#epoch)). Depois desse período os blobs são removidos da rede, mas os aplicativos ainda podem verificar a validade dos dados deles usando provas.

Isso reduz significativamente o custo dos rollups, limita o crescimento da cadeia e ajuda a dar suporte a mais usuários enquanto mantém a segurança e um conjunto descentralizado de nós operadores.

## Quando se pode esperar que rollups tenham taxas menores devido ao Proto-Danksharding? {#when}

- Essa melhoria foi ativada na época 269568, em **13 de março de 2024 às 13h55 (UTC)**
- Todos os provedores de rollup mais conhecidos, como Arbitrum ou Optimism, sinalizaram que os blobs serão imediatamente compatíveis depois da melhoria
- O cronograma para o suporte a rollups individuais pode variar, pois cada provedor atualiza seus sistemas para aproveitar o novo espaço de blobs

## Como ETH pode ser convertido depois do hard fork? {#scam-alert}

- **Nenhuma ação será necessária para seu ETH**: Depois da melhoria Dencun no Ethereum, não é necessários converter or atualizar seu ETH. Seu saldo de conta irá permanecer o mesmo e o ETH que você tem atualmente continuará acessível na sua forma existente depois do hard fork.
- **Atenção aos golpes!**<Emoji text="⚠️" />**Qualquer pessoa que instrua você a "atualizar" seu ETH está tentando aplicar um golpe.** Você não precisa fazer nada em relação a essa melhoria. Seus ativos não serão afetados de forma nenhuma. Lembre-se: estar informado é a melhor defesa contra golpes.

[Mais sobre como reconhecer e evitar golpes](/segurança/)

## Qual problema a melhoria de rede Dencun está resolvendo? {#network-impact}

A melhoria Dencun primeiro soluciona a questão do **dimensionamento** (lidar com mais usuários e mais transações) com **taxas acessíveis** enquanto **mantém a descentralização** da rede.

A comunidade Ethereum está optando por uma abordagem "centrada em rollup" para o seu crescimento. Essa abordagem coloca rollups de camada 2 como a principal forma de lidar com mais usuários de forma segura.

As redes rollup lidam com o _processamento_ (ou a "execução") das transações de forma separada da rede principal e publicam uma prova criptográfica e/ou os dados compactados dos resultados das transações de volta na rede principal para fins de registro. Armazenar essas provas tem um custo (na forma de [gas](/glossary/#gas)). Antes do Proto-Danksharding essas provas tinham de ser armazenadas de forma permanente por todos os operadores de nós da rede, sendo essa uma tarefa de custo elevado.

A introdução do Proto-Danksharding na melhoria Dencun promove um armazenamento de dados mais barato para essas provas por exigir que os operadores de nó armazenem esses dados somente por 18 dias, aproximadamente. Depois desse período, esses dados podem ser removidos de forma segura para prevenir o aumento dos requisitos de hardware.  Como os rollups têm, em geral, um período para saque de 7 dias, os modelos de segurança deles continuam sem modificações sempre e quando os blobs estejam disponíveis na camada 1 durante esse período. A janela de remoção de 18 dias cria um divisor importante para esse período.

[Mais sobre como dimensionar o Ethereum](/roadmap/scaling/)

## Como os dados antigos dos blobs são acessados? {#historical-access}

Enquanto os nós regulares do Ethereum sempre irão armazenar o _estado atual_ da rede, os dados históricos do blob podem ser descartados em aproximadamente 18 dias após sua introdução. Antes de descartar esses dados, o Ethereum garante que eles estejam disponíveis para todos os participantes da rede, dando tempo para:

- As partes interessadas baixar e armazenar os dados.
- A conclusão de todos os períodos de desafio do rollup.
- A finalização das transações do rollup.

Dados _históricos_ do blob podem ser necessários por diversos motivos e podem ser armazenados e acessados usando vários protocolos descentralizados:

- **Protocolos de indexação de terceiros**, como o The Graph, armazenam esses dados por meio de uma rede descentralizada de operadores de nó motivados por mecanismos criptoeconômicos.
- **BitTorrent** é um protocolo descentralizado em que voluntários podem armazenar e distribuir esses dados para outras pessoas.
- **[A rede do portal Ethereum](/developers/docs/networking-layer/portal-network/)** tem o objetivo de prover acesso a todos os dados de Ethereum por meio de uma rede descentralizada de operadores de nó ao distribuir os dados entre os participantes de forma semelhante ao BitTorrent.
- **Usuários individuais** sempre são livres para armazenar suas próprias cópias de quaisquer dados que desejarem para referência histórica.
- **Provedores de rollup** são incentivados a armazenar esses dados para promover melhorias à experiência do usuário do rollup.
- Os **exploradores de bloco** executam nós de arquivo que indexam e armazenam toda essa informação para facilitar a referência histórica, acessível para usuários via uma interface Web.

É importante lembrar que a recuperação de estados históricos opera em um \***modelo de confiança 1-de-N**. Isso significa que você precisa somente de _uma única fonte confiável_ para verificar a validade desses dados usando o estado atual da rede.

## Como essa melhoria contribui para o roadmap mais amplo do Ethereum? {#roadmap-impact}

O Proto-Danksharding prepara o caminho para a implementação total do [Danksharding](/roadmap/danksharding/). O Danksharding é feito para distribuir o armazenamento dos dados de rollup através dos operadores de nó, para que cada operador gerencie somente uma pequena parte do total desses dados. Essa distribuição aumentará o número de blobs de dados por bloco, o que é essencial no dimensionamento do Ethereum para gerenciar mais usuários e transações.

Esse dimensionamento é crucial para [suportar bilhões de usuários no Ethereum](/roadmap/scaling/) com taxas acessíveis e aplicativos mais avançados, enquanto se mantém uma rede descentralizada. Sem essas mudanças, as demandas de hardware para os operadores de nó aumentariam, necessitando de equipamentos cada vez mais caros. Isso poderia excluir pequenos operadores pelo fator preço, resultando em uma concentração do controle de rede entre alguns grandes operadores, o que iria contra o princípio da descentralização.

## Essa melhoria afeta todos os clientes de consenso e validação do Ethereum? {#client-impact}

Sim, o Proto-Danksharding (EIP-4844) requer melhorias tanto para os clientes de execução quanto para os clientes de consenso. Todos os clientes de Ethereum têm versões lançadas compatíveis com a melhoria. Para manter a sincronização com a rede Ethereum depois da melhoria, os operadores de nó precisam assegurar que estão executando uma versão compatível do cliente. Observe que as informações sobre os lançamentos de clientes são perenes, e os usuários deveriam usar como referência as últimas melhorias para ter os detalhes mais atuais. [Veja detalhes sobre lançamentos de clientes compatíveis](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Os clientes de consenso gerenciam o software _validador_, que foi atualizado para acomodar a melhoria.

## Como a Cancun-Deneb (Dencun) afeta a Goerli ou outras redes de teste Ethereum? {#testnet-impact}

- Devnets, Goerli, Sepolia e Holesky, todas passaram pela melhoria Dencun e têm o Proto-Danksharding em funcionamento total
- Os desenvolvedores de rollup podem usar essas redes para testar o EIP-4844
- A maioria dos usuários não será afetada por essa mudança em cada rede de teste

## Todas as transações nas camadas L2 vão utilizar o espaço de blob temporário ou é possível escolher? {#calldata-vs-blobs}

As transações rollup na Camada 2 (L2) do Ethereum têm a opção de usar dois tipos de armazenamento de dados: espaço temporário de blobs ou calldata permanente para contratos inteligentes. O espaço de blobs é uma escolha econômica, fornecendo um armazenamento temporário com um custo menor. Ele garante a disponibilidade dos dados para todos os períodos de desafio necessários. Por outro lado, o calldata do contrato inteligente oferece um armazenamento permanente, mas tem um custo maior.

A decisão de utilizar o espaço de blobs ou calldata é feita principalmente pelos provedores de rollup. Eles baseiam essa decisão de acordo com a demanda atual por espaço de blobs. Se o espaço de blobs está com alta demanda, os rollups podem optar por calldata para assegurar que os dados são publicados de maneira oportuna.

Enquanto é teoricamente possível para os usuários escolherem o tipo de armazenamento preferido, geralmente são os provedores de rollup que gerenciam essa escolha. Oferecer essa opção para os usuários adicionaria complexidade, particularmente em transações envolvendo rentabilidade. Para detalhes específicos sobre essa escolha, os usuários devem ler a documentação fornecida por cada provedor de rollup.

## O 4844 irá reduzir o gás na L1? {#l1-fee-impact}

Não muito. Um novo mercado de gás foi introduzido exclusivamente para o espaço de blobs, com uso destinado aos provedores de rollup. _Apesar das taxas na L1 poderem ser diminuídas pela redução da carga dos dados do rollup para os blobs, essa melhoria visa a redução das taxas na L2. Pode ocorrer uma redução nas taxas L1 (rede principal) como um efeito secundário menor._

- A redução do gás na L1 será proporcional à adoção/ao uso dos dados de blobs pelos provedores de rollup
- É provável que o gás na L1 se mantenha competitivo graças às atividades não relacionadas aos rollups
- Os rollups que adotarem o uso do espaço de blobs utilizarão menos gás na L1, ajudando a reduzir as taxas de gás em pouco tempo
- O espaço de blobs ainda é limitado, então se os blobs contidos em um bloco estiverem saturados ou cheios, os rollups poderão solicitar a publicação dos dados como dados permanentes durante esse período, o que aumentaria os preços de gás na L1 e L2

## Isso vai reduzir as taxas em outras blockchains da camada 1 da EVM? {#alt-l1-fee-impact}

Não. Os benefícios do Proto-Danksharding são específicos para os rollups da camada 2 do Ethereum que armazenem suas provas na camada 1 (rede principal).

Ser compatível com a Máquina Virtual Ethereum (EVM) não significa que uma rede terá qualquer benefício com essa melhoria. As redes que operam de forma independente do Ethereum (sejam ou não compatíveis com a EVM) não armazenam seus dados no Ethereum e não terão nenhum benefício com essa melhoria.

[Mais sobre rollups da camada 2](/layer-2/)

## Você é o tipo de pessoa que aprende mais com recursos visuais? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

Aproveitando o escalonamento do Ethereum, EIP-4844 -- Finematics _

<YouTube id="dFjyUY3e53Q" />

_Fundamentos sobre o espaço de blobs, com Domothy -- Bankless_

## Leitura adicional {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Transações de blob fragmentadas (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Anúncio da rede principal Dencun](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog da Ethereum Foundation_
- [O guia do Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [Proto-Danksharding: perguntas frequentes](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Uma explicação detalhada do EIP-4844: a base da melhoria Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [AllCoreDevs: atualização 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_
