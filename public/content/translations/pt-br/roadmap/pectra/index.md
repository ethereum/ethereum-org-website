---
title: Pectra
metaTitle: Prague-Electra (Pectra)
description: "Aprenda sobre a atualização do protocolo Pectra"
lang: pt-br
authors: ["Nixo", "Mario Havel"]
---

A atualização da rede Pectra seguiu a [Dencun](/roadmap/dencun/) e trouxe mudanças tanto para a camada de execução quanto para a camada de consenso do Ethereum. O nome abreviado Pectra é uma combinação de Prague e Electra, que são os respectivos nomes para as mudanças de especificação da camada de execução e da camada de consenso. Juntas, essas mudanças trazem uma série de melhorias para os usuários, desenvolvedores e validadores do [Ethereum](/).

Esta atualização foi ativada com sucesso na Rede Principal do Ethereum na época `364032`, em **07 de maio de 2025 às 10:05 (UTC)**.

<Alert variant="update">
<AlertContent>
<AlertDescription>
A atualização Pectra é apenas um único passo nos objetivos de desenvolvimento de longo prazo do Ethereum. Saiba mais sobre [o roteiro do protocolo](/roadmap/) e as [atualizações anteriores](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Melhorias na Pectra {#new-improvements}

A Pectra traz o maior número de [EIPs](https://eips.ethereum.org/) de todas as atualizações anteriores! Há muitas mudanças menores, mas também alguns novos recursos significativos. A lista completa de mudanças e detalhes técnicos pode ser encontrada nas EIPs individuais incluídas.

### Código de conta EOA {#7702}

A [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) representa um grande passo em direção à ampla [abstração de conta](/roadmap/account-abstraction/). Com esse recurso, os usuários podem configurar seu endereço ([EOA](/glossary/#eoa)) para ser estendido com um contrato inteligente. A EIP introduz um novo tipo de transação com uma função específica - permitir que os proprietários de endereços assinem uma autorização que configura seu endereço para imitar um contrato inteligente escolhido. 

Com esta EIP, os usuários podem optar por carteiras programáveis que permitem novos recursos, como agrupamento de transações, transações sem gás e acesso a ativos personalizados para esquemas de recuperação alternativos. Essa abordagem híbrida combina a simplicidade das EOAs com a programabilidade das contas baseadas em contratos. 

Leia uma exploração detalhada sobre a 7702 [aqui](/roadmap/pectra/7702/)

### Aumento do saldo efetivo máximo {#7251}

O saldo efetivo atual do validador é de exatamente 32 ETH. É a quantia mínima necessária para participar do consenso, mas, ao mesmo tempo, o máximo que um único validador pode fazer stake.

A [EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) eleva o saldo efetivo máximo possível para 2048 ETH, o que significa que um único validador agora pode fazer stake entre 32 e 2048 ETH. Em vez de múltiplos de 32, os stakers agora podem escolher uma quantia arbitrária de ETH para fazer stake e receber recompensas por cada 1 ETH acima do mínimo. Por exemplo, se o saldo de um validador crescer com suas recompensas para 33 ETH, o 1 ETH extra também é considerado parte do saldo efetivo e recebe recompensas.

Mas o benefício de um sistema de recompensas melhor para os validadores é apenas uma parte dessa melhoria. Os [stakers](/staking/) que executam vários validadores agora podem agregá-los em um único, o que facilita a operação e reduz a sobrecarga da rede. Como cada validador na Beacon Chain envia uma assinatura a cada época, os requisitos de largura de banda crescem com mais validadores e um grande número de assinaturas para propagar. A agregação de validadores aliviará a carga da rede e abrirá novas opções de escalabilidade, mantendo a mesma segurança econômica.

Leia uma exploração detalhada sobre o MaxEB [aqui](/roadmap/pectra/maxeb/)

### Aumento da vazão de blobs {#7691}

Os blobs fornecem [disponibilidade de dados](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) para L2s. Eles foram introduzidos na [atualização de rede anterior](/roadmap/dencun/). 

Atualmente, a rede tem como meta uma média de 3 blobs por bloco, com um máximo de 6 blobs. Com a [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), a contagem média de blobs será aumentada para 6, com um máximo de 9 por bloco, resultando em maior capacidade para os rollups do Ethereum. Esta EIP ajuda a preencher a lacuna até que o [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) permita contagens de blobs ainda maiores.

### Aumento do custo de dados de chamada {#7623}

Antes da introdução dos [blobs na atualização Dencun](/roadmap/danksharding), as L2s usavam [dados de chamada](/developers/docs/data-availability/blockchain-data-storage-strategies/#calldata) para armazenar seus dados no Ethereum. Tanto os blobs quanto os dados de chamada afetam o uso da largura de banda do Ethereum. Embora a maioria dos blocos use apenas uma quantidade mínima de dados de chamada, blocos pesados em dados que também contêm muitos blobs podem ser prejudiciais à rede p2p do Ethereum. 

Para resolver isso, a [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) aumenta o preço dos dados de chamada, mas apenas para transações pesadas em dados. Isso limita o tamanho do bloco no pior cenário, fornece um incentivo para que as L2s usem apenas blobs e deixa mais de 99% das transações inalteradas.

### Saídas acionáveis pela camada de execução {#7002}

Atualmente, a saída de um validador e o [saque do ETH em stake](/staking/withdrawals/) é uma operação da camada de consenso que exige uma chave de validador ativa, a mesma chave BLS usada pelo validador para realizar tarefas ativas, como atestações. As credenciais de saque são uma chave fria separada que recebe o stake da saída, mas não pode acionar a saída. A única maneira de os stakers saírem é enviar uma mensagem especial para a rede Beacon Chain assinada usando a chave de validador ativa. Isso é limitante em cenários onde as credenciais de saque e a chave do validador são mantidas por entidades diferentes ou quando a chave do validador é perdida.

A [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) introduz um novo contrato que pode ser usado para acionar a saída usando as credenciais de saque da camada de execução. Os stakers poderão sair de seu validador chamando uma função neste contrato especial sem a necessidade de sua chave de assinatura de validador ou acesso à Beacon Chain. É importante ressaltar que a ativação de saques de validadores onchain permite protocolos de staking com premissas de confiança reduzidas sobre os operadores de nós.

### Depósitos de validadores onchain {#6110}

Os depósitos de validadores são atualmente processados pela [pesquisa eth1data](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/), que é uma função na Beacon Chain que busca dados da camada de execução. É uma espécie de dívida técnica dos tempos anteriores ao The Merge, quando a Beacon Chain era uma rede separada e tinha que se preocupar com as reorganizações da Prova de Trabalho (PoW). 

A [EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) é uma nova maneira de entregar depósitos da camada de execução para a camada de consenso, o que permite o processamento instantâneo com menos complexidade de implementação. É uma maneira mais segura de lidar com depósitos nativos do Ethereum fundido. Ela também ajuda a preparar o protocolo para o futuro, pois não exige depósitos históricos para inicializar o nó, o que é necessário para a expiração de histórico.

### Pré-compilado para BLS12-381 {#2537}

Os pré-compilados são um conjunto especial de contratos inteligentes integrados diretamente na Máquina Virtual Ethereum ([EVM](/developers/docs/evm/)). Ao contrário dos contratos regulares, os pré-compilados não são implantados pelos usuários, mas fazem parte da própria implementação do cliente, escritos em sua linguagem nativa (por exemplo, Go, Java, etc., não Solidity). Os pré-compilados serveem para funções amplamente utilizadas e padronizadas, como operações criptográficas. Os desenvolvedores de contratos inteligentes podem chamar os pré-compilados como um contrato regular, mas com mais segurança e eficiência.

A [EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) adiciona novos pré-compilados para operações de curva sobre a [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). Esta curva elíptica tornou-se amplamente utilizada em ecossistemas de criptomoedas graças às suas propriedades práticas. Mais especificamente, ela foi adotada pela camada de consenso do Ethereum, onde é usada por validadores.

O novo pré-compilado adiciona a capacidade para que todo desenvolvedor realize operações criptográficas de forma fácil, eficiente e segura usando esta curva, por exemplo, verificando assinaturas. Os aplicativos onchain que dependem desta curva podem se tornar mais eficientes em termos de gás e seguros, contando com um pré-compilado em vez de algum contrato personalizado. Isso se aplica principalmente a aplicativos que desejam raciocinar sobre validadores dentro da EVM, por exemplo, pools de staking, [restaking](/restaking/), clientes leves, pontes, mas também conhecimento zero.

### Fornecer hashes de blocos históricos a partir do estado {#2935}

A EVM atualmente fornece o código de operação `BLOCKHASH`, que permite aos desenvolvedores de contratos recuperar o hash de um bloco diretamente na camada de execução. No entanto, isso é limitado apenas aos últimos 256 blocos e pode se tornar problemático para clientes sem estado no futuro.

A [EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) cria um novo contrato de sistema que pode fornecer os últimos 8192 hashes de blocos como slots de armazenamento. Isso ajuda a preparar o protocolo para o futuro para execução sem estado e se torna mais eficiente quando as árvores verkle (verkle tries) forem adotadas. No entanto, além disso, os rollups podem se beneficiar disso imediatamente, pois podem consultar o contrato diretamente com uma janela histórica mais longa.

### Mover o índice do comitê para fora da Atestação {#7549}

O consenso da Beacon Chain é baseado em validadores emitindo seus votos para o bloco mais recente e a época finalizada. A atestação inclui 3 elementos, 2 dos quais são votos e o terceiro é o valor do índice do comitê.

A [EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) move esse índice para fora da mensagem de atestação assinada, o que torna mais fácil verificar e agregar os votos de consenso. Isso permitirá mais eficiência em cada cliente de consenso e pode trazer melhorias significativas de desempenho para circuitos de conhecimento zero para provar o consenso do Ethereum.

### Adicionar cronograma de blobs aos arquivos de configuração da EL {#7840}

A [EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) é uma mudança simples que adiciona um novo campo à configuração do cliente da camada de execução. Ela configura o número de blocos, permitindo a configuração dinâmica para contagens alvo e máximas de blobs por bloco, bem como o ajuste da taxa de blob. Com a configuração definida diretamente, os clientes podem evitar a complexidade de trocar essas informações por meio da Engine API.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Para saber mais sobre como a Pectra afeta você especificamente como usuário, desenvolvedor ou validador do Ethereum, consulte as <a href="https://epf.wiki/#/wiki/pectra-faq">Perguntas Frequentes (FAQ) da Pectra</a>.
</AlertDescription>
</AlertContent>
</Alert>

## Esta atualização afeta todos os nós e validadores do Ethereum? {#client-impact}

Sim, a atualização Pectra exige atualizações tanto para os [clientes de execução quanto para os clientes de consenso](/developers/docs/nodes-and-clients/). Todos os principais clientes do Ethereum lançarão versões com suporte à bifurcação rígida marcadas como de alta prioridade. Para manter a sincronização com a rede Ethereum após a atualização, os operadores de nós devem garantir que estão executando uma versão de cliente suportada. Observe que as informações sobre os lançamentos de clientes são sensíveis ao tempo, e os usuários devem consultar as atualizações mais recentes para obter os detalhes mais atuais.

## Como o ETH pode ser convertido após a bifurcação rígida? {#scam-alert}

- **Nenhuma ação é necessária para o seu ETH**: Após a atualização Pectra do Ethereum, não há necessidade de converter ou atualizar o seu ETH. Os saldos da sua conta permanecerão os mesmos, e o ETH que você possui atualmente permanecerá acessível em sua forma existente após a bifurcação rígida.
- **Cuidado com os golpes!** <Emoji text="⚠️" /> **qualquer pessoa instruindo você a "atualizar" o seu ETH está tentando aplicar um golpe.** Não há nada que você precise fazer em relação a esta atualização. Seus ativos permanecerão completamente inalterados. Lembre-se, manter-se informado é a melhor defesa contra golpes.

[Mais sobre como reconhecer e evitar golpes](/security/)

## Prefere aprender visualmente? {#visual-learner}

<VideoWatch slug="pectra-upgrade-overview" />

_O que está entrando na atualização Pectra? - Christine Kim_

<VideoWatch slug="pectra-what-stakers-need-to-know" />

_Atualização Pectra do Ethereum: O que os stakers precisam saber — Blockdaemon_

## Leitura adicional {#further-reading}

- [Roteiro do Ethereum](/roadmap/)
- [Perguntas Frequentes (FAQ) da Pectra](https://epf.wiki/#/wiki/pectra-faq)
- [Como a Pectra melhora a experiência do staker](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Página de informações da EIP7702](https://eip7702.io/)
- [Devnets da Pectra](https://github.com/ethereum/pm/blob/master/Network-Upgrade-Archive/Pectra/pectra-pm.md)
